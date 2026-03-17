import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Loader from "@/components/Loader";
import HeroSection from "@/components/sections/HeroSection";
import IntroductionSection from "@/components/sections/IntroductionSection";
import ExplorationSection from "@/components/sections/ExplorationSection";
import InsightSection from "@/components/sections/InsightSection";
import ConclusionSection from "@/components/sections/ConclusionSection";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!loading && (
        <main>
          <HeroSection />
          <IntroductionSection />
          <ExplorationSection />
          <InsightSection />
          <ConclusionSection />
        </main>
      )}
    </>
  );
};

export default Index;
