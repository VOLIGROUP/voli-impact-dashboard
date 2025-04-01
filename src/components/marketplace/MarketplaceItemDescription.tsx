
import React from 'react';
import { Marketplace } from '../../types/dashboard';

interface MarketplaceItemDescriptionProps {
  item: Marketplace;
}

const MarketplaceItemDescription: React.FC<MarketplaceItemDescriptionProps> = ({ item }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-3">About This {item.type === 'volunteer' ? 'Opportunity' : 'Campaign'}</h2>
        <p className="text-gray-700">{item.description}</p>
      </div>
      
      {item.impact && (
        <div>
          <h2 className="text-xl font-bold mb-3">Impact</h2>
          <p className="text-gray-700">{item.impact}</p>
        </div>
      )}
      
      {item.requirements && item.requirements.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3">Requirements</h2>
          <ul className="list-disc pl-5 space-y-1">
            {item.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">{req}</li>
            ))}
          </ul>
        </div>
      )}
      
      {item.contactInfo && (
        <div>
          <h2 className="text-xl font-bold mb-3">Contact Information</h2>
          <div className="flex items-center text-gray-700 mb-2">
            <span>{item.contactInfo}</span>
          </div>
          {item.websiteUrl && (
            <div className="flex items-center text-gray-700">
              <a 
                href={item.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Visit Website
              </a>
            </div>
          )}
        </div>
      )}
      
      {item.createdAt && (
        <div className="text-sm text-gray-500">
          Posted: {new Date(item.createdAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default MarketplaceItemDescription;
