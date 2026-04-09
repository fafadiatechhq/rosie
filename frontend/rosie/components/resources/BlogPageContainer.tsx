import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const posts = [
  {
    slug: "web-crawling-at-scale-2026",
    title: "Web Crawling at Scale: Lessons from Processing 10 Billion Pages",
    excerpt:
      "How we architected Rosie's distributed crawling engine to handle enterprise-grade workloads with 99.9% uptime.",
    category: "Engineering",
    date: "Feb 5, 2026",
    readTime: "8 min read",
  },
  {
    slug: "anti-detection-proxy-rotation",
    title:
      "Beyond IP Rotation: Modern Anti-Detection Strategies for Web Crawlers",
    excerpt:
      "IP rotation is table stakes. Learn how fingerprint randomisation, header cycling, and request pacing keep crawlers undetected.",
    category: "Technical",
    date: "Jan 28, 2026",
    readTime: "6 min read",
  },
  {
    slug: "warc-format-deep-dive",
    title: "Why WARC Is the Gold Standard for Web Archiving",
    excerpt:
      "A deep dive into the WARC format — its structure, advantages over raw HTML dumps, and how Rosie leverages it for reproducible data pipelines.",
    category: "Data",
    date: "Jan 20, 2026",
    readTime: "5 min read",
  },
  {
    slug: "headless-vs-http-crawling",
    title: "Headless Browser vs HTTP Client: Choosing the Right Crawl Mode",
    excerpt:
      "When should you reach for Puppeteer and when is a simple HTTP client enough? We break down the cost, speed, and accuracy trade-offs.",
    category: "Guide",
    date: "Jan 12, 2026",
    readTime: "7 min read",
  },
  {
    slug: "usage-based-billing-crawlers",
    title: "Designing Usage-Based Billing for a Crawling Platform",
    excerpt:
      "How we settled on pages-crawled as our primary billing unit and the metering infrastructure behind it.",
    category: "Product",
    date: "Jan 5, 2026",
    readTime: "4 min read",
  },
  {
    slug: "webhook-reliability-patterns",
    title:
      "Building Reliable Webhooks: Retry Policies, Signing, and Observability",
    excerpt:
      "Practical patterns for ensuring webhook delivery — HMAC signatures, exponential backoff, and dead-letter queues.",
    category: "Engineering",
    date: "Dec 22, 2025",
    readTime: "6 min read",
  },
];

const categoryColors: Record<string, string> = {
  Engineering: "bg-primary/10 text-primary",
  Technical: "bg-chart-2/10 text-chart-2",
  Data: "bg-success/10 text-success",
  Guide: "bg-warning/10 text-warning",
  Product: "bg-chart-5/10 text-chart-5",
};

export default function BlogPageContainer() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Blog
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Technical deep dives, product updates, and crawling best practices
          from the Rosie team.
        </p>
      </header>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="group rounded-lg border border-border bg-card p-5 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className={
                  categoryColors[post.category] ||
                  "bg-muted text-muted-foreground"
                }
              >
                {post.category}
              </Badge>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{post.date}</span>
              <span className="inline-flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Read more <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
