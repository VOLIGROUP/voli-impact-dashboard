
import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import WelcomeCard from '../components/welcome/WelcomeCard';
import GuideTipCard from '../components/welcome/GuideTipCard';
import { 
  UserCircle, 
  Trophy, 
  BarChart3, 
  Users, 
  Store, 
  Lightbulb, 
  Workflow, 
  Clock, 
  Handshake,
  Heart
} from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const Welcome: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <Layout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to VOLI</h1>
          <p className="text-gray-500">
            Discover tools to track, measure, and grow your volunteering impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Action Cards */}
          <WelcomeCard
            title="Complete Your Profile"
            description="Update your profile information to help others connect with you."
            icon={<UserCircle size={24} />}
            to="/settings"
            buttonText="Update Profile"
            variant={isAdmin ? 'admin' : 'user'}
          />
          
          <WelcomeCard
            title="Track Your Impact"
            description="Log your volunteer hours and see the difference you're making."
            icon={<Clock size={24} />}
            to="/dashboard"
            buttonText="Log Hours"
            variant={isAdmin ? 'admin' : 'user'}
          />
          
          <WelcomeCard
            title="Explore Achievements"
            description="Discover badges and rewards you can earn through your contributions."
            icon={<Trophy size={24} />}
            to="/achievements"
            buttonText="View Achievements"
            variant={isAdmin ? 'admin' : 'user'}
          />
          
          {isAdmin && (
            <>
              <WelcomeCard
                title="Review Reports"
                description="Access analytics and reports to track overall impact."
                icon={<BarChart3 size={24} />}
                to="/reports"
                buttonText="View Reports"
                variant="admin"
              />
              
              <WelcomeCard
                title="Manage Team"
                description="View and manage your organization's volunteer team."
                icon={<Users size={24} />}
                to="/team"
                buttonText="View Team"
                variant="admin"
              />
            </>
          )}
          
          <WelcomeCard
            title="Browse Marketplace"
            description="Discover opportunities and resources in our marketplace."
            icon={<Store size={24} />}
            to="/marketplace"
            buttonText="Visit Marketplace"
          />
        </div>

        <h2 className="text-2xl font-bold tracking-tight mt-8">Platform Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GuideTipCard
            title="Getting Started"
            description="First steps to maximize your VOLI experience"
            tips={[
              "Complete your profile with accurate information",
              "Set your volunteering interests and skills",
              "Connect with your organization members",
              "Review available opportunities in the marketplace"
            ]}
            icon={<Lightbulb size={24} />}
            badge="Essential"
          />
          
          <GuideTipCard
            title="Tracking Impact"
            description="How to log and track your volunteer hours"
            tips={[
              "Use the Log Hours button on the dashboard",
              "Add detailed descriptions of your activities",
              "Upload photos as evidence when possible",
              "Regularly review your impact metrics"
            ]}
            icon={<Clock size={24} />}
          />
          
          <GuideTipCard
            title="Using the Dashboard"
            description="Navigating your personalized dashboard"
            tips={[
              "View your impact metrics at the top",
              "Check recent activities in the timeline",
              "Use widgets to track different aspects of your work",
              "Customize your dashboard with relevant widgets"
            ]}
            icon={<Workflow size={24} />}
          />
          
          <GuideTipCard
            title="Earning Achievements"
            description="How to earn badges and level up"
            tips={[
              "Complete regular volunteer activities",
              "Participate in special events and challenges",
              "Reach milestone hour targets",
              "Collaborate with team members on projects"
            ]}
            icon={<Trophy size={24} />}
          />
          
          <GuideTipCard
            title="Collaboration Tips"
            description="Working effectively with your team"
            tips={[
              "Join group volunteering activities",
              "Share opportunities with team members",
              "Provide feedback on group activities",
              "Recognize others' contributions"
            ]}
            icon={<Handshake size={24} />}
          />
          
          <GuideTipCard
            title="Making an Impact"
            description="Maximizing your volunteering effectiveness"
            tips={[
              "Focus on quality over quantity of hours",
              "Document the outcomes of your work",
              "Gather testimonials from beneficiaries",
              "Reflect on and share your experiences"
            ]}
            icon={<Heart size={24} />}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
          <h3 className="text-lg font-medium mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Hover over these terms to learn more about key VOLI features:
          </p>
          
          <div className="flex flex-wrap gap-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-help">
                  Impact Points
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Impact Points</h4>
                  <p className="text-sm text-gray-600">
                    Points earned through volunteering activities. They contribute to your level and achievements.
                    Different activities award different point values based on impact.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm cursor-help">
                  Badges
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Badges</h4>
                  <p className="text-sm text-gray-600">
                    Achievements earned for specific accomplishments. Badges showcase your volunteering expertise and commitment.
                    Display them on your profile to highlight your contributions.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm cursor-help">
                  Dashboard Widgets
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Dashboard Widgets</h4>
                  <p className="text-sm text-gray-600">
                    Customizable components on your dashboard that display different metrics and information.
                    Arrange and select widgets that are most relevant to your volunteering focus.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm cursor-help">
                  Marketplace
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Marketplace</h4>
                  <p className="text-sm text-gray-600">
                    Platform section where you can discover volunteering opportunities, resources, and tools.
                    Browse by category or search for specific interests to find relevant listings.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
