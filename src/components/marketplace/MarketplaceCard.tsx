
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Users, DollarSign, Clock, Heart, Share2, Copy, X } from 'lucide-react';
import { mockImpactCategories, getSDGsForMarketplaceItem } from "../../services/mockMarketplace";
import { Marketplace } from '../../types/dashboard';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        
        <CardFooter className="px-4 py-3 border-t border-gray-100 flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={handleSaveClick}
                    disabled={readOnly}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save to favorites</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleShareClick}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this opportunity</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <Button 
            size="sm" 
            className="flex-1 bg-voli-primary hover:bg-voli-secondary text-black whitespace-nowrap"
            onClick={handleActionClick}
          >
            {item.type === 'volunteer' ? 'Sign Up' : 'Donate'}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md p-6">
          <div className="flex justify-between items-center mb-2">
            <DialogTitle className="text-xl font-semibold">Share This Opportunity</DialogTitle>
            <DialogClose className="h-4 w-4 rounded-sm opacity-70 ring-offset-background hover:opacity-100 focus:outline-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          
          <DialogDescription className="mt-0 mb-4">
            Share this {item.type === 'volunteer' ? 'volunteer opportunity' : 'fundraising campaign'} with others.
          </DialogDescription>
          
          <div className="border rounded-md p-2 mb-6 bg-gray-50">
            <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {generateShareLink()}
            </div>
          </div>
          
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button 
                type="button" 
                variant="outline"
                className="px-6"
              >
                Close
              </Button>
            </DialogClose>
            
            <Button 
              type="button" 
              className="bg-[#d4ff39] hover:bg-[#bce535] text-black px-6 font-medium flex items-center gap-2"
              onClick={copyToClipboard}
            >
              {copied ? 'Copied!' : 'Copy Link'}
              {!copied && <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarketplaceCard;
