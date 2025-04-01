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
    google: typeof google;
    initMap: () => void;
  }
}

const MapView: React.FC<MapViewProps> = ({ users }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
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

  // Load Google Maps API
  useEffect(() => {
    if (!apiKey) return;
    
    try {
      // Clean up any existing script to avoid duplicates
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      
      // Define the callback function
      window.initMap = () => {
        setScriptLoaded(true);
        setMapLoaded(true);
      };
      
      // Create and add the script tag
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setError('Failed to load Google Maps API. Please check your API key.');
      };
      
      document.head.appendChild(script);
      
      return () => {
        // Clean up
        if (document.getElementById('google-maps-script')) {
          document.head.removeChild(script);
        }
        
        if (window.google && window.google.maps) {
          // This helps prevent issues with reloading the API
          delete window.google.maps;
        }
        
        delete window.initMap;
      };
    } catch (error) {
      setError('Error setting up Google Maps: ' + (error as Error).message);
    }
  }, [apiKey]);
  
  // Initialize map when API is loaded
  useEffect(() => {
    if (!mapContainer.current || !scriptLoaded || !window.google || !window.google.maps) return;
    
    try {
      initMap();
    } catch (error) {
      setError('Error initializing map: ' + (error as Error).message);
    }
  }, [scriptLoaded, users]);
  
  // Function to initialize Google Maps
  const initMap = () => {
    if (!mapContainer.current || !window.google || !window.google.maps) return;
    
    // Create a new map instance
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
    const markers: google.maps.Marker[] = [];
    
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
          }
        });
        
        markers.push(marker);
        
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
    
    // Notification that map is loaded
    if (markers.length > 0) {
      toast({
        title: "Map loaded",
        description: `Showing ${markers.length} team members across ${Object.keys(locationGroups).length} locations`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "No team members to display",
        description: "No team members have location data to display on the map",
      });
    }
  };
  
  // Function to handle API key change
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    setMapLoaded(false);
    setScriptLoaded(false);
    setError(null);
  };

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
            onChange={handleApiKeyChange}
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
                  Replace "YOUR_API_KEY" with your actual Google Maps API key
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
