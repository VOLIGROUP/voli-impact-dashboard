
import React, { useState } from 'react';
import { User } from '@/types/auth';
import { Activity, Kudos, Interest, Skill, UserRanking, Charity } from '@/types/dashboard';
import { mockActivities } from '@/services/mockActivities';
import { mockCharities } from '@/services/mockMarketplace';
import { mockUsers } from '@/services/mockUsers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { timeAgo } from "@/utils/dateUtils";
import { Award, BarChart3, Heart, Calendar, Star, Smile, Send, Clock, Target, ThumbsUp, User as UserIcon, MessageSquare, Gift, Confetti } from 'lucide-react';
import { getUserActivities } from '@/services/mockActivities';
import { useToast } from "@/hooks/use-toast";
import Confetti from 'react-confetti';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for a user profile
const mockUserSkills: Record<string, Skill[]> = {
  '1': [
    { id: 's1', name: 'Leadership', level: 5 },
    { id: 's2', name: 'Project Management', level: 4 },
    { id: 's3', name: 'Public Speaking', level: 4 },
    { id: 's4', name: 'Strategic Planning', level: 5 },
  ],
  '3': [
    { id: 's1', name: 'Leadership', level: 4 },
    { id: 's2', name: 'Team Building', level: 5 },
    { id: 's5', name: 'Communication', level: 4 },
    { id: 's6', name: 'Coaching', level: 3 },
  ],
  '4': [
    { id: 's7', name: 'React', level: 5 },
    { id: 's8', name: 'JavaScript', level: 4 },
    { id: 's9', name: 'UI/UX', level: 3 },
    { id: 's10', name: 'Node.js', level: 4 },
  ],
  '5': [
    { id: 's11', name: 'UI Design', level: 5 },
    { id: 's12', name: 'Figma', level: 5 },
    { id: 's13', name: 'Branding', level: 4 },
    { id: 's14', name: 'Illustration', level: 3 },
  ],
};

// Default skills for users without specific skills assigned
const defaultSkills: Skill[] = [
  { id: 'ds1', name: 'Communication', level: 3 },
  { id: 'ds2', name: 'Teamwork', level: 4 },
  { id: 'ds3', name: 'Problem Solving', level: 3 },
  { id: 'ds4', name: 'Organization', level: 3 },
];

const mockUserInterests: Record<string, Interest[]> = {
  '1': [
    { id: 'i1', name: 'Environmental Conservation' },
    { id: 'i2', name: 'Social Entrepreneurship' },
    { id: 'i3', name: 'Technology for Good' },
    { id: 'i4', name: 'Education Access' },
  ],
  '3': [
    { id: 'i1', name: 'Environmental Conservation' },
    { id: 'i5', name: 'Community Development' },
    { id: 'i6', name: 'Mentorship' },
    { id: 'i7', name: 'Climate Action' },
  ],
  '4': [
    { id: 'i8', name: 'Open Source' },
    { id: 'i9', name: 'AI Ethics' },
    { id: 'i10', name: 'Digital Inclusion' },
    { id: 'i11', name: 'Tech Education' },
  ],
};

// Default interests for users without specific interests assigned
const defaultInterests: Interest[] = [
  { id: 'di1', name: 'Volunteering' },
  { id: 'di2', name: 'Sustainability' },
  { id: 'di3', name: 'Social Impact' },
  { id: 'di4', name: 'Personal Development' },
];

const mockUserCharities: Record<string, string[]> = {
  '1': ['charity1', 'charity2', 'charity3'],
  '3': ['charity1', 'charity4', 'charity6'],
  '4': ['charity3', 'charity5', 'charity2'],
  '5': ['charity2', 'charity4', 'charity1'],
};

// Default charities for users without specific charities assigned
const defaultCharities: string[] = ['charity1', 'charity3', 'charity5'];

const mockKudos: Kudos[] = [
  {
    id: 'k1',
    fromUserId: '3',
    toUserId: '1',
    message: 'Thanks for your leadership on the beach cleanup project!',
    date: '2023-07-10T09:00:00Z',
    seen: true,
  },
  {
    id: 'k2',
    fromUserId: '4',
    toUserId: '1',
    message: 'Your guidance on the volunteer program has been invaluable.',
    date: '2023-07-15T14:30:00Z',
    seen: true,
  },
  {
    id: 'k3',
    fromUserId: '1',
    toUserId: '3',
    message: 'Great job leading the Melbourne team this quarter!',
    date: '2023-07-08T11:20:00Z',
    seen: true,
  },
  {
    id: 'k4',
    fromUserId: '5',
    toUserId: '4',
    message: 'Your technical support on the app made all the difference.',
    date: '2023-07-12T16:45:00Z',
    seen: true,
  },
];

// Calculate user ranking based on points
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

// Get user kudos
const getUserReceivedKudos = (userId: string): Kudos[] => {
  return mockKudos.filter(kudos => kudos.toUserId === userId);
};

// Get user given kudos
const getUserGivenKudos = (userId: string): Kudos[] => {
  return mockKudos.filter(kudos => kudos.fromUserId === userId);
};

interface UserProfileProps {
  userId: string;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [kudosMessage, setKudosMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  
  // Get user data
  const user = mockUsers.find(u => u.id === userId);
  
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
  
  // Get user data
  const activities = getUserActivities(userId);
  const skills = mockUserSkills[userId] || defaultSkills;
  const interests = mockUserInterests[userId] || defaultInterests;
  const favoriteCharityIds = mockUserCharities[userId] || defaultCharities;
  const favoriteCharities = favoriteCharityIds.map(id => 
    mockCharities.find(charity => charity.id === id)
  ).filter(Boolean);
  
  const receivedKudos = getUserReceivedKudos(userId);
  const givenKudos = getUserGivenKudos(userId);
  const ranking = getUserRanking(user.points);
  
  // Calculate completion percentage towards next level
  const nextLevelPoints = (user.level + 1) * 250;
  const currentLevelPoints = user.level * 250;
  const progressToNextLevel = ((user.points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
  
  const handleSendKudos = () => {
    if (!kudosMessage.trim()) {
      toast({
        title: "Kudos message required",
        description: "Please enter a message with your kudos",
        variant: "destructive"
      });
      return;
    }
    
    // Show confetti animation
    setShowConfetti(true);
    
    // Hide confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    // Clear kudos message
    setKudosMessage('');
    
    // Show success toast
    toast({
      title: "Kudos sent!",
      description: `You've successfully sent kudos to ${user.name}`,
    });
  };
  
  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
          />
        </div>
      )}
      
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
                  <Badge variant="outline">{user.location}</Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>Close</Button>
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
              <TabsTrigger value="kudos" className="flex-1">
                <Star className="mr-2 h-4 w-4" />
                Kudos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
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
                  
                  <h3 className="text-lg font-semibold mt-6 mb-3 flex items-center">
                    <Heart className="mr-2 text-green-500" size={18} />
                    Favorite Charities
                  </h3>
                  <div className="space-y-3">
                    {favoriteCharities.map(charity => charity && (
                      <div key={charity.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                          <img src={charity.logo} alt={charity.name} className="h-8 w-8 object-contain" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{charity.name}</p>
                          <p className="text-xs text-gray-500 truncate">{charity.mission.substring(0, 60)}...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                                  <Gift className="h-3 w-3 mr-1" />
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
            
            <TabsContent value="kudos" className="pt-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <MessageSquare className="mr-2 text-yellow-500" size={18} />
                  Give Kudos
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Textarea 
                    placeholder={`Write a kudos message for ${user.name}...`}
                    className="mb-3"
                    value={kudosMessage}
                    onChange={(e) => setKudosMessage(e.target.value)}
                  />
                  <Button 
                    onClick={handleSendKudos}
                    className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                  >
                    <Confetti className="mr-2 h-4 w-4" />
                    Send Kudos
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <ThumbsUp className="mr-2 text-blue-500" size={18} />
                    Received Kudos
                  </h3>
                  
                  {receivedKudos.length > 0 ? (
                    <div className="space-y-3">
                      {receivedKudos.map(kudos => {
                        const fromUser = mockUsers.find(u => u.id === kudos.fromUserId);
                        return (
                          <div key={kudos.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={fromUser?.avatarUrl} />
                                <AvatarFallback>
                                  {fromUser?.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{fromUser?.name}</p>
                                <p className="text-xs text-gray-500">{timeAgo(kudos.date)}</p>
                              </div>
                            </div>
                            <p className="text-sm">{kudos.message}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No kudos received yet.</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Send className="mr-2 text-green-500" size={18} />
                    Given Kudos
                  </h3>
                  
                  {givenKudos.length > 0 ? (
                    <div className="space-y-3">
                      {givenKudos.map(kudos => {
                        const toUser = mockUsers.find(u => u.id === kudos.toUserId);
                        return (
                          <div key={kudos.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={toUser?.avatarUrl} />
                                <AvatarFallback>
                                  {toUser?.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">To: {toUser?.name}</p>
                                <p className="text-xs text-gray-500">{timeAgo(kudos.date)}</p>
                              </div>
                            </div>
                            <p className="text-sm">{kudos.message}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No kudos given yet.</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfile;
