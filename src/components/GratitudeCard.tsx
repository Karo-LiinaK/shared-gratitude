import { Sparkles } from "lucide-react";

interface GratitudeCardProps {
  text: string;
  author?: string;
  timestamp: Date;
  index: number;
}

const GratitudeCard = ({ text, author, timestamp, index }: GratitudeCardProps) => {
  return (
    <article
      role="listitem"
      className="group relative bg-gradient-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-500 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 rounded-2xl glimmer-shimmer pointer-events-none" />
      
      {/* Sparkle icon */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-sunrise rounded-full flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="w-4 h-4 text-primary-foreground" />
      </div>
      
      <p className="text-lg font-body text-foreground leading-relaxed mb-4">
        {text}
      </p>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        {author && (
          <span className="font-medium text-glimmer-coral">{author}</span>
        )}
        <span className="font-body text-xs">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </article>
  );
};

export default GratitudeCard;
