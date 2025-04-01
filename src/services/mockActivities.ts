
import { Activity } from '../types/dashboard';

// Mock User Activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    userId: '1',
    type: 'volunteer',
    title: 'Beach Cleanup',
    description: 'Organized community beach cleanup',
    date: '2023-06-10T09:00:00Z',
    hours: 4,
    impact: 'Removed 50kg of plastic waste',
    points: 120,
  },
  {
    id: '2',
    userId: '1',
    type: 'fundraising',
    title: 'Charity Run',
    description: 'Participated in 5K charity run',
    date: '2023-05-20T08:30:00Z',
    amountRaised: 350,
    impact: 'Funds supporting education for underprivileged children',
    points: 85,
  },
  {
    id: '3',
    userId: '2',
    type: 'volunteer',
    title: 'Food Bank Assistance',
    description: 'Helped sort and distribute food',
    date: '2023-06-05T10:00:00Z',
    hours: 3,
    impact: 'Prepared 200 meal packages',
    points: 90,
  },
  {
    id: '4',
    userId: '2',
    type: 'learning',
    title: 'Sustainability Workshop',
    description: 'Completed online course on sustainable business practices',
    date: '2023-06-18T14:00:00Z',
    hours: 2,
    impact: 'Applied new knowledge to reduce office waste by 15%',
    points: 60,
  },
];

// Utility function to get user activities
export const getUserActivities = (userId: string): Activity[] => {
  return mockActivities.filter(activity => activity.userId === userId);
};
