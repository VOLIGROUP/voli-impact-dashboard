
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { mockMarketplace, mockImpactCategories } from '../services/mockData';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Clock, Heart, Share2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const MarketplaceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = mockMarketplace.find(item => item.id === id);
  
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
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">About This {item.type === 'volunteer' ? 'Opportunity' : 'Campaign'}</h2>
                <p className="text-gray-700">{item.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-3">Impact</h2>
                <p className="text-gray-700">{item.impact}</p>
              </div>
              
              {item.requirements && (
                <div>
                  <h2 className="text-xl font-bold mb-3">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {item.requirements.map((req, index) => (
                      <li key={index} className="text-gray-700">{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="px-3 py-1">
                    {category?.name || 'General'}
                  </Badge>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarketplaceDetail;
