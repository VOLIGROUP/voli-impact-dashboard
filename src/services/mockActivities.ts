import { Activity } from '../types/dashboard';

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    userId: '1',
    title: 'Beach Cleanup',
    description: 'Organized a team to clean up the local beach',
    date: '2023-06-15T09:00:00Z',
    type: 'volunteer',
    points: 150,
    impact: 'Environmental',
    hours: 4,
    location: 'Santa Monica Beach',
    coordinates: [-118.4912, 34.0195],
  },
  {
    id: '2',
    userId: '1',
    title: 'Food Bank Volunteering',
    description: 'Helped sort and distribute food at the local food bank',
    date: '2023-05-20T10:00:00Z',
    type: 'volunteer',
    points: 120,
    impact: 'Community',
    hours: 3,
    location: 'Downtown Food Bank',
    coordinates: [-118.2437, 34.0522],
  },
  {
    id: '3',
    userId: '1',
    title: 'Charity Run Fundraiser',
    description: 'Participated in a 5K run to raise funds for cancer research',
    date: '2023-04-10T08:00:00Z',
    type: 'fundraising',
    points: 200,
    impact: 'Health',
    hours: 2,
    amountRaised: 500,
    location: 'City Park',
    coordinates: [-118.3026, 34.0689],
  },
  {
    id: '4',
    userId: '2',
    title: 'Mentoring Session',
    description: 'Provided career guidance to underprivileged youth',
    date: '2023-06-05T15:00:00Z',
    type: 'volunteer',
    points: 100,
    impact: 'Education',
    hours: 2,
    location: 'Community Center',
    coordinates: [-118.2468, 34.0544],
  },
  {
    id: '5',
    userId: '2',
    title: 'Tree Planting Initiative',
    description: 'Planted trees in areas affected by deforestation',
    date: '2023-05-12T09:30:00Z',
    type: 'volunteer',
    points: 180,
    impact: 'Environmental',
    hours: 5,
    location: 'Highland Park',
    coordinates: [-118.1953, 34.1155],
  },
  {
    id: '6',
    userId: '3',
    title: 'Homeless Shelter Support',
    description: 'Prepared and served meals at a local homeless shelter',
    date: '2023-06-18T17:00:00Z',
    type: 'volunteer',
    points: 130,
    impact: 'Community',
    hours: 3,
    location: 'Hope Shelter',
    coordinates: [-118.2691, 34.0326],
  },
  {
    id: '7',
    userId: '3',
    title: 'Online Fundraising Campaign',
    description: 'Created and managed an online campaign for disaster relief',
    date: '2023-04-25T12:00:00Z',
    type: 'fundraising',
    points: 250,
    impact: 'Disaster Relief',
    amountRaised: 1200,
  },
  {
    id: '8',
    userId: '1',
    title: 'Sustainability Workshop',
    description: 'Attended a workshop on sustainable living practices',
    date: '2023-03-15T14:00:00Z',
    type: 'learning',
    points: 80,
    impact: 'Environmental',
    hours: 2,
    location: 'Community College',
    coordinates: [-118.2854, 34.0901],
  },
  {
    id: '9',
    userId: '2',
    title: 'Animal Shelter Volunteer',
    description: 'Helped care for animals at the local shelter',
    date: '2023-02-28T10:00:00Z',
    type: 'volunteer',
    points: 110,
    impact: 'Animal Welfare',
    hours: 4,
    location: 'Paws Rescue Center',
    coordinates: [-118.3340, 34.0966],
  },
  {
    id: '10',
    userId: '3',
    title: 'Charity Auction Donation',
    description: 'Donated items for a charity auction',
    date: '2023-01-20T18:00:00Z',
    type: 'other',
    points: 90,
    impact: 'Arts & Culture',
    location: 'City Gallery',
    coordinates: [-118.2501, 34.0573],
  },
  {
    id: '11',
    userId: '1',
    title: 'Coding Workshop for Kids',
    description: 'Taught basic programming concepts to elementary school students',
    date: '2023-05-05T15:30:00Z',
    type: 'volunteer',
    points: 140,
    impact: 'Education',
    hours: 3,
    location: 'Lincoln Elementary School',
    coordinates: [-118.2922, 34.0840],
  },
  {
    id: '12',
    userId: '2',
    title: 'Community Garden Project',
    description: 'Helped establish a community garden in an urban neighborhood',
    date: '2023-04-15T09:00:00Z',
    type: 'volunteer',
    points: 160,
    impact: 'Environmental',
    hours: 6,
    location: 'Urban Oasis Garden',
    coordinates: [-118.2783, 34.0611],
  },
];

// Utility function to get activities by user ID
export const getActivitiesByUserId = (userId: string): Activity[] => {
  return mockActivities.filter(activity => activity.userId === userId);
};

// Utility function to get user activities for components
export const getUserActivities = (userId: string): Activity[] => {
  return getActivitiesByUserId(userId);
};

// Utility function to get activity by ID
export const getActivityById = (id: string): Activity | undefined => {
  return mockActivities.find(activity => activity.id === id);
};

// Utility function to get total impact points by user ID
export const getTotalPointsByUserId = (userId: string): number => {
  return getActivitiesByUserId(userId).reduce((total, activity) => total + activity.points, 0);
};

// Utility function to get total volunteer hours by user ID
export const getTotalHoursByUserId = (userId: string): number => {
  return getActivitiesByUserId(userId)
    .filter(activity => activity.hours !== undefined)
    .reduce((total, activity) => total + (activity.hours || 0), 0);
};

// Utility function to get total amount raised by user ID
export const getTotalAmountRaisedByUserId = (userId: string): number => {
  return getActivitiesByUserId(userId)
    .filter(activity => activity.amountRaised !== undefined)
    .reduce((total, activity) => total + (activity.amountRaised || 0), 0);
};

// Utility function to add a new activity
export const addActivity = (activity: Omit<Activity, 'id'>): Activity => {
  const newId = String(mockActivities.length + 1);
  const newActivity = { ...activity, id: newId };
  mockActivities.push(newActivity);
  return newActivity;
};
