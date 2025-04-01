
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface ImpactDataFormProps {
  onComplete: () => void;
}

// Interface for charity data from API
interface CharityData {
  id: string;
  name: string;
}

// SDGs options
const sdgOptions = [
  { id: "1", label: "No Poverty" },
  { id: "2", label: "Zero Hunger" },
  { id: "3", label: "Good Health and Well-being" },
  { id: "4", label: "Quality Education" },
  { id: "5", label: "Gender Equality" },
  { id: "6", label: "Clean Water and Sanitation" },
  { id: "7", label: "Affordable and Clean Energy" },
  { id: "8", label: "Decent Work and Economic Growth" },
  { id: "9", label: "Industry, Innovation and Infrastructure" },
  { id: "10", label: "Reduced Inequalities" },
  { id: "11", label: "Sustainable Cities and Communities" },
  { id: "12", label: "Responsible Consumption and Production" },
  { id: "13", label: "Climate Action" },
  { id: "14", label: "Life Below Water" },
  { id: "15", label: "Life on Land" },
  { id: "16", label: "Peace, Justice and Strong Institutions" },
  { id: "17", label: "Partnerships for the Goals" },
];

// Mock missions database
const missionsDatabase = [
  { id: "m1", label: "Climate Action" },
  { id: "m2", label: "Education for All" },
  { id: "m3", label: "Health Access" },
  { id: "m4", label: "Poverty Alleviation" },
  { id: "m5", label: "Gender Equality" },
  { id: "m6", label: "Clean Water" },
];

// Mock skills list
const skillsDatabase = [
  { id: "s1", label: "Marketing" },
  { id: "s2", label: "Legal Services" },
  { id: "s3", label: "IT Support" },
  { id: "s4", label: "Project Management" },
  { id: "s5", label: "Graphic Design" },
  { id: "s6", label: "Financial Advisory" },
];

// Mock Lifeblood locations
const lifebloodLocations = [
  { id: "l1", name: "Sydney CBD Donor Centre" },
  { id: "l2", name: "Melbourne CBD Donor Centre" },
  { id: "l3", name: "Brisbane CBD Donor Centre" },
  { id: "l4", name: "Perth CBD Donor Centre" },
  { id: "l5", name: "Adelaide CBD Donor Centre" },
];

const ImpactDataForm = ({ onComplete }: ImpactDataFormProps) => {
  // Form type state to handle the conditional logic
  const [voliType, setVoliType] = useState<string>("");
  const [fundType, setFundType] = useState<string>("");
  const [timeType, setTimeType] = useState<string>("");
  const [itemType, setItemType] = useState<string>("");
  const [bloodType, setBloodType] = useState<string>("");
  const [bloodDonations, setBloodDonations] = useState<number>(0);
  const [livesSaved, setLivesSaved] = useState<number>(0);
  const [units, setUnits] = useState<number>(0);
  const [valuePerUnit, setValuePerUnit] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [charities, setCharities] = useState<CharityData[]>([]);
  const [isLoadingCharities, setIsLoadingCharities] = useState(false);
  const [charityError, setCharityError] = useState<string | null>(null);

  // Create form with zod validation
  // Updated form schema to include all possible field names
  const formSchema = z.object({
    voliType: z.string({ required_error: "VOLI type is required" }),
    // Fund fields
    fundType: z.string().optional(),
    donationTitle: z.string().optional(),
    causeSupported: z.string().optional(),
    missionContributes: z.array(z.string()).optional(),
    sdgsSupporting: z.union([z.string(), z.array(z.string())]).optional(),
    donationValue: z.any().optional(),
    donationDate: z.date().optional(),
    impactOutcome: z.string().optional(),
    proofOfCompletion: z.any().optional(),
    projectTitle: z.string().optional(),
    missionOfCause: z.string().optional(),
    discountValue: z.any().optional(),
    totalProjectValue: z.any().optional(),
    projectStartDate: z.date().optional(),
    projectEndDate: z.date().optional(),
    // Time fields
    timeType: z.string().optional(),
    timeTitle: z.string().optional(),
    skillsProvided: z.string().optional(),
    hoursProvided: z.any().optional(),
    projectValue: z.any().optional(),
    employeeTimeValue: z.any().optional(),
    // Blood fields
    bloodType: z.string().optional(),
    numberOfDonations: z.any().optional(),
    donorLocation: z.string().optional(),
    // Item fields
    itemType: z.string().optional(),
    itemName: z.string().optional(),
    itemUnits: z.any().optional(),
    valuePerUnit: z.any().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voliType: "",
    },
  });

  // Fetch charities data from API
  useEffect(() => {
    const fetchCharities = async () => {
      setIsLoadingCharities(true);
      setCharityError(null);
      try {
        const response = await fetch(
          "https://data.gov.au/data/api/3/action/datastore_search?resource_id=eb1e6be4-5b13-4feb-b28e-388bf7c26f93&limit=50"
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch charities: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.result && data.result.records) {
          // Transform the API data to our expected format
          const charityData: CharityData[] = data.result.records.map((record: any) => ({
            id: record._id || record.ABN || String(record.id),
            name: record.CharityName || record.LegalName || record.name
          }));
          
          setCharities(charityData);
        } else {
          throw new Error("Failed to parse charity data");
        }
      } catch (error) {
        console.error("Error fetching charities:", error);
        setCharityError("Failed to load charities. Using fallback data.");
        // Fallback to mock data if API fails
        setCharities([
          { id: "c1", name: "Red Cross" },
          { id: "c2", name: "World Wildlife Fund" },
          { id: "c3", name: "Doctors Without Borders" },
          { id: "c4", name: "Save the Children" },
          { id: "c5", name: "UNICEF" },
          { id: "c6", name: "Habitat for Humanity" },
        ]);
      } finally {
        setIsLoadingCharities(false);
      }
    };

    fetchCharities();
  }, []);

  // Watch for form value changes to update state
  const watchVoliType = form.watch("voliType");
  
  useEffect(() => {
    if (watchVoliType !== voliType) {
      setVoliType(watchVoliType);
      
      // Reset sub-type states when VOLI type changes
      setFundType("");
      setTimeType("");
      setItemType("");
      setBloodType("");
      
      // Reset form values that depend on VOLI type
      form.reset({ voliType: watchVoliType });
    }
  }, [watchVoliType, voliType, form]);

  // Blood donation calculation
  useEffect(() => {
    if (bloodDonations > 0) {
      // 1 donation = 3 lives saved
      setLivesSaved(bloodDonations * 3);
    } else {
      setLivesSaved(0);
    }
  }, [bloodDonations]);

  // Item value calculation
  useEffect(() => {
    if (units > 0 && valuePerUnit > 0) {
      setTotalValue(units * valuePerUnit);
    } else {
      setTotalValue(0);
    }
  }, [units, valuePerUnit]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    onComplete();
  };

  // Helper component for rendering charity select
  const CharitySelect = ({ field }: { field: any }) => (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={isLoadingCharities ? "Loading charities..." : "Select a cause"} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {charityError && <p className="text-xs text-red-500 px-2 py-1">{charityError}</p>}
        {charities.map((charity) => (
          <SelectItem key={charity.id} value={charity.id}>
            {charity.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: VOLI Type - Always visible */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Section 1: VOLI Type</h2>
          <FormField
            control={form.control}
            name="voliType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VOLI Type</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setVoliType(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select VOLI type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="funds">Funds (Donations)</SelectItem>
                    <SelectItem value="time">Time (Volunteering)</SelectItem>
                    <SelectItem value="blood">Blood</SelectItem>
                    <SelectItem value="items">Items (Give Aways)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Conditional fields based on VOLI Type */}
        {voliType === "funds" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Funds (Donations)</h2>
            <FormField
              control={form.control}
              name="fundType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fund Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setFundType(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fund type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="matching">Matching Employee Donation</SelectItem>
                      <SelectItem value="corporate">Corporate Donation</SelectItem>
                      <SelectItem value="discount">Discount of Services</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(fundType === "matching" || fundType === "corporate") && (
              <>
                <FormField
                  control={form.control}
                  name="donationTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title of the Donation</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter donation title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="causeSupported"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cause Supported</FormLabel>
                      <CharitySelect field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="missionContributes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mission Donation Contributes To</FormLabel>
                      <FormDescription>Select all that apply</FormDescription>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {missionsDatabase.map((mission) => (
                          <div key={mission.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mission-${mission.id}`}
                              value={mission.id}
                              onCheckedChange={(checked) => {
                                const currentValues = Array.isArray(field.value) ? field.value : [];
                                if (checked) {
                                  field.onChange([...currentValues, mission.id]);
                                } else {
                                  field.onChange(currentValues.filter((value) => value !== mission.id));
                                }
                              }}
                            />
                            <label
                              htmlFor={`mission-${mission.id}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {mission.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sdgsSupporting"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SDG's Supporting</FormLabel>
                      <FormDescription>Select all that apply</FormDescription>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {sdgOptions.map((sdg) => (
                          <div key={sdg.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`sdg-${sdg.id}`}
                              value={sdg.id}
                              onCheckedChange={(checked) => {
                                const currentValues = Array.isArray(field.value) ? field.value : [];
                                if (checked) {
                                  field.onChange([...currentValues, sdg.id]);
                                } else {
                                  field.onChange(currentValues.filter((value) => value !== sdg.id));
                                }
                              }}
                            />
                            <label
                              htmlFor={`sdg-${sdg.id}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {sdg.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="donationValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value of the Donation</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="donationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of VOLI</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="impactOutcome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact Outcome or Testimony</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the impact of this donation"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="proofOfCompletion"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Proof of Completion</FormLabel>
                      <FormDescription>
                        Attach for verification status (unverified status assigned until approved in backend by VOLI team)
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file);
                          }}
                          {...fieldProps}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {fundType === "discount" && (
              <>
                <FormField
                  control={form.control}
                  name="projectTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="causeSupported"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cause Supported</FormLabel>
                      <CharitySelect field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="missionOfCause"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mission of the Cause</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a mission" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {missionsDatabase.map((mission) => (
                            <SelectItem key={mission.id} value={mission.id}>
                              {mission.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sdgsSupporting"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SDG's Supporting</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(value)} 
                        defaultValue={typeof field.value === 'string' ? field.value : ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an SDG" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sdgOptions.map((sdg) => (
                            <SelectItem key={sdg.id} value={sdg.id}>
                              {sdg.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value of the Discount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalProjectValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Value of the Project (if discount was not offered)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectStartDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date Project Commenced</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectEndDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date Project Concluded</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="impactOutcome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact Outcome or Testimony</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the impact of this project"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="proofOfCompletion"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Proof of Completion</FormLabel>
                      <FormDescription>
                        Attach email/discount agreement for verification status
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file);
                          }}
                          {...fieldProps}
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

        {voliType === "time" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Time (Volunteering)</h2>
            <FormField
              control={form.control}
              name="timeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setTimeType(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="probono">Probono Work/Services</SelectItem>
                      <SelectItem value="corporate">Corporate Volunteering</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {timeType && (
              <>
                <FormField
                  control={form.control}
                  name="timeTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {timeType === "probono" ? "Title" : "VOLI Title"}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="causeSupported"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cause Supported</FormLabel>
                      <CharitySelect field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="missionOfCause"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mission of the Cause</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a mission" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {missionsDatabase.map((mission) => (
                            <SelectItem key={mission.id} value={mission.id}>
                              {mission.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sdgsSupporting"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SDG's Supporting</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(value)} 
                        defaultValue={typeof field.value === 'string' ? field.value : ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an SDG" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sdgOptions.map((sdg) => (
                            <SelectItem key={sdg.id} value={sdg.id}>
                              {sdg.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skillsProvided"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills Provided</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select skills provided" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skillsDatabase.map((skill) => (
                            <SelectItem key={skill.id} value={skill.id}>
                              {skill.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hoursProvided"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hours Provided</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {timeType === "probono" && (
                  <FormField
                    control={form.control}
                    name="projectValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value of Project</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {timeType === "corporate" && (
                  <FormField
                    control={form.control}
                    name="employeeTimeValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value of Employee Time Taken</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="projectStartDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date Project Commenced</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectEndDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date Project Concluded</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="impactOutcome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact Outcome or Testimony</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the impact of this volunteer work"
                          className="resize-none"
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

        {/* Add Blood Donation section */}
        {voliType === "blood" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Blood Donation</h2>
            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Donation Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setBloodType(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select donation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="whole">Whole Blood</SelectItem>
                      <SelectItem value="plasma">Plasma</SelectItem>
                      <SelectItem value="platelets">Platelets</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {bloodType && (
              <>
                <FormField
                  control={form.control}
                  name="numberOfDonations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Donations</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(e);
                            setBloodDonations(Number(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        {livesSaved > 0 && `Your donation(s) potentially saved ${livesSaved} lives!`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="donorLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donor Location</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select donation location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {lifebloodLocations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="donationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Donation</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="proofOfCompletion"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Proof of Donation</FormLabel>
                      <FormDescription>
                        Upload your donation certificate or receipt
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file);
                          }}
                          {...fieldProps}
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

        {/* Add Item Donation section */}
        {voliType === "items" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Items (Give Aways)</h2>
            <FormField
              control={form.control}
              name="itemType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setItemType(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select item type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {itemType && (
              <>
                <FormField
                  control={form.control}
                  name="itemName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name/Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter item description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="causeSupported"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cause Supported</FormLabel>
                      <CharitySelect field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="itemUnits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Units</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(e);
                            setUnits(Number(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valuePerUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value Per Unit</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setValuePerUnit(Number(e.target.value));
                          }}
                        />
                      </FormControl>
                      {totalValue > 0 && (
                        <FormDescription>
                          Total Value: ${totalValue.toFixed(2)}
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="donationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Donation</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="impactOutcome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact Outcome or Testimony</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the impact of this donation"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="proofOfCompletion"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Proof of Donation</FormLabel>
                      <FormDescription>
                        Upload a receipt or acknowledgment from the receiving organization
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file);
                          }}
                          {...fieldProps}
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

        {/* Submit button - Always visible */}
        <Button 
          type="submit" 
          className="w-full bg-voli-primary hover:bg-voli-secondary text-black"
        >
          Submit VOLI Data
        </Button>
      </form>
    </Form>
  );
};

export default ImpactDataForm;
