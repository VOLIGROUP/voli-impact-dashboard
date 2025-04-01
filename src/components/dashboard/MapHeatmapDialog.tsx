
import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Award, Users, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { getHeatMapData, getActivitiesByLocation } from '@/services/mockActivities';
import { Activity } from '@/types/dashboard';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// This would typically come from environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby1sb3ZhYmxlIiwiYSI6ImNsbDkwYnVuMzBlM3Eza214Z2I2ajBmc2oifQ.aEBbafEbLdQ1jYxshS8hLQ';

interface MapHeatmapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MapHeatmapDialog: React.FC<MapHeatmapDialogProps> = ({
  open,
  onOpenChange
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Initialize map when dialog opens
  useEffect(() => {
    if (!open || !mapContainer.current) return;
    
    // Set the Mapbox access token
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    const initializeMap = () => {
      try {
        // Check if map already exists
        if (map.current) return;
        
        console.log("Initializing map...");
        
        // Create a new map instance
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [0, 20], // Center on the world
          zoom: 1.5,
        });
        
        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Listen for map load event
        map.current.on('load', () => {
          console.log("Map loaded successfully");
          if (!map.current) return;
          
          // Add heatmap data
          try {
            const heatmapData = getHeatMapData();
            console.log("Heat map data:", heatmapData.length, "points");
            
            map.current.addSource('impact-heatmap', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: heatmapData.map(point => ({
                  type: 'Feature',
                  properties: {
                    intensity: point[2]
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [point[0], point[1]]
                  }
                }))
              }
            });
            
            map.current.addLayer({
              id: 'impact-heatmap-layer',
              type: 'heatmap',
              source: 'impact-heatmap',
              paint: {
                'heatmap-weight': ['get', 'intensity'],
                'heatmap-intensity': 0.6,
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(33,102,172,0)',
                  0.2, 'rgb(103,169,207)',
                  0.4, 'rgb(209,229,240)',
                  0.6, 'rgb(253,219,199)',
                  0.8, 'rgb(239,138,98)',
                  1, 'rgb(178,24,43)'
                ],
                'heatmap-radius': 20,
                'heatmap-opacity': 0.8
              }
            });
            
            // Add actual points
            map.current.addSource('impact-points', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: heatmapData.map(point => ({
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [point[0], point[1]]
                  }
                }))
              }
            });
            
            map.current.addLayer({
              id: 'impact-points-layer',
              type: 'circle',
              source: 'impact-points',
              paint: {
                'circle-radius': 5,
                'circle-color': '#FFFFFF',
                'circle-stroke-width': 1,
                'circle-stroke-color': '#000000',
                'circle-opacity': 0.7
              }
            });
            
            // Add click event to show activities for a location
            map.current.on('click', 'impact-points-layer', (e) => {
              if (!e.features || e.features.length === 0 || !e.lngLat) return;
              
              const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
              const activities = getActivitiesByLocation(coordinates);
              
              if (activities.length === 0) return;
              
              setSelectedActivities(activities);
              setSelectedLocation(activities[0].location || 'Unknown location');
              
              // Fly to the selected location
              map.current?.flyTo({
                center: coordinates,
                zoom: 5,
                duration: 1000
              });
            });
          } catch (error) {
            console.error("Error setting up map layers:", error);
            setMapError("Failed to load map data.");
          }
        });
        
        // Handle map load errors
        map.current.on('error', (e) => {
          console.error("Mapbox error:", e);
          setMapError("An error occurred while loading the map.");
        });
        
      } catch (error) {
        console.error("Map initialization error:", error);
        setMapError("Failed to initialize the map.");
      }
    };
    
    // Initialize the map
    initializeMap();
    
    // Cleanup function
    return () => {
      if (map.current) {
        // Don't remove the map on cleanup to avoid flickering on re-open
        // map.current.remove();
        // map.current = null;
      }
    };
  }, [open]);
  
  // When dialog closes, reset the selected activities
  useEffect(() => {
    if (!open) {
      setSelectedActivities([]);
      setSelectedLocation(null);
      setMapError(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">Global Impact Heatmap</DialogTitle>
          <DialogDescription>
            Explore where our impact is happening around the world
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden p-6 gap-4">
          {/* Map Container */}
          <div className="w-full md:w-2/3 h-[50vh] md:h-full relative rounded-md overflow-hidden border">
            <div 
              ref={mapContainer} 
              className="absolute inset-0"
              style={{ backgroundColor: '#132035' }} // Fallback color if map doesn't load
            />
            
            {mapError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80">
                <div className="text-center p-4">
                  <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
                  <p className="text-gray-800 font-medium">{mapError}</p>
                  <p className="text-sm text-gray-600 mt-1">Please try refreshing the page or check your connection.</p>
                </div>
              </div>
            ) : (
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-2 rounded-md text-xs font-medium">
                Click on highlighted areas to see impact details
              </div>
            )}
          </div>
          
          {/* Activity Details */}
          <Card className="w-full md:w-1/3 h-[30vh] md:h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-4 w-4" />
                {selectedLocation || 'Select a location from the map'}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-hidden p-4">
              {selectedActivities.length > 0 ? (
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-4">
                    {selectedActivities.map(activity => (
                      <Card key={activity.id} className="bg-accent/50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold">{activity.title}</h4>
                          
                          <div className="text-sm text-muted-foreground mt-1 space-y-2">
                            <p>{activity.description}</p>
                            
                            <div className="flex items-center gap-1 text-xs">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                {format(new Date(activity.date), 'PPP')}
                              </span>
                            </div>
                            
                            {activity.hours && (
                              <div className="flex items-center gap-1 text-xs">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{activity.hours} hours</span>
                              </div>
                            )}
                            
                            {activity.amountRaised && (
                              <div className="flex items-center gap-1 text-xs">
                                <Award className="h-3.5 w-3.5" />
                                <span>${activity.amountRaised} raised</span>
                              </div>
                            )}
                            
                            <div className="flex flex-wrap gap-1 mt-2">
                              <Badge variant="outline" className="bg-primary/10">
                                {activity.type}
                              </Badge>
                              <Badge variant="outline" className="bg-primary/10">
                                {activity.points} points
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="h-full flex items-center justify-center text-center p-6 text-muted-foreground">
                  <div>
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p>Click on a highlighted area on the map to see impact activities for that location.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapHeatmapDialog;
