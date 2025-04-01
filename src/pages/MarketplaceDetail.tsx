
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { mockImpactCategories, getMarketplaceItemById } from '../services/mockMarketplace';
import MarketplaceItemHeader from '../components/marketplace/MarketplaceItemHeader';
import MarketplaceItemDescription from '../components/marketplace/MarketplaceItemDescription';
import MarketplaceItemSidebar from '../components/marketplace/MarketplaceItemSidebar';
import MarketplaceItemNotFound from '../components/marketplace/MarketplaceItemNotFound';

const MarketplaceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = getMarketplaceItemById(id || '');
  
  if (!item) {
    return (
      <Layout>
        <MarketplaceItemNotFound />
      </Layout>
    );
  }
  
  const category = mockImpactCategories.find(cat => cat.id === item.impactCategory);
  
  const handleViewCauseProfile = () => {
    navigate('/marketplace', { state: { viewCauseId: item.impactCategory } });
  };
  
  return (
    <Layout>
      <MarketplaceItemHeader item={item} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <MarketplaceItemDescription item={item} />
        </div>
        
        <div>
          <MarketplaceItemSidebar 
            item={item} 
            category={category} 
            handleViewCauseProfile={handleViewCauseProfile} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default MarketplaceDetail;
