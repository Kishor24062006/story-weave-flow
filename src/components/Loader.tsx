import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center film-grain"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Red energy pulse */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/10 blur-[80px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-foreground uppercase tracking-wider">
          Initializing
        </h2>
        <p className="text-primary text-xs font-display tracking-[0.4em] uppercase mb-8">
          Final Protocol
        </p>

        {/* Crack line loading bar */}
        <div className="w-56 h-px bg-secondary rounded-full overflow-hidden mx-auto relative">
          <motion.div
            className="h-full bg-primary rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
          {/* Glow at the end */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary blur-sm"
            style={{ left: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <p className="text-muted-foreground text-xs mt-4 font-display tracking-wider tabular-nums">
          {Math.min(Math.round(progress), 100)}%
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
