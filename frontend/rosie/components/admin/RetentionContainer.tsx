import { Archive } from 'lucide-react'

const retentionPolicies = [
  {
    plan: 'Basic',
    retentionDays: 180,
    logsRetention: '90 days',
    outputRetention: '180 days',
    description: 'Standard retention for starter teams',
  },
  {
    plan: 'Pro',
    retentionDays: 180,
    logsRetention: '180 days',
    outputRetention: '180 days',
    description: 'Extended log access with standard output retention',
  },
  {
    plan: 'Enterprise',
    retentionDays: 1095,
    logsRetention: '3 years',
    outputRetention: '3 years',
    description: 'Full compliance-grade retention with archival support',
  },
]

export default function RetentionContainer() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Retention Policies
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Data and log retention settings per plan tier
          </p>
        </div>
        <Archive className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {retentionPolicies.map((policy) => (
          <div
            key={policy.plan}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">
                {policy.plan}
              </h3>
              <span className="text-xs font-mono text-muted-foreground">
                {policy.retentionDays >= 365
                  ? `${Math.round(policy.retentionDays / 365)} year(s)`
                  : `${policy.retentionDays} days`}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {policy.description}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">
                  Crawl Outputs
                </p>
                <p className="text-sm font-medium font-mono text-foreground">
                  {policy.outputRetention}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Logs</p>
                <p className="text-sm font-medium font-mono text-foreground">
                  {policy.logsRetention}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
