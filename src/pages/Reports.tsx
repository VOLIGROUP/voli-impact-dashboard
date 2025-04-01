
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { mockReportTemplates, mockReports, getReportTemplateById } from '../services/mockReports';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, FileText, Download, Clock, Check, Eye } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('templates');
  const [isNewReportDialogOpen, setIsNewReportDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [newReportName, setNewReportName] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePreviewClick = (templateId: string) => {
    const template = getReportTemplateById(templateId);
    toast({
      title: "Preview Mode",
      description: `Previewing "${template?.name}" template`,
    });
    // In a real app, this would open a preview modal or navigate to a preview page
  };

  const handleGenerateReportClick = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setNewReportName('');
    setIsNewReportDialogOpen(true);
  };

  const handleCreateNewReport = () => {
    if (!newReportName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a report name",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would create a new report in the database
    toast({
      title: "Success!",
      description: `Report "${newReportName}" is being generated`,
    });

    setIsNewReportDialogOpen(false);
    
    // Simulate report generation and switch to reports tab
    setTimeout(() => {
      setActiveTab('reports');
      toast({
        title: "Report Ready",
        description: `Your report "${newReportName}" has been generated`,
      });
    }, 1500);
  };

  const handleNewReportClick = () => {
    setActiveTab('templates');
    toast({
      description: "Select a template to generate a new report",
    });
  };

  const handleReportActionClick = (reportId: string, action: 'view' | 'edit' | 'download') => {
    const report = mockReports.find(r => r.id === reportId);
    
    switch (action) {
      case 'view':
      case 'edit':
        toast({
          title: action === 'view' ? "Viewing Report" : "Editing Report",
          description: `${action === 'view' ? 'Opening' : 'Editing'} "${report?.name}"`,
        });
        break;
      case 'download':
        toast({
          title: "Downloading",
          description: `Downloading "${report?.name}"`,
        });
        break;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-500">
              Generate and manage your impact reports
            </p>
          </div>
          
          <Button 
            className="bg-voli-primary hover:bg-voli-secondary text-black"
            onClick={handleNewReportClick}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
        
        <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockReportTemplates.map((template) => (
                <Card key={template.id} className="voli-card">
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="text-sm font-medium mb-2">Sections:</h4>
                    <ul className="space-y-1">
                      {template.sections.map((section, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-voli-primary mr-2" />
                          {section}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePreviewClick(template.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-voli-primary hover:bg-voli-secondary text-black"
                      onClick={() => handleGenerateReportClick(template.id)}
                    >
                      Generate Report
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 font-medium text-gray-500 border-b">
                <div className="col-span-5">Report Name</div>
                <div className="col-span-3">Created</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              
              {mockReports.map((report) => {
                const template = mockReportTemplates.find(t => t.id === report.templateId);
                
                return (
                  <div key={report.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 border-b">
                    <div className="col-span-5">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-xs text-gray-500">{template?.name}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-3 text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString()} by {report.createdBy}
                    </div>
                    
                    <div className="col-span-2">
                      {report.status === 'completed' ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <Check className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                          <Clock className="h-3 w-3 mr-1" />
                          Draft
                        </Badge>
                      )}
                    </div>
                    
                    <div className="col-span-2 flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReportActionClick(
                          report.id, 
                          report.status === 'draft' ? 'edit' : 'view'
                        )}
                      >
                        {report.status === 'draft' ? 'Edit' : 'View'}
                      </Button>
                      
                      {report.status === 'completed' && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleReportActionClick(report.id, 'download')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Report Dialog */}
      <Dialog open={isNewReportDialogOpen} onOpenChange={setIsNewReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate New Report</DialogTitle>
            <DialogDescription>
              Enter a name for your new report.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="report-name" className="text-right">
                Report Name
              </Label>
              <Input
                id="report-name"
                value={newReportName}
                onChange={(e) => setNewReportName(e.target.value)}
                placeholder="Q2 2023 Impact Report"
                className="col-span-3"
              />
            </div>
            {selectedTemplateId && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Template</Label>
                <div className="col-span-3">
                  {getReportTemplateById(selectedTemplateId)?.name}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateNewReport} className="bg-voli-primary hover:bg-voli-secondary text-black">
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Reports;
