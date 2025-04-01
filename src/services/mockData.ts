import { User } from '../types/auth';
import { 
  Dashboard, 
  DashboardWidget, 
  Report, 
  ReportTemplate, 
  Activity, 
  Marketplace, 
  ImpactCategory 
} from '../types/dashboard';
import { LeaderboardEntry } from '../components/dashboard/LeaderboardCard';

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

// Mock Dashboard Widgets
export const mockWidgets: DashboardWidget[] = [
  {
    id: '1',
    type: 'metric',
    title: 'Total Volunteering Hours',
    value: 1240,
    change: 12.5,
    period: 'This Month',
    color: 'voli-primary',
  },
  {
    id: '2',
    type: 'metric',
    title: 'Average Hours per Volunteer',
    value: 18.5,
    suffix: 'hours',
    change: 5.2,
    period: 'This Month',
    color: 'blue',
  },
  {
    id: '3',
    type: 'metric',
    title: 'Active Volunteers',
    value: 67,
    change: 8.4,
    period: 'This Month',
    color: 'purple',
  },
  {
    id: '4',
    type: 'metric',
    title: 'Community Impact Score',
    value: 87.3,
    suffix: '%',
    change: 4.8,
    period: 'This Month',
    color: 'orange',
  },
  {
    id: '5',
    type: 'chart',
    chartType: 'bar',
    title: 'Volunteering Hours by Category',
    chartData: [
      { name: 'Community Support', value: 435 },
      { name: 'Environmental', value: 325 },
      { name: 'Education', value: 280 },
      { name: 'Health Services', value: 175 },
      { name: 'Crisis Response', value: 25 },
    ],
    color: 'blue',
  },
  {
    id: '6',
    type: 'chart',
    chartType: 'line',
    title: 'Monthly Volunteer Hours',
    chartData: [
      { name: 'Jan', value: 180 },
      { name: 'Feb', value: 210 },
      { name: 'Mar', value: 240 },
      { name: 'Apr', value: 280 },
      { name: 'May', value: 320 },
      { name: 'Jun', value: 390 },
    ],
    color: 'voli-primary',
  },
  {
    id: '7',
    type: 'activity',
    title: 'Recent Volunteer Activities',
    activities: [
      { id: '1', user: 'Sarah Johnson', action: 'logged 8 hours at City Food Bank', time: '2 hours ago' },
      { id: '2', user: 'Michael Chen', action: 'completed 6 hours at Community Garden', time: '5 hours ago' },
      { id: '3', user: 'Emily Rodriguez', action: 'mentored students for 4 hours', time: '1 day ago' },
      { id: '4', user: 'David Park', action: 'volunteered 12 hours for disaster relief', time: '2 days ago' },
    ],
  },
  {
    id: '8',
    type: 'leaderboard',
    title: 'Top Volunteers',
    leaderboardData: [
      { id: '1', name: 'Jessica Martinez', score: 48, avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', name: 'Daniel Wong', score: 42, avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: '3', name: 'Aisha Johnson', score: 36, avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: '4', name: 'Robert Kim', score: 32, avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: '5', name: 'Sophia Garcia', score: 28, avatar: 'https://i.pravatar.cc/150?img=5' },
    ],
  },
];

// Mock Dashboards
export const mockDashboards: Dashboard[] = [
  {
    id: '1',
    name: 'Executive Overview',
    description: 'High-level metrics for leadership',
    isDefault: true,
    createdAt: '2023-01-20T10:00:00Z',
    updatedAt: '2023-06-15T14:30:00Z',
    widgets: ['1', '2', '3', '4', '5', '8'],
  },
  {
    id: '2',
    name: 'Volunteer Impact',
    description: 'Detailed view of volunteer activities',
    isDefault: false,
    createdAt: '2023-02-10T11:20:00Z',
    updatedAt: '2023-06-01T09:45:00Z',
    widgets: ['1', '2', '6', '7', '8'],
  },
  {
    id: '3',
    name: 'Fundraising',
    description: 'Financial impact and fundraising metrics',
    isDefault: false,
    createdAt: '2023-03-05T15:30:00Z',
    updatedAt: '2023-05-20T16:15:00Z',
    widgets: ['3', '5', '6', '7'],
  },
];

// Mock Report Templates
export const mockReportTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: 'B-Corp Impact Assessment',
    description: 'Standardized report for B-Corp certification',
    sections: [
      'Governance',
      'Workers',
      'Community',
      'Environment',
      'Customers',
    ],
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Annual Sustainability Report',
    description: 'Comprehensive yearly sustainability metrics',
    sections: [
      'Executive Summary',
      'Environmental Impact',
      'Social Impact',
      'Economic Impact',
      'Goals & Targets',
    ],
    createdAt: '2023-02-10T14:20:00Z',
  },
  {
    id: '3',
    name: 'Team Activity Summary',
    description: 'Overview of team volunteering and impact',
    sections: [
      'Participation Metrics',
      'Hours Contributed',
      'Impact Areas',
      'Recognition & Achievements',
    ],
    createdAt: '2023-03-05T09:30:00Z',
  },
  {
    id: '4',
    name: 'SDG Alignment Report',
    description: 'Report aligning activities with UN Sustainable Development Goals',
    sections: [
      'SDG Overview',
      'Goal-specific Contributions',
      'Metrics & Indicators',
      'Forward Planning',
    ],
    createdAt: '2023-04-12T11:45:00Z',
  },
];

// Mock Generated Reports
export const mockReports: Report[] = [
  {
    id: '1',
    name: 'Q2 2023 B-Corp Assessment',
    templateId: '1',
    createdAt: '2023-07-01T16:30:00Z',
    createdBy: 'Admin User',
    status: 'completed',
    downloadUrl: '#',
  },
  {
    id: '2',
    name: '2023 Annual Sustainability Report',
    templateId: '2',
    createdAt: '2023-06-15T10:45:00Z',
    createdBy: 'Admin User',
    status: 'draft',
    downloadUrl: '#',
  },
  {
    id: '3',
    name: 'Marketing Team Q1 Activity',
    templateId: '3',
    createdAt: '2023-04-02T14:20:00Z',
    createdBy: 'Demo User',
    status: 'completed',
    downloadUrl: '#',
  },
];

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

// Mock Marketplace Items
export const mockImpactCategories: ImpactCategory[] = [
  { id: '1', name: 'Environment', color: 'green' },
  { id: '2', name: 'Education', color: 'blue' },
  { id: '3', name: 'Health', color: 'red' },
  { id: '4', name: 'Community', color: 'purple' },
  { id: '5', name: 'Economic', color: 'orange' },
];

export const mockMarketplace: Marketplace[] = [
  {
    id: '1',
    type: 'volunteer',
    title: 'Community Garden Project',
    organization: 'Green Earth Initiative',
    location: 'Multiple Locations',
    description: 'Help build and maintain community gardens in urban areas',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    impactCategory: '1',
    commitment: '4-8 hours monthly',
    points: 120,
    slots: 25,
    slotsFilled: 18,
  },
  {
    id: '2',
    type: 'fundraising',
    title: 'Clean Water Initiative',
    organization: 'Water For All',
    location: 'Global',
    description: 'Fundraising campaign to provide clean water access in developing regions',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80',
    impactCategory: '3',
    goal: 50000,
    raised: 32750,
    endDate: '2023-08-30T23:59:59Z',
    points: 200,
  },
  {
    id: '3',
    type: 'volunteer',
    title: 'Literacy Program Tutor',
    organization: 'Readers of Tomorrow',
    location: 'Online',
    description: 'Become a virtual tutor for adult literacy programs',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1622&q=80',
    impactCategory: '2',
    commitment: '2 hours weekly',
    points: 100,
    slots: 50,
    slotsFilled: 37,
  },
  {
    id: '4',
    type: 'fundraising',
    title: 'Youth Sports Equipment',
    organization: 'Play It Forward',
    location: 'National',
    description: 'Raising funds to provide sports equipment to underserved communities',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1807&q=80',
    impactCategory: '4',
    goal: 25000,
    raised: 10875,
    endDate: '2023-09-15T23:59:59Z',
    points: 150,
  },
  {
    id: '5',
    type: 'volunteer',
    title: 'Habitat Construction',
    organization: 'Homes For Everyone',
    location: 'Multiple Cities',
    description: 'Help build affordable housing for families in need',
    image: 'https://images.unsplash.com/photo-1523575708161-ad0fc2a9b951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    impactCategory: '4',
    commitment: 'Full day events',
    points: 200,
    slots: 100,
    slotsFilled: 65,
  },
  {
    id: '6',
    type: 'fundraising',
    title: 'Renewable Energy Projects',
    organization: 'Future Power Initiative',
    location: 'Global',
    description: 'Funding small-scale renewable energy projects in rural communities',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    impactCategory: '5',
    goal: 75000,
    raised: 41200,
    endDate: '2023-10-01T23:59:59Z',
    points: 180,
  },
];

// Utility function to get dashboard by ID
export const getDashboardById = (id: string): Dashboard | undefined => {
  return mockDashboards.find(dashboard => dashboard.id === id);
};

// Utility function to get default dashboard
export const getDefaultDashboard = (): Dashboard | undefined => {
  return mockDashboards.find(dashboard => dashboard.isDefault);
};

// Utility function to get widgets for a dashboard
export const getWidgetsForDashboard = (dashboardId: string): DashboardWidget[] => {
  const dashboard = getDashboardById(dashboardId);
  if (!dashboard) return [];
  
  return dashboard.widgets
    .map(widgetId => mockWidgets.find(w => w.id === widgetId))
    .filter((widget): widget is DashboardWidget => widget !== undefined);
};

// Utility function to get user activities
export const getUserActivities = (userId: string): Activity[] => {
  return mockActivities.filter(activity => activity.userId === userId);
};
