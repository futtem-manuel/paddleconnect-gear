import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trophy, Users, MapPin, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { eloToDisplayRating } from "@/utils/rankingUtils";
import { PerformanceCharts } from "@/components/dashboard/PerformanceCharts";
import { PlayerConnections } from "@/components/dashboard/PlayerConnections";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const userProfile = {
    name: "John Doe",
    eloRating: 1200,
    matches: 15,
    winRate: "60%",
    avatar: "",
    location: "San Francisco, CA",
  };

  const playerConnections = [
    { id: "1", name: "Alice Smith", avatar: "" },
    { id: "2", name: "Bob Johnson", avatar: "" },
    { id: "3", name: "Carol White", avatar: "" },
  ];

  const nearbyVenues = [
    { id: 1, name: "City Padel Club", distance: "0.8 miles", rating: 4.5, googleUrl: "https://maps.google.com/?q=City+Padel+Club" },
    { id: "2", name: "Bay Area Padel Center", distance: "1.2 miles", rating: 4.8, googleUrl: "https://maps.google.com/?q=Bay+Area+Padel+Center" },
    { id: "3", name: "Golden Gate Padel", distance: "2.1 miles", rating: 4.3, googleUrl: "https://maps.google.com/?q=Golden+Gate+Padel" },
  ];

  const performanceData = [
    { date: "Jan", rating: 5.2 },
    { date: "Feb", rating: 5.4 },
    { date: "Mar", rating: 5.3 },
    { date: "Apr", rating: 5.6 },
    { date: "May", rating: 5.8 },
  ];

  const winLossData = {
    wins: 9,
    losses: 6,
  };

  const displayRating = eloToDisplayRating(userProfile.eloRating);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <Card className="neu-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="bg-muted">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
                  <p className="text-muted-foreground">Rating: {displayRating.toFixed(1)}</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{userProfile.location}</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="neu-button w-full md:w-auto"
                onClick={() => navigate("/edit-profile")}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 neu-card flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Matches Played</p>
                    <p className="text-xl font-semibold">{userProfile.matches}</p>
                  </div>
                </div>
                <div className="p-4 neu-card flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                    <p className="text-xl font-semibold">{userProfile.winRate}</p>
                  </div>
                </div>
                <div className="p-4 neu-card">
                  <PlayerConnections connections={playerConnections} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  className="h-auto py-4"
                  variant="default"
                  onClick={() => navigate("/record-match")}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Record New Match
                </Button>
                <Button 
                  className="neu-button h-auto py-4"
                  variant="outline"
                  onClick={() => navigate("/find-players")}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Find Players
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <PerformanceCharts 
          performanceData={performanceData}
          winLossData={winLossData}
        />

        <Card className="neu-card">
          <CardHeader>
            <CardTitle>Nearby Padel Venues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 neu-card gap-2"
                >
                  <div>
                    <h3 className="font-semibold">{venue.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {venue.distance} away
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">⭐ {venue.rating}</span>
                    <a
                      href={venue.googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on Google
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <footer className="text-center text-sm text-muted-foreground py-4">
          App powered by Futtem LLC
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
