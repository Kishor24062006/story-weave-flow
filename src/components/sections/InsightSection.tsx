import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import doomsdayImage from "@/assets/doomsday-evolve.jpg";

const powerData = [
  { label: "Strength", hero: 85, doom: 95 },
  { label: "Speed", hero: 70, doom: 88 },
  { label: "Energy", hero: 90, doom: 97 },
  { label: "Durability", hero: 80, doom: 100 },
  { label: "Adaptation", hero: 10, doom: 100 },
];

const heroQuotes = [
  { hero: "Iron Man", quote: "Every weapon I fire, he absorbs. I'm literally arming the enemy.", icon: "🔴" },
  { hero: "Thor", quote: "He took Mjolnir's lightning and threw it back. With interest.", icon: "⚡" },
  { hero: "Scarlet Witch", quote: "I tried to unmake him. He unmade my spell instead.", icon: "🔮" },
  { hero: "Hulk", quote: "For the first time in my life… I don't want to fight.", icon: "💚" },
];

const doomQuotes = [
  { quote: "Each blow teaches me. Each death makes me immortal.", label: "After Antarctica" },
  { quote: "Your Hulk gave me strength. Your witch gave me chaos. Your god gave me thunder. What will you give me, soldier?", label: "To Captain America" },
  { quote: "I don't destroy civilizations. I evolve past them.", label: "Broadcast to Earth" },
];

const InsightSection = () => {
  const [perspective, setPerspective] = useState<"hero" | "doom">("hero");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen section-padding py-32 lg:py-40"
      aria-label="The Evolution Paradox"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-primary font-display text-xs tracking-[0.4em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter III — The Evolution Paradox
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[0.9] uppercase max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Every Attack Makes Him <span className="gradient-text-red">Stronger</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg mb-12 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          The paradox that broke the Avengers: fighting Doomsday is the very thing that makes him invincible.
        </motion.p>

        {/* Perspective toggle */}
        <motion.div
          className="flex gap-1 mb-16 glass-surface-red rounded-sm p-1 w-fit"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setPerspective("hero")}
            className={`px-6 py-2.5 rounded-sm font-display text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
              perspective === "hero"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Hero Perspective
          </button>
          <button
            onClick={() => setPerspective("doom")}
            className={`px-6 py-2.5 rounded-sm font-display text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
              perspective === "doom"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Doomsday Perspective
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image + Power bars */}
          <div>
            <motion.div className="rounded-sm overflow-hidden mb-10 relative" style={{ scale: imgScale }}>
              <img
                src={doomsdayImage}
                alt="Doomsday absorbing heroes' powers, glowing with red energy"
                className="w-full h-[350px] lg:h-[420px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </motion.div>

            {/* Power comparison bars */}
            <div className="space-y-4">
              <p className="text-muted-foreground text-xs font-display tracking-[0.3em] uppercase mb-2">Power Comparison</p>
              {powerData.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground font-display tracking-wider uppercase">{stat.label}</span>
                    <span className="text-muted-foreground">{perspective === "hero" ? `${stat.hero}%` : `${stat.doom}%`}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${perspective === "hero" ? "bg-accent" : "bg-primary"}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${perspective === "hero" ? stat.hero : stat.doom}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      key={`${stat.label}-${perspective}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Quotes */}
          <div className="space-y-4">
            {perspective === "hero" ? (
              heroQuotes.map((q, i) => (
                <motion.div
                  key={q.hero}
                  className="glass-surface-red rounded-sm p-6 relative overflow-hidden"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{q.icon}</span>
                    <div>
                      <p className="text-accent text-xs font-display tracking-[0.2em] uppercase mb-2">{q.hero}</p>
                      <p className="text-foreground/80 text-sm italic leading-relaxed">"{q.quote}"</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              doomQuotes.map((q, i) => (
                <motion.div
                  key={i}
                  className="glass-surface-red rounded-sm p-6 border-primary/20 relative overflow-hidden"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-primary text-xs font-display tracking-[0.2em] uppercase mb-2">{q.label}</p>
                  <p className="text-foreground/90 text-base italic leading-relaxed text-glow-red">"{q.quote}"</p>
                </motion.div>
              ))
            )}

            <motion.div
              className="pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="glass-surface-red rounded-sm p-6">
                <p className="text-primary text-xs font-display tracking-[0.2em] uppercase mb-2">The Paradox</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Doomsday doesn't just resist attacks — he absorbs them. Every punch from Hulk
                  increased his density. Every lightning bolt from Thor charged his cells. Every
                  hex from Scarlet Witch expanded his reality-warping potential. The Avengers
                  weren't fighting a monster. They were building one.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
