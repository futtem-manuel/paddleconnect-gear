import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { PlayerSearchHeader } from "@/components/players/PlayerSearchHeader";
import { PlayerSearchFilters } from "@/components/players/PlayerSearchFilters";
import { PlayerCard } from "@/components/players/PlayerCard";
import { PlayerDialog } from "@/components/players/PlayerDialog";
import { eloToDisplayRating } from "@/utils/rankingUtils";

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
  const [isDragging, setIsDragging] = useState({ min: false, max: false });

  const filteredPlayers = mockPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.location.toLowerCase().includes(searchQuery.toLowerCase());
    const playerRating = eloToDisplayRating(player.eloRating);
    const matchesRating = playerRating >= ratingRange[0] && playerRating <= ratingRange[1];
    return matchesSearch && matchesRating;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <PlayerSearchHeader />

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Find Players</CardTitle>
          </CardHeader>
          <CardContent>
            <PlayerSearchFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              ratingRange={ratingRange}
              setRatingRange={setRatingRange}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
            />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onPlayerClick={() => setSelectedPlayer(player)}
            />
          ))}
        </div>

        <PlayerDialog
          player={selectedPlayer}
          isOpen={!!selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      </div>
    </div>
  );
};

export default FindPlayers;
