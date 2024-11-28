import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Player {
  name: string;
  initialRank: number;
}

interface Team {
  players: Player[];
  score: string;
  color: "primary" | "secondary";
}

interface MatchSummaryProps {
  date: string;
  venue: string;
  teams: Team[];
  isContested: boolean;
}

export const MatchSummary = ({ date, venue, teams, isContested }: MatchSummaryProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Match Summary</CardTitle>
        {isContested && (
          <Badge variant="destructive" className="mb-4">
            Contested Match
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-muted-foreground">Date</h4>
              <p>{date}</p>
            </div>
            <div>
              <h4 className="font-medium text-muted-foreground">Venue</h4>
              <p>{venue}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-muted-foreground mb-2">Teams</h4>
            <div className="grid grid-cols-2 gap-4">
              {teams.map((team, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 border-${team.color} bg-${team.color}/5`}
                >
                  <h5 className={`font-medium text-${team.color} mb-2`}>
                    Team {index + 1}
                  </h5>
                  <ul className="space-y-1">
                    {team.players.map((player, playerIndex) => (
                      <li key={playerIndex} className="flex justify-between">
                        <span>{player.name}</span>
                        <span className="text-muted-foreground">
                          Rank: {player.initialRank.toFixed(1)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-medium">Score: {team.score}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};