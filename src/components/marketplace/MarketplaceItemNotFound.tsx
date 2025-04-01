
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const MarketplaceItemNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/marketplace')}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Marketplace
      </Button>
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Opportunity Not Found</h1>
        <p className="text-gray-500 mt-2">The opportunity you're looking for doesn't exist or has been removed.</p>
        <Button 
          className="mt-6 bg-voli-primary hover:bg-voli-secondary text-black"
          onClick={() => navigate('/marketplace')}
        >
          Browse All Opportunities
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceItemNotFound;
