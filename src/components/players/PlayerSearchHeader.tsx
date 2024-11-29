import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const PlayerSearchHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
      <Link to="/dashboard">
        <Button variant="ghost" size="sm" className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>
      <img
        src="/lovable-uploads/fd2b445d-f8f6-4612-8dc4-42911f72395b.png"
        alt="PaddleRank Logo"
        className="h-12 md:h-16 object-contain"
      />
    </div>
  );
};