
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { 
  getDefaultDashboard, 
  getWidgetsForDashboard, 
  mockDashboards,
  mockWidgets 
} from '../services/mockData';
import AddImpactDataDialog from '@/components/impact/AddImpactDataDialog';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardContent from '@/components/dashboard/DashboardContent';
import WidgetRenderer from '@/components/dashboard/WidgetRenderer';
import { DashboardWidget } from '@/types/dashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedDashboardId, setSelectedDashboardId] = useState<string>(
    getDefaultDashboard()?.id || mockDashboards[0]?.id
  );
  const [impactDialogOpen, setImpactDialogOpen] = useState(false);
  
  const widgetIds = getWidgetsForDashboard(selectedDashboardId);
  const widgets = widgetIds
    .map(id => mockWidgets.find(w => w.id === id))
    .filter((widget): widget is DashboardWidget => widget !== undefined);
  
  const selectedDashboard = mockDashboards.find(d => d.id === selectedDashboardId);
  
  return (
    <Layout>
      <div className="space-y-6">
        <DashboardHeader 
          user={user}
          selectedDashboardId={selectedDashboardId}
          setSelectedDashboardId={setSelectedDashboardId}
          dashboards={mockDashboards}
          onOpenImpactDialog={() => setImpactDialogOpen(true)}
        />
        
        {selectedDashboard && (
          <DashboardContent 
            widgets={widgets} 
            renderWidget={WidgetRenderer} 
          />
        )}
      </div>
      
      <AddImpactDataDialog open={impactDialogOpen} onOpenChange={setImpactDialogOpen} />
    </Layout>
  );
};

export default Dashboard;
