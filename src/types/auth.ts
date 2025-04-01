
export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface Interest {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
  organization?: string;
  organizationId?: string;
  companyLogo?: string;
  points: number;
  badges: string[];
  level: number;
  joinedAt: string;
  lastActive: string;
  location?: string;
  coordinates?: [number, number]; // [longitude, latitude]
  skills?: Skill[];
  interests?: Interest[];
  sdgs?: string[];
  bio?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => Promise<User>;
}
