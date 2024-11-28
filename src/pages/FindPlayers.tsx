import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { eloToDisplayRating } from "@/utils/rankingUtils";
import { Slider } from "@/components/ui/slider";
import { LoadScript } from "@react-google-maps/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data - would be replaced with API call
const mockPlayers = [
  { id: 1, name: "Sarah Johnson", eloRating: 1350, avatar: "", location: "San Francisco", matchesPlayed: 25, bio: "Competitive player with 5 years of experience" },
  { id: 2, name: "Mike Chen", eloRating: 1275, avatar: "", location: "Los Angeles", matchesPlayed: 18, bio: "Casual player looking for friendly matches" },
  { id: 3, name: "Ana Silva", eloRating: 1420, avatar: "", location: "San Diego", matchesPlayed: 32, bio: "Tournament player since 2020" },
];

const FindPlayers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [ratingRange, setRatingRange] = useState([1, 7]);
  const [selectedPlayer, setSelectedPlayer] = useState<typeof mockPlayers[0] | null>(null);

  const filteredPlayers = mockPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.location.toLowerCase().includes(searchQuery.toLowerCase());
    const playerRating = eloToDisplayRating(player.eloRating);
    const matchesRating = playerRating >= ratingRange[0] && playerRating <= ratingRange[1];
    return matchesSearch && matchesRating;
  });

  const handleConnect = (playerName: string) => {
    toast.success("Connection request sent!", {
      description: `A request has been sent to ${playerName}.`,
    });
  };

  const handleLocationSelect = (address: string) => {
    setSelectedLocation(address);
  };

  const handlePlayerClick = (player: typeof mockPlayers[0]) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Find Players</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                type="text"
                placeholder="Enter location..."
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Rating Range</label>
                <span className="text-sm text-muted-foreground">
                  {ratingRange[0].toFixed(1)} - {ratingRange[1].toFixed(1)}
                </span>
              </div>
              <Slider
                defaultValue={[1, 7]}
                max={7}
                min={1}
                step={0.5}
                value={ratingRange}
                onValueChange={setRatingRange}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredPlayers.map((player) => (
            <Card 
              key={player.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handlePlayerClick(player)}
            >
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
                    <Button onClick={(e) => {
                      e.stopPropagation();
                      handleConnect(player.name);
                    }}>
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Player Profile</DialogTitle>
            </DialogHeader>
            {selectedPlayer && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                    alt={selectedPlayer.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedPlayer.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPlayer.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Rating</p>
                    <p className="text-2xl font-bold">{eloToDisplayRating(selectedPlayer.eloRating).toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Matches Played</p>
                    <p>{selectedPlayer.matchesPlayed}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Bio</p>
                    <p className="text-sm text-muted-foreground">{selectedPlayer.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FindPlayers;