
import { Marketplace } from '../types/dashboard';

// Sample images for opportunities
const opportunityImages = [
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1796&q=80',
  'https://images.unsplash.com/photo-1559024040-975406394b86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
  'https://images.unsplash.com/photo-1559024020-ef0560863f96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
  'https://images.unsplash.com/photo-1560252829-804f1aedf1be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
  'https://images.unsplash.com/photo-1593113598332-cd59a162449b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
];

// Sample impact categories to assign to scraped opportunities
const impactCategories = ['1', '2', '3', '4', '5'];

// Since we can't perform actual web scraping in the browser due to CORS restrictions,
// we'll simulate it with mock data that resembles real volunteer.com.au listings
export const scrapeVolunteerOpportunities = async (): Promise<Marketplace[]> => {
  // In a real implementation, this would be an API call to a backend that handles the scraping
  console.log('Scraping volunteer opportunities from volunteer.com.au');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock data resembling volunteer.com.au listings
  const scrapedOpportunities: Marketplace[] = [
    {
      id: 'vol-1',
      type: 'volunteer',
      title: 'Mentor - Student2Student Reading Program',
      organization: 'The Smith Family',
      location: 'Brisbane, QLD',
      description: 'The Smith Family's Student2Student program matches students who need to improve their reading with peer buddies who help and encourage them with their reading. Reading sessions take place over the telephone or via a digital platform/app. We are looking for mentors to support students with their reading skills.',
      image: opportunityImages[0],
      impactCategory: impactCategories[1], // Education
      commitment: '2 hours weekly',
      slots: 15,
      slotsFilled: 8,
      impact: 'Help improve literacy rates among disadvantaged students',
      requirements: [
        'Available for 2 hours per week',
        'Passion for education and literacy',
        'Good communication skills',
        'Working with Children Check'
      ],
      contactInfo: 'volunteering@thesmithfamily.com.au',
      websiteUrl: 'https://www.volunteer.com.au/volunteering/opportunity/12345',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      points: 150
    },
    {
      id: 'vol-2',
      type: 'volunteer',
      title: 'Community Garden Volunteer',
      organization: 'Urban Green Spaces',
      location: 'Sydney, NSW',
      description: 'Join our team of dedicated volunteers who maintain community gardens across Sydney. Tasks include planting, weeding, watering, harvesting, and general garden maintenance. No experience necessary - just a willingness to get your hands dirty and help our communities grow!',
      image: opportunityImages[1],
      impactCategory: impactCategories[0], // Environment
      commitment: '3 hours weekly',
      slots: 20,
      slotsFilled: 12,
      impact: 'Create sustainable urban spaces and improve food security',
      requirements: [
        'Physically able to perform garden tasks',
        'Willing to work outdoors in various weather conditions',
        'No prior experience required'
      ],
      contactInfo: 'volunteer@urbangreen.org.au',
      websiteUrl: 'https://www.volunteer.com.au/volunteering/opportunity/23456',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      points: 120
    },
    {
      id: 'vol-3',
      type: 'volunteer',
      title: 'Meals on Wheels Driver',
      organization: 'Care Connect',
      location: 'Melbourne, VIC',
      description: 'We're seeking volunteer drivers to deliver nutritious meals to elderly and disabled members of our community. This essential service helps people maintain their independence and ensures they receive regular social contact.',
      image: opportunityImages[2],
      impactCategory: impactCategories[2], // Health
      commitment: '4 hours weekly',
      slots: 10,
      slotsFilled: 6,
      impact: 'Provide essential nutrition and social connection to isolated community members',
      requirements: [
        'Valid driver's license',
        'Access to own vehicle',
        'Police check',
        'Friendly and reliable'
      ],
      contactInfo: 'volunteers@careconnect.org.au',
      websiteUrl: 'https://www.volunteer.com.au/volunteering/opportunity/34567',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      points: 140
    },
    {
      id: 'vol-4',
      type: 'volunteer',
      title: 'Animal Shelter Assistant',
      organization: 'Happy Paws Rescue',
      location: 'Perth, WA',
      description: 'Help care for rescued dogs and cats waiting for their forever homes. Duties include feeding, cleaning, dog walking, socializing with animals, and assisting with adoption events. Your time and care will help these animals find loving homes.',
      image: opportunityImages[3],
      impactCategory: impactCategories[3], // Community
      commitment: 'Flexible, 3-5 hours weekly',
      slots: 25,
      slotsFilled: 15,
      impact: 'Improve animal welfare and help pets find loving homes',
      requirements: [
        'Animal handling experience preferred but not required',
        'Compassionate attitude toward animals',
        'Ability to follow animal care protocols',
        'Minimum age of 16'
      ],
      contactInfo: 'volunteer@happypaws.org.au',
      websiteUrl: 'https://www.volunteer.com.au/volunteering/opportunity/45678',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      points: 130
    },
    {
      id: 'vol-5',
      type: 'volunteer',
      title: 'Crisis Support Helpline Operator',
      organization: 'Lifeline Australia',
      location: 'Remote/Online',
      description: 'Become a telephone crisis supporter and help people in their time of need. After completing our training program, you'll provide compassionate, non-judgmental support to people experiencing crisis or having thoughts of suicide.',
      image: opportunityImages[4],
      impactCategory: impactCategories[2], // Health
      commitment: '4 hours weekly, minimum 12-month commitment',
      slots: 30,
      slotsFilled: 22,
      impact: 'Provide essential mental health support and potentially save lives',
      requirements: [
        'Completion of Lifeline training (provided)',
        'Strong listening skills',
        'Empathetic and non-judgmental attitude',
        'Emotional resilience',
        'Over 18 years of age'
      ],
      contactInfo: 'volunteer@lifeline.org.au',
      websiteUrl: 'https://www.volunteer.com.au/volunteering/opportunity/56789',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      points: 200
    },
    {
      id: 'vol-6',
      type: 'volunteer',
      title: 'Youth Mentor',
      organization: 'Big Brothers Big Sisters',
      location: 'Adelaide, SA',
      description: 'Make a difference in a young person's life by becoming a mentor. Spend quality time with a young person who needs positive role modeling and friendship. Activities can include sports, games, arts and crafts, or simply talking and listening.',
      image: opportunityImages[5],
      impactCategory: impactCategories[3], // Community
      commitment: '2-4 hours weekly, minimum 12-month commitment',
      slots: 20,
      slotsFilled: 9,
      impact: 'Provide positive role modeling and support for at-risk youth',
      requirements: [
        'At least 18 years old',
        'Working with Children Check',
        'Police clearance',
        'Reliable and consistent',
        'Positive attitude'
      ],
      contactInfo: 'mentoring@bbbs.org.au',
      websiteUrl: 'https://www.volunteer.com.au/volunteering/opportunity/67890',
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
      points: 180
    }
  ];
  
  // Filter to only include opportunities created in the last week
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const recentOpportunities = scrapedOpportunities.filter(
    opportunity => opportunity.createdAt && opportunity.createdAt >= oneWeekAgo
  );
  
  console.log(`Found ${recentOpportunities.length} recent volunteer opportunities`);
  return recentOpportunities;
};
