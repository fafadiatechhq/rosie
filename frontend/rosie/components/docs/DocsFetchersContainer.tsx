const DocsFetchersContainer = () => {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Fetchers
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          A fetcher is a crawl job. Each fetcher belongs to exactly one
          collection and defines what to crawl, how deep, and on what schedule.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Fetcher Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              type: 'Seedlist',
              desc: 'Crawl from an explicit list of seed URLs. Best for targeted scraping.',
            },
            {
              type: 'Monitor',
              desc: 'Track changes on specific pages over time. Ideal for price monitoring.',
            },
            {
              type: 'Full Site',
              desc: 'Crawl an entire website starting from the root. Good for archiving.',
            },
            {
              type: 'Discovery',
              desc: 'Automatically discover and follow new URLs within inclusion domains.',
            },
            {
              type: 'RSS',
              desc: 'Parse and follow RSS/Atom feeds for new content.',
            },
            {
              type: 'Sitemap',
              desc: 'Extract and crawl URLs from XML sitemaps.',
            },
          ].map((item) => (
            <div
              key={item.type}
              className="rounded-lg border border-border bg-card p-4 space-y-1"
            >
              <p className="text-sm font-semibold text-foreground">
                {item.type}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Configuration</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Option
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Type
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                  seeds
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">string[]</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Starting URLs
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                  depth
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  number (1–10)
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Max link depth to follow
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                  schedule
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  once | interval | cron
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Execution timing
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                  inclusionDomains
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">string[]</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Only crawl these domains
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                  exclusionDomains
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">string[]</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Skip these domains
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                  useHeadless
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">boolean</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Use Puppeteer for JS-rendered pages
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                  rotatingProxy
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">boolean</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Route through proxy pool (billable)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Create a Fetcher
        </h2>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`POST /api/v1/collections/{collectionId}/fetchers

{
  "name": "Product Pages",
  "type": "seedlist",
  "seeds": ["https://example.com/products"],
  "depth": 2,
  "schedule": "once",
  "useHeadless": false,
  "rotatingProxy": false,
  "inclusionDomains": ["example.com"],
  "exclusionDomains": []
}`}</pre>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Trigger a Run</h2>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`POST /api/v1/fetchers/{fetcherId}/run

# Response 202
{
  "runId": "run-abc123",
  "fetcherId": "fet-xyz789",
  "status": "running",
  "pagesCrawled": 0,
  "startedAt": "2026-02-07T10:00:00Z",
  "endedAt": null
}`}</pre>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Outputs</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            Output is stored in{' '}
            <strong className="text-foreground">WARC format</strong>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            Optional{' '}
            <strong className="text-foreground">GZIP compression</strong>{' '}
            available
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            Download via API or push to S3-compatible storage
          </li>
        </ul>
      </section>
    </article>
  )
}
export default DocsFetchersContainer
