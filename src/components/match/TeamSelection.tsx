import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";

interface Player {
  id: string;
  name: string;
  avatar?: string;
}

interface TeamSelectionProps {
  connectedPlayers: Player[];
  onTeamsConfirmed: (team1: Player[], team2: Player[]) => void;
}

export const TeamSelection = ({ connectedPlayers, onTeamsConfirmed }: TeamSelectionProps) => {
  const [team1, setTeam1] = useState<Player[]>([]);
  const [team2, setTeam2] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceTeam = result.source.droppableId === "team1" ? team1 : team2;
    const destTeam = result.destination.droppableId === "team1" ? team1 : team2;
    
    const [removed] = sourceTeam.splice(result.source.index, 1);
    destTeam.splice(result.destination.index, 0, removed);

    if (result.destination.droppableId === "team1") {
      setTeam1([...team1]);
    } else {
      setTeam2([...team2]);
    }
  };

  const addPlayerToTeam = (player: Player, teamNumber: 1 | 2) => {
    if (teamNumber === 1 && team1.length < 2) {
      setTeam1([...team1, player]);
    } else if (teamNumber === 2 && team2.length < 2) {
      setTeam2([...team2, player]);
    }
  };

  const filteredPlayers = connectedPlayers.filter(
    player => player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Command className="rounded-lg border shadow-md">
        <CommandInput 
          placeholder="Search players..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandEmpty>No players found.</CommandEmpty>
        <CommandGroup>
          {filteredPlayers.map((player) => (
            <CommandItem
              key={player.id}
              onSelect={() => {
                if (team1.length < 2) {
                  addPlayerToTeam(player, 1);
                } else if (team2.length < 2) {
                  addPlayerToTeam(player, 2);
                }
              }}
            >
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={player.avatar} />
                <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span>{player.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 gap-4">
          <Droppable droppableId="team1">
            {(provided) => (
              <Card className="p-4" {...provided.droppableProps} ref={provided.innerRef}>
                <h3 className="font-semibold mb-2">Team 1</h3>
                {team1.map((player, index) => (
                  <Draggable key={player.id} draggableId={player.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center p-2 mb-2 bg-background rounded-md"
                      >
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span>{player.name}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>

          <Droppable droppableId="team2">
            {(provided) => (
              <Card className="p-4" {...provided.droppableProps} ref={provided.innerRef}>
                <h3 className="font-semibold mb-2">Team 2</h3>
                {team2.map((player, index) => (
                  <Draggable key={player.id} draggableId={player.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center p-2 mb-2 bg-background rounded-md"
                      >
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span>{player.name}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};