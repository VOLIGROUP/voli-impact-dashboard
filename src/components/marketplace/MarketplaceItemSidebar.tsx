
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MapPin, Calendar, Users, DollarSign, Clock, Heart, Share2, Globe, Mail, Phone, ExternalLink } from 'lucide-react';
import { Marketplace, ImpactCategory } from '../../types/dashboard';

interface MarketplaceItemSidebarProps {
  item: Marketplace;
  category: ImpactCategory | undefined;
  handleViewCauseProfile: () => void;
}

const MarketplaceItemSidebar: React.FC<MarketplaceItemSidebarProps> = ({ 
  item, 
  category,
  handleViewCauseProfile
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            {category && (
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleViewCauseProfile}
              >
                <span>{category.name}</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            <Badge className="bg-black/70 text-white">
              {item.points} points
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{item.location}</span>
            </div>
            
            {item.type === 'volunteer' && (
              <>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{item.commitment}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Spots Filled:</span>
                    <span className="font-medium">{item.slotsFilled} / {item.slots}</span>
                  </div>
                  <Progress value={(item.slotsFilled / item.slots) * 100} className="h-2" />
                </div>
              </>
            )}
            
            {item.type === 'fundraising' && (
              <>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Ends {new Date(item.endDate).toLocaleDateString()}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Raised:</span>
                    <span className="font-medium">${item.raised.toLocaleString()} of ${item.goal.toLocaleString()}</span>
                  </div>
                  <Progress value={(item.raised / item.goal) * 100} className="h-2" />
                </div>
              </>
            )}
          </div>
          
          <div className="pt-4 space-y-3">
            <Button className="w-full bg-voli-primary hover:bg-voli-secondary text-black">
              {item.type === 'volunteer' ? 'Sign Up Now' : 'Donate Now'}
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-bold text-lg">Organization Info</h3>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.organization)}&background=random`} 
                alt={item.organization} 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{item.organization}</h4>
              <p className="text-sm text-gray-500">Verified Organization</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            View Organization Profile
          </Button>
        </CardContent>
      </Card>
      
      {item.type === 'volunteer' && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-lg">Key Information</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Commitment</TableCell>
                  <TableCell>{item.commitment}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Location</TableCell>
                  <TableCell>{item.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Available Spots</TableCell>
                  <TableCell>{item.slots - item.slotsFilled}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MarketplaceItemSidebar;
