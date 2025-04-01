
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { mockImpactCategories } from "../../services/mockMarketplace";

interface MarketplaceFiltersProps {
  searchQuery: string;
  selectedCategory: string | null;
  onSearchChange: (query: string) => void;
  onCategorySelect: (categoryId: string | null) => void;
  onCategoryClick: (categoryId: string | null) => void;
}

const MarketplaceFilters: React.FC<MarketplaceFiltersProps> = ({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategorySelect,
  onCategoryClick
}) => {
  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search opportunities..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={selectedCategory === null ? "default" : "outline"}
          className={selectedCategory === null ? "bg-voli-primary hover:bg-voli-secondary text-black cursor-pointer" : "cursor-pointer"}
          onClick={() => onCategorySelect(null)}
        >
          All Categories
        </Badge>
        
        {mockImpactCategories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={selectedCategory === category.id ? `bg-voli-primary hover:bg-voli-secondary text-black cursor-pointer` : "cursor-pointer"}
            onClick={() => {
              if (selectedCategory === category.id) {
                onCategoryClick(category.id);
              } else {
                onCategorySelect(category.id);
              }
            }}
          >
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceFilters;
