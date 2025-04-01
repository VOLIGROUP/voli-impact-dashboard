
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { mockReports, mockReportTemplates } from '../services/mockReports';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, FileText, Plus, Download } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SocialMediaTileGenerator from '@/components/reports/SocialMediaTileGenerator';
import WelcomeCard from '@/components/welcome/WelcomeCard';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('reports');
  const isAdmin = user?.role === 'admin' || user?.role === 'manager';

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-500">Generate and manage impact reports</p>
          </div>
          {isAdmin && (
            <Button className="bg-voli-primary hover:bg-voli-secondary text-black">
              <Plus className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          )}
        </div>
        
        {!user && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need to be logged in to access reports
            </AlertDescription>
          </Alert>
        )}
        
        {user && (
          <Tabs defaultValue="reports" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="reports" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Reports
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Social Media
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="reports">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* For admins, display all reports */}
                {isAdmin 
                  ? mockReports.map(report => (
                    <Card key={report.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                        <CardDescription>
                          Created on {new Date(report.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">Status: {report.status}</p>
                        <p className="text-sm text-gray-500">Created by: {report.createdBy}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full gap-2 justify-between">
                          <a href={report.downloadUrl} download>
                            Download Report
                            <Download size={16} />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                  // For regular users, filter reports by their name
                  : mockReports
                    .filter(report => report.createdBy === user.name)
                    .map(report => (
                      <Card key={report.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{report.name}</CardTitle>
                          <CardDescription>
                            Created on {new Date(report.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500">Status: {report.status}</p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full gap-2 justify-between">
                            <a href={report.downloadUrl} download>
                              Download Report
                              <Download size={16} />
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockReportTemplates.map(template => (
                  <Card key={template.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Created on {new Date(template.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {template.sections.length} sections
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="social">
              <SocialMediaTileGenerator />
            </TabsContent>
          </Tabs>
        )}
        
        <div className="mt-8 space-y-2">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WelcomeCard
              title="Generate Impact Report"
              description="Create a new report for your recent volunteer activities"
              icon={<FileText className="h-6 w-6" />}
              to="/reports"
              buttonText="Generate Report"
              onClick={() => setActiveTab('reports')}
              variant="default"
            />
            
            <WelcomeCard
              title="Social Media Templates"
              description="Create assets to share on your social media profiles"
              icon={<FileText className="h-6 w-6" />}
              to="/reports"
              buttonText="Create Assets"
              onClick={() => setActiveTab('social')}
              variant={isAdmin ? 'admin' : 'user'}
            />
            
            {isAdmin && (
              <WelcomeCard
                title="Report Templates"
                description="Manage and create report templates for your team"
                icon={<FileText className="h-6 w-6" />}
                to="/reports"
                buttonText="Manage Templates"
                onClick={() => setActiveTab('templates')}
                variant="admin"
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
