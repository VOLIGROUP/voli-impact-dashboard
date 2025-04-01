import React, { useState } from 'react';
import Layout from '../components/Layout';
import { mockReportTemplates, mockReports, getReportTemplateById } from '../services/mockReports';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, FileText, Download, Clock, Check, Eye, ImageIcon, FileBarChart2, Palette, Award } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import SocialMediaTileGenerator from '@/components/reports/SocialMediaTileGenerator';
import { WelcomeCard } from "@/components/welcome/WelcomeCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('welcome');
  const [isNewReportDialogOpen, setIsNewReportDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [newReportName, setNewReportName] = useState('');
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePreviewClick = (templateId: string) => {
    const template = getReportTemplateById(templateId);
    if (template) {
      setPreviewTemplate(template);
      setIsPreviewDialogOpen(true);
    }
    
    toast({
      title: "Preview Mode",
      description: `Previewing "${template?.name}" template`,
    });
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

    toast({
      title: "Success!",
      description: `Report "${newReportName}" is being generated`,
    });

    setIsNewReportDialogOpen(false);
    
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
        const template = getReportTemplateById(report?.templateId || "");
        if (template) {
          setPreviewTemplate(template);
          setIsPreviewDialogOpen(true);
        }
        
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

  const renderMockDataForSection = (section: string) => {
    switch (section) {
      case 'Governance':
      case 'Workers':
      case 'Community':
      case 'Environment':
      case 'Customers':
        return (
          <>
            <h4 className="text-sm font-semibold mb-2 mt-4">{section} Metrics:</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Total {section} Score</TableCell>
                  <TableCell>85 / 100</TableCell>
                  <TableCell className="text-green-600">↑ 12%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{section} Engagement</TableCell>
                  <TableCell>High</TableCell>
                  <TableCell className="text-green-600">↑ 8%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{section} Satisfaction</TableCell>
                  <TableCell>92%</TableCell>
                  <TableCell className="text-green-600">↑ 5%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-sm text-gray-600 mt-2">
              This section shows key metrics related to {section.toLowerCase()} performance and impact.
              In a complete report, this would include detailed analysis, charts, and recommendations.
            </p>
          </>
        );
      
      case 'Executive Summary':
        return (
          <>
            <h4 className="text-sm font-semibold mb-2 mt-4">{section}:</h4>
            <p className="text-sm text-gray-700">
              This report summarizes our organization's sustainability efforts for the past year.
              Overall, we've seen significant improvements across all key metrics, with notable
              success in reducing our carbon footprint by 15% and increasing community engagement by 22%.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Our goals for the upcoming year include further reductions in environmental impact and
              expanding our social responsibility programs to new regions.
            </p>
          </>
        );
      
      default:
        return (
          <>
            <h4 className="text-sm font-semibold mb-2 mt-4">{section}:</h4>
            <p className="text-sm text-gray-700">
              This section would contain detailed information about {section.toLowerCase()}.
              In a complete report, you would see metrics, analysis, and visualizations related to this area.
            </p>
          </>
        );
    }
  };

  const handleRoleSelect = (role: string) => {
    switch (role) {
      case 'reporting-analyst':
        setActiveTab('templates');
        toast({
          title: "Reporting Analyst Selected",
          description: "You can now generate and manage impact reports",
        });
        break;
      case 'marketing-designer':
        setActiveTab('social-media');
        toast({
          title: "Marketing & Graphic Designer Selected",
          description: "You can now create social media tiles for your impact",
        });
        break;
      case 'bcorp-consultant':
        setActiveTab('templates'); // For now, we'll redirect to templates as B-Corp specific view isn't implemented
        toast({
          title: "B-Corp Consultant Selected",
          description: "B-Corp reporting assistance activated",
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
              Generate and manage your impact reports and social media assets
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setActiveTab('social-media')}
              className="gap-2"
            >
              <ImageIcon className="h-4 w-4" />
              Social Media
            </Button>
            <Button 
              className="bg-voli-primary hover:bg-voli-secondary text-black"
              onClick={handleNewReportClick}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="welcome" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-[800px] grid-cols-4">
            <TabsTrigger value="welcome">AI Impact Officer</TabsTrigger>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="reports">Generated Reports</TabsTrigger>
            <TabsTrigger value="social-media">Social Media</TabsTrigger>
          </TabsList>

          <TabsContent value="welcome" className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Your AI Impact Officer</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Your AI Impact Officer can help with various aspects of impact reporting and communication.
                  Select a role below to get started.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-100 pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileBarChart2 className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Reporting Analyst</CardTitle>
                    <CardDescription className="text-center">
                      Generate comprehensive impact reports
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2 font-bold">•</span>
                        <span>Create custom impact reports</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2 font-bold">•</span>
                        <span>Various templates for different needs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2 font-bold">•</span>
                        <span>Export and share with stakeholders</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      onClick={() => handleRoleSelect('reporting-analyst')} 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Select Role
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-100 pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                        <Palette className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Marketing & Graphic Designer</CardTitle>
                    <CardDescription className="text-center">
                      Create social media content for impact
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 font-bold">•</span>
                        <span>Generate employee spotlight tiles</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 font-bold">•</span>
                        <span>Branded LinkedIn & Instagram content</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 font-bold">•</span>
                        <span>Customize colors and content</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      onClick={() => handleRoleSelect('marketing-designer')} 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Select Role
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-violet-100 pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
                        <Award className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                    <CardTitle className="text-center">B-Corp Consultant</CardTitle>
                    <CardDescription className="text-center">
                      Streamline B-Corp reporting
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2 font-bold">•</span>
                        <span>Extract B-Corp relevant data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2 font-bold">•</span>
                        <span>Interpret business impact metrics</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2 font-bold">•</span>
                        <span>One-click B-Corp report generation</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      onClick={() => handleRoleSelect('bcorp-consultant')} 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Select Role
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
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
          
          <TabsContent value="social-media" className="space-y-6">
            <SocialMediaTileGenerator />
          </TabsContent>
        </Tabs>
      </div>

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
      
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-3xl h-[80vh] block">
          <DialogHeader>
            <DialogTitle>
              {previewTemplate?.name || "Report Preview"}
            </DialogTitle>
            <DialogDescription>
              {previewTemplate?.description || "Preview of the report template"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-y-auto mt-4 pr-2" style={{ maxHeight: "calc(80vh - 180px)" }}>
            {previewTemplate && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">{previewTemplate.name}</h3>
                  <p className="text-gray-700 mb-6">{previewTemplate.description}</p>
                  
                  {previewTemplate.sections.map((section: string, index: number) => (
                    <div key={index} className="mb-6">
                      {renderMockDataForSection(section)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              Close Preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Reports;
