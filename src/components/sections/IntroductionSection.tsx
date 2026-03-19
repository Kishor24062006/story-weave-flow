import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import assemblyImage from "@/assets/assembly-ruins.jpg";

const heroes = [
  { name: "Cap", role: "Leader", line: "We don't pick our wars. This one picked us." },
  { name: "Stark", role: "Architect", line: "I ran every sim. We lose in all of them." },
  { name: "Thor", role: "God", line: "Nine realms of monsters. Nothing like this." },
  { name: "Hulk", role: "Muscle", line: "Hitting it only makes it worse." },
  { name: "Wanda", role: "Wildcard", line: "It's not angry. It's hungry." },
  { name: "T'Challa", role: "Tactician", line: "Vibranium lasted twelve seconds." },
];

const IntroductionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // Ken Burns drift effect on image
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const imgX = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  
  // Antigravity — elements float upward at different speeds
  const cardsY = useTransform(scrollYProgress, [0.2, 0.8], [100, -60]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.7], [60, -80]);
  const textY = useTransform(scrollYProgress, [0.15, 0.75], [50, -50]);
  const yearBadgeY = useTransform(scrollYProgress, [0.1, 0.6], [30, -40]);

  return (
    <section
      id="assembly"
      ref={ref}
      className="relative min-h-screen section-padding py-32 lg:py-40 overflow-hidden"
      aria-label="The Last Assembly"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
          {/* Image with Ken Burns */}
          <motion.div className="relative overflow-hidden rounded-sm" style={{ y: imgY }}>
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <motion.img
                src={assemblyImage}
                alt="Avengers standing in ruins under a red sky"
                className="w-full h-[350px] lg:h-[480px] object-cover"
                loading="lazy"
                style={{ scale: imgScale, x: imgX }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <motion.div
                className="absolute bottom-6 left-6 glass-surface-red rounded-sm p-4"
                style={{ y: yearBadgeY }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-primary font-display text-2xl font-bold">2047</p>
                <p className="text-muted-foreground text-xs">The Vault Cracks Open</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div style={{ y: titleY }}>
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
              They Came<br />
              <span className="gradient-text-red">One Last Time</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              Something woke up under Antarctica. Ancient. Kryptonian. Built to kill 
              anything that fights back — and get better at it every time.
            </motion.p>
            <motion.p
              className="text-muted-foreground text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              The call went out. Most hadn't spoken in years. Didn't matter. 
              Six figures against a burning sky. Same old story — except this time, 
              none of them thought they'd walk away.
            </motion.p>
          </motion.div>
        </div>

        {/* Hero cards with antigravity float */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ y: cardsY }}>
          {heroes.map((hero, i) => (
            <motion.div
              key={hero.name}
              className="glass-surface-red rounded-sm p-6 group cursor-default relative overflow-hidden"
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className="absolute inset-0 bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <p className="text-primary text-xs font-display tracking-[0.3em] uppercase mb-1">{hero.role}</p>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 uppercase">{hero.name}</h3>
                <p className="text-muted-foreground text-sm italic leading-relaxed">"{hero.line}"</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IntroductionSection;
