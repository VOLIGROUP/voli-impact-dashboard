
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { mockMarketplace, mockImpactCategories, getMarketplaceItemById } from '../services/mockMarketplace';
import { scrapeVolunteerOpportunities } from '../services/VolunteerScraperService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, RefreshCw, PlusCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Marketplace as MarketplaceType } from '../types/dashboard';

import MarketplaceCard from '../components/marketplace/MarketplaceCard';
import CauseProfile from '../components/marketplace/CauseProfile';
import CreateOpportunityDialog from '../components/marketplace/CreateOpportunityDialog';

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceType[]>(mockMarketplace);
  const [isLoading, setIsLoading] = useState(false);
  const [viewingCauseId, setViewingCauseId] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const loadScrapedOpportunities = async () => {
    setIsLoading(true);
    try {
      const scrapedItems = await scrapeVolunteerOpportunities();
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

  const handleCreateOpportunity = (newOpportunity: Partial<MarketplaceType>) => {
    // Add the new opportunity to the marketplace items
    setMarketplaceItems(prev => [newOpportunity as MarketplaceType, ...prev]);
  };

  const handleCategoryClick = (categoryId: string | null) => {
    if (categoryId) {
      setViewingCauseId(categoryId);
    } else {
      setSelectedCategory(null);
    }
  };

  // If viewing a cause profile, show that instead of the main marketplace
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
              onClick={() => setCreateDialogOpen(true)}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Opportunity
            </Button>
            
            <Button 
              variant="outline"
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
              onClick={() => {
                if (selectedCategory === category.id) {
                  handleCategoryClick(category.id);
                } else {
                  setSelectedCategory(category.id);
                }
              }}
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
      
      <CreateOpportunityDialog 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateOpportunity}
      />
    </Layout>
  );
};

export default Marketplace;
