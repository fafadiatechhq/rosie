package main

import (
	"log"
	"net/url"
	"strings"
	"sync"
	"time"
)

// Crawler orchestrates the crawl.
type Crawler struct {
	cfg      Config
	visited  map[string]bool
	mu       sync.Mutex
	seen     map[string]bool // deduplicate output articles by URL
	results  []Article
	pageCount int
}

func NewCrawler(cfg Config) *Crawler {
	return &Crawler{
		cfg:     cfg,
		visited: make(map[string]bool),
		seen:    make(map[string]bool),
	}
}

// RunFull crawls all seed URLs and returns deduplicated articles.
// Workers enqueue child jobs onto a buffered channel; a pending WaitGroup
// tracks outstanding jobs so we know when everything is truly done.
func (c *Crawler) RunFull(seeds []string) []Article {
	const bufSize = 100000
	jobs := make(chan crawlJob, bufSize)

	var workerWg sync.WaitGroup
	var pending sync.WaitGroup

	// enqueue safely increments pending and sends a job.
	enqueue := func(job crawlJob) {
		pending.Add(1)
		select {
		case jobs <- job:
		default:
			log.Printf("[warn] job queue full, skipping %s", job.url)
			pending.Done()
		}
	}

	// Start workers
	for i := 0; i < c.cfg.Workers; i++ {
		workerWg.Add(1)
		go func() {
			defer workerWg.Done()
			for job := range jobs {
				c.processJob(job, enqueue)
				pending.Done()
				if c.cfg.DelayMs > 0 {
					time.Sleep(time.Duration(c.cfg.DelayMs) * time.Millisecond)
				}
			}
		}()
	}

	// Enqueue seeds
	for _, u := range seeds {
		u = strings.TrimSpace(u)
		if u == "" {
			continue
		}
		parsed, err := url.Parse(u)
		if err != nil {
			log.Printf("[seed] invalid URL %s: %v", u, err)
			continue
		}
		enqueue(crawlJob{url: u, depth: 0, sourceDomain: parsed.Hostname()})
	}

	// Close the jobs channel once all jobs (and their descendants) finish.
	go func() {
		pending.Wait()
		close(jobs)
	}()

	workerWg.Wait()
	return c.results
}

// processJob fetches the URL, determines content type, and dispatches accordingly.
func (c *Crawler) processJob(job crawlJob, enqueue func(crawlJob)) {
	c.mu.Lock()
	if c.visited[job.url] {
		c.mu.Unlock()
		return
	}
	if c.cfg.MaxPages > 0 && c.pageCount >= c.cfg.MaxPages {
		c.mu.Unlock()
		return
	}
	c.visited[job.url] = true
	c.pageCount++
	c.mu.Unlock()

	log.Printf("[crawl] depth=%d %s", job.depth, job.url)

	body, contentType, err := fetchBytes(job.url, c.cfg.Retries)
	if err != nil {
		log.Printf("[error] %s: %v", job.url, err)
		return
	}

	if isSitemapContent(contentType, body) {
		c.handleSitemap(job.url, body, enqueue)
		return
	}

	// HTML page — extract metadata
	meta := parseHTMLMeta(body, job.url)
	c.addArticle(Article{
		Title:         meta.Title,
		URL:           job.url,
		PublishedDate: meta.PublishedDate,
		Image:         meta.Image,
		Caption:       meta.Caption,
	})

	// Follow links within depth limit
	if job.depth < c.cfg.MaxDepth {
		for _, link := range meta.Links {
			if c.cfg.SameDomain && !sameDomain(link, job.sourceDomain) {
				continue
			}
			c.mu.Lock()
			already := c.visited[link]
			c.mu.Unlock()
			if already {
				continue
			}
			enqueue(crawlJob{url: link, depth: job.depth + 1, sourceDomain: job.sourceDomain})
		}
	}
}

// handleSitemap parses the sitemap body and enqueues child sitemaps;
// it also enriches and stores each article URL found.
func (c *Crawler) handleSitemap(rawURL string, body []byte, enqueue func(crawlJob)) {
	articles, childSitemaps := parseSitemap(rawURL, body, c.cfg.Retries)

	for _, s := range childSitemaps {
		c.mu.Lock()
		already := c.visited[s]
		c.mu.Unlock()
		if !already {
			enqueue(crawlJob{url: s, depth: 0, sourceDomain: hostOf(s)})
		}
	}

	for i := range articles {
		enrichFromHTML(&articles[i], c.cfg.Retries)
		c.addArticle(articles[i])
	}
}

// addArticle appends an article if its URL hasn't been seen before.
func (c *Crawler) addArticle(a Article) {
	if a.URL == "" {
		return
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.seen[a.URL] {
		return
	}
	c.seen[a.URL] = true
	c.results = append(c.results, a)
}

func sameDomain(rawURL, domain string) bool {
	u, err := url.Parse(rawURL)
	if err != nil {
		return false
	}
	return u.Hostname() == domain
}

func hostOf(rawURL string) string {
	u, err := url.Parse(rawURL)
	if err != nil {
		return ""
	}
	return u.Hostname()
}
