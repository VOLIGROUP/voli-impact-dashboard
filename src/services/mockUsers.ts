
import { User } from '../types/auth';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@voli.com',
    name: 'Admin User',
    role: 'admin',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
    organization: 'VOLI Headquarters',
    points: 1250,
    badges: ['Founder', 'Impact Leader', 'Community Builder'],
    level: 5,
    joinedAt: '2023-01-15T10:00:00Z',
    lastActive: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'user@voli.com',
    name: 'Demo User',
    role: 'user',
    avatarUrl: 'https://i.pravatar.cc/150?img=65',
    organization: 'Demo Company',
    points: 450,
    badges: ['Newcomer', 'Volunteer'],
    level: 2,
    joinedAt: '2023-03-20T14:30:00Z',
    lastActive: new Date().toISOString(),
  },
];

// Utility function to get user by id
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};
