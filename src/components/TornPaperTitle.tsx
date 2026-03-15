const letters = [
  { char: "G", bg: "hsl(25 80% 52%)", color: "white", rotate: -4, font: "serif", scale: 1.1 },
  { char: "l", bg: "hsl(252 50% 45%)", color: "hsl(56 100% 85%)", rotate: 3, font: "cursive", scale: 0.95 },
  { char: "i", bg: "hsl(56 90% 65%)", color: "hsl(252 40% 20%)", rotate: -2, font: "sans-serif", scale: 0.9 },
  { char: "m", bg: "hsl(252 37% 32%)", color: "white", rotate: 5, font: "serif", scale: 1 },
  { char: "m", bg: "hsl(25 70% 60%)", color: "white", rotate: -3, font: "cursive", scale: 1.05 },
  { char: "e", bg: "hsl(235 60% 72%)", color: "hsl(252 40% 20%)", rotate: 2, font: "sans-serif", scale: 0.95 },
  { char: "r", bg: "hsl(25 80% 52%)", color: "white", rotate: -5, font: "serif", scale: 1.1 },
];

const TornPaperTitle = () => {
  return (
    <div className="flex items-center gap-1 md:gap-2">
      {letters.map((l, i) => (
        <div
          key={i}
          className="torn-scrap relative px-2 py-1 md:px-4 md:py-2 select-none"
          style={{
            backgroundColor: l.bg,
            transform: `rotate(${l.rotate}deg) scale(${l.scale})`,
            filter: "drop-shadow(3px 4px 6px hsl(252 40% 20% / 0.4))",
          }}
        >
          <span
            className="text-4xl md:text-6xl font-black block leading-none"
            style={{
              color: l.color,
              fontFamily: l.font,
              textShadow: "1px 1px 2px hsl(0 0% 0% / 0.2)",
            }}
          >
            {l.char}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TornPaperTitle;
