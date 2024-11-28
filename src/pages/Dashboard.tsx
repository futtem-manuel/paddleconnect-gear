import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trophy, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Placeholder data - would normally come from an API
  const userProfile = {
    name: "John Doe",
    rating: 1200,
    matches: 15,
    winRate: "60%",
    avatar: "",
  };

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
              <div>
                <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
                <p className="text-muted-foreground">Rating: {userProfile.rating}</p>
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
          >
            <Users className="h-5 w-5" />
            Find Players
          </Button>
        </div>

        {/* Recent Matches */}
        <Card className="neu-card">
          <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder for matches list */}
              <p className="text-muted-foreground text-center py-8">
                No matches recorded yet. Start by recording your first match!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;