
import { Activity } from '@/types/dashboard';

// Mock activities data
export const mockActivities: Activity[] = [
  {
    id: 'act1',
    userId: '1',
    title: 'Beach Cleanup Initiative',
    description: 'Led a team of 20 volunteers in a coastal cleanup operation',
    date: '2023-08-15T10:00:00Z',
    type: 'volunteer',
    points: 75,
    impact: 'Removed 250kg of plastic waste from local beaches',
    hours: 5,
    location: 'Melbourne, Australia',
    coordinates: [144.9631, -37.8136]
  },
  {
    id: 'act2',
    userId: '1',
    title: 'Environmental Fundraiser',
    description: 'Organized and hosted a virtual fundraising event',
    date: '2023-07-22T18:00:00Z',
    type: 'donation',
    points: 100,
    impact: 'Raised funds for reforestation projects',
    amountRaised: 3500,
    location: 'Sydney, Australia',
    coordinates: [151.2093, -33.8688]
  },
  {
    id: 'act3',
    userId: '3',
    title: 'Youth Mentorship Program',
    description: 'Mentored 5 students in career development',
    date: '2023-08-05T14:00:00Z',
    type: 'volunteer',
    points: 60,
    impact: 'Helped students develop professional skills and career paths',
    hours: 12,
    location: 'San Francisco, USA',
    coordinates: [-122.4194, 37.7749]
  },
  {
    id: 'act4',
    userId: '4',
    title: 'Tech Workshop for Nonprofits',
    description: 'Conducted training sessions on digital tools',
    date: '2023-07-30T09:30:00Z',
    type: 'volunteer',
    points: 50,
    impact: 'Improved digital literacy for 15 nonprofit organizations',
    hours: 8,
    location: 'Chicago, USA',
    coordinates: [-87.6298, 41.8781]
  },
  {
    id: 'act5',
    userId: '5',
    title: 'Design for Good Initiative',
    description: 'Created branding materials for a local charity',
    date: '2023-08-12T13:00:00Z',
    type: 'volunteer',
    points: 45,
    impact: 'Provided professional design assets valued at $2000',
    hours: 10,
    location: 'Berlin, Germany',
    coordinates: [13.4050, 52.5200]
  },
  {
    id: 'act6',
    userId: '1',
    title: 'Sustainability Conference',
    description: 'Keynote speaker at annual sustainability conference',
    date: '2023-06-18T11:00:00Z',
    type: 'event',
    points: 80,
    impact: 'Inspired over 200 attendees to adopt sustainable practices',
    hours: 3,
    location: 'Brisbane, Australia',
    coordinates: [153.0251, -27.4698]
  },
  {
    id: 'act7',
    userId: '3',
    title: 'Team Volunteer Day',
    description: 'Coordinated company-wide volunteer day at food bank',
    date: '2023-07-10T08:00:00Z',
    type: 'volunteer',
    points: 70,
    impact: 'Packed 1000+ meal kits for families in need',
    hours: 6,
    location: 'Los Angeles, USA',
    coordinates: [-118.2437, 34.0522]
  },
  {
    id: 'act8',
    userId: '4',
    title: 'Open Source Contribution',
    description: 'Developed features for a nonprofit\'s website',
    date: '2023-08-01T10:00:00Z',
    type: 'volunteer',
    points: 55,
    impact: 'Improved website accessibility and performance',
    hours: 15,
    location: 'Seattle, USA',
    coordinates: [-122.3321, 47.6062]
  },
  // Add more activities for other users
  {
    id: 'act9',
    userId: '6',
    title: 'Community Garden Project',
    description: 'Helped establish a community garden in an urban area',
    date: '2023-07-25T09:00:00Z',
    type: 'volunteer',
    points: 65,
    impact: 'Created sustainable food source for local community',
    hours: 20,
    location: 'Barcelona, Spain',
    coordinates: [2.1734, 41.3851]
  },
  {
    id: 'act10',
    userId: '7',
    title: 'Educational Workshop Series',
    description: 'Conducted workshops on sustainable living',
    date: '2023-08-08T15:30:00Z',
    type: 'event',
    points: 50,
    impact: 'Educated 75 community members on sustainable practices',
    hours: 6,
    location: 'Toronto, Canada',
    coordinates: [-79.3832, 43.6532]
  },
  // Add some activities for New York team members
  {
    id: 'act11',
    userId: '12',
    title: 'Corporate Sustainability Workshop',
    description: 'Led workshop for Fortune 500 companies on sustainability practices',
    date: '2023-07-15T13:00:00Z',
    type: 'event',
    points: 85,
    impact: 'Influenced sustainability policies at 5 major corporations',
    hours: 8,
    location: 'New York, USA',
    coordinates: [-74.0059, 40.7128]
  },
  {
    id: 'act12',
    userId: '13',
    title: 'Hackathon for Social Good',
    description: 'Organized coding marathon focused on nonprofit tech solutions',
    date: '2023-06-30T09:00:00Z',
    type: 'volunteer',
    points: 90,
    impact: 'Created 12 new tech solutions for local nonprofits',
    hours: 24,
    location: 'Boston, USA',
    coordinates: [-71.0589, 42.3601]
  },
  {
    id: 'act13',
    userId: '15',
    title: 'Digital Marketing Campaign',
    description: 'Pro bono marketing for environmental organizations',
    date: '2023-08-05T10:00:00Z',
    type: 'volunteer',
    points: 60,
    impact: 'Increased nonprofit engagement by 35%',
    hours: 15,
    location: 'Washington D.C., USA',
    coordinates: [-77.0369, 38.9072]
  },
  // Add some activities for London team members
  {
    id: 'act14',
    userId: '22',
    title: 'Sustainable Finance Summit',
    description: 'Organized panel discussions on ESG investing',
    date: '2023-07-20T11:00:00Z',
    type: 'event',
    points: 75,
    impact: 'Connected 30+ impact investors with sustainable startups',
    hours: 12,
    location: 'London, UK',
    coordinates: [-0.1278, 51.5074]
  },
  {
    id: 'act15',
    userId: '24',
    title: 'Design Sprint for Accessibility',
    description: 'Conducted design workshops for accessible products',
    date: '2023-08-10T14:00:00Z',
    type: 'volunteer',
    points: 65,
    impact: 'Improved accessibility for 3 nonprofit websites',
    hours: 18,
    location: 'Manchester, UK',
    coordinates: [-2.2426, 53.4808]
  },
  {
    id: 'act16',
    userId: '27',
    title: 'Thames River Cleanup',
    description: 'Led a team of volunteers in river cleanup',
    date: '2023-06-25T08:00:00Z',
    type: 'volunteer',
    points: 80,
    impact: 'Removed 300kg of waste from London waterways',
    hours: 6,
    location: 'London, UK',
    coordinates: [-0.1278, 51.5074]
  },
  // Adding more global activities
  {
    id: 'act17',
    userId: '2',
    title: 'Reforestation Project',
    description: 'Planted trees in deforested areas',
    date: '2023-07-05T09:00:00Z',
    type: 'volunteer',
    points: 85,
    impact: 'Planted 200 native trees to restore local ecosystem',
    hours: 10,
    location: 'Amazon Rainforest, Brazil',
    coordinates: [-60.0237, -3.1190]
  },
  {
    id: 'act18',
    userId: '8',
    title: 'Clean Water Initiative',
    description: 'Installed water filtration systems in rural villages',
    date: '2023-06-20T10:00:00Z',
    type: 'volunteer',
    points: 95,
    impact: 'Provided clean drinking water to 500+ people',
    hours: 30,
    location: 'Nairobi, Kenya',
    coordinates: [36.8219, -1.2921]
  },
  {
    id: 'act19',
    userId: '9',
    title: 'Education Accessibility Program',
    description: 'Distributed educational materials to underserved schools',
    date: '2023-08-02T11:00:00Z',
    type: 'donation',
    points: 70,
    impact: 'Supported education for 350 students',
    amountRaised: 2800,
    location: 'Mumbai, India',
    coordinates: [72.8777, 19.0760]
  },
  {
    id: 'act20',
    userId: '10',
    title: 'Coral Reef Conservation',
    description: 'Participated in coral planting and reef cleanup',
    date: '2023-07-18T08:30:00Z',
    type: 'volunteer',
    points: 75,
    impact: 'Helped restore 100 square meters of coral reef',
    hours: 15,
    location: 'Great Barrier Reef, Australia',
    coordinates: [145.7031, -16.2864]
  }
];

// Function to get activities for a specific user
export const getUserActivities = (userId: string): Activity[] => {
  return mockActivities.filter(activity => activity.userId === userId);
};

// Function to get all activities for reporting
export const getAllActivities = (): Activity[] => {
  return mockActivities;
};

// Get activities by location
export const getActivitiesByLocation = (coordinates: [number, number], radiusInKm: number = 100): Activity[] => {
  const toRadians = (degree: number) => degree * (Math.PI / 180);
  
  return mockActivities.filter(activity => {
    if (!activity.coordinates) return false;
    
    // Calculate distance using Haversine formula
    const earthRadiusKm = 6371;
    const dLat = toRadians(activity.coordinates[1] - coordinates[1]);
    const dLon = toRadians(activity.coordinates[0] - coordinates[0]);
    
    const lat1 = toRadians(coordinates[1]);
    const lat2 = toRadians(activity.coordinates[1]);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = earthRadiusKm * c;
    
    return distance <= radiusInKm;
  });
};

// Get heat map data
export const getHeatMapData = (): Array<[number, number, number]> => {
  // Group activities by coordinates and count them
  const locationCounts: Record<string, { coordinates: [number, number], count: number, points: number }> = {};
  
  mockActivities.forEach(activity => {
    if (!activity.coordinates) return;
    
    const key = `${activity.coordinates[0]},${activity.coordinates[1]}`;
    
    if (!locationCounts[key]) {
      locationCounts[key] = {
        coordinates: activity.coordinates,
        count: 0,
        points: 0
      };
    }
    
    locationCounts[key].count += 1;
    locationCounts[key].points += activity.points;
  });
  
  // Convert to heatmap data format [longitude, latitude, intensity]
  return Object.values(locationCounts).map(location => [
    location.coordinates[0],
    location.coordinates[1],
    location.points / 10 // Scale down points to get a reasonable intensity
  ]);
};
