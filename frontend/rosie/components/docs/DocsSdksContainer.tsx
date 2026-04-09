import Link from 'next/link'

const DocsSdksContainer = () => {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          SDKs & Libraries
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Official client libraries make it easy to integrate Rosie into your
          stack.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Official SDKs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              lang: 'Node.js / TypeScript',
              pkg: 'npm install @rosie/sdk',
              status: 'Stable',
            },
            { lang: 'Python', pkg: 'pip install rosie-sdk', status: 'Stable' },
            {
              lang: 'Go',
              pkg: 'go get github.com/rosie-dev/go-sdk',
              status: 'Beta',
            },
            {
              lang: 'Ruby',
              pkg: 'gem install rosie-sdk',
              status: 'Coming Soon',
            },
          ].map((sdk) => (
            <div
              key={sdk.lang}
              className="rounded-lg border border-border bg-card p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  {sdk.lang}
                </p>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    sdk.status === 'Stable'
                      ? 'bg-success/10 text-success'
                      : sdk.status === 'Beta'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {sdk.status}
                </span>
              </div>
              <div className="rounded bg-sidebar px-3 py-2 font-mono text-xs text-sidebar-foreground">
                {sdk.pkg}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Node.js Example
        </h2>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`import { RosieClient } from '@rosie/sdk';

const rosie = new RosieClient({
  apiKey: 'rk_live_your_api_key',
});

// Create a collection
const collection = await rosie.collections.create({
  name: 'E-Commerce Monitoring',
});

// Add a fetcher
const fetcher = await rosie.fetchers.create(collection.id, {
  name: 'Product Pages',
  type: 'seedlist',
  seeds: ['https://example.com/products'],
  depth: 2,
});

// Trigger a run
const run = await rosie.fetchers.run(fetcher.id);
console.log('Run started:', run.runId);`}</pre>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Python Example
        </h2>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`from rosie import RosieClient

client = RosieClient(api_key="rk_live_your_api_key")

# Create a collection
collection = client.collections.create(name="News Aggregation")

# Add a fetcher
fetcher = client.fetchers.create(
    collection_id=collection.id,
    name="RSS Feed Monitor",
    type="rss",
    seeds=["https://news.example.com/feed"],
    schedule="interval",
)

# Check run status
status = client.fetchers.status(fetcher.id)
print(f"Pages crawled: {status.pages_crawled}")`}</pre>
        </div>
      </section>

      <section className="rounded-lg border border-primary/20 bg-primary/5 p-6 space-y-2">
        <h3 className="text-base font-semibold text-foreground">
          Need a different language?
        </h3>
        <p className="text-sm text-muted-foreground">
          You can always use the{' '}
          <Link href="/docs/api" className="text-primary hover:underline">
            REST API directly
          </Link>{' '}
          with any HTTP client. Community SDKs are welcome — reach out on
          GitHub.
        </p>
      </section>
    </article>
  )
}
export default DocsSdksContainer
