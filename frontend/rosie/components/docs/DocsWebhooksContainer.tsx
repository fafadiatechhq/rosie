const DocsWebhooksContainer = () => {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Webhooks
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Receive real-time notifications when crawl events occur. Each fetcher
          supports progress and completion webhooks.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Supported Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-card p-4 space-y-1">
            <p className="text-sm font-semibold text-foreground">Progress</p>
            <p className="text-xs text-muted-foreground">
              Periodic updates during a crawl run with current page count and
              status.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 space-y-1">
            <p className="text-sm font-semibold text-foreground">Completion</p>
            <p className="text-xs text-muted-foreground">
              Fired when a run finishes — includes success/failure status and
              final metrics.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Register a Webhook
        </h2>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`POST /api/v1/fetchers/{fetcherId}/webhooks

{
  "url": "https://your-server.com/webhooks/rosie",
  "events": ["progress", "completion"],
  "secret": "whsec_your_signing_secret"
}`}</pre>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Payload Format
        </h2>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`{
  "event": "completion",
  "fetcherId": "fet-abc123",
  "runId": "run-xyz789",
  "status": "success",
  "pagesCrawled": 12450,
  "startedAt": "2026-02-07T08:00:00Z",
  "endedAt": "2026-02-07T10:45:00Z",
  "timestamp": "2026-02-07T10:45:01Z"
}`}</pre>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Security</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All webhook payloads are signed using HMAC-SHA256 with your webhook
          secret. Verify the
          <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded mx-1">
            X-Rosie-Signature
          </code>
          header to ensure the request is authentic.
        </p>
        <div className="rounded-lg bg-sidebar p-4 font-mono text-xs text-sidebar-foreground overflow-x-auto">
          <pre>{`// Node.js verification example
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}`}</pre>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Retry Policy</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            Failed deliveries are retried up to{' '}
            <strong className="text-foreground">5 times</strong>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            Exponential backoff: 30s, 2m, 10m, 30m, 2h
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            Webhook is disabled after 5 consecutive failures
          </li>
        </ul>
      </section>
    </article>
  )
}
export default DocsWebhooksContainer
