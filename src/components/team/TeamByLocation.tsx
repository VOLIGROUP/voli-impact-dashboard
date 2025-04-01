
import React from 'react';
import { User } from '@/types/auth';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Mail, Calendar, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { timeAgo } from '@/utils/dateUtils';

interface TeamByLocationProps {
  location: string;
  users: User[];
  expanded: boolean;
  onToggle: () => void;
}

const TeamByLocation: React.FC<TeamByLocationProps> = ({ location, users, expanded, onToggle }) => {
  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <span className="w-3 h-3 rounded-full bg-voli-primary mr-2"></span>
          {location} Team
          <Badge className="ml-2 bg-gray-200 text-gray-700">{users.length} members</Badge>
        </h2>
        <Button 
          variant="outline" 
          onClick={onToggle}
          className="text-sm"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id} className="voli-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-voli-light">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                      {user.organization && (
                        <p className="text-gray-600 text-xs">{user.organization}</p>
                      )}
                    </div>
                  </div>
                  
                  <Badge className={`
                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                      user.role === 'team_lead' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                  `}>
                    {user.role.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Level {user.level}</span>
                    <span className="text-sm font-medium">{user.points} points</span>
                  </div>
                  <Progress value={(user.level / 10) * 100} className="h-2 bg-gray-100" />
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {user.badges.map((badge, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50 text-xs font-normal">
                        <Award className="h-3 w-3 mr-1 text-voli-dark" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Joined {new Date(user.joinedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Active {timeAgo(user.lastActive)}
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 p-0">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamByLocation;
