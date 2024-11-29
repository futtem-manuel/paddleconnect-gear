import { Card } from "@/components/ui/card";
import { formatDistance } from "date-fns";

interface Match {
  id: string;
  date: string;
  result: "won" | "lost";
  score: string;
}

interface ConnectionHistoryProps {
  matches: Match[];
}

export const ConnectionHistory = ({ matches }: ConnectionHistoryProps) => {
  if (matches.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        No matches played yet with this connection.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {matches.map((match) => (
        <Card key={match.id} className="p-3 flex items-center justify-between">
          <div>
            <p className="font-medium">
              {match.result === "won" ? "Victory" : "Defeat"}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDistance(new Date(match.date), new Date(), { addSuffix: true })}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">{match.score}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};