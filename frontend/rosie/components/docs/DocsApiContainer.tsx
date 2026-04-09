const DocsApiContainer = () => {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          REST API Reference
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Complete reference for the Rosie REST API (OpenAPI v1). All endpoints
          require authentication via API key.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Base URL</h2>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground">
          <code>https://api.rosie.dev/v1</code>
        </div>
      </section>

      {/* Collections */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Collections</h2>
        {[
          { method: 'GET', path: '/collections', desc: 'List all collections' },
          {
            method: 'POST',
            path: '/collections',
            desc: 'Create a new collection',
          },
          {
            method: 'GET',
            path: '/collections/{id}',
            desc: 'Get collection details',
          },
          {
            method: 'DELETE',
            path: '/collections/{id}',
            desc: 'Delete a collection',
          },
        ].map((ep) => (
          <div
            key={ep.method + ep.path}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
          >
            <span
              className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                ep.method === 'GET'
                  ? 'bg-primary/10 text-primary'
                  : ep.method === 'POST'
                    ? 'bg-success/10 text-success'
                    : ep.method === 'PUT'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-destructive/10 text-destructive'
              }`}
            >
              {ep.method}
            </span>
            <code className="font-mono text-xs text-foreground flex-1">
              {ep.path}
            </code>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {ep.desc}
            </span>
          </div>
        ))}
      </section>

      {/* Fetchers */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Fetchers</h2>
        {[
          {
            method: 'POST',
            path: '/collections/{id}/fetchers',
            desc: 'Create a fetcher',
          },
          {
            method: 'GET',
            path: '/fetchers/{id}',
            desc: 'Get fetcher details',
          },
          { method: 'PUT', path: '/fetchers/{id}', desc: 'Update a fetcher' },
          {
            method: 'DELETE',
            path: '/fetchers/{id}',
            desc: 'Delete a fetcher',
          },
          { method: 'POST', path: '/fetchers/{id}/run', desc: 'Trigger a run' },
        ].map((ep) => (
          <div
            key={ep.method + ep.path}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
          >
            <span
              className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                ep.method === 'GET'
                  ? 'bg-primary/10 text-primary'
                  : ep.method === 'POST'
                    ? 'bg-success/10 text-success'
                    : ep.method === 'PUT'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-destructive/10 text-destructive'
              }`}
            >
              {ep.method}
            </span>
            <code className="font-mono text-xs text-foreground flex-1">
              {ep.path}
            </code>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {ep.desc}
            </span>
          </div>
        ))}
      </section>

      {/* Logs & Status */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Logs & Status</h2>
        {[
          {
            method: 'GET',
            path: '/fetchers/{id}/logs',
            desc: 'Get fetcher logs',
          },
          {
            method: 'GET',
            path: '/fetchers/{id}/status',
            desc: 'Get run status',
          },
        ].map((ep) => (
          <div
            key={ep.method + ep.path}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
          >
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
              {ep.method}
            </span>
            <code className="font-mono text-xs text-foreground flex-1">
              {ep.path}
            </code>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {ep.desc}
            </span>
          </div>
        ))}
      </section>

      {/* Webhooks */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Webhooks</h2>
        {[
          {
            method: 'POST',
            path: '/fetchers/{id}/webhooks',
            desc: 'Register a webhook',
          },
          {
            method: 'DELETE',
            path: '/webhooks/{id}',
            desc: 'Remove a webhook',
          },
        ].map((ep) => (
          <div
            key={ep.method + ep.path}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
          >
            <span
              className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                ep.method === 'POST'
                  ? 'bg-success/10 text-success'
                  : 'bg-destructive/10 text-destructive'
              }`}
            >
              {ep.method}
            </span>
            <code className="font-mono text-xs text-foreground flex-1">
              {ep.path}
            </code>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {ep.desc}
            </span>
          </div>
        ))}
      </section>

      {/* Billing */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Billing & Usage
        </h2>
        {[
          {
            method: 'GET',
            path: '/account/usage',
            desc: 'Get current usage metrics',
          },
          {
            method: 'GET',
            path: '/account/billing',
            desc: 'Get billing summary',
          },
        ].map((ep) => (
          <div
            key={ep.method + ep.path}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
          >
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
              {ep.method}
            </span>
            <code className="font-mono text-xs text-foreground flex-1">
              {ep.path}
            </code>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {ep.desc}
            </span>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Error Responses
        </h2>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Retry after 30 seconds.",
    "retryAfter": 30
  }
}

// Common status codes:
// 400 Bad Request — Invalid input
// 401 Unauthorized — Missing or invalid API key
// 403 Forbidden — Insufficient permissions
// 404 Not Found — Resource doesn't exist
// 429 Too Many Requests — Rate limit exceeded
// 500 Internal Server Error — Contact support`}</pre>
        </div>
      </section>
    </article>
  )
}
export default DocsApiContainer
