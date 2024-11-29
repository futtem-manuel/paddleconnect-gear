import { Card, CardContent } from "@/components/ui/card";
import { PlayerConnectionCard } from "@/components/connections/PlayerConnectionCard";
import { ConnectionDialog } from "@/components/connections/ConnectionDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { PlayerConnection } from "@/components/connections/PlayerConnectionCard";

// This would come from your API/database in a real application
const mockConnections = [
  {
    id: "1",
    name: "Alice Smith",
    avatar: "",
    rating: 4.8,
    matchesPlayed: 25,
    winRate: "65%",
    whatsapp: "+1234567890",
    location: "San Francisco, CA"
  },
  {
    id: "2",
    name: "Bob Johnson",
    avatar: "",
    rating: 4.2,
    matchesPlayed: 18,
    winRate: "58%",
    whatsapp: null,
    location: "Oakland, CA"
  },
  {
    id: "3",
    name: "Carol White",
    avatar: "",
    rating: 4.5,
    matchesPlayed: 30,
    winRate: "70%",
    whatsapp: "+0987654321",
    location: "San Jose, CA"
  }
];

const Connections = () => {
  const [selectedConnection, setSelectedConnection] = useState<PlayerConnection | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConnectionClick = (connection: PlayerConnection) => {
    setSelectedConnection(connection);
    setIsDialogOpen(true);
  };

  const handleWhatsAppAccessChange = (value: boolean) => {
    if (selectedConnection) {
      // In a real app, this would update the backend
      setSelectedConnection({
        ...selectedConnection,
        whatsapp: value ? "+1234567890" : null,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center gap-2 text-lg font-semibold"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-2xl font-bold order-first sm:order-none">My Connections</h1>
          
          <img
            src="/lovable-uploads/fd2b445d-f8f6-4612-8dc4-42911f72395b.png"
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>

        <Card>
          <CardContent className="p-6">
            {mockConnections.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No connections yet. Start connecting with other players!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockConnections.map((connection) => (
                  <PlayerConnectionCard 
                    key={connection.id} 
                    connection={connection}
                    onClick={() => handleConnectionClick(connection)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <ConnectionDialog
          connection={selectedConnection}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onWhatsAppAccessChange={handleWhatsAppAccessChange}
        />
      </div>
    </div>
  );
};

export default Connections;
