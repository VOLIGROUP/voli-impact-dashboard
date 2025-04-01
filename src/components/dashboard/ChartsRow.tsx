
import React from 'react';
import { DashboardWidget } from '@/types/dashboard';

interface ChartsRowProps {
  widgets: DashboardWidget[];
  renderWidget: (widget: DashboardWidget) => React.ReactNode;
  startIndex?: number;
  endIndex?: number;
}

const ChartsRow: React.FC<ChartsRowProps> = ({ 
  widgets, 
  renderWidget, 
  startIndex = 0, 
  endIndex = 2 
}) => {
  const chartWidgets = widgets
    .filter(widget => widget.type === 'chart')
    .slice(startIndex, endIndex);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {chartWidgets.map(widget => renderWidget(widget))}
    </div>
  );
};

export default ChartsRow;
