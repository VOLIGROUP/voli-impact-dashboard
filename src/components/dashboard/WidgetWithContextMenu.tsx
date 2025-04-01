
import React from 'react';
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Trash2 } from 'lucide-react';
import { DashboardWidget } from '@/types/dashboard';
import WidgetRenderer from './WidgetRenderer';

interface WidgetWithContextMenuProps {
  widget: DashboardWidget;
  onDeleteWidget?: (widgetId: string) => void;
  isDeletable?: boolean;
}

const WidgetWithContextMenu: React.FC<WidgetWithContextMenuProps> = ({
  widget,
  onDeleteWidget,
  isDeletable = true
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="h-full">
          {WidgetRenderer(widget)}
        </div>
      </ContextMenuTrigger>
      {isDeletable && onDeleteWidget && (
        <ContextMenuContent>
          <ContextMenuItem 
            className="text-red-600 focus:text-red-600" 
            onClick={() => onDeleteWidget(widget.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Widget
          </ContextMenuItem>
        </ContextMenuContent>
      )}
    </ContextMenu>
  );
};

export default WidgetWithContextMenu;
