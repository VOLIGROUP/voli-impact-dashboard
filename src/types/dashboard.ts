
export interface Activity {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  type: 'volunteer' | 'fundraising' | 'learning' | 'other';
  points: number;
  impact: string;
  hours?: number;
  amountRaised?: number;
  location?: string;
  coordinates?: [number, number]; // [longitude, latitude]
}

export interface Kudos {
  id: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  date: string;
  seen: boolean;
}

export interface Interest {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface UserRanking {
  rank: number;
  title: string;
  description: string;
}

export interface Charity {
  id: string;
  name: string;
  logo: string;
  mission: string;
  sdgs: string[];
  website?: string;
  location?: string;
  contactEmail?: string;
  phoneNumber?: string;
  founder?: string;
  foundedYear?: number;
  employees?: number;
  description?: string;
  causes?: string[];
  opportunities?: string[];
  totalRaised?: number;
  volunteerCount?: number;
  upcomingEvents?: Event[];
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  sdgFocus?: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'activity' | 'leaderboard';
  title: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  period?: string;
  color?: string;
  icon?: 'clock' | 'users' | 'heart' | 'gift' | 'droplet';
  chartType?: 'bar' | 'line' | 'pie' | 'area';
  chartData?: Array<{ name: string; value: number; }>;
  chartDataWithCategory?: Array<{ name: string; value: number; category: string; }>;
  activities?: Array<{ id: string; user: string; action: string; time: string; }>;
  leaderboardData?: Array<{ id: string; name: string; score: number; avatar?: string; }>;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgetIds: string[];
  userId?: string;
  isDefault?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Marketplace {
  id: string;
  title: string;
  description: string;
  organization: string;
  logo: string;
  impact: string;
  location: string;
  category: string;
  date: string;
  sdgs: string[];
  images?: string[];
  requiredSkills?: string[];
  commitmentHours?: number;
  contactEmail?: string;
  website?: string;
  isRemote?: boolean;
  isRecurring?: boolean;
  isPaid?: boolean;
  status?: string;
  coordinates?: [number, number]; // [longitude, latitude]
  
  // Additional fields used in components
  type: 'volunteer' | 'fundraising';
  image: string;
  impactCategory: string;
  sdgGoals: string[];
  points: number;
  commitment?: string;
  slots?: number;
  slotsFilled?: number;
  goal?: number;
  raised?: number;
  endDate?: string;
  requirements?: string[];
  contactInfo?: string;
  websiteUrl?: string;
  createdAt?: string;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  status: string;
  data: any;
  // Additional fields used in components
  createdBy?: string;
  downloadUrl?: string;
  templateId?: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  previewImage: string;
  // Additional fields used in components
  createdAt?: string;
  sections?: any[];
}

export interface ImpactCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  // Additional field used in components
  color: string;
}
