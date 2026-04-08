import { ArrowUpRight, Building2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const caseStudies = [
  {
    company: "DataStream Analytics",
    industry: "Market Intelligence",
    logo: Building2,
    title:
      "How DataStream Reduced Crawl Costs by 60% While Scaling to 50M Pages/Month",
    summary:
      "DataStream migrated from a self-hosted Scrapy cluster to Rosie and eliminated infrastructure management overhead while improving crawl reliability.",
    metrics: [
      { label: "Pages/Month", value: "50M", change: "+3x" },
      { label: "Cost Reduction", value: "60%", change: "" },
      { label: "Uptime", value: "99.97%", change: "+0.5%" },
    ],
    tags: ["Enterprise", "Migration", "Cost Savings"],
  },
  {
    company: "PriceWatch",
    industry: "E-Commerce",
    logo: Building2,
    title:
      "PriceWatch Monitors 2M Product Prices Daily with Zero False Negatives",
    summary:
      "Using Rosie's monitor fetchers with rotating proxies, PriceWatch tracks real-time pricing across 200+ e-commerce sites without getting blocked.",
    metrics: [
      { label: "Products Tracked", value: "2M", change: "" },
      { label: "Accuracy", value: "99.8%", change: "" },
      { label: "Block Rate", value: "<0.1%", change: "-95%" },
    ],
    tags: ["Pro Plan", "Monitoring", "Anti-Detection"],
  },
  {
    company: "NewsFlow",
    industry: "Media & Publishing",
    logo: Building2,
    title:
      "NewsFlow Built a Real-Time News Aggregator Processing 100K Articles/Day",
    summary:
      "Combining RSS and discovery fetchers with webhook-driven pipelines, NewsFlow ingests articles from 5,000+ sources within minutes of publication.",
    metrics: [
      { label: "Articles/Day", value: "100K", change: "" },
      { label: "Sources", value: "5,000+", change: "" },
      { label: "Avg Latency", value: "< 3 min", change: "" },
    ],
    tags: ["RSS", "Webhooks", "Real-Time"],
  },
  {
    company: "ArchiveOne",
    industry: "Digital Preservation",
    logo: Building2,
    title:
      "ArchiveOne Preserves 500TB of Web Content with WARC-Based Archiving",
    summary:
      "Leveraging Rosie's full-site crawlers and WARC output with GZIP compression, ArchiveOne provides legally compliant web preservation for government agencies.",
    metrics: [
      { label: "Data Archived", value: "500TB", change: "" },
      { label: "Compression", value: "4:1", change: "" },
      { label: "Retention", value: "3 years", change: "" },
    ],
    tags: ["Enterprise", "WARC", "Compliance"],
  },
];

export default function CaseStudiesPageContainer() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Case Studies
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          See how teams use Rosie to solve real-world crawling challenges at
          scale.
        </p>
      </header>

      <div className="space-y-6">
        {caseStudies.map((study) => (
          <div
            key={study.company}
            className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors"
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <study.logo className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {study.company}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {study.industry}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="px-5 pb-4 space-y-2">
              <h2 className="text-base font-semibold text-foreground leading-snug">
                {study.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {study.summary}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 border-t border-border">
              {study.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="px-5 py-3 text-center border-r last:border-r-0 border-border"
                >
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-lg font-bold text-foreground">
                      {metric.value}
                    </p>
                    {metric.change && (
                      <span className="flex items-center text-[10px] font-medium text-success">
                        <TrendingUp className="w-3 h-3" />
                        {metric.change}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="px-5 py-3 border-t border-border flex gap-2">
              {study.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
