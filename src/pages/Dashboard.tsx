
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { 
  getDefaultDashboard, 
  getWidgetsForDashboard, 
  mockDashboards,
  addDashboard,
  addWidgetToDashboard
} from '../services/mockDashboards';
import { mockWidgets } from '../services/mockWidgets';
import AddImpactDataDialog from '@/components/impact/AddImpactDataDialog';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardContent from '@/components/dashboard/DashboardContent';
import CreateDashboardDialog from '@/components/dashboard/CreateDashboardDialog';
import AddWidgetDialog from '@/components/dashboard/AddWidgetDialog';
import WidgetRenderer from '@/components/dashboard/WidgetRenderer';
import { DashboardWidget } from '@/types/dashboard';
import { toast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { getActivitiesByType, calculateHoursByType, calculateAmountsByType } from '@/services/activityAnalytics';
import { mockActivities } from '@/services/mockActivities';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedDashboardId, setSelectedDashboardId] = useState<string>(
    getDefaultDashboard()?.id || mockDashboards[0]?.id
  );
  const [impactDialogOpen, setImpactDialogOpen] = useState(false);
  const [newDashboardDialogOpen, setNewDashboardDialogOpen] = useState(false);
  const [addWidgetDialogOpen, setAddWidgetDialogOpen] = useState(false);
  const [dashboards, setDashboards] = useState(mockDashboards);
  
  const widgetIds = getWidgetsForDashboard(selectedDashboardId);
  const widgets = widgetIds
    .map(id => mockWidgets.find(w => w.id === id))
    .filter((widget): widget is DashboardWidget => widget !== undefined);
  
  const selectedDashboard = dashboards.find(d => d.id === selectedDashboardId);
  
  const handleCreateDashboard = (name: string, description: string) => {
    const newDashboard = addDashboard(name, description);
    setDashboards([...dashboards]);
    setSelectedDashboardId(newDashboard.id);
    toast({
      title: "Dashboard Created",
      description: `${name} dashboard has been created. Add widgets to get started.`,
    });
    setAddWidgetDialogOpen(true);
  };
  
  const handleAddWidget = (widgetType: string, title: string) => {
    const newWidgetId = String(mockWidgets.length + 1);
    const newWidget: DashboardWidget = {
      id: newWidgetId,
      type: widgetType as 'metric' | 'chart' | 'activity' | 'leaderboard',
      title: title,
    };
    
    // Populate widget with real data based on type
    switch (widgetType) {
      case 'metric':
        // Total volunteer hours as default metric
        newWidget.value = mockActivities.reduce((sum, activity) => sum + (activity.hours || 0), 0);
        newWidget.prefix = '';
        newWidget.suffix = ' hrs';
        newWidget.change = 12.5;
        newWidget.period = 'Last Month';
        newWidget.color = 'voli-primary';
        newWidget.icon = 'clock';
        break;
        
      case 'chart':
        newWidget.chartType = 'bar';
        // Use real activity type distribution
        const activityTypeDistribution = getActivitiesByType(mockActivities);
        newWidget.chartData = [
          { name: 'Volunteer', value: activityTypeDistribution.volunteer || 0 },
          { name: 'Fundraising', value: activityTypeDistribution.fundraising || 0 },
          { name: 'Learning', value: activityTypeDistribution.learning || 0 },
          { name: 'Other', value: activityTypeDistribution.other || 0 },
        ];
        newWidget.color = 'blue-500';
        break;
        
      case 'activity':
        // Use a subset of recent activities
        newWidget.activities = [
          { id: '1', user: 'Sarah Johnson', action: 'donated 2 units of blood at Red Cross', time: '2 hours ago' },
          { id: '2', user: 'Michael Chen', action: 'donated 50 books to local library', time: '5 hours ago' },
          { id: '3', user: 'Emily Rodriguez', action: 'volunteered 4 hours at animal shelter', time: '1 day ago' },
        ];
        break;
        
      case 'leaderboard':
        // Use a subset of the leaderboard data
        newWidget.leaderboardData = [
          { id: '1', name: 'Jessica Martinez', score: 48, avatar: 'https://i.pravatar.cc/150?img=1' },
          { id: '2', name: 'Daniel Wong', score: 42, avatar: 'https://i.pravatar.cc/150?img=2' },
          { id: '3', name: 'Aisha Johnson', score: 36, avatar: 'https://i.pravatar.cc/150?img=3' },
        ];
        break;
    }
    
    mockWidgets.push(newWidget);
    
    addWidgetToDashboard(selectedDashboardId, newWidgetId);
    
    toast({
      title: "Widget Added",
      description: `${title} widget has been added to your dashboard.`,
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <DashboardHeader 
          user={user}
          selectedDashboardId={selectedDashboardId}
          setSelectedDashboardId={setSelectedDashboardId}
          dashboards={dashboards}
          onOpenImpactDialog={() => setImpactDialogOpen(true)}
          onOpenNewDashboardDialog={() => setNewDashboardDialogOpen(true)}
          onAddWidget={() => setAddWidgetDialogOpen(true)}
          hasWidgets={widgets.length > 0}
        />
        
        {selectedDashboard && widgets.length > 0 ? (
          <DashboardContent 
            widgets={widgets} 
            renderWidget={WidgetRenderer} 
          />
        ) : selectedDashboard && widgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow">
            <h2 className="text-xl font-medium mb-2">No widgets yet</h2>
            <p className="text-gray-500 mb-6 text-center">
              This dashboard doesn't have any widgets. Add your first widget to get started.
            </p>
            <Button 
              onClick={() => setAddWidgetDialogOpen(true)}
              className="bg-voli-primary hover:bg-voli-secondary text-black"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Widget
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center p-12 bg-white rounded-lg shadow">
            <p>No dashboard selected</p>
          </div>
        )}
      </div>
      
      <AddImpactDataDialog open={impactDialogOpen} onOpenChange={setImpactDialogOpen} />
      
      <CreateDashboardDialog 
        open={newDashboardDialogOpen}
        onOpenChange={setNewDashboardDialogOpen}
        onCreateDashboard={handleCreateDashboard}
      />
      
      <AddWidgetDialog
        open={addWidgetDialogOpen}
        onOpenChange={setAddWidgetDialogOpen}
        onAddWidget={handleAddWidget}
      />
    </Layout>
  );
};

export default Dashboard;
