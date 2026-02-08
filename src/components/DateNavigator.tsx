import { format } from "date-fns";
import { fi } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateNavigatorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  hasGratitudes?: (date: Date) => boolean;
}

const DateNavigator = ({ selectedDate, onDateChange, hasGratitudes }: DateNavigatorProps) => {
  const isToday = format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
  
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    if (newDate <= new Date()) {
      onDateChange(newDate);
    }
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPreviousDay}
        className="h-9 w-9 rounded-full hover:bg-secondary"
        aria-label="Edellinen päivä"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "min-w-[200px] justify-center gap-2 font-body text-sm border-border bg-card hover:bg-secondary",
              isToday && "ring-2 ring-primary/20"
            )}
          >
            <CalendarIcon className="h-4 w-4 text-primary" />
            {isToday ? "Tänään" : format(selectedDate, "EEEE d.M.", { locale: fi })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateChange(date)}
            disabled={(date) => date > new Date()}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
            modifiers={{
              hasGratitudes: (date) => hasGratitudes?.(date) ?? false,
            }}
            modifiersStyles={{
              hasGratitudes: {
                fontWeight: "bold",
                textDecoration: "underline",
                textDecorationColor: "hsl(38 92% 50%)",
                textUnderlineOffset: "4px",
              },
            }}
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNextDay}
        disabled={isToday}
        className="h-9 w-9 rounded-full hover:bg-secondary disabled:opacity-30"
        aria-label="Seuraava päivä"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {!isToday && (
        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
          className="ml-2 text-xs font-body"
        >
          Takaisin tähän päivään
        </Button>
      )}
    </div>
  );
};

export default DateNavigator;
