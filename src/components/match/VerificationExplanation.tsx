import { Card, CardContent } from "@/components/ui/card";

export const VerificationExplanation = () => {
  return (
    <Card className="bg-muted/50">
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">
          Verifying match results helps maintain fair play and accurate rankings in our community.
        </p>
      </CardContent>
    </Card>
  );
};