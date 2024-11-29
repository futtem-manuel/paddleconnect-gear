import { Search } from "lucide-react";

const SearchLegend = () => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
      <Search className="h-4 w-4" />
      <p>Search through rules - matching text will be highlighted in yellow</p>
    </div>
  );
};

export default SearchLegend;