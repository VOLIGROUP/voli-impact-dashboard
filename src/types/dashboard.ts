
// Dashboard Types
export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'activity' | 'leaderboard';
  title: string;
  color?: string;
  icon?: 'clock' | 'users' | 'heart' | 'gift' | 'droplet';
  
  // For metric widgets
  value?: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  period?: string;
  
  // For chart widgets
  chartType?: 'bar' | 'line' | 'pie' | 'area';
  chartData?: Array<{ name: string; value: number }>;
  chartDataWithCategory?: Array<{ name: string; value: number; category: string }>;
  
  // For activity widgets
  activities?: Array<{ id: string; user: string; action: string; time: string }>;
  
  // For leaderboard widgets
  leaderboardData?: Array<{ id: string; name: string; score: number; avatar?: string }>;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  widgets: string[]; // Array of widget IDs
}

// Reporting Types
export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
  createdAt: string;
}

export interface Report {
  id: string;
  name: string;
  templateId: string;
  createdAt: string;
  createdBy: string;
  status: 'draft' | 'completed';
  downloadUrl: string;
}

// Activity Types
export interface Activity {
  id: string;
  userId: string;
  type: 'volunteer' | 'fundraising' | 'learning' | 'other';
  title: string;
  description: string;
  date: string;
  hours?: number;
  amountRaised?: number;
  impact: string;
  points: number;
}

// Marketplace Types
export interface ImpactCategory {
  id: string;
  name: string;
  color: string;
}

export interface Marketplace {
  id: string;
  type: 'volunteer' | 'fundraising';
  title: string;
  organization: string;
  location: string;
  description: string;
  image: string;
  impactCategory: string;
  sdgGoals?: string[]; // New field for multiple SDG goals
  
  // For volunteer opportunities
  commitment?: string;
  slots?: number;
  slotsFilled?: number;
  
  // For fundraising campaigns
  goal?: number;
  raised?: number;
  endDate?: string;
  
  // Additional fields
  impact?: string;
  requirements?: string[];
  contactInfo?: string;
  websiteUrl?: string;
  tags?: string[];
  createdAt?: string;
  
  points: number;
}
