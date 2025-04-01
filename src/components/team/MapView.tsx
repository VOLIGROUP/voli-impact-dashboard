
import React, { useEffect, useRef, useState } from 'react';
import { User } from '@/types/auth';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

interface MapViewProps {
  users: User[];
}

const MapView: React.FC<MapViewProps> = ({ users }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Group users by location
  const locationGroups: Record<string, User[]> = {};
  users.forEach(user => {
    if (user.location) {
      if (!locationGroups[user.location]) {
        locationGroups[user.location] = [];
      }
      locationGroups[user.location].push(user);
    }
  });

  useEffect(() => {
    if (!mapRef.current) return;
    
    setIsLoading(true);
    
    // Initialize Google Maps
    const initMap = async () => {
      try {
        // Access the Google Maps API
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        
        // Create the map instance
        const map = new Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
          mapId: 'VOLI_TEAM_MAP',
          mapTypeControl: false,
        });
        
        // Create bounds to fit all markers
        const bounds = new google.maps.LatLngBounds();
        
        // Add markers for each user with coordinates
        users.forEach(user => {
          if (user.coordinates && user.coordinates.length === 2) {
            const position = { 
              lat: user.coordinates[1], 
              lng: user.coordinates[0] 
            };
            
            // Add position to bounds
            bounds.extend(position);
            
            // Create the marker element
            const markerElement = document.createElement('div');
            markerElement.className = 'flex items-center justify-center';
            markerElement.style.width = '30px';
            markerElement.style.height = '30px';
            markerElement.style.borderRadius = '50%';
            markerElement.style.overflow = 'hidden';
            markerElement.style.border = '2px solid white';
            markerElement.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
            
            // Add avatar image or fallback
            if (user.avatarUrl) {
              const img = document.createElement('img');
              img.src = user.avatarUrl;
              img.alt = user.name;
              img.style.width = '100%';
              img.style.height = '100%';
              img.style.objectFit = 'cover';
              markerElement.appendChild(img);
            } else {
              markerElement.style.backgroundColor = '#3b82f6';
              markerElement.style.color = 'white';
              markerElement.style.display = 'flex';
              markerElement.style.alignItems = 'center';
              markerElement.style.justifyContent = 'center';
              markerElement.style.fontWeight = 'bold';
              markerElement.style.fontSize = '12px';
              const initials = user.name.split(' ')
                .map(n => n[0])
                .join('');
              markerElement.textContent = initials;
            }
            
            // Create and add the marker
            const marker = new AdvancedMarkerElement({
              map,
              position,
              content: markerElement,
              title: user.name,
            });
            
            // Add click listener for info popup
            marker.addListener('click', () => {
              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div class="p-2">
                    <h3 class="font-bold">${user.name}</h3>
                    <p>${user.role.replace('_', ' ')}</p>
                    <p class="text-xs text-gray-500">${user.organization || ''}</p>
                  </div>
                `
              });
              infoWindow.open(map, marker);
            });
          }
        });
        
        // Fit map to show all markers
        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, { padding: 50 });
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing Google Maps:', err);
        setError('Failed to load Google Maps. Please check your API key and try again.');
        setIsLoading(false);
      }
    };
    
    // Initialize the map
    initMap();
  }, [users]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="h-[500px] relative rounded-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-voli-primary animate-spin" />
              <span className="ml-2 text-gray-700">Loading map...</span>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-red-500 font-medium">{error}</p>
                <p className="text-gray-600 mt-2">
                  Make sure you've added a valid Google Maps API key in the HTML file.
                </p>
              </div>
            </div>
          )}
          
          <div ref={mapRef} className="absolute inset-0" />
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.keys(locationGroups).map(location => (
            <div key={location} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
              {location}: {locationGroups[location].length} team members
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
