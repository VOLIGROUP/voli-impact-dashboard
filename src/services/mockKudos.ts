
import { Kudos } from '../types/dashboard';

// Mock kudos data
const mockKudos: Kudos[] = [
  {
    id: 'k1',
    fromUserId: '3',
    toUserId: '1',
    message: 'Thanks for your leadership on the beach cleanup project!',
    date: '2023-07-10T09:00:00Z',
    seen: true,
  },
  {
    id: 'k2',
    fromUserId: '4',
    toUserId: '1',
    message: 'Your guidance on the volunteer program has been invaluable.',
    date: '2023-07-15T14:30:00Z',
    seen: true,
  },
  {
    id: 'k3',
    fromUserId: '1',
    toUserId: '3',
    message: 'Great job leading the Melbourne team this quarter!',
    date: '2023-07-08T11:20:00Z',
    seen: true,
  },
  {
    id: 'k4',
    fromUserId: '5',
    toUserId: '4',
    message: 'Your technical support on the app made all the difference.',
    date: '2023-07-12T16:45:00Z',
    seen: true,
  },
  {
    id: 'k5',
    fromUserId: '2',
    toUserId: '5',
    message: 'The design work you did for our last campaign was outstanding!',
    date: '2023-07-20T10:15:00Z',
    seen: false,
  },
  {
    id: 'k6',
    fromUserId: '6',
    toUserId: '3',
    message: 'Thank you for all your help with onboarding me to the team.',
    date: '2023-08-05T13:20:00Z',
    seen: false,
  },
];

// Get all kudos for a specific user
export const getKudosForUser = (userId: string): Kudos[] => {
  return mockKudos.filter(kudos => kudos.toUserId === userId);
};

// Get unseen kudos for a user
export const getUnseenKudos = (userId: string): Kudos[] => {
  return mockKudos.filter(kudos => kudos.toUserId === userId && !kudos.seen);
};

// Mark kudos as seen
export const markKudosAsSeen = (kudosId: string): void => {
  const kudos = mockKudos.find(k => k.id === kudosId);
  if (kudos) {
    kudos.seen = true;
  }
};

// Mark all kudos as seen for a user
export const markAllKudosAsSeenForUser = (userId: string): void => {
  mockKudos.forEach(kudos => {
    if (kudos.toUserId === userId) {
      kudos.seen = true;
    }
  });
};

// Add a new kudos
export const addKudos = (fromUserId: string, toUserId: string, message: string): Kudos => {
  const newKudos: Kudos = {
    id: `k${mockKudos.length + 1}`,
    fromUserId,
    toUserId,
    message,
    date: new Date().toISOString(),
    seen: false
  };
  
  mockKudos.push(newKudos);
  return newKudos;
};

export default mockKudos;
