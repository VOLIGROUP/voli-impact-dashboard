
import React, { useState } from 'react';
import { User } from '@/types/auth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Building2, 
  BarChart3, 
  Calendar, 
  Star, 
  Search,
  ArrowUpDown
} from 'lucide-react';

interface EmployeesTabProps {
  users: User[];
  onViewProfile: (userId: string) => void;
}

const EmployeesTab: React.FC<EmployeesTabProps> = ({ users, onViewProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count unique locations (teams)
  const uniqueLocations = [...new Set(users.map(user => user.location))].filter(Boolean).length;
  
  // Calculate active users this month (using lastActive date)
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const activeThisMonth = users.filter(user => {
    const lastActive = new Date(user.lastActive);
    return lastActive.getMonth() === thisMonth && lastActive.getFullYear() === thisYear;
  }).length;

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let valueA, valueB;
    
    switch(sortField) {
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'role':
        valueA = a.role;
        valueB = b.role;
        break;
      case 'location':
        valueA = a.location || '';
        valueB = b.location || '';
        break;
      case 'points':
        valueA = a.points;
        valueB = b.points;
        break;
      case 'level':
        valueA = a.level;
        valueB = b.level;
        break;
      default:
        valueA = a.name;
        valueB = b.name;
    }
    
    if (sortDirection === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Employees</p>
                <h3 className="text-2xl font-bold">{users.length}</h3>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Teams/Locations</p>
                <h3 className="text-2xl font-bold">{uniqueLocations}</h3>
              </div>
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active This Month</p>
                <h3 className="text-2xl font-bold">{activeThisMonth}</h3>
              </div>
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Performance</p>
                <h3 className="text-2xl font-bold">
                  {Math.round(users.reduce((sum, user) => sum + user.points, 0) / users.length)}
                </h3>
              </div>
              <BarChart3 className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search employees by name, role, team..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Employees Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[240px]">
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('name')}
                  >
                    Employee
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('role')}
                  >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button 
                    className="flex items-center" 
                    onClick={() => handleSort('location')}
                  >
                    Team
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead className="text-right">
                  <button 
                    className="flex items-center justify-end" 
                    onClick={() => handleSort('points')}
                  >
                    Points
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead className="text-right">
                  <button 
                    className="flex items-center justify-end" 
                    onClick={() => handleSort('level')}
                  >
                    Level
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                          user.role === 'team_lead' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                      `}>
                        {user.role.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.location || "—"}</TableCell>
                    <TableCell className="text-right font-medium">
                      {user.points} 
                      <span className="text-xs text-gray-500 ml-1">pts</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                        <span>{user.level}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewProfile(user.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No employees match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeesTab;
