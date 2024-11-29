import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Player {
  id: string;
  name: string;
  avatar_url?: string;
}

interface PlayerSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filteredPlayers: Player[];
  onAddPlayer: (team: number, player: Player) => void;
  onAddGhostPlayer: (team: number) => void;
  team1Count: number;
  team2Count: number;
  maxPlayersPerTeam: number;
}

export const PlayerSearch = ({
  searchValue,
  onSearchChange,
  filteredPlayers,
  onAddPlayer,
  onAddGhostPlayer,
  team1Count,
  team2Count,
  maxPlayersPerTeam,
}: PlayerSearchProps) => {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput 
        placeholder="Search players or enter new name..." 
        value={searchValue}
        onValueChange={onSearchChange}
      />
      <CommandList>
        <CommandEmpty>
          <div className="p-4 space-y-3">
            {team1Count < maxPlayersPerTeam && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onAddGhostPlayer(1)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add "{searchValue || 'Unknown Player'}" to Team 1
              </Button>
            )}
            {team2Count < maxPlayersPerTeam && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onAddGhostPlayer(2)}
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
                  if (team1Count < maxPlayersPerTeam) {
                    onAddPlayer(1, player);
                  } else if (team2Count < maxPlayersPerTeam) {
                    onAddPlayer(2, player);
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
  );
};