
import { Charity, ImpactCategory, Marketplace } from '../types/dashboard';

// Mock Impact Categories (SDGs)
export const mockImpactCategories: ImpactCategory[] = [
  { id: 'sdg1', name: 'No Poverty', color: '#e5243b' },
  { id: 'sdg2', name: 'Zero Hunger', color: '#DDA63A' },
  { id: 'sdg3', name: 'Good Health and Well-being', color: '#4C9F38' },
  { id: 'sdg4', name: 'Quality Education', color: '#C5192D' },
  { id: 'sdg5', name: 'Gender Equality', color: '#FF3A21' },
  { id: 'sdg6', name: 'Clean Water and Sanitation', color: '#26BDE2' },
  { id: 'sdg7', name: 'Affordable and Clean Energy', color: '#FCC30B' },
  { id: 'sdg8', name: 'Decent Work and Economic Growth', color: '#A21942' },
  { id: 'sdg9', name: 'Industry, Innovation and Infrastructure', color: '#FD6925' },
  { id: 'sdg10', name: 'Reduced Inequalities', color: '#DD1367' },
  { id: 'sdg11', name: 'Sustainable Cities and Communities', color: '#FD9D24' },
  { id: 'sdg12', name: 'Responsible Consumption and Production', color: '#BF8B2E' },
  { id: 'sdg13', name: 'Climate Action', color: '#3F7E44' },
  { id: 'sdg14', name: 'Life Below Water', color: '#0A97D9' },
  { id: 'sdg15', name: 'Life on Land', color: '#56C02B' },
  { id: 'sdg16', name: 'Peace, Justice and Strong Institutions', color: '#00689D' },
  { id: 'sdg17', name: 'Partnerships for the Goals', color: '#19486A' },
];

// Mock Charities
export const mockCharities: Charity[] = [
  {
    id: 'charity1',
    name: 'Green Earth Initiative',
    logo: 'https://images.unsplash.com/photo-1569307371366-eb2e4efe5122?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlZW58ZW58MHwyfDB8fHww',
    mission: 'Dedicated to environmental conservation and sustainable practices across urban and rural communities. We focus on creating green spaces and educating communities on sustainable living.',
    website: 'https://example.com/greenearth',
    sdgFocus: ['sdg11', 'sdg13', 'sdg15'],
    contactEmail: 'info@greenearth.org'
  },
  {
    id: 'charity2',
    name: 'Water For All',
    logo: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2F0ZXJ8ZW58MHx8MHx8fDA%3D',
    mission: 'Providing clean water access to communities in developing regions through infrastructure projects, education, and sustainable water management solutions.',
    website: 'https://example.com/waterforall',
    sdgFocus: ['sdg3', 'sdg6'],
    contactEmail: 'contact@waterforall.org'
  },
  {
    id: 'charity3',
    name: 'Readers of Tomorrow',
    logo: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D',
    mission: 'Promoting literacy and education across all age groups through tutoring programs, book donations, and educational resources to underserved communities.',
    website: 'https://example.com/readersoftomorrow',
    sdgFocus: ['sdg4', 'sdg10'],
    contactEmail: 'help@readersoftomorrow.org'
  },
  {
    id: 'charity4',
    name: 'Play It Forward',
    logo: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvcnR8ZW58MHx8MHx8fDA%3D',
    mission: 'Supporting youth development through sports by providing equipment, coaching, and safe play spaces to children in underserved communities.',
    website: 'https://example.com/playitforward',
    sdgFocus: ['sdg3', 'sdg10', 'sdg11'],
    contactEmail: 'info@playitforward.org'
  },
  {
    id: 'charity5',
    name: 'Homes For Everyone',
    logo: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D',
    mission: 'Building affordable housing and providing shelter solutions for families in need, while advocating for housing equality and community development.',
    website: 'https://example.com/homesforeveryone',
    sdgFocus: ['sdg1', 'sdg10', 'sdg11'],
    contactEmail: 'build@homesforeveryone.org'
  },
  {
    id: 'charity6',
    name: 'Future Power Initiative',
    logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXJ8ZW58MHx8MHx8fDA%3D',
    mission: 'Advancing renewable energy adoption through community-based projects, technology research, and education on sustainable energy practices.',
    website: 'https://example.com/futurepower',
    sdgFocus: ['sdg7', 'sdg9', 'sdg13'],
    contactEmail: 'connect@futurepower.org'
  }
];

// Mock Marketplace Items
export const mockMarketplace: Marketplace[] = [
  {
    id: '1',
    type: 'volunteer',
    title: 'Community Garden Project',
    organization: 'Green Earth Initiative',
    location: 'Multiple Locations',
    description: 'Help build and maintain community gardens in urban areas',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    impactCategory: 'sdg15', // Updated to SDG15 (Life on Land)
    sdgGoals: ['sdg2', 'sdg11', 'sdg15'], // Multiple SDGs
    commitment: '4-8 hours monthly',
    points: 120,
    slots: 25,
    slotsFilled: 18,
    impact: 'Create green spaces in urban neighborhoods, growing fresh produce for communities',
    requirements: [
      'No experience required',
      'Must be physically able to garden',
      'Bring your own gardening gloves if possible'
    ]
  },
  {
    id: '2',
    type: 'fundraising',
    title: 'Clean Water Initiative',
    organization: 'Water For All',
    location: 'Global',
    description: 'Fundraising campaign to provide clean water access in developing regions',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80',
    impactCategory: 'sdg6', // Updated to SDG6 (Clean Water and Sanitation)
    sdgGoals: ['sdg3', 'sdg6'], // Multiple SDGs
    goal: 50000,
    raised: 32750,
    endDate: '2023-08-30T23:59:59Z',
    points: 200,
    impact: 'Provide clean water access to 10,000+ people in developing regions',
    requirements: []
  },
  {
    id: '3',
    type: 'volunteer',
    title: 'Literacy Program Tutor',
    organization: 'Readers of Tomorrow',
    location: 'Online',
    description: 'Become a virtual tutor for adult literacy programs',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1622&q=80',
    impactCategory: 'sdg4', // Updated to SDG4 (Quality Education)
    sdgGoals: ['sdg4', 'sdg10'], // Multiple SDGs
    commitment: '2 hours weekly',
    points: 100,
    slots: 50,
    slotsFilled: 37,
    impact: 'Help adults improve their reading and writing skills for better employment opportunities',
    requirements: [
      'Strong reading and writing skills',
      'Patient and supportive attitude',
      'Minimum commitment of 3 months'
    ]
  },
  {
    id: '4',
    type: 'fundraising',
    title: 'Youth Sports Equipment',
    organization: 'Play It Forward',
    location: 'National',
    description: 'Raising funds to provide sports equipment to underserved communities',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1807&q=80',
    impactCategory: 'sdg3', // Updated to SDG3 (Good Health and Well-being)
    sdgGoals: ['sdg3', 'sdg10'], // Multiple SDGs
    goal: 25000,
    raised: 10875,
    endDate: '2023-09-15T23:59:59Z',
    points: 150,
    impact: 'Provide sports equipment to 50+ schools in low-income areas',
    requirements: []
  },
  {
    id: '5',
    type: 'volunteer',
    title: 'Habitat Construction',
    organization: 'Homes For Everyone',
    location: 'Multiple Cities',
    description: 'Help build affordable housing for families in need',
    image: 'https://images.unsplash.com/photo-1523575708161-ad0fc2a9b951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    impactCategory: 'sdg11', // Updated to SDG11 (Sustainable Cities and Communities)
    sdgGoals: ['sdg1', 'sdg11'], // Multiple SDGs
    commitment: 'Full day events',
    points: 200,
    slots: 100,
    slotsFilled: 65,
    impact: 'Build affordable housing for families in need across multiple communities',
    requirements: [
      'No construction experience necessary',
      'Must be 18 years or older',
      'Closed-toe shoes required',
      'Able to lift 25 pounds'
    ]
  },
  {
    id: '6',
    type: 'fundraising',
    title: 'Renewable Energy Projects',
    organization: 'Future Power Initiative',
    location: 'Global',
    description: 'Funding small-scale renewable energy projects in rural communities',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    impactCategory: 'sdg7', // Updated to SDG7 (Affordable and Clean Energy)
    sdgGoals: ['sdg7', 'sdg13'], // Multiple SDGs
    goal: 75000,
    raised: 41200,
    endDate: '2023-10-01T23:59:59Z',
    points: 180,
    impact: 'Fund renewable energy projects that will benefit 20+ rural communities',
    requirements: []
  },
];

export const getImpactCategoryById = (id: string): ImpactCategory | undefined => {
  return mockImpactCategories.find(category => category.id === id);
};

export const getMarketplaceItemById = (id: string): Marketplace | undefined => {
  return mockMarketplace.find(item => item.id === id);
};

export const getCharityById = (id: string): Charity | undefined => {
  return mockCharities.find(charity => charity.id === id);
};

// Get SDG goals data for a marketplace item
export const getSDGsForMarketplaceItem = (id: string): ImpactCategory[] => {
  const item = getMarketplaceItemById(id);
  if (!item || !item.sdgGoals) return [];
  
  return item.sdgGoals
    .map(sdgId => mockImpactCategories.find(sdg => sdg.id === sdgId))
    .filter((sdg): sdg is ImpactCategory => sdg !== undefined);
};
