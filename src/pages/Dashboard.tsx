import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trophy, Users, MapPin, ExternalLink, Edit, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { eloToDisplayRating } from "@/utils/rankingUtils";
import { PerformanceCharts } from "@/components/dashboard/PerformanceCharts";
import { PlayerConnections } from "@/components/dashboard/PlayerConnections";

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

const recentMatches = [
  {
    id: "1",
    date: "2024-02-20",
    venue: "City Padel Club",
    result: "Won",
    score: "6-4, 6-3",
    opponent: "Alice Smith"
  },
  {
    id: "2",
    date: "2024-02-18",
    venue: "Bay Area Padel Center",
    result: "Lost",
    score: "4-6, 6-7",
    opponent: "Bob Johnson"
  },
  {
    id: "3",
    date: "2024-02-15",
    venue: "Golden Gate Padel",
    result: "Won",
    score: "6-2, 6-4",
    opponent: "Carol White"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 neu-card flex items-center gap-3 col-span-1">
                  <Trophy className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Matches Played</p>
                    <p className="text-xl font-semibold">{userProfile.matches}</p>
                  </div>
                </div>
                <div className="p-4 neu-card flex items-center gap-3 col-span-1">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                    <p className="text-xl font-semibold">{userProfile.winRate}</p>
                  </div>
                </div>
                <div className="p-4 neu-card bg-primary/5 border-2 border-primary col-span-1 sm:h-32">
                  <h3 className="font-medium mb-2 text-primary">Connected Players</h3>
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

        <Card className="neu-card">
          <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => navigate(`/match/${match.id}`)}
                  className="p-4 neu-card hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">vs {match.opponent}</p>
                      <p className="text-sm text-muted-foreground">{match.venue}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${match.result === 'Won' ? 'text-green-500' : 'text-red-500'}`}>
                        {match.result}
                      </p>
                      <p className="text-sm text-muted-foreground">{match.score}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{match.date}</p>
                </div>
              ))}
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

        <div className="flex flex-col items-center space-y-4">
          <Button
            variant="outline"
            className="w-full max-w-md"
            onClick={() => navigate("/rules")}
          >
            <Book className="h-4 w-4 mr-2" />
            View Official Rules
          </Button>
          
          <footer className="text-center text-sm text-muted-foreground py-4">
            App powered by Futtem LLC
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
