import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import TornPaperTitle from "@/components/TornPaperTitle";
import PaperJar from "@/components/PaperJar";
import Firefly from "@/components/Firefly";
import PaperScrapInput from "@/components/PaperScrapInput";

const STORAGE_KEY = "glimmer-gratitudes-v2";
const MAX_GLIMMERS = 5;

interface Glimmer {
  id: string;
  text: string;
  timestamp: number;
}

const loadGlimmers = (): Glimmer[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return [];
};

const Index = () => {
  const [glimmers, setGlimmers] = useState<Glimmer[]>(loadGlimmers);
  const [inputOpen, setInputOpen] = useState(false);

  // Today's glimmers only
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayGlimmers = useMemo(
    () => glimmers.filter((g) => new Date(g.timestamp).toISOString().slice(0, 10) === todayKey),
    [glimmers, todayKey]
  );

  const glimmerCount = todayGlimmers.length;
  const nightProgress = Math.min(glimmerCount / MAX_GLIMMERS, 1);

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(glimmers));
  }, [glimmers]);

  // Fireflies: show (MAX - collected) fireflies
  const fireflyCount = Math.max(MAX_GLIMMERS - glimmerCount, 0);
  const fireflyIds = useMemo(
    () => Array.from({ length: fireflyCount }, (_, i) => i + glimmerCount),
    [fireflyCount, glimmerCount]
  );

  const handleFireflyClick = useCallback((_id: number) => {
    setInputOpen(true);
  }, []);

  const handleAddGlimmer = useCallback(
    (text: string) => {
      if (glimmerCount >= MAX_GLIMMERS) {
        toast.info("Päivän purkki on täynnä! 🌟", {
          description: "Olet kerännyt kaikki 5 kiitollisuutta tänään.",
        });
        setInputOpen(false);
        return;
      }

      const newGlimmer: Glimmer = {
        id: Date.now().toString(),
        text,
        timestamp: Date.now(),
      };

      setGlimmers((prev) => [...prev, newGlimmer]);
      setInputOpen(false);
      toast.success("Kiitollisuus kerätty! ✨", {
        description: text.slice(0, 60),
      });
    },
    [glimmerCount]
  );

  // Interpolate background color: lavender → deep purple
  const bgLavender = { h: 235, s: 100, l: 85 };
  const bgNight = { h: 252, s: 37, l: 32 };
  const bgH = bgLavender.h + (bgNight.h - bgLavender.h) * nightProgress;
  const bgS = bgLavender.s + (bgNight.s - bgLavender.s) * nightProgress;
  const bgL = bgLavender.l + (bgNight.l - bgLavender.l) * nightProgress;
  const bgColor = `hsl(${bgH} ${bgS}% ${bgL}%)`;

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: bgColor }}
    >
      {/* Torn paper background layers for depth */}
      <div
        className="absolute top-0 left-0 right-0 h-48 torn-edge-bottom"
        style={{
          background: `hsl(${bgH} ${Math.min(bgS + 10, 100)}% ${Math.min(bgL + 5, 95)}%)`,
          filter: "drop-shadow(0 4px 12px hsl(252 40% 20% / 0.15))",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-40 torn-edge-top"
        style={{
          background: `hsl(${bgH} ${Math.max(bgS - 15, 0)}% ${Math.max(bgL - 8, 10)}%)`,
          filter: "drop-shadow(0 -4px 12px hsl(252 40% 20% / 0.15))",
        }}
        aria-hidden="true"
      />

      {/* Side torn strips */}
      <div
        className="absolute top-20 -left-4 w-24 h-[60%] bg-accent/10 torn-scrap"
        style={{
          transform: "rotate(-5deg)",
          filter: "drop-shadow(3px 3px 8px hsl(252 40% 20% / 0.1))",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-32 -right-6 w-20 h-[40%] bg-primary/10 torn-scrap"
        style={{
          transform: "rotate(3deg)",
          filter: "drop-shadow(-3px 3px 8px hsl(252 40% 20% / 0.1))",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center min-h-screen px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ y: -40, opacity: 0, rotate: -5 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="mb-4"
        >
          <TornPaperTitle />
        </motion.div>

        {/* Subtitle on torn paper */}
        <motion.div
          className="mb-8 px-6 py-2 bg-card/80 torn-edge-all relative"
          style={{
            filter: "drop-shadow(2px 3px 6px hsl(252 40% 20% / 0.15))",
            transform: "rotate(1deg)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm font-body text-muted-foreground italic">
            Kerää päivän 5 kiitollisuutta — klikkaa tulikärpästä
          </p>
        </motion.div>

        {/* Jar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mb-8"
        >
          <PaperJar
            glimmerCount={glimmerCount}
            collectedGlimmers={todayGlimmers.map((g) => g.text)}
          />
        </motion.div>

        {/* Collected glimmers list */}
        {todayGlimmers.length > 0 && (
          <motion.div
            className="w-full max-w-md space-y-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <AnimatePresence>
              {todayGlimmers.map((g, i) => (
                <motion.div
                  key={g.id}
                  className="bg-card/90 px-5 py-3 torn-scrap paper-curl relative"
                  style={{
                    filter: "drop-shadow(3px 4px 8px hsl(252 40% 20% / 0.15))",
                    transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + Math.random())}deg)`,
                  }}
                  initial={{ opacity: 0, x: -30, rotate: -10 }}
                  animate={{ opacity: 1, x: 0, rotate: (i % 2 === 0 ? -1 : 1) }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <p className="text-primary font-display font-bold text-base leading-relaxed">
                    {g.text}
                  </p>
                  <span className="text-xs text-muted-foreground font-body mt-1 block">
                    {new Date(g.timestamp).toLocaleTimeString("fi-FI", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Goal reached message */}
        {glimmerCount >= MAX_GLIMMERS && (
          <motion.div
            className="text-center px-8 py-4 bg-accent/20 torn-scrap"
            style={{
              filter: "drop-shadow(3px 4px 10px hsl(56 100% 73% / 0.3))",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
          >
            <p className="text-xl font-display font-bold text-accent-foreground">
              🌟 Purkki on täynnä! 🌟
            </p>
            <p className="text-sm font-body text-muted-foreground mt-1">
              Olet kerännyt kaikki 5 päivän kiitollisuutta.
            </p>
          </motion.div>
        )}
      </main>

      {/* Fireflies floating around */}
      <AnimatePresence>
        {fireflyIds.map((id) => (
          <Firefly key={id} id={id} onClick={handleFireflyClick} />
        ))}
      </AnimatePresence>

      {/* Paper scrap input modal */}
      <PaperScrapInput
        isOpen={inputOpen}
        onClose={() => setInputOpen(false)}
        onSubmit={handleAddGlimmer}
      />
    </div>
  );
};

export default Index;
