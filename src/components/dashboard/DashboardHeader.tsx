
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Settings2, Clock, MapPin } from 'lucide-react';
import { User } from '@/types/auth';
import { Dashboard } from '@/types/dashboard';

interface DashboardHeaderProps {
  user: User | null;
  selectedDashboardId: string;
  setSelectedDashboardId: (id: string) => void;
  dashboards: Dashboard[];
  onOpenImpactDialog: () => void;
  onOpenNewDashboardDialog: () => void;
  onAddWidget: () => void;
  hasWidgets: boolean;
  onOpenMapDialog: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  selectedDashboardId,
  setSelectedDashboardId,
  dashboards,
  onOpenImpactDialog,
  onOpenNewDashboardDialog,
  onAddWidget,
  hasWidgets,
  onOpenMapDialog
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Impact Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Select 
          value={selectedDashboardId}
          onValueChange={setSelectedDashboardId}
        >
          <SelectTrigger className="w-[220px] justify-between">
            <SelectValue placeholder="Select a dashboard" className="text-left" />
          </SelectTrigger>
          <SelectContent>
            {dashboards.map((dashboard) => (
              <SelectItem key={dashboard.id} value={dashboard.id} className="flex items-center justify-between">
                <span className="text-left">{dashboard.name}</span>
                {dashboard.isDefault && (
                  <span className="ml-2 text-xs text-gray-500">(Default)</span>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={onOpenMapDialog}
          title="View Global Impact Heatmap"
        >
          <MapPin className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
        
        {hasWidgets && (
          <Button 
            onClick={onAddWidget}
            className="bg-voli-primary hover:bg-voli-secondary text-black"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Widget
          </Button>
        )}
        
        <Button 
          onClick={onOpenImpactDialog} 
          className="bg-voli-primary hover:bg-voli-secondary text-black"
        >
          <Clock className="h-4 w-4 mr-2" />
          Log Impact
        </Button>
        
        <Button 
          onClick={onOpenNewDashboardDialog}
          className="bg-voli-primary hover:bg-voli-secondary text-black"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Dashboard
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
