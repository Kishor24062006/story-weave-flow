import { useState } from "react";
import { motion } from "framer-motion";

const ConclusionSection = () => {
  const [callsign, setCallsign] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callsign.trim()) setSubmitted(true);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center section-padding py-32 overflow-hidden"
      aria-label="End of the Cycle"
    >
      {/* Ambient red glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.05] blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          className="text-primary font-display text-xs tracking-[0.4em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Chapter IV — End of the Cycle
        </motion.p>

        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-[0.85] uppercase"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The Monster<br />
          <span className="gradient-text-red">Was Never The Point</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-6 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          One of them stepped forward. Not the strongest. Not the smartest. 
          The one who figured out you can't beat something that feeds on war — 
          by waging more war.
        </motion.p>

        <motion.p
          className="text-foreground/70 text-base leading-relaxed mb-12 max-w-lg mx-auto italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          "We made it. Our fists, our rage, our refusal to stop fighting — 
          that's what it ate. So I stopped."
        </motion.p>

        <motion.div
          className="divider-glow w-32 mx-auto mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <motion.p
          className="text-primary font-display text-lg tracking-[0.2em] uppercase mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Can you break the cycle?
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {!submitted ? (
            <>
              <input
                type="text"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                placeholder="Your callsign"
                className="flex-1 px-5 py-3.5 rounded-sm bg-secondary border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all"
                required
                aria-label="Your callsign"
              />
              <motion.button
                type="submit"
                className="px-8 py-3.5 rounded-sm bg-primary text-primary-foreground font-display text-xs tracking-[0.2em] uppercase"
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px hsl(0 85% 50% / 0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                Join the Resistance
              </motion.button>
            </>
          ) : (
            <motion.div
              className="w-full glass-surface-red rounded-sm px-6 py-4 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <span className="text-primary text-sm font-display tracking-wider">
                REGISTERED — THE RESISTANCE REMEMBERS
              </span>
            </motion.div>
          )}
        </motion.form>

        <motion.div
          className="mt-24 pt-8 border-t border-border/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-muted-foreground/40 text-xs tracking-[0.3em] font-display uppercase">
            Doomsday: Avengers' Final Protocol
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConclusionSection;
