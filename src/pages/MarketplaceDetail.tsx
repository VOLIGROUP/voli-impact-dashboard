
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { mockImpactCategories, getMarketplaceItemById, getSDGsForMarketplaceItem } from '../services/mockMarketplace';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Clock, Heart, Share2, Globe, Mail, Phone, ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const MarketplaceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const item = getMarketplaceItemById(id || '');
  
  // Mock implementation to check if user is logged in
  const isLoggedIn = true; // In a real app, this would come from auth context
  
  if (!item) {
    return (
      <Layout>
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
      </Layout>
    );
  }
  
  const category = mockImpactCategories.find(cat => cat.id === item.impactCategory);
  const sdgGoals = getSDGsForMarketplaceItem(item.id);
  
  const handleViewCauseProfile = (sdgId: string) => {
    navigate('/marketplace', { state: { viewCauseId: sdgId } });
  };
  
  const handleActionClick = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to your VOLI account to participate in this opportunity.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Action Registered",
      description: `You've successfully signed up for ${item.title}`,
    });
  };
  
  const handleShareClick = () => {
    const shareUrl = `${window.location.origin}/marketplace/${item.id}?source=shared`;
    
    if (navigator.share) {
      navigator.share({
        title: `VOLI: ${item.title}`,
        text: `Check out this ${item.type} opportunity: ${item.title}`,
        url: shareUrl,
      }).catch(err => {
        console.error('Error sharing:', err);
        copyToClipboard(shareUrl);
      });
    } else {
      copyToClipboard(shareUrl);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Link Copied",
          description: "The shareable link has been copied to your clipboard.",
        });
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast({
          title: "Copy Failed",
          description: "Failed to copy link. Please try again.",
          variant: "destructive"
        });
      });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/marketplace')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
            
            {/* SDG Goals Section */}
            {sdgGoals && sdgGoals.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">UN Sustainable Development Goals</h2>
                <div className="flex flex-wrap gap-2">
                  {sdgGoals.map((sdg) => (
                    <Badge 
                      key={sdg.id}
                      style={{
                        backgroundColor: `${sdg.color}20`,
                        color: sdg.color,
                        border: `1px solid ${sdg.color}40`
                      }}
                      className="cursor-pointer"
                      onClick={() => handleViewCauseProfile(sdg.id)}
                    >
                      {sdg.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">About This {item.type === 'volunteer' ? 'Opportunity' : 'Campaign'}</h2>
                <p className="text-gray-700">{item.description}</p>
              </div>
              
              {item.impact && (
                <div>
                  <h2 className="text-xl font-bold mb-3">Impact</h2>
                  <p className="text-gray-700">{item.impact}</p>
                </div>
              )}
              
              {item.requirements && item.requirements.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-3">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {item.requirements.map((req, index) => (
                      <li key={index} className="text-gray-700">{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {item.contactInfo && (
                <div>
                  <h2 className="text-xl font-bold mb-3">Contact Information</h2>
                  <div className="flex items-center text-gray-700 mb-2">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{item.contactInfo}</span>
                  </div>
                  {item.websiteUrl && (
                    <div className="flex items-center text-gray-700">
                      <Globe className="h-4 w-4 mr-2" />
                      <a 
                        href={item.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              )}
              
              {item.createdAt && (
                <div className="text-sm text-gray-500">
                  Posted: {new Date(item.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  {category && (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => handleViewCauseProfile(category.id)}
                      style={{
                        borderColor: category.color,
                        color: category.color
                      }}
                    >
                      <span>Primary: {category.name}</span>
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
                  <Button 
                    className="w-full bg-voli-primary hover:bg-voli-secondary text-black"
                    onClick={handleActionClick}
                  >
                    {item.type === 'volunteer' ? 'Sign Up Now' : 'Donate Now'}
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleShareClick}>
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
        </div>
      </div>
    </Layout>
  );
};

export default MarketplaceDetail;
