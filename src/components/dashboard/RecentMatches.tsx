import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface Match {
  id: string;
  date: string;
  venue: string;
  result: string;
  score: string;
  opponent: string;
  opponentAvatar?: string;
}

interface RecentMatchesProps {
  matches: Match[];
}

export const RecentMatches = ({ matches }: RecentMatchesProps) => {
  const navigate = useNavigate();

  return (
    <Card className="neu-card">
      <CardHeader>
        <CardTitle>Recent Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              onClick={() => navigate(`/match/${match.id}`)}
              className="p-4 neu-card hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={match.opponentAvatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"} 
                      alt={match.opponent}
                    />
                    <AvatarFallback>{match.opponent.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">vs {match.opponent}</p>
                    <p className="text-sm text-muted-foreground">{match.venue}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${match.result === 'Won' ? 'text-green-500' : 'text-red-500'}`}>
                    {match.result}
                  </p>
                  <p className="text-sm text-muted-foreground">{match.score}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{match.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};