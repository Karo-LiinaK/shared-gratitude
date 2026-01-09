import { Sparkles } from "lucide-react";
const Header = () => {
  const today = new Date().toLocaleDateString('fi-FI', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  return <header className="text-center py-12">
      {/* Logo */}
      <div className="inline-flex items-center justify-center gap-3 mb-6">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-sunrise flex items-center justify-center shadow-glow animate-pulse-glow">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-sunrise opacity-30 blur-xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground tracking-tight">
          Glimmer
        </h1>
      </div>
      
      {/* Date */}
      <p className="text-muted-foreground text-lg font-serif">
        {today}
      </p>
      
      {/* Subtitle */}
      <p className="text-glimmer-warm-gray font-body text-sm mt-2 max-w-md mx-auto">
        Tallenna arjen valoisat hetket
      </p>
    </header>;
};
export default Header;