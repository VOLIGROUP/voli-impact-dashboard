
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  avatar?: string;
}

interface LeaderboardCardProps {
  title: string;
  data: LeaderboardEntry[];
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ title, data }) => {
  return (
    <Card className="voli-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((entry, index) => (
            <div key={entry.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 text-center font-semibold text-sm text-gray-500">
                  {index + 1}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={entry.avatar || `https://i.pravatar.cc/32?u=${entry.id}`} />
                  <AvatarFallback>
                    {entry.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">{entry.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">{entry.score.toLocaleString()}</span>
                <span className="text-xs text-gray-500">pts</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
