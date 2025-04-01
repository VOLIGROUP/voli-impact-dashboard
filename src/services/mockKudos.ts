
import { Kudos } from '@/types/dashboard';

// Mock Kudos data
let mockKudos: Kudos[] = [
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
];

// Get kudos received by a user
export const getUserReceivedKudos = (userId: string): Kudos[] => {
  return mockKudos.filter(kudos => kudos.toUserId === userId);
};

// Get kudos given by a user
export const getUserGivenKudos = (userId: string): Kudos[] => {
  return mockKudos.filter(kudos => kudos.fromUserId === userId);
};

// Get unseen kudos for a user
export const getUnseenKudos = (userId: string): Kudos[] => {
  return mockKudos.filter(kudos => kudos.toUserId === userId && !kudos.seen);
};

// Add a new kudos
export const addKudos = (fromUserId: string, toUserId: string, message: string): Kudos => {
  const newKudos: Kudos = {
    id: `k${mockKudos.length + 1}`,
    fromUserId,
    toUserId,
    message,
    date: new Date().toISOString(),
    seen: false,
  };
  
  mockKudos.push(newKudos);
  return newKudos;
};

// Mark a kudos as seen
export const markKudosAsSeen = (kudosId: string): void => {
  mockKudos = mockKudos.map(kudos => 
    kudos.id === kudosId ? { ...kudos, seen: true } : kudos
  );
};

// Mark all kudos as seen for a user
export const markAllKudosAsSeenForUser = (userId: string): void => {
  mockKudos = mockKudos.map(kudos => 
    kudos.toUserId === userId ? { ...kudos, seen: true } : kudos
  );
};
