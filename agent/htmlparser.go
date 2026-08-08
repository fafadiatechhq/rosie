package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/url"
	"strings"

	"golang.org/x/net/html"
)

// htmlMeta holds metadata extracted from an HTML page.
type htmlMeta struct {
	Title         string
	PublishedDate string
	Image         string
	Caption       string
	Links         []string
}

// parseHTMLMeta extracts metadata and links from raw HTML bytes.
// baseURL is used to resolve relative links.
func parseHTMLMeta(body []byte, baseURL string) htmlMeta {
	doc, err := html.Parse(bytes.NewReader(body))
	if err != nil {
		log.Printf("[html] parse error for %s: %v", baseURL, err)
		return htmlMeta{}
	}

	base, _ := url.Parse(baseURL)
	m := &htmlMeta{}
	var walk func(*html.Node)

	walk = func(n *html.Node) {
		if n.Type == html.ElementNode {
			switch n.Data {
			case "title":
				if m.Title == "" && n.FirstChild != nil {
					m.Title = strings.TrimSpace(n.FirstChild.Data)
				}
			case "meta":
				parseMeta(n, m)
			case "script":
				parseJSONLD(n, m)
			case "img":
				parseImg(n, base, m)
			case "figcaption":
				if m.Caption == "" {
					m.Caption = strings.TrimSpace(nodeText(n))
				}
			case "a":
				if href := attr(n, "href"); href != "" {
					if abs := resolveURL(base, href); abs != "" {
						m.Links = append(m.Links, abs)
					}
				}
			}
		}
		for c := n.FirstChild; c != nil; c = c.NextSibling {
			walk(c)
		}
	}

	walk(doc)

	// og:title takes priority over <title>
	return *m
}

func parseMeta(n *html.Node, m *htmlMeta) {
	prop := strings.ToLower(attr(n, "property"))
	name := strings.ToLower(attr(n, "name"))
	content := attr(n, "content")
	if content == "" {
		return
	}

	switch prop {
	case "og:title":
		m.Title = content
	case "og:image", "og:image:url":
		if m.Image == "" {
			m.Image = content
		}
	case "og:image:alt":
		if m.Caption == "" {
			m.Caption = content
		}
	case "article:published_time", "article:modified_time":
		if m.PublishedDate == "" {
			m.PublishedDate = content
		}
	}

	switch name {
	case "title":
		if m.Title == "" {
			m.Title = content
		}
	case "date", "pubdate", "publish_date", "published_time", "dc.date", "dc.date.issued":
		if m.PublishedDate == "" {
			m.PublishedDate = content
		}
	case "image":
		if m.Image == "" {
			m.Image = content
		}
	}
}

// parseJSONLD looks for JSON-LD <script type="application/ld+json"> and
// extracts datePublished, image, name/headline.
func parseJSONLD(n *html.Node, m *htmlMeta) {
	if strings.ToLower(attr(n, "type")) != "application/ld+json" {
		return
	}
	raw := nodeText(n)
	if raw == "" {
		return
	}

	var data map[string]interface{}
	if err := json.Unmarshal([]byte(raw), &data); err != nil {
		return
	}

	if v, ok := data["datePublished"].(string); ok && v != "" && m.PublishedDate == "" {
		m.PublishedDate = v
	}
	if v, ok := data["dateModified"].(string); ok && v != "" && m.PublishedDate == "" {
		m.PublishedDate = v
	}

	if m.Title == "" {
		for _, key := range []string{"headline", "name"} {
			if v, ok := data[key].(string); ok && v != "" {
				m.Title = v
				break
			}
		}
	}

	// image can be a string or {"url": "..."}
	if m.Image == "" {
		switch img := data["image"].(type) {
		case string:
			m.Image = img
		case map[string]interface{}:
			if u, ok := img["url"].(string); ok {
				m.Image = u
			}
			if cap, ok := img["caption"].(string); ok && m.Caption == "" {
				m.Caption = cap
			}
		}
	}
}

// parseImg captures the first meaningful image (with src) if no image found yet.
func parseImg(n *html.Node, base *url.URL, m *htmlMeta) {
	src := attr(n, "src")
	if src == "" {
		src = attr(n, "data-src") // lazy-loaded images
	}
	if src == "" || m.Image != "" {
		return
	}
	abs := resolveURL(base, src)
	if abs == "" {
		return
	}
	m.Image = abs

	// caption preference: figcaption (set by parent walk), then title attr, then alt
	if cap := attr(n, "title"); cap != "" && m.Caption == "" {
		m.Caption = cap
	}
	if cap := attr(n, "alt"); cap != "" && m.Caption == "" {
		m.Caption = cap
	}
}

// attr returns the value of the named attribute on a node.
func attr(n *html.Node, key string) string {
	for _, a := range n.Attr {
		if strings.EqualFold(a.Key, key) {
			return a.Val
		}
	}
	return ""
}

// nodeText returns the concatenated text content of a node and its descendants.
func nodeText(n *html.Node) string {
	var b strings.Builder
	var walk func(*html.Node)
	walk = func(nd *html.Node) {
		if nd.Type == html.TextNode {
			b.WriteString(nd.Data)
		}
		for c := nd.FirstChild; c != nil; c = c.NextSibling {
			walk(c)
		}
	}
	walk(n)
	return strings.TrimSpace(b.String())
}

// resolveURL resolves href relative to base, returning an absolute URL string.
// Returns "" if the result is not http/https.
func resolveURL(base *url.URL, href string) string {
	if base == nil {
		return ""
	}
	ref, err := url.Parse(href)
	if err != nil {
		return ""
	}
	abs := base.ResolveReference(ref)
	if abs.Scheme != "http" && abs.Scheme != "https" {
		return ""
	}
	// Strip fragment
	abs.Fragment = ""
	return abs.String()
}
