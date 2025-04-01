
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
    hours: 5
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
    amountRaised: 3500
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
    hours: 12
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
    hours: 8
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
    hours: 10
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
    hours: 3
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
    hours: 6
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
    hours: 15
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
    hours: 20
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
    hours: 6
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
    hours: 8
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
    hours: 24
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
    hours: 15
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
    hours: 12
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
    hours: 18
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
    hours: 6
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
