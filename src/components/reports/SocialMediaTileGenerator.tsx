
import React, { useState, useRef, useEffect } from "react";
import { User } from "@/types/auth";
import { mockUsers } from "@/services/mockUsers";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Instagram, Linkedin, Download, Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";

const platformDimensions = {
  linkedin: { width: 1200, height: 627 },
  instagram: { width: 1080, height: 1080 }
};

const SocialMediaTileGenerator: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<"linkedin" | "instagram">("linkedin");
  const [title, setTitle] = useState("EMPLOYEE SPOTLIGHT");
  const [statLabels, setStatLabels] = useState({
    stat1: "Impact Points",
    stat2: "Events",
    stat3: "Badges"
  });
  const [gradientColors, setGradientColors] = useState({
    from: "#f97316",
    to: "#f43f5e"
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  
  const tileRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const exportTile = async () => {
    if (!tileRef.current) return;
    
    setIsGeneratingImage(true);
    try {
      const canvas = await html2canvas(tileRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${selectedUser?.name.replace(/\s+/g, '-').toLowerCase()}-${selectedPlatform}-spotlight.png`;
      link.click();
      
      toast({
        title: "Success!",
        description: "Social media tile exported successfully",
      });
    } catch (error) {
      console.error("Error exporting tile:", error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the tile",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const copyToClipboard = async () => {
    if (!tileRef.current) return;
    
    try {
      const canvas = await html2canvas(tileRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false
      });
      
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ]);
          setIsCopied(true);
          toast({
            title: "Copied!",
            description: "Image copied to clipboard",
          });
        }
      });
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast({
        title: "Copy failed",
        description: "There was an error copying the image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="voli-card">
        <CardHeader>
          <CardTitle>Social Media Tile Generator</CardTitle>
          <CardDescription>
            Create branded social media tiles for employee spotlights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee">Select Employee</Label>
                <Select 
                  onValueChange={(value) => {
                    const user = mockUsers.find(u => u.id === value);
                    setSelectedUser(user || null);
                  }}
                >
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} - {user.role.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Tabs 
                  defaultValue="linkedin" 
                  value={selectedPlatform} 
                  onValueChange={(v) => setSelectedPlatform(v as "linkedin" | "instagram")}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="linkedin">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </TabsTrigger>
                    <TabsTrigger value="instagram">
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Headline</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="EMPLOYEE SPOTLIGHT" 
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="colorFrom">Gradient From</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="color" 
                      id="colorFrom" 
                      value={gradientColors.from} 
                      onChange={(e) => setGradientColors({...gradientColors, from: e.target.value})}
                      className="w-10 h-10 p-1 cursor-pointer"
                    />
                    <Input 
                      type="text" 
                      value={gradientColors.from} 
                      onChange={(e) => setGradientColors({...gradientColors, from: e.target.value})}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="colorTo">Gradient To</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="color" 
                      id="colorTo" 
                      value={gradientColors.to} 
                      onChange={(e) => setGradientColors({...gradientColors, to: e.target.value})}
                      className="w-10 h-10 p-1 cursor-pointer"
                    />
                    <Input 
                      type="text" 
                      value={gradientColors.to} 
                      onChange={(e) => setGradientColors({...gradientColors, to: e.target.value})}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Stat Labels</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input 
                    value={statLabels.stat1} 
                    onChange={(e) => setStatLabels({...statLabels, stat1: e.target.value})}
                    placeholder="Stat 1" 
                  />
                  <Input 
                    value={statLabels.stat2} 
                    onChange={(e) => setStatLabels({...statLabels, stat2: e.target.value})}
                    placeholder="Stat 2" 
                  />
                  <Input 
                    value={statLabels.stat3} 
                    onChange={(e) => setStatLabels({...statLabels, stat3: e.target.value})}
                    placeholder="Stat 3" 
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 overflow-hidden" style={{minHeight: '400px'}}>
                {selectedUser ? (
                  <div 
                    ref={tileRef}
                    style={{
                      width: `${platformDimensions[selectedPlatform].width / 3}px`,
                      height: `${platformDimensions[selectedPlatform].height / 3}px`,
                      background: `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    className="rounded-xl overflow-hidden shadow-xl"
                  >
                    {/* Logo and Title Area */}
                    <div className="absolute top-0 left-0 w-full p-4">
                      <div className="flex flex-col">
                        {selectedUser.companyLogo ? (
                          <img 
                            src={selectedUser.companyLogo} 
                            alt="Company Logo" 
                            className="h-8 mb-2 object-contain"
                          />
                        ) : (
                          <div className="text-white text-lg font-bold mb-2">
                            {selectedUser.organization || "VOLI"}
                          </div>
                        )}
                        <div className="text-white text-2xl font-black tracking-tight">
                          {title}
                        </div>
                      </div>
                    </div>

                    {/* Employee Image */}
                    <div className="w-full h-full flex items-center justify-center">
                      {selectedUser.avatarUrl ? (
                        <div className="relative w-4/5 h-4/5 rounded-lg overflow-hidden">
                          <img 
                            src={selectedUser.avatarUrl} 
                            alt={selectedUser.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="bg-white/20 w-4/5 h-4/5 rounded-lg flex items-center justify-center">
                          <span className="text-white text-4xl font-bold">
                            {selectedUser.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Employee Name */}
                    <div className="absolute left-0 bottom-[80px] w-full px-4">
                      <div className="flex flex-col">
                        <span className="text-white/80 text-sm">{selectedUser.role.replace('_', ' ')}</span>
                        <span className="text-white text-xl font-bold">{selectedUser.name}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-sm p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-bold">{selectedUser.points}</span>
                          <span className="text-white/80 text-xs">{statLabels.stat1}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-bold">{Math.floor(Math.random() * 15) + 5}</span>
                          <span className="text-white/80 text-xs">{statLabels.stat2}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white text-2xl font-bold">{selectedUser.badges.length}</span>
                          <span className="text-white/80 text-xs">{statLabels.stat3}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <p>Select an employee to generate a social media tile</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={copyToClipboard} 
            disabled={!selectedUser || isCopied}
            className="w-[140px]"
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </>
            )}
          </Button>
          <Button 
            onClick={exportTile} 
            disabled={!selectedUser || isGeneratingImage}
            className="bg-voli-primary hover:bg-voli-secondary text-black w-[140px]"
          >
            {isGeneratingImage ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exporting...
              </span>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export Image
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SocialMediaTileGenerator;
