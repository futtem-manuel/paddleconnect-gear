import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Set {
  team1Score: number;
  team2Score: number;
  tiebreak?: {
    team1Score: number;
    team2Score: number;
  };
}

interface ScoreInputProps {
  onScoreSubmit: (sets: Set[]) => void;
}

export const ScoreInput = ({ onScoreSubmit }: ScoreInputProps) => {
  const [sets, setSets] = useState<Set[]>([{ team1Score: 0, team2Score: 0 }]);
  const [currentGame, setCurrentGame] = useState({ team1Score: 0, team2Score: 0 });

  const addPoint = (team: 1 | 2) => {
    const scores = ["0", "15", "30", "40", "Game"];
    const currentTeamScore = team === 1 ? currentGame.team1Score : currentGame.team2Score;
    const otherTeamScore = team === 1 ? currentGame.team2Score : currentGame.team1Score;

    if (currentTeamScore === 3 && otherTeamScore === 3) {
      // Gold point
      if (team === 1) {
        handleGameWin(1);
      } else {
        handleGameWin(2);
      }
      return;
    }

    if (currentTeamScore === 3 && otherTeamScore < 3) {
      handleGameWin(team);
      return;
    }

    setCurrentGame(prev => ({
      ...prev,
      [team === 1 ? 'team1Score' : 'team2Score']: prev[team === 1 ? 'team1Score' : 'team2Score'] + 1
    }));
  };

  const handleGameWin = (team: 1 | 2) => {
    const currentSet = sets[sets.length - 1];
    const newScore = {
      ...currentSet,
      [team === 1 ? 'team1Score' : 'team2Score']: currentSet[team === 1 ? 'team1Score' : 'team2Score'] + 1
    };

    // Check if tiebreak is needed
    if (newScore.team1Score === 6 && newScore.team2Score === 6) {
      setSets(prev => [...prev.slice(0, -1), { ...newScore, tiebreak: { team1Score: 0, team2Score: 0 } }]);
    } else if (
      (newScore.team1Score >= 6 && newScore.team1Score - newScore.team2Score >= 2) ||
      (newScore.team2Score >= 6 && newScore.team2Score - newScore.team1Score >= 2)
    ) {
      // Set is won
      setSets(prev => [...prev, { team1Score: 0, team2Score: 0 }]);
    } else {
      setSets(prev => [...prev.slice(0, -1), newScore]);
    }

    setCurrentGame({ team1Score: 0, team2Score: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Team 1</h3>
          <Button onClick={() => addPoint(1)} className="w-full">
            Add Point ({["0", "15", "30", "40"][currentGame.team1Score] || "Game"})
          </Button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Team 2</h3>
          <Button onClick={() => addPoint(2)} className="w-full">
            Add Point ({["0", "15", "30", "40"][currentGame.team2Score] || "Game"})
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Sets</h3>
        {sets.map((set, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <Input 
              value={set.team1Score} 
              readOnly 
              className="text-center"
            />
            <Input 
              value={set.team2Score} 
              readOnly 
              className="text-center"
            />
            {set.tiebreak && (
              <div className="col-span-2 grid grid-cols-2 gap-4 mt-2">
                <Input 
                  value={set.tiebreak.team1Score} 
                  readOnly 
                  className="text-center"
                />
                <Input 
                  value={set.tiebreak.team2Score} 
                  readOnly 
                  className="text-center"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};