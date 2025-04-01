
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Users, DollarSign, Clock, Heart } from 'lucide-react';
import { mockImpactCategories } from "../../services/mockMarketplace";
import { Marketplace } from '../../types/dashboard';

interface MarketplaceCardProps {
  item: Marketplace;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const category = mockImpactCategories.find(cat => cat.id === item.impactCategory);
  
  const handleCardClick = () => {
    navigate(`/marketplace/${item.id}`);
  };
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/marketplace/${item.id}`);
  };
  
  return (
    <Card 
      className="voli-card overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-all"
      onClick={handleCardClick}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover object-center"
        />
        <Badge 
          className={`absolute top-3 left-3 ${
            item.type === 'volunteer' 
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800'
          }`}
        >
          {item.type === 'volunteer' ? 'Volunteer' : 'Fundraising'}
        </Badge>
        
        {category && (
          <Badge className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm">
            {category.name}
          </Badge>
        )}
        
        <Badge className="absolute bottom-3 right-3 bg-black/70 text-white backdrop-blur-sm">
          {item.points} points
        </Badge>
      </div>
      
      <CardContent className="p-4 flex-1">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.organization}</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{item.location}</span>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{item.description}</p>
        
        {item.type === 'volunteer' && (
          <div className="mt-auto">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center text-gray-600">
                <Users className="h-3 w-3 mr-1" />
                {item.slotsFilled} / {item.slots} spots filled
              </span>
              <span className="flex items-center text-gray-600">
                <Clock className="h-3 w-3 mr-1" />
                {item.commitment}
              </span>
            </div>
            <Progress value={(item.slotsFilled / item.slots) * 100} className="h-1.5 bg-gray-100" />
          </div>
        )}
        
        {item.type === 'fundraising' && (
          <div className="mt-auto">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center text-gray-600">
                <DollarSign className="h-3 w-3 mr-1" />
                ${item.raised?.toLocaleString()} raised of ${item.goal?.toLocaleString()}
              </span>
              <span className="flex items-center text-gray-600">
                <Calendar className="h-3 w-3 mr-1" />
                {item.endDate ? new Date(item.endDate).toLocaleDateString() : "Ongoing"}
              </span>
            </div>
            <Progress value={item.goal ? (item.raised / item.goal) * 100 : 0} className="h-1.5 bg-gray-100" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t border-gray-100 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-1/2"
          onClick={handleSaveClick}
        >
          <Heart className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button 
          size="sm" 
          className="w-1/2 bg-voli-primary hover:bg-voli-secondary text-black"
          onClick={handleActionClick}
        >
          {item.type === 'volunteer' ? 'Sign Up' : 'Donate'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarketplaceCard;
