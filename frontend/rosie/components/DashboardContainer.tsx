'use client'
import { StatCard } from '@/components/StatCard'
import { StatusBadge } from '@/components/StatusBadge'
import {
  mockRuns,
  mockUsage,
  mockActivity,
  mockFetchers,
} from '@/data/mock-data'
import { FileText, Globe, FolderOpen, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const chartData = mockUsage.dailyUsage.map((d) => ({
  date: new Date(d.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }),
  pages: d.pages,
  proxy: d.proxy,
}))

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function DashboardContainer() {
  const usage = mockUsage.currentPeriod
  const activeRuns = mockRuns.filter((r) => r.status === 'running')

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your crawling infrastructure
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pages Crawled"
          value={formatNumber(usage.pagesCrawled)}
          subtitle={`of ${formatNumber(usage.pagesLimit)} limit`}
          icon={FileText}
          trend={{ value: '12%', positive: true }}
        />
        <StatCard
          title="Active Fetchers"
          value={activeRuns.length.toString()}
          subtitle={`${usage.fetchersUsed} total configured`}
          icon={Zap}
        />
        <StatCard
          title="Collections"
          value={usage.collectionsUsed.toString()}
          subtitle={`of ${usage.collectionsLimit} limit`}
          icon={FolderOpen}
        />
        <StatCard
          title="Proxy Requests"
          value={formatNumber(usage.proxyRequests)}
          subtitle={`of ${formatNumber(usage.proxyLimit)} limit`}
          icon={Globe}
          trend={{ value: '8%', positive: true }}
        />
      </div>

      {/* Chart + Active Runs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crawl Activity Chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-foreground">
              Crawl Activity
            </h2>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="pageGrad" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="date"
                tick={{ fontSize: 11, fill: 'hsl(220, 10%, 50%)' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'hsl(220, 10%, 50%)' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => formatNumber(v)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(220, 22%, 9%)',
                  border: '1px solid hsl(220, 20%, 15%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'hsl(220, 10%, 90%)',
                }}
                formatter={(value, name) => {
                  if (Array.isArray(value)) {
                    return [value.join(', '), name]
                  }

                  if (typeof value === 'number') {
                    return [`${formatNumber(value)} Pages`, name]
                  }

                  if (typeof value === 'string') {
                    return [value, name]
                  }

                  return ['', name]
                }}
              />
              <Area
                type="monotone"
                dataKey="pages"
                stroke="hsl(173, 58%, 45%)"
                strokeWidth={2}
                fill="url(#pageGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Active Runs */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-foreground">Active Runs</h2>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-mono font-medium">
              {activeRuns.length}
            </span>
          </div>
          <div className="space-y-3">
            {activeRuns.map((run) => (
              <div
                key={run.runId}
                className="p-3 rounded-lg bg-muted/50 border border-border/50"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground truncate">
                    {run.fetcherName}
                  </span>
                  <StatusBadge status={run.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">
                    {formatNumber(run.pagesCrawled)} pages
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {timeAgo(run.startedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity + Top Fetchers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-foreground">
              Recent Activity
            </h2>
            <Link
              href="/app/activity"
              className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockActivity.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    item.type === 'run_completed'
                      ? 'bg-success'
                      : item.type === 'run_failed'
                        ? 'bg-destructive'
                        : item.type === 'run_started'
                          ? 'bg-primary'
                          : 'bg-muted-foreground'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">
                    {item.message}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {timeAgo(item.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Fetchers */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-foreground">
              Top Fetchers
            </h2>
            <Link
              href="/app/collections"
              className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {mockFetchers
              .sort((a, b) => b.pagesCrawled - a.pagesCrawled)
              .slice(0, 5)
              .map((f) => (
                <Link
                  key={f.fetcherId}
                  href={`/app/fetchers/${f.fetcherId}`}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <StatusBadge status={f.status} />
                    <div className="min-w-0">
                      <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                        {f.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {f.type}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {formatNumber(f.pagesCrawled)}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
