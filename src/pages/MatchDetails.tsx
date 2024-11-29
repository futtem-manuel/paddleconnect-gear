import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MatchSummary } from "@/components/match/MatchSummary";
import { toast } from "sonner";

interface Player {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  rating: number | null;
}

interface Venue {
  id: string;
  name: string;
  location: string | null;
}

interface Match {
  id: string;
  player1_id: string | null;
  player2_id: string | null;
  player1_score: string | null;
  player2_score: string | null;
  venue_id: string | null;
  status: string | null;
  played_at: string | null;
  created_at: string;
  verified_at: string | null;
  verified_by: string | null;
  player1: Player;
  player2: Player;
  venue: Venue;
}

const MatchDetails = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const { data: match, isLoading } = useQuery<Match>({
    queryKey: ["match", matchId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("matches")
        .select(`
          *,
          player1:player1_id(id, full_name, avatar_url, rating),
          player2:player2_id(id, full_name, avatar_url, rating),
          venue:venue_id(id, name, location)
        `)
        .eq("id", matchId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleShare = async (platform: "facebook" | "twitter") => {
    const shareUrl = window.location.href;
    const shareText = match ? 
      `Check out this paddle match between ${match.player1?.full_name} and ${match.player2?.full_name}!` :
      "Check out this paddle match!";

    let shareLink = "";
    if (platform === "facebook") {
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    } else if (platform === "twitter") {
      shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    }

    window.open(shareLink, "_blank", "width=600,height=400");
    toast.success(`Shared on ${platform}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-muted rounded w-1/3"></div>
                <div className="h-32 bg-muted rounded"></div>
                <div className="h-24 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Match not found</h1>
          <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  const matchData = {
    date: new Date(match.played_at || match.created_at).toLocaleDateString(),
    venue: match.venue?.name || "Unknown Venue",
    teams: [
      {
        players: [
          { 
            name: match.player1?.full_name || "Unknown Player", 
            initialRank: match.player1?.rating || 1200 
          }
        ],
        score: match.player1_score || "0",
        color: "primary" as const
      },
      {
        players: [
          { 
            name: match.player2?.full_name || "Unknown Player", 
            initialRank: match.player2?.rating || 1200 
          }
        ],
        score: match.player2_score || "0",
        color: "secondary" as const
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Match Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MatchSummary
              date={matchData.date}
              venue={matchData.venue}
              teams={matchData.teams}
              isContested={match.status === "contested"}
            />

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Share Match</h3>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleShare("facebook")}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Share on Facebook
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Share on Twitter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatchDetails;