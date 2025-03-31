
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    bio: '',
    avatarUrl: user?.avatarUrl || '',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailDigest: true,
    newOpportunities: true,
    teamUpdates: true,
    reportCompletions: true,
    achievementEarned: true,
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: checked }));
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would call an API to update the user profile
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">
            Manage your account and preferences
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and organization details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileForm.avatarUrl} />
                    <AvatarFallback>
                      {profileForm.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">
                    Change Avatar
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={profileForm.organization}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                      placeholder="Tell us about yourself and your impact goals"
                      rows={4}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-voli-primary hover:bg-voli-secondary text-black"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailDigest">Weekly Email Digest</Label>
                      <p className="text-sm text-gray-500">
                        Receive a summary of your impact activities each week
                      </p>
                    </div>
                    <Switch
                      id="emailDigest"
                      checked={notificationSettings.emailDigest}
                      onCheckedChange={(checked) => handleNotificationChange('emailDigest', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newOpportunities">New Opportunities</Label>
                      <p className="text-sm text-gray-500">
                        Get notified when new volunteering or fundraising opportunities match your interests
                      </p>
                    </div>
                    <Switch
                      id="newOpportunities"
                      checked={notificationSettings.newOpportunities}
                      onCheckedChange={(checked) => handleNotificationChange('newOpportunities', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="teamUpdates">Team Updates</Label>
                      <p className="text-sm text-gray-500">
                        Be notified when team members join or complete activities
                      </p>
                    </div>
                    <Switch
                      id="teamUpdates"
                      checked={notificationSettings.teamUpdates}
                      onCheckedChange={(checked) => handleNotificationChange('teamUpdates', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reportCompletions">Report Completions</Label>
                      <p className="text-sm text-gray-500">
                        Get notified when reports are completed or require your attention
                      </p>
                    </div>
                    <Switch
                      id="reportCompletions"
                      checked={notificationSettings.reportCompletions}
                      onCheckedChange={(checked) => handleNotificationChange('reportCompletions', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="achievementEarned">Achievement Earned</Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications when you earn new badges or level up
                      </p>
                    </div>
                    <Switch
                      id="achievementEarned"
                      checked={notificationSettings.achievementEarned}
                      onCheckedChange={(checked) => handleNotificationChange('achievementEarned', checked)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-voli-primary hover:bg-voli-secondary text-black"
                    onClick={handleSaveNotifications}
                  >
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-voli-primary hover:bg-voli-secondary text-black">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
