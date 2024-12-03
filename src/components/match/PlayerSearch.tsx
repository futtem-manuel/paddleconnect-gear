import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Player {
  id: string;
  name: string;
  avatar_url?: string;
}

interface PlayerSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddPlayer: (team: number, player: Player) => void;
  onAddGhostPlayer: (team: number) => void;
  team1Count: number;
  team2Count: number;
  maxPlayersPerTeam: number;
  selectedPlayers: Player[];
}

export const PlayerSearch = ({
  searchValue,
  onSearchChange,
  onAddPlayer,
  onAddGhostPlayer,
  team1Count,
  team2Count,
  maxPlayersPerTeam,
  selectedPlayers,
}: PlayerSearchProps) => {
  const [open, setOpen] = useState(false);
  const [connections, setConnections] = useState<Player[]>([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: connectionsData, error } = await supabase
          .from('connections')
          .select(`
            connected_user:profiles!connections_connected_user_id_fkey(
              id,
              full_name,
              avatar_url
            ),
            user:profiles!connections_user_id_fkey(
              id,
              full_name,
              avatar_url
            )
          `)
          .in('status', ['accepted'])
          .or(`user_id.eq.${user.id},connected_user_id.eq.${user.id}`);

        if (error) {
          console.error('Error fetching connections:', error);
          return;
        }

        // Process connections to get a flat list of connected players
        const formattedConnections = connectionsData.map(conn => {
          const connectedPlayer = conn.user.id === user.id ? conn.connected_user : conn.user;
          return {
            id: connectedPlayer.id,
            name: connectedPlayer.full_name || 'Unknown Player',
            avatar_url: connectedPlayer.avatar_url
          };
        }).filter(conn => !selectedPlayers.some(p => p.id === conn.id));

        setConnections(formattedConnections);
      } catch (error) {
        console.error('Error fetching connections:', error);
        toast.error("Failed to load connections");
      }
    };

    fetchConnections();
  }, [selectedPlayers]);

  const filteredPlayers = connections.filter(
    (player) =>
      player.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      !selectedPlayers.some((p) => p.id === player.id)
  );

  return (
    <Command className="relative rounded-lg border max-w-lg">
      <div className="flex items-center border-b px-3">
        <CommandInput
          placeholder="Search players..."
          value={searchValue}
          onValueChange={onSearchChange}
        />
      </div>
      <CommandList>
        <CommandEmpty className="py-3 text-center text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">No players found.</p>
            {searchValue && (
              <div className="flex gap-2 justify-center">
                {team1Count < maxPlayersPerTeam && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddGhostPlayer(1)}
                  >
                    Add to Team 1
                  </Button>
                )}
                {team2Count < maxPlayersPerTeam && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddGhostPlayer(2)}
                  >
                    Add to Team 2
                  </Button>
                )}
              </div>
            )}
          </div>
        </CommandEmpty>
        <CommandGroup>
          {filteredPlayers.map((player) => (
            <CommandItem
              key={player.id}
              className="flex items-center gap-2 px-4 py-2"
            >
              <div className="flex-1 flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={player.avatar_url} />
                  <AvatarFallback>
                    {player.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{player.name}</span>
              </div>
              <div className="flex gap-2">
                {team1Count < maxPlayersPerTeam && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddPlayer(1, player)}
                  >
                    Team 1
                  </Button>
                )}
                {team2Count < maxPlayersPerTeam && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddPlayer(2, player)}
                  >
                    Team 2
                  </Button>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};