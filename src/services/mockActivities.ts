import { Activity } from '../types/dashboard';

// Generate some mock activities at various global locations
export const generateMockActivities = (): Activity[] => {
  // Implementation based on existing generation logic
  return [
    {
      id: 'activity-1',
      userId: 'user1',
      title: 'Beach Cleanup Initiative',
      description: 'Volunteers cleaned up 50kg of plastic waste from the shoreline.',
      date: new Date().toISOString(),
      type: 'volunteer',
      points: 75,
      impact: 'Removed harmful waste from marine ecosystem',
      hours: 4,
      location: 'Coastal Beach Area',
      coordinates: [-122.4194, 37.7749]
    },
    {
      id: 'activity-2',
      userId: 'user2',
      title: 'Tree Planting Campaign',
      description: 'Community event to plant native trees and shrubs.',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'volunteer',
      points: 60,
      impact: 'Contributing to urban greenery and carbon capture',
      hours: 3,
      location: 'City Park',
      coordinates: [-74.0060, 40.7128]
    },
    {
      id: 'activity-3',
      userId: 'user3',
      title: 'Fundraising for Local School',
      description: 'Community fundraiser for school supplies and equipment.',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'fundraising',
      points: 90,
      impact: 'Improved educational resources for underprivileged students',
      amountRaised: 2500,
      location: 'Community Center',
      coordinates: [-0.1278, 51.5074]
    }
  ];
};

// Generate heatmap data for the global impact map
export const getHeatMapData = (): [number, number, number][] => {
  // Return an array of [longitude, latitude, intensity] points
  return [
    [-122.4194, 37.7749, 0.8], // San Francisco
    [-74.0060, 40.7128, 0.9],  // New York
    [-0.1278, 51.5074, 0.7],   // London
    [2.3522, 48.8566, 0.5],    // Paris
    [13.4050, 52.5200, 0.6],   // Berlin
    [139.6917, 35.6895, 0.8],  // Tokyo
    [37.6173, 55.7558, 0.4],   // Moscow
    [121.4737, 31.2304, 0.9],  // Shanghai
    [77.2090, 28.6139, 0.7],   // New Delhi
    [28.0339, -26.2023, 0.5],  // Johannesburg
    [-58.3816, -34.6037, 0.4], // Buenos Aires
    [-46.6333, -23.5505, 0.7], // São Paulo
    [151.2093, -33.8688, 0.6], // Sydney
    [103.8198, 1.3521, 0.8],   // Singapore
    [30.0444, 31.2357, 0.3],   // Cairo
    [-79.3832, 43.6532, 0.5],  // Toronto
    [55.2708, 25.2048, 0.7],   // Dubai
    [174.7633, -36.8485, 0.2], // Auckland
    [-99.1332, 19.4326, 0.6],  // Mexico City
    [106.8294, -6.1751, 0.4]   // Jakarta
  ];
};

// Get activities by coordinates (within a certain distance)
export const getActivitiesByLocation = (coordinates: [number, number]): Activity[] => {
  // In a real app, you would filter activities that are close to the given coordinates
  // For now, we'll just return some mock activities
  return [
    {
      id: 'activity-location-1',
      userId: 'user1',
      title: 'Beach Cleanup Initiative',
      description: 'Volunteers cleaned up 50kg of plastic waste from the shoreline.',
      date: new Date().toISOString(),
      type: 'volunteer',
      points: 75,
      impact: 'Removed harmful waste from marine ecosystem',
      hours: 4,
      location: 'Coastal Beach Area',
      coordinates: coordinates
    },
    {
      id: 'activity-location-2',
      userId: 'user2',
      title: 'Tree Planting Campaign',
      description: 'Community event to plant native trees and shrubs.',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'volunteer',
      points: 60,
      impact: 'Contributing to urban greenery and carbon capture',
      hours: 3,
      location: 'City Park',
      coordinates: coordinates
    },
    {
      id: 'activity-location-3',
      userId: 'user3',
      title: 'Fundraising for Local School',
      description: 'Community fundraiser for school supplies and equipment.',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'fundraising',
      points: 90,
      impact: 'Improved educational resources for underprivileged students',
      amountRaised: 2500,
      location: 'Community Center',
      coordinates: coordinates
    }
  ];
};
