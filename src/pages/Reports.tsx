
import React, { useState } from 'react';
import Layout from '../components/Layout';
import WelcomeCard from '@/components/welcome/WelcomeCard';
import { FileBarChart2, Download, Plus, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { mockReports, mockReportTemplates } from '@/services/mockReports';
import { Report, ReportTemplate } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [activeTab, setActiveTab] = useState<string>("my-reports");

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reports</h1>
          {isAdmin && (
            <Button className="bg-voli-primary hover:bg-voli-secondary text-black">
              <Plus className="mr-2 h-4 w-4" />
              Create New Report
            </Button>
          )}
        </div>
        
        {mockReports.length === 0 ? (
          <div className="max-w-md mx-auto">
            <WelcomeCard 
              title="Impact Reports"
              description="Generate and share reports about your impact activities"
              icon={<FileBarChart2 size={32} />}
              to="/dashboard"
              buttonText="Explore Reports"
              variant={isAdmin ? 'admin' : 'user'}
            />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="my-reports">My Reports</TabsTrigger>
              <TabsTrigger value="templates">Report Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-reports" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockReports.map(report => (
                  <ReportCard 
                    key={report.id} 
                    report={report} 
                    template={mockReportTemplates.find(t => t.id === report.templateId)}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockReportTemplates.map(template => (
                  <TemplateCard 
                    key={template.id} 
                    template={template} 
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

interface ReportCardProps {
  report: Report;
  template?: ReportTemplate;
  isAdmin: boolean;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, template, isAdmin }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{report.name}</CardTitle>
          <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
            {report.status === 'completed' ? 'Completed' : 'Draft'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            <p>Template: {template?.name || 'Custom Report'}</p>
            <p>Created: {format(new Date(report.createdAt), 'MMM d, yyyy')}</p>
            <p>By: {report.createdBy}</p>
          </div>
          
          <div className="flex space-x-2">
            {report.status === 'completed' && (
              <Button size="sm" variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
            {isAdmin && (
              <Button size="sm" variant="outline" className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Update
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface TemplateCardProps {
  template: ReportTemplate;
  isAdmin: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isAdmin }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{template.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">{template.description}</p>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Sections:</h4>
            <div className="flex flex-wrap gap-1">
              {template.sections.slice(0, 3).map((section, index) => (
                <Badge key={index} variant="outline">{section}</Badge>
              ))}
              {template.sections.length > 3 && (
                <Badge variant="outline">+{template.sections.length - 3} more</Badge>
              )}
            </div>
          </div>
          
          <Button size="sm" className="w-full">
            Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Reports;
