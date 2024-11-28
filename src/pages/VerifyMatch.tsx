import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const VerifyMatch = () => {
  const { matchId } = useParams();
  const matchUrl = window.location.href;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(matchUrl);
      toast.success("Match URL copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

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
              <h3 className="text-lg font-semibold">Match Details</h3>
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

                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Match Photos</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src="/placeholder-image.jpg"
                      alt="Match"
                      className="rounded-lg w-full h-48 object-cover"
                    />
                    <img
                      src="/placeholder-image.jpg"
                      alt="Match"
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-muted-foreground">Notes</h4>
                  <p className="text-sm text-muted-foreground">
                    Great match with excellent sportsmanship from both teams.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyMatch;