import { Plus, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FamilyMember {
  id: string;
  name: string;
  initials: string;
  color: string;
}

interface FamilyCircleProps {
  members: FamilyMember[];
  maxMembers?: number;
  onInvite?: () => void;
}

const colorVariants: Record<string, string> = {
  amber: "bg-[#D4E6A0] text-[#201D5E]",
  peach: "bg-[#D6C4E8] text-[#201D5E]",
  coral: "bg-[#E8D9A8] text-[#201D5E]",
  cream: "bg-[#E2BDA4] text-[#201D5E]",
};

const FamilyCircle = ({ members, maxMembers = 6, onInvite }: FamilyCircleProps) => {
  const spotsLeft = maxMembers - members.length;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Users className="w-4 h-4" />
        <span className="text-sm font-body">Sinun piirisi</span>
      </div>
      
      <div className="flex items-center -space-x-3">
        {members.map((member, index) => (
          <Tooltip key={member.id}>
            <TooltipTrigger>
              <Avatar 
                className={`w-12 h-12 border-2 border-background shadow-soft transition-transform hover:scale-110 hover:z-10 ${colorVariants[member.color] || colorVariants.amber}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AvatarFallback className={colorVariants[member.color] || colorVariants.amber}>
                  {member.initials}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{member.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        
        {spotsLeft > 0 && (
          <Tooltip>
            <TooltipTrigger>
              <button
                onClick={onInvite}
                className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors bg-background"
              >
                <Plus className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Kutsu joku ({spotsLeft} paikkaa jäljellä)</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default FamilyCircle;
