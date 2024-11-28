import { Card, CardContent } from "@/components/ui/card";
import { PlayerConnectionCard } from "@/components/connections/PlayerConnectionCard";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <h1 className="text-2xl font-bold">My Connections</h1>
          </div>
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            {mockConnections.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No connections yet. Start connecting with other players!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockConnections.map((connection) => (
                  <PlayerConnectionCard key={connection.id} connection={connection} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Connections;