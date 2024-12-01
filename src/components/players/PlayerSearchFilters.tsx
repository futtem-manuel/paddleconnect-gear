import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('players.searchPlayers')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="space-y-2">
        <Label>{t('common.location')}</Label>
        <Input
          type="text"
          placeholder={t('players.filterByLocation')}
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>{t('players.ratingRange')}</Label>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">Min</span>
              <input
                type="number"
                min="1"
                max="7"
                step="0.1"
                value={ratingRange[0]}
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value);
                  if (newValue <= ratingRange[1]) {
                    setRatingRange([newValue, ratingRange[1]]);
                  }
                }}
                className="w-16 text-center bg-muted rounded px-2 py-1"
              />
            </div>
            <span>-</span>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">Max</span>
              <input
                type="number"
                min="1"
                max="7"
                step="0.1"
                value={ratingRange[1]}
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value);
                  if (newValue >= ratingRange[0]) {
                    setRatingRange([ratingRange[0], newValue]);
                  }
                }}
                className="w-16 text-center bg-muted rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
        <div className="pt-2">
          <Slider
            defaultValue={[1, 7]}
            max={7}
            min={1}
            step={0.1}
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
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">1.0</span>
            <span className="text-xs text-muted-foreground">7.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};