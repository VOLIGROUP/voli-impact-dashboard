
import { Marketplace } from "@/types/dashboard";

// This is a mock service for scraping volunteer opportunities from external sources
export class VolunteerScraperService {
  // Simulate scraping by returning mock data
  static async scrapeVolunteerOpportunities(): Promise<Marketplace[]> {
    // In a real implementation, this would make API calls or use web scraping
    const mockScrapedData: Marketplace[] = [
      {
        id: "scraped-1",
        type: "volunteer" as const, // Type assertion to match the union type
        title: "Community Garden Clean-up",
        organization: "Urban Green Spaces",
        location: "Portland, OR",
        description: "Help maintain our community gardens by assisting with weeding, planting, and general clean-up. This is a family-friendly opportunity!",
        image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e",
        impactCategory: "environmental",
        commitment: "One-time, 3 hours",
        points: 100,
        slots: 20,
        slotsFilled: 5,
        impact: "Help maintain 5 acres of urban gardens that produce fresh food for local food banks.",
        requirements: ["No experience necessary", "Bring water and sunscreen", "Garden gloves recommended"],
        contactInfo: "volunteer@urbangreen.org",
      },
      {
        id: "scraped-2",
        type: "fundraising" as const, // Type assertion to match the union type
        title: "Run for Clean Water",
        organization: "Water Access Global",
        location: "Virtual/Any Location",
        description: "Participate in our virtual 5K to raise money for clean water initiatives around the world. Run anywhere, any time during Earth Week!",
        image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c",
        impactCategory: "community",
        goal: 10000,
        raised: 2500,
        endDate: "2023-05-01",
        points: 150,
        impact: "Your participation will help provide clean water access to communities in need across the globe.",
        requirements: ["Registration fee: $25", "Track your run with any fitness app", "Share on social media with #RunForWater"],
        contactInfo: "events@wateraccess.org",
        websiteUrl: "https://runforwater.org",
      }
    ];
    
    // Simulate delay from network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockScrapedData;
  }
}
