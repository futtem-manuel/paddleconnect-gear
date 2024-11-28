import { Card, CardContent } from "@/components/ui/card";

interface Player {
  name: string;
  initialRank: number;
}

interface Team {
  players: Player[];
  score: string;
  color: "primary" | "secondary";
}

interface MatchQuickViewProps {
  teams: Team[];
}

export const MatchQuickView = ({ teams }: MatchQuickViewProps) => {
  return (
    <Card className="my-6">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {teams.map((team, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 border-${team.color} bg-${team.color}/5`}
            >
              <h5 className={`font-medium text-${team.color} mb-2`}>
                Team {index + 1}
              </h5>
              <div className="space-y-2">
                {team.players.map((player, playerIndex) => (
                  <div key={playerIndex} className="flex justify-between text-sm">
                    <span>{player.name}</span>
                    <span className="text-muted-foreground">
                      Rank: {player.initialRank.toFixed(1)}
                    </span>
                  </div>
                ))}
                <div className="mt-2 pt-2 border-t">
                  <span className="font-medium">Score: {team.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};