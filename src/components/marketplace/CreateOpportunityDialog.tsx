import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { mockImpactCategories } from "../../services/mockMarketplace";
import { useToast } from "@/hooks/use-toast";
import { Marketplace } from "../../types/dashboard";
import { Calendar, Clock, DollarSign, Image, MapPin, Users } from 'lucide-react';

const opportunitySchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  organization: z.string().min(3, { message: "Organization name required" }),
  type: z.enum(["volunteer", "fundraising"], { 
    required_error: "Please select an opportunity type"
  }),
  impactCategory: z.string({ required_error: "Please select a primary SDG" }),
  sdgGoals: z.array(z.string()).min(1, { message: "Select at least one SDG" }),
  
  description: z.string().min(20, { message: "Please provide a detailed description (at least 20 characters)" }),
  location: z.string().min(3, { message: "Location is required" }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }).optional().or(z.literal("")),
  
  points: z.number().min(1, { message: "Impact points must be at least 1" }),
  impact: z.string().min(10, { message: "Please describe the impact" }),
  requirements: z.string().optional(),
  contactInfo: z.string().email({ message: "Please provide a valid email" }),
  websiteUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  
  commitment: z.string().optional(),
  slots: z.number().min(1).optional(),
  
  goal: z.number().min(1).optional(),
  endDate: z.string().optional(),
});

type OpportunityFormValues = z.infer<typeof opportunitySchema>;

interface CreateOpportunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (opportunity: Partial<Marketplace>) => void;
}

const CreateOpportunityDialog: React.FC<CreateOpportunityDialogProps> = ({ open, onOpenChange, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [opportunityType, setOpportunityType] = useState<"volunteer" | "fundraising" | null>(null);
  const { toast } = useToast();
  
  const form = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: "",
      organization: "",
      description: "",
      location: "",
      imageUrl: "",
      sdgGoals: [],
      points: 10,
      impact: "",
      requirements: "",
      contactInfo: "",
      websiteUrl: "",
      commitment: "",
      slots: 1,
      goal: 1000,
      endDate: "",
    }
  });

  const handleTypeChange = (value: "volunteer" | "fundraising") => {
    setOpportunityType(value);
    form.setValue("type", value);
  };

  const handleNext = async () => {
    let fieldsToValidate: (keyof OpportunityFormValues)[] = [];
    
    if (step === 1) {
      fieldsToValidate = ["title", "organization", "type", "impactCategory", "sdgGoals"];
    } else if (step === 2) {
      fieldsToValidate = ["description", "location"];
    }
    
    const isValid = await form.trigger(fieldsToValidate as any);
    
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (values: OpportunityFormValues) => {
    try {
      const newOpportunity: Partial<Marketplace> = {
        id: Date.now().toString(),
        title: values.title,
        organization: values.organization,
        type: values.type,
        impactCategory: values.impactCategory,
        sdgGoals: values.sdgGoals,
        description: values.description,
        location: values.location,
        image: values.imageUrl || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3",
        points: values.points,
        impact: values.impact,
        requirements: values.requirements ? values.requirements.split('\n') : [],
        contactInfo: values.contactInfo,
        websiteUrl: values.websiteUrl || undefined,
        createdAt: new Date().toISOString(),
      };
      
      if (values.type === "volunteer") {
        newOpportunity.commitment = values.commitment;
        newOpportunity.slots = values.slots;
        newOpportunity.slotsFilled = 0;
      } else if (values.type === "fundraising") {
        newOpportunity.goal = values.goal;
        newOpportunity.raised = 0;
        newOpportunity.endDate = values.endDate;
      }
      
      onSubmit(newOpportunity);
      
      toast({
        title: "Success!",
        description: "Your opportunity has been published to the marketplace."
      });
      
      form.reset();
      setStep(1);
      setOpportunityType(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating opportunity:", error);
      toast({
        title: "Error",
        description: "Failed to create opportunity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const categories = mockImpactCategories;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Create New Opportunity - Basic Information"}
            {step === 2 && "Create New Opportunity - Details"}
            {step === 3 && "Create New Opportunity - Requirements & Goals"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Provide basic information about your impact opportunity."}
            {step === 2 && "Add details about your opportunity to attract participants."}
            {step === 3 && "Set specific requirements and goals for your opportunity."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opportunity Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a descriptive title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of your organization" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opportunity Type</FormLabel>
                      <Select 
                        onValueChange={(value: "volunteer" | "fundraising") => handleTypeChange(value)} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select opportunity type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="volunteer">Volunteer Opportunity</SelectItem>
                          <SelectItem value="fundraising">Fundraising Campaign</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose whether this is a volunteering opportunity or a fundraising campaign.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="impactCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary SDG Goal</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a primary SDG goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem 
                              key={category.id} 
                              value={category.id}
                              style={{
                                color: category.color
                              }}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the primary UN Sustainable Development Goal this opportunity addresses.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sdgGoals"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Additional SDG Goals</FormLabel>
                        <FormDescription>
                          Select all Sustainable Development Goals that your opportunity addresses.
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categories.map((sdg) => (
                          <FormField
                            key={sdg.id}
                            control={form.control}
                            name="sdgGoals"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={sdg.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(sdg.id)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = field.value || [];
                                        return checked
                                          ? field.onChange([...currentValues, sdg.id])
                                          : field.onChange(
                                              currentValues.filter(
                                                (value) => value !== sdg.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal" style={{ color: sdg.color }}>
                                    {sdg.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the opportunity in detail" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>Location</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="City, State or Remote" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex items-center gap-2">
                          <Image className="h-4 w-4" />
                          <span>Cover Image URL</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter an image URL (optional)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a URL to an image that represents this opportunity.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="impact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the impact this opportunity will have" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact Points</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="Points earned for this opportunity" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Points participants will earn for completing this opportunity.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter requirements (one per line)" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        List any requirements or qualifications needed, one per line.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Contact email for this opportunity" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.org (optional)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {opportunityType === "volunteer" && (
                  <>
                    <FormField
                      control={form.control}
                      name="commitment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>Time Commitment</span>
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. 4 hours weekly, One-time, etc." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="slots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>Available Slots</span>
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              placeholder="Number of volunteer slots" 
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                {opportunityType === "fundraising" && (
                  <>
                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              <span>Fundraising Goal</span>
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              placeholder="Target amount to raise"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>End Date</span>
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            )}
            
            <DialogFooter className="flex justify-between mt-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              
              {step < 3 && (
                <Button type="button" onClick={handleNext} className="ml-auto">
                  Next
                </Button>
              )}
              
              {step === 3 && (
                <Button type="submit" className="bg-voli-primary hover:bg-voli-secondary text-black">
                  Publish Opportunity
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOpportunityDialog;
