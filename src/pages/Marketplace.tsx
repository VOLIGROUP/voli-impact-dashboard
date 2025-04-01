
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { mockMarketplace, mockImpactCategories, getMarketplaceItemById, mockCharities } from '../services/mockMarketplace';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, PlusCircle, Filter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Marketplace as MarketplaceType } from '../types/dashboard';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import MarketplaceCard from '../components/marketplace/MarketplaceCard';
import CauseProfile from '../components/marketplace/CauseProfile';
import CreateOpportunityDialog from '../components/marketplace/CreateOpportunityDialog';

const Marketplace: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceType[]>(mockMarketplace);
  const [isLoading, setIsLoading] = useState(false);
  const [viewingCauseId, setViewingCauseId] = useState<string | null>(
    location.state?.viewCauseId || null
  );
  const [viewingCharityId, setViewingCharityId] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const { toast } = useToast();
  
  const isLoggedIn = true;

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory 
      ? item.impactCategory === selectedCategory || 
        (item.sdgGoals && item.sdgGoals.includes(selectedCategory))
      : true;
    
    return matchesSearch && matchesCategory;
  });
  
  const volunteerItems = filteredItems.filter(item => item.type === 'volunteer');
  const fundraisingItems = filteredItems.filter(item => item.type === 'fundraising');

  const handleCreateOpportunity = (newOpportunity: Partial<MarketplaceType>) => {
    setMarketplaceItems(prev => [newOpportunity as MarketplaceType, ...prev]);
    
    toast({
      title: "Success",
      description: "New opportunity created successfully",
    });
  };

  const handleCategoryClick = (categoryId: string | null) => {
    if (categoryId) {
      setViewingCauseId(categoryId);
    } else {
      setSelectedCategory(null);
    }
  };

  const clearFilter = () => {
    setSelectedCategory(null);
    setFilterOpen(false);
  };

  const handleCharityClick = (charityId: string) => {
    setViewingCharityId(charityId);
  };

  if (viewingCauseId) {
    return (
      <Layout>
        <CauseProfile 
          causeId={viewingCauseId} 
          opportunities={marketplaceItems}
          onBackClick={() => setViewingCauseId(null)}
        />
      </Layout>
    );
  }

  if (viewingCharityId) {
    const charity = mockCharities.find(c => c.id === viewingCharityId);
    const charityOpportunities = marketplaceItems.filter(
      item => item.organization.toLowerCase() === charity?.name.toLowerCase()
    );
    
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              className="mr-2" 
              onClick={() => setViewingCharityId(null)}
            >
              ← Back
            </Button>
            <h1 className="text-2xl font-bold">{charity?.name}</h1>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="w-1/3">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <img 
                      src={charity?.logo} 
                      alt={charity?.name} 
                      className="h-24 w-24 object-contain" 
                    />
                  </div>
                  <CardTitle>{charity?.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{charity?.mission}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {charity?.sdgFocus.map(sdgId => {
                      const category = mockImpactCategories.find(c => c.id === sdgId);
                      return (
                        <Badge
                          key={sdgId}
                          style={{
                            backgroundColor: category?.color,
                            color: 'white'
                          }}
                          className="text-xs"
                        >
                          {category?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(charity?.website, '_blank')}
                  >
                    Visit Website
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="w-2/3">
              <h2 className="text-xl font-semibold mb-4">Opportunities from {charity?.name}</h2>
              {charityOpportunities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {charityOpportunities.map(item => (
                    <MarketplaceCard 
                      key={item.id} 
                      item={item} 
                      readOnly={!isLoggedIn}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 py-4">No opportunities found from this charity.</p>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="md:max-w-lg">
            <h1 className="text-2xl font-bold text-gray-900">Impact Marketplace</h1>
            <p className="text-gray-500">
              Discover volunteering opportunities and fundraising campaigns aligned with the UN Sustainable Development Goals
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search opportunities..."
                className="pl-10 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {isLoggedIn && (
              <Button 
                className="bg-voli-primary hover:bg-voli-secondary text-black whitespace-nowrap"
                onClick={() => setCreateDialogOpen(true)}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Opportunity
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            {selectedCategory && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilter}
                className="text-xs h-8"
              >
                Clear Filter
              </Button>
            )}
            
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                >
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  Filter
                  {selectedCategory && (
                    <Badge 
                      variant="secondary" 
                      className="ml-1 h-5 px-1 text-xs"
                    >
                      1
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-3 w-80" align="end">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">SDG Categories</h3>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge 
                      variant={selectedCategory === null ? "default" : "outline"}
                      className={`${selectedCategory === null ? "bg-voli-primary hover:bg-voli-secondary text-black cursor-pointer" : "cursor-pointer"} text-xs py-0.5 px-1.5`}
                      onClick={() => {
                        setSelectedCategory(null);
                        setFilterOpen(false);
                      }}
                    >
                      All SDGs
                    </Badge>
                    
                    {mockImpactCategories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className="cursor-pointer text-xs py-0.5 px-1.5"
                        style={{
                          backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                          color: selectedCategory === category.id ? 'white' : 'inherit',
                          borderColor: category.color
                        }}
                        onClick={() => {
                          if (selectedCategory === category.id) {
                            handleCategoryClick(category.id);
                          } else {
                            setSelectedCategory(category.id);
                            setFilterOpen(false);
                          }
                        }}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Opportunities</TabsTrigger>
            <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
            <TabsTrigger value="fundraising">Fundraising</TabsTrigger>
            <TabsTrigger value="charities">Charities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <MarketplaceCard 
                    key={item.id} 
                    item={item} 
                    readOnly={!isLoggedIn}
                  />
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
                  <MarketplaceCard 
                    key={item.id} 
                    item={item} 
                    readOnly={!isLoggedIn} 
                  />
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
                  <MarketplaceCard 
                    key={item.id} 
                    item={item} 
                    readOnly={!isLoggedIn}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">No fundraising campaigns found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="charities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCharities.map((charity) => (
                <Card 
                  key={charity.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleCharityClick(charity.id)}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 flex-shrink-0">
                        <img 
                          src={charity.logo} 
                          alt={charity.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{charity.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <CardDescription className="line-clamp-3 mb-4">
                      {charity.mission}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1.5">
                      {charity.sdgFocus.slice(0, 3).map(sdgId => {
                        const category = mockImpactCategories.find(c => c.id === sdgId);
                        return (
                          <Badge
                            key={sdgId}
                            style={{
                              backgroundColor: category?.color,
                              color: 'white'
                            }}
                            className="text-xs"
                          >
                            {category?.name}
                          </Badge>
                        );
                      })}
                      {charity.sdgFocus.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{charity.sdgFocus.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {isLoggedIn && (
        <CreateOpportunityDialog 
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={handleCreateOpportunity}
        />
      )}
    </Layout>
  );
};

export default Marketplace;
