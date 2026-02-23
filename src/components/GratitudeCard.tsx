import { Sparkles, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface GratitudeCardProps {
  text: string;
  author?: string;
  timestamp: Date;
  index: number;
  onDelete?: () => void;
}

const GratitudeCard = ({ text, author, timestamp, index, onDelete }: GratitudeCardProps) => {
  return (
    <article
      role="listitem"
      className="group relative bg-gradient-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-500 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 rounded-2xl glimmer-shimmer pointer-events-none" />
      
      {/* Delete button */}
      {onDelete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Poista merkintä"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Poista merkintä?</AlertDialogTitle>
              <AlertDialogDescription>
                Haluatko varmasti poistaa tämän kiitollisuusmerkinnän? Tätä ei voi perua.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Peruuta</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Poista</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      
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
