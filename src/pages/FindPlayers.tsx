import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PlayerSearchFilters } from "@/components/players/PlayerSearchFilters";
import { PlayerCard } from "@/components/players/PlayerCard";
import { PlayerDialog } from "@/components/players/PlayerDialog";
import { eloToDisplayRating } from "@/utils/rankingUtils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FindPlayers = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [ratingRange, setRatingRange] = useState([1, 7]);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [isDragging, setIsDragging] = useState({ min: false, max: false });
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) {
        console.error('Error fetching players:', error);
        toast.error(t('errors.fetchPlayers'));
        return;
      }

      setPlayers(profiles || []);
    };

    fetchPlayers();
  }, [t]);

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const playerRating = eloToDisplayRating(player.rating || 1200);
    const matchesRating = playerRating >= ratingRange[0] && playerRating <= ratingRange[1];
    return matchesSearch && matchesRating;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="flex justify-center mb-8">
          <img
            src="/lovable-uploads/fd2b445d-f8f6-4612-8dc4-42911f72395b.png"
            alt="PaddleRank Logo"
            className="h-12 md:h-16 object-contain"
          />
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t('players.findPlayers')}</CardTitle>
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
              player={{
                id: player.id,
                name: player.full_name || 'Unknown Player',
                eloRating: player.rating || 1200,
                avatar: player.avatar_url || '',
                location: player.location || 'Unknown Location',
                matchesPlayed: 0 // TODO: Add matches count
              }}
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