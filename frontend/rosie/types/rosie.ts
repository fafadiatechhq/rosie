export interface Collection {
  collectionId: string;
  accountId: string;
  name: string;
  createdAt: string;
  fetcherCount: number;
  totalPages: number;
  status: "active" | "paused";
}

export interface Fetcher {
  fetcherId: string;
  collectionId: string;
  collectionName: string;
  name: string;
  type: "seedlist" | "monitor" | "full_site" | "discovery" | "rss" | "sitemap";
  useHeadless: boolean;
  rotatingProxy: boolean;
  schedule: "cron" | "interval" | "once";
  depth: number;
  inclusionDomains: string[];
  exclusionDomains: string[];
  status: "running" | "idle" | "failed" | "paused";
  lastRun: string;
  pagesCrawled: number;
}

export interface FetcherRun {
  runId: string;
  fetcherId: string;
  fetcherName: string;
  status: "running" | "success" | "failure";
  pagesCrawled: number;
  startedAt: string;
  endedAt: string | null;
}

export interface UsageData {
  currentPeriod: {
    pagesCrawled: number;
    pagesLimit: number;
    proxyRequests: number;
    proxyLimit: number;
    collectionsUsed: number;
    collectionsLimit: number;
    fetchersUsed: number;
    fetchersLimit: number;
  };
  dailyUsage: Array<{
    date: string;
    pages: number;
    proxy: number;
  }>;
}

export interface ActivityItem {
  id: string;
  type: "run_started" | "run_completed" | "run_failed" | "webhook_delivered";
  message: string;
  fetcherId: string;
  timestamp: string;
}

// * Feature Flags Page Interface
export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  scope: "global" | "enterprise" | "beta";
}
