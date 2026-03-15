import TwinklingStars from "./TwinklingStars";

const letters = [
  { char: "G", rotate: -6, scale: 1.05, font: "'Bangers', cursive" },
  { char: "l", rotate: 3, scale: 0.95, font: "'Rock Salt', cursive" },
  { char: "i", rotate: -2, scale: 1.0, font: "'Special Elite', cursive" },
  { char: "m", rotate: 4, scale: 1.02, font: "'Permanent Marker', cursive" },
  { char: "m", rotate: -3, scale: 0.98, font: "'Caveat', cursive" },
  { char: "e", rotate: 5, scale: 1.03, font: "'Indie Flower', cursive" },
  { char: "r", rotate: -4, scale: 1.0, font: "'Reenie Beanie', cursive" },
];

const Header = () => {
  const today = new Date().toLocaleDateString('fi-FI', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="relative text-center py-12">
      <TwinklingStars />

      {/* Title */}
      <div className="relative z-10 mb-6">
        <h1 className="text-5xl md:text-6xl tracking-tight flex justify-center items-baseline gap-0.5">
          {letters.map((l, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                fontFamily: l.font,
                color: "hsl(235, 75%, 35%)",
                transform: `rotate(${l.rotate}deg) scale(${l.scale})`,
                display: "inline-block",
              }}
            >
              {l.char}
            </span>
          ))}
        </h1>
      </div>

      {/* Date */}
      <p className="relative z-10 text-muted-foreground text-lg font-serif">
        {today}
      </p>

      {/* Subtitle */}
      <p className="relative z-10 text-glimmer-warm-gray font-body text-sm mt-2 max-w-md mx-auto">
        Tallenna arjen valoisat hetket
      </p>
    </header>
  );
};

export default Header;
