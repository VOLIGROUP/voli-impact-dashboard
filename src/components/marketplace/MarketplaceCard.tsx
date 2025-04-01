import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Users, DollarSign, Clock, Heart, Share2 } from 'lucide-react';
import { mockImpactCategories, getSDGsForMarketplaceItem } from "../../services/mockMarketplace";
import { Marketplace } from '../../types/dashboard';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface MarketplaceCardProps {
  item: Marketplace;
  readOnly?: boolean;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ item, readOnly = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const sdgCategories = getSDGsForMarketplaceItem(item.id);
  
  const handleCardClick = () => {
    if (!readOnly) {
      navigate(`/marketplace/${item.id}`);
    }
  };
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!readOnly) {
      toast({
        title: "Saved",
        description: `${item.title} has been saved to your favorites.`
      });
    }
  };
  
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShareDialogOpen(true);
  };
  
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!readOnly) {
      navigate(`/marketplace/${item.id}`);
    } else {
      toast({
        title: "Login Required",
        description: "Please log in to your VOLI account to participate in this opportunity.",
        variant: "destructive"
      });
    }
  };

  const generateShareLink = () => {
    return `${window.location.origin}/marketplace/${item.id}?source=shared`;
  };

  const copyToClipboard = () => {
    const shareableLink = generateShareLink();
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Link Copied",
          description: "The shareable link has been copied to your clipboard."
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Copy Failed",
          description: "Failed to copy link. Please try again.",
          variant: "destructive"
        });
      });
  };
  
  return (
    <>
      <Card 
        className={`voli-card overflow-hidden flex flex-col ${!readOnly ? 'cursor-pointer hover:shadow-md transition-all' : ''}`}
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
          
          {sdgCategories && sdgCategories.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {sdgCategories.slice(0, 3).map((sdg) => (
                <Badge 
                  key={sdg.id}
                  className="text-xs px-1.5 py-0.5"
                  style={{
                    backgroundColor: `${sdg.color}20`,
                    color: sdg.color,
                    border: `1px solid ${sdg.color}40`
                  }}
                >
                  {sdg.name}
                </Badge>
              ))}
              {sdgCategories.length > 3 && (
                <Badge className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-700">
                  +{sdgCategories.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
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
            className="w-5/12"
            onClick={handleSaveClick}
            disabled={readOnly}
          >
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-5/12"
            onClick={handleShareClick}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <Button 
            size="sm" 
            className="w-full mt-2 bg-voli-primary hover:bg-voli-secondary text-black"
            onClick={handleActionClick}
          >
            {item.type === 'volunteer' ? 'Sign Up' : 'Donate'}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share This Opportunity</DialogTitle>
            <DialogDescription>
              Share this {item.type === 'volunteer' ? 'volunteer opportunity' : 'fundraising campaign'} with others.
            </DialogDescription>
          </DialogHeader>
          <div className="p-2 border rounded-md">
            <pre className="text-sm overflow-auto p-2 bg-gray-50 rounded">{generateShareLink()}</pre>
          </div>
          <DialogFooter className="sm:justify-between mt-4">
            <DialogClose asChild>
              <Button 
                type="button" 
                variant="secondary" 
                className="sm:mt-0"
                onClick={() => setShareDialogOpen(false)}
              >
                Close
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              className="bg-voli-primary hover:bg-voli-secondary text-black"
              onClick={copyToClipboard}
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarketplaceCard;
