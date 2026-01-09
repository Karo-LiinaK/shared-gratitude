import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import GratitudeInput from "@/components/GratitudeInput";
import GratitudeCard from "@/components/GratitudeCard";
import FamilyCircle from "@/components/FamilyCircle";

interface Gratitude {
  id: string;
  text: string;
  author?: string;
  timestamp: Date;
}

const Index = () => {
  const [gratitudes, setGratitudes] = useState<Gratitude[]>([
    {
      id: "1",
      text: "Morning coffee with the sunrise streaming through the window",
      author: "You",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2", 
      text: "A warm hug from my daughter before school",
      author: "You",
      timestamp: new Date(Date.now() - 7200000),
    },
  ]);

  const [familyMembers] = useState([
    { id: "1", name: "You", initials: "ME", color: "amber" },
    { id: "2", name: "Sarah", initials: "SA", color: "peach" },
    { id: "3", name: "Tom", initials: "TM", color: "coral" },
  ]);

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
        <div className="mb-10">
          <FamilyCircle 
            members={familyMembers} 
            onInvite={handleInvite}
          />
        </div>

        {/* Input Section */}
        <div className="mb-10">
          <GratitudeInput onSubmit={handleAddGratitude} />
        </div>

        {/* Gratitudes List */}
        <div className="space-y-4">
          {gratitudes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-body">
                Start capturing what makes you grateful today
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">
                Today's Glimmers
              </h2>
              {gratitudes.map((gratitude, index) => (
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
        {gratitudes.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground font-body">
              <span className="text-primary font-semibold">{gratitudes.length}</span> moments of gratitude today
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
