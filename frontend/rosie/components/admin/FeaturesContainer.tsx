"use client";
import { useState } from "react";
import { cn } from "@/utils/utils";
import { FeatureFlag } from "@/types/rosie";
import { Flag } from "lucide-react";

const initialFlags: FeatureFlag[] = [
  {
    id: "ff-headless-v2",
    name: "Headless V2 Engine",
    description: "Use Playwright instead of Puppeteer for headless crawling",
    enabled: true,
    scope: "beta",
  },
  {
    id: "ff-smart-retry",
    name: "Smart Retry Policy",
    description: "Adaptive retry logic based on error type and history",
    enabled: false,
    scope: "global",
  },
  {
    id: "ff-warc-streaming",
    name: "WARC Streaming Output",
    description: "Stream WARC output as fetchers crawl instead of batch",
    enabled: true,
    scope: "enterprise",
  },
  {
    id: "ff-cost-forecast",
    name: "Cost Forecasting",
    description: "Show predictive usage cost on account dashboards",
    enabled: false,
    scope: "beta",
  },
  {
    id: "ff-multi-region",
    name: "Multi-Region Crawling",
    description: "Allow fetchers to execute across multiple regions",
    enabled: false,
    scope: "enterprise",
  },
  {
    id: "ff-audit-log",
    name: "Audit Logs",
    description: "Track all user actions with detailed audit trail",
    enabled: true,
    scope: "global",
  },
];

export default function FeaturesContainer() {
  const [flags, setFlags] = useState(initialFlags);

  const toggleFlag = (id: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)),
    );
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Feature Flags
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Toggle platform features and rollout controls
          </p>
        </div>
        <Flag className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {flags.map((flag) => (
          <div
            key={flag.id}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-5"
          >
            <div className="flex-1 min-w-0 mr-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-medium text-foreground">
                  {flag.name}
                </h3>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded font-medium uppercase",
                    flag.scope === "global"
                      ? "bg-muted text-muted-foreground"
                      : flag.scope === "enterprise"
                        ? "bg-chart-2/10 text-chart-2"
                        : "bg-primary/10 text-primary",
                  )}
                >
                  {flag.scope}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {flag.description}
              </p>
            </div>
            <button
              onClick={() => toggleFlag(flag.id)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0",
                flag.enabled ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 rounded-full bg-white transition-transform",
                  flag.enabled ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
