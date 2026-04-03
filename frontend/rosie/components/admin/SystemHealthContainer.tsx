import { mockWorkers } from '@/data/admin-mock-data'
import { StatusBadge } from '@/components/StatusBadge'
import { HeartPulse, Cpu, HardDrive, Activity } from 'lucide-react'
import { cn } from '@/utils/utils'

const SystemHealthContainer = () => {
  const healthyCount = mockWorkers.filter((w) => w.status === 'healthy').length
  const degradedCount = mockWorkers.filter(
    (w) => w.status === 'degraded',
  ).length
  const downCount = mockWorkers.filter((w) => w.status === 'down').length

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          System Health
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Worker node status and resource utilization
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="text-2xl font-semibold font-mono text-foreground">
              {healthyCount}
            </p>
            <p className="text-xs text-muted-foreground">Healthy nodes</p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-semibold font-mono text-foreground">
              {degradedCount}
            </p>
            <p className="text-xs text-muted-foreground">Degraded</p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <p className="text-2xl font-semibold font-mono text-foreground">
              {downCount}
            </p>
            <p className="text-xs text-muted-foreground">Down</p>
          </div>
        </div>
      </div>

      {/* Worker cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockWorkers.map((w) => (
          <div
            key={w.nodeId}
            className={cn(
              'rounded-xl border bg-card p-5',
              w.status === 'down'
                ? 'border-destructive/30'
                : w.status === 'degraded'
                  ? 'border-warning/30'
                  : 'border-border',
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-mono font-medium text-foreground">
                  {w.nodeId}
                </p>
                <p className="text-xs text-muted-foreground">{w.region}</p>
              </div>
              <StatusBadge
                status={
                  w.status === 'healthy'
                    ? 'active'
                    : w.status === 'degraded'
                      ? 'paused'
                      : 'failed'
                }
              />
            </div>

            <div className="space-y-3">
              {/* CPU */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Cpu className="w-3 h-3" /> CPU
                  </div>
                  <span className="text-xs font-mono text-foreground">
                    {w.cpu}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted">
                  <div
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      w.cpu > 85
                        ? 'bg-destructive'
                        : w.cpu > 70
                          ? 'bg-warning'
                          : 'bg-primary',
                    )}
                    style={{ width: `${w.cpu}%` }}
                  />
                </div>
              </div>

              {/* Memory */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <HardDrive className="w-3 h-3" /> Memory
                  </div>
                  <span className="text-xs font-mono text-foreground">
                    {w.memory}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted">
                  <div
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      w.memory > 85
                        ? 'bg-destructive'
                        : w.memory > 70
                          ? 'bg-warning'
                          : 'bg-primary',
                    )}
                    style={{ width: `${w.memory}%` }}
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-xs text-muted-foreground">
                  {w.activeTasks} active tasks
                </span>
                <span className="text-xs text-muted-foreground">
                  Up: {w.uptime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default SystemHealthContainer
