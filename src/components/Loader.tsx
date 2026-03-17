import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-foreground">
          Preparing to Dive
        </h2>
        <p className="text-muted-foreground text-sm mb-8">Descending into the deep...</p>

        <div className="w-48 h-px bg-secondary rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-primary rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>

        <p className="text-primary/60 text-xs mt-4 font-body tabular-nums">
          {Math.min(Math.round(progress), 100)}%
        </p>
      </motion.div>

      {/* Ambient bubbles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full border border-primary/20"
          style={{ left: `${20 + i * 12}%`, bottom: "-10px" }}
          animate={{ y: [0, -window.innerHeight], opacity: [0, 0.5, 0] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.div>
  );
};

export default Loader;
