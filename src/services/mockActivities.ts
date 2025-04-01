import { Activity } from '@/types/dashboard';

// Mock Activities Data
export const mockActivities: Activity[] = [
  {
    id: '1',
    userId: '101',
    title: 'Coastal Cleanup Initiative',
    description: 'Volunteers cleaned up litter along the beach, focusing on plastic waste.',
    date: '2023-01-15T08:00:00Z',
    type: 'volunteer',
    points: 50,
    impact: 'Environmental Conservation',
    hours: 4,
    location: 'Santa Monica Beach',
    coordinates: [-118.4912, 34.0043],
  },
  {
    id: '2',
    userId: '102',
    title: 'Community Garden Planting',
    description: 'Planted organic vegetables and herbs in the community garden.',
    date: '2023-02-20T10:00:00Z',
    type: 'volunteer',
    points: 40,
    impact: 'Community Development',
    hours: 3,
    location: 'Echo Park',
    coordinates: [-118.2507, 34.0723],
  },
  {
    id: '3',
    userId: '103',
    title: 'Fundraising Gala for Education',
    description: 'Organized a gala to raise funds for educational programs in underserved communities.',
    date: '2023-03-10T18:00:00Z',
    type: 'fundraising',
    points: 75,
    impact: 'Education',
    amountRaised: 5000,
    location: 'Beverly Hills Hotel',
    coordinates: [-118.4004, 34.0773],
  },
  {
    id: '4',
    userId: '104',
    title: 'Coding Workshop for Teens',
    description: 'Conducted a coding workshop to introduce teenagers to programming.',
    date: '2023-04-05T14:00:00Z',
    type: 'learning',
    points: 60,
    impact: 'Education',
    hours: 2,
    location: 'Local Library',
    coordinates: [-118.2437, 34.0522],
  },
  {
    id: '5',
    userId: '105',
    title: 'Blood Donation Drive',
    description: 'Organized a blood donation drive to support local hospitals.',
    date: '2023-05-12T09:00:00Z',
    type: 'donation',
    points: 55,
    impact: 'Health',
    hours: 5,
    location: 'Community Center',
    coordinates: [-118.1697, 34.1480],
  },
  {
    id: '6',
    userId: '106',
    title: 'Environmental Awareness Campaign',
    description: 'Launched a campaign to raise awareness about environmental issues.',
    date: '2023-06-22T11:00:00Z',
    type: 'other',
    points: 45,
    impact: 'Environmental Conservation',
    hours: 3,
    location: 'City Park',
    coordinates: [-118.2851, 34.0205],
  },
  {
    id: '7',
    userId: '107',
    title: 'Homeless Shelter Volunteering',
    description: 'Volunteered at a homeless shelter, serving meals and providing support.',
    date: '2023-07-08T16:00:00Z',
    type: 'volunteer',
    points: 65,
    impact: 'Community Development',
    hours: 4,
    location: 'Downtown Shelter',
    coordinates: [-118.2437, 34.0522],
  },
  {
    id: '8',
    userId: '108',
    title: 'Marathon for Charity',
    description: 'Participated in a marathon to raise money for cancer research.',
    date: '2023-08-15T07:00:00Z',
    type: 'fundraising',
    points: 80,
    impact: 'Health',
    amountRaised: 10000,
    location: 'Los Angeles',
    coordinates: [-118.2437, 34.0522],
  },
  {
    id: '9',
    userId: '109',
    title: 'Online Course on Sustainability',
    description: 'Completed an online course to learn about sustainable practices.',
    date: '2023-09-01T00:00:00Z',
    type: 'learning',
    points: 50,
    impact: 'Environmental Conservation',
    hours: 10,
    location: 'Online',
    coordinates: [-118.2437, 34.0522],
  },
  {
    id: '10',
    userId: '110',
    title: 'Clothing Donation Drive',
    description: 'Collected and donated clothing to a local charity.',
    date: '2023-10-10T12:00:00Z',
    type: 'donation',
    points: 40,
    impact: 'Community Development',
    hours: 2,
    location: 'Local Charity',
    coordinates: [-118.2437, 34.0522],
  },
  {
    id: '11',
    userId: '101',
    title: 'Tree Planting Event',
    description: 'Planted trees in a local park to improve air quality.',
    date: '2023-11-03T09:00:00Z',
    type: 'volunteer',
    points: 60,
    impact: 'Environmental Conservation',
    hours: 5,
    location: 'Griffith Park',
    coordinates: [-118.2921, 34.1365],
  },
  {
    id: '12',
    userId: '102',
    title: 'Thanksgiving Food Drive',
    description: 'Collected and distributed food to families in need for Thanksgiving.',
    date: '2023-11-23T14:00:00Z',
    type: 'donation',
    points: 55,
    impact: 'Community Development',
    hours: 4,
    location: 'Community Center',
    coordinates: [-118.1697, 34.1480],
  },
  {
    id: '13',
    userId: '103',
    title: 'Holiday Toy Drive',
    description: 'Organized a toy drive to provide gifts for children during the holidays.',
    date: '2023-12-15T10:00:00Z',
    type: 'fundraising',
    points: 70,
    impact: 'Community Development',
    amountRaised: 3000,
    location: 'Various Locations',
    coordinates: [-118.2437, 34.0522],
  },
  {
    id: '14',
    userId: '104',
    title: 'First Aid Training Workshop',
    description: 'Conducted a workshop to teach basic first aid skills.',
    date: '2024-01-20T13:00:00Z',
    type: 'learning',
    points: 65,
    impact: 'Health',
    hours: 3,
    location: 'Red Cross Center',
    coordinates: [-118.2437, 34.0522],
  },
  {
    id: '15',
    userId: '105',
    title: 'Beach Cleanup',
    description: 'Volunteers cleaned up trash and debris from the beach.',
    date: '2024-02-10T09:00:00Z',
    type: 'volunteer',
    points: 50,
    impact: 'Environmental Conservation',
    hours: 4,
    location: 'Venice Beach',
    coordinates: [-118.4694, 33.9850],
  },
  {
    id: '16',
    userId: '106',
    title: 'Tutoring Program for Students',
    description: 'Provided tutoring services to students in math and science.',
    date: '2024-03-05T15:00:00Z',
    type: 'volunteer',
    points: 60,
    impact: 'Education',
    hours: 2,
    location: 'Local School',
    coordinates: [-118.2437, 34.0522],
  },
  {
    id: '17',
    userId: '107',
    title: 'Charity Run for Cancer',
    description: 'Participated in a charity run to raise money for cancer research.',
    date: '2024-04-01T08:00:00Z',
    type: 'fundraising',
    points: 75,
    impact: 'Health',
    amountRaised: 7500,
    location: 'City Park',
    coordinates: [-118.2851, 34.0205],
  },
  {
    id: '18',
    userId: '108',
    title: 'Workshop on Climate Change',
    description: 'Conducted a workshop to educate people about climate change.',
    date: '2024-05-18T11:00:00Z',
    type: 'learning',
    points: 55,
    impact: 'Environmental Conservation',
    hours: 3,
    location: 'Community Center',
    coordinates: [-118.1697, 34.1480],
  },
  {
    id: '19',
    userId: '109',
    title: 'Food Bank Volunteering',
    description: 'Volunteered at a food bank, sorting and distributing food to those in need.',
    date: '2024-06-12T14:00:00Z',
    type: 'volunteer',
    points: 65,
    impact: 'Community Development',
    hours: 4,
    location: 'Local Food Bank',
    coordinates: [-118.2437, 34.0522],
  },
  {
    id: '20',
    userId: '110',
    title: 'Book Donation Drive',
    description: 'Collected and donated books to a local library.',
    date: '2024-07-01T10:00:00Z',
    type: 'donation',
    points: 45,
    impact: 'Education',
    hours: 2,
    location: 'Local Library',
    coordinates: [-118.2437, 34.0522],
  },
];

// Function to filter activities by user ID
export const getUserActivities = (userId: string) => {
  return mockActivities.filter(activity => activity.userId === userId);
};

// Function to get heatmap data from activities
export const getHeatMapData = (): [number, number, number][] => {
  // Convert existing coordinates from activities to the format needed by heatmap
  return mockActivities
    .filter(activity => activity.coordinates)
    .map(activity => {
      const [lng, lat] = activity.coordinates || [0, 0];
      // Add an intensity value as the third element (can be based on hours, points, etc.)
      const intensity = activity.points / 10; // Normalized intensity value
      return [lng, lat, intensity];
    });
};

// Add a function to get activities by location
export const getActivitiesByLocation = (): Record<string, any[]> => {
  const locationMap: Record<string, any[]> = {};
  
  mockActivities.forEach(activity => {
    if (activity.location) {
      if (!locationMap[activity.location]) {
        locationMap[activity.location] = [];
      }
      locationMap[activity.location].push(activity);
    }
  });
  
  return locationMap;
};

// Function to group activities by type
export const getActivitiesByType = (activities: Activity[]) => {
  return activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {});
};

// Function to calculate total hours by activity type
export const calculateHoursByType = (activities: Activity[]) => {
  return activities.reduce((acc, activity) => {
    if (activity.hours) {
      acc[activity.type] = (acc[activity.type] || 0) + activity.hours;
    }
    return acc;
  }, {});
};

// Function to calculate total amounts by activity type
export const calculateAmountsByType = (activities: Activity[]) => {
  return activities.reduce((acc, activity) => {
    if (activity.amountRaised) {
      acc[activity.type] = (acc[activity.type] || 0) + activity.amountRaised;
    }
    return acc;
  }, {});
};

// Function to group activities by month
export const groupActivitiesByMonth = (activities: Activity[]) => {
  const grouped = activities.reduce((acc, activity) => {
    const month = new Date(activity.date).toLocaleString('default', { month: 'long' });
    if (!acc[month]) {
      acc[month] = {
        month: month,
        points: 0,
        hours: 0,
        amounts: 0,
      };
    }
    acc[month].points += activity.points;
    acc[month].hours += activity.hours || 0;
    acc[month].amounts += activity.amountRaised || 0;
    return acc;
  }, {});

  return Object.values(grouped);
};
