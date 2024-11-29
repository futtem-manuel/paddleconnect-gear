import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [locationFilter, setLocationFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all"); // Changed from empty string to "all"
  const [sortBy, setSortBy] = useState("rating");
  
  const players = [
    { id: 1, name: "John Doe", rating: 5.5, avatar: "", wins: 20, losses: 5, location: "New York" },
    { id: 2, name: "Alice Smith", rating: 4.5, avatar: "", wins: 18, losses: 7, location: "Los Angeles" },
    { id: 3, name: "Bob Johnson", rating: 3.5, avatar: "", wins: 15, losses: 8, location: "Chicago" },
  ];

  const filteredPlayers = players
    .filter(player => 
      (!locationFilter || player.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
      (ratingFilter === "all" || player.rating === parseFloat(ratingFilter))
    )
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      const aWinRate = a.wins / (a.wins + a.losses);
      const bWinRate = b.wins / (b.wins + b.losses);
      return bWinRate - aWinRate;
    });

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            className="neu-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <img
            src="/lovable-uploads/ce205f00-8e5a-4ed2-9756-417964ef47e6.png"
            alt="Logo"
            className="h-12"
          />
        </div>

        <Card className="neu-card">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  placeholder="Filter by location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Rating</label>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    {[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating.toFixed(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="winRate">Win Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 neu-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold w-8">{index + 1}</span>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>
                        {player.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>{player.wins}W - {player.losses}L</span>
                        <span>•</span>
                        <span>{player.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{player.rating.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;