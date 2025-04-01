
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { DashboardWidget } from '@/types/dashboard';
import WidgetRenderer from './WidgetRenderer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { mockActivities } from '@/services/mockActivities';
import { getActivitiesByType, calculateHoursByType, calculateAmountsByType } from '@/services/activityAnalytics';

interface AddWidgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWidget: (widgetType: string, title: string) => void;
}

const AddWidgetDialog: React.FC<AddWidgetDialogProps> = ({
  open,
  onOpenChange,
  onAddWidget
}) => {
  const [widgetType, setWidgetType] = useState('');
  const [widgetTitle, setWidgetTitle] = useState('');
  const [previewWidget, setPreviewWidget] = useState<DashboardWidget | null>(null);
  const [useExistingData, setUseExistingData] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie' | 'area'>('bar');
  
  // Generate preview widget whenever form values change
  useEffect(() => {
    if (!widgetType) {
      setPreviewWidget(null);
      return;
    }

    const widget: DashboardWidget = {
      id: 'preview',
      type: widgetType as 'metric' | 'chart' | 'activity' | 'leaderboard',
      title: widgetTitle || 'Widget Preview',
    };

    // Set default data based on widget type
    switch (widgetType) {
      case 'metric':
        widget.value = useExistingData ? 
          mockActivities.reduce((sum, activity) => sum + (activity.hours || 0), 0) : 0;
        widget.prefix = '';
        widget.suffix = useExistingData ? ' hrs' : '';
        widget.change = useExistingData ? 12.5 : undefined;
        break;
      case 'chart':
        widget.chartType = chartType;
        if (useExistingData) {
          if (chartType === 'pie') {
            const hoursByType = calculateHoursByType(mockActivities);
            widget.chartData = [
              { name: 'Volunteer', value: hoursByType.volunteer || 0 },
              { name: 'Learning', value: hoursByType.learning || 0 },
              { name: 'Other', value: hoursByType.other || 0 },
            ];
          } else {
            const activityTypeDistribution = getActivitiesByType(mockActivities);
            widget.chartData = [
              { name: 'Volunteer', value: activityTypeDistribution.volunteer || 0 },
              { name: 'Fundraising', value: activityTypeDistribution.fundraising || 0 },
              { name: 'Learning', value: activityTypeDistribution.learning || 0 },
              { name: 'Other', value: activityTypeDistribution.other || 0 },
            ];
          }
        } else {
          widget.chartData = [
            { name: 'Category 1', value: 30 },
            { name: 'Category 2', value: 20 },
            { name: 'Category 3', value: 15 },
          ];
        }
        break;
      case 'activity':
        widget.activities = useExistingData ? [
          { id: '1', user: 'Sarah Johnson', action: 'donated 2 units of blood at Red Cross', time: '2 hours ago' },
          { id: '2', user: 'Michael Chen', action: 'donated 50 books to local library', time: '5 hours ago' },
        ] : [
          { id: '1', user: 'Example User', action: 'completed an activity', time: 'Just now' }
        ];
        break;
      case 'leaderboard':
        widget.leaderboardData = useExistingData ? [
          { id: '1', name: 'Jessica Martinez', score: 48, avatar: 'https://i.pravatar.cc/150?img=1' },
          { id: '2', name: 'Daniel Wong', score: 42, avatar: 'https://i.pravatar.cc/150?img=2' },
          { id: '3', name: 'Aisha Johnson', score: 36, avatar: 'https://i.pravatar.cc/150?img=3' },
        ] : [
          { id: '1', name: 'User 1', score: 30 },
          { id: '2', name: 'User 2', score: 20 },
        ];
        break;
    }

    setPreviewWidget(widget);
  }, [widgetType, widgetTitle, useExistingData, chartType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!widgetType) {
      toast({
        title: "Please select a widget type",
        variant: "destructive"
      });
      return;
    }

    if (!widgetTitle.trim()) {
      toast({
        title: "Widget title is required",
        variant: "destructive"
      });
      return;
    }

    onAddWidget(widgetType, widgetTitle);
    setWidgetType('');
    setWidgetTitle('');
    setUseExistingData(false);
    setChartType('bar');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Widget to Dashboard</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="settings" className="mt-2">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="settings">Widget Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="space-y-4">
            <form id="widget-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="widget-type">Widget Type</Label>
                <Select value={widgetType} onValueChange={setWidgetType}>
                  <SelectTrigger id="widget-type">
                    <SelectValue placeholder="Select widget type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric Card</SelectItem>
                    <SelectItem value="chart">Chart</SelectItem>
                    <SelectItem value="activity">Activity Feed</SelectItem>
                    <SelectItem value="leaderboard">Leaderboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="widget-title">Widget Title</Label>
                <Input
                  id="widget-title"
                  value={widgetTitle}
                  onChange={(e) => setWidgetTitle(e.target.value)}
                  placeholder="Enter widget title"
                />
              </div>
              
              {widgetType === 'chart' && (
                <div className="space-y-2">
                  <Label htmlFor="chart-type">Chart Type</Label>
                  <Select value={chartType} onValueChange={(value) => setChartType(value as 'bar' | 'line' | 'pie' | 'area')}>
                    <SelectTrigger id="chart-type">
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="use-existing-data" 
                  checked={useExistingData}
                  onCheckedChange={setUseExistingData}
                />
                <Label htmlFor="use-existing-data">Use existing data from your account</Label>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="preview" className="min-h-[300px] flex items-center justify-center">
            {previewWidget ? (
              <div className="w-full max-w-md">
                {WidgetRenderer(previewWidget)}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>Select a widget type to see the preview</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="widget-form" className="bg-voli-primary hover:bg-voli-secondary text-black">
            Add Widget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetDialog;
