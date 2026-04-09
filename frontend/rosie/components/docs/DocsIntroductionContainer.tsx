import Link from 'next/link'
import {
  ArrowRight,
  Layers,
  Settings2,
  Key,
  Webhook,
  Code2,
} from 'lucide-react'

const quickLinks = [
  {
    label: 'Quickstart Guide',
    desc: 'Get your first crawl running in 2 minutes',
    path: '/docs/quickstart',
    icon: ArrowRight,
  },
  {
    label: 'Collections',
    desc: 'Organise fetchers into logical groups',
    path: '/docs/collections',
    icon: Layers,
  },
  {
    label: 'Fetchers',
    desc: 'Configure crawl jobs with depth, scheduling & more',
    path: '/docs/fetchers',
    icon: Settings2,
  },
  {
    label: 'Authentication',
    desc: 'API keys, scopes, and security',
    path: '/docs/authentication',
    icon: Key,
  },
  {
    label: 'Webhooks',
    desc: 'Real-time notifications for crawl events',
    path: '/docs/webhooks',
    icon: Webhook,
  },
  {
    label: 'REST API',
    desc: 'Full endpoint reference with examples',
    path: '/docs/api',
    icon: Code2,
  },
]

const DocsIntroductionContainer = () => {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Rosie Documentation
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          Rosie is a multi-tenant, API-first platform that enables teams to
          crawl, monitor, and archive web content at scale. This documentation
          covers everything from initial setup to advanced configuration.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          What is Rosie?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Rosie provides distributed crawling infrastructure with configurable
          fetcher types, observability through logs and webhooks, and
          usage-based billing. It's designed for startups, data teams, and
          enterprises requiring reliable and compliant web crawling with
          predictable costs.
        </p>
        <div className="grid grid-cols-3 gap-4 py-2">
          {[
            { stat: '6', label: 'Fetcher Types' },
            { stat: '99.9%', label: 'Uptime SLA' },
            { stat: '< 200ms', label: 'API Latency' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-card p-4 text-center"
            >
              <p className="text-2xl font-bold text-primary">{item.stat}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Explore the docs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 hover:border-primary/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <link.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {link.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
export default DocsIntroductionContainer