package main

import "flag"

// Config holds all runtime configuration.
type Config struct {
	SeeListFile string
	OutputFile  string
	MaxDepth    int
	Workers     int
	Retries     int
	SameDomain  bool
	DelayMs     int
	MaxPages    int
}

func parseConfig() Config {
	c := Config{}
	flag.StringVar(&c.SeeListFile, "seelist", "seelist.txt", "Path to seed URL list (one URL per line)")
	flag.StringVar(&c.OutputFile, "output", "output.json", "Path to output JSON file")
	flag.IntVar(&c.MaxDepth, "depth", 3, "Maximum crawl depth for HTML link following")
	flag.IntVar(&c.Workers, "workers", 8, "Number of concurrent crawl workers")
	flag.IntVar(&c.Retries, "retries", 3, "Number of retries on fetch failure")
	flag.BoolVar(&c.SameDomain, "same-domain", true, "Only follow links within the same domain")
	flag.IntVar(&c.DelayMs, "delay", 0, "Delay in milliseconds between requests per worker")
	flag.IntVar(&c.MaxPages, "max-pages", 50, "Maximum total pages to crawl (0 = unlimited)")
	flag.Parse()
	return c
}
