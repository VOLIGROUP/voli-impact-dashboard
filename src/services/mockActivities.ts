
import { Activity } from '../types/dashboard';

// Mock activity data with guaranteed location information
export const mockActivities: Activity[] = [
  {
    id: 'act-001',
    userId: 'user1',
    title: 'Beach Cleanup Initiative',
    description: 'Volunteers cleaned up 50kg of plastic waste from the shoreline.',
    date: new Date().toISOString(),
    type: 'volunteer',
    points: 75,
    impact: 'Removed harmful waste from marine ecosystem',
    hours: 4,
    location: 'Santa Monica Beach, CA',
    coordinates: [-118.4912, 34.0195]
  },
  {
    id: 'act-002',
    userId: 'user2',
    title: 'Tree Planting Campaign',
    description: 'Community event to plant native trees and shrubs.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'volunteer',
    points: 60,
    impact: 'Contributing to urban greenery and carbon capture',
    hours: 3,
    location: 'Central Park, NY',
    coordinates: [-73.9654, 40.7829]
  },
  {
    id: 'act-003',
    userId: 'user1',
    title: 'Fundraising for Local School',
    description: 'Community fundraiser for school supplies and equipment.',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'fundraising',
    points: 90,
    impact: 'Improved educational resources for underprivileged students',
    amountRaised: 2500,
    location: 'Lincoln High School, Chicago',
    coordinates: [-87.6501, 41.8781]
  },
  {
    id: 'act-004',
    userId: 'user3',
    title: 'Food Drive Organization',
    description: 'Collected non-perishable food items for local food bank.',
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'volunteer',
    points: 55,
    impact: 'Provided meals for 150+ families in need',
    hours: 5,
    location: 'Community Food Bank, Houston',
    coordinates: [-95.3698, 29.7604]
  },
  {
    id: 'act-005',
    userId: 'user2',
    title: 'Coding Workshop for Kids',
    description: 'Teaching basic programming concepts to elementary school students.',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'learning',
    points: 45,
    impact: 'Introduced 30 children to STEM education',
    hours: 2,
    location: 'Tech Learning Center, San Francisco',
    coordinates: [-122.4194, 37.7749]
  },
  {
    id: 'act-006',
    userId: 'user3',
    title: 'River Cleanup Project',
    description: 'Volunteer team removed debris and trash from local watershed.',
    date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'volunteer',
    points: 70,
    impact: 'Improved water quality and protected wildlife',
    hours: 6,
    location: 'Hudson River, NY',
    coordinates: [-73.9261, 40.8722]
  },
  {
    id: 'act-007',
    userId: 'user1',
    title: 'Marathon Fundraiser',
    description: 'Raised money for cancer research by participating in city marathon.',
    date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'fundraising',
    points: 100,
    impact: 'Contributed to funding for breakthrough research',
    amountRaised: 3200,
    location: 'Boston Marathon Route',
    coordinates: [-71.0589, 42.3601]
  },
  {
    id: 'act-008',
    userId: 'user2',
    title: 'Homeless Shelter Assistance',
    description: 'Volunteered at local shelter serving meals and organizing donations.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'volunteer',
    points: 60,
    impact: 'Provided essential services to vulnerable population',
    hours: 4,
    location: 'Downtown Shelter, Seattle',
    coordinates: [-122.3321, 47.6062]
  },
  {
    id: 'act-009',
    userId: 'user3',
    title: 'Environmental Workshop',
    description: 'Educational session on sustainability practices for community members.',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'learning',
    points: 40,
    impact: 'Raised awareness about environmental issues',
    hours: 2,
    location: 'Community Center, Portland',
    coordinates: [-122.6784, 45.5152]
  },
  {
    id: 'act-010',
    userId: 'user1',
    title: 'Senior Center Support',
    description: 'Spent time with elderly residents, playing games and socializing.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'volunteer',
    points: 50,
    impact: 'Reduced isolation among seniors',
    hours: 3,
    location: 'Golden Years Center, Miami',
    coordinates: [-80.1918, 25.7617]
  }
];

// Generate some mock activities at various global locations
export const generateMockActivities = (): Activity[] => {
  return mockActivities;
};

// Get activities for a specific user
export const getUserActivities = (userId: string): Activity[] => {
  return mockActivities.filter(activity => activity.userId === userId);
};

// Get activities by type
export const getActivitiesByUserId = (userId: string): Activity[] => {
  return mockActivities.filter(activity => activity.userId === userId);
};

// Generate heatmap data for the global impact map
export const getHeatMapData = (): [number, number, number][] => {
  // Convert activity locations to heatmap format
  const heatmapData: [number, number, number][] = mockActivities.map(activity => {
    if (activity.coordinates) {
      // Use points as intensity (normalized between 0.2 and 1.0)
      const intensity = 0.2 + (activity.points / 100) * 0.8;
      return [activity.coordinates[0], activity.coordinates[1], intensity];
    }
    return [0, 0, 0]; // Fallback (shouldn't happen with our updated data)
  }).filter(point => point[0] !== 0 || point[1] !== 0); // Filter out any potential empty coordinates

  // Add some additional global hotspots for better visualization
  return [
    ...heatmapData,
    // Add major global cities as hotspots
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
    [55.2708, 25.2048, 0.7],   // Dubai
    [174.7633, -36.8485, 0.2], // Auckland
    [-99.1332, 19.4326, 0.6],  // Mexico City
    [106.8294, -6.1751, 0.4]   // Jakarta
  ];
};

// Get activities by coordinates (within a certain distance)
export const getActivitiesByLocation = (coordinates: [number, number]): Activity[] => {
  // Simple implementation - return activities closest to the given coordinates
  // In a real app, you would use a proper distance calculation
  
  // Calculate a rough distance between two coordinate points
  const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;
    return Math.sqrt(Math.pow(lon1 - lon2, 2) + Math.pow(lat1 - lat2, 2));
  };
  
  // Find activities within a threshold distance of the given coordinates
  const threshold = 5; // Arbitrary distance threshold
  const nearbyActivities = mockActivities.filter(activity => {
    if (!activity.coordinates) return false;
    const distance = calculateDistance(coordinates, activity.coordinates);
    return distance < threshold;
  });
  
  // If no activities are found nearby, return a few activities with the coordinates adjusted
  if (nearbyActivities.length === 0) {
    return mockActivities.slice(0, 3).map(activity => ({
      ...activity,
      coordinates: coordinates
    }));
  }
  
  return nearbyActivities;
};
