import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-doomsday.jpg";

const DebrisParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {Array.from({ length: 40 }).map((_, i) => {
      const size = Math.random() * 5 + 2;
      const isRed = Math.random() > 0.6;
      return (
        <motion.div
          key={i}
          className={`absolute rounded-full ${isRed ? "bg-primary/50" : "bg-foreground/10"}`}
          style={{
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -400 - 150],
            x: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 160],
            rotate: [0, Math.random() * 720],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 6,
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

  // Cinematic zoom — image slowly pushes toward viewer on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imgBrightness = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  // Antigravity — content floats upward as you scroll down
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden film-grain"
      aria-label="Hero"
    >
      {/* Cinematic zoom background — monster approaches */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <motion.img
          src={heroImage}
          alt="Doomsday silhouette emerging from cracked ice"
          className="w-full h-full object-cover"
          loading="eager"
          style={{ filter: useTransform(imgBrightness, (v) => `brightness(${v})`) }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </motion.div>

      {/* Pulsing red glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary/[0.06] blur-[120px]"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <DebrisParticles />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center section-padding max-w-5xl mx-auto"
        style={{ opacity, y: contentY }}
      >
        <motion.p
          className="text-primary font-display text-xs md:text-sm tracking-[0.5em] uppercase mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Avengers' Final Protocol
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] mb-4 uppercase tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease: "easeOut" }}
          style={{ y: titleY }}
        >
          <span className="block text-foreground">The Sky Cracks.</span>
          <span className="block gradient-text-red">It Rises.</span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg md:text-2xl font-body mb-4 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          72 hours. That's all we had.
        </motion.p>

        <motion.div
          className="divider-glow w-48 mx-auto mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.button
            className="relative px-10 py-4 rounded-sm font-display text-sm tracking-[0.3em] uppercase border border-primary/50 text-primary overflow-hidden group"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(0 85% 50% / 0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("assembly")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Begin the fall"
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
          <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-display">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
