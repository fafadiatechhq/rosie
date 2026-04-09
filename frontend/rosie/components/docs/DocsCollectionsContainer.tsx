const DocsCollectionsContainer = () => {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Collections
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Collections are logical groupings of fetchers. Use them to organise
          crawl jobs by project, domain, or team.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Key Properties
        </h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                  Field
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
                  collectionId
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">UUID</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Unique identifier
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                  accountId
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">UUID</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Owning account
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                  name
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">string</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Display name (max 80 chars)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                  createdAt
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">timestamp</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Creation time (ISO 8601)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Create a Collection
        </h2>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`POST /api/v1/collections

{
  "name": "E-Commerce Monitoring"
}

# Response 201
{
  "collectionId": "col-abc123",
  "accountId": "acc-001",
  "name": "E-Commerce Monitoring",
  "createdAt": "2026-02-07T10:00:00Z"
}`}</pre>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          List Collections
        </h2>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`GET /api/v1/collections

# Response 200
{
  "data": [
    { "collectionId": "col-abc123", "name": "E-Commerce Monitoring", ... },
    { "collectionId": "col-def456", "name": "News Aggregation", ... }
  ],
  "total": 2
}`}</pre>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Plan Limits</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            <strong className="text-foreground">Starter:</strong> 5 collections
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            <strong className="text-foreground">Pro:</strong> 25 collections
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            <strong className="text-foreground">Enterprise:</strong> Unlimited
          </li>
        </ul>
      </section>
    </article>
  )
}
export default DocsCollectionsContainer
