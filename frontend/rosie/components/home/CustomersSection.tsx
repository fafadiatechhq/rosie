import { motion } from "framer-motion";
import {
  Hexagon,
  Globe2,
  Sparkles,
  BarChart3,
  Zap,
  FlaskConical,
  Orbit,
  Radio,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Customer {
  name: string;
  icon: LucideIcon;
}

const customers: Customer[] = [
  { name: "Acme Corp", icon: Hexagon },
  { name: "Globex Industries", icon: Globe2 },
  { name: "Stark Data", icon: Sparkles },
  { name: "Nexus Analytics", icon: BarChart3 },
  { name: "Vortex AI", icon: Zap },
  { name: "Zenith Labs", icon: FlaskConical },
  { name: "Orion Tech", icon: Orbit },
  { name: "Pulse Systems", icon: Radio },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function CustomersSection() {
  return (
    <section className="py-24 lg:py-32 bg-card/30 border-y border-border">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Our Valued Customers
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From startups to enterprises, leading companies trust Rosie to power their data workflows.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {customers.map((c) => (
            <motion.div
              key={c.name}
              variants={cardVariants}
              className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 hover:border-primary/20 hover:shadow-[0_0_24px_-8px_hsl(var(--primary)/0.12)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <c.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {c.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
