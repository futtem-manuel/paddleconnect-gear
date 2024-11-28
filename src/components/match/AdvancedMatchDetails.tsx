import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface AdvancedMatchDetailsProps {
  onDetailsChange: (details: {
    tournament?: string;
    time?: string;
    notes?: string;
    files?: FileList;
  }) => void;
}

export const AdvancedMatchDetails = ({ onDetailsChange }: AdvancedMatchDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 w-full justify-between">
          <span>Advanced Details</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tournament/League</label>
          <Input
            placeholder="Enter tournament name"
            onChange={(e) => onDetailsChange({ tournament: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Time</label>
          <Input
            type="time"
            onChange={(e) => onDetailsChange({ time: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Match Photos</label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => onDetailsChange({ files: e.target.files || undefined })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <Textarea
            placeholder="Add any notes about the match"
            onChange={(e) => onDetailsChange({ notes: e.target.value })}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};