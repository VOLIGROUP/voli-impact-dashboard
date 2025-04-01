
import React from 'react';
import { DashboardWidget } from '@/types/dashboard';

interface ActivityLeaderboardRowProps {
  widgets: DashboardWidget[];
  renderWidget: (widget: DashboardWidget) => React.ReactNode;
}

const ActivityLeaderboardRow: React.FC<ActivityLeaderboardRowProps> = ({ widgets, renderWidget }) => {
  const filteredWidgets = widgets.filter(
    widget => widget.type === 'activity' || widget.type === 'leaderboard'
  );
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {filteredWidgets.map(widget => renderWidget(widget))}
    </div>
  );
};

export default ActivityLeaderboardRow;
