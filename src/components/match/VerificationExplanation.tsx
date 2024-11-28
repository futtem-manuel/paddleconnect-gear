import { Card, CardContent } from "@/components/ui/card";

export const VerificationExplanation = () => {
  return (
    <Card className="bg-muted/50">
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Our ranking system is built on the foundation of fair play and accuracy. 
          By verifying match results, players contribute to maintaining the integrity 
          of our community's rankings. Each verification helps ensure that rankings 
          reflect true skill levels and promotes good sportsmanship among all players. 
          Your participation in this process is crucial for the system's success.
        </p>
      </CardContent>
    </Card>
  );
};