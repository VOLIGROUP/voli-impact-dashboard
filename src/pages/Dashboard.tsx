
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { getDefaultDashboard, getWidgetsForDashboard, mockDashboards } from '../services/mockData';
import { DashboardWidget } from '../types/dashboard';
import MetricCard from '../components/dashboard/MetricCard';
import ChartCard from '../components/dashboard/ChartCard';
import ActivityCard from '../components/dashboard/ActivityCard';
import LeaderboardCard from '../components/dashboard/LeaderboardCard';
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutGrid, Settings2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedDashboardId, setSelectedDashboardId] = useState<string>(
    getDefaultDashboard()?.id || mockDashboards[0]?.id
  );
  
  const widgets = getWidgetsForDashboard(selectedDashboardId);
  const selectedDashboard = mockDashboards.find(d => d.id === selectedDashboardId);
  
  const renderWidget = (widget: DashboardWidget) => {
    switch (widget.type) {
      case 'metric':
        return (
          <MetricCard
            key={widget.id}
            title={widget.title}
            value={widget.value || 0}
            prefix={widget.prefix}
            suffix={widget.suffix}
            change={widget.change}
            period={widget.period}
            color={widget.color}
          />
        );
        
      case 'chart':
        return (
          <ChartCard
            key={widget.id}
            title={widget.title}
            chartType={widget.chartType || 'bar'}
            data={widget.chartData || []}
            color={widget.color}
          />
        );
        
      case 'activity':
        return (
          <ActivityCard
            key={widget.id}
            title={widget.title}
            activities={widget.activities || []}
          />
        );
        
      case 'leaderboard':
        return (
          <LeaderboardCard
            key={widget.id}
            title={widget.title}
            data={widget.leaderboardData || []}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">
              Welcome back, {user?.name}! Here's your impact overview.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select 
              value={selectedDashboardId}
              onValueChange={setSelectedDashboardId}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select a dashboard" />
              </SelectTrigger>
              <SelectContent>
                {mockDashboards.map((dashboard) => (
                  <SelectItem key={dashboard.id} value={dashboard.id}>
                    {dashboard.name}
                    {dashboard.isDefault && (
                      <span className="ml-2 text-xs text-gray-500">(Default)</span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Settings2 className="h-4 w-4" />
            </Button>
            
            <Button className="bg-voli-primary hover:bg-voli-secondary text-black">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Dashboard
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-white">
            <span className="h-2 w-2 rounded-full bg-voli-primary mr-1" />
            {user?.level && `Level ${user.level}`}
          </Badge>
          
          <Badge variant="outline" className="bg-white">
            <span className="h-2 w-2 rounded-full bg-blue-500 mr-1" />
            {user?.points && `${user.points} Impact Points`}
          </Badge>
          
          {user?.badges && user.badges.length > 0 && (
            <Badge variant="outline" className="bg-white">
              <span className="h-2 w-2 rounded-full bg-purple-500 mr-1" />
              {user.badges.length} {user.badges.length === 1 ? 'Badge' : 'Badges'}
            </Badge>
          )}
        </div>
        
        {selectedDashboard && (
          <div>
            <Tabs defaultValue="grid" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="grid">
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Grid View
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="grid" className="space-y-4">
                {/* Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {widgets
                    .filter(widget => widget.type === 'metric')
                    .map(widget => renderWidget(widget))}
                </div>
                
                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {widgets
                    .filter(widget => widget.type === 'chart')
                    .map(widget => renderWidget(widget))}
                </div>
                
                {/* Activity and Leaderboard Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {widgets
                    .filter(widget => widget.type === 'activity' || widget.type === 'leaderboard')
                    .map(widget => renderWidget(widget))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
