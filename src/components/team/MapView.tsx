
import React, { useEffect, useRef, useState } from 'react';
import { User } from '@/types/auth';
import { Card, CardContent } from "@/components/ui/card";

interface MapViewProps {
  users: User[];
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const MapView: React.FC<MapViewProps> = ({ users }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  
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

  // Function to initialize Google Maps
  const initMap = () => {
    if (!mapContainer.current || !window.google || !window.google.maps) return;
    
    const map = new window.google.maps.Map(mapContainer.current, {
      center: { lat: 0, lng: 0 },
      zoom: 2,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });
    
    const bounds = new window.google.maps.LatLngBounds();
    const infoWindow = new window.google.maps.InfoWindow();
    
    // Add markers for each user
    users.forEach(user => {
      if (user.coordinates) {
        const [lng, lat] = user.coordinates;
        const position = { lat, lng };
        
        // Extend bounds to include this point
        bounds.extend(position);
        
        // Create a custom marker
        const marker = new window.google.maps.Marker({
          position,
          map,
          title: user.name,
          icon: {
            url: user.avatarUrl || 'https://i.pravatar.cc/40',
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            borderRadius: 15
          }
        });
        
        // Create popup content
        const content = `
          <div class="p-3">
            <div class="flex items-center mb-2">
              <img src="${user.avatarUrl || 'https://i.pravatar.cc/40'}" class="w-10 h-10 rounded-full mr-3" />
              <div>
                <h3 class="font-bold">${user.name}</h3>
                <p class="text-sm text-gray-600">${user.role}</p>
              </div>
            </div>
            ${user.organization ? `<p class="text-sm text-gray-500">${user.organization}</p>` : ''}
            <p class="text-sm text-gray-500">${user.location}</p>
          </div>
        `;
        
        // Add click listener for the popup
        marker.addListener("click", () => {
          infoWindow.setContent(content);
          infoWindow.open({
            anchor: marker,
            map,
          });
        });
      }
    });
    
    // Fit map to show all markers
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
      
      // Set a minimum zoom level
      const listener = window.google.maps.event.addListener(map, "idle", () => {
        if (map.getZoom() > 12) {
          map.setZoom(12);
        }
        window.google.maps.event.removeListener(listener);
      });
    }
  };
  
  // Load Google Maps API
  useEffect(() => {
    if (!apiKey) return;
    
    // Define the callback function
    window.initMap = () => {
      setMapLoaded(true);
    };
    
    // Create and add the script tag
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    return () => {
      // Clean up
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, [apiKey]);
  
  // Initialize map when API is loaded
  useEffect(() => {
    if (mapLoaded) {
      initMap();
    }
  }, [mapLoaded, users]);
  
  // Function to handle API key change
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-4">
          <label htmlFor="google-maps-key" className="block text-sm font-medium text-gray-700 mb-1">
            Google Maps API Key (for demonstration purposes only)
          </label>
          <input
            id="google-maps-key"
            type="text"
            value={apiKey}
            onChange={handleApiKeyChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            placeholder="Enter your Google Maps API key"
          />
          <p className="text-xs text-gray-500 mt-1">
            For your own app, get a key from <a href="https://console.cloud.google.com/google/maps-apis/overview" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Cloud Console</a>
          </p>
        </div>
        <div className="h-[500px] relative rounded-lg overflow-hidden">
          {!apiKey && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Enter a Google Maps API key to view the map</p>
            </div>
          )}
          <div ref={mapContainer} className="absolute inset-0" />
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
