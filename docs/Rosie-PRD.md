# Product Requirements Document (PRD)

## Product Name
Rosie

## Version
v1.0 (Final)

## Author
Sidharth Shah

## Last Updated
2026-02-07

---

## 1. Overview

The Rosie is a multi-tenant, API-first platform that enables teams to crawl, monitor, and archive web content at scale. The system supports distributed crawling, configurable fetcher types, observability through logs and webhooks, and usage-based billing.

The product is designed to serve startups, data teams, and enterprises requiring reliable and compliant web crawling with predictable costs.

---

## 2. Goals & Non-Goals

### Goals
- Reliable distributed crawling
- API-first architecture
- Clear usage-based billing (pages crawled)
- Strong observability (logs, status, webhooks)
- Multi-tenant role-based access

### Non-Goals (MVP)
- Multi-region execution
- Advanced crawl heuristics
- SAML / Enterprise IAM
- Cost optimization intelligence

---

## 3. User Roles & Permissions

### Platform Admin
- Manage all accounts
- Configure plans, quotas, retention
- View system-wide metrics and logs

### Account Admin (Account User)
- Manage billing and subscription
- Manage team members
- Full access to collections and fetchers

### Team Member
- Create and manage collections and fetchers
- View logs and outputs
- No billing or user management access

---

## 4. Core Concepts

| Concept | Description |
|------|------------|
| Account | A customer tenant |
| Collection | Logical grouping of fetchers |
| Fetcher | A crawl job |
| Run | One execution cycle of a fetcher |
| Page | Successfully fetched HTML document |
| Output | WARC / GZIP artifacts |

---

## 5. Functional Requirements

### 5.1 Collections
- Multiple collections per account
- Aggregate logs and metrics
- CRUD operations via API and UI

### 5.2 Fetchers

#### Fetcher Types
- Seedlist
- Monitor
- Full Site
- Discovery
- RSS
- Sitemap

#### Configuration Options
- URL seeds
- Crawl depth
- Scheduling (one-time, interval, cron)
- Inclusion domains
- Exclusion domains
- Execution mode: HTTP client or Headless (Puppeteer)
- Optional rotating proxy
- Output format: WARC
- Optional GZIP compression

Each fetcher belongs to exactly one collection.

---

### 5.3 Distributed Crawling
- Stateless workers
- Centralized job queue
- Horizontal scaling
- Subscription-based concurrency limits

---

### 5.4 Webhooks

Each fetcher supports:
- Periodic progress webhook
- Completion webhook (success or failure)

Webhook payload includes fetcher ID, run ID, status, pages crawled, and timestamps.

---

### 5.5 Logs & Observability

- Fetcher-level logs
- Collection-level aggregated logs
- Admin system logs

#### Retention
- Default: 180 days
- Enterprise: 3 years

---

### 5.6 Outputs

- Stored in WARC format
- Optional GZIP compression
- Download via API
- Push to external storage (S3-compatible)

---

## 6. Non-Functional Requirements

| Area | Requirement |
|---|---|
| API | REST, OpenAPI v1 |
| Auth | API keys (v1), SAML (future) |
| Security | Tenant isolation, encrypted storage |
| Scalability | Horizontal worker scaling |
| Availability | Tier-based SLA |

---
## 9. Use Cases

Great PRD — it’s already very story-friendly 👍
Below is a **role-organised list of user stories**, derived directly from the PRD, each with a **unique ID** and written in classic *“As a … I want … so that …”* format.

---

## Platform Admin – User Stories

| ID    | Role           | User Story                                                                                                               |
| ----- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| PA-01 | Platform Admin | As a Platform Admin, I want to view a list of all customer accounts so that I can manage the platform centrally.         |
| PA-02 | Platform Admin | As a Platform Admin, I want to view account-level usage metrics so that I can monitor consumption and detect abuse.      |
| PA-03 | Platform Admin | As a Platform Admin, I want to configure subscription plans and quotas so that billing aligns with product tiers.        |
| PA-04 | Platform Admin | As a Platform Admin, I want to view system-wide logs so that I can troubleshoot platform issues.                         |
| PA-05 | Platform Admin | As a Platform Admin, I want to monitor system health and worker status so that I can ensure high availability.           |
| PA-06 | Platform Admin | As a Platform Admin, I want to manage proxy pools so that enterprise customers get dedicated resources.                  |
| PA-07 | Platform Admin | As a Platform Admin, I want to apply retention policies per plan so that storage costs are controlled.                   |
| PA-08 | Platform Admin | As a Platform Admin, I want to activate kill switches for failed or abusive fetchers so that the system remains stable.  |

---

## Account Admin – User Stories

| ID    | Role          | User Story                                                                                                                   |
| ----- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| AA-01 | Account Admin | As an Account Admin, I want to manage my subscription plan so that it matches my crawling needs.                             |
| AA-02 | Account Admin | As an Account Admin, I want to view my account’s usage and page crawl limits so that I can avoid overages.                   |
| AA-03 | Account Admin | As an Account Admin, I want to manage billing details and payment methods so that invoices are paid correctly.               |
| AA-04 | Account Admin | As an Account Admin, I want to create and manage collections so that fetchers are logically grouped.                         |
| AA-05 | Account Admin | As an Account Admin, I want to invite and manage team members so that access is controlled.                                  |
| AA-06 | Account Admin | As an Account Admin, I want to configure default webhook settings so that my systems receive crawl events automatically.     |
| AA-07 | Account Admin | As an Account Admin, I want to manage API keys so that integrations remain secure.                                           |
| AA-08 | Account Admin | As an Account Admin, I want to download crawl outputs or push them to external storage so that data is archived externally.  |

---

## Team Member – User Stories

| ID    | Role        | User Story                                                                                                              |
| ----- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| TM-01 | Team Member | As a Team Member, I want to create fetchers within a collection so that I can start crawl jobs.                         |
| TM-02 | Team Member | As a Team Member, I want to choose a fetcher type (seedlist, sitemap, RSS, etc.) so that crawling matches my use case.  |
| TM-03 | Team Member | As a Team Member, I want to configure crawl depth, domains, and scheduling so that crawls behave predictably.           |
| TM-04 | Team Member | As a Team Member, I want to run a fetcher on demand so that I can trigger crawls manually.                              |
| TM-05 | Team Member | As a Team Member, I want to view fetcher run status and progress so that I know when a crawl completes.                 |
| TM-06 | Team Member | As a Team Member, I want to view fetcher-level and collection-level logs so that I can debug crawl issues.              |
| TM-07 | Team Member | As a Team Member, I want to access crawl outputs via API or UI so that I can consume the data downstream.               |
| TM-08 | Team Member | As a Team Member, I want to configure webhooks per fetcher so that my systems receive run updates.                      |

---

## API Consumer (Cross-Role) – User Stories

| ID     | Role         | User Story                                                                                                    |
| ------ | ------------ | ------------------------------------------------------------------------------------------------------------- |
| API-01 | API Consumer | As an API Consumer, I want to create and manage collections via REST APIs so that I can automate setup.       |
| API-02 | API Consumer | As an API Consumer, I want to trigger fetcher runs programmatically so that crawls integrate into workflows.  |
| API-03 | API Consumer | As an API Consumer, I want to retrieve logs and status via API so that I can monitor crawls externally.       |
| API-04 | API Consumer | As an API Consumer, I want to download WARC outputs via API so that data pipelines can consume them.          |

---

## 8. Data Model

### Account
```json
{
  "accountId": "uuid",
  "name": "string",
  "plan": "basic|pro|enterprise",
  "status": "active|suspended",
  "createdAt": "timestamp"
}
```

### User
```json
{
  "userId": "uuid",
  "accountId": "uuid",
  "email": "string",
  "role": "platform_admin|account_admin|team_member",
  "createdAt": "timestamp"
}
```

### Collection
```json
{
  "collectionId": "uuid",
  "accountId": "uuid",
  "name": "string",
  "createdAt": "timestamp"
}
```

### Fetcher
```json
{
  "fetcherId": "uuid",
  "collectionId": "uuid",
  "type": "seedlist|monitor|full_site|discovery|rss|sitemap",
  "useHeadless": true,
  "rotatingProxy": true,
  "schedule": "cron|interval|once",
  "depth": 3,
  "inclusionDomains": [],
  "exclusionDomains": []
}
```

### Fetcher Run
```json
{
  "runId": "uuid",
  "fetcherId": "uuid",
  "status": "running|success|failure",
  "pagesCrawled": 12345,
  "startedAt": "timestamp",
  "endedAt": "timestamp"
}
```

---

## 9. API (OpenAPI v1 – Core Endpoints)

### Collections
- GET /api/v1/collections
- POST /api/v1/collections
- GET /api/v1/collections/{id}
- DELETE /api/v1/collections/{id}

### Fetchers
- POST /api/v1/collections/{id}/fetchers
- GET /api/v1/fetchers/{id}
- PUT /api/v1/fetchers/{id}
- DELETE /api/v1/fetchers/{id}
- POST /api/v1/fetchers/{id}/run

### Logs & Status
- GET /api/v1/fetchers/{id}/logs
- GET /api/v1/fetchers/{id}/status

### Webhooks
- POST /api/v1/fetchers/{id}/webhooks
- DELETE /api/v1/webhooks/{id}

### Billing
- GET /api/v1/account/usage
- GET /api/v1/account/billing

---

## 10. Billing & Usage

### Metering
- Primary unit: Pages Crawled
- Proxy usage tracked separately

### Subscription Tiers

#### Basic
- 5 collections
- 10 fetchers
- 500K pages / month
- No headless
- 180-day retention

#### Pro
- 25 collections
- 100 fetchers
- 5M pages / month
- Headless enabled
- Limited proxy usage
- 180-day retention

#### Enterprise
- Unlimited collections & fetchers
- Unlimited pages
- Dedicated proxy pools
- 3-year retention
- SAML & custom SLA

---

## 11. Dashboards & UI

### UI URL Structure

#### Public (Unauthenticated)
- Landing Page: `/`
- Pricing: `/pricing`
- Documentation: `/docs`
- Login: `/login`
- Signup: `/signup`
- Forgot Password: `/forgot-password`
- Terms of Service: `/terms`
- Privacy Policy: `/privacy`
- System Status: `/status`

#### Onboarding
- Welcome: `/onboarding`
- Create Collection: `/onboarding/collection`
- Create Fetcher: `/onboarding/fetcher`
- API Keys: `/onboarding/api-keys`

#### Account Dashboard (Account Admin & Team Members)
Base Path: `/app`

- Dashboard Overview: `/app/dashboard`
- Activity Feed: `/app/activity`

##### Collections
- Collections List: `/app/collections`
- Create Collection: `/app/collections/new`
- Collection Overview: `/app/collections/{collectionId}`
- Collection Logs: `/app/collections/{collectionId}/logs`
- Collection Settings: `/app/collections/{collectionId}/settings`

##### Fetchers
- Create Fetcher: `/app/collections/{collectionId}/fetchers/new`
- Fetcher Overview: `/app/fetchers/{fetcherId}`
- Fetcher Edit: `/app/fetchers/{fetcherId}/edit`
- Fetcher Logs: `/app/fetchers/{fetcherId}/logs`
- Fetcher Runs: `/app/fetchers/{fetcherId}/runs`
- Fetcher Webhooks: `/app/fetchers/{fetcherId}/webhooks`

##### Outputs
- Outputs List: `/app/outputs`
- Output Details: `/app/outputs/{outputId}`

##### Logs & Monitoring
- Logs Explorer: `/app/logs`
- Errors: `/app/errors`

##### Usage & Billing (Account Admin Only)
- Usage Overview: `/app/usage`
- Billing Summary: `/app/billing`
- Change Plan: `/app/billing/plan`
- Payment Methods: `/app/billing/payment-methods`
- Invoices: `/app/billing/invoices`

##### Team Management (Account Admin Only)
- Team Members: `/app/team`
- Invite Member: `/app/team/invite`
- Edit Member: `/app/team/{userId}`

##### Account Settings
- Settings Home: `/app/settings`
- API Keys: `/app/settings/api-keys`
- Webhook Defaults: `/app/settings/webhooks`
- Notifications: `/app/settings/notifications`
- Retention Policy: `/app/settings/retention`

#### Platform Admin Dashboard
Base Path: `/admin`

- Admin Overview: `/admin/dashboard`
- System Health: `/admin/system-health`

##### Accounts
- Accounts List: `/admin/accounts`
- Account Overview: `/admin/accounts/{accountId}`
- Account Usage: `/admin/accounts/{accountId}/usage`
- Account Billing: `/admin/accounts/{accountId}/billing`
- Account Users: `/admin/accounts/{accountId}/users`

##### Operations & Configuration
- Global Logs: `/admin/logs`
- Failed Fetchers: `/admin/failures`
- Kill Switches: `/admin/controls`
- Pricing Plans: `/admin/plans`
- Proxy Pools: `/admin/proxies`
- Feature Flags: `/admin/features`
- Retention Policies: `/admin/retention`

---


## 12. Future Enhancements (Phase-2)

- Fetcher versioning
- Pause / resume fetchers
- Advanced retry policies
- Soft quota warnings
- Multi-region crawling
- Cost forecasting
- Audit logs

---

## 13. Success Metrics

- Successful crawl completion rate
- Pages crawled per account
- Cost predictability
- Time-to-first-crawl
- Customer retention

---

## 14. Appendix

This document represents the final PRD for v1.0 and serves as the reference for engineering, design, and business planning.

