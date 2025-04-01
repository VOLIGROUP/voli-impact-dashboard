
import React, { useEffect, useRef, useState } from 'react';
import { User } from '@/types/auth';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";

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

  // Initialize map when API key is provided
  useEffect(() => {
    if (!apiKey || !mapContainer.current) return;
    
    // Update the API key in the inline script
    try {
      const script = document.querySelector('script:first-of-type');
      if (script) {
        const scriptContent = script.textContent;
        if (scriptContent && scriptContent.includes('INSERT_YOUR_API_KEY')) {
          const updatedContent = scriptContent.replace('INSERT_YOUR_API_KEY', apiKey);
          script.textContent = updatedContent;
        }
      }
      
      // Define the initMap function
      window.initMap = async function() {
        try {
          // Clear any previous error
          setError(null);
          
          // Import necessary libraries
          const { Map } = await window.google.maps.importLibrary("maps");
          const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker");
          
          // Create a new map instance
          const map = new Map(mapContainer.current, {
            zoom: 2,
            center: { lat: 0, lng: 0 },
            mapId: "TEAM_MAP",
          });
          
          const bounds = new window.google.maps.LatLngBounds();
          const infoWindow = new window.google.maps.InfoWindow();
          
          // Add markers for each user with coordinates
          let markersAdded = 0;
          
          users.forEach(user => {
            if (user.coordinates) {
              const [lng, lat] = user.coordinates;
              const position = { lat, lng };
              
              // Extend bounds to include this point
              bounds.extend(position);
              
              // Create marker element
              const pinElement = new PinElement({
                background: "#9b87f5",
                borderColor: "#7E69AB",
                glyphColor: "#FFFFFF",
              });
              
              // Create the marker
              const marker = new AdvancedMarkerElement({
                map,
                position,
                title: user.name,
                content: pinElement.element,
              });
              
              markersAdded++;
              
              // Create popup content
              const content = `
                <div style="padding: 12px;">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <img src="${user.avatarUrl || 'https://i.pravatar.cc/40'}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px;" />
                    <div>
                      <h3 style="font-weight: bold; margin: 0;">${user.name}</h3>
                      <p style="font-size: 14px; color: #666; margin: 0;">${user.role}</p>
                    </div>
                  </div>
                  ${user.organization ? `<p style="font-size: 14px; color: #666; margin: 0;">${user.organization}</p>` : ''}
                  <p style="font-size: 14px; color: #666; margin: 0;">${user.location}</p>
                </div>
              `;
              
              // Add click listener for the popup
              marker.addEventListener("click", () => {
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
            const listener = google.maps.event.addListener(map, "idle", () => {
              if (map.getZoom() > 12) {
                map.setZoom(12);
              }
              google.maps.event.removeListener(listener);
            });
          }
          
          // Notification that map is loaded
          setMapLoaded(true);
          if (markersAdded > 0) {
            toast({
              title: "Map loaded",
              description: `Showing ${markersAdded} team members across ${Object.keys(locationGroups).length} locations`,
            });
          } else {
            toast({
              variant: "destructive",
              title: "No team members to display",
              description: "No team members have location data to display on the map",
            });
          }
        } catch (err) {
          console.error("Error initializing map:", err);
          setError(`Error initializing map: ${err instanceof Error ? err.message : String(err)}`);
          setMapLoaded(false);
        }
      };
      
      // Start loading the map
      window.initMap();
      
    } catch (err) {
      console.error("Error setting up map:", err);
      setError(`Error setting up map: ${err instanceof Error ? err.message : String(err)}`);
      setMapLoaded(false);
    }
    
    // Cleanup function
    return () => {
      delete window.initMap;
    };
  }, [apiKey, users, locationGroups]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-4">
          <label htmlFor="google-maps-key" className="block text-sm font-medium text-gray-700 mb-1">
            Google Maps API Key
          </label>
          <input
            id="google-maps-key"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            placeholder="Enter your Google Maps API key"
          />
          <p className="text-xs text-gray-500 mt-1">
            For your own app, get a key from <a href="https://console.cloud.google.com/google/maps-apis/overview" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Cloud Console</a>
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="h-[500px] relative rounded-lg overflow-hidden">
          {!apiKey && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center p-6">
                <Info className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500 mb-2">Enter a Google Maps API key to view the map</p>
                <p className="text-xs text-gray-400">
                  You need to provide a valid Google Maps API key to view the map
                </p>
              </div>
            </div>
          )}
          
          {apiKey && !mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 border-4 border-voli-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500">Loading Google Maps...</p>
              </div>
            </div>
          )}
          
          <div ref={mapContainer} className="absolute inset-0" id="map" />
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
