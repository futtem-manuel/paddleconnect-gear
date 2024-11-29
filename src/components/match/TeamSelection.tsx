import { useState, useEffect } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

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
      setTeam1([...team1, player]);
    } else if (team === 2 && team2.length < maxPlayersPerTeam) {
      setTeam2([...team2, player]);
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
    toast.success(`Added ${ghostPlayer.name} to Team ${team}`);
  };

  const filteredPlayers = searchValue
    ? connections.filter(player =>
        player.name.toLowerCase().includes(searchValue.toLowerCase())
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
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search players or enter new name..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>
              <div className="p-4 space-y-3">
                {team1.length < maxPlayersPerTeam && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleAddGhostPlayer(1)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add "{searchValue || 'Unknown Player'}" to Team 1
                  </Button>
                )}
                {team2.length < maxPlayersPerTeam && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleAddGhostPlayer(2)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add "{searchValue || 'Unknown Player'}" to Team 2
                  </Button>
                )}
              </div>
            </CommandEmpty>
            {filteredPlayers.length > 0 && (
              <CommandGroup>
                {filteredPlayers.map((player) => (
                  <CommandItem
                    key={player.id}
                    value={player.name}
                    className="flex items-center gap-2 p-2"
                    onSelect={() => {
                      if (team1.length < maxPlayersPerTeam) {
                        handleAddPlayer(1, player);
                      } else if (team2.length < maxPlayersPerTeam) {
                        handleAddPlayer(2, player);
                      }
                    }}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatar_url} />
                      <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {player.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 p-4 rounded-lg border-2 border-primary bg-primary/5">
          <h4 className="font-medium text-primary">Team 1</h4>
          <div className="space-y-2">
            {team1.map((player) => (
              <div key={player.id} className="flex items-center justify-between p-3 rounded-md bg-white border shadow-sm">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={player.avatar_url} />
                    <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{player.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePlayer(1, player.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {team1.length < maxPlayersPerTeam && (
              <div className="p-3 rounded-md border border-dashed text-center text-muted-foreground">
                {isDoubles ? "Add another player" : "Add player"}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 p-4 rounded-lg border-2 border-secondary bg-secondary/5">
          <h4 className="font-medium text-secondary">Team 2</h4>
          <div className="space-y-2">
            {team2.map((player) => (
              <div key={player.id} className="flex items-center justify-between p-3 rounded-md bg-white border shadow-sm">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={player.avatar_url} />
                    <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{player.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePlayer(2, player.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {team2.length < maxPlayersPerTeam && (
              <div className="p-3 rounded-md border border-dashed text-center text-muted-foreground">
                {isDoubles ? "Add another player" : "Add player"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};