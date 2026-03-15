import { useMemo } from "react";

interface PaperJarProps {
  glimmerCount: number;
  collectedGlimmers: string[];
}

const PaperJar = ({ glimmerCount, collectedGlimmers }: PaperJarProps) => {
  const glowIntensity = Math.min(glimmerCount / 5, 1);

  // Jar outline path with jagged torn edges
  const jarPath = useMemo(() => {
    return `
      M 30 20
      C 28 18, 25 15, 25 12
      L 25 8 C 25 5, 28 3, 32 2
      L 33 3 L 35 1 L 38 3 L 40 2 L 43 3 L 45 1 L 48 3 L 50 2
      L 52 3 L 55 1 L 57 3 L 60 2 L 62 3 L 65 1 L 67 3 L 68 2
      C 72 3, 75 5, 75 8
      L 75 12 C 75 15, 72 18, 70 20
      L 72 23 L 71 26 L 73 30 L 72 34 L 74 38 L 73 42
      L 74 46 L 73 50 L 74 54 L 73 58 L 74 62 L 73 66
      L 74 70 L 72 74 L 73 78 L 71 82 L 72 85
      C 72 88, 70 92, 68 94
      L 67 93 L 65 95 L 63 93 L 60 95 L 58 93 L 55 95 L 53 93
      L 50 95 L 48 93 L 45 95 L 43 93 L 40 95 L 38 93 L 35 95 L 33 93 L 32 94
      C 30 92, 28 88, 28 85
      L 29 82 L 28 78 L 27 74 L 28 70 L 27 66 L 26 62
      L 27 58 L 26 54 L 27 50 L 26 46 L 27 42 L 26 38
      L 27 34 L 28 30 L 27 26 L 28 23
      Z
    `;
  }, []);

  return (
    <div className="relative w-64 h-80 mx-auto">
      {/* Jar glow effect */}
      {glimmerCount > 0 && (
        <div
          className="absolute inset-0 rounded-[40%] blur-3xl transition-opacity duration-1000"
          style={{
            background: `radial-gradient(ellipse at center, hsl(56 100% 73% / ${glowIntensity * 0.6}), transparent 70%)`,
            transform: "scale(1.3)",
          }}
          aria-hidden="true"
        />
      )}

      {/* SVG Jar */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10"
        style={{
          filter: `drop-shadow(3px 5px 8px hsl(252 40% 20% / 0.3))`,
        }}
      >
        <defs>
          {/* Inner glow */}
          <radialGradient id="jarGlow" cx="50%" cy="60%" r="40%">
            <stop offset="0%" stopColor={`hsl(56 100% 80% / ${glowIntensity * 0.5})`} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Inner glow fill */}
        {glimmerCount > 0 && (
          <path d={jarPath} fill="url(#jarGlow)" />
        )}

        {/* Jar outline - jagged yellow paper */}
        <path
          d={jarPath}
          fill="none"
          stroke="hsl(56 100% 73%)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          style={{
            filter: "drop-shadow(0 0 3px hsl(56 100% 73% / 0.4))",
          }}
        />

        {/* Small collected fireflies inside jar */}
        {collectedGlimmers.slice(0, 5).map((_, i) => {
          const cx = 38 + (i % 3) * 12;
          const cy = 45 + Math.floor(i / 3) * 18;
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r="5"
                fill="hsl(56 100% 73%)"
                opacity={0.9}
                style={{
                  filter: "drop-shadow(0 0 6px hsl(56 100% 73% / 0.8))",
                }}
              />
              <circle
                cx={cx}
                cy={cy}
                r="2.5"
                fill="hsl(56 100% 90%)"
              />
            </g>
          );
        })}
      </svg>

      {/* Count label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
        <span
          className="text-sm font-display font-bold text-accent-foreground bg-accent/80 px-3 py-1 torn-edge-all"
          style={{
            filter: "drop-shadow(2px 2px 4px hsl(252 40% 20% / 0.2))",
          }}
        >
          {glimmerCount} / 5
        </span>
      </div>
    </div>
  );
};

export default PaperJar;
