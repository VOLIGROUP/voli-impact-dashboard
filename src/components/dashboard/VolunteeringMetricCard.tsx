
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Clock, Users, Heart, Gift, Droplet } from 'lucide-react';

interface VolunteeringMetricCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  period?: string;
  color?: string;
  icon?: 'clock' | 'users' | 'heart' | 'gift' | 'droplet';
}

const VolunteeringMetricCard: React.FC<VolunteeringMetricCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  period,
  color = 'voli-primary',
  icon = 'clock'
}) => {
  const formatValue = () => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value;
  };

  const renderIcon = () => {
    switch (icon) {
      case 'clock':
        return <Clock className={`h-5 w-5 text-${color}`} />;
      case 'users':
        return <Users className={`h-5 w-5 text-${color}`} />;
      case 'heart':
        return <Heart className={`h-5 w-5 text-${color}`} />;
      case 'gift':
        return <Gift className={`h-5 w-5 text-${color}`} />;
      case 'droplet':
        return <Droplet className={`h-5 w-5 text-${color}`} />;
      default:
        return <Clock className={`h-5 w-5 text-${color}`} />;
    }
  };

  return (
    <Card className="voli-card overflow-hidden border-t-4" style={{ borderTopColor: `var(--${color})` }}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {renderIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {prefix}{formatValue()}{suffix}
        </div>
        {change !== undefined && (
          <div className="flex items-center mt-2">
            <span
              className={`inline-flex items-center text-xs font-medium ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change >= 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(change)}%
            </span>
            {period && (
              <span className="text-xs text-gray-500 ml-1">vs {period}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VolunteeringMetricCard;
