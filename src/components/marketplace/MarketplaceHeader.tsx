
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, PlusCircle } from 'lucide-react';

interface MarketplaceHeaderProps {
  onRefreshClick: () => void;
  onCreateClick: () => void;
  isLoading: boolean;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({ 
  onRefreshClick, 
  onCreateClick, 
  isLoading 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Impact Marketplace</h1>
        <p className="text-gray-500">
          Discover volunteering opportunities and fundraising campaigns
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          className="bg-voli-primary hover:bg-voli-secondary text-black whitespace-nowrap"
          onClick={onCreateClick}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Opportunity
        </Button>
        
        <Button 
          variant="outline"
          onClick={onRefreshClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Listings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
