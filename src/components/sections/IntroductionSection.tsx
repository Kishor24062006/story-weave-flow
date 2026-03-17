import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import surfaceImage from "@/assets/surface-light.jpg";

const IntroductionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="introduction"
      ref={ref}
      className="relative min-h-screen flex items-center section-padding py-32 lg:py-40"
      aria-label="Introduction"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <motion.p
            className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Chapter I
          </motion.p>

          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Where Light
            <span className="block gradient-text italic">Meets Darkness</span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg leading-relaxed mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The ocean covers more than 70% of Earth's surface, yet over 80% of it remains
            unexplored. Beneath the sun-dappled shallows lies a world of perpetual night—
            a frontier more alien than the surface of Mars.
          </motion.p>

          <motion.p
            className="text-muted-foreground text-lg leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            As sunlight fades at 200 meters, the photic zone gives way to the twilight
            world. Here, creatures have evolved impossible adaptations—light-producing
            organs, transparent bodies, and jaws that unhinge to swallow prey twice their size.
          </motion.p>

          <motion.div
            className="divider-glow w-32"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Image */}
        <motion.div
          className="order-1 lg:order-2 relative"
          style={{ y: imgY }}
        >
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <img
              src={surfaceImage}
              alt="Sunlight penetrating ocean surface from below"
              className="w-full h-[400px] lg:h-[560px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            {/* Floating stat */}
            <motion.div
              className="absolute bottom-6 left-6 glass-surface rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-primary font-display text-3xl font-bold">80%</p>
              <p className="text-muted-foreground text-sm">of the ocean floor<br />remains unmapped</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroductionSection;
