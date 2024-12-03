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

interface PlayerSearchProps {
  onSelect: (player: { id: string; name: string; avatar_url?: string }) => void;
  selectedPlayers: Array<{ id: string; name: string }>;
  placeholder?: string;
  className?: string;
}

export const PlayerSearch = ({
  onSelect,
  selectedPlayers,
  placeholder = "Search players...",
  className,
}: PlayerSearchProps) => {
  const [open, setOpen] = useState(false);
  const [connections, setConnections] = useState<Array<{
    id: string;
    name: string;
    avatar_url?: string;
  }>>([]);
  const [searchValue, setSearchValue] = useState("");

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
          .or(`and(user_id.eq.${user.id},connected_user_id.neq.${user.id}),and(connected_user_id.eq.${user.id},user_id.neq.${user.id})`);

        if (error) {
          console.error('Error fetching connections:', error);
          return;
        }

        // Process connections to get a flat list of connected players
        const formattedConnections = connectionsData.map(conn => {
          // If the current user is the initiator, return the connected user's details
          // Otherwise, return the initiator's details
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

  const handleSelect = (player: { id: string; name: string; avatar_url?: string }) => {
    onSelect(player);
    setOpen(false);
    setSearchValue("");
  };

  const handleAddVacantPlayer = () => {
    if (!searchValue.trim()) return;
    
    const newPlayer = {
      id: `vacant-${Date.now()}`,
      name: searchValue.trim(),
    };
    
    handleSelect(newPlayer);
  };

  return (
    <Command className={cn("relative rounded-lg border max-w-lg", className)}>
      <div className="flex items-center border-b px-3">
        <CommandInput
          placeholder={placeholder}
          value={searchValue}
          onValueChange={setSearchValue}
        />
      </div>
      <CommandList>
        <CommandEmpty className="py-3 text-center text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">No players found.</p>
            {searchValue && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddVacantPlayer}
                className="mx-auto"
              >
                Add "{searchValue}" as player
              </Button>
            )}
          </div>
        </CommandEmpty>
        <CommandGroup>
          {filteredPlayers.map((player) => (
            <CommandItem
              key={player.id}
              onSelect={() => handleSelect(player)}
              className="flex items-center gap-2 px-4 py-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={player.avatar_url} />
                <AvatarFallback>
                  {player.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{player.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};