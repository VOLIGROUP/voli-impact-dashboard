
import React from 'react';
import { DashboardWidget } from '@/types/dashboard';
import VolunteeringMetricCard from './VolunteeringMetricCard';
import ChartCard from './ChartCard';
import ActivityCard from './ActivityCard';
import LeaderboardCard from './LeaderboardCard';

const WidgetRenderer = (widget: DashboardWidget): React.ReactNode => {
  switch (widget.type) {
    case 'metric':
      return (
        <VolunteeringMetricCard
          key={widget.id}
          title={widget.title}
          value={widget.value || 0}
          prefix={widget.prefix}
          suffix={widget.suffix}
          change={widget.change}
          period={widget.period}
          color={widget.color}
          icon={widget.icon}
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

export default WidgetRenderer;
