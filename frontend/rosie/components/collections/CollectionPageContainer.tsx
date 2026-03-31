"use client";
import {
  mockCollections,
  mockFetchers as initialMockFetchers,
} from "@/utils/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";
import { FolderOpen, Plus, ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/utils/formatNumber";

export const CollectionPageContainer = () => {
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


