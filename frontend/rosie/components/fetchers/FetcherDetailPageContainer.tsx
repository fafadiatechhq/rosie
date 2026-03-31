"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { mockFetchers, mockRuns } from "@/data/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Play, Settings, Globe, Bot, Clock, Layers } from "lucide-react";
import { formatNumber } from "@/utils/formatNumber";


const formatDuration = (start: string, end: string | null): string => {
  if (!end) return "In progress";
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return `${hrs}h ${remainMins}m`;
}

const formatDateTime = (dateStr: string): string => {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const FetcherDetailPageContainer = () => {
  const { id } = useParams();
  const fetcher = mockFetchers.find((f) => f.fetcherId === id);
  const runs = mockRuns.filter((r) => r.fetcherId === id);

  if (!fetcher) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Fetcher not found
      </div>
    );
  }

  const configItems = [
    { label: "Type", value: fetcher.type, icon: Layers },
    { label: "Schedule", value: fetcher.schedule, icon: Clock },
    {
      label: "Headless",
      value: fetcher.useHeadless ? "Enabled" : "Disabled",
      icon: Bot,
    },
    {
      label: "Proxy",
      value: fetcher.rotatingProxy ? "Rotating" : "None",
      icon: Globe,
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/app/collections"
          className="hover:text-primary transition-colors"
        >
          Collections
        </Link>
        <span>/</span>
        <Link
          href={`/app/collections/${fetcher.collectionId}`}
          className="hover:text-primary transition-colors"
        >
          {fetcher.collectionName}
        </Link>
        <span>/</span>
        <span className="text-foreground">{fetcher.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-semibold text-foreground">
              {fetcher.name}
            </h1>
            <StatusBadge status={fetcher.status} />
          </div>
          <p className="text-xs font-mono text-muted-foreground">
            {fetcher.fetcherId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings />
            Edit
          </Button>
          <Button size="sm">
            <Play />
            Run Now
          </Button>
        </div>
      </div>

      {/* Config Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {configItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {item.label}
              </span>
            </div>
            <span className="text-sm font-mono font-medium text-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Domains */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Inclusion Domains
          </h3>
          <div className="flex flex-wrap gap-2">
            {fetcher.inclusionDomains.map((d) => (
              <span
                key={d}
                className="px-2.5 py-1 rounded-md bg-success/10 text-success text-xs font-mono"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Exclusion Domains
          </h3>
          <div className="flex flex-wrap gap-2">
            {fetcher.exclusionDomains.length > 0 ? (
              fetcher.exclusionDomains.map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 rounded-md bg-destructive/10 text-destructive text-xs font-mono"
                >
                  {d}
                </span>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">
                None configured
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Runs */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-medium text-foreground">Run History</h2>
        </div>
        <div className="grid grid-cols-[1fr_100px_100px_120px_80px] gap-4 px-5 py-2.5 bg-muted/30 border-b border-border text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          <span>Run ID</span>
          <span>Pages</span>
          <span>Duration</span>
          <span>Started</span>
          <span>Status</span>
        </div>
        {runs.map((run) => (
          <div
            key={run.runId}
            className="grid grid-cols-[1fr_100px_100px_120px_80px] gap-4 px-5 py-3 border-b border-border/50 items-center"
          >
            <span className="text-sm font-mono text-foreground">
              {run.runId}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {formatNumber(run.pagesCrawled)}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {formatDuration(run.startedAt, run.endedAt)}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDateTime(run.startedAt)}
            </span>
            <StatusBadge status={run.status} />
          </div>
        ))}
        {runs.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">
            No runs recorded yet.
          </div>
        )}
      </div>
    </div>
  );
}
