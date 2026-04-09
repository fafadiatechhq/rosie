const DocsAuthenticationContainer = () => {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Authentication
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Rosie uses API keys to authenticate all requests. Every account can
          generate multiple key pairs for different environments or
          integrations.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Key Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">
              Publishable Key
            </p>
            <p className="text-xs text-muted-foreground">
              Prefix:{' '}
              <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">
                rk_live_
              </code>
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Used in API requests. Can be exposed in client-side code but has
              limited permissions.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">Secret Key</p>
            <p className="text-xs text-muted-foreground">
              Prefix:{' '}
              <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">
                rs_live_
              </code>
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Full permissions. Must be kept server-side. Never expose in client
              code or version control.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Using API Keys
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Include your API key in the{' '}
          <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">
            Authorization
          </code>{' '}
          header:
        </p>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`curl -X GET https://api.rosie.dev/v1/collections \\
  -H "Authorization: Bearer rk_live_your_api_key" \\
  -H "Content-Type: application/json"`}</pre>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Key Management
        </h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            'Rotate keys periodically — old keys can be revoked without downtime',
            'Use separate keys for development and production environments',
            'Secret keys are shown only once at creation — store them securely',
            'Revoked keys return 401 Unauthorized immediately',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Rate Limits</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Plan
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Rate Limit
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Burst
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2.5 text-foreground">Starter</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  100 req/min
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">20</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-foreground">Pro</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  500 req/min
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">50</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-foreground">Enterprise</td>
                <td className="px-4 py-2.5 text-muted-foreground">Custom</td>
                <td className="px-4 py-2.5 text-muted-foreground">Custom</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  )
}
export default DocsAuthenticationContainer
