import { Sun } from "lucide-react";
const Header = () => {
  const today = new Date().toLocaleDateString('fi-FI', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  return <header className="text-center py-12">
      {/* Logo */}
      <div className="inline-flex items-center justify-center gap-3 mb-6">
        <div className="relative text-[#a18282]">
          {/* Outer rotating ring */}
          <div className="absolute -inset-3 rounded-full border border-amber-300/30 animate-spin" style={{
          animationDuration: '8s'
        }} />
          <div className="absolute -inset-5 rounded-full border border-amber-200/20 animate-spin" style={{
          animationDuration: '12s',
          animationDirection: 'reverse'
        }} />
          
          {/* Pulsing glow layers */}
          <div className="absolute -inset-4 rounded-full bg-gradient-sunrise opacity-20 blur-2xl animate-pulse" />
          <div className="absolute -inset-2 rounded-full bg-gradient-glow opacity-40 blur-xl animate-pulse-glow" />
          
          {/* Main icon container */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-sunrise flex items-center justify-center shadow-glow animate-pulse-glow opacity-60 text-accent">
            <Sun className="h-6 text-primary-foreground animate-float w-[33px] border-0" />
          </div>
          
          {/* Floating sparkle particles */}
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-300 opacity-60 animate-float" style={{
          animationDelay: '0.5s'
        }} />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-amber-400 opacity-50 animate-float" style={{
          animationDelay: '1s'
        }} />
          <div className="absolute top-0 -left-2 w-1 h-1 rounded-full bg-amber-200 opacity-70 animate-float" style={{
          animationDelay: '1.5s'
        }} />
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