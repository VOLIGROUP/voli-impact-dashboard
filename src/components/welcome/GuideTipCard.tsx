
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GuideTipCardProps {
  title: string;
  description: string;
  tips: string[];
  badge?: string;
  icon: React.ReactNode;
}

const GuideTipCard: React.FC<GuideTipCardProps> = ({ 
  title, 
  description, 
  tips, 
  badge,
  icon 
}) => {
  return (
    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="text-primary">{icon}</div>
          {badge && <Badge variant="secondary">{badge}</Badge>}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mt-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2 font-bold">•</span>
              <span className="text-sm text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default GuideTipCard;
