import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { formatNumber } from "@/utils/formatNumber";
import { timeAgo } from "@/utils/timeAgo";
import {
  Building2,
  FileText,
  Zap,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Gauge,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  mockSystemMetrics,
  mockAccounts,
  mockFailedFetchers,
  mockAdminLogs,
  mockWorkers,
} from "@/data/admin-mock-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell, // ! deprecate
} from "recharts";

const mrrChartData = [
  { month: "Sep", mrr: 22400 },
  { month: "Oct", mrr: 25800 },
  { month: "Nov", mrr: 29200 },
  { month: "Dec", mrr: 32100 },
  { month: "Jan", mrr: 35600 },
  { month: "Feb", mrr: 38400 },
];

const planDistribution = [
  { name: "Basic", value: 42, color: "hsl(220, 10%, 50%)" },
  { name: "Pro", value: 84, color: "hsl(173, 58%, 45%)" },
  { name: "Enterprise", value: 16, color: "hsl(199, 89%, 48%)" },
];

export const  DashboardContainer = () => {
  const m = mockSystemMetrics;
  const healthyWorkers = mockWorkers.filter(
    (w) => w.status === "healthy",
  ).length;
  const totalWorkers = mockWorkers.length;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Platform Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          System-wide metrics and health status
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Accounts"
          value={m.totalAccounts.toString()}
          subtitle={`${m.activeAccounts} active`}
          icon={Building2}
        />
        <StatCard
          title="Pages Crawled"
          value={formatNumber(m.totalPagesCrawled)}
          subtitle="All accounts, this period"
          icon={FileText}
          trend={{ value: "18%", positive: true }}
        />
        <StatCard
          title="Active Fetchers"
          value={m.totalFetchersRunning.toString()}
          subtitle={`${m.totalFailures24h} failures in 24h`}
          icon={Zap}
        />
        <StatCard
          title="MRR"
          value={`$${formatNumber(m.mrr)}`}
          subtitle="Monthly recurring revenue"
          icon={DollarSign}
          trend={{ value: `${m.mrrGrowth}%`, positive: true }}
        />
      </div>

      {/* MRR Chart + Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-foreground">MRR Growth</h2>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={mrrChartData}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="hsl(173, 58%, 45%)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(173, 58%, 45%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(220, 20%, 15%)"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "hsl(220, 10%, 50%)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(220, 10%, 50%)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${formatNumber(v)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 22%, 9%)",
                  border: "1px solid hsl(220, 20%, 15%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "hsl(220, 10%, 90%)",
                }}
                formatter={(value: any) => [
                  `$${Number(value).toLocaleString()}`,
                  "MRR",
                ]}
              />
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="hsl(173, 58%, 45%)"
                strokeWidth={2}
                fill="url(#mrrGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">
            Plan Distribution
          </h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={planDistribution}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                dataKey="value"
                paddingAngle={4}
              >
                {planDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {planDistribution.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="text-muted-foreground">{p.name}</span>
                </div>
                <span className="font-mono text-foreground">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Worker Health + Recent Failures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Worker Health */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-foreground">
              Worker Nodes
            </h2>
            <Link
              href="/admin/system-health"
              className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground font-mono">
              {healthyWorkers}/{totalWorkers}
            </span>
            <span className="text-xs text-muted-foreground">nodes healthy</span>
          </div>
          <div className="space-y-2">
            {mockWorkers.map((w) => (
              <div
                key={w.nodeId}
                className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <StatusBadge
                    status={
                      w.status === "healthy"
                        ? "active"
                        : w.status === "degraded"
                          ? "paused"
                          : "failed"
                    }
                  />
                  <div>
                    <p className="text-xs font-mono text-foreground">
                      {w.nodeId}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {w.region}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-muted-foreground">
                    CPU {w.cpu}%
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {w.activeTasks} tasks
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Failures */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-foreground">
              Recent Failures
            </h2>
            <Link
              href="/admin/failures"
              className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockFailedFetchers.slice(0, 4).map((f) => (
              <div
                key={f.fetcherId}
                className="p-3 rounded-lg bg-muted/50 border border-border/50"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground truncate">
                    {f.fetcherName}
                  </span>
                  {f.killed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-medium">
                      Killed
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {f.failureReason}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-muted-foreground">
                    {f.accountName}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {timeAgo(f.failedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-foreground">System Logs</h2>
          <Link
            href="/admin/logs"
            className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {mockAdminLogs.slice(0, 6).map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  log.level === "error"
                    ? "bg-destructive"
                    : log.level === "warn"
                      ? "bg-warning"
                      : "bg-muted-foreground"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">
                  {log.message}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {log.source}
                  </span>
                  {log.accountName && (
                    <span className="text-[10px] text-muted-foreground">
                      • {log.accountName}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground flex-shrink-0">
                {timeAgo(log.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
