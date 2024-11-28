import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const VerifyMatch = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();

  const handleVerify = () => {
    // This would normally send verification to an API
    console.log("Match verified:", matchId);
    toast.success("Match verified successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Verify Match</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You've been invited to verify a match. Please review the details below:
            </p>
            
            {/* This would normally fetch and display match details */}
            <div className="space-y-2">
              <p><strong>Match ID:</strong> {matchId}</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Decline
              </Button>
              <Button onClick={handleVerify}>
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