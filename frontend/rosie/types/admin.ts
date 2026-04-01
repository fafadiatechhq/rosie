export interface Account {
  accountId: string;
  name: string;
  plan: "basic" | "pro" | "enterprise";
  status: "active" | "suspended";
  createdAt: string;
  usersCount: number;
  collectionsCount: number;
  fetchersCount: number;
  pagesCrawled: number;
  pagesLimit: number;
  mrr: number;
}

export interface WorkerNode {
  nodeId: string;
  region: string;
  status: "healthy" | "degraded" | "down";
  cpu: number;
  memory: number;
  activeTasks: number;
  uptime: string;
}

export interface SystemMetrics {
  totalAccounts: number;
  activeAccounts: number;
  totalPagesCrawled: number;
  totalFetchersRunning: number;
  totalFailures24h: number;
  avgCrawlSpeed: number;
  mrr: number;
  mrrGrowth: number;
}

export interface AdminLogEntry {
  id: string;
  level: "info" | "warn" | "error";
  source: string;
  message: string;
  accountId?: string;
  accountName?: string;
  timestamp: string;
}

export interface FailedFetcher {
  fetcherId: string;
  fetcherName: string;
  accountId: string;
  accountName: string;
  collectionName: string;
  failureReason: string;
  failedAt: string;
  runId: string;
  pagesCrawled: number;
  killed: boolean;
}

export interface PlanConfig {
  id: string;
  name: string;
  price: number;
  collectionsLimit: number;
  fetchersLimit: number;
  pagesLimit: number;
  headless: boolean;
  proxy: boolean;
  retentionDays: number;
  accountCount: number;
}
