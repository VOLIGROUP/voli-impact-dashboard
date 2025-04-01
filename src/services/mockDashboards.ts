import { Dashboard } from '../types/dashboard';
import { mockWidgets } from './mockWidgets';

// Mock Dashboards
export const mockDashboards: Dashboard[] = [
  {
    id: '1',
    name: 'Executive Overview',
    description: 'High-level metrics for leadership',
    isDefault: true,
    createdAt: '2023-01-20T10:00:00Z',
    updatedAt: '2023-06-15T14:30:00Z',
    widgets: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  },
  {
    id: '2',
    name: 'Volunteer Impact',
    description: 'Detailed view of volunteer activities',
    isDefault: false,
    createdAt: '2023-02-10T11:20:00Z',
    updatedAt: '2023-06-01T09:45:00Z',
    widgets: ['1', '2', '7', '9', '6', '11'],
  },
  {
    id: '3',
    name: 'Fundraising',
    description: 'Financial impact and fundraising metrics',
    isDefault: false,
    createdAt: '2023-03-05T15:30:00Z',
    updatedAt: '2023-05-20T16:15:00Z',
    widgets: ['3', '8', '10', '12', '9', '11'],
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
export const getWidgetsForDashboard = (dashboardId: string): Dashboard['widgets'] => {
  const dashboard = getDashboardById(dashboardId);
  return dashboard ? dashboard.widgets : [];
};

// Function to add a new dashboard
export const addDashboard = (name: string, description: string): Dashboard => {
  const newId = String(mockDashboards.length + 1);
  const now = new Date().toISOString();
  
  const newDashboard: Dashboard = {
    id: newId,
    name,
    description,
    isDefault: false,
    createdAt: now,
    updatedAt: now,
    widgets: [],
  };
  
  mockDashboards.push(newDashboard);
  return newDashboard;
};

// Function to add a widget to a dashboard
export const addWidgetToDashboard = (dashboardId: string, widgetId: string): void => {
  const dashboard = getDashboardById(dashboardId);
  if (dashboard) {
    dashboard.widgets.push(widgetId);
    dashboard.updatedAt = new Date().toISOString();
  }
};

// Function to remove a widget from a dashboard
export const removeWidgetFromDashboard = (dashboardId: string, widgetId: string): void => {
  const dashboard = getDashboardById(dashboardId);
  if (dashboard) {
    dashboard.widgets = dashboard.widgets.filter(id => id !== widgetId);
    dashboard.updatedAt = new Date().toISOString();
  }
};
