import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Player {
  id: string;
  name: string;
}

interface TeamSelectionProps {
  onTeamsConfirmed: (teams: { team1: Player[]; team2: Player[] }) => void;
  initialPlayers?: Player[];
}

export const TeamSelection = ({ onTeamsConfirmed, initialPlayers = [] }: TeamSelectionProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddPlayer = (team: number, player: Player) => {
    if (team === 1) {
      setTeam1([...team1, player]);
    } else {
      setTeam2([...team2, player]);
    }
    setSearchValue("");
    setShowSuggestions(false);
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
    ? initialPlayers.filter(player =>
        player.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Command shouldFilter={false} className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search players..." 
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setShowSuggestions(true);
            }}
          />
          {showSuggestions && (
            <CommandList>
              <CommandEmpty>
                <div className="p-2 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleAddGhostPlayer(1)}
                  >
                    Add "{searchValue}" to Team 1
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleAddGhostPlayer(2)}
                  >
                    Add "{searchValue}" to Team 2
                  </Button>
                </div>
              </CommandEmpty>
              {filteredPlayers.length > 0 && (
                <CommandGroup heading="Existing Players">
                  {filteredPlayers.map((player) => (
                    <CommandItem
                      key={player.id}
                      value={player.name}
                      onSelect={() => handleAddPlayer(1, player)}
                    >
                      {player.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          )}
        </Command>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium">Team 1</h4>
          <div className="space-y-2">
            {team1.map((player) => (
              <div key={player.id} className="flex items-center justify-between p-2 rounded-md border">
                <span>{player.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePlayer(1, player.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Team 2</h4>
          <div className="space-y-2">
            {team2.map((player) => (
              <div key={player.id} className="flex items-center justify-between p-2 rounded-md border">
                <span>{player.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePlayer(2, player.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};