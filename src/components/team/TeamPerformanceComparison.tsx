
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { User } from '@/types/auth';

export interface TeamPerformanceComparisonProps {
  usersByLocation: Record<string, User[]>;
}

const TeamPerformanceComparison: React.FC<TeamPerformanceComparisonProps> = ({ usersByLocation }) => {
  const [metricType, setMetricType] = useState<'points' | 'activities'>('points');
  const [teamType, setTeamType] = useState<'location' | 'role'>('location');
  
  // Generate data for the chart based on the selected metric and team type
  const generateChartData = () => {
    if (teamType === 'location') {
      return Object.entries(usersByLocation).map(([location, users]) => ({
        name: location,
        [metricType === 'points' ? 'Impact Points' : 'Activities']: 
          users.reduce((total, user) => total + (metricType === 'points' ? (user.points || 0) : 5), 0) / users.length
      }));
    } else {
      // Group users by role
      const usersByRole: Record<string, User[]> = {};
      
      Object.values(usersByLocation).flat().forEach(user => {
        const role = user.role;
        if (!usersByRole[role]) {
          usersByRole[role] = [];
        }
        usersByRole[role].push(user);
      });
      
      return Object.entries(usersByRole).map(([role, users]) => ({
        name: role.charAt(0).toUpperCase() + role.slice(1),
        [metricType === 'points' ? 'Impact Points' : 'Activities']: 
          users.reduce((total, user) => total + (metricType === 'points' ? (user.points || 0) : 5), 0) / users.length
      }));
    }
  };
  
  const chartData = generateChartData();
  const metricLabel = metricType === 'points' ? 'Impact Points' : 'Activities';
  
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Performance Comparison</CardTitle>
        <div className="flex space-x-2">
          <div className="flex space-x-1">
            <Button
              variant={metricType === 'points' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMetricType('points')}
            >
              Points
            </Button>
            <Button
              variant={metricType === 'activities' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMetricType('activities')}
            >
              Activities
            </Button>
          </div>
          <div className="flex space-x-1">
            <Button
              variant={teamType === 'location' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTeamType('location')}
            >
              By Location
            </Button>
            <Button
              variant={teamType === 'role' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTeamType('role')}
            >
              By Role
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={metricLabel} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TeamPerformanceComparison;
