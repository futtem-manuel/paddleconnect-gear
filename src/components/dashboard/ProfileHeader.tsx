import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileHeaderProps {
  userProfile: {
    name: string;
    eloRating: number;
    matches: number;
    winRate: string;
    avatar: string;
    location: string;
  };
  displayRating: number;
}

export const ProfileHeader = ({ userProfile, displayRating }: ProfileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
          <AvatarFallback className="bg-muted">
            {userProfile.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
          <p className="text-muted-foreground">Rating: {displayRating.toFixed(1)}</p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{userProfile.location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="outline" 
          className="neu-button w-full sm:w-auto"
          onClick={() => navigate("/profile-settings")}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
        <Button 
          variant="default"
          className="w-full sm:w-auto"
          onClick={() => navigate("/leaderboard")}
        >
          <Trophy className="h-4 w-4 mr-2" />
          Leaderboard
        </Button>
      </div>
    </div>
  );
};
