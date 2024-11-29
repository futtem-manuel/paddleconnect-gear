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
  const [connections, setConnections] = useState<Player[]>([]);
  const maxPlayersPerTeam = isDoubles ? 2 : 1;

  useEffect(() => {
    const fetchConnections = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: connectionsData, error } = await supabase
        .from('connections')
        .select(`
          connected_user_id,
          connected_user:profiles!connections_connected_user_id_fkey(
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'accepted');

      if (error) {
        console.error('Error fetching connections:', error);
        return;
      }

      const formattedConnections = connectionsData
        .map(conn => ({
          id: conn.connected_user.id,
          name: conn.connected_user.full_name || 'Unknown Player',
          avatar_url: conn.connected_user.avatar_url
        }))
        .filter(conn => conn.name !== 'Unknown Player');

      setConnections(formattedConnections);
    };

    fetchConnections();
  }, []);

  const handleAddPlayer = (team: number, player: Player) => {
    if (team === 1 && team1.length < maxPlayersPerTeam) {
      setTeam1(prev => [...prev, player]);
      toast.success(`Added ${player.name} to Team 1`);
    } else if (team === 2 && team2.length < maxPlayersPerTeam) {
      setTeam2(prev => [...prev, player]);
      toast.success(`Added ${player.name} to Team 2`);
    }
    setSearchValue("");
  };

  const handleRemovePlayer = (team: number, playerId: string) => {
    if (team === 1) {
      setTeam1(team1.filter(p => p.id !== playerId));
    } else {
      setTeam2(team2.filter(p => p.id !== playerId));
    }
  };

  const handleAddGhostPlayer = (team: number) => {
    const ghostPlayer: Player = {
      id: `ghost-${Date.now()}`,
      name: searchValue || "Unknown Player",
    };
    handleAddPlayer(team, ghostPlayer);
  };

  const filteredPlayers = searchValue
    ? connections.filter(player =>
        player.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        !team1.some(p => p.id === player.id) &&
        !team2.some(p => p.id === player.id)
      )
    : connections;

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
          filteredPlayers={filteredPlayers}
          onAddPlayer={handleAddPlayer}
          onAddGhostPlayer={handleAddGhostPlayer}
          team1Count={team1.length}
          team2Count={team2.length}
          maxPlayersPerTeam={maxPlayersPerTeam}
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