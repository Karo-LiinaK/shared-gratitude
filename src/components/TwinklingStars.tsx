import { useMemo } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

interface PlacedStar {
  top: number;
  left: number;
  size: number;
}

const TwinklingStars = () => {
  const stars = useMemo<Star[]>(() => {
    const placedStars: PlacedStar[] = [];
    const minDistance = 14; // percentage points between star centers

    for (let i = 0; i < 18; i++) {
      let attempts = 0;
      let top = 0;
      let left = 0;
      let size = 0;
      let tooClose = true;

      while (tooClose && attempts < 50) {
        top = Math.random() * 100;
        left = Math.random() * 100;
        size = Math.random() * 4 + 2;

        tooClose = placedStars.some((existing) => {
          const dx = existing.left - left;
          const dy = existing.top - top;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < minDistance;
        });

        attempts++;
      }

      placedStars.push({ top, left, size });
    }

    return placedStars.map((star, i) => ({
      id: i,
      top: `${star.top}%`,
      left: `${star.left}%`,
      size: star.size,
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
            width={star.size * 3.5}
            height={star.size * 3.5}
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
