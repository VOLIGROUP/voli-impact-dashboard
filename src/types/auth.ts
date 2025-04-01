
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  organization?: string;
  organizationId?: string;
  companyLogo?: string;
  points: number;
  badges: string[];
  level: number;
  joinedAt: string;
  lastActive: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
}
