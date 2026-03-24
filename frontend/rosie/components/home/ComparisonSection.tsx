import { motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

interface ComparisonRow {
  feature: string;
  rosie: boolean | string;
  diy: boolean | string;
}

const rows: ComparisonRow[] = [
  { feature: "Proxy rotation & management", rosie: true, diy: false },
  { feature: "Anti-detection & fingerprinting", rosie: true, diy: false },
  { feature: "Auto-scaling infrastructure", rosie: true, diy: false },
  { feature: "Built-in scheduling & monitoring", rosie: true, diy: false },
  { feature: "Structured data extraction", rosie: true, diy: "Manual" },
  { feature: "Webhook & API delivery", rosie: true, diy: "Build it" },
  { feature: "Zero maintenance", rosie: true, diy: false },
  { feature: "Setup time", rosie: "Minutes", diy: "Weeks" },
  { feature: "Ongoing engineering cost", rosie: "$0", diy: "1-2 FTEs" },
];

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />;
  }
  if (value === false) {
    return <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
  }
  return (
    <span className="text-sm font-medium text-muted-foreground">{value}</span>
  );
}

export default function ComparisonSection() {
  return (
    <section className="py-24 lg:py-32 bg-card/30 border-y border-border">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Rosie vs. DIY Scraping
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Stop building and maintaining scraping infrastructure. Focus on your data instead.
          </p>
        </motion.div>

        <motion.div
          className="rounded-xl border border-border bg-card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px]">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-border bg-muted/30">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Feature
              </span>
            </div>
            <div className="px-3 py-3.5 border-b border-l border-border bg-primary/5 text-center">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Rosie
              </span>
            </div>
            <div className="px-3 py-3.5 border-b border-l border-border bg-muted/30 text-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                DIY
              </span>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <>
                <div
                  key={`f-${i}`}
                  className={`px-5 py-3 text-sm text-foreground ${
                    i < rows.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  {row.feature}
                </div>
                <div
                  key={`r-${i}`}
                  className={`px-3 py-3 border-l border-border bg-primary/[0.02] text-center ${
                    i < rows.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <CellValue value={row.rosie} />
                </div>
                <div
                  key={`d-${i}`}
                  className={`px-3 py-3 border-l border-border text-center ${
                    i < rows.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <CellValue value={row.diy} />
                </div>
              </>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
