import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PlayerSearch } from "./PlayerSearch";
import { TeamDisplay } from "./TeamDisplay";

interface Player {
  id: string;
  name: string;
  avatar_url?: string;
}

interface TeamSelectionProps {
  onTeamsConfirmed: (teams: { team1: Player[]; team2: Player[] }) => void;
  initialPlayers?: Player[];
}

export const TeamSelection = ({ onTeamsConfirmed, initialPlayers = [] }: TeamSelectionProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);
  const [isDoubles, setIsDoubles] = useState(true);
  const maxPlayersPerTeam = isDoubles ? 2 : 1;

  useEffect(() => {
    // Reset teams when switching between singles and doubles
    setTeam1([]);
    setTeam2([]);
  }, [isDoubles]);

  const handleAddPlayer = (team: number, player: Player) => {
    if (team === 1 && team1.length < maxPlayersPerTeam) {
      setTeam1(prev => [...prev, player]);
      setSearchValue("");
      toast.success(`Added ${player.name} to Team 1`);
    } else if (team === 2 && team2.length < maxPlayersPerTeam) {
      setTeam2(prev => [...prev, player]);
      setSearchValue("");
      toast.success(`Added ${player.name} to Team 2`);
    } else {
      toast.error(`Team ${team} is already full`);
    }
  };

  const handleRemovePlayer = (team: number, playerId: string) => {
    if (team === 1) {
      setTeam1(team1.filter(p => p.id !== playerId));
      toast.info("Player removed from Team 1");
    } else {
      setTeam2(team2.filter(p => p.id !== playerId));
      toast.info("Player removed from Team 2");
    }
  };

  const handleAddGhostPlayer = (team: number) => {
    if (!searchValue.trim()) {
      toast.error("Please enter a player name");
      return;
    }

    const ghostPlayer: Player = {
      id: `ghost-${Date.now()}`,
      name: searchValue,
    };
    handleAddPlayer(team, ghostPlayer);
  };

  useEffect(() => {
    // Notify parent component whenever teams change
    onTeamsConfirmed({ team1, team2 });
  }, [team1, team2, onTeamsConfirmed]);

  const selectedPlayers = [...team1, ...team2];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Switch
          id="match-type"
          checked={isDoubles}
          onCheckedChange={setIsDoubles}
        />
        <Label htmlFor="match-type">Doubles Match</Label>
      </div>

      <div className="relative">
        <PlayerSearch
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onAddPlayer={handleAddPlayer}
          onAddGhostPlayer={handleAddGhostPlayer}
          team1Count={team1.length}
          team2Count={team2.length}
          maxPlayersPerTeam={maxPlayersPerTeam}
          selectedPlayers={selectedPlayers}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamDisplay
          team={team1}
          teamNumber={1}
          maxPlayers={maxPlayersPerTeam}
          onRemovePlayer={handleRemovePlayer}
          isDoubles={isDoubles}
        />
        <TeamDisplay
          team={team2}
          teamNumber={2}
          maxPlayers={maxPlayersPerTeam}
          onRemovePlayer={handleRemovePlayer}
          isDoubles={isDoubles}
        />
      </div>
    </div>
  );
};
