import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const navigate = useNavigate();
  
  const players = [
    { id: 1, name: "John Doe", rating: 1500, avatar: "", wins: 20, losses: 5 },
    { id: 2, name: "Alice Smith", rating: 1450, avatar: "", wins: 18, losses: 7 },
    { id: 3, name: "Bob Johnson", rating: 1400, avatar: "", wins: 15, losses: 8 },
    // Add more players as needed
  ];

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
            <div className="space-y-4">
              {players.map((player, index) => (
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
                      <p className="text-sm text-muted-foreground">
                        {player.wins}W - {player.losses}L
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{player.rating}</p>
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