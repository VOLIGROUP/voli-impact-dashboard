
import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload } from 'lucide-react';

const CompanyLogoUpload = () => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Logo image must be less than 2MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // In a real app, we would upload this to a storage service
      // For now, we'll create a local URL
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        if (event.target?.result) {
          // Update the user profile with the new logo
          await updateUserProfile({
            companyLogo: event.target.result as string,
          });
          
          toast({
            title: "Logo updated",
            description: "Company logo has been updated successfully",
          });
        }
        setUploading(false);
      };
      
      reader.onerror = () => {
        toast({
          title: "Upload failed",
          description: "There was an error uploading the image",
          variant: "destructive",
        });
        setUploading(false);
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      setUploading(false);
    }
  };

  // Only show this component to admin users
  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Logo</CardTitle>
        <CardDescription>
          Upload your company logo that will be displayed for all users in your organization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="border border-gray-200 rounded-md p-4 w-40 h-20 flex items-center justify-center">
            {user?.companyLogo ? (
              <img 
                src={user.companyLogo} 
                alt="Company Logo" 
                className="max-w-full max-h-full object-contain" 
              />
            ) : (
              <span className="text-gray-400 text-sm">No logo uploaded</span>
            )}
          </div>
          
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              onClick={handleUploadClick}
              disabled={uploading}
              className="bg-voli-primary hover:bg-voli-secondary text-black"
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? 'Uploading...' : 'Upload Logo'}
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Recommended size: 250x80px. Max file size: 2MB.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyLogoUpload;
