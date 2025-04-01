
import React from 'react';
import { User } from '@/types/auth';
import { Activity } from '@/types/dashboard';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, Clock, Target, Users, Star, TrendingUp, Trophy } from 'lucide-react';
import { getUserActivities } from '@/services/mockActivities';

interface TeamPerformanceComparisonProps {
  usersByLocation: Record<string, User[]>;
}

const TeamPerformanceComparison: React.FC<TeamPerformanceComparisonProps> = ({ usersByLocation }) => {
  const calculateTeamStats = (users: User[]) => {
    const totalMembers = users.length;
    const averageLevel = users.reduce((sum, user) => sum + user.level, 0) / totalMembers;
    const totalPoints = users.reduce((sum, user) => sum + user.points, 0);
    const averagePoints = totalPoints / totalMembers;
    
    // Calculate activity metrics
    let totalActivities = 0;
    let volunteerHours = 0;
    
    users.forEach(user => {
      const activities = getUserActivities(user.id);
      totalActivities += activities.length;
      activities.forEach(activity => {
        if (activity.hours) {
          volunteerHours += activity.hours;
        }
      });
    });
    
    // Calculate badges per team
    const uniqueBadges = new Set<string>();
    users.forEach(user => {
      user.badges.forEach(badge => uniqueBadges.add(badge));
    });
    
    return {
      totalMembers,
      averageLevel: parseFloat(averageLevel.toFixed(1)),
      totalPoints,
      averagePoints: Math.round(averagePoints),
      totalActivities,
      volunteerHours,
      uniqueBadges: uniqueBadges.size
    };
  };
  
  // Calculate stats for each team
  const teamStats = Object.entries(usersByLocation).map(([location, users]) => ({
    location,
    ...calculateTeamStats(users)
  }));
  
  // Sort by total points (descending)
  teamStats.sort((a, b) => b.totalPoints - a.totalPoints);
  
  // Find the team with the highest stats in each category
  const highestPoints = Math.max(...teamStats.map(team => team.totalPoints));
  const highestAvgPoints = Math.max(...teamStats.map(team => team.averagePoints));
  const highestVolunteerHours = Math.max(...teamStats.map(team => team.volunteerHours));
  const highestActivities = Math.max(...teamStats.map(team => team.totalActivities));
  
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold">Team Performance Comparison</h3>
          <p className="text-sm text-gray-500">Compare key metrics across different team locations</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Team Location</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Total Points</TableHead>
                <TableHead>Avg. Points</TableHead>
                <TableHead>Avg. Level</TableHead>
                <TableHead>Activities</TableHead>
                <TableHead>Volunteer Hours</TableHead>
                <TableHead>Unique Badges</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamStats.map((team) => (
                <TableRow key={team.location}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {team.totalPoints === highestPoints && (
                        <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                      )}
                      {team.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-400" />
                      {team.totalMembers}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{team.totalPoints.toLocaleString()}</span>
                      <Progress 
                        value={(team.totalPoints / highestPoints) * 100} 
                        className="h-1 mt-1" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge className={`${team.averagePoints === highestAvgPoints ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {team.averagePoints}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-purple-500" />
                      {team.averageLevel}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1 text-blue-500" />
                      {team.totalActivities}
                      <Progress 
                        value={(team.totalActivities / highestActivities) * 100} 
                        className="h-1 w-16 ml-2" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-green-500" />
                      {team.volunteerHours}
                      <Progress 
                        value={(team.volunteerHours / highestVolunteerHours) * 100} 
                        className="h-1 w-16 ml-2" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-1 text-amber-500" />
                      {team.uniqueBadges}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <p><Trophy className="inline h-3 w-3 mr-1 text-yellow-500" /> indicates the leading team by total points.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPerformanceComparison;
