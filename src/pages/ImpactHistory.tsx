
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { mockActivities } from '../services/mockData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Activity } from '@/types/dashboard';
import { format } from 'date-fns';
import { 
  FileText, 
  Clock, 
  Calendar, 
  Award, 
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ImpactHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  // All activities from the platform
  const activities: Activity[] = mockActivities;
  
  // Filter activities based on search term and type
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.impact.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || activity.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'volunteer':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'fundraising':
        return <Heart className="h-4 w-4 text-red-600" />;
      case 'learning':
        return <FileText className="h-4 w-4 text-green-600" />;
      default:
        return <Award className="h-4 w-4 text-yellow-600" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Impact History</h1>
            <p className="text-gray-500">Track all activities and their impact across the platform</p>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
              }}
            >
              Reset Filters
            </Button>
            <Button className="bg-voli-primary hover:bg-voli-secondary text-black">
              <Calendar className="h-4 w-4 mr-2" />
              Export History
            </Button>
          </div>
        </div>
        
        <div className="flex space-x-4 mb-6">
          <div className="w-1/2">
            <Input
              placeholder="Search by title, description or impact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-1/4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="volunteer">Volunteering</SelectItem>
                <SelectItem value="fundraising">Fundraising</SelectItem>
                <SelectItem value="learning">Learning</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Hours/Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{activity.title}</TableCell>
                    <TableCell>{activity.description}</TableCell>
                    <TableCell>{formatDate(activity.date)}</TableCell>
                    <TableCell>{activity.impact}</TableCell>
                    <TableCell className="text-right font-medium">{activity.points}</TableCell>
                    <TableCell className="text-right">
                      {activity.hours ? `${activity.hours} hrs` : ''}
                      {activity.amountRaised ? `$${activity.amountRaised}` : ''}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No activities found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default ImpactHistory;
