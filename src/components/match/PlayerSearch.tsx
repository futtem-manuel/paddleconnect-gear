import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [connections, setConnections] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
            )
          `)
          .eq('user_id', user.id)
          .eq('status', 'accepted');

        if (error) throw error;

        const formattedConnections = connectionsData
          .map(conn => ({
            id: conn.connected_user.id,
            name: conn.connected_user.full_name || 'Unknown Player',
            avatar_url: conn.connected_user.avatar_url
          }))
          .filter(conn => !selectedPlayers.some(p => p.id === conn.id));

        setConnections(formattedConnections);
      } catch (error) {
        console.error('Error fetching connections:', error);
        toast.error(t('errors.fetchConnections'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnections();
  }, [selectedPlayers, t]);

  const filteredConnections = connections.filter(player =>
    player.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput 
        placeholder={t('recordMatch.searchPlayers')} 
        value={searchValue}
        onValueChange={onSearchChange}
      />
      <CommandList>
        <CommandEmpty className="p-4">
          <div className="space-y-3">
            {team1Count < maxPlayersPerTeam && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onAddGhostPlayer(1)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {t('recordMatch.addToTeam', { 
                  name: searchValue || t('recordMatch.unknownPlayer'),
                  team: '1'
                })}
              </Button>
            )}
            {team2Count < maxPlayersPerTeam && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onAddGhostPlayer(2)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {t('recordMatch.addToTeam', { 
                  name: searchValue || t('recordMatch.unknownPlayer'),
                  team: '2'
                })}
              </Button>
            )}
          </div>
        </CommandEmpty>

        {filteredConnections.length > 0 && (
          <CommandGroup heading={
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4" />
              {t('recordMatch.connections')}
            </div>
          }>
            {filteredConnections.map((player) => (
              <CommandItem
                key={player.id}
                value={player.name}
                className="flex items-center gap-2 p-2 cursor-pointer"
                onSelect={() => {
                  if (team1Count < maxPlayersPerTeam) {
                    onAddPlayer(1, player);
                  } else if (team2Count < maxPlayersPerTeam) {
                    onAddPlayer(2, player);
                  }
                  onSearchChange('');
                }}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={player.avatar_url} />
                  <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{player.name}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {team1Count < maxPlayersPerTeam ? (
                    t('recordMatch.addToTeam1')
                  ) : team2Count < maxPlayersPerTeam ? (
                    t('recordMatch.addToTeam2')
                  ) : null}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};