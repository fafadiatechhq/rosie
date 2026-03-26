"use client";
import { useState } from "react";
import {
  mockCollections,
  mockFetchers as initialMockFetchers,
} from "@/utils/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { CreateFetcherModal } from "@/components/CreateFetcherModal";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FolderOpen, Plus, ArrowRight, Pause, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Fetcher } from "@/types/rosie";

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export default function CollectionPageContainer() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Collections
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Logical groupings of your fetchers
          </p>
        </div>
        <Button size="sm">
          <Plus />
          New Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCollections.map((col) => {
          const fetchers = initialMockFetchers.filter(
            (f) => f.collectionId === col.collectionId,
          );
          const runningCount = fetchers.filter(
            (f) => f.status === "running",
          ).length;

          return (
            <Link
              key={col.collectionId}
              href={`/app/collections/${col.collectionId}`}
              className="group rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:glow-primary transition-all duration-200 animate-slide-in"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FolderOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      {col.collectionId}
                    </p>
                  </div>
                </div>
                <StatusBadge status={col.status} />
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  <span className="font-mono text-foreground">
                    {col.fetcherCount}
                  </span>{" "}
                  fetchers
                </span>
                <span>
                  <span className="font-mono text-foreground">
                    {formatNumber(col.totalPages)}
                  </span>{" "}
                  pages
                </span>
                {runningCount > 0 && (
                  <span className="text-success">
                    <span className="font-mono">{runningCount}</span> running
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end mt-3 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                View details <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function CollectionDetail() {
  const { collectionId } = useParams();
  const { toast } = useToast();
  const [showCreateFetcher, setShowCreateFetcher] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const collection = mockCollections.find(
    (c) => c.collectionId === collectionId,
  );

  const [fetchers, setFetchers] = useState<Fetcher[]>(() =>
    initialMockFetchers.filter((f) => f.collectionId === collectionId),
  );

  if (!collection) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Collection not found
      </div>
    );
  }

  const allSelected =
    fetchers.length > 0 && selectedIds.size === fetchers.length;
  const someSelected =
    selectedIds.size > 0 && selectedIds.size < fetchers.length;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(fetchers.map((f) => f.fetcherId)));
    }
  };

  const clearSelection = () => setSelectedIds(new Set());

  const canPause = (f: Fetcher) =>
    f.status === "running" || f.status === "idle";
  const canResume = (f: Fetcher) => f.status === "paused";

  const pauseFetcher = (id: string) => {
    setFetchers((prev) =>
      prev.map((f) =>
        f.fetcherId === id && canPause(f)
          ? { ...f, status: "paused" as const }
          : f,
      ),
    );
  };

  const resumeFetcher = (id: string) => {
    setFetchers((prev) =>
      prev.map((f) =>
        f.fetcherId === id && canResume(f)
          ? { ...f, status: "idle" as const }
          : f,
      ),
    );
  };

  const bulkPause = () => {
    const affected = fetchers.filter(
      (f) => selectedIds.has(f.fetcherId) && canPause(f),
    );
    setFetchers((prev) =>
      prev.map((f) =>
        selectedIds.has(f.fetcherId) && canPause(f)
          ? { ...f, status: "paused" as const }
          : f,
      ),
    );
    toast({
      title: "Fetchers paused",
      description: `${affected.length} fetcher${affected.length !== 1 ? "s" : ""} paused.`,
    });
    clearSelection();
  };

  const bulkResume = () => {
    const affected = fetchers.filter(
      (f) => selectedIds.has(f.fetcherId) && canResume(f),
    );
    setFetchers((prev) =>
      prev.map((f) =>
        selectedIds.has(f.fetcherId) && canResume(f)
          ? { ...f, status: "idle" as const }
          : f,
      ),
    );
    toast({
      title: "Fetchers resumed",
      description: `${affected.length} fetcher${affected.length !== 1 ? "s" : ""} resumed.`,
    });
    clearSelection();
  };

  const selectedFetchers = fetchers.filter((f) => selectedIds.has(f.fetcherId));
  const hasPausable = selectedFetchers.some(canPause);
  const hasResumable = selectedFetchers.some(canResume);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <CreateFetcherModal
        open={showCreateFetcher}
        onOpenChange={setShowCreateFetcher}
        collectionName={collection.name}
      />

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Link
          href="/app/collections"
          className="hover:text-primary transition-colors"
        >
          Collections
        </Link>
        <span>/</span>
        <span className="text-foreground">{collection.name}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {collection.name}
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            {collection.collectionId}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={collection.status} />
          <Button size="sm" onClick={() => setShowCreateFetcher(true)}>
            <Plus />
            Add Fetcher
          </Button>
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 animate-slide-in">
          <span className="text-sm font-medium text-foreground">
            {selectedIds.size} selected
          </span>
          <div className="h-4 w-px bg-border" />
          {hasPausable && (
            <Button variant="outline" size="xs" onClick={bulkPause}>
              <Pause />
              Pause
            </Button>
          )}
          {hasResumable && (
            <Button variant="outline" size="xs" onClick={bulkResume}>
              <Play />
              Resume
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="ghost" size="icon-xs" onClick={clearSelection}>
            <X />
          </Button>
        </div>
      )}

      {/* Fetchers Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-[40px_1fr_100px_80px_80px_100px_80px_90px] gap-4 px-5 py-3 bg-muted/30 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider items-center">
          <div className="flex items-center justify-center">
            <Checkbox
              checked={allSelected}
              ref={undefined}
              onCheckedChange={toggleAll}
              aria-label="Select all fetchers"
              className={
                someSelected ? "data-[state=unchecked]:bg-primary/20" : ""
              }
            />
          </div>
          <span>Fetcher</span>
          <span>Type</span>
          <span>Depth</span>
          <span>Proxy</span>
          <span>Pages</span>
          <span>Status</span>
          <span className="text-center">Actions</span>
        </div>
        {fetchers.map((f) => {
          const isSelected = selectedIds.has(f.fetcherId);

          return (
            <div
              key={f.fetcherId}
              className={`grid grid-cols-[40px_1fr_100px_80px_80px_100px_80px_90px] gap-4 px-5 py-3.5 border-b border-border/50 hover:bg-muted/30 transition-colors items-center group ${
                isSelected ? "bg-primary/5" : ""
              }`}
            >
              <div
                className="flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleSelect(f.fetcherId)}
                  aria-label={`Select ${f.name}`}
                />
              </div>
              <Link href={`/app/fetchers/${f.fetcherId}`} className="min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {f.name}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground">
                  {f.fetcherId}
                </p>
              </Link>
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded w-fit">
                {f.type}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {f.depth}
              </span>
              <span className="text-xs text-muted-foreground">
                {f.rotatingProxy ? "Yes" : "No"}
              </span>
              <span className="text-xs font-mono text-foreground">
                {formatNumber(f.pagesCrawled)}
              </span>
              <StatusBadge status={f.status} />
              <div className="flex items-center justify-center">
                {canPause(f) && (
                  <Button
                    variant="ghost-warning"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      pauseFetcher(f.fetcherId);
                      toast({
                        title: "Fetcher paused",
                        description: `"${f.name}" has been paused.`,
                      });
                    }}
                  >
                    <Pause />
                    Pause
                  </Button>
                )}
                {canResume(f) && (
                  <Button
                    variant="ghost-success"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      resumeFetcher(f.fetcherId);
                      toast({
                        title: "Fetcher resumed",
                        description: `"${f.name}" has been resumed.`,
                      });
                    }}
                  >
                    <Play />
                    Resume
                  </Button>
                )}
                {f.status === "failed" && (
                  <span className="text-[10px] text-muted-foreground">—</span>
                )}
              </div>
            </div>
          );
        })}
        {fetchers.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">
            No fetchers in this collection yet.
          </div>
        )}
      </div>
    </div>
  );
}
