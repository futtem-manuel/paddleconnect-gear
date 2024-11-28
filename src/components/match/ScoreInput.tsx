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
  const [sets, setSets] = useState<Set[]>([
    { team1Score: 0, team2Score: 0 },
    { team1Score: 0, team2Score: 0 },
    { team1Score: 0, team2Score: 0 }
  ]);

  const handleScoreChange = (setIndex: number, team: 1 | 2, value: string) => {
    const newSets = [...sets];
    const numValue = parseInt(value) || 0;
    
    if (team === 1) {
      newSets[setIndex].team1Score = numValue;
    } else {
      newSets[setIndex].team2Score = numValue;
    }

    // Check if we need to add tiebreak
    if (newSets[setIndex].team1Score === 6 && newSets[setIndex].team2Score === 6) {
      if (!newSets[setIndex].tiebreak) {
        newSets[setIndex].tiebreak = { team1Score: 0, team2Score: 0 };
      }
    } else {
      delete newSets[setIndex].tiebreak;
    }

    setSets(newSets);
    onScoreSubmit(newSets);
  };

  const handleTiebreakChange = (setIndex: number, team: 1 | 2, value: string) => {
    const newSets = [...sets];
    const numValue = parseInt(value) || 0;
    
    if (!newSets[setIndex].tiebreak) return;
    
    if (team === 1) {
      newSets[setIndex].tiebreak.team1Score = numValue;
    } else {
      newSets[setIndex].tiebreak.team2Score = numValue;
    }

    setSets(newSets);
    onScoreSubmit(newSets);
  };

  return (
    <div className="space-y-4">
      {sets.map((set, index) => (
        <div key={index} className="space-y-2">
          <h4 className="font-medium">Set {index + 1}</h4>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              type="number"
              min="0"
              max="7"
              value={set.team1Score} 
              onChange={(e) => handleScoreChange(index, 1, e.target.value)}
              className="text-center"
            />
            <Input 
              type="number"
              min="0"
              max="7"
              value={set.team2Score} 
              onChange={(e) => handleScoreChange(index, 2, e.target.value)}
              className="text-center"
            />
            {set.tiebreak && (
              <div className="col-span-2 grid grid-cols-2 gap-4 mt-2">
                <Input 
                  type="number"
                  min="0"
                  placeholder="Tiebreak"
                  value={set.tiebreak.team1Score} 
                  onChange={(e) => handleTiebreakChange(index, 1, e.target.value)}
                  className="text-center"
                />
                <Input 
                  type="number"
                  min="0"
                  placeholder="Tiebreak"
                  value={set.tiebreak.team2Score} 
                  onChange={(e) => handleTiebreakChange(index, 2, e.target.value)}
                  className="text-center"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};