import TwinklingStars from "./TwinklingStars";

const Header = () => {
  const today = new Date().toLocaleDateString('fi-FI', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="relative text-center py-12">
      {/* Twinkling stars around the entire header */}
      <TwinklingStars />

      {/* Title - calligraphy ribbon reveal */}
      <div className="relative z-10 mb-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight ribbon-title">
          <span className="ribbon-reveal">
            {"Glimmer".split("").map((char, i) => (
              <span
                key={i}
                className="ribbon-letter"
                style={{ animationDelay: `${i * 0.18}s` }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>
      </div>

      {/* Date */}
      <p className="relative z-10 text-muted-foreground text-lg font-serif animate-fade-in-up" style={{ animationDelay: '1.6s', opacity: 0 }}>
        {today}
      </p>

      {/* Subtitle */}
      <p className="relative z-10 text-glimmer-warm-gray font-body text-sm mt-2 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '2s', opacity: 0 }}>
        Tallenna arjen valoisat hetket
      </p>
    </header>
  );
};

export default Header;
