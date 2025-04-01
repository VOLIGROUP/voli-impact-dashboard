
import { Marketplace, ImpactCategory, Charity } from '../types/dashboard';

// Mock Impact Categories (SDGs)
export const mockImpactCategories: ImpactCategory[] = [
  {
    id: 'sdg1',
    name: 'No Poverty',
    description: 'End poverty in all its forms everywhere',
    icon: 'dollar-sign',
    color: '#E5243B'
  },
  {
    id: 'sdg2',
    name: 'Zero Hunger',
    description: 'End hunger, achieve food security and improved nutrition',
    icon: 'utensils',
    color: '#DDA83A'
  },
  {
    id: 'sdg3',
    name: 'Good Health',
    description: 'Ensure healthy lives and promote well-being for all at all ages',
    icon: 'heart',
    color: '#4C9F38'
  },
  {
    id: 'sdg4',
    name: 'Quality Education',
    description: 'Ensure inclusive and equitable quality education',
    icon: 'book',
    color: '#C5192D'
  },
  {
    id: 'sdg5',
    name: 'Gender Equality',
    description: 'Achieve gender equality and empower all women and girls',
    icon: 'user',
    color: '#FF3A21'
  },
  {
    id: 'sdg6',
    name: 'Clean Water',
    description: 'Ensure availability and sustainable management of water and sanitation',
    icon: 'droplet',
    color: '#26BDE2'
  },
  {
    id: 'sdg7',
    name: 'Clean Energy',
    description: 'Ensure access to affordable, reliable, sustainable and modern energy',
    icon: 'zap',
    color: '#FCC30B'
  },
  {
    id: 'sdg8',
    name: 'Decent Work',
    description: 'Promote sustained, inclusive and sustainable economic growth',
    icon: 'briefcase',
    color: '#A21942'
  },
  {
    id: 'sdg9',
    name: 'Industry & Innovation',
    description: 'Build resilient infrastructure and foster innovation',
    icon: 'tool',
    color: '#FD6925'
  },
  {
    id: 'sdg10',
    name: 'Reduced Inequalities',
    description: 'Reduce inequality within and among countries',
    icon: 'users',
    color: '#DD1367'
  }
];

// Mock Charities
export const mockCharities: Charity[] = [
  {
    id: 'charity-1',
    name: 'Global Water Initiative',
    logo: '/placeholder.svg',
    mission: 'Ensuring clean water access to communities around the world by building wells and water purification systems.',
    sdgs: ['sdg6', 'sdg3'],
    website: 'https://example.org/water',
    sdgFocus: ['sdg6', 'sdg3', 'sdg1']
  },
  {
    id: 'charity-2',
    name: 'Feeding Futures',
    logo: '/placeholder.svg',
    mission: 'Working to end hunger through sustainable farming, food distribution, and education about nutrition.',
    sdgs: ['sdg2', 'sdg1', 'sdg4'],
    website: 'https://example.org/feeding',
    sdgFocus: ['sdg2', 'sdg1', 'sdg4']
  },
  {
    id: 'charity-3',
    name: 'EcoAction Alliance',
    logo: '/placeholder.svg',
    mission: 'Protecting natural habitats, reducing pollution, and fighting climate change through direct action and advocacy.',
    sdgs: ['sdg13', 'sdg14', 'sdg15'],
    website: 'https://example.org/eco',
    sdgFocus: ['sdg13', 'sdg14', 'sdg15']
  },
  {
    id: 'charity-4',
    name: 'Education for All',
    logo: '/placeholder.svg',
    mission: 'Building schools, training teachers, and providing educational resources to underserved communities worldwide.',
    sdgs: ['sdg4', 'sdg5', 'sdg10'],
    website: 'https://example.org/education',
    sdgFocus: ['sdg4', 'sdg5', 'sdg10']
  }
];

// Mock Marketplace Items
export const mockMarketplaceItems: Marketplace[] = [
  {
    id: '1',
    title: 'Volunteer at Local Soup Kitchen',
    description: 'Help serve meals to those in need at our local soup kitchen.',
    organization: 'Helping Hands Charity',
    logo: '/placeholder.svg',
    impact: 'Directly impacts food security for vulnerable populations.',
    location: '123 Charity Lane, Anytown',
    category: 'Volunteer',
    date: '2023-08-15T18:00:00Z',
    sdgs: ['SDG 2: Zero Hunger'],
    images: ['/placeholder.svg', '/placeholder.svg'],
    requiredSkills: ['Teamwork', 'Communication'],
    commitmentHours: 4,
    contactEmail: 'volunteer@helpinghands.org',
    website: 'https://helpinghands.org',
    isRemote: false,
    isRecurring: true,
    isPaid: false,
    status: 'open',
    coordinates: [-122.4194, 37.7749],
    type: 'volunteer',
    image: '/placeholder.svg',
    impactCategory: 'Food Security',
    sdgGoals: ['SDG 2: Zero Hunger'],
    points: 50,
    commitment: 'Weekly',
    slots: 10,
    slotsFilled: 3,
  },
  {
    id: '2',
    title: 'Fundraise for Clean Water Project',
    description: 'Raise funds to support our clean water project in Africa.',
    organization: 'Global Water Initiative',
    logo: '/placeholder.svg',
    impact: 'Provides clean water access to communities in need.',
    location: 'Online',
    category: 'Fundraising',
    date: '2023-09-01T00:00:00Z',
    sdgs: ['SDG 6: Clean Water and Sanitation'],
    images: ['/placeholder.svg'],
    requiredSkills: ['Fundraising', 'Marketing'],
    contactEmail: 'donate@globalwater.org',
    website: 'https://globalwater.org',
    isRemote: true,
    isRecurring: false,
    isPaid: false,
    status: 'active',
    type: 'fundraising',
    image: '/placeholder.svg',
    impactCategory: 'Clean Water',
    sdgGoals: ['SDG 6: Clean Water and Sanitation'],
    points: 75,
    goal: 10000,
    raised: 2500,
    endDate: '2023-12-31T00:00:00Z',
  },
  {
    id: '3',
    title: 'Environmental Cleanup',
    description: 'Join us for a day of cleaning up local parks and rivers.',
    organization: 'EcoAction',
    logo: '/placeholder.svg',
    impact: 'Improves local ecosystems and reduces pollution.',
    location: 'Various locations in Anytown',
    category: 'Volunteer',
    date: '2023-08-26T09:00:00Z',
    sdgs: ['SDG 15: Life on Land'],
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    requiredSkills: ['Teamwork', 'Physical Stamina'],
    commitmentHours: 6,
    contactEmail: 'info@ecoaction.org',
    website: 'https://ecoaction.org',
    isRemote: false,
    isRecurring: false,
    isPaid: false,
    status: 'open',
    coordinates: [-122.4194, 37.7749],
    type: 'volunteer',
    image: '/placeholder.svg',
    impactCategory: 'Environment',
    sdgGoals: ['SDG 15: Life on Land'],
    points: 60,
    commitment: 'One-time',
    slots: 20,
    slotsFilled: 15,
  },
  {
    id: '4',
    title: 'Education Program for Underprivileged Children',
    description: 'Provide educational support and mentorship to children in need.',
    organization: 'Brighter Futures Foundation',
    logo: '/placeholder.svg',
    impact: 'Enhances educational opportunities for underprivileged children.',
    location: 'Community Center, Anytown',
    category: 'Volunteer',
    date: '2023-09-10T14:00:00Z',
    sdgs: ['SDG 4: Quality Education'],
    images: ['/placeholder.svg'],
    requiredSkills: ['Tutoring', 'Mentoring'],
    commitmentHours: 2,
    contactEmail: 'education@brighterfutures.org',
    website: 'https://brighterfutures.org',
    isRemote: false,
    isRecurring: true,
    isPaid: false,
    status: 'open',
    type: 'volunteer',
    image: '/placeholder.svg',
    impactCategory: 'Education',
    sdgGoals: ['SDG 4: Quality Education'],
    points: 55,
    commitment: 'Weekly',
    slots: 12,
    slotsFilled: 8,
  },
  {
    id: '5',
    title: 'Medical Supplies Donation Drive',
    description: 'Collect and donate essential medical supplies to local clinics.',
    organization: 'HealthFirst Initiative',
    logo: '/placeholder.svg',
    impact: 'Supports healthcare access for underserved communities.',
    location: 'Various drop-off locations in Anytown',
    category: 'Fundraising',
    date: '2023-08-20T00:00:00Z',
    sdgs: ['SDG 3: Good Health and Well-being'],
    images: ['/placeholder.svg', '/placeholder.svg'],
    requiredSkills: ['Organization', 'Communication'],
    contactEmail: 'donate@healthfirst.org',
    website: 'https://healthfirst.org',
    isRemote: false,
    isRecurring: false,
    isPaid: false,
    status: 'active',
    type: 'fundraising',
    image: '/placeholder.svg',
    impactCategory: 'Healthcare',
    sdgGoals: ['SDG 3: Good Health and Well-being'],
    points: 70,
    goal: 5000,
    raised: 3000,
    endDate: '2023-11-30T00:00:00Z',
  },
];

// Export these functions to fix import errors
export const getMarketplaceItemById = (id: string) => {
  return mockMarketplaceItems.find(item => item.id === id);
};

export const getImpactCategoryById = (id: string) => {
  return mockImpactCategories.find(category => category.id === id);
};

export const getSDGsForMarketplaceItem = (itemId: string) => {
  const item = getMarketplaceItemById(itemId);
  if (!item || !item.sdgGoals) return [];
  
  return item.sdgGoals.map(sdgId => {
    const category = mockImpactCategories.find(c => c.id === sdgId);
    return category || { id: sdgId, name: "Unknown SDG", color: "#999999", description: "", icon: "" };
  });
};

export const mockMarketplace = mockMarketplaceItems;
