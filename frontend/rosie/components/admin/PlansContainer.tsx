import { mockPlans } from '@/data/admin-mock-data'
import { CreditCard, Check, X, Users } from 'lucide-react'
import { formatNumber } from '@/utils/formatNumber'

const PlansContainer = () => {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Plans & Quotas
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure subscription tiers and resource limits
          </p>
        </div>
        <CreditCard className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPlans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl border bg-card p-6 ${
              plan.name === 'Pro'
                ? 'border-primary/30 ring-1 ring-primary/20'
                : 'border-border'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold font-mono text-foreground mt-1">
                  ${plan.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    /mo
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                {plan.accountCount}
              </div>
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Collections</span>
                <span className="font-mono text-foreground">
                  {formatNumber(plan.collectionsLimit)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fetchers</span>
                <span className="font-mono text-foreground">
                  {formatNumber(plan.fetchersLimit)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pages / month</span>
                <span className="font-mono text-foreground">
                  {formatNumber(plan.pagesLimit)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Headless</span>
                {plan.headless ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <X className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Proxy</span>
                {plan.proxy ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <X className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Retention</span>
                <span className="font-mono text-foreground">
                  {plan.retentionDays >= 365
                    ? `${Math.round(plan.retentionDays / 365)}yr`
                    : `${plan.retentionDays}d`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default PlansContainer
