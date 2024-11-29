import { Input } from "@/components/ui/input";
import { Search, GripHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface PlayerSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  ratingRange: number[];
  setRatingRange: (value: number[]) => void;
  isDragging: { min: boolean; max: boolean };
  setIsDragging: (value: { min: boolean; max: boolean }) => void;
}

export const PlayerSearchFilters = ({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  ratingRange,
  setRatingRange,
  isDragging,
  setIsDragging,
}: PlayerSearchFiltersProps) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Input
          type="text"
          placeholder="Enter location..."
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Rating Range</label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <GripHorizontal className={`h-4 w-4 ${isDragging.min ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-sm text-muted-foreground">{ratingRange[0].toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">-</span>
            <div className="flex items-center gap-1">
              <GripHorizontal className={`h-4 w-4 ${isDragging.max ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-sm text-muted-foreground">{ratingRange[1].toFixed(1)}</span>
            </div>
          </div>
        </div>
        <Slider
          defaultValue={[1, 7]}
          max={7}
          min={1}
          step={0.5}
          value={ratingRange}
          onValueChange={setRatingRange}
          className="w-full"
          onValueCommit={() => setIsDragging({ min: false, max: false })}
          onPointerDown={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            const closer = Math.abs(pos - (ratingRange[0] - 1) / 6) < Math.abs(pos - (ratingRange[1] - 1) / 6);
            setIsDragging({ min: closer, max: !closer });
          }}
        />
      </div>
    </div>
  );
};