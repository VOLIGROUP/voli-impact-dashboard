
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from 'lucide-react';
import { Marketplace } from '../../types/dashboard';

interface MarketplaceItemHeaderProps {
  item: Marketplace;
}

const MarketplaceItemHeader: React.FC<MarketplaceItemHeaderProps> = ({ item }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/marketplace')}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Marketplace
      </Button>
      
      <div className="relative h-60 sm:h-80 rounded-lg overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <Badge 
            className={`${
              item.type === 'volunteer' 
              ? 'bg-blue-100 text-blue-800'
              : 'bg-purple-100 text-purple-800'
            } mb-2`}
          >
            {item.type === 'volunteer' ? 'Volunteer Opportunity' : 'Fundraising Campaign'}
          </Badge>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{item.title}</h1>
          <p className="text-white/80 text-lg">{item.organization}</p>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItemHeader;
