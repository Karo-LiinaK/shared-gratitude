import TwinklingStars from "./TwinklingStars";

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
        <h1
          className="text-7xl md:text-8xl tracking-tight"
          style={{
            fontFamily: "'Neonderthaw', cursive",
            background: "linear-gradient(135deg, #C2CDFF 0%, #FFBB96 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            WebkitTextStroke: "1.5px hsl(235, 75%, 35%)",
          }}
        >
          Glimmer
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
