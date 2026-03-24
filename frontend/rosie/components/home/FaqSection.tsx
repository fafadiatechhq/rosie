import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What counts as a 'page' in billing?",
    answer:
      "A page is any single URL that Rosie fetches — including paginated results, API endpoints, or JavaScript-rendered pages. Redirects that resolve to a final URL count as one page.",
  },
  {
    question: "Can Rosie handle JavaScript-rendered websites?",
    answer:
      "Yes. Rosie uses headless browsers under the hood to fully render JavaScript before extraction. You can choose between lightweight HTTP mode for static sites or full browser mode for SPAs and dynamic content.",
  },
  {
    question: "How long is crawled data retained?",
    answer:
      "Data retention depends on your plan: Starter keeps data for 7 days, Pro for 30 days, and Enterprise offers custom retention policies up to unlimited storage.",
  },
  {
    question: "Do I need to manage my own proxies?",
    answer:
      "No. Rosie includes a built-in rotating proxy pool with residential and datacenter IPs across 190+ countries. Enterprise customers can also bring their own proxy pools.",
  },
  {
    question: "Can I export data to my own database?",
    answer:
      "Absolutely. Rosie supports webhooks, REST API polling, and direct exports to PostgreSQL, BigQuery, S3, and Snowflake. You can configure delivery per collection.",
  },
];

export default function FaqSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Quick answers to the most common questions about Rosie.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
