
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { mockReportTemplates, mockReports } from '../services/mockData';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, FileText, Download, Clock, Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('templates');

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
          
          <Button className="bg-voli-primary hover:bg-voli-secondary text-black">
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
                    <Button variant="outline" size="sm">Preview</Button>
                    <Button size="sm" className="bg-voli-primary hover:bg-voli-secondary text-black">Generate Report</Button>
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
                      <Button variant="outline" size="sm">
                        {report.status === 'draft' ? 'Edit' : 'View'}
                      </Button>
                      
                      {report.status === 'completed' && (
                        <Button variant="outline" size="icon" className="h-8 w-8">
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
    </Layout>
  );
};

export default Reports;
