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
  Heart,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ImpactHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null);
  
  const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters."),
    type: z.enum(["volunteer", "fundraising", "learning", "other"], {
      required_error: "Please select an activity type.",
    }),
    description: z.string().min(5, "Description must be at least 5 characters."),
    impact: z.string().min(5, "Impact description must be at least 5 characters."),
    points: z.number().min(1, "Points must be at least 1."),
    hours: z.number().optional(),
    amountRaised: z.number().optional(),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "volunteer",
      description: "",
      impact: "",
      points: 0,
      hours: 0,
      amountRaised: 0,
    }
  });
  
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.impact.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || activity.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
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
  
  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    form.reset({
      title: activity.title,
      type: activity.type,
      description: activity.description,
      impact: activity.impact,
      points: activity.points,
      hours: activity.hours || 0,
      amountRaised: activity.amountRaised || 0,
    });
    setIsDialogOpen(true);
  };
  
  const handleAddActivity = () => {
    setEditingActivity(null);
    form.reset({
      title: "",
      type: "volunteer",
      description: "",
      impact: "",
      points: 0,
      hours: 0,
      amountRaised: 0,
    });
    setIsDialogOpen(true);
  };
  
  const handleDeletePrompt = (activityId: string) => {
    setActivityToDelete(activityId);
    setIsDeleteConfirmOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (activityToDelete) {
      const updatedActivities = activities.filter(activity => activity.id !== activityToDelete);
      setActivities(updatedActivities);
      setIsDeleteConfirmOpen(false);
      setActivityToDelete(null);
      toast({
        title: "Activity deleted",
        description: "The activity has been permanently removed.",
      });
    }
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingActivity) {
      const updatedActivities = activities.map(activity => 
        activity.id === editingActivity.id 
          ? { 
              ...activity, 
              ...values, 
              type: values.type,
              title: values.title,
              description: values.description,
              impact: values.impact,
              points: values.points,
              date: activity.date,
              userId: activity.userId,
              id: activity.id
            } 
          : activity
      );
      setActivities(updatedActivities);
      toast({
        title: "Activity updated",
        description: "Your activity has been updated successfully.",
      });
    } else {
      const newActivity: Activity = {
        id: `${Date.now()}`,
        userId: "1",
        date: new Date().toISOString(),
        type: values.type,
        title: values.title,
        description: values.description, 
        impact: values.impact,
        points: values.points,
        hours: values.hours,
        amountRaised: values.amountRaised
      };
      setActivities([newActivity, ...activities]);
      toast({
        title: "Activity added",
        description: "Your new activity has been added successfully.",
      });
    }
    setIsDialogOpen(false);
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
            <Button 
              className="bg-voli-primary hover:bg-voli-secondary text-black"
              onClick={handleAddActivity}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Activity
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
                <TableHead className="text-right w-[100px]">Actions</TableHead>
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
                    <TableCell className="text-right">
                      <div className="flex space-x-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditActivity(activity)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePrompt(activity.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No activities found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingActivity ? "Edit Activity" : "Add New Activity"}</DialogTitle>
            <DialogDescription>
              {editingActivity 
                ? "Edit your impact activity details below." 
                : "Add a new impact activity to your history."}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Activity title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="volunteer">Volunteering</SelectItem>
                        <SelectItem value="fundraising">Fundraising</SelectItem>
                        <SelectItem value="learning">Learning</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the activity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="impact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Impact</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the impact of this activity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Points</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Points earned" 
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch("type") === "volunteer" && (
                  <FormField
                    control={form.control}
                    name="hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hours</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Hours spent" 
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {form.watch("type") === "fundraising" && (
                  <FormField
                    control={form.control}
                    name="amountRaised"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount Raised ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Amount raised" 
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingActivity ? "Update Activity" : "Add Activity"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this activity? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ImpactHistory;
