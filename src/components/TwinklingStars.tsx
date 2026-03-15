import { useMemo } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

const TwinklingStars = () => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        >
          {/* Star shape using CSS */}
          <svg
            width={star.size * 2.5}
            height={star.size * 2.5}
            viewBox="0 0 24 24"
            fill="#E2F7AA"
            className="drop-shadow-[0_0_4px_rgba(226,247,170,0.8)]"
          >
            <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default TwinklingStars;
