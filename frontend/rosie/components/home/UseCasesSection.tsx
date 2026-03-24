import { motion } from "framer-motion";
import {
  ShoppingCart,
  Users,
  Search,
  TrendingUp,
  Building2,
  Newspaper,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface UseCase {
  icon: LucideIcon;
  title: string;
  description: string;
}

const useCases: UseCase[] = [
  {
    icon: ShoppingCart,
    title: "E-Commerce & Price Monitoring",
    description:
      "Track competitor pricing, inventory levels, and product catalogs across thousands of retailers in real-time.",
  },
  {
    icon: Users,
    title: "Lead Generation",
    description:
      "Extract contact information, company data, and social profiles from directories and professional networks at scale.",
  },
  {
    icon: Search,
    title: "SEO & SERP Tracking",
    description:
      "Monitor search engine rankings, featured snippets, and competitor keyword strategies across markets.",
  },
  {
    icon: TrendingUp,
    title: "Market Research",
    description:
      "Aggregate industry data, sentiment signals, and trend indicators from news sites, forums, and social media.",
  },
  {
    icon: Building2,
    title: "Real Estate & Property Data",
    description:
      "Collect listings, pricing history, and property details from portals and public records automatically.",
  },
  {
    icon: Newspaper,
    title: "Content & Media Monitoring",
    description:
      "Track brand mentions, press coverage, and content changes across thousands of publications daily.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function UseCasesSection() {
  return (
    <section className="py-24 lg:py-32 bg-card/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Built for every use case
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From price intelligence to lead generation — Rosie powers data pipelines across industries.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {useCases.map((uc) => (
            <motion.div
              key={uc.title}
              variants={cardVariants}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/20 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.1)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <uc.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {uc.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {uc.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
