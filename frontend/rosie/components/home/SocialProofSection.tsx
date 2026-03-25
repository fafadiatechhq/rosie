import { Star } from "lucide-react";
import { motion } from "framer-motion";
import sarahImg from "@/public/images/testimonial-sarah.jpg";
import jamesImg from "@/public/images/testimonial-james.jpg";
import mariaImg from "@/public/images/testimonial-maria.jpg";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Rosie cut our data pipeline build time from weeks to hours. The anti-detection alone saved us thousands in proxy costs.",
    author: "Sarah Chen",
    role: "Head of Data Engineering",
    company: "Marketview Analytics",
    stars: 5,
    avatar: sarahImg,
  },
  {
    quote:
      "We monitor 200K product pages daily with zero maintenance. The scheduling and webhook delivery is rock-solid.",
    author: "James Okafor",
    role: "CTO",
    company: "PriceRadar",
    stars: 5,
    avatar: jamesImg,
  },
  {
    quote:
      "Switching from our in-house scraping stack to Rosie freed up two engineers. Best infrastructure decision we made this year.",
    author: "Maria Gonzalez",
    role: "VP of Engineering",
    company: "Trendline AI",
    stars: 5,
    avatar: mariaImg,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function SocialProofSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Trusted by data teams everywhere
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            See why thousands of engineers rely on Rosie for their web data infrastructure.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={cardVariants}
              className="rounded-xl border border-border bg-card p-7 flex flex-col justify-between hover:border-primary/20 transition-colors duration-300"
            >
              <div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &quot;{t.quote}&quot;
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.author}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
