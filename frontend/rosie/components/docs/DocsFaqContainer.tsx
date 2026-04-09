import Link from 'next/link'

const faqs = [
  {
    q: 'What is the primary billing unit?',
    a: 'Pages Crawled is the primary metering unit. Proxy usage is tracked separately. You can monitor your usage in the dashboard or via the /account/usage API endpoint.',
  },
  {
    q: 'What output formats are supported?',
    a: 'All crawl outputs are stored in WARC format. Optional GZIP compression is available. You can download outputs via the API or push them to any S3-compatible storage.',
  },
  {
    q: 'How long is crawl data retained?',
    a: 'Starter and Pro plans retain data for 180 days. Enterprise plans offer 3-year retention. Custom retention policies can be configured by platform admins.',
  },
  {
    q: 'Can I use a headless browser for JavaScript-heavy sites?',
    a: "Yes — enable the 'useHeadless' option on any fetcher. This uses Puppeteer under the hood. Note that headless mode is only available on Pro and Enterprise plans.",
  },
  {
    q: 'How does the rotating proxy work?',
    a: "When enabled, requests are routed through Rosie's proxy pool to avoid IP-based blocking. Enterprise customers get dedicated proxy pools. Proxy usage is billed separately.",
  },
  {
    q: 'What happens if a crawl fails?',
    a: "Failed runs are logged with error details. You'll receive a completion webhook with failure status. Runs can be retried manually or will follow your configured schedule.",
  },
  {
    q: 'How do I invite team members?',
    a: 'Account Admins can invite members via Settings → Team Management. Team Members get access to collections and fetchers but not billing or user management.',
  },
  {
    q: 'Is there an API rate limit?',
    a: 'Yes — Starter: 100 req/min, Pro: 500 req/min, Enterprise: custom limits. Exceeding the limit returns a 429 status with a Retry-After header.',
  },
]

const DocsFaqContainer = () => {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Quick answers to common questions about Rosie.
        </p>
      </header>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-5 space-y-2"
          >
            <h3 className="text-sm font-semibold text-foreground">{faq.q}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-primary/20 bg-primary/5 p-6 space-y-2">
        <h3 className="text-base font-semibold text-foreground">
          Still have questions?
        </h3>
        <p className="text-sm text-muted-foreground">
          Check the{' '}
          <Link href="/docs/api" className="text-primary hover:underline">
            API reference
          </Link>{' '}
          for technical details, or reach out to our support team at{' '}
          <span className="text-foreground font-medium">support@rosie.dev</span>
          .
        </p>
      </section>
    </article>
  )
}
export default DocsFaqContainer
