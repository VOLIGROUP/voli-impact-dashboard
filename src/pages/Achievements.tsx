
import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, TrendingUp, Trophy, Star, Target, Users, Calendar, Book, Heart } from 'lucide-react';

const badgeInfo = {
  'Newcomer': {
    description: 'Joined the VOLI platform',
    icon: <Users className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-800',
    earnedAt: '2023-03-20',
  },
  'Volunteer': {
    description: 'Completed first volunteer activity',
    icon: <Heart className="h-5 w-5" />,
    color: 'bg-red-100 text-red-800',
    earnedAt: '2023-04-05',
  },
  'Impact Leader': {
    description: 'Reached 1000 impact points',
    icon: <Target className="h-5 w-5" />,
    color: 'bg-purple-100 text-purple-800',
    earnedAt: '2023-02-15',
  },
  'Founder': {
    description: 'One of the first users on the platform',
    icon: <Star className="h-5 w-5" />,
    color: 'bg-amber-100 text-amber-800',
    earnedAt: '2023-01-15',
  },
  'Community Builder': {
    description: 'Invited 5+ team members',
    icon: <Users className="h-5 w-5" />,
    color: 'bg-green-100 text-green-800',
    earnedAt: '2023-02-28',
  },
};

const levelMilestones = [
  { level: 1, points: 0, reward: 'Access to basic features' },
  { level: 2, points: 100, reward: 'Newcomer badge' },
  { level: 3, points: 300, reward: 'Ability to create custom dashboards' },
  { level: 4, points: 600, reward: 'Advanced report templates' },
  { level: 5, points: 1000, reward: 'Impact Leader badge' },
  { level: 6, points: 1500, reward: 'Early access to new features' },
  { level: 7, points: 2200, reward: 'Premium marketplace listings' },
  { level: 8, points: 3000, reward: 'Dedicated success manager' },
  { level: 9, points: 4000, reward: 'Community spotlight' },
  { level: 10, points: 5000, reward: 'Impact Champion badge' },
];

const upcomingAchievements = [
  {
    title: 'Fundraising Star',
    description: 'Raise $1000+ through campaigns',
    progress: 65,
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: 'Consistent Contributor',
    description: 'Log activity for 10 consecutive weeks',
    progress: 40,
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: 'Knowledge Seeker',
    description: 'Complete 5 sustainability courses',
    progress: 20,
    icon: <Book className="h-5 w-5" />,
  },
];

const Achievements: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Calculate next level info
  const currentLevel = user.level;
  const nextLevel = currentLevel + 1;
  const currentLevelObj = levelMilestones.find(m => m.level === currentLevel) || { level: currentLevel, points: 0, reward: '' };
  const nextLevelObj = levelMilestones.find(m => m.level === nextLevel) || { level: nextLevel, points: currentLevelObj.points + 500, reward: 'More rewards' };
  
  const pointsForNextLevel = nextLevelObj.points - currentLevelObj.points;
  const currentLevelProgress = user.points - currentLevelObj.points;
  const progressPercentage = Math.min(100, (currentLevelProgress / pointsForNextLevel) * 100);
  
  // Get earned badges
  const earnedBadges = user.badges.map(badgeName => ({
    name: badgeName,
    ...(badgeInfo[badgeName] || {
      description: 'A special achievement',
      icon: <Award className="h-5 w-5" />,
      color: 'bg-gray-100 text-gray-800',
      earnedAt: 'Unknown date',
    })
  }));

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
          <p className="text-gray-500">
            Track your progress and earn rewards for your impact
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-voli-light flex items-center justify-center">
                <span className="text-2xl font-bold">{user.level}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Level {user.level}</h2>
                <p className="text-gray-500">
                  {user.points} impact points
                </p>
              </div>
            </div>
            
            <Badge className="bg-voli-primary text-black px-3 py-1">
              <Trophy className="h-4 w-4 mr-2" />
              {user.badges.length} {user.badges.length === 1 ? 'Badge' : 'Badges'} Earned
            </Badge>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>{currentLevelObj.points} points</span>
              <span>{nextLevelObj.points} points</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm">
              <span>Current: Level {currentLevel}</span>
              <span>Next: Level {nextLevel} ({nextLevelObj.points - user.points} points needed)</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-voli-light flex items-center justify-center">
                <Trophy className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Level {nextLevel} Reward</h3>
                <p className="text-sm text-gray-600">{nextLevelObj.reward}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList>
            <TabsTrigger value="badges">Earned Badges</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Achievements</TabsTrigger>
            <TabsTrigger value="levels">Level Milestones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earnedBadges.map((badge) => (
                <Card key={badge.name} className="voli-card">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`h-12 w-12 rounded-full ${badge.color} flex items-center justify-center`}>
                        {badge.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{badge.name}</h3>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingAchievements.map((achievement, index) => (
                <Card key={index} className="voli-card">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="levels" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Level Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {levelMilestones.map((milestone) => (
                    <div 
                      key={milestone.level} 
                      className={`p-4 rounded-lg border ${
                        milestone.level === user.level 
                          ? 'border-voli-primary bg-voli-light/10' 
                          : milestone.level < user.level 
                            ? 'border-gray-200 bg-gray-50' 
                            : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold ${
                            milestone.level <= user.level 
                              ? 'bg-voli-primary text-black' 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {milestone.level}
                          </div>
                          <div>
                            <h3 className={`font-medium ${milestone.level === user.level ? 'text-black' : ''}`}>
                              Level {milestone.level}
                              {milestone.level === user.level && <span className="ml-2 text-sm text-voli-dark">(Current)</span>}
                            </h3>
                            <p className="text-sm text-gray-600">{milestone.points} points required</p>
                          </div>
                        </div>
                        <div>
                          <Badge className={milestone.level <= user.level 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                          }>
                            {milestone.level <= user.level ? 'Achieved' : 'Locked'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm pl-11">
                        <span className="text-gray-600">Reward: </span>
                        <span className={milestone.level === user.level ? 'font-medium' : ''}>
                          {milestone.reward}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Achievements;
