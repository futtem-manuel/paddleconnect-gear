import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlayerConnection {
  id: string;
  name: string;
  avatar?: string;
}

interface PlayerConnectionsProps {
  connections: PlayerConnection[];
}

export const PlayerConnections = ({ connections }: PlayerConnectionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {connections.slice(0, 3).map((connection) => (
          <Avatar key={connection.id} className="border-2 border-background">
            <AvatarImage src={connection.avatar} alt={connection.name} />
            <AvatarFallback>{connection.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full h-10 w-10"
        onClick={() => navigate("/connections")}
      >
        <Users className="h-4 w-4" />
      </Button>
    </div>
  );
};