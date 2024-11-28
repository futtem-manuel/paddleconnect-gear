import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Home, Share2, Camera, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const VerifyMatch = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const matchUrl = window.location.href;
  const [isContested, setIsContested] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [matchImages, setMatchImages] = useState<File[]>([]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(matchUrl);
      toast.success("Match URL copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setMatchImages(Array.from(event.target.files));
      toast.success("Images uploaded successfully");
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Match Summary</CardTitle>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {isContested && (
                <Badge variant="destructive" className="mb-4">
                  Contested Match
                </Badge>
              )}
              
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-muted-foreground">Date</h4>
                    <p>March 15, 2024</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-muted-foreground">Venue</h4>
                    <p>Local Sports Center</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Teams</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border-2 border-primary bg-primary/5">
                      <h5 className="font-medium text-primary mb-2">Team 1</h5>
                      <ul className="space-y-1">
                        <li>Player 1</li>
                        <li>Player 2</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-secondary bg-secondary/5">
                      <h5 className="font-medium text-secondary mb-2">Team 2</h5>
                      <ul className="space-y-1">
                        <li>Player 3</li>
                        <li>Player 4</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Score</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-primary font-medium">Team 1</p>
                      <p>21 - 19 - 21</p>
                    </div>
                    <div>
                      <p className="text-secondary font-medium">Team 2</p>
                      <p>19 - 21 - 19</p>
                    </div>
                  </div>
                </div>

                {matchImages.length > 0 && (
                  <div>
                    <h4 className="font-medium text-muted-foreground mb-2">Match Photos</h4>
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
                  </div>
                )}

                <Button onClick={handleShare} className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Match Result
                </Button>
              </div>
            </CardContent>
          </Card>
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
            <div className="flex flex-col items-center space-y-4">
              <QRCodeSVG value={matchUrl} size={250} />
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleCopyUrl}
              >
                <Copy className="h-4 w-4" />
                Copy Match URL
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Upload Match Photos</h4>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setShowVerificationDialog(true)}
                >
                  <Check className="h-4 w-4" />
                  Verify Result
                </Button>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() => handleVerification(false)}
                >
                  <X className="h-4 w-4" />
                  Contest Result
                </Button>
              </div>
            </div>
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