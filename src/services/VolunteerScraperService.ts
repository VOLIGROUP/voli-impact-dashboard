
import { Marketplace } from "../types/dashboard";

/**
 * Simulates scraping volunteer opportunities from volunteer.com.au
 * In a real implementation, this would use a backend service with proper scraping tools
 */
export const scrapeVolunteerOpportunities = async (): Promise<Marketplace[]> => {
  // Simulate API call with timeout
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock scraped opportunities with the correct type
  return [
    {
      id: 'v1',
      type: 'volunteer' as const,
      title: 'Beach Cleanup Initiative',
      organization: 'Ocean Conservation Alliance',
      location: 'Sydney, NSW',
      description: 'Join our monthly beach cleanup to help remove plastic waste and debris from Sydney beaches, protecting marine life and keeping our shorelines beautiful.',
      image: 'https://images.unsplash.com/photo-1626388885112-4d11e6ac0be7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      impactCategory: '1',
      commitment: '3 hours monthly',
      points: 100,
      slots: 30,
      slotsFilled: 12,
      impact: 'Each cleanup removes approximately 200kg of plastic waste from our oceans.',
      requirements: [
        'Bring gloves if you have them',
        'Wear comfortable clothes and sunscreen',
        'Water bottle recommended'
      ],
      contactInfo: 'cleanup@oceanalliance.org',
      createdAt: new Date().toISOString()
    },
    {
      id: 'v2',
      type: 'volunteer' as const,
      title: 'Senior Companion Program',
      organization: 'Community Care Australia',
      location: 'Brisbane, QLD',
      description: 'Provide companionship and assistance to seniors living alone. Activities include conversation, playing games, reading, and accompanying them on short walks.',
      image: 'https://images.unsplash.com/photo-1516307343024-3289e8f72231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      impactCategory: '4',
      commitment: '2-4 hours weekly',
      points: 150,
      slots: 15,
      slotsFilled: 8,
      impact: 'Reduce isolation and improve mental health outcomes for elderly citizens in our community.',
      requirements: [
        'Background check required',
        'Compassionate and patient demeanor',
        'Reliable transportation'
      ],
      contactInfo: 'volunteers@communitycare.org.au',
      websiteUrl: 'https://www.communitycareaustralia.org',
      createdAt: new Date().toISOString()
    },
    {
      id: 'v3',
      type: 'volunteer' as const,
      title: 'Coding Mentors for Kids',
      organization: 'Future Coders',
      location: 'Melbourne, VIC',
      description: 'Teach basic coding skills to children aged 8-14 in underserved communities. No advanced coding knowledge required - we provide curriculum and training.',
      image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      impactCategory: '2',
      commitment: '2 hours weekly',
      points: 120,
      slots: 20,
      slotsFilled: 14,
      impact: 'Introduce 500+ children to coding fundamentals this year, helping bridge the digital skills gap.',
      requirements: [
        'Basic computer literacy',
        'Enjoy working with children',
        'Commit to at least 10 weekly sessions'
      ],
      contactInfo: 'mentors@futurecoders.org',
      websiteUrl: 'https://www.futurecoders.org',
      createdAt: new Date().toISOString()
    },
    {
      id: 'v4',
      type: 'volunteer' as const,
      title: 'Community Garden Helpers',
      organization: 'Urban Greening Project',
      location: 'Perth, WA',
      description: 'Help maintain community gardens that provide fresh produce to local food banks and teach sustainable gardening practices.',
      image: 'https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      impactCategory: '1',
      commitment: 'Flexible hours',
      points: 80,
      slots: 40,
      slotsFilled: 22,
      impact: 'Grow over 2,000kg of fresh produce annually for those in need while creating green spaces in urban areas.',
      requirements: [
        'No experience necessary',
        'Physical activity involved',
        'Outdoor work in various weather conditions'
      ],
      contactInfo: 'volunteer@urbangreeningproject.com.au',
      createdAt: new Date().toISOString()
    },
    {
      id: 'v5',
      type: 'volunteer' as const,
      title: 'Wildlife Rescue Support',
      organization: 'Australian Wildlife Conservancy',
      location: 'Adelaide, SA',
      description: 'Assist with administrative tasks, phone lines, and simple care duties at our wildlife rescue center. Perfect for animal lovers who want to help behind the scenes.',
      image: 'https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      impactCategory: '1',
      commitment: '4 hours weekly',
      points: 110,
      slots: 12,
      slotsFilled: 9,
      impact: 'Support the rescue and rehabilitation of over 2,000 native animals annually.',
      requirements: [
        'Reliable attendance',
        'Attention to detail',
        'Basic computer skills'
      ],
      contactInfo: 'volunteer@wildlifeconservancy.org.au',
      websiteUrl: 'https://www.wildlifeconservancy.org.au',
      createdAt: new Date().toISOString()
    }
  ].filter(item => {
    // Only include items "posted" within the last week to simulate filtering
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const itemDate = new Date(item.createdAt);
    return itemDate > oneWeekAgo;
  });
};
