import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-doomsday.jpg";

const DebrisParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 6 + 2;
      const isRed = Math.random() > 0.5;
      return (
        <motion.div
          key={i}
          className={`absolute rounded-sm ${isRed ? "bg-primary/40" : "bg-foreground/10"}`}
          style={{
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -300 - 100],
            x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 120],
            rotate: [0, Math.random() * 360],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeOut",
          }}
        />
      );
    })}
  </div>
);

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden film-grain"
      aria-label="Hero"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={heroImage}
          alt="Doomsday rising from cracked Antarctic ice with red lightning"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </motion.div>

      {/* Red glow overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.08] blur-[100px] animate-pulse-glow" />
      </div>

      <DebrisParticles />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center section-padding max-w-5xl mx-auto"
        style={{ opacity }}
      >
        <motion.p
          className="text-primary font-display text-xs md:text-sm tracking-[0.5em] uppercase mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Doomsday: Avengers' Final Protocol
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] mb-4 uppercase tracking-tight"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <span className="block text-foreground">The Sky Cracks.</span>
          <span className="block gradient-text-red">Evolution Awakens.</span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg md:text-2xl font-body mb-4 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          72 hours until extinction.
        </motion.p>

        {/* Crack line */}
        <motion.div
          className="divider-glow w-48 mx-auto mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            className="relative px-10 py-4 rounded-sm font-display text-sm tracking-[0.3em] uppercase border border-primary/50 text-primary overflow-hidden group"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(0 85% 50% / 0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("assembly")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Begin the fall — scroll to the story"
          >
            <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-500">
              Begin the Fall
            </span>
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-display">Descend</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
