
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  period?: string;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  change,
  period,
  color = 'voli-primary'
}) => {
  const formatValue = () => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value;
  };

  return (
    <Card className="voli-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}{formatValue()}{suffix}
        </div>
        {change !== undefined && (
          <div className="flex items-center mt-1">
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

export default MetricCard;
