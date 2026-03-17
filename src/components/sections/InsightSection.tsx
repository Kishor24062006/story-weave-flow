import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import deepCreature from "@/assets/deep-creature.jpg";

const stats = [
  { value: "11,034m", label: "Deepest Point", sub: "Mariana Trench" },
  { value: "95%", label: "Undiscovered", sub: "Ocean species" },
  { value: "3.7°C", label: "Average Temp", sub: "Deep ocean floor" },
  { value: "16,000", label: "Known Species", sub: "Below 200m" },
];

const quotes = [
  {
    text: "The sea, once it casts its spell, holds one in its net of wonder forever.",
    author: "Jacques Cousteau",
  },
  {
    text: "We know more about the surface of Mars than we do about the ocean floor.",
    author: "Robert Ballard",
  },
];

const InsightSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen section-padding py-32 lg:py-40"
      aria-label="Insights and discoveries"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter III
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-20 leading-tight max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Revelations from the <span className="gradient-text italic">Abyss</span>
        </motion.h2>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-surface rounded-2xl p-6 md:p-8 text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <p className="text-primary font-display text-3xl md:text-4xl font-bold mb-2 text-glow">
                {stat.value}
              </p>
              <p className="text-foreground font-body text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-muted-foreground text-xs">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ scale: imgScale }}>
            <div className="rounded-2xl overflow-hidden relative">
              <img
                src={deepCreature}
                alt="Bioluminescent deep sea creature"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          <div className="space-y-10">
            {quotes.map((quote, i) => (
              <motion.blockquote
                key={i}
                className="relative pl-6 border-l-2 border-primary/30"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <p className="font-display text-xl md:text-2xl italic text-foreground/90 mb-3 leading-relaxed">
                  "{quote.text}"
                </p>
                <cite className="text-muted-foreground text-sm font-body not-italic">
                  — {quote.author}
                </cite>
              </motion.blockquote>
            ))}

            <motion.div
              className="glass-surface rounded-xl p-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-primary text-xs uppercase tracking-wider mb-2">Did You Know?</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Bioluminescence is the most common form of communication in the ocean.
                Up to 90% of deep-sea creatures produce their own light through chemical
                reactions—nature's solution to a world without sunlight.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
