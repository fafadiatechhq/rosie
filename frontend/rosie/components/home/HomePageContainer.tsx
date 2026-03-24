"use client";
import Link from "next/link";
import {
  Zap,
  Globe,
  Shield,
  BarChart3,
  Clock,
  Code2,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SocialProofSection from "@/components/home/SocialProofSection";
import CustomersSection from "@/components/home/CustomersSection";
import UseCasesSection from "@/components/home/UseCasesSection";
import IntegrationsSection from "@/components/home/IntegrationsSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import FaqSection from "@/components/home/FaqSection";

const features = [
  {
    icon: Globe,
    title: "Smart Crawling",
    description:
      "Intelligent page discovery that adapts to site structure. Handle JavaScript-rendered pages, pagination, and dynamic content automatically.",
  },
  {
    icon: Shield,
    title: "Anti-Detection",
    description:
      "Built-in rotating proxies, browser fingerprinting, and rate limiting to keep your crawlers running smoothly and undetected.",
  },
  {
    icon: Layers,
    title: "Structured Output",
    description:
      "Extract clean, structured data from any website. CSS selectors, XPath, and AI-powered extraction out of the box.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Monitoring",
    description:
      "Track crawl progress, success rates, and resource usage in real-time. Get alerts when something needs attention.",
  },
  {
    icon: Clock,
    title: "Scheduled Runs",
    description:
      "Set up recurring crawls with flexible cron-based scheduling. Daily, hourly, or custom intervals to keep your data fresh.",
  },
  {
    icon: Code2,
    title: "Developer-First API",
    description:
      "RESTful API with webhooks, SDKs in Python & Node.js, and full programmatic control over every fetcher and collection.",
  },
];

const steps = [
  {
    number: "01",
    title: "Configure",
    description:
      "Set up your fetcher with target URLs, extraction rules, and schedule.",
  },
  {
    number: "02",
    title: "Deploy",
    description:
      "Launch your crawl with one click. We handle proxies, retries, and scaling.",
  },
  {
    number: "03",
    title: "Collect",
    description:
      "Receive structured data via webhook, API, or direct database export.",
  },
];

const stats = [
  { value: "50M+", label: "Pages crawled monthly" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "2,400+", label: "Active teams" },
  { value: "<200ms", label: "Avg. API latency" },
];

export default function HomePageContainer() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium">
            <Zap className="w-3 h-3" />
            Now in public beta — try it free
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
            Web crawling
            <br />
            <span className="text-primary">infrastructure</span> that scales
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Rosie handles the hard parts of web scraping — proxy rotation,
            anti-detection, scheduling, and monitoring — so you can focus on
            your data.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="min-w-[180px] shadow-[0_0_30px_-8px_hsl(173,58%,45%/0.4)]"
              asChild
            >
              <Link href="/app/dashboard">
                Start for Free
                <ArrowRight />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[180px]"
              asChild
            >
              <a href="#features">See Features</a>
            </Button>
          </div>

          {/* Terminal preview hint */}
          <div className="mt-16 max-w-2xl mx-auto rounded-xl border border-border bg-card/80 backdrop-blur-sm p-5 text-left shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
              <span className="ml-3 text-[10px] text-muted-foreground font-mono">
                terminal
              </span>
            </div>
            <pre className="text-xs sm:text-sm font-mono text-muted-foreground leading-loose overflow-x-auto">
              <code>
                <span className="text-primary">$</span>{" "}
                <span className="text-foreground">rosie create fetcher</span>{" "}
                --url https://example.com{"\n"}
                <span className="text-success">✓</span> Fetcher created:{" "}
                <span className="text-foreground">example-com-crawler</span>
                {"\n"}
                <span className="text-primary">$</span>{" "}
                <span className="text-foreground">rosie run</span>{" "}
                example-com-crawler{"\n"}
                <span className="text-success">✓</span> Crawling 1,247 pages...{" "}
                <span className="text-primary">done</span> in 42s
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-border bg-card/30">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-foreground tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Everything you need to crawl at scale
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              A complete toolkit for building, running, and monitoring web
              crawlers — without managing infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 hover:border-primary/20 hover:shadow-[0_0_30px_-10px_hsl(173,58%,45%/0.1)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-24 lg:py-32 bg-card/30 border-y border-border"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Up and running in minutes
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Three simple steps from zero to structured data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative text-center md:text-left"
              >
                <span className="text-5xl font-bold text-primary/10 font-mono">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-5 h-5 text-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Start free. Scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="rounded-xl border border-border bg-card p-7">
              <h3 className="text-lg font-semibold text-foreground">Starter</h3>
              <p className="text-sm text-muted-foreground mt-1">
                For side projects & testing
              </p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "10K pages / month",
                  "2 fetchers",
                  "1 collection",
                  "Community support",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/app/dashboard">Get Started</Link>
              </Button>
            </div>

            {/* Pro — highlighted */}
            <div className="rounded-xl border-2 border-primary bg-card p-7 relative shadow-[0_0_40px_-12px_hsl(173,58%,45%/0.25)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                Popular
              </div>
              <h3 className="text-lg font-semibold text-foreground">Pro</h3>
              <p className="text-sm text-muted-foreground mt-1">
                For growing teams
              </p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-bold text-foreground">$49</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "5M pages / month",
                  "Unlimited fetchers",
                  "10 collections",
                  "Priority support",
                  "Webhooks & API access",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full" asChild>
                <Link href="/app/dashboard">Start Free Trial</Link>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="rounded-xl border border-border bg-card p-7">
              <h3 className="text-lg font-semibold text-foreground">
                Enterprise
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                For large-scale operations
              </p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-bold text-foreground">
                  Custom
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited pages",
                  "Unlimited everything",
                  "Dedicated proxies",
                  "SLA & dedicated support",
                  "SSO & audit logs",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <UseCasesSection />

      {/* Integrations */}
      <IntegrationsSection />

      {/* Comparison */}
      <ComparisonSection />

      {/* Social Proof */}
      <SocialProofSection />

      {/* Our Valued Customers */}
      <CustomersSection />

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Ready to start crawling?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Join thousands of teams using Rosie to power their data pipelines.
            Free to start, no credit card required.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="min-w-[200px] shadow-[0_0_30px_-8px_hsl(173,58%,45%/0.4)]"
              asChild
            >
              <Link href="/app/dashboard">
                Get Started for Free
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
