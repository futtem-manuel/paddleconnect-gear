import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Home, Share2 } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogContent, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { MatchSummary } from "@/components/match/MatchSummary";
import { VerificationExplanation } from "@/components/match/VerificationExplanation";
import { MatchImageUpload } from "@/components/match/MatchImageUpload";
import { MatchQuickView } from "@/components/match/MatchQuickView";
import { VerificationActions } from "@/components/match/VerificationActions";

const VerifyMatch = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const matchUrl = window.location.href;
  const [isContested, setIsContested] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [matchImages, setMatchImages] = useState<File[]>([]);

  // Mock data for demonstration
  const matchData = {
    date: "March 15, 2024",
    venue: "Local Sports Center",
    teams: [
      {
        players: [
          { name: "Player 1", initialRank: 5.2 },
          { name: "Player 2", initialRank: 4.8 }
        ],
        score: "21 - 19 - 21",
        color: "primary" as const
      },
      {
        players: [
          { name: "Player 3", initialRank: 5.0 },
          { name: "Player 4", initialRank: 4.9 }
        ],
        score: "19 - 21 - 19",
        color: "secondary" as const
      }
    ]
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(matchUrl);
      toast.success("Match URL copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const handleVerification = (verified: boolean) => {
    if (!verified) {
      setIsContested(true);
      toast.error("Match result has been contested");
    } else {
      toast.success("Match result verified");
    }
    setShowVerificationDialog(false);
    setShowSummary(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Match Result",
          text: "Check out this match result!",
          url: matchUrl,
        });
      } catch (err) {
        toast.error("Failed to share");
      }
    } else {
      handleCopyUrl();
    }
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <MatchSummary
            date={matchData.date}
            venue={matchData.venue}
            teams={matchData.teams}
            isContested={isContested}
          />
          
          {matchImages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Match Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {matchImages.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Match ${index + 1}`}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button onClick={() => navigate("/dashboard")} className="flex-1">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button onClick={handleShare} className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share Result
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Verify Match</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <VerificationExplanation />

            <div className="flex flex-col items-center space-y-4">
              <QRCodeSVG value={matchUrl} size={200} />
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleCopyUrl}
              >
                <Copy className="h-4 w-4" />
                Copy Match URL
              </Button>
            </div>

            <MatchQuickView teams={matchData.teams} />

            <MatchImageUpload onImageUpload={setMatchImages} />

            <VerificationActions 
              onVerify={() => setShowVerificationDialog(true)}
              onContest={() => handleVerification(false)}
            />
          </CardContent>
        </Card>

        <AlertDialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Verify Match Result</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to verify this match result? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleVerification(true)}>
                Verify
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default VerifyMatch;