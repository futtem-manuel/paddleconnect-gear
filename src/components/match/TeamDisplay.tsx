import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";

interface Player {
  id: string;
  name: string;
  avatar_url?: string;
}

interface TeamDisplayProps {
  team: Player[];
  teamNumber: number;
  maxPlayers: number;
  onRemovePlayer: (team: number, playerId: string) => void;
  isDoubles: boolean;
}

export const TeamDisplay = ({ team, teamNumber, maxPlayers, onRemovePlayer, isDoubles }: TeamDisplayProps) => {
  const colorClass = teamNumber === 1 ? "border-primary bg-primary/5" : "border-secondary bg-secondary/5";
  const titleClass = teamNumber === 1 ? "text-primary" : "text-secondary";

  return (
    <div className={`space-y-2 p-4 rounded-lg border-2 ${colorClass}`}>
      <h4 className={`font-medium ${titleClass}`}>Team {teamNumber}</h4>
      <div className="space-y-2">
        {team.map((player) => (
          <div key={player.id} className="flex items-center justify-between p-3 rounded-md bg-white border shadow-sm">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={player.avatar_url} />
                <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{player.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemovePlayer(teamNumber, player.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {team.length < maxPlayers && (
          <div className="p-3 rounded-md border border-dashed text-center text-muted-foreground">
            {isDoubles ? "Add another player" : "Add player"}
          </div>
        )}
      </div>
    </div>
  );
};