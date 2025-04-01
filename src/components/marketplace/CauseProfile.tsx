
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
  
  // Find opportunities that have this SDG as either primary or secondary
  const relatedOpportunities = opportunities.filter(opp => {
    return opp.impactCategory === causeId || 
           (opp.sdgGoals && opp.sdgGoals.includes(causeId));
  });
  
  if (!cause) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">SDG Not Found</h2>
        <p className="text-gray-500 mt-2">The Sustainable Development Goal you're looking for doesn't exist or has been removed.</p>
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
                Sustainable Development Goal {cause.id.replace('sdg', '')}
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
              <h3 className="text-lg font-semibold mb-2">About this SDG</h3>
              <p className="text-gray-700">
                {getSDGDescription(cause.id)}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Opportunities supporting {cause.name} ({relatedOpportunities.length})
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

// Helper function to provide descriptions for SDGs
const getSDGDescription = (sdgId: string): string => {
  switch (sdgId) {
    case "sdg1":
      return "End poverty in all its forms everywhere. This goal aims to ensure that all people, everywhere, have equal rights to economic resources and basic services.";
    case "sdg2":
      return "End hunger, achieve food security and improved nutrition and promote sustainable agriculture. This goal seeks to ensure sustainable food production and resilient agricultural practices.";
    case "sdg3":
      return "Ensure healthy lives and promote well-being for all at all ages. This goal addresses reducing maternal mortality, ending preventable deaths of newborns, and combating communicable diseases.";
    case "sdg4":
      return "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. This goal aims to ensure that all girls and boys have access to quality early childhood development and free education.";
    case "sdg5":
      return "Achieve gender equality and empower all women and girls. This goal focuses on ending discrimination, eliminating violence, and ensuring women's participation in leadership roles.";
    case "sdg6":
      return "Ensure availability and sustainable management of water and sanitation for all. This goal seeks to improve water quality, increase water-use efficiency, and protect water-related ecosystems.";
    case "sdg7":
      return "Ensure access to affordable, reliable, sustainable and modern energy for all. This goal promotes investment in renewable energy sources and expanding infrastructure for supplying modern and sustainable energy services.";
    case "sdg8":
      return "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all. This goal aims to achieve higher levels of economic productivity through diversification and technological upgrading.";
    case "sdg9":
      return "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation. This goal seeks to develop quality, reliable, sustainable and resilient infrastructure to support economic development.";
    case "sdg10":
      return "Reduce inequality within and among countries. This goal focuses on promoting social, economic and political inclusion, ensuring equal opportunity, and reducing inequalities of outcome.";
    case "sdg11":
      return "Make cities and human settlements inclusive, safe, resilient and sustainable. This goal aims to ensure access for all to adequate, safe and affordable housing and basic services.";
    case "sdg12":
      return "Ensure sustainable consumption and production patterns. This goal seeks to achieve the sustainable management and efficient use of natural resources.";
    case "sdg13":
      return "Take urgent action to combat climate change and its impacts. This goal focuses on strengthening resilience and adaptive capacity to climate-related hazards and natural disasters.";
    case "sdg14":
      return "Conserve and sustainably use the oceans, seas and marine resources for sustainable development. This goal aims to prevent and significantly reduce marine pollution, and sustainably manage and protect marine and coastal ecosystems.";
    case "sdg15":
      return "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.";
    case "sdg16":
      return "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.";
    case "sdg17":
      return "Strengthen the means of implementation and revitalize the global partnership for sustainable development. This goal focuses on enhancing global macroeconomic stability through policy coordination.";
    default:
      return "This Sustainable Development Goal is part of the United Nations 2030 Agenda for Sustainable Development, which provides a shared blueprint for peace and prosperity for people and the planet.";
  }
};

export default CauseProfile;
