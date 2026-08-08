package main

import "encoding/xml"

// Article is the output record written to output.json.
type Article struct {
	Title         string `json:"title"`
	URL           string `json:"url"`
	PublishedDate string `json:"published_date,omitempty"`
	Image         string `json:"image,omitempty"`
	Caption       string `json:"caption,omitempty"`
}

// crawlJob is a unit of work for the worker pool.
type crawlJob struct {
	url        string
	depth      int
	sourceDomain string
}

// --- Sitemap XML types ---

type Sitemap struct {
	XMLName xml.Name     `xml:"urlset"`
	URLs    []SitemapURL `xml:"url"`
}

type SitemapIndex struct {
	XMLName  xml.Name       `xml:"sitemapindex"`
	Sitemaps []SitemapEntry `xml:"sitemap"`
}

type SitemapEntry struct {
	Loc     string `xml:"loc"`
	LastMod string `xml:"lastmod"`
}

type SitemapURL struct {
	Loc     string         `xml:"loc"`
	LastMod string         `xml:"lastmod"`
	Images  []SitemapImage `xml:"image"`
}

type SitemapImage struct {
	Loc     string `xml:"loc"`
	Caption string `xml:"caption"`
	Title   string `xml:"title"`
}
