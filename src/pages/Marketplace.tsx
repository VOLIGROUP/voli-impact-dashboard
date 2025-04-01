
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useMarketplace } from '../hooks/useMarketplace';
import CreateOpportunityDialog from '../components/marketplace/CreateOpportunityDialog';
import CauseProfile from '../components/marketplace/CauseProfile';
import MarketplaceFilters from '../components/marketplace/MarketplaceFilters';
import MarketplaceList from '../components/marketplace/MarketplaceList';
import MarketplaceHeader from '../components/marketplace/MarketplaceHeader';

const Marketplace: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    viewingCauseId,
    setViewingCauseId,
    filteredItems,
    loadScrapedOpportunities,
    marketplaceItems,
    handleCreateOpportunity
  } = useMarketplace();
  
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
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
        <MarketplaceHeader 
          onRefreshClick={loadScrapedOpportunities}
          onCreateClick={() => setCreateDialogOpen(true)}
          isLoading={isLoading}
        />
        
        <MarketplaceFilters 
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategorySelect={setSelectedCategory}
          onCategoryClick={handleCategoryClick}
        />
        
        <MarketplaceList items={filteredItems} />
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
