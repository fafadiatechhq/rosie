import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const DocsQuickstartContainer = () => {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Quickstart
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Get your first crawl running in under 2 minutes.
        </p>
      </header>

      {/* Step 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            1
          </span>
          Create an Account
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Sign up at{' '}
          <Link href="/signup" className="text-primary hover:underline">
            rosie.dev/signup
          </Link>
          . No credit card is required for the Starter plan.
        </p>
      </section>

      {/* Step 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            2
          </span>
          Generate API Keys
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Navigate to{' '}
          <strong className="text-foreground">Settings → API Keys</strong> and
          generate a new key pair. Copy both the publishable key and the secret
          key.
        </p>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`# Your keys will look like this:
API Key:    rk_live_abc123...
Secret Key: rs_live_xyz789...`}</pre>
        </div>
      </section>

      {/* Step 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            3
          </span>
          Create a Collection
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Collections group related fetchers. Create one via the API:
        </p>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`curl -X POST https://api.rosie.dev/v1/collections \\
  -H "Authorization: Bearer rk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "E-Commerce Monitoring" }'`}</pre>
        </div>
      </section>

      {/* Step 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            4
          </span>
          Create and Run a Fetcher
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Add a fetcher to your collection, then trigger a run:
        </p>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`# Create a seedlist fetcher
curl -X POST https://api.rosie.dev/v1/collections/{id}/fetchers \\
  -H "Authorization: Bearer rk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Product Pages",
    "type": "seedlist",
    "seeds": ["https://example.com/products"],
    "depth": 2,
    "schedule": "once"
  }'

# Trigger a run
curl -X POST https://api.rosie.dev/v1/fetchers/{id}/run \\
  -H "Authorization: Bearer rk_live_..."`}</pre>
        </div>
      </section>

      {/* Next steps */}
      <section className="rounded-lg border border-primary/20 bg-primary/5 p-6 space-y-3">
        <h3 className="text-base font-semibold text-foreground">Next steps</h3>
        <ul className="space-y-2">
          {[
            { label: 'Learn about fetcher types', path: '/docs/fetchers' },
            {
              label: 'Set up webhooks for real-time updates',
              path: '/docs/webhooks',
            },
            { label: 'Explore the full API reference', path: '/docs/api' },
          ].map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
export default DocsQuickstartContainer
