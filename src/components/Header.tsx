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

      {/* Title - soft naive style with violet and orange */}
      <div className="relative z-10 mb-6">
        <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight">
          <span
            className="inline-block text-primary"
            style={{
              transform: "rotate(-3deg)",
              display: "inline-block",
            }}
          >
            Gli
          </span>
          <span
            className="inline-block text-accent"
            style={{
              transform: "rotate(2deg) translateY(-4px)",
              display: "inline-block",
            }}
          >
            mm
          </span>
          <span
            className="inline-block text-primary"
            style={{
              transform: "rotate(-1deg)",
              display: "inline-block",
            }}
          >
            er
          </span>
        </h1>

        {/* Decorative orange dot */}
        <div
          className="mx-auto mt-3 w-5 h-5 rounded-full bg-accent shadow-glow"
          aria-hidden="true"
        />
      </div>

      {/* Date */}
      <p className="relative z-10 text-muted-foreground text-lg font-serif">
        {today}
      </p>

      {/* Subtitle */}
      <p className="relative z-10 text-muted-foreground/80 font-body text-sm mt-2 max-w-md mx-auto">
        Tallenna arjen valoisat hetket
      </p>
    </header>
  );
};

export default Header;
