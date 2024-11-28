import { useState } from "react";
import { Input } from "@/components/ui/input";

interface ScoreInputProps {
  onScoreSubmit: (scores: { team1: number[]; team2: number[] }) => void;
}

export const ScoreInput = ({ onScoreSubmit }: ScoreInputProps) => {
  const [scores, setScores] = useState({
    team1: ["", "", ""],
    team2: ["", "", ""],
  });

  const handleScoreChange = (team: 'team1' | 'team2', setIndex: number, value: string) => {
    const newValue = value.replace(/[^0-9]/g, '');
    setScores(prev => ({
      ...prev,
      [team]: prev[team].map((score, idx) => idx === setIndex ? newValue : score),
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <h4 className="font-medium">Team 1</h4>
        <div className="flex gap-2">
          {scores.team1.map((score, idx) => (
            <Input
              key={`team1-${idx}`}
              type="text"
              value={score}
              onChange={(e) => handleScoreChange('team1', idx, e.target.value)}
              className="w-16"
              placeholder="0"
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Team 2</h4>
        <div className="flex gap-2">
          {scores.team2.map((score, idx) => (
            <Input
              key={`team2-${idx}`}
              type="text"
              value={score}
              onChange={(e) => handleScoreChange('team2', idx, e.target.value)}
              className="w-16"
              placeholder="0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};