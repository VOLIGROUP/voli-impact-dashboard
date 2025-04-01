import React, { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserActivities } from '@/services/mockActivities';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface TeamPerformanceComparisonProps {
  users: User[];
}

const TeamPerformanceComparison: React.FC<TeamPerformanceComparisonProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userActivities, setUserActivities] = useState<any[]>([]);
  const [activityTypeData, setActivityTypeData] = useState<any[]>([]);

  useEffect(() => {
    if (selectedUser) {
      const activities = getUserActivities(selectedUser.id);
      setUserActivities(activities);

      // Calculate activity type distribution for the selected user
      const activityTypes = activities.reduce((acc: any, activity: any) => {
        acc[activity.type] = (acc[activity.type] || 0) + 1;
        return acc;
      }, {});

      const data = Object.keys(activityTypes).map(type => ({
        name: type,
        value: activityTypes[type],
      }));
      setActivityTypeData(data);
    } else {
      setUserActivities([]);
      setActivityTypeData([]);
    }
  }, [selectedUser]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseDetail = () => {
    setSelectedUser(null);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#a45de3'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-medium text-sm mb-4">Team Performance Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User List */}
          <div>
            <h4 className="font-medium text-xs mb-2">Team Members</h4>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${selectedUser?.id === user.id ? 'bg-gray-100' : ''}`}
                    onClick={() => handleUserClick(user)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role.replace('_', ' ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* User Details and Activity Distribution */}
          <div>
            {selectedUser ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-xs">
                      {selectedUser.name}'s Activity Distribution
                    </h4>
                    <p className="text-xs text-gray-500">
                      Breakdown of activities by type
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCloseDetail}>
                    Close
                  </Button>
                </div>

                {activityTypeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={activityTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {activityTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-gray-500 p-4">
                    No activity data available for this user.
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-xs mb-2">Recent Activities</h4>
                  <ScrollArea className="h-[150px]">
                    <div className="space-y-2">
                      {userActivities.slice(0, 3).map((activity) => (
                        <div key={activity.id} className="bg-gray-50 p-2 rounded-md text-sm">
                          <div className="flex justify-between">
                            <p className="font-medium">{activity.title}</p>
                            <Badge variant="outline" className="text-xs">
                              {activity.type}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-xs mt-1">{activity.description}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 p-6">
                Select a team member to view their activity distribution.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPerformanceComparison;
