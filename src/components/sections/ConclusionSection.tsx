import { useState } from "react";
import { motion } from "framer-motion";

const ConclusionSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center section-padding py-32"
      aria-label="Conclusion"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[150px]" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Surface
        </motion.p>

        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Every Dive Begins
          <span className="block gradient-text italic">With Curiosity</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The deep sea holds secrets that could reshape our understanding of life itself.
          Join the voyage—stay informed about the latest discoveries from the deep.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {!submitted ? (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                required
                aria-label="Email address"
              />
              <motion.button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Dive In
              </motion.button>
            </>
          ) : (
            <motion.div
              className="w-full glass-surface rounded-full px-6 py-3.5 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <span className="text-primary text-sm">✓ You're on the list. The deep awaits.</span>
            </motion.div>
          )}
        </motion.form>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-8 border-t border-border/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-muted-foreground/50 text-xs tracking-wider">
            THE DEEP SEA — AN IMMERSIVE EXPERIENCE
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConclusionSection;
