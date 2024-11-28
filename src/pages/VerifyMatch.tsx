import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const VerifyMatch = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();

  const handleVerify = (verified: boolean) => {
    // This would normally send verification to an API
    console.log("Match verification:", { matchId, verified });
    
    if (verified) {
      toast.success("Match verified successfully!", {
        description: "The match has been added to both players' records.",
      });
    } else {
      toast.error("Match declined", {
        description: "The match has been marked as disputed.",
      });
    }
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Verify Match</CardTitle>
              <Badge variant="outline">Pending Verification</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                You've been invited to verify a match. Please review the details below:
              </p>
              
              <div className="space-y-2 border rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Match ID:</span>
                  <span className="font-mono">{matchId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                {/* Additional match details would be fetched from API */}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => handleVerify(false)}
              >
                <X className="h-4 w-4" />
                Decline
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={() => handleVerify(true)}
              >
                <Check className="h-4 w-4" />
                Verify Match
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyMatch;