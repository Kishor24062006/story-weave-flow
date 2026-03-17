import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const zones = [
  {
    name: "Sunlight Zone",
    depth: "0 – 200m",
    description: "The photic zone where photosynthesis occurs. Home to coral reefs, sea turtles, and most marine life we know.",
    temperature: "20–25°C",
    pressure: "1–20 atm",
    color: "from-accent/30 to-primary/10",
  },
  {
    name: "Twilight Zone",
    depth: "200 – 1,000m",
    description: "Faint blue light. Creatures like lanternfish and glass squids use bioluminescence to survive in permanent dusk.",
    temperature: "5–15°C",
    pressure: "20–100 atm",
    color: "from-primary/20 to-primary/5",
  },
  {
    name: "Midnight Zone",
    depth: "1,000 – 4,000m",
    description: "No sunlight penetrates here. Giant squid, vampire squid, and bizarre anglerfish inhabit these waters.",
    temperature: "1–4°C",
    pressure: "100–400 atm",
    color: "from-primary/10 to-transparent",
  },
  {
    name: "Abyssal Zone",
    depth: "4,000 – 6,000m",
    description: "Near-freezing temperatures and crushing pressure. Life exists around hydrothermal vents—oases in the dark.",
    temperature: "1–2°C",
    pressure: "400–600 atm",
    color: "from-primary/5 to-transparent",
  },
  {
    name: "Hadal Zone",
    depth: "6,000 – 11,000m",
    description: "The deepest trenches on Earth. The Mariana Trench plunges to 10,994m—a place of unimaginable pressure.",
    temperature: "1–4°C",
    pressure: "600–1,100 atm",
    color: "from-transparent to-transparent",
  },
];

const ExplorationSection = () => {
  const [activeZone, setActiveZone] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen section-padding py-32 lg:py-40"
      aria-label="Exploration of ocean zones"
    >
      {/* Subtle background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-[120px]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        <motion.p
          className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter II
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-16 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The Five Zones of <span className="gradient-text italic">Depth</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-16">
          {/* Zone tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {zones.map((zone, i) => (
              <motion.button
                key={zone.name}
                onClick={() => setActiveZone(i)}
                className={`text-left px-5 py-4 rounded-xl border transition-all duration-500 whitespace-nowrap lg:whitespace-normal ${
                  activeZone === i
                    ? "border-primary/40 bg-secondary box-glow"
                    : "border-border/30 hover:border-border"
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                aria-pressed={activeZone === i}
              >
                <span className={`text-xs tracking-wider uppercase ${activeZone === i ? "text-primary" : "text-muted-foreground"}`}>
                  {zone.depth}
                </span>
                <span className={`block font-display text-lg mt-1 ${activeZone === i ? "text-foreground" : "text-muted-foreground"}`}>
                  {zone.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Zone detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone}
              className="glass-surface rounded-2xl p-8 md:p-12 relative overflow-hidden min-h-[360px] flex flex-col justify-between"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${zones[activeZone].color}`} />

              <div>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-2">
                  {zones[activeZone].name}
                </h3>
                <p className="text-primary font-body text-lg mb-6">{zones[activeZone].depth}</p>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  {zones[activeZone].description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-8 pt-6 border-t border-border/30">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Temperature</p>
                  <p className="text-foreground font-display text-xl">{zones[activeZone].temperature}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Pressure</p>
                  <p className="text-foreground font-display text-xl">{zones[activeZone].pressure}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Depth Zone</p>
                  <p className="text-primary font-display text-xl">{activeZone + 1}/5</p>
                </div>
              </div>

              {/* Depth bar visual */}
              <div className="mt-6">
                <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeZone + 1) / 5) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ExplorationSection;
