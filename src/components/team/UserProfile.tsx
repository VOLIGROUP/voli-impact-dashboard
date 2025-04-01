import React, { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, MapPin, Clock, Award, Users, Mail, Phone, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { mockActivities, getUserActivities } from '@/services/mockActivities';

interface UserProfileProps {
  userId: string;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    // Fetch user data based on userId (replace with actual data fetching)
    const mockUser: User = {
      id: userId,
      email: `user${userId}@example.com`,
      name: `User ${userId}`,
      role: 'developer',
      avatarUrl: `https://i.pravatar.cc/150?u=${userId}`,
      organization: 'Voli',
      points: 120,
      badges: ['Volunteer', 'Innovator'],
      level: 5,
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      location: 'San Francisco, CA',
      coordinates: [-122.4194, 37.7749],
      skills: [{ id: '1', name: 'React', level: 4 }],
      interests: [{ id: '1', name: 'Sustainability' }],
      sdgs: ['SDG 13: Climate Action'],
      bio: 'Passionate about making a difference through technology and community involvement.'
    };
    setUser(mockUser);

    // Fetch user activities (replace with actual data fetching)
    const userActivities = getUserActivities(userId);
    setActivities(userActivities);
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 flex-1 overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500 capitalize">{user.role.replace('_', ' ')} at {user.organization}</p>
              <div className="flex items-center mt-1">
                <Badge className="mr-2 bg-blue-100 text-blue-800 border-blue-200">
                  {user.location}
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Level {user.level}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">About</h3>
            <p className="text-sm text-gray-700">{user.bio || 'No bio available.'}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Contact Information</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 opacity-70" />
                <span>{user.email}</span>
              </div>
              {user.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 opacity-70" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Skills & Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills && user.skills.map(skill => (
                <Badge key={skill.id} variant="secondary">
                  {skill.name} (Level {skill.level})
                </Badge>
              ))}
              {user.interests && user.interests.map(interest => (
                <Badge key={interest.id} variant="secondary">
                  {interest.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Recent Activities</h3>
            <ScrollArea className="h-[150px] pr-4">
              <div className="space-y-3">
                {activities.length > 0 ? (
                  activities.map(activity => (
                    <div key={activity.id} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">{activity.title}</p>
                          <p className="text-xs text-gray-600">{activity.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{format(new Date(activity.date), 'MMM d, yyyy')}</span>
                        {activity.hours && (
                          <>
                            <Clock className="h-3.5 w-3.5" />
                            <span>{activity.hours} hours</span>
                          </>
                        )}
                        {activity.amountRaised && (
                          <>
                            <Award className="h-3.5 w-3.5" />
                            <span>${activity.amountRaised} raised</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No recent activities.</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
