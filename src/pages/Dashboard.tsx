import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trophy, Users, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { eloToDisplayRating } from "@/utils/rankingUtils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Placeholder data - would normally come from an API
  const userProfile = {
    name: "John Doe",
    eloRating: 1200,
    matches: 15,
    winRate: "60%",
    avatar: "",
    location: "San Francisco, CA",
  };

  const nearbyVenues = [
    { id: 1, name: "City Padel Club", distance: "0.8 miles", rating: 4.5 },
    { id: 2, name: "Bay Area Padel Center", distance: "1.2 miles", rating: 4.8 },
    { id: 3, name: "Golden Gate Padel", distance: "2.1 miles", rating: 4.3 },
  ];

  // Sample data for the performance chart
  const performanceData = [
    { date: "Jan", rating: 5.2 },
    { date: "Feb", rating: 5.4 },
    { date: "Mar", rating: 5.3 },
    { date: "Apr", rating: 5.6 },
    { date: "May", rating: 5.8 },
  ];

  const displayRating = eloToDisplayRating(userProfile.eloRating);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Section */}
        <Card className="neu-card">
          <CardHeader>
            <div className="flex items-center gap-4">
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
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card className="neu-card">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  line: {
                    theme: {
                      light: "var(--primary)",
                      dark: "var(--primary)",
                    },
                  },
                }}
              >
                <LineChart data={performanceData}>
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 7]} />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                  />
                  <Tooltip content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium">{label}</span>
                            <span className="font-medium">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }} />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Venues */}
        <Card className="neu-card">
          <CardHeader>
            <CardTitle>Nearby Padel Venues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="flex items-center justify-between p-4 neu-card"
                >
                  <div>
                    <h3 className="font-semibold">{venue.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {venue.distance} away
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">⭐ {venue.rating}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // TODO: Implement booking functionality
                      }}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            className="neu-button flex items-center gap-2 h-auto py-4"
            variant="outline"
            onClick={() => navigate("/record-match")}
          >
            <Plus className="h-5 w-5" />
            Record New Match
          </Button>
          <Button 
            className="neu-button flex items-center gap-2 h-auto py-4"
            variant="outline"
            onClick={() => navigate("/find-players")}
          >
            <Users className="h-5 w-5" />
            Find Players
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;