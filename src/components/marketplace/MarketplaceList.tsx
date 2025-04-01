
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Marketplace } from '../../types/dashboard';
import MarketplaceCard from './MarketplaceCard';

interface MarketplaceListProps {
  items: Marketplace[];
}

const MarketplaceList: React.FC<MarketplaceListProps> = ({ items }) => {
  const volunteerItems = items.filter(item => item.type === 'volunteer');
  const fundraisingItems = items.filter(item => item.type === 'fundraising');

  const renderItems = (displayItems: Marketplace[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayItems.length > 0 ? (
        displayItems.map((item) => (
          <MarketplaceCard key={item.id} item={item} />
        ))
      ) : (
        <div className="col-span-3 text-center py-12">
          <p className="text-gray-500">No opportunities found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );

  return (
    <Tabs defaultValue="all" className="space-y-6">
      <TabsList>
        <TabsTrigger value="all">All Opportunities</TabsTrigger>
        <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
        <TabsTrigger value="fundraising">Fundraising</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="space-y-6">
        {renderItems(items)}
      </TabsContent>
      
      <TabsContent value="volunteer" className="space-y-6">
        {renderItems(volunteerItems)}
      </TabsContent>
      
      <TabsContent value="fundraising" className="space-y-6">
        {renderItems(fundraisingItems)}
      </TabsContent>
    </Tabs>
  );
};

export default MarketplaceList;
