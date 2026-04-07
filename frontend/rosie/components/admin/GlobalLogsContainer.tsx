"use client"
import { mockAdminLogs } from "@/data/admin-mock-data";
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";
import { timeAgo } from "@/utils/timeAgo";

export const GlobalLogsContainer = () => {
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = mockAdminLogs.filter((log) => {
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    const matchesSearch =
      search === "" ||
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.source.toLowerCase().includes(search.toLowerCase()) ||
      (log.accountName &&
        log.accountName.toLowerCase().includes(search.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Global Logs</h1>
        <p className="text-sm text-muted-foreground mt-1">
          System-wide log stream across all accounts
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {["all", "error", "warn", "info"].map((l) => (
            <Button
              key={l}
              variant={levelFilter === l ? "default" : "outline"}
              size="xs"
              onClick={() => setLevelFilter(l)}
              className="capitalize"
            >
              {l === "all" ? "All Levels" : l}
            </Button>
          ))}
        </div>
      </div>

      {/* Log entries */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="divide-y divide-border/50">
          {filtered.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors"
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full mt-1.5 shrink-0",
                  log.level === "error"
                    ? "bg-destructive"
                    : log.level === "warn"
                      ? "bg-warning"
                      : "bg-muted-foreground",
                )}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{log.message}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase px-1.5 py-0.5 rounded",
                      log.level === "error"
                        ? "bg-destructive/10 text-destructive"
                        : log.level === "warn"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {log.level}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {log.source}
                  </span>
                  {log.accountName && (
                    <span className="text-[10px] text-muted-foreground">
                      • {log.accountName}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground flex-shrink-0 whitespace-nowrap">
                {timeAgo(log.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
