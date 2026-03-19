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
  { hero: "Stark", quote: "Every shot I fire, he copies. I'm handing him weapons.", icon: "🔴" },
  { hero: "Thor", quote: "He caught Mjolnir's lightning. Threw it back harder.", icon: "⚡" },
  { hero: "Wanda", quote: "I tried to erase him. He erased my spell.", icon: "🔮" },
  { hero: "Hulk", quote: "First time I ever wanted to stop fighting.", icon: "💚" },
];

const doomQuotes = [
  { quote: "Every blow you land teaches me. Every death I die makes me permanent.", label: "After Antarctica" },
  { quote: "Your Hulk taught me strength. Your witch taught me chaos. What will you teach me, soldier?", label: "To Cap" },
  { quote: "I don't destroy worlds. I outgrow them.", label: "Global Broadcast" },
];

const InsightSection = () => {
  const [perspective, setPerspective] = useState<"hero" | "doom">("hero");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // Slow cinematic zoom on the image
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1.2, 1]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-1, 1]);
  
  // Antigravity — layered float speeds
  const headerY = useTransform(scrollYProgress, [0.05, 0.5], [70, -60]);
  const barsY = useTransform(scrollYProgress, [0.15, 0.65], [80, -30]);
  const quotesY = useTransform(scrollYProgress, [0.2, 0.7], [100, -40]);
  const imageY = useTransform(scrollYProgress, [0.1, 0.6], [50, -50]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen section-padding py-32 lg:py-40 overflow-hidden"
      aria-label="The Evolution Paradox"
    >
      <motion.div className="max-w-7xl mx-auto" style={{ y: headerY }}>
        <motion.p
          className="text-primary font-display text-xs tracking-[0.4em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter III — The Paradox
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[0.9] uppercase max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Hit It Harder. <span className="gradient-text-red">It Gets Stronger.</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg mb-12 max-w-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          The thing that broke the Avengers wasn't losing — it was realizing that winning was impossible.
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
            Their Side
          </button>
          <button
            onClick={() => setPerspective("doom")}
            className={`px-6 py-2.5 rounded-sm font-display text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
              perspective === "doom"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Its Side
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image + Power bars */}
          <div>
            <motion.div className="rounded-sm overflow-hidden mb-10 relative" style={{ y: imageY }}>
              <motion.img
                src={doomsdayImage}
                alt="Doomsday absorbing energy, glowing red"
                className="w-full h-[350px] lg:h-[420px] object-cover"
                loading="lazy"
                style={{ scale: imgScale, rotate: imgRotate }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </motion.div>

            {/* Power comparison */}
            <motion.div className="space-y-4" style={{ y: barsY }}>
              <p className="text-muted-foreground text-xs font-display tracking-[0.3em] uppercase mb-2">Power Levels</p>
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
            </motion.div>
          </div>

          {/* Right: Quotes */}
          <motion.div className="space-y-4" style={{ y: quotesY }}>
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
                <p className="text-primary text-xs font-display tracking-[0.2em] uppercase mb-2">The Catch</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Hulk's punches made it denser. Thor's lightning charged it. Wanda's hexes 
                  taught it magic. They weren't fighting a monster. They were building one.
                </p>
          </motion.div>
            </motion.div>
      </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
