import { motion } from "framer-motion";
import { useMemo } from "react";

interface FireflyProps {
  id: number;
  onClick: (id: number) => void;
}

const Firefly = ({ id, onClick }: FireflyProps) => {
  const config = useMemo(() => {
    const size = 80 + Math.random() * 50; // 80-130px
    const startX = Math.random() * 70 + 10; // 10-80% from left
    const startY = Math.random() * 50 + 15; // 15-65% from top

    // Generate a unique torn shape
    const points = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 35 + Math.random() * 15;
      const x = 50 + Math.cos(angle) * radius;
      const y = 50 + Math.sin(angle) * radius;
      return `${x}% ${y}%`;
    }).join(", ");

    return { size, startX, startY, clipPath: `polygon(${points})` };
  }, [id]);

  return (
    <motion.button
      className="absolute cursor-pointer z-20 group"
      style={{
        width: config.size,
        height: config.size,
        left: `${config.startX}%`,
        top: `${config.startY}%`,
      }}
      onClick={() => onClick(id)}
      animate={{
        x: [0, 30, -20, 15, -10, 0],
        y: [0, -25, 10, -15, 20, 0],
        rotate: [0, 5, -3, 4, -2, 0],
      }}
      transition={{
        duration: 12 + Math.random() * 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Klikkaa keräämään kiitollisuus"
    >
      {/* Yellow paper shape */}
      <div
        className="w-full h-full bg-accent relative"
        style={{
          clipPath: config.clipPath,
          filter: "drop-shadow(3px 4px 6px hsl(252 40% 20% / 0.3))",
        }}
      >
        {/* Inner glow */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-accent/0 via-primary-foreground/30 to-accent/0"
          style={{ clipPath: config.clipPath }}
          aria-hidden="true"
        />
      </div>

      {/* Glow aura */}
      <div
        className="absolute inset-0 -m-3 rounded-full blur-xl bg-accent/30 group-hover:bg-accent/50 transition-colors"
        aria-hidden="true"
      />
    </motion.button>
  );
};

export default Firefly;
