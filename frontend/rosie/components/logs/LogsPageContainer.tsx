"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const mockLogs = [
  {
    ts: "2026-02-07T08:02:14Z",
    level: "info",
    fetcher: "Amazon Product Pages",
    message: "Crawl worker started on node-3a",
  },
  {
    ts: "2026-02-07T08:01:52Z",
    level: "warn",
    fetcher: "Reuters Full Site",
    message: "Rate limit detected, backing off 30s",
  },
  {
    ts: "2026-02-07T07:58:31Z",
    level: "info",
    fetcher: "BBC Discovery Crawl",
    message: "Discovered 142 new URLs in /news",
  },
  {
    ts: "2026-02-07T07:45:00Z",
    level: "error",
    fetcher: "Competitor Sitemap Crawl",
    message: "Connection timeout after 30s on competitor.io/api",
  },
  {
    ts: "2026-02-07T07:30:12Z",
    level: "info",
    fetcher: "Amazon Product Pages",
    message: "Checkpoint saved: 8,200 pages processed",
  },
  {
    ts: "2026-02-07T07:15:44Z",
    level: "info",
    fetcher: "TechCrunch RSS",
    message: "RSS feed parsed successfully, 12 new entries",
  },
  {
    ts: "2026-02-07T06:45:00Z",
    level: "warn",
    fetcher: "Reuters Full Site",
    message: "Duplicate URL skipped: reuters.com/world/asia",
  },
  {
    ts: "2026-02-07T06:30:00Z",
    level: "info",
    fetcher: "Reuters Full Site",
    message: "Full site crawl initiated with depth=5",
  },
];

const levelStyles: Record<string, string> = {
  info: "text-primary bg-primary/10",
  warn: "text-warning bg-warning/10",
  error: "text-destructive bg-destructive/10",
};

export const LogsPageContainer = () => {
  const [SearchQuery, setSearchQuery] = useState("");

  const searchFilterItems = mockLogs.filter((log) =>
    log.fetcher.toLowerCase().includes(SearchQuery.toLowerCase()),
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">
            System and fetcher event logs
          </p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-9"
            value={SearchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden font-mono text-xs">
        <div className="grid grid-cols-[140px_60px_180px_1fr] gap-4 px-4 py-2.5 bg-muted/30 border-b border-border text-[10px] font-medium text-muted-foreground uppercase tracking-wider font-sans">
          <span>Timestamp</span>
          <span>Level</span>
          <span>Fetcher</span>
          <span>Message</span>
        </div>
        {searchFilterItems.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No logs found
          </div>
        ) : (
          searchFilterItems.map((log, i) => (
            <div
              key={i}
              className="grid grid-cols-[140px_60px_180px_1fr] gap-4 px-4 py-2.5 border-b border-border/30 items-center hover:bg-muted/20 transition-colors"
            >
              <span className="text-muted-foreground">
                {new Date(log.ts).toLocaleTimeString("en-US", {
                  hour12: false,
                })}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-center font-medium ${levelStyles[log.level]}`}
              >
                {log.level.toUpperCase()}
              </span>
              <span className="text-foreground truncate">{log.fetcher}</span>
              <span className="text-muted-foreground">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
