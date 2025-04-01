
import React from 'react';
import { DashboardWidget } from '@/types/dashboard';

interface MetricsRowProps {
  widgets: DashboardWidget[];
  renderWidget: (widget: DashboardWidget) => React.ReactNode;
}

const MetricsRow: React.FC<MetricsRowProps> = ({ widgets, renderWidget }) => {
  const metricWidgets = widgets.filter(widget => widget.type === 'metric').slice(0, 4);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricWidgets.map(widget => renderWidget(widget))}
    </div>
  );
};

export default MetricsRow;
