import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { eloToDisplayRating } from "@/utils/rankingUtils";
import { PerformanceCharts } from "@/components/dashboard/PerformanceCharts";
import { RecentMatches } from "@/components/dashboard/RecentMatches";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { VenuesList } from "@/components/dashboard/VenuesList";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
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
        <DashboardHeader 
          userProfile={userProfile}
          displayRating={displayRating}
          playerConnections={playerConnections}
        />

        <RecentMatches matches={recentMatches} />

        <PerformanceCharts 
          performanceData={performanceData}
          winLossData={winLossData}
        />

        <VenuesList venues={nearbyVenues} />

        <div className="flex flex-col items-center space-y-4">
          <Button
            variant="default"
            className="w-full max-w-md"
            onClick={() => navigate("/rules")}
          >
            <Book className="h-4 w-4 mr-2" />
            {t('dashboard.viewRules')}
          </Button>
          
          <footer className="text-center text-sm text-muted-foreground py-4">
            {t('dashboard.poweredBy')}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;