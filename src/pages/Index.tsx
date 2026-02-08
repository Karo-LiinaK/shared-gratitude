import { useState, useMemo } from "react";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
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
  // Tänään
  {
    text: "Aamukahvi auringonnousun valossa ikkunan äärellä",
    daysAgo: 0,
    hoursAgo: 1
  }, {
    text: "Lämmin halaus tyttäreltäni ennen koulua",
    daysAgo: 0,
    hoursAgo: 2
  },
  // Eilen
  {
    text: "Sateen ääni katolla kirjaa lukiessa",
    daysAgo: 1,
    hoursAgo: 3
  }, {
    text: "Yllätyssoitto vanhalta ystävältä",
    daysAgo: 1,
    hoursAgo: 8
  }, {
    text: "Kotitekoinen keitto illalliseksi",
    daysAgo: 1,
    hoursAgo: 12
  },
  // 2 päivää sitten
  {
    text: "Löysin unohtuneen 20 euron setelin takintaskusta",
    daysAgo: 2,
    hoursAgo: 5
  }, {
    text: "Ensimmäiset kukat puhkesivat puutarhassa",
    daysAgo: 2,
    hoursAgo: 10
  },
  // 3 päivää sitten
  {
    text: "Tuottelias aamu töissä",
    daysAgo: 3,
    hoursAgo: 4
  }, {
    text: "Koirani innostus kun tulin kotiin",
    daysAgo: 3,
    hoursAgo: 9
  },
  // 5 päivää sitten
  {
    text: "Kaunis auringonlaskukävely",
    daysAgo: 5,
    hoursAgo: 6
  },
  // 7 päivää sitten
  {
    text: "Sain vihdoin luettua kirjan jota luin kuukausia",
    daysAgo: 7,
    hoursAgo: 2
  }, {
    text: "Hiljainen hetki itsekseni",
    daysAgo: 7,
    hoursAgo: 8
  }];
  return samples.map((sample, index) => {
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - sample.daysAgo);
    timestamp.setHours(timestamp.getHours() - sample.hoursAgo);
    return {
      id: `sample-${index}`,
      text: sample.text,
      author: "You",
      timestamp
    };
  });
};
const Index = () => {
  const [gratitudes, setGratitudes] = useState<Gratitude[]>(generateSampleData());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [familyMembers] = useState([{
    id: "1",
    name: "Sinä",
    initials: "MÄ",
    color: "amber"
  }, {
    id: "2",
    name: "Saara",
    initials: "SA",
    color: "peach"
  }, {
    id: "3",
    name: "Tomi",
    initials: "TO",
    color: "coral"
  }]);
  const isToday = format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

  // Filter gratitudes for selected date
  const filteredGratitudes = useMemo(() => {
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
    return gratitudes.filter(g => format(g.timestamp, "yyyy-MM-dd") === selectedDateStr).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [gratitudes, selectedDate]);

  // Check if a date has gratitudes (for calendar highlighting)
  const hasGratitudesOnDate = (date: Date): boolean => {
    const dateStr = format(date, "yyyy-MM-dd");
    return gratitudes.some(g => format(g.timestamp, "yyyy-MM-dd") === dateStr);
  };
  const handleAddGratitude = (text: string) => {
    const newGratitude: Gratitude = {
      id: Date.now().toString(),
      text,
      author: "Sinä",
      timestamp: new Date()
    };
    setGratitudes(prev => [newGratitude, ...prev]);
    toast.success("Kiitollisuus lisätty ✨", {
      description: "Hetkesi on tallennettu"
    });
  };
  const handleInvite = () => {
    toast.info("Kutsutoiminto tulossa pian!", {
      description: "Jaa kiitollisuustilasi perheen kanssa"
    });
  };

  // Calculate total stats
  const totalGratitudes = gratitudes.length;
  const daysWithGratitudes = new Set(gratitudes.map(g => format(g.timestamp, "yyyy-MM-dd"))).size;
  return <div className="min-h-screen bg-wavy-gradient">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-glimmer-peach/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-glimmer-coral/10 rounded-full blur-3xl animate-float" style={{
        animationDelay: "2s"
      }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glimmer-peach/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container max-w-2xl mx-auto px-4 pb-20">
        <Header />

        {/* Family Circle */}
        <div className="mb-8">
          <FamilyCircle members={familyMembers} onInvite={handleInvite} />
        </div>

        {/* Date Navigator */}
        <div className="mb-8">
          <DateNavigator selectedDate={selectedDate} onDateChange={setSelectedDate} hasGratitudes={hasGratitudesOnDate} />
        </div>

        {/* Input Section - Only show for today */}
        {isToday && <div className="mb-10">
            <GratitudeInput onSubmit={handleAddGratitude} />
          </div>}

        {/* Gratitudes List */}
        <div className="space-y-4">
          {filteredGratitudes.length === 0 ? <div className="text-center py-16 bg-card/50 rounded-2xl">
              <p className="text-muted-foreground font-body">
                {isToday ? "Aloita tallentamalla mistä olet kiitollinen tänään" : `Ei kiitollisuuksia päivänä ${format(selectedDate, "d. MMMM yyyy", {
              locale: fi
            })}`}
              </p>
            </div> : <>
              <h2 className="text-lg font-semibold text-foreground mb-4 font-serif">
                {isToday ? "Tämän päivän valohippuset" : format(selectedDate, "d. MMMM yyyy", {
              locale: fi
            })}
              </h2>
              {filteredGratitudes.map((gratitude, index) => <GratitudeCard key={gratitude.id} text={gratitude.text} author={gratitude.author} timestamp={gratitude.timestamp} index={index} />)}
            </>}
        </div>

        {/* Stats */}
        <div className="mt-12 text-center space-y-1">
          <p className="text-sm text-muted-foreground font-body">
            <span className="text-primary font-semibold">{filteredGratitudes.length}</span> 
            {" "}valohippus{filteredGratitudes.length !== 1 ? "ta" : ""} 
            {isToday ? " tänään" : ` päivänä ${format(selectedDate, "d.M.", {
            locale: fi
          })}`}
          </p>
          <p className="text-xs text-muted-foreground/70 font-body">
            Yhteensä {totalGratitudes} hetkeä {daysWithGratitudes} päivän ajalta
          </p>
        </div>
      </div>
    </div>;
};
export default Index;