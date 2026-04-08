import { Download, FileText, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const whitepapers = [
  {
    title: "The Architecture of Distributed Web Crawling at Scale",
    abstract: "An in-depth technical paper covering the design decisions behind Rosie's distributed crawl engine — from job scheduling and priority queues to worker orchestration and fault tolerance across multiple availability zones.",
    pages: 24,
    date: "January 2026",
    tags: ["Architecture", "Distributed Systems"],
    format: "PDF",
  },
  {
    title: "Compliance and Ethics in Automated Web Data Collection",
    abstract: "A comprehensive guide to navigating robots.txt, GDPR, CCPA, and copyright law when operating web crawlers at scale. Includes decision frameworks, risk matrices, and template compliance policies.",
    pages: 18,
    date: "December 2025",
    tags: ["Compliance", "Legal", "GDPR"],
    format: "PDF",
  },
  {
    title: "Anti-Detection Techniques for Modern Web Crawlers",
    abstract: "From fingerprint randomisation and TLS signature management to behavioral mimicry and residential proxy rotation — a technical survey of current anti-detection strategies and their effectiveness.",
    pages: 32,
    date: "November 2025",
    tags: ["Anti-Detection", "Proxies", "Technical"],
    format: "PDF",
  },
  {
    title: "WARC Format: Best Practices for Web Archiving Pipelines",
    abstract: "How to structure WARC-based archiving workflows for reproducibility, deduplication, and long-term storage. Covers WARC/1.1 spec details, compression strategies, and integration with data lake architectures.",
    pages: 16,
    date: "October 2025",
    tags: ["WARC", "Archiving", "Data Engineering"],
    format: "PDF",
  },
  {
    title: "Usage-Based Pricing Models for Developer Infrastructure",
    abstract: "An analysis of metering strategies, billing unit selection, and cost predictability for API-first platforms. Draws on case studies from Rosie, Stripe, Twilio, and other usage-based companies.",
    pages: 14,
    date: "September 2025",
    tags: ["Pricing", "Business Model"],
    format: "PDF",
  },
];

export default function WhitePapersPageContainer() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          White Papers
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          In-depth technical and strategic papers from the Rosie team covering
          crawling architecture, compliance, and data engineering.
        </p>
      </header>

      <div className="space-y-4">
        {whitepapers.map((paper) => (
          <div
            key={paper.title}
            className="group rounded-lg border border-border bg-card p-5 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-2">
                <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {paper.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {paper.abstract}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {paper.date}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {paper.pages} pages
                  </span>
                  {paper.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Download */}
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5">
                <Download className="w-3.5 h-3.5" />
                {paper.format}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-primary/20 bg-primary/5 p-6 space-y-2">
        <h3 className="text-base font-semibold text-foreground">
          Want to contribute?
        </h3>
        <p className="text-sm text-muted-foreground">
          We welcome guest authors and research collaborations. Reach out at{" "}
          <span className="text-foreground font-medium">
            research@rosie.dev
          </span>{" "}
          with your proposal.
        </p>
      </section>
    </article>
  );
}
