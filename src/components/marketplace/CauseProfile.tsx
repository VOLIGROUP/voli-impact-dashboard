
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from 'lucide-react';
import { getImpactCategoryById } from '../../services/mockMarketplace';
import { Marketplace } from '../../types/dashboard';
import MarketplaceCard from './MarketplaceCard';

interface CauseProfileProps {
  causeId: string;
  opportunities: Marketplace[];
  onBackClick: () => void;
}

const CauseProfile: React.FC<CauseProfileProps> = ({ causeId, opportunities, onBackClick }) => {
  const cause = getImpactCategoryById(causeId);
  const relatedOpportunities = opportunities.filter(opp => opp.impactCategory === causeId);
  
  if (!cause) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Cause Not Found</h2>
        <p className="text-gray-500 mt-2">The cause you're looking for doesn't exist or has been removed.</p>
        <Button 
          onClick={onBackClick}
          className="mt-6 bg-voli-primary hover:bg-voli-secondary text-black"
        >
          Return to Marketplace
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBackClick}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Marketplace
      </Button>
      
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{cause.name}</CardTitle>
              <CardDescription className="mt-1">
                Explore opportunities to make an impact in this category
              </CardDescription>
            </div>
            <Badge 
              className="px-3 py-1.5 text-sm"
              style={{
                backgroundColor: `${cause.color}25`, 
                color: cause.color,
                border: `1px solid ${cause.color}50`
              }}
            >
              {cause.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="mt-2 mb-6">
              <h3 className="text-lg font-semibold mb-2">About this Cause Area</h3>
              <p className="text-gray-700">
                {getCauseDescription(cause.name)}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Opportunities in {cause.name} ({relatedOpportunities.length})
              </h3>
              
              {relatedOpportunities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedOpportunities.map(opportunity => (
                    <MarketplaceCard key={opportunity.id} item={opportunity} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No opportunities currently available in this category.</p>
                  <Button 
                    className="mt-4 bg-voli-primary hover:bg-voli-secondary text-black"
                    onClick={onBackClick}
                  >
                    Browse All Opportunities
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to provide descriptions for cause categories
const getCauseDescription = (causeName: string): string => {
  switch (causeName) {
    case "Environment":
      return "Environmental initiatives focus on preserving our planet, tackling climate change, protecting wildlife, and ensuring sustainable resource management. These opportunities help create a healthier and more sustainable world.";
    case "Education":
      return "Education causes work to improve access to quality learning opportunities for all ages. From literacy programs to mentoring, these initiatives empower people through knowledge and skills development.";
    case "Health":
      return "Health-focused opportunities address physical and mental wellbeing through medical support, awareness campaigns, research funding, and accessible healthcare initiatives. These efforts help build healthier communities.";
    case "Community":
      return "Community initiatives strengthen local connections and improve quality of life in neighborhoods and regions. These opportunities create vibrant, connected, and supportive communities where people can thrive.";
    case "Economic":
      return "Economic impact opportunities focus on financial empowerment, job creation, entrepreneurship, and poverty reduction. These initiatives help build more equitable and thriving economic systems.";
    default:
      return "This cause area encompasses important work that creates positive change in our world. Explore the opportunities to see how you can contribute.";
  }
};

export default CauseProfile;
