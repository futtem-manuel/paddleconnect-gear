import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface VerificationActionsProps {
  onVerify: () => void;
  onContest: () => void;
}

export const VerificationActions = ({ onVerify, onContest }: VerificationActionsProps) => {
  return (
    <div className="flex justify-center gap-4">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={onVerify}
      >
        <Check className="h-4 w-4" />
        Verify Result
      </Button>
      <Button
        variant="destructive"
        className="flex items-center gap-2"
        onClick={onContest}
      >
        <X className="h-4 w-4" />
        Contest Result
      </Button>
    </div>
  );
};