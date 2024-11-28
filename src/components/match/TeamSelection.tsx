import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Player {
  id: string;
  name: string;
  avatar?: string;
  isGhost?: boolean;
}

interface TeamSelectionProps {
  connectedPlayers: Player[];
  onTeamsConfirmed: (teams: { team1: Player[]; team2: Player[] }) => void;
}

export const TeamSelection = ({ connectedPlayers, onTeamsConfirmed }: TeamSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [ghostName, setGhostName] = useState("");

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceTeam = result.source.droppableId === "team1" ? team1 : team2;
    const destTeam = result.destination.droppableId === "team1" ? team1 : team2;
    
    const [removed] = sourceTeam.splice(result.source.index, 1);
    destTeam.splice(result.destination.index, 0, removed);

    if (result.source.droppableId === "team1") {
      setTeam1([...team1]);
    } else {
      setTeam2([...team2]);
    }

    if (result.destination.droppableId === "team1") {
      setTeam1([...team1]);
    } else {
      setTeam2([...team2]);
    }
  };

  const handlePlayerSelect = (player: Player) => {
    if (selectedPlayers.length < 4) {
      setSelectedPlayers([...selectedPlayers, player]);
      if (team1.length < 2) {
        setTeam1([...team1, player]);
      } else {
        setTeam2([...team2, player]);
      }
    }
    setSearchQuery("");
    setIsSearching(false);
  };

  const handleAddGhostPlayer = () => {
    if (ghostName.trim() && selectedPlayers.length < 4) {
      const ghostPlayer: Player = {
        id: `ghost-${Date.now()}`,
        name: ghostName.trim(),
        isGhost: true
      };
      handlePlayerSelect(ghostPlayer);
      setGhostName("");
    }
  };

  const removePlayer = (playerId: string, teamNumber: 1 | 2) => {
    const updatedSelectedPlayers = selectedPlayers.filter(p => p.id !== playerId);
    setSelectedPlayers(updatedSelectedPlayers);
    
    if (teamNumber === 1) {
      setTeam1(team1.filter(p => p.id !== playerId));
    } else {
      setTeam2(team2.filter(p => p.id !== playerId));
    }
  };

  const filteredPlayers = connectedPlayers.filter(
    player => 
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedPlayers.some(selected => selected.id === player.id)
  );

  const renderTeam = (teamName: string, players: Player[], droppableId: string, teamNumber: 1 | 2) => (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">{teamName}</h3>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[100px] space-y-2"
          >
            {players.map((player, index) => (
              <Draggable key={player.id} draggableId={player.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center justify-between p-2 bg-background border rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{player.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePlayer(player.id, teamNumber)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search players..."
            value={searchQuery}
            onValueChange={(value) => {
              setSearchQuery(value);
              setIsSearching(!!value);
            }}
            onBlur={() => setTimeout(() => setIsSearching(false), 200)}
          />
          {isSearching && (
            <CommandList>
              <CommandEmpty>
                <div className="p-2">
                  <input
                    type="text"
                    value={ghostName}
                    onChange={(e) => setGhostName(e.target.value)}
                    placeholder="Add as ghost player..."
                    className="w-full p-2 border rounded"
                  />
                  <Button 
                    onClick={handleAddGhostPlayer}
                    className="w-full mt-2"
                  >
                    Add Ghost Player
                  </Button>
                </div>
              </CommandEmpty>
              <CommandGroup heading="Connected Players">
                {filteredPlayers.map((player) => (
                  <CommandItem
                    key={player.id}
                    value={player.name}
                    onSelect={() => handlePlayerSelect(player)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{player.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 gap-4">
          {renderTeam("Team 1", team1, "team1", 1)}
          {renderTeam("Team 2", team2, "team2", 2)}
        </div>
      </DragDropContext>
    </div>
  );
};