'use client'
import { mockUsage } from '@/data/mock-data'
import { Progress } from '@/components/ui/progress'
import { formatNumber } from '@/utils/formatNumber'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const chartData = mockUsage.dailyUsage.map((d) => ({
  date: new Date(d.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }),
  pages: d.pages,
  proxy: d.proxy,
}))

interface QuotaItemProps {
  label: string
  used: number
  limit: number
  format?: boolean
}

const QuotaItem = ({ label, used, limit, format = true }: QuotaItemProps) => {
  const pct = Math.round((used / limit) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">{label}</span>
        <span className="text-xs font-mono text-muted-foreground">
          {format ? formatNumber(used) : used} /{' '}
          {format ? formatNumber(limit) : limit}
        </span>
      </div>
      <Progress value={pct} className="h-2" />
      <p className="text-[10px] text-muted-foreground text-right">
        {pct}% used
      </p>
    </div>
  )
}

const UsageContainer = () => {
  const u = mockUsage.currentPeriod

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Usage</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Current billing period: Feb 1 – Feb 28, 2026
        </p>
      </div>

      {/* Quotas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-5 space-y-5">
          <h2 className="text-sm font-medium text-foreground">
            Resource Quotas
          </h2>
          <QuotaItem
            label="Pages Crawled"
            used={u.pagesCrawled}
            limit={u.pagesLimit}
          />
          <QuotaItem
            label="Proxy Requests"
            used={u.proxyRequests}
            limit={u.proxyLimit}
          />
          <QuotaItem
            label="Collections"
            used={u.collectionsUsed}
            limit={u.collectionsLimit}
            format={false}
          />
          <QuotaItem
            label="Fetchers"
            used={u.fetchersUsed}
            limit={u.fetchersLimit}
            format={false}
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-medium text-foreground mb-4">
            Daily Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
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
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', color: 'hsl(220, 10%, 50%)' }}
              />
              <Bar
                dataKey="pages"
                fill="hsl(173, 58%, 45%)"
                radius={[4, 4, 0, 0]}
                name="Pages"
              />
              <Bar
                dataKey="proxy"
                fill="hsl(199, 89%, 48%)"
                radius={[4, 4, 0, 0]}
                name="Proxy"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default UsageContainer
