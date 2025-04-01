
import { useState, useEffect } from 'react';
import { mockMarketplace } from '../services/mockMarketplace';
import { scrapeVolunteerOpportunities } from '../services/VolunteerScraperService';
import { Marketplace } from '../types/dashboard';
import { useToast } from './use-toast';

export const useMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [marketplaceItems, setMarketplaceItems] = useState<Marketplace[]>(mockMarketplace);
  const [isLoading, setIsLoading] = useState(false);
  const [viewingCauseId, setViewingCauseId] = useState<string | null>(null);
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

  const handleCreateOpportunity = (newOpportunity: Partial<Marketplace>) => {
    setMarketplaceItems(prev => [newOpportunity as Marketplace, ...prev]);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    marketplaceItems,
    setMarketplaceItems,
    isLoading,
    viewingCauseId,
    setViewingCauseId,
    filteredItems,
    loadScrapedOpportunities,
    handleCreateOpportunity
  };
};
