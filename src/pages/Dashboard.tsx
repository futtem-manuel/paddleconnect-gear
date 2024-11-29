import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, Book, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { eloToDisplayRating } from "@/utils/rankingUtils";
import { PerformanceCharts } from "@/components/dashboard/PerformanceCharts";
import { PlayerConnections } from "@/components/dashboard/PlayerConnections";
import { RecentMatches } from "@/components/dashboard/RecentMatches";
import { ProfileHeader } from "@/components/dashboard/ProfileHeader";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const userProfile = {
    name: "Sarah Johnson",
    eloRating: 1450,
    matches: 28,
    winRate: "64%",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400",
    location: "San Francisco, CA",
  };

  const playerConnections = [
    { 
      id: "1", 
      name: "Michael Chen", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" 
    },
    { 
      id: "2", 
      name: "Emma Rodriguez", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" 
    },
    { 
      id: "3", 
      name: "David Kim", 
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" 
    },
  ];

  const nearbyVenues = [
    { 
      id: 1, 
      name: "Golden Gate Padel Club", 
      distance: "0.8 miles", 
      rating: 4.8, 
      googleUrl: "https://maps.google.com/?q=Golden+Gate+Padel+Club" 
    },
    { 
      id: "2", 
      name: "Mission Bay Sports Center", 
      distance: "1.2 miles", 
      rating: 4.6, 
      googleUrl: "https://maps.google.com/?q=Mission+Bay+Sports+Center" 
    },
    { 
      id: "3", 
      name: "SoMa Padel Courts", 
      distance: "2.1 miles", 
      rating: 4.5, 
      googleUrl: "https://maps.google.com/?q=SoMa+Padel+Courts" 
    },
  ];

  const recentMatches = [
    {
      id: "1",
      date: "Today",
      venue: "Golden Gate Padel Club",
      result: "Won",
      score: "6-4, 7-5",
      opponent: "Michael Chen",
      opponentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    },
    {
      id: "2",
      date: "Yesterday",
      venue: "Mission Bay Sports Center",
      result: "Won",
      score: "6-3, 6-2",
      opponent: "Emma Rodriguez",
      opponentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    },
    {
      id: "3",
      date: "2 days ago",
      venue: "SoMa Padel Courts",
      result: "Lost",
      score: "4-6, 5-7",
      opponent: "David Kim",
      opponentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
    }
  ];

  const performanceData = [
    { date: "Jan", rating: 3.8 },
    { date: "Feb", rating: 4.0 },
    { date: "Mar", rating: 4.2 },
    { date: "Apr", rating: 3.9 },
    { date: "May", rating: 4.3 },
    { date: "Jun", rating: 4.5 },
    { date: "Jul", rating: 4.7 }
  ];

  const winLossData = {
    wins: 18,
    losses: 10
  };

  const displayRating = eloToDisplayRating(userProfile.eloRating);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <Card className="neu-card">
          <CardHeader>
            <ProfileHeader userProfile={userProfile} displayRating={displayRating} />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 neu-card flex items-center gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Matches Played</p>
                    <p className="text-xl font-semibold">{userProfile.matches}</p>
                  </div>
                </div>
                <div className="p-4 neu-card flex items-center gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                    <p className="text-xl font-semibold">{userProfile.winRate}</p>
                  </div>
                </div>
                <div className="p-4 neu-card bg-primary/5 border-2 border-primary sm:col-span-2">
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

        <RecentMatches matches={recentMatches} />

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
            variant="default"
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