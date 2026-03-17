import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import assemblyImage from "@/assets/assembly-ruins.jpg";

const heroes = [
  { name: "Captain America", role: "The Leader", line: "We don't get to choose our time. We only get to choose what we do with it." },
  { name: "Iron Man", role: "The Architect", line: "I ran every simulation. In none of them do we win." },
  { name: "Thor", role: "The God", line: "I have fought monsters across nine realms. This one… is different." },
  { name: "Hulk", role: "The Force", line: "Smashing doesn't work. It only makes him stronger." },
  { name: "Scarlet Witch", role: "The Wildcard", line: "I can feel his mind. It's not rage — it's hunger." },
  { name: "Black Panther", role: "The Strategist", line: "Wakanda's vibranium shields lasted twelve seconds." },
];

const IntroductionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="assembly"
      ref={ref}
      className="relative min-h-screen section-padding py-32 lg:py-40"
      aria-label="The Last Assembly"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
          {/* Image */}
          <motion.div className="relative" style={{ y: imgY }}>
            <motion.div
              className="rounded-sm overflow-hidden relative"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <img
                src={assemblyImage}
                alt="Heroes standing in the ruins of the compound under a red sky"
                className="w-full h-[350px] lg:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <motion.div
                className="absolute bottom-6 left-6 glass-surface-red rounded-sm p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-primary font-display text-2xl font-bold">2047</p>
                <p className="text-muted-foreground text-xs">The Vault Opens</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.p
              className="text-primary font-display text-xs tracking-[0.4em] uppercase mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Chapter I — The Last Assembly
            </motion.p>
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[0.9] uppercase"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              They Answered<br />
              <span className="gradient-text-red">The Last Call</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              In 2047, a seismic anomaly beneath Antarctica shattered a Kryptonian vault buried
              for millennia. What emerged was no ordinary threat — it was Doomsday, an engine of
              adaptive destruction that learned from every blow dealt against it.
            </motion.p>
            <motion.p
              className="text-muted-foreground text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              The signal went out. Some hadn't spoken in years. Some carried scars — physical and
              otherwise — from the last war. But they came. They always come. Standing in the
              rubble of the old Avengers Compound, six silhouettes against a burning sky.
            </motion.p>
          </div>
        </div>

        {/* Hero cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {heroes.map((hero, i) => (
            <motion.div
              key={hero.name}
              className="glass-surface-red rounded-sm p-6 group cursor-default relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <p className="text-primary text-xs font-display tracking-[0.3em] uppercase mb-1">{hero.role}</p>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 uppercase">{hero.name}</h3>
                <p className="text-muted-foreground text-sm italic leading-relaxed">"{hero.line}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
