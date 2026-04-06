"use client";
import { mockFailedFetchers } from "@/data/admin-mock-data";
import { AlertTriangle, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/utils/utils";
import { formatNumber } from "@/utils/formatNumber";
import { timeAgo } from "@/utils/timeAgo";

export default function FailedFetchersPage() {
  const [fetchers, setFetchers] = useState(mockFailedFetchers);

  const handleKill = (fetcherId: string) => {
    setFetchers((prev) =>
      prev.map((f) =>
        f.fetcherId === fetcherId ? { ...f, killed: true, alive: false } : f,
      ),
    );
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Failed Fetchers
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {fetchers.length} failures detected —{" "}
            {fetchers.filter((f) => f.killed).length} killed
          </p>
        </div>
        <AlertTriangle className="w-5 h-5 text-warning" />
      </div>

      <div className="space-y-3">
        {fetchers.map((f) => (
          <div
            key={f.fetcherId}
            className={cn(
              "rounded-xl border bg-card p-5",
              f.killed ? "border-border opacity-60" : "border-destructive/20",
            )}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {f.fetcherName}
                  </h3>
                  {f.killed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium flex-shrink-0">
                      Killed
                    </span>
                  )}
                </div>
                <p className="text-xs text-destructive mb-2">
                  {f.failureReason}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
                  <span>
                    Account:{" "}
                    <span className="text-foreground">{f.accountName}</span>
                  </span>
                  <span>
                    Collection:{" "}
                    <span className="text-foreground">{f.collectionName}</span>
                  </span>
                  <span>
                    Pages:{" "}
                    <span className="font-mono text-foreground">
                      {formatNumber(f.pagesCrawled)}
                    </span>
                  </span>
                  <span>
                    Run: <span className="font-mono">{f.runId}</span>
                  </span>
                  <span>{timeAgo(f.failedAt)}</span>
                </div>
              </div>
              {!f.killed && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleKill(f.fetcherId)}
                  className="flex-shrink-0"
                >
                  <Power className="w-3.5 h-3.5 mr-1" />
                  Kill Switch
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
