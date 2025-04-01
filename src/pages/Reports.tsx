
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { mockReports, mockReportTemplates, getReportTemplateById } from '../services/mockReports';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, FileText, Plus, Download } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SocialMediaTileGenerator from '@/components/reports/SocialMediaTileGenerator';
import WelcomeCard from '@/components/welcome/WelcomeCard';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('reports');
  const [reports, setReports] = useState(mockReports);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const isAdmin = user?.role === 'admin' || user?.role === 'manager';

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      templateId: '',
    }
  });

  const handleCreateReport = (data) => {
    const newReport = {
      id: (reports.length + 1).toString(),
      name: data.name,
      description: data.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: getReportTemplateById(data.templateId)?.type || 'custom',
      status: 'draft',
      data: {},
      templateId: data.templateId,
      createdBy: user?.name || 'Current User',
      downloadUrl: '#',
    };
    
    setReports([...reports, newReport]);
    setCreateDialogOpen(false);
    form.reset();
    toast({
      title: "Report created",
      description: "Your new report has been created successfully."
    });
  };

  const handleDownloadReport = (report) => {
    // In a real app, this would trigger an actual download
    toast({
      title: "Download started",
      description: `The report "${report.name}" is being downloaded.`
    });
  };

  const handleUseTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    form.setValue('templateId', templateId);
    setCreateDialogOpen(true);
  };

  const handleGenerateReport = () => {
    setActiveTab('reports');
    setCreateDialogOpen(true);
  };

  const handleCreateAssets = () => {
    setActiveTab('social');
    toast({
      title: "Social Media Assets",
      description: "Create assets to share on your social media profiles"
    });
  };

  const handleManageTemplates = () => {
    setActiveTab('templates');
    toast({
      title: "Report Templates",
      description: "Browse and use available report templates"
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-500">Generate and manage impact reports</p>
          </div>
          {isAdmin && (
            <Button 
              className="bg-voli-primary hover:bg-voli-secondary text-black"
              onClick={() => setCreateDialogOpen(true)}
            >
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
                  ? reports.map(report => (
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
                        <Button 
                          className="w-full gap-2 justify-between"
                          onClick={() => handleDownloadReport(report)}
                        >
                          Download Report
                          <Download size={16} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                  // For regular users, filter reports by their name
                  : reports
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
                          <Button 
                            className="w-full gap-2 justify-between"
                            onClick={() => handleDownloadReport(report)}
                          >
                            Download Report
                            <Download size={16} />
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
                      <Button 
                        className="w-full"
                        onClick={() => handleUseTemplate(template.id)}
                      >
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
              onClick={handleGenerateReport}
              variant="default"
            />
            
            <WelcomeCard
              title="Social Media Templates"
              description="Create assets to share on your social media profiles"
              icon={<FileText className="h-6 w-6" />}
              to="/reports"
              buttonText="Create Assets"
              onClick={handleCreateAssets}
              variant={isAdmin ? 'admin' : 'user'}
            />
            
            {isAdmin && (
              <WelcomeCard
                title="Report Templates"
                description="Manage and create report templates for your team"
                icon={<FileText className="h-6 w-6" />}
                to="/reports"
                buttonText="Manage Templates"
                onClick={handleManageTemplates}
                variant="admin"
              />
            )}
          </div>
        </div>
      </div>

      {/* Create Report Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new impact report.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handleCreateReport)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Annual Impact Report 2023" {...field} />
                    </FormControl>
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
                      <Input placeholder="Overview of this year's impact" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="templateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value || selectedTemplate || ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockReportTemplates.map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create Report</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Reports;
