"use client";
import { mockAccounts } from "@/data/admin-mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Building2, Search, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const formatNumber = (n: number): string => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

const timeAgo = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days > 30) return `${Math.floor(days / 30)}mo ago`;
  return `${days}d ago`;
}

export default function AccountsContainer() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<string>("all");

  const filtered = mockAccounts.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.accountId.includes(search);
    const matchesPlan = planFilter === "all" || a.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Accounts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mockAccounts.length} total accounts across all plans
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {["all", "basic", "pro", "enterprise"].map((p) => (
            <Button
              key={p}
              variant={planFilter === p ? "default" : "outline"}
              size="xs"
              onClick={() => setPlanFilter(p)}
              className="capitalize"
            >
              {p === "all" ? "All Plans" : p}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Account
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Plan
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Users
                </th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Collections
                </th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Pages
                </th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  MRR
                </th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr
                  key={a.accountId}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-foreground">{a.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">
                        {a.accountId}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        a.plan === "enterprise"
                          ? "bg-chart-2/10 text-chart-2"
                          : a.plan === "pro"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {a.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge
                      status={a.status === "active" ? "active" : "paused"}
                    />
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-muted-foreground">
                    {a.usersCount}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-muted-foreground">
                    {a.collectionsCount}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-muted-foreground">
                    {formatNumber(a.pagesCrawled)}
                    {a.pagesLimit > 0 && (
                      <span className="text-[10px]">
                        {" "}
                        / {formatNumber(a.pagesLimit)}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-foreground">
                    ${a.mrr}
                  </td>
                  <td className="py-3 px-4 text-right text-xs text-muted-foreground">
                    {timeAgo(a.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
