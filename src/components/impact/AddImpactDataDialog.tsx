
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload } from "lucide-react";
import ImpactDataForm from "./ImpactDataForm";

interface AddImpactDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddImpactDataDialog = ({ open, onOpenChange }: AddImpactDataDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Impact Data</DialogTitle>
          <DialogDescription>
            Use this form to add new impact data to your dashboard
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="form" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              <span>Manual Input</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              <span>Upload CSV</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="pt-4">
            <ImpactDataForm onComplete={() => onOpenChange(false)} />
          </TabsContent>
          
          <TabsContent value="upload" className="pt-4">
            <div className="border-2 border-dashed rounded-lg p-10 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-sm text-gray-500">
                Drag and drop your CSV file here, or click to browse
              </p>
              <input
                type="file"
                accept=".csv"
                className="hidden"
                id="csv-upload"
                onChange={() => {}}
              />
              <label
                htmlFor="csv-upload"
                className="mt-4 inline-flex items-center justify-center rounded-md bg-voli-primary px-4 py-2 text-sm font-medium text-black hover:bg-voli-secondary cursor-pointer"
              >
                Browse Files
              </label>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddImpactDataDialog;
