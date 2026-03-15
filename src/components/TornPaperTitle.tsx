const TornPaperTitle = () => {
  return (
    <div className="relative inline-block">
      {/* Orange paper cutout title */}
      <div
        className="relative px-10 py-5 bg-primary torn-scrap"
        style={{
          filter: "drop-shadow(4px 6px 8px hsl(252 40% 20% / 0.35))",
          transform: "rotate(-2deg)",
        }}
      >
        <h1
          className="text-5xl md:text-7xl font-display font-black tracking-[0.15em] text-primary-foreground uppercase select-none"
          style={{
            textShadow: "2px 2px 0px hsl(25 70% 40% / 0.3)",
          }}
        >
          Glimmer
        </h1>
      </div>

      {/* Small torn accent piece */}
      <div
        className="absolute -bottom-3 -right-4 w-12 h-8 bg-primary/80 torn-scrap"
        style={{
          transform: "rotate(12deg)",
          filter: "drop-shadow(2px 3px 4px hsl(252 40% 20% / 0.25))",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-2 -left-3 w-8 h-6 bg-primary/70 torn-scrap"
        style={{
          transform: "rotate(-8deg)",
          filter: "drop-shadow(2px 3px 4px hsl(252 40% 20% / 0.2))",
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default TornPaperTitle;
