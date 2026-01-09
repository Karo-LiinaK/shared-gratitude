import { useState, useMemo } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import Header from "@/components/Header";
import GratitudeInput from "@/components/GratitudeInput";
import GratitudeCard from "@/components/GratitudeCard";
import FamilyCircle from "@/components/FamilyCircle";
import DateNavigator from "@/components/DateNavigator";

interface Gratitude {
  id: string;
  text: string;
  author?: string;
  timestamp: Date;
}

// Helper to generate sample historical data
const generateSampleData = (): Gratitude[] => {
  const now = new Date();
  const samples = [
    // Today
    { text: "Morning coffee with the sunrise streaming through the window", daysAgo: 0, hoursAgo: 1 },
    { text: "A warm hug from my daughter before school", daysAgo: 0, hoursAgo: 2 },
    // Yesterday
    { text: "The sound of rain on the roof while reading", daysAgo: 1, hoursAgo: 3 },
    { text: "A surprise call from an old friend", daysAgo: 1, hoursAgo: 8 },
    { text: "Homemade soup for dinner", daysAgo: 1, hoursAgo: 12 },
    // 2 days ago
    { text: "Finding a forgotten $20 in my jacket pocket", daysAgo: 2, hoursAgo: 5 },
    { text: "The first flowers blooming in the garden", daysAgo: 2, hoursAgo: 10 },
    // 3 days ago
    { text: "A productive morning at work", daysAgo: 3, hoursAgo: 4 },
    { text: "My dog's excitement when I came home", daysAgo: 3, hoursAgo: 9 },
    // 5 days ago
    { text: "A beautiful sunset walk", daysAgo: 5, hoursAgo: 6 },
    // 7 days ago
    { text: "Finishing a book I've been reading for months", daysAgo: 7, hoursAgo: 2 },
    { text: "A quiet moment of reflection", daysAgo: 7, hoursAgo: 8 },
  ];

  return samples.map((sample, index) => {
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - sample.daysAgo);
    timestamp.setHours(timestamp.getHours() - sample.hoursAgo);
    
    return {
      id: `sample-${index}`,
      text: sample.text,
      author: "You",
      timestamp,
    };
  });
};

const Index = () => {
  const [gratitudes, setGratitudes] = useState<Gratitude[]>(generateSampleData());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [familyMembers] = useState([
    { id: "1", name: "You", initials: "ME", color: "amber" },
    { id: "2", name: "Sarah", initials: "SA", color: "peach" },
    { id: "3", name: "Tom", initials: "TM", color: "coral" },
  ]);

  const isToday = format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

  // Filter gratitudes for selected date
  const filteredGratitudes = useMemo(() => {
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
    return gratitudes
      .filter((g) => format(g.timestamp, "yyyy-MM-dd") === selectedDateStr)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [gratitudes, selectedDate]);

  // Check if a date has gratitudes (for calendar highlighting)
  const hasGratitudesOnDate = (date: Date): boolean => {
    const dateStr = format(date, "yyyy-MM-dd");
    return gratitudes.some((g) => format(g.timestamp, "yyyy-MM-dd") === dateStr);
  };

  const handleAddGratitude = (text: string) => {
    const newGratitude: Gratitude = {
      id: Date.now().toString(),
      text,
      author: "You",
      timestamp: new Date(),
    };
    
    setGratitudes((prev) => [newGratitude, ...prev]);
    toast.success("Gratitude added ✨", {
      description: "Your moment has been captured",
    });
  };

  const handleInvite = () => {
    toast.info("Invite feature coming soon!", {
      description: "Share your gratitude space with family",
    });
  };

  // Calculate total stats
  const totalGratitudes = gratitudes.length;
  const daysWithGratitudes = new Set(
    gratitudes.map((g) => format(g.timestamp, "yyyy-MM-dd"))
  ).size;

  return (
    <div className="min-h-screen bg-gradient-glow">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-glimmer-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-glimmer-peach/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glimmer-coral/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container max-w-2xl mx-auto px-4 pb-20">
        <Header />

        {/* Family Circle */}
        <div className="mb-8">
          <FamilyCircle 
            members={familyMembers} 
            onInvite={handleInvite}
          />
        </div>

        {/* Date Navigator */}
        <div className="mb-8">
          <DateNavigator
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            hasGratitudes={hasGratitudesOnDate}
          />
        </div>

        {/* Input Section - Only show for today */}
        {isToday && (
          <div className="mb-10">
            <GratitudeInput onSubmit={handleAddGratitude} />
          </div>
        )}

        {/* Gratitudes List */}
        <div className="space-y-4">
          {filteredGratitudes.length === 0 ? (
            <div className="text-center py-16 bg-card/50 rounded-2xl">
              <p className="text-muted-foreground font-body">
                {isToday 
                  ? "Start capturing what makes you grateful today"
                  : `No gratitudes recorded on ${format(selectedDate, "MMMM d, yyyy")}`
                }
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">
                {isToday ? "Today's Glimmers" : format(selectedDate, "MMMM d, yyyy")}
              </h2>
              {filteredGratitudes.map((gratitude, index) => (
                <GratitudeCard
                  key={gratitude.id}
                  text={gratitude.text}
                  author={gratitude.author}
                  timestamp={gratitude.timestamp}
                  index={index}
                />
              ))}
            </>
          )}
        </div>

        {/* Stats */}
        <div className="mt-12 text-center space-y-1">
          <p className="text-sm text-muted-foreground font-body">
            <span className="text-primary font-semibold">{filteredGratitudes.length}</span> 
            {" "}glimmer{filteredGratitudes.length !== 1 ? "s" : ""} 
            {isToday ? " today" : ` on ${format(selectedDate, "MMM d")}`}
          </p>
          <p className="text-xs text-muted-foreground/70 font-body">
            {totalGratitudes} total moments across {daysWithGratitudes} days
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
