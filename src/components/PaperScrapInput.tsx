import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PaperScrapInputProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

const PaperScrapInput = ({ isOpen, onClose, onSubmit }: PaperScrapInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-foreground/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Paper scrap */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 12 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div
              className="bg-card w-full max-w-md p-8 torn-scrap paper-curl relative"
              style={{
                filter: "drop-shadow(6px 10px 20px hsl(252 40% 20% / 0.4))",
                transform: "rotate(1deg)",
              }}
            >
              {/* Decorative tape strip */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-accent/60 rounded-sm"
                style={{
                  transform: "rotate(-3deg)",
                  filter: "drop-shadow(1px 2px 3px hsl(252 40% 20% / 0.15))",
                }}
                aria-hidden="true"
              />

              <p className="text-sm font-body text-muted-foreground mb-4 italic">
                Mistä olet kiitollinen juuri nyt?
              </p>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Kirjoita kiitollisuutesi..."
                className="w-full bg-transparent border-none resize-none focus:outline-none text-primary text-xl font-display font-bold leading-relaxed placeholder:text-primary/30 min-h-[100px]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 31px, hsl(235 30% 76% / 0.3) 31px, hsl(235 30% 76% / 0.3) 32px)",
                  backgroundSize: "100% 32px",
                  lineHeight: "32px",
                  paddingTop: "0px",
                }}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={onClose}
                  className="text-sm text-muted-foreground font-body hover:text-foreground transition-colors"
                >
                  Peruuta
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!text.trim()}
                  className="relative px-6 py-2 bg-accent text-accent-foreground font-display font-bold text-sm torn-edge-all disabled:opacity-40 hover:brightness-105 transition-all"
                  style={{
                    filter: "drop-shadow(2px 3px 5px hsl(252 40% 20% / 0.25))",
                  }}
                >
                  Lisää purkkiin ✨
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaperScrapInput;
