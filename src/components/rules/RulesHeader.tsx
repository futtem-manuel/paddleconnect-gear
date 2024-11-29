import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchLegend from "./SearchLegend";

interface RulesHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const RulesHeader = ({ searchQuery, onSearchChange }: RulesHeaderProps) => {
  return (
    <>
      <h1 className="text-2xl text-center">Official Padel Rules</h1>
      <p className="text-muted-foreground text-center">International Federation Of Padel (FIP)</p>
      <div className="relative max-w-md mx-auto mt-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search rules..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <SearchLegend />
      </div>
    </>
  );
};

export default RulesHeader;