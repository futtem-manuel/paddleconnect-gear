import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  const [isDoubles, setIsDoubles] = useState(true);
  const maxPlayersPerTeam = isDoubles ? 2 : 1;

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
  };

  const filteredPlayers = searchValue
    ? initialPlayers.filter(player =>
        player.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-4">
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
            placeholder="Search players..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>
              <div className="p-2 space-y-2">
                {team1.length < maxPlayersPerTeam && (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleAddGhostPlayer(1)}
                  >
                    Add "{searchValue}" to Team 1
                  </Button>
                )}
                {team2.length < maxPlayersPerTeam && (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleAddGhostPlayer(2)}
                  >
                    Add "{searchValue}" to Team 2
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
                    onSelect={() => handleAddPlayer(1, player)}
                  >
                    {player.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 p-4 rounded-lg border-2 border-primary bg-primary/5">
          <h4 className="font-medium text-primary">Team 1</h4>
          <div className="space-y-2">
            {team1.map((player) => (
              <div key={player.id} className="flex items-center justify-between p-2 rounded-md bg-white border">
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

        <div className="space-y-2 p-4 rounded-lg border-2 border-secondary bg-secondary/5">
          <h4 className="font-medium text-secondary">Team 2</h4>
          <div className="space-y-2">
            {team2.map((player) => (
              <div key={player.id} className="flex items-center justify-between p-2 rounded-md bg-white border">
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