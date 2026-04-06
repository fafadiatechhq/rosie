import { Network } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/utils/utils";

const mockProxyPools = [
  {
    id: "pool-us-rotate",
    name: "US Rotating",
    region: "us-east-1",
    type: "rotating",
    totalIPs: 5000,
    activeIPs: 4820,
    status: "healthy" as const,
    assignedTo: "All plans",
  },
  {
    id: "pool-eu-rotate",
    name: "EU Rotating",
    region: "eu-west-1",
    type: "rotating",
    totalIPs: 3200,
    activeIPs: 3100,
    status: "healthy" as const,
    assignedTo: "All plans",
  },
  {
    id: "pool-ds-dedicated",
    name: "DataStream Dedicated",
    region: "us-east-1",
    type: "dedicated",
    totalIPs: 500,
    activeIPs: 488,
    status: "healthy" as const,
    assignedTo: "DataStream Inc",
  },
  {
    id: "pool-ih-dedicated",
    name: "InfoHarvest Dedicated",
    region: "eu-west-1",
    type: "dedicated",
    totalIPs: 300,
    activeIPs: 295,
    status: "degraded" as const,
    assignedTo: "InfoHarvest",
  },
];

export const ProxiesContainer = () => {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Proxy Pools
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage rotating and dedicated proxy resources
          </p>
        </div>
        <Network className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockProxyPools.map((pool) => (
          <div
            key={pool.id}
            className={cn(
              "rounded-xl border bg-card p-5",
              pool.status === "degraded"
                ? "border-warning/30"
                : "border-border",
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  {pool.name}
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  {pool.region} • {pool.type}
                </p>
              </div>
              <StatusBadge
                status={pool.status === "healthy" ? "active" : "paused"}
              />
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">
                    Active IPs
                  </span>
                  <span className="text-xs font-mono text-foreground">
                    {pool.activeIPs.toLocaleString()} /{" "}
                    {pool.totalIPs.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-primary"
                    style={{
                      width: `${(pool.activeIPs / pool.totalIPs) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-[10px] text-muted-foreground">
                  Assigned to
                </span>
                <span className="text-xs text-foreground">
                  {pool.assignedTo}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
