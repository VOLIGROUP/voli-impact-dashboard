
import React, { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserActivities } from '@/services/mockActivities';
import { ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';

interface MapViewProps {
  users: User[];
  onViewProfile: (userId: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ users, onViewProfile }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userActivities, setUserActivities] = useState<any[]>([]);
  
  useEffect(() => {
    if (selectedUser) {
      const activities = getUserActivities(selectedUser.id);
      setUserActivities(activities.slice(0, 3)); // Get up to 3 most recent activities
    }
  }, [selectedUser]);

  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 20);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 60) {
      setZoomLevel(zoomLevel - 20);
    }
  };

  const resetZoom = () => {
    setZoomLevel(100);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseDetail = () => {
    setSelectedUser(null);
  };

  const getBadgeColor = (role: string) => {
    switch(role) {
      case 'team_lead':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'developer':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'designer':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'marketing_specialist':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'community_manager':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'analyst':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'content_creator':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'hr_specialist':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-medium text-sm">Team Distribution</h3>
            <p className="text-xs text-gray-500">Showing {users.length} team members across {Array.from(new Set(users.map(u => u.location))).length} locations</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 60}
              className="h-8 w-8 p-0"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs">{zoomLevel}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200}
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetZoom}
              className="h-8 px-2"
            >
              {zoomLevel !== 100 ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              <span className="ml-1 text-xs">Reset</span>
            </Button>
          </div>
        </div>
        
        <ScrollArea className="relative rounded-lg overflow-hidden" style={{ height: "500px" }}>
          <div 
            className="relative bg-gradient-to-br from-blue-50 to-green-50" 
            style={{ 
              height: `${500 * (zoomLevel / 100)}px`, 
              width: `${100 * (zoomLevel / 100)}%`,
              minWidth: "100%",
              transition: "height 0.3s, width 0.3s"
            }}
          >
            <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md z-10">
              <p className="text-sm font-medium">Team Map</p>
              <p className="text-xs text-gray-500">Click on members to see details</p>
              <div className="mt-2 space-y-1">
                {Array.from(new Set(users.map(u => u.location))).map((location) => (
                  <Badge key={location} className="mr-1 bg-gray-100 text-gray-800 hover:bg-gray-200">
                    {location} ({users.filter(u => u.location === location).length})
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* User markers */}
            {users.map((user) => (
              <div
                key={user.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:z-20 transition-transform hover:scale-110"
                style={{
                  left: `${user.coordinates ? (user.coordinates[0] + 180) / 360 * 100 : 50}%`,
                  top: `${user.coordinates ? (90 - user.coordinates[1]) / 180 * 100 : 50}%`,
                }}
                title={user.name}
                onClick={() => handleUserClick(user)}
              >
                <div className="relative">
                  <Avatar className={`h-10 w-10 border-2 ${selectedUser?.id === user.id ? 'border-purple-500 ring-2 ring-purple-200' : 'border-white'} shadow-md`}>
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1">
                    <Badge className={`text-[9px] px-1 py-0 min-w-0 h-4 ${getBadgeColor(user.role)}`}>
                      {user.role.split('_')[0]}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {selectedUser && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 border border-gray-200">
                  <AvatarImage src={selectedUser.avatarUrl} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-base">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{selectedUser.role.replace('_', ' ')}</p>
                  <div className="flex items-center mt-1">
                    <Badge className="mr-2 bg-blue-100 text-blue-800 border-blue-200">
                      {selectedUser.location}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Level {selectedUser.level}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                  onClick={() => onViewProfile(selectedUser.id)}
                >
                  View Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={handleCloseDetail}
                >
                  Close
                </Button>
              </div>
            </div>
            
            {userActivities.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-sm mb-2">Recent Activities</h4>
                <div className="space-y-2">
                  {userActivities.map((activity) => (
                    <div key={activity.id} className="bg-gray-50 p-2 rounded-md text-sm">
                      <div className="flex justify-between">
                        <p className="font-medium">{activity.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-xs mt-1">{activity.description}</p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {activity.points} pts
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-4 flex flex-wrap gap-1">
              {selectedUser.badges.map((badge, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <p className="text-xs text-gray-500">
            Note: This map visualization shows the approximate location of team members. Use the zoom controls to navigate.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
