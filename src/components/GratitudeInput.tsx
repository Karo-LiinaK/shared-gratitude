import { useState } from "react";
import { Send, Sparkles, Camera, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface GratitudeInputProps {
  onSubmit: (text: string) => void;
}

const GratitudeInput = ({ onSubmit }: GratitudeInputProps) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div 
      className={`relative bg-card rounded-2xl p-1 shadow-card transition-all duration-300 ${
        isFocused ? "shadow-glow ring-2 ring-primary/20" : ""
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="mt-1">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </div>
        
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Mistä olet kiitollinen tänään?"
          className="flex-1 min-h-[60px] border-0 bg-transparent resize-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground font-body text-base"
        />
        
        <Button
          onClick={handleSubmit}
          disabled={!text.trim()}
          size="icon"
          className="shrink-0 w-10 h-10 rounded-full bg-gradient-sunrise text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 shadow-soft"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Upcoming features */}
      <div className="flex items-center gap-3 px-4 pb-3 pt-0">
        <button disabled className="flex items-center gap-1.5 text-xs text-muted-foreground/50 cursor-not-allowed">
          <Camera className="w-3.5 h-3.5" />
          <span className="font-body">Kuva tulossa</span>
        </button>
        <button disabled className="flex items-center gap-1.5 text-xs text-muted-foreground/50 cursor-not-allowed">
          <Mic className="w-3.5 h-3.5" />
          <span className="font-body">Ääni tulossa</span>
        </button>
      </div>
    </div>
  );
};

export default GratitudeInput;
