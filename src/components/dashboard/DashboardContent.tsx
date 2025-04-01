
import React from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DashboardWidget } from '@/types/dashboard';
import MetricsRow from './MetricsRow';
import ChartsRow from './ChartsRow';
import ActivityLeaderboardRow from './ActivityLeaderboardRow';

interface DashboardContentProps {
  widgets: DashboardWidget[];
  renderWidget: (widget: DashboardWidget) => React.ReactNode;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ widgets, renderWidget }) => {
  return (
    <Tabs defaultValue="grid" className="space-y-4">
      <TabsContent value="grid" className="space-y-6">
        {/* Metrics Row - First Row */}
        <MetricsRow widgets={widgets} renderWidget={renderWidget} />
        
        {/* Charts Row - First Row */}
        <ChartsRow 
          widgets={widgets} 
          renderWidget={renderWidget} 
          startIndex={0} 
          endIndex={2} 
        />
        
        {/* Charts Row - Second Row */}
        <ChartsRow 
          widgets={widgets} 
          renderWidget={renderWidget}
          startIndex={2} 
          endIndex={4} 
        />

        {/* Charts Row - Third Row (Added for impact form fields) */}
        <ChartsRow 
          widgets={widgets} 
          renderWidget={renderWidget}
          startIndex={4} 
          endIndex={6} 
        />
        
        {/* Activity and Leaderboard Row */}
        <ActivityLeaderboardRow widgets={widgets} renderWidget={renderWidget} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardContent;
