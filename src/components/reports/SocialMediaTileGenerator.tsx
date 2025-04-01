
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
import { Slider } from "@/components/ui/slider";
import { Instagram, Linkedin, Download, Copy, Check, Image, Text, Square, Circle, Facebook, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { Switch } from "@/components/ui/switch";

const platformDimensions = {
  linkedin: { width: 1200, height: 627 },
  instagram: { width: 1080, height: 1080 },
  facebook: { width: 1200, height: 630 },
  twitter: { width: 1200, height: 675 }
};

const backgroundStyles = [
  { name: "Gradient", value: "gradient" },
  { name: "Solid Color", value: "solid" },
  { name: "Pattern", value: "pattern" }
];

const textStyles = [
  { name: "Light", value: "light" },
  { name: "Bold", value: "bold" },
  { name: "Thin", value: "thin" }
];

const patterns = [
  { name: "Dots", value: "radial-gradient(#000 1px, transparent 1px)" },
  { name: "Stripes", value: "repeating-linear-gradient(45deg, #00000010 0px, #00000010 10px, transparent 10px, transparent 20px)" },
  { name: "Grid", value: "linear-gradient(#00000015 1px, transparent 1px), linear-gradient(90deg, #00000015 1px, transparent 1px)" }
];

const SocialMediaTileGenerator: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<"linkedin" | "instagram" | "facebook" | "twitter">("linkedin");
  const [title, setTitle] = useState("EMPLOYEE SPOTLIGHT");
  const [subtitle, setSubtitle] = useState("");
  const [showStats, setShowStats] = useState(true);
  const [statLabels, setStatLabels] = useState({
    stat1: "Impact Points",
    stat2: "Events",
    stat3: "Badges"
  });
  const [gradientColors, setGradientColors] = useState({
    from: "#f97316",
    to: "#f43f5e"
  });
  const [backgroundStyle, setBackgroundStyle] = useState<"gradient" | "solid" | "pattern">("gradient");
  const [solidColor, setSolidColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#ffffff");
  const [pattern, setPattern] = useState(patterns[0].value);
  const [textStyle, setTextStyle] = useState<"light" | "bold" | "thin">("bold");
  const [opacity, setOpacity] = useState(100);
  const [showLogo, setShowLogo] = useState(true);
  const [borderRadius, setBorderRadius] = useState(12);
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

  const getBackgroundStyle = () => {
    switch (backgroundStyle) {
      case "gradient":
        return `linear-gradient(135deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`;
      case "solid":
        return solidColor;
      case "pattern":
        return solidColor;
    }
  };

  const getFontWeight = () => {
    switch (textStyle) {
      case "light": return "font-light";
      case "bold": return "font-bold";
      case "thin": return "font-thin";
      default: return "font-bold";
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 space-y-4">
              {/* Basic Settings */}
              <div className="space-y-4">
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
                    onValueChange={(v) => setSelectedPlatform(v as "linkedin" | "instagram" | "facebook" | "twitter")}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="linkedin">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </TabsTrigger>
                      <TabsTrigger value="instagram">
                        <Instagram className="h-4 w-4 mr-2" />
                        Instagram
                      </TabsTrigger>
                      <TabsTrigger value="facebook">
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </TabsTrigger>
                      <TabsTrigger value="twitter">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
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
                
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input 
                    id="subtitle" 
                    value={subtitle} 
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Add a subtitle (optional)" 
                  />
                </div>
              </div>

              {/* Background Settings */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Background Settings</h3>
                
                <div className="space-y-2">
                  <Label>Background Style</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {backgroundStyles.map(style => (
                      <Button
                        key={style.value}
                        type="button"
                        variant={backgroundStyle === style.value ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setBackgroundStyle(style.value as "gradient" | "solid" | "pattern")}
                      >
                        {style.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {backgroundStyle === "gradient" && (
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
                )}

                {backgroundStyle === "solid" && (
                  <div className="space-y-2">
                    <Label htmlFor="solidColor">Background Color</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="color" 
                        id="solidColor" 
                        value={solidColor} 
                        onChange={(e) => setSolidColor(e.target.value)}
                        className="w-10 h-10 p-1 cursor-pointer"
                      />
                      <Input 
                        type="text" 
                        value={solidColor} 
                        onChange={(e) => setSolidColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                )}
                
                {backgroundStyle === "pattern" && (
                  <div className="space-y-2">
                    <Label htmlFor="patternSelect">Pattern</Label>
                    <Select 
                      onValueChange={(value) => setPattern(value)}
                      defaultValue={patterns[0].value}
                    >
                      <SelectTrigger id="patternSelect">
                        <SelectValue placeholder="Select a pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        {patterns.map(pat => (
                          <SelectItem key={pat.name} value={pat.value}>
                            {pat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Label htmlFor="patternColor">Background Color</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="color" 
                        id="patternColor" 
                        value={solidColor} 
                        onChange={(e) => setSolidColor(e.target.value)}
                        className="w-10 h-10 p-1 cursor-pointer"
                      />
                      <Input 
                        type="text" 
                        value={solidColor} 
                        onChange={(e) => setSolidColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="opacity">Background Opacity: {opacity}%</Label>
                  <Slider 
                    id="opacity"
                    defaultValue={[100]} 
                    max={100} 
                    min={30} 
                    step={5}
                    onValueChange={(value) => setOpacity(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="borderRadius">Border Radius: {borderRadius}px</Label>
                  <Slider 
                    id="borderRadius"
                    defaultValue={[12]} 
                    max={24} 
                    min={0} 
                    step={2}
                    onValueChange={(value) => setBorderRadius(value[0])}
                  />
                </div>
              </div>

              {/* Text Settings */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Text Settings</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="textColor">Text Color</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="color" 
                      id="textColor" 
                      value={textColor} 
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-10 h-10 p-1 cursor-pointer"
                    />
                    <Input 
                      type="text" 
                      value={textColor} 
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Text Style</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {textStyles.map(style => (
                      <Button
                        key={style.value}
                        type="button"
                        variant={textStyle === style.value ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setTextStyle(style.value as "light" | "bold" | "thin")}
                      >
                        {style.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showLogo">Show Organization Logo</Label>
                  <Switch 
                    id="showLogo" 
                    checked={showLogo} 
                    onCheckedChange={setShowLogo}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showStats">Show Statistics</Label>
                  <Switch 
                    id="showStats" 
                    checked={showStats} 
                    onCheckedChange={setShowStats}
                  />
                </div>
              </div>

              {/* Statistics Settings */}
              {showStats && (
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
              )}
            </div>

            <div className="md:col-span-7">
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 overflow-hidden" style={{minHeight: '500px'}}>
                {selectedUser ? (
                  <div 
                    ref={tileRef}
                    style={{
                      width: `${platformDimensions[selectedPlatform].width / 3}px`,
                      height: `${platformDimensions[selectedPlatform].height / 3}px`,
                      background: getBackgroundStyle(),
                      backgroundColor: backgroundStyle === "pattern" ? solidColor : undefined,
                      backgroundImage: backgroundStyle === "pattern" ? pattern : undefined,
                      backgroundSize: backgroundStyle === "pattern" ? "30px 30px" : undefined,
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: `${borderRadius}px`,
                      opacity: opacity / 100
                    }}
                    className="overflow-hidden shadow-xl"
                  >
                    {/* Logo and Title Area */}
                    <div className="absolute top-0 left-0 w-full p-4">
                      <div className="flex flex-col">
                        {showLogo && selectedUser.companyLogo && (
                          <img 
                            src={selectedUser.companyLogo} 
                            alt="Company Logo" 
                            className="h-8 mb-2 object-contain"
                            style={{ filter: `drop-shadow(0 0 2px rgba(0,0,0,0.3))` }}
                          />
                        )}
                        {showLogo && !selectedUser.companyLogo && (
                          <div className={`text-lg mb-2 ${getFontWeight()}`} style={{ color: textColor }}>
                            {selectedUser.organization || "VOLI"}
                          </div>
                        )}
                        <div className={`text-2xl tracking-tight ${getFontWeight()}`} style={{ color: textColor }}>
                          {title}
                        </div>
                        {subtitle && (
                          <div className="text-sm mt-1 opacity-90" style={{ color: textColor }}>
                            {subtitle}
                          </div>
                        )}
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
                          <span style={{ color: textColor }} className="text-4xl font-bold">
                            {selectedUser.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Employee Name */}
                    <div className="absolute left-0 bottom-[80px] w-full px-4">
                      <div className="flex flex-col">
                        <span style={{ color: `${textColor}80` }} className="text-sm">{selectedUser.role.replace('_', ' ')}</span>
                        <span style={{ color: textColor }} className={`text-xl ${getFontWeight()}`}>{selectedUser.name}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    {showStats && (
                      <div className="absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-sm p-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="flex flex-col">
                            <span style={{ color: textColor }} className={`text-2xl ${getFontWeight()}`}>{selectedUser.points}</span>
                            <span style={{ color: `${textColor}80` }} className="text-xs">{statLabels.stat1}</span>
                          </div>
                          <div className="flex flex-col">
                            <span style={{ color: textColor }} className={`text-2xl ${getFontWeight()}`}>{Math.floor(Math.random() * 15) + 5}</span>
                            <span style={{ color: `${textColor}80` }} className="text-xs">{statLabels.stat2}</span>
                          </div>
                          <div className="flex flex-col">
                            <span style={{ color: textColor }} className={`text-2xl ${getFontWeight()}`}>{selectedUser.badges.length}</span>
                            <span style={{ color: `${textColor}80` }} className="text-xs">{statLabels.stat3}</span>
                          </div>
                        </div>
                      </div>
                    )}
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
