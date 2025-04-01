import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { mockUsers } from '../services/mockData';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, MapPin, Users, LayoutList } from 'lucide-react';
import MapView from '../components/team/MapView';
import TeamByLocation from '../components/team/TeamByLocation';
import UserProfileDialog from '../components/team/UserProfileDialog';
import EmployeesTab from '../components/team/EmployeesTab';
import TeamPerformanceComparison from '@/components/team/TeamPerformanceComparison';
import { useToast } from "@/hooks/use-toast";

const Team: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLocations, setExpandedLocations] = useState<Record<string, boolean>>({
    'Melbourne': true,
    'New York': false,
    'London': false
  });
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const usersByLocation = useMemo(() => {
    const locationMap: Record<string, User[]> = {};
    
    mockUsers.forEach(user => {
      if (user.location) {
        if (!locationMap[user.location]) {
          locationMap[user.location] = [];
        }
        locationMap[user.location].push(user);
      }
    });
    
    return locationMap;
  }, []);

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleLocationExpand = (location: string) => {
    setExpandedLocations(prev => ({
      ...prev,
      [location]: !prev[location]
    }));
  };
  
  const handleOpenUserProfile = (userId: string) => {
    setSelectedUserId(userId);
  };
  
  const handleCloseUserProfile = () => {
    setSelectedUserId(null);
  };

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
        
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list" className="flex items-center">
              <LayoutList className="mr-2 h-4 w-4" />
              Team List
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Employees
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Map View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">
                      {filteredUsers.length} team members in {Object.keys(usersByLocation).length} locations
                    </p>
                  </div>
                </div>
                
                {Object.keys(usersByLocation).length > 1 && (
                  <TeamPerformanceComparison usersByLocation={usersByLocation} />
                )}
                
                {Object.keys(usersByLocation).length > 0 ? (
                  <div className="space-y-6">
                    {Object.entries(usersByLocation).map(([location, users]) => (
                      <TeamByLocation 
                        key={location} 
                        location={location} 
                        users={users} 
                        expanded={expandedLocations[location] || false}
                        onToggle={() => toggleLocationExpand(location)}
                        onViewProfile={handleOpenUserProfile}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No team members found matching your search.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="employees">
            <EmployeesTab 
              users={filteredUsers} 
              onViewProfile={handleOpenUserProfile} 
            />
          </TabsContent>
          
          <TabsContent value="map">
            <MapView users={filteredUsers} onViewProfile={handleOpenUserProfile} />
          </TabsContent>
        </Tabs>
      </div>
      
      {selectedUserId && (
        <UserProfileDialog 
          userId={selectedUserId}
          isOpen={!!selectedUserId}
          onClose={handleCloseUserProfile}
        />
      )}
    </Layout>
  );
};

export default Team;
