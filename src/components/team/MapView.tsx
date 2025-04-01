
import React from 'react';
import { User } from '@/types/auth';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MapViewProps {
  users: User[];
  onViewProfile: (userId: string) => void;
}

// Mock component - in a real app, this would be integrated with a map library
const MapView: React.FC<MapViewProps> = ({ users, onViewProfile }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="relative w-full rounded-lg overflow-hidden bg-gray-100" style={{ height: "500px" }}>
          {/* This would be a real map in production */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
            <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md">
              <p className="text-sm font-medium">Team Map</p>
              <p className="text-xs text-gray-500">Showing {users.length} team members</p>
            </div>
            
            {/* Mock user markers */}
            {users.map((user) => (
              <div
                key={user.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:z-10"
                style={{
                  left: `${user.coordinates ? (user.coordinates[0] + 180) / 360 * 100 : 50}%`,
                  top: `${user.coordinates ? (90 - user.coordinates[1]) / 180 * 100 : 50}%`,
                }}
                title={user.name}
              >
                <div className="relative group">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="hidden group-hover:block absolute left-1/2 bottom-full mb-2 transform -translate-x-1/2 w-48 bg-white rounded-lg shadow-lg p-3 z-10">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.role.replace('_', ' ')}</p>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <Badge className="w-full justify-center mt-1">{user.location}</Badge>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                        onClick={() => onViewProfile(user.id)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Note: This is a simplified map visualization. In a production environment, it would be integrated with a full-featured map library.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
