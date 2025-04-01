
import { DashboardWidget } from '../types/dashboard';

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
    icon: 'clock',
  },
  {
    id: '2',
    type: 'metric',
    title: 'Average Hours per Volunteer',
    value: 18.5,
    suffix: ' hrs',
    change: 5.2,
    period: 'This Month',
    color: 'blue-500',
    icon: 'users',
  },
  {
    id: '3',
    type: 'metric',
    title: 'Blood Donations',
    value: 67,
    suffix: ' units',
    change: 8.4,
    period: 'This Month',
    color: 'red-500',
    icon: 'droplet',
  },
  {
    id: '4',
    type: 'metric',
    title: 'Item Donations',
    value: 872,
    suffix: ' items',
    change: 4.8,
    period: 'This Month',
    color: 'purple-500',
    icon: 'gift',
  },
  {
    id: '5',
    type: 'chart',
    chartType: 'bar',
    title: 'Volunteering by Cause',
    chartData: [
      { name: 'Community', value: 435 },
      { name: 'Environment', value: 325 },
      { name: 'Education', value: 280 },
      { name: 'Health', value: 175 },
      { name: 'Crisis', value: 25 },
    ],
    color: 'blue-500',
  },
  {
    id: '6',
    type: 'chart',
    chartType: 'line',
    title: 'Monthly Impact Trend',
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
    type: 'chart',
    chartType: 'pie',
    title: 'Impact Types Distribution',
    chartData: [
      { name: 'Volunteer Hours', value: 64 },
      { name: 'Blood Donation', value: 12 },
      { name: 'Item Donation', value: 18 },
      { name: 'Fundraising', value: 6 },
    ],
    color: 'green-500',
  },
  {
    id: '8',
    type: 'chart',
    chartType: 'area',
    title: 'Quarterly Donation Growth',
    chartData: [
      { name: 'Q1', value: 120 },
      { name: 'Q2', value: 240 },
      { name: 'Q3', value: 180 },
      { name: 'Q4', value: 320 },
    ],
    color: 'orange-500',
  },
  {
    id: '9',
    type: 'activity',
    title: 'Recent Impact Activities',
    activities: [
      { id: '1', user: 'Sarah Johnson', action: 'donated 2 units of blood at Red Cross', time: '2 hours ago' },
      { id: '2', user: 'Michael Chen', action: 'donated 50 books to local library', time: '5 hours ago' },
      { id: '3', user: 'Emily Rodriguez', action: 'volunteered 4 hours at animal shelter', time: '1 day ago' },
      { id: '4', user: 'David Park', action: 'contributed 12 hours for disaster relief', time: '2 days ago' },
    ],
  },
  {
    id: '10',
    type: 'leaderboard',
    title: 'Top Impact Contributors',
    leaderboardData: [
      { id: '1', name: 'Jessica Martinez', score: 48, avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', name: 'Daniel Wong', score: 42, avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: '3', name: 'Aisha Johnson', score: 36, avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: '4', name: 'Robert Kim', score: 32, avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: '5', name: 'Sophia Garcia', score: 28, avatar: 'https://i.pravatar.cc/150?img=5' },
    ],
  },
];

export const getWidgetById = (id: string): DashboardWidget | undefined => {
  return mockWidgets.find(widget => widget.id === id);
};
