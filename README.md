# Rosie

Rosie is a web scraping and monitoring platform that lets you extract data from any website, track changes over time, and export results — without writing code.

---

## What You Can Do

### Quick Scrape
Extract text, links, images, and tables from any page in seconds. Point Rosie at a URL, optionally target a specific CSS selector, and get structured data immediately.

### Monitor Pages
Watch a page (or a specific element on it) for changes on a schedule. Rosie checks the page at your chosen interval and alerts you when something changes — useful for price tracking, competitor monitoring, or news feeds.

### Crawl Sites
Systematically walk an entire website and collect data from every page. Configure crawl depth, page limits, URL pattern filters, and what to extract from each page.

### Organize with Collections
Group scraped data into named collections (e.g. "Research", "Prices", "Competitors") so results from related jobs stay together and are easy to find.

### Export Your Data
Download collected data as CSV, JSON, or XLSX, filtered by collection, job, or date range.

---

## How It Works

Rosie has three parts that work together:

| Component | What it does |
|---|---|
| **Browser Extension** | Quick access to scrape, monitor, and crawl from any tab |
| **Web App** | Full dashboard for managing jobs, collections, usage, and billing |
| **Crawler Agent** | High-performance Go-based engine that runs the actual crawls |

Fetchers (the individual scraping jobs) support several modes:

- **Seed list** — crawl a specific list of URLs
- **Monitor** — watch a page for changes on a schedule
- **Full site** — crawl an entire domain
- **Discovery** — find and follow new URLs automatically
- **RSS / Sitemap** — ingest structured feed sources

Fetchers can run once, on a fixed interval, or on a custom cron schedule. They support headless browser rendering (for JavaScript-heavy pages) and rotating proxies.

---


## Project Structure

```
rosie/
├── agent/          # Go-based crawler engine
├── backend/        # Django API and admin
├── extension/      # Browser extension
├── frontend/       # Next.js web app
└── docs/           # Additional documentation
```

---

## Developer Setup

See [DEVNOTES.md](DEVNOTES.md) for local development setup using Docker and VS Code Dev Containers.
