
import React, { useState } from 'react';
import { User } from '@/types/auth';
import { Activity, Kudos, Interest, Skill, UserRanking } from '@/types/dashboard';
import { getActivitiesByUserId } from '@/services/mockActivities';
import { mockUsers } from '@/services/mockUsers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import { Award, BarChart3, Heart, Calendar, Star, User as UserIcon, 
         MessageSquare, Clock, Target, ThumbsUp, Download, 
         Settings, Users, Plus, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import html2canvas from 'html2canvas';

// SDG options
const sdgOptions = [
  { label: 'No Poverty', value: 'sdg1' },
  { label: 'Zero Hunger', value: 'sdg2' },
  { label: 'Good Health and Well-being', value: 'sdg3' },
  { label: 'Quality Education', value: 'sdg4' },
  { label: 'Gender Equality', value: 'sdg5' },
  { label: 'Clean Water and Sanitation', value: 'sdg6' },
  { label: 'Affordable and Clean Energy', value: 'sdg7' },
  { label: 'Decent Work and Economic Growth', value: 'sdg8' },
  { label: 'Industry, Innovation and Infrastructure', value: 'sdg9' },
  { label: 'Reduced Inequality', value: 'sdg10' },
  { label: 'Sustainable Cities and Communities', value: 'sdg11' },
  { label: 'Responsible Consumption and Production', value: 'sdg12' },
  { label: 'Climate Action', value: 'sdg13' },
  { label: 'Life Below Water', value: 'sdg14' },
  { label: 'Life on Land', value: 'sdg15' },
  { label: 'Peace, Justice and Strong Institutions', value: 'sdg16' },
  { label: 'Partnerships for the Goals', value: 'sdg17' },
];

// Preset skill options
const skillOptions = [
  'Leadership', 'Project Management', 'Public Speaking', 'Strategic Planning',
  'Communication', 'Team Building', 'Coaching', 'React', 'JavaScript',
  'UI/UX', 'Node.js', 'Content Creation', 'Fundraising', 'Event Planning',
  'Community Engagement', 'Volunteer Management', 'Grant Writing', 'Social Media',
  'Data Analysis', 'Policy Analysis', 'Environmental Science', 'Sustainability'
];

// Preset interest options
const interestOptions = [
  'Environmental Conservation', 'Social Entrepreneurship', 'Technology for Good', 
  'Education Access', 'Community Development', 'Mentorship', 'Climate Action',
  'Open Source', 'AI Ethics', 'Digital Inclusion', 'Tech Education',
  'Food Security', 'Mental Health', 'Racial Justice', 'LGBTQ+ Rights',
  'Disability Advocacy', 'Women Empowerment', 'Financial Literacy'
];

const getUserRanking = (points: number): UserRanking => {
  if (points >= 1000) {
    return { 
      rank: 1, 
      title: 'Impact Leader', 
      description: 'Top 1% of contributors with exceptional impact across multiple initiatives'
    };
  } else if (points >= 750) {
    return { 
      rank: 2, 
      title: 'Change Champion', 
      description: 'Top 5% of contributors consistently driving positive change'
    };
  } else if (points >= 500) {
    return { 
      rank: 3, 
      title: 'Community Builder', 
      description: 'Top 15% of contributors actively supporting community initiatives'
    };
  } else if (points >= 300) {
    return { 
      rank: 4, 
      title: 'Rising Star', 
      description: 'Top 30% of contributors showing strong commitment to impact'
    };
  } else {
    return { 
      rank: 5, 
      title: 'Impact Contributor', 
      description: 'Actively participating in making a difference'
    };
  }
};

// Format user's team members
const getUserTeamMembers = (user: User): User[] => {
  if (!user.organization) return [];
  
  return mockUsers
    .filter(u => u.organization === user.organization && u.id !== user.id)
    .slice(0, 5); // Limit to 5 team members for display
};

// Calculate impact stats
const calculateImpactStats = (activities: Activity[]) => {
  const volunteerHours = activities
    .filter(a => a.type === 'volunteer' && a.hours)
    .reduce((sum, activity) => sum + (activity.hours || 0), 0);
    
  const amountRaised = activities
    .filter(a => a.type === 'fundraising' && a.amountRaised)
    .reduce((sum, activity) => sum + (activity.amountRaised || 0), 0);
    
  const totalActivities = activities.length;
  
  const categoryCounts = activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return { volunteerHours, amountRaised, totalActivities, categoryCounts };
};

interface EditableUserProfileProps {
  onClose: () => void;
}

const EditableUserProfile: React.FC<EditableUserProfileProps> = ({ onClose }) => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    location: user?.location || '',
    role: user?.role || '',
  });
  
  // Skills, interests, and SDGs state
  const [skills, setSkills] = useState<Skill[]>([
    { id: 's1', name: 'Leadership', level: 4 },
    { id: 's2', name: 'Communication', level: 3 },
  ]);
  const [interests, setInterests] = useState<Interest[]>([
    { id: 'i1', name: 'Environmental Conservation' },
    { id: 'i2', name: 'Technology for Good' },
  ]);
  const [selectedSdgs, setSelectedSdgs] = useState<string[]>(['sdg13', 'sdg4']);
  
  // New skill/interest form state
  const [newSkill, setNewSkill] = useState({ name: '', level: 3 });
  const [newInterest, setNewInterest] = useState('');
  
  if (!user) {
    return (
      <Card className="p-6">
        <CardContent className="pt-6 text-center">
          <p>User not found</p>
          <Button className="mt-4" onClick={onClose}>Close</Button>
        </CardContent>
      </Card>
    );
  }
  
  const activities = getActivitiesByUserId(user.id);
  const impactStats = calculateImpactStats(activities);
  const ranking = getUserRanking(user.points);
  const teamMembers = getUserTeamMembers(user);
  
  const nextLevelPoints = (user.level + 1) * 250;
  const currentLevelPoints = user.level * 250;
  const progressToNextLevel = ((user.points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
  
  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        name: profileForm.name,
        email: profileForm.email,
        location: profileForm.location,
      });
      
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddSkill = () => {
    if (!newSkill.name) return;
    
    const skillId = `s${Date.now()}`;
    setSkills(prev => [...prev, { id: skillId, name: newSkill.name, level: newSkill.level }]);
    setNewSkill({ name: '', level: 3 });
    
    toast({
      title: "Skill added",
      description: `${newSkill.name} has been added to your skills.`,
    });
  };
  
  const handleAddInterest = () => {
    if (!newInterest) return;
    
    const interestId = `i${Date.now()}`;
    setInterests(prev => [...prev, { id: interestId, name: newInterest }]);
    setNewInterest('');
    
    toast({
      title: "Interest added",
      description: `${newInterest} has been added to your interests.`,
    });
  };
  
  const handleRemoveSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };
  
  const handleRemoveInterest = (id: string) => {
    setInterests(prev => prev.filter(interest => interest.id !== id));
  };
  
  const handleExportResume = async () => {
    const resumeElement = document.getElementById('impact-resume');
    if (!resumeElement) return;
    
    try {
      const canvas = await html2canvas(resumeElement);
      const imgData = canvas.toDataURL('image/png');
      
      // Create a download link
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${user.name}_impact_resume.png`;
      link.click();
      
      toast({
        title: "Resume exported",
        description: "Your impact resume has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export resume. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-voli-primary">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.role.replace('_', ' ')}</CardDescription>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className="mr-2">{user.organization}</Badge>
                {user.location && <Badge variant="outline">{user.location}</Badge>}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <Button variant="default" onClick={handleSaveProfile}>
                Save Changes
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-6">
        <div className="mb-6 p-4 bg-slate-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Award className="mr-2 text-purple-500" size={20} />
            {ranking.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{ranking.description}</p>
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Level {user.level}</span>
            <span>{user.points} / {nextLevelPoints} points</span>
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">
              <UserIcon className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex-1">
              <BarChart3 className="mr-2 h-4 w-4" />
              Impact
            </TabsTrigger>
            <TabsTrigger value="team" className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Impact Resume
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 gap-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileForm.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        name="role"
                        value={profileForm.role.replace('_', ' ')}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us about yourself..."
                      value={profileForm.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Target className="mr-2 text-blue-500" size={18} />
                        Skills
                      </h3>
                      <div className="space-y-3">
                        {skills.map(skill => (
                          <div key={skill.id}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">{skill.name}</span>
                              <span className="text-sm text-gray-500">{skill.level}/5</span>
                            </div>
                            <Progress value={(skill.level / 5) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Heart className="mr-2 text-red-500" size={18} />
                        Interests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {interests.map(interest => (
                          <Badge key={interest.id} variant="secondary" className="py-2">
                            {interest.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Star className="mr-2 text-yellow-500" size={18} />
                      SDGs of Interest
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedSdgs.map(sdgValue => {
                        const sdg = sdgOptions.find(option => option.value === sdgValue);
                        return (
                          <Badge key={sdgValue} variant="outline" className="py-2 px-3">
                            {sdg?.label || sdgValue}
                          </Badge>
                        );
                      })}
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-3 flex items-center">
                      <Award className="mr-2 text-purple-500" size={18} />
                      Badges
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {user.badges.map((badge, index) => (
                        <Badge key={index} className="bg-voli-primary text-black py-2">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-3 flex items-center">
                      <BarChart3 className="mr-2 text-green-500" size={18} />
                      Impact Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Volunteer Hours</p>
                        <p className="text-xl font-bold">{impactStats.volunteerHours}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Amount Raised</p>
                        <p className="text-xl font-bold">${impactStats.amountRaised}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Activities</p>
                        <p className="text-xl font-bold">{impactStats.totalActivities}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Impact Points</p>
                        <p className="text-xl font-bold">{user.points}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Target className="mr-2 text-blue-500" size={18} />
                      Manage Skills
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input 
                            list="skill-options"
                            placeholder="Add a skill..."
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                          />
                          <datalist id="skill-options">
                            {skillOptions.map(skill => (
                              <option key={skill} value={skill} />
                            ))}
                          </datalist>
                        </div>
                        <div className="w-16">
                          <Input 
                            type="number" 
                            min="1" 
                            max="5" 
                            value={newSkill.level}
                            onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                          />
                        </div>
                        <Button onClick={handleAddSkill}>
                          <Plus size={18} />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {skills.map(skill => (
                          <div key={skill.id} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                            <span>{skill.name} (Level: {skill.level})</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleRemoveSkill(skill.id)}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-3 flex items-center">
                      <Heart className="mr-2 text-red-500" size={18} />
                      Manage Interests
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input 
                          list="interest-options"
                          placeholder="Add an interest..."
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                        />
                        <datalist id="interest-options">
                          {interestOptions.map(interest => (
                            <option key={interest} value={interest} />
                          ))}
                        </datalist>
                        <Button onClick={handleAddInterest}>
                          <Plus size={18} />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {interests.map(interest => (
                          <div key={interest.id} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                            <span>{interest.name}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleRemoveInterest(interest.id)}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Star className="mr-2 text-yellow-500" size={18} />
                      SDGs of Interest
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-2">
                        {sdgOptions.map(sdg => (
                          <div key={sdg.value} className="flex items-center space-x-2">
                            <Checkbox 
                              id={sdg.value}
                              checked={selectedSdgs.includes(sdg.value)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedSdgs(prev => [...prev, sdg.value]);
                                } else {
                                  setSelectedSdgs(prev => prev.filter(val => val !== sdg.value));
                                }
                              }}
                            />
                            <Label htmlFor={sdg.value}>{sdg.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="impact" className="pt-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="mr-2 text-blue-500" size={18} />
              Impact History
            </h3>
            
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map(activity => (
                  <Card key={activity.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{new Date(activity.date).toLocaleDateString()}</span>
                            {activity.hours && (
                              <span className="ml-3 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {activity.hours} hours
                              </span>
                            )}
                            {activity.amountRaised && (
                              <span className="ml-3 flex items-center">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                ${activity.amountRaised} raised
                              </span>
                            )}
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          +{activity.points} pts
                        </Badge>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm">
                          <strong>Impact:</strong> {activity.impact}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No impact activities recorded yet.</p>
            )}
          </TabsContent>
          
          <TabsContent value="team" className="pt-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="mr-2 text-blue-500" size={18} />
              Your Team
            </h3>
            
            {teamMembers.length > 0 ? (
              <div className="space-y-4">
                {teamMembers.map(member => (
                  <Card key={member.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center p-4">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role.replace('_', ' ')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{member.points} points</p>
                          <p className="text-xs text-gray-500">Level {member.level}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">You're not part of a team yet.</p>
            )}
          </TabsContent>
          
          <TabsContent value="resume" className="pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Download className="mr-2 text-blue-500" size={18} />
                Impact Resume
              </h3>
              <Button onClick={handleExportResume}>
                <Download className="mr-2 h-4 w-4" />
                Export Resume
              </Button>
            </div>
            
            <div id="impact-resume" className="bg-white p-6 border rounded-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-600">{user.role.replace('_', ' ')}</p>
                  <p className="text-gray-600">{user.email}</p>
                  {user.location && <p className="text-gray-600">{user.location}</p>}
                </div>
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Impact Summary</h2>
                  <div className="space-y-2">
                    <p><strong>Total Hours:</strong> {impactStats.volunteerHours} hours</p>
                    <p><strong>Amount Raised:</strong> ${impactStats.amountRaised}</p>
                    <p><strong>Activities:</strong> {impactStats.totalActivities}</p>
                    <p><strong>Impact Points:</strong> {user.points}</p>
                    <p><strong>Level:</strong> {user.level}</p>
                    <p><strong>Ranking:</strong> {ranking.title}</p>
                    <p><strong>Organization:</strong> {user.organization || 'Independent'}</p>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-2">Skills</h2>
                  <div className="space-y-1">
                    {skills.map(skill => (
                      <p key={skill.id}><strong>{skill.name}:</strong> Level {skill.level}/5</p>
                    ))}
                  </div>
                  
                  <h2 className="text-lg font-semibold mt-4 mb-2">Badges</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge, index) => (
                      <Badge key={index} variant="outline">{badge}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Interests & Focus Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {interests.map(interest => (
                    <Badge key={interest.id} variant="secondary">{interest.name}</Badge>
                  ))}
                </div>
                
                <h3 className="font-semibold mt-3 mb-1">SDGs of Interest</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSdgs.map(sdgValue => {
                    const sdg = sdgOptions.find(option => option.value === sdgValue);
                    return <Badge key={sdgValue} variant="outline">{sdg?.label || sdgValue}</Badge>;
                  })}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-2">Recent Impact Activities</h2>
                <div className="space-y-3">
                  {activities.slice(0, 5).map(activity => (
                    <div key={activity.id} className="border-b pb-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{activity.title}</h3>
                        <span className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-sm text-gray-600">
                        <strong>Impact:</strong> {activity.impact} | <strong>Points:</strong> {activity.points}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EditableUserProfile;
