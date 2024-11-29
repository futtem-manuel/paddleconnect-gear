import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { eloToDisplayRating } from "@/utils/rankingUtils";
import { toast } from "sonner";

interface PlayerCardProps {
  player: {
    id: number;
    name: string;
    eloRating: number;
    avatar: string;
    location: string;
    matchesPlayed: number;
  };
  onPlayerClick: (player: any) => void;
}

export const PlayerCard = ({ player, onPlayerClick }: PlayerCardProps) => {
  const handleConnect = (e: React.MouseEvent, playerName: string) => {
    e.stopPropagation();
    toast.success("Connection request sent!", {
      description: `A request has been sent to ${playerName}.`,
    });
  };

  return (
    <Card 
      className="cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={() => onPlayerClick(player)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={player.avatar} />
            <AvatarFallback>
              {player.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{player.name}</h3>
            <p className="text-sm text-muted-foreground">
              {player.location} • Rating: {eloToDisplayRating(player.eloRating).toFixed(1)}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <div className="text-right">
              <p className="text-sm font-medium">{player.matchesPlayed}</p>
              <p className="text-xs text-muted-foreground">Matches</p>
            </div>
            <Button 
              onClick={(e) => handleConnect(e, player.name)}
              className="w-full sm:w-auto"
            >
              Connect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};