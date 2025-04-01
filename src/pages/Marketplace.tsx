
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { mockMarketplace, mockImpactCategories, getMarketplaceItemById } from '../services/mockMarketplace';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, PlusCircle, Filter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Marketplace as MarketplaceType } from '../types/dashboard';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import MarketplaceCard from '../components/marketplace/MarketplaceCard';
import CauseProfile from '../components/marketplace/CauseProfile';
import CreateOpportunityDialog from '../components/marketplace/CreateOpportunityDialog';

const Marketplace: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceType[]>(mockMarketplace);
  const [isLoading, setIsLoading] = useState(false);
  const [viewingCauseId, setViewingCauseId] = useState<string | null>(
    location.state?.viewCauseId || null
  );
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
        
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-700">Filter by UN Sustainable Development Goals</h2>
          
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
