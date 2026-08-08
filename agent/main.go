package main

import (
	"bufio"
	"encoding/json"
	"log"
	"os"
	"strings"
)

func main() {
	cfg := parseConfig()

	log.Printf("Starting crawler: seelist=%s output=%s depth=%d workers=%d retries=%d same-domain=%v delay=%dms max-pages=%d",
		cfg.SeeListFile, cfg.OutputFile, cfg.MaxDepth, cfg.Workers, cfg.Retries, cfg.SameDomain, cfg.DelayMs, cfg.MaxPages)

	seeds, err := readSeeds(cfg.SeeListFile)
	if err != nil {
		log.Fatalf("Failed to read seed list: %v", err)
	}
	log.Printf("Loaded %d seed URLs", len(seeds))

	crawler := NewCrawler(cfg)
	articles := crawler.RunFull(seeds)

	log.Printf("Crawl complete. %d articles collected.", len(articles))

	if err := writeOutput(cfg.OutputFile, articles); err != nil {
		log.Fatalf("Failed to write output: %v", err)
	}
	log.Printf("Output written to %s", cfg.OutputFile)
}

// readSeeds reads one URL per line from the given file, ignoring blank lines
// and lines starting with '#'.
func readSeeds(path string) ([]string, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	var urls []string
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		urls = append(urls, line)
	}
	return urls, scanner.Err()
}

// writeOutput marshals articles as a JSON array and writes it to path.
func writeOutput(path string, articles []Article) error {
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer f.Close()

	enc := json.NewEncoder(f)
	enc.SetIndent("", "  ")
	return enc.Encode(articles)
}
