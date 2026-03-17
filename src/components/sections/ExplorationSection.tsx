import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const battleZones = [
  {
    name: "Antarctica",
    subtitle: "Ground Zero",
    description: "Where it all began. Doomsday erupts from the vault. Hulk meets him first — fist to fist. The shockwave flattens a 50-mile radius of ice. For the first time, Hulk feels pain.",
    hero: "Hulk",
    moment: "The collision that shattered the continent",
    color: "from-accent/20 to-accent/5",
  },
  {
    name: "New York",
    subtitle: "The Fall of Civilization",
    description: "Doomsday reaches Manhattan in 4 hours. Iron Man deploys every suit he's ever built — 347 autonomous units — in a coordinated assault. Doomsday destroys them all in 11 minutes.",
    hero: "Iron Man",
    moment: "347 suits. 11 minutes. Zero effect.",
    color: "from-primary/20 to-primary/5",
  },
  {
    name: "Wakanda",
    subtitle: "The Shield Falls",
    description: "Black Panther activates the vibranium dome — the strongest barrier on Earth. Doomsday walks through it like glass. For the first time, Wakanda's technology fails completely.",
    hero: "Black Panther",
    moment: "Vibranium shattered like porcelain",
    color: "from-accent/20 to-accent/5",
  },
  {
    name: "Asgard Portal",
    subtitle: "The Bridge Between Worlds",
    description: "Thor calls the Bifrost, attempting to strand Doomsday in the void between realms. But Doomsday absorbs the cosmic energy and tears the portal open wider.",
    hero: "Thor",
    moment: "Even gods have limits",
    color: "from-primary/20 to-primary/5",
  },
  {
    name: "Deep Space",
    subtitle: "The Desperate Gambit",
    description: "Scarlet Witch warps reality itself, pushing Doomsday into deep space. He drifts for 6 minutes — then propels himself back using her own chaos magic, now part of him.",
    hero: "Scarlet Witch",
    moment: "He learned her power in seconds",
    color: "from-primary/15 to-primary/5",
  },
  {
    name: "Final Battlefield",
    subtitle: "The Last Stand",
    description: "Captain America stands alone at the edge of a crater that was once Kansas. No shield. No army. Just a man who refuses to stop. The world watches through a single surviving satellite.",
    hero: "Captain America",
    moment: "One man. Zero chance. Full resolve.",
    color: "from-primary/25 to-primary/5",
  },
];

const ExplorationSection = () => {
  const [activeZone, setActiveZone] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen section-padding py-32 lg:py-40" aria-label="Fractured Frontlines">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.03] blur-[120px]" />
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
          Six Battles. <span className="gradient-text-red">Six Defeats.</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg mb-16 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Click each battle zone to witness the fall.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {battleZones.map((zone, i) => (
            <motion.button
              key={zone.name}
              onClick={() => setActiveZone(activeZone === i ? null : i)}
              className={`text-left glass-surface-red rounded-sm p-6 relative overflow-hidden group transition-all duration-500 ${
                activeZone === i ? "ring-1 ring-primary/50 box-glow" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              aria-expanded={activeZone === i}
            >
              {/* Energy line on top */}
              <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r ${zone.color}`} />

              <span className="text-muted-foreground text-xs font-display tracking-[0.3em] uppercase">{zone.subtitle}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground uppercase mt-1 mb-2">
                {zone.name}
              </h3>
              <p className="text-accent text-xs font-display tracking-wider uppercase">
                {zone.hero}
              </p>

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

              {/* Hover energy effect */}
              <motion.div
                className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExplorationSection;
