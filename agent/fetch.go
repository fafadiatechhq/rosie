package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"
)

var httpClient = &http.Client{
	Timeout: 30 * time.Second,
}

// fetchBytes fetches a URL with retries. Returns body bytes and content-type.
func fetchBytes(url string, retries int) ([]byte, string, error) {
	var lastErr error
	for attempt := 0; attempt <= retries; attempt++ {
		if attempt > 0 {
			wait := time.Duration(attempt) * 2 * time.Second
			log.Printf("[retry %d/%d] waiting %s before retrying %s", attempt, retries, wait, url)
			time.Sleep(wait)
		}

		resp, err := httpClient.Get(url)
		if err != nil {
			lastErr = err
			continue
		}

		if resp.StatusCode != http.StatusOK {
			resp.Body.Close()
			lastErr = fmt.Errorf("HTTP %d", resp.StatusCode)
			continue
		}

		body, err := io.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			lastErr = err
			continue
		}

		contentType := resp.Header.Get("Content-Type")
		return body, contentType, nil
	}
	return nil, "", fmt.Errorf("failed after %d attempts: %w", retries+1, lastErr)
}

// isSitemapContent returns true if the content-type or body looks like sitemap XML.
func isSitemapContent(contentType string, body []byte) bool {
	ct := strings.ToLower(contentType)
	if strings.Contains(ct, "xml") {
		return true
	}
	// Sniff the body
	snippet := strings.TrimSpace(string(body[:min(512, len(body))]))
	return strings.Contains(snippet, "<urlset") ||
		strings.Contains(snippet, "<sitemapindex") ||
		strings.Contains(snippet, "<?xml")
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
