
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { mockUsers } from '../services/mockData';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Award, Calendar, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const Team: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.organization?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team</h1>
            <p className="text-gray-500">
              Manage team members and track contributions
            </p>
          </div>
          
          <Button className="bg-voli-primary hover:bg-voli-secondary text-black">
            <Plus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
        
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search team members..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
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
                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}
                  `}>
                    {user.role}
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
      </div>
    </Layout>
  );
};

// Helper function to format time ago
const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return interval + ' years ago';
  if (interval === 1) return '1 year ago';
  
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + ' months ago';
  if (interval === 1) return '1 month ago';
  
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return interval + ' days ago';
  if (interval === 1) return '1 day ago';
  
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return interval + ' hours ago';
  if (interval === 1) return '1 hour ago';
  
  interval = Math.floor(seconds / 60);
  if (interval > 1) return interval + ' minutes ago';
  if (interval === 1) return '1 minute ago';
  
  if (seconds < 10) return 'just now';
  
  return Math.floor(seconds) + ' seconds ago';
};

export default Team;
