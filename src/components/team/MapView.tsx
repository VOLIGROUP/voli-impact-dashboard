
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { User } from '@/types/auth';
import { Card, CardContent } from "@/components/ui/card";

// You would normally store this in an environment variable
// This is a temporary solution for demonstration purposes
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNscXJ5czBnMDEwdmYya3A5ZmZ5OGdqNXcifQ.0X_I_ksf5Rw8dsNQrr7gIQ';

interface MapViewProps {
  users: User[];
}

const MapView: React.FC<MapViewProps> = ({ users }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(MAPBOX_TOKEN);

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
    if (!mapContainer.current) return;
    
    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    const initialCoordinates = users[0]?.coordinates || [0, 0];
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: initialCoordinates,
      zoom: 1.5,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      // Add markers for each user
      users.forEach(user => {
        if (user.coordinates) {
          // Create a popup for the user
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div class="p-2">
              <h3 class="font-bold">${user.name}</h3>
              <p class="text-sm text-gray-600">${user.role}</p>
              <p class="text-xs text-gray-500">${user.organization || ''}</p>
            </div>`
          );

          // Create a custom marker element
          const el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundImage = user.avatarUrl ? `url(${user.avatarUrl})` : '';
          el.style.width = '30px';
          el.style.height = '30px';
          el.style.backgroundSize = 'cover';
          el.style.borderRadius = '50%';
          el.style.border = '2px solid #fff';
          el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          
          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat(user.coordinates)
            .setPopup(popup)
            .addTo(map.current!);
        }
      });

      // Fit map to show all markers
      const bounds = new mapboxgl.LngLatBounds();
      users.forEach(user => {
        if (user.coordinates) {
          bounds.extend(user.coordinates as [number, number]);
        }
      });
      
      if (!bounds.isEmpty()) {
        map.current!.fitBounds(bounds, {
          padding: 50,
          maxZoom: 12
        });
      }
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [users, mapboxToken]);

  // Function to handle Mapbox token change
  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapboxToken(e.target.value);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-4">
          <label htmlFor="mapbox-token" className="block text-sm font-medium text-gray-700 mb-1">
            Mapbox Token (for demonstration purposes only)
          </label>
          <input
            id="mapbox-token"
            type="text"
            value={mapboxToken}
            onChange={handleTokenChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            placeholder="Enter your Mapbox token"
          />
          <p className="text-xs text-gray-500 mt-1">
            For your own app, get a token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>
          </p>
        </div>
        <div className="h-[500px] relative rounded-lg overflow-hidden">
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
