import { motion } from "framer-motion";
import {
  Webhook,
  Globe2,
  Code2,
  Database,
  FileJson,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Integration {
  icon: LucideIcon;
  label: string;
}

const integrations: Integration[] = [
  { icon: Globe2, label: "REST API" },
  { icon: Webhook, label: "Webhooks" },
  { icon: Code2, label: "Python SDK" },
  { icon: Code2, label: "Node.js SDK" },
  { icon: Database, label: "PostgreSQL" },
  { icon: Cloud, label: "Amazon S3" },
  { icon: FileJson, label: "BigQuery" },
  { icon: Database, label: "Snowflake" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export default function IntegrationsSection() {
  return (
    <section className="py-20 lg:py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Connects to your stack
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto text-sm">
            Deliver crawled data wherever you need it — APIs, webhooks, databases, and cloud storage.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {integrations.map((int, i) => (
            <motion.div
              key={`${int.label}-${i}`}
              variants={itemVariants}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3.5 hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                <int.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {int.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
