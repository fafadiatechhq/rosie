package main

import (
	"encoding/xml"
	"log"
	"strings"
)

// parseSitemap processes a sitemap URL (or sitemap index). It enqueues article
// URLs onto articleCh and new sitemap URLs onto sitemapCh for recursive processing.
// Metadata found directly in the sitemap is used to pre-populate articles.
func parseSitemap(rawURL string, body []byte, _ int) (articles []Article, childSitemaps []string) {
	// Try sitemap index first
	var idx SitemapIndex
	if err := xml.Unmarshal(body, &idx); err == nil && len(idx.Sitemaps) > 0 {
		log.Printf("[sitemap-index] %s has %d child sitemaps", rawURL, len(idx.Sitemaps))
		for _, s := range idx.Sitemaps {
			loc := strings.TrimSpace(s.Loc)
			if loc != "" {
				childSitemaps = append(childSitemaps, loc)
			}
		}
		return
	}

	// Try regular sitemap urlset
	var sm Sitemap
	if err := xml.Unmarshal(body, &sm); err != nil {
		log.Printf("[sitemap] failed to parse %s: %v", rawURL, err)
		return
	}

	log.Printf("[sitemap] %s has %d URLs", rawURL, len(sm.URLs))
	for _, u := range sm.URLs {
		loc := strings.TrimSpace(u.Loc)
		if loc == "" {
			continue
		}

		a := Article{
			URL:           loc,
			PublishedDate: strings.TrimSpace(u.LastMod),
		}

		// Use sitemap image metadata if present
		if len(u.Images) > 0 {
			img := u.Images[0]
			a.Image = strings.TrimSpace(img.Loc)
			if img.Caption != "" {
				a.Caption = strings.TrimSpace(img.Caption)
			} else if img.Title != "" {
				a.Caption = strings.TrimSpace(img.Title)
			}
		}

		articles = append(articles, a)
	}
	return
}

// enrichFromHTML fetches a URL's HTML and fills in any missing fields on the article.
func enrichFromHTML(a *Article, retries int) {
	body, contentType, err := fetchBytes(a.URL, retries)
	if err != nil {
		log.Printf("[enrich] fetch error %s: %v", a.URL, err)
		return
	}
	if isSitemapContent(contentType, body) {
		return
	}
	meta := parseHTMLMeta(body, a.URL)

	if a.Title == "" {
		a.Title = meta.Title
	}
	if a.PublishedDate == "" {
		a.PublishedDate = meta.PublishedDate
	}
	if a.Image == "" {
		a.Image = meta.Image
		a.Caption = meta.Caption
	}
}
