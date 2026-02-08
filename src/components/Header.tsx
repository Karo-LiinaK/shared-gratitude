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
        <div className="relative">
          {/* Outer rotating rings */}
          <div className="absolute -inset-4 rounded-full border-2 border-[#E2F7AA]/50 animate-spin" style={{
          animationDuration: '8s'
        }} />
          <div className="absolute -inset-6 rounded-full border border-[#E2F7AA]/30 animate-spin" style={{
          animationDuration: '12s',
          animationDirection: 'reverse'
        }} />
          
          {/* Pulsing glow layers */}
          <div className="absolute -inset-5 rounded-full bg-[#E2F7AA]/30 blur-2xl animate-pulse" />
          <div className="absolute -inset-3 rounded-full bg-[#E2F7AA]/50 blur-xl animate-pulse-glow" />
          
          {/* Main icon container */}
          <div className="relative w-14 h-14 rounded-full bg-[#E2F7AA] flex items-center justify-center shadow-glow animate-pulse-glow">
            <Sun className="h-7 w-7 text-foreground animate-float" />
          </div>
          
          {/* Floating sparkle particles */}
          <div className="absolute -top-2 -right-2 w-2.5 h-2.5 rounded-full bg-[#E2F7AA] opacity-80 animate-float" style={{
          animationDelay: '0.5s'
        }} />
          <div className="absolute -bottom-1 -left-2 w-2 h-2 rounded-full bg-[#E2F7AA] opacity-70 animate-float" style={{
          animationDelay: '1s'
        }} />
          <div className="absolute top-1 -left-3 w-1.5 h-1.5 rounded-full bg-[#E2F7AA] opacity-90 animate-float" style={{
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