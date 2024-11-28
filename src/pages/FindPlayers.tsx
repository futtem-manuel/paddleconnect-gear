import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { eloToDisplayRating } from "@/utils/rankingUtils";

// Mock data - would be replaced with API call
const mockPlayers = [
  { id: 1, name: "Sarah Johnson", eloRating: 1350, avatar: "", location: "San Francisco", matchesPlayed: 25 },
  { id: 2, name: "Mike Chen", eloRating: 1275, avatar: "", location: "Los Angeles", matchesPlayed: 18 },
  { id: 3, name: "Ana Silva", eloRating: 1420, avatar: "", location: "San Diego", matchesPlayed: 32 },
];

const FindPlayers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlayers = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = (playerName: string) => {
    toast.success("Connection request sent!", {
      description: `A request has been sent to ${playerName}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Find Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredPlayers.map((player) => (
            <Card key={player.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>
                        {player.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{player.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {player.location} • Rating: {eloToDisplayRating(player.eloRating).toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{player.matchesPlayed}</p>
                      <p className="text-xs text-muted-foreground">Matches</p>
                    </div>
                    <Button onClick={() => handleConnect(player.name)}>
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindPlayers;