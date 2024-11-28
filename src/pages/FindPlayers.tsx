import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { eloToDisplayRating } from "@/utils/rankingUtils";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Slider } from "@/components/ui/slider";

// Mock data - would be replaced with API call
const mockPlayers = [
  { id: 1, name: "Sarah Johnson", eloRating: 1350, avatar: "", location: "San Francisco", matchesPlayed: 25 },
  { id: 2, name: "Mike Chen", eloRating: 1275, avatar: "", location: "Los Angeles", matchesPlayed: 18 },
  { id: 3, name: "Ana Silva", eloRating: 1420, avatar: "", location: "San Diego", matchesPlayed: 32 },
];

const FindPlayers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [ratingRange, setRatingRange] = useState([0, 7]);

  const filteredPlayers = mockPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = eloToDisplayRating(player.eloRating) >= ratingRange[0] && 
      eloToDisplayRating(player.eloRating) <= ratingRange[1];
    return matchesSearch && matchesRating;
  });

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
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                selectProps={{
                  value: selectedLocation,
                  onChange: setSelectedLocation,
                  placeholder: 'Search for a location...',
                  className: 'w-full'
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Rating Range</label>
              <Slider
                defaultValue={[0, 7]}
                max={7}
                min={0}
                step={0.5}
                value={ratingRange}
                onValueChange={setRatingRange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{ratingRange[0]}</span>
                <span>{ratingRange[1]}</span>
              </div>
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