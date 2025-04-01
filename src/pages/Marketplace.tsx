
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { mockMarketplace, mockImpactCategories } from '../services/mockData';
import { scrapeVolunteerOpportunities } from '../services/VolunteerScraperService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Calendar, Users, DollarSign, Clock, Heart, RefreshCw } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Marketplace as MarketplaceType } from '../types/dashboard';
import { useToast } from "@/hooks/use-toast";

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceType[]>(mockMarketplace);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Function to load scraped volunteer opportunities
  const loadScrapedOpportunities = async () => {
    setIsLoading(true);
    try {
      const scrapedItems = await scrapeVolunteerOpportunities();
      // Merge with existing fundraising items
      const fundraisingItems = marketplaceItems.filter(item => item.type === 'fundraising');
      setMarketplaceItems([...scrapedItems, ...fundraisingItems]);
      toast({
        title: "Success",
        description: `Loaded ${scrapedItems.length} recent volunteer opportunities`,
      });
    } catch (error) {
      console.error('Error scraping volunteer opportunities:', error);
      toast({
        title: "Error",
        description: "Failed to load volunteer opportunities",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load scraped opportunities on initial load
  useEffect(() => {
    loadScrapedOpportunities();
  }, []);
  
  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? item.impactCategory === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  const volunteerItems = filteredItems.filter(item => item.type === 'volunteer');
  const fundraisingItems = filteredItems.filter(item => item.type === 'fundraising');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Impact Marketplace</h1>
            <p className="text-gray-500">
              Discover volunteering opportunities and fundraising campaigns
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search opportunities..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              className="bg-voli-primary hover:bg-voli-secondary text-black whitespace-nowrap"
              onClick={loadScrapedOpportunities}
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
        
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={selectedCategory === null ? "default" : "outline"}
            className={selectedCategory === null ? "bg-voli-primary hover:bg-voli-secondary text-black cursor-pointer" : "cursor-pointer"}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Badge>
          
          {mockImpactCategories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={selectedCategory === category.id ? `bg-voli-primary hover:bg-voli-secondary text-black cursor-pointer` : "cursor-pointer"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
        
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Opportunities</TabsTrigger>
            <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
            <TabsTrigger value="fundraising">Fundraising</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <MarketplaceCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">No opportunities found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="volunteer" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteerItems.length > 0 ? (
                volunteerItems.map((item) => (
                  <MarketplaceCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">No volunteer opportunities found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="fundraising" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fundraisingItems.length > 0 ? (
                fundraisingItems.map((item) => (
                  <MarketplaceCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">No fundraising campaigns found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const MarketplaceCard = ({ item }) => {
  const navigate = useNavigate();
  const category = mockImpactCategories.find(cat => cat.id === item.impactCategory);
  
  const handleCardClick = () => {
    navigate(`/marketplace/${item.id}`);
  };
  
  const handleSaveClick = (e) => {
    e.stopPropagation();
  };
  
  const handleActionClick = (e) => {
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
                ${item.raised.toLocaleString()} raised of ${item.goal.toLocaleString()}
              </span>
              <span className="flex items-center text-gray-600">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(item.endDate).toLocaleDateString()}
              </span>
            </div>
            <Progress value={(item.raised / item.goal) * 100} className="h-1.5 bg-gray-100" />
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

export default Marketplace;
