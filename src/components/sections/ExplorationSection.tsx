import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const battleZones = [
  {
    name: "Antarctica",
    subtitle: "Ground Zero",
    description: "Hulk hit it first. The shockwave flattened fifty miles of ice. For the first time ever, Hulk felt pain.",
    hero: "Hulk",
    moment: "The hit that shattered a continent",
  },
  {
    name: "New York",
    subtitle: "Eleven Minutes",
    description: "Stark sent 347 suits. Every single one he'd ever built. Doomsday tore through them in eleven minutes flat.",
    hero: "Iron Man",
    moment: "347 suits. 11 minutes. Nothing.",
  },
  {
    name: "Wakanda",
    subtitle: "The Shield Falls",
    description: "The vibranium dome — strongest barrier on Earth. Doomsday walked through it like it was glass.",
    hero: "Black Panther",
    moment: "Vibranium broke like ceramic",
  },
  {
    name: "Bifrost",
    subtitle: "Between Worlds",
    description: "Thor tried to strand it in the void between realms. It absorbed the Bifrost energy and ripped the portal wider.",
    hero: "Thor",
    moment: "Even gods have a ceiling",
  },
  {
    name: "Deep Space",
    subtitle: "The Gambit",
    description: "Wanda warped reality and pushed it into orbit. Six minutes later, it flew back — using her own magic.",
    hero: "Scarlet Witch",
    moment: "It learned her power in seconds",
  },
  {
    name: "Kansas",
    subtitle: "The Last Stand",
    description: "Cap stood alone in a crater. No shield. No backup. Just a man who wouldn't quit. The world watched through one satellite.",
    hero: "Captain America",
    moment: "Zero chance. Full send.",
  },
];

const ExplorationSection = () => {
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // Antigravity — everything floats up at different speeds
  const headerY = useTransform(scrollYProgress, [0.05, 0.5], [80, -60]);
  const gridY = useTransform(scrollYProgress, [0.15, 0.7], [120, -40]);
  const gridRotate = useTransform(scrollYProgress, [0, 0.4], [2, 0]);

  return (
    <section ref={ref} className="relative min-h-screen section-padding py-32 lg:py-40 overflow-hidden" aria-label="Fractured Frontlines">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.p
          className="text-primary font-display text-xs tracking-[0.4em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter II — Fractured Frontlines
        </motion.p>
        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[0.9] uppercase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Six Fights. <span className="gradient-text-red">Six Losses.</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg mb-16 max-w-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Tap a battle to see how it fell apart.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ y: gridY, rotateX: gridRotate }}
        >
          {battleZones.map((zone, i) => (
            <motion.button
              key={zone.name}
              onClick={() => setActiveZone(activeZone === i ? null : i)}
              className={`text-left glass-surface-red rounded-sm p-6 relative overflow-hidden group transition-all duration-500 ${
                activeZone === i ? "ring-1 ring-primary/50 box-glow" : ""
              }`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              aria-expanded={activeZone === i}
            >
              <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary/30 to-transparent`} />

              <span className="text-muted-foreground text-xs font-display tracking-[0.3em] uppercase">{zone.subtitle}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground uppercase mt-1 mb-2">
                {zone.name}
              </h3>
              <p className="text-accent text-xs font-display tracking-wider uppercase">{zone.hero}</p>

              <AnimatePresence>
                {activeZone === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-border/30">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{zone.description}</p>
                      <p className="text-primary text-xs font-display tracking-wider italic">"{zone.moment}"</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExplorationSection;
