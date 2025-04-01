
import { DashboardWidget } from '../types/dashboard';
import { groupActivitiesByMonth, getActivitiesByType, calculateHoursByType, calculateAmountsByType } from './activityAnalytics';
import { mockActivities } from './mockActivities';

// Prepare activity data for charts
const activityTypeDistribution = getActivitiesByType(mockActivities);
const hoursByType = calculateHoursByType(mockActivities);
const amountsByType = calculateAmountsByType(mockActivities);
const activitiesByMonth = groupActivitiesByMonth(mockActivities);

// Mock Dashboard Widgets
export const mockWidgets: DashboardWidget[] = [
  {
    id: '1',
    type: 'metric',
    title: 'Total Volunteering Hours',
    value: mockActivities.reduce((sum, activity) => sum + (activity.hours || 0), 0),
    change: 12.5,
    period: 'This Month',
    color: 'voli-primary',
    icon: 'clock',
  },
  {
    id: '2',
    type: 'metric',
    title: 'Average Hours per Volunteer',
    value: parseFloat((mockActivities.reduce((sum, activity) => sum + (activity.hours || 0), 0) / 
      (mockActivities.filter(a => a.type === 'volunteer').length || 1)).toFixed(1)),
    suffix: ' hrs',
    change: 5.2,
    period: 'This Month',
    color: 'blue-500',
    icon: 'users',
  },
  {
    id: '3',
    type: 'metric',
    title: 'Total Funds Raised',
    value: mockActivities.reduce((sum, activity) => sum + (activity.amountRaised || 0), 0),
    prefix: '$',
    change: 8.4,
    period: 'This Month',
    color: 'red-500',
    icon: 'heart',
  },
  {
    id: '4',
    type: 'metric',
    title: 'Total Impact Points',
    value: mockActivities.reduce((sum, activity) => sum + activity.points, 0),
    suffix: ' pts',
    change: 4.8,
    period: 'This Month',
    color: 'purple-500',
    icon: 'gift',
  },
  {
    id: '5',
    type: 'chart',
    chartType: 'bar',
    title: 'Activities by Type',
    chartData: [
      { name: 'Volunteer', value: activityTypeDistribution.volunteer || 0 },
      { name: 'Fundraising', value: activityTypeDistribution.fundraising || 0 },
      { name: 'Learning', value: activityTypeDistribution.learning || 0 },
      { name: 'Other', value: activityTypeDistribution.other || 0 },
    ],
    color: 'blue-500',
  },
  {
    id: '6',
    type: 'chart',
    chartType: 'line',
    title: 'Monthly Impact Points Trend',
    chartDataWithCategory: activitiesByMonth.map(item => ({
      name: item.month,
      value: item.points,
      category: 'Points'
    })),
    color: 'voli-primary',
  },
  {
    id: '7',
    type: 'chart',
    chartType: 'pie',
    title: 'Volunteer Hours by Activity Type',
    chartData: [
      { name: 'Volunteer', value: hoursByType.volunteer || 0 },
      { name: 'Learning', value: hoursByType.learning || 0 },
      { name: 'Other', value: hoursByType.other || 0 },
    ],
    color: 'green-500',
  },
  {
    id: '8',
    type: 'chart',
    chartType: 'area',
    title: 'Fundraising Amount by Type',
    chartData: [
      { name: 'Fundraising', value: amountsByType.fundraising || 0 },
      { name: 'Other', value: amountsByType.other || 0 },
    ],
    color: 'orange-500',
  },
  {
    id: '9',
    type: 'chart',
    chartType: 'line',
    title: 'Monthly Activities Trend',
    chartDataWithCategory: [
      ...activitiesByMonth.map(item => ({
        name: item.month,
        value: item.hours || 0,
        category: 'Hours'
      })),
      ...activitiesByMonth.map(item => ({
        name: item.month,
        value: item.amounts || 0,
        category: 'Amounts ($)'
      }))
    ],
    color: 'purple-500',
  },
  {
    id: '10',
    type: 'chart',
    chartType: 'bar',
    title: 'Impact Distribution',
    chartDataWithCategory: [
      { name: 'Community', value: 35, category: 'Hours' },
      { name: 'Environment', value: 28, category: 'Hours' },
      { name: 'Education', value: 22, category: 'Hours' },
      { name: 'Health', value: 15, category: 'Hours' },
      { name: 'Community', value: 1200, category: 'Funds ($)' },
      { name: 'Environment', value: 800, category: 'Funds ($)' },
      { name: 'Education', value: 600, category: 'Funds ($)' },
      { name: 'Health', value: 400, category: 'Funds ($)' },
    ],
    color: 'blue-400',
  },
  {
    id: '11',
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
    id: '12',
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
