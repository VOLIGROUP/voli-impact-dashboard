
import { ImpactCategory, Charity, Marketplace } from '../types/dashboard';

// Mock Impact Categories
export const mockImpactCategories: ImpactCategory[] = [
  { id: '1', name: 'Education', description: 'Supporting educational initiatives', icon: 'book', color: 'blue-500' },
  { id: '2', name: 'Environment', description: 'Protecting our planet', icon: 'leaf', color: 'green-500' },
  { id: '3', name: 'Animal Welfare', description: 'Caring for animals in need', icon: 'paw', color: 'amber-500' },
  { id: '4', name: 'Homelessness', description: 'Supporting the homeless', icon: 'home', color: 'red-500' },
  { id: '5', name: 'Food Security', description: 'Fighting hunger', icon: 'utensils', color: 'orange-500' },
  { id: '6', name: 'Healthcare Access', description: 'Improving healthcare access', icon: 'heart-pulse', color: 'pink-500' },
  { id: '7', name: 'Disaster Recovery', description: 'Helping after natural disasters', icon: 'cloud-rain', color: 'indigo-500' },
  { id: '8', name: 'Child Development', description: 'Supporting children and youth', icon: 'baby', color: 'purple-500' },
  { id: '9', name: 'Senior Care Support', description: 'Caring for elderly individuals', icon: 'walking-stick', color: 'sky-500' },
  { id: '10', name: 'Disability Access', description: 'Improving accessibility', icon: 'accessibility', color: 'slate-500' },
  { id: '11', name: 'Community Building', description: 'Building stronger communities', icon: 'users', color: 'violet-500' },
  { id: '12', name: 'Mental Health Access', description: 'Improving mental health resources', icon: 'brain', color: 'teal-500' },
  { id: '13', name: 'Literacy', description: 'Promoting literacy for all', icon: 'book-open', color: 'lime-500' },
  { id: '14', name: 'Arts & Culture', description: 'Supporting arts and culture', icon: 'palette', color: 'fuchsia-500' },
  { id: '15', name: 'Clean Water', description: 'Ensuring clean water access', icon: 'droplet', color: 'cyan-500' },
  { id: '16', name: 'Transportation Access', description: 'Improving transportation access', icon: 'car', color: 'emerald-500' },
  { id: '17', name: 'Women Empowerment', description: 'Supporting women\'s initiatives', icon: 'heart', color: 'rose-500' },
];

// Mock Charities
export const mockCharities: Charity[] = [
  {
    id: '1',
    name: 'Global Education Initiative',
    logo: 'https://i.pravatar.cc/150?img=1',
    mission: 'Providing educational opportunities to underserved communities worldwide.',
    website: 'https://example.org/education',
    sdgFocus: ['Quality Education', 'No Poverty', 'Reduced Inequalities'],
    contactEmail: 'contact@education.org',
    sdgs: ['Quality Education', 'No Poverty', 'Reduced Inequalities'],
  },
  {
    id: '2',
    name: 'Oceanic Conservation Fund',
    logo: 'https://i.pravatar.cc/150?img=2',
    mission: 'Dedicated to protecting marine ecosystems and promoting sustainable practices.',
    website: 'https://example.org/ocean',
    sdgFocus: ['Life Below Water', 'Climate Action', 'Responsible Consumption'],
    contactEmail: 'contact@oceanfund.org',
    sdgs: ['Life Below Water', 'Climate Action', 'Responsible Consumption'],
  },
  {
    id: '3',
    name: 'Tech For Good Foundation',
    logo: 'https://i.pravatar.cc/150?img=3',
    mission: 'Using technology to solve pressing social problems worldwide.',
    website: 'https://example.org/techforgood',
    sdgFocus: ['Industry Innovation', 'Quality Education', 'Partnerships'],
    contactEmail: 'info@techgood.org',
    sdgs: ['Industry Innovation', 'Quality Education', 'Partnerships'],
  },
  {
    id: '4',
    name: 'Community Health Alliance',
    logo: 'https://i.pravatar.cc/150?img=4',
    mission: 'Improving healthcare access in underserved communities.',
    website: 'https://example.org/health',
    sdgFocus: ['Good Health', 'Reduced Inequalities', 'Sustainable Cities'],
    contactEmail: 'contact@healthalliance.org',
    sdgs: ['Good Health', 'Reduced Inequalities', 'Sustainable Cities'],
  },
  {
    id: '5',
    name: 'Tree Planting Network',
    logo: 'https://i.pravatar.cc/150?img=5',
    mission: 'Restoring forests and fighting climate change through community initiatives.',
    website: 'https://example.org/trees',
    sdgFocus: ['Climate Action', 'Life on Land', 'Partnerships'],
    contactEmail: 'plant@treenetwork.org',
    sdgs: ['Climate Action', 'Life on Land', 'Partnerships'],
  },
  {
    id: '6',
    name: 'Meals For All',
    logo: 'https://i.pravatar.cc/150?img=6',
    mission: 'Working to end hunger through food rescue and community kitchens.',
    website: 'https://example.org/meals',
    sdgFocus: ['Zero Hunger', 'Good Health', 'Responsible Consumption'],
    contactEmail: 'info@mealsforall.org',
    sdgs: ['Zero Hunger', 'Good Health', 'Responsible Consumption'],
  },
];

// Mock Marketplace Opportunities
export const mockOpportunities: Marketplace[] = [
  {
    id: '1',
    type: 'volunteer',
    title: 'Beach Cleanup Volunteers Needed',
    organization: 'Oceanic Conservation Fund',
    location: 'San Diego, CA',
    description: 'Join our monthly beach cleanup initiative to help keep our coastal areas clean and protect marine life.',
    logo: 'https://i.pravatar.cc/150?img=2',
    image: '/placeholder.svg',
    category: 'Environment',
    date: '2023-07-15',
    impactCategory: '2',
    sdgGoals: ['Life Below Water', 'Climate Action'],
    commitment: '3 hours',
    points: 120,
    slots: 25,
    slotsFilled: 18,
    impact: 'Each volunteer will help remove approximately 15 pounds of trash from our beaches.',
    requirements: ['Gloves', 'Sunscreen', 'Water bottle'],
    sdgs: ['Life Below Water', 'Climate Action'],
  },
  {
    id: '2',
    type: 'fundraising',
    title: 'Support Clean Water Projects',
    organization: 'Global Water Foundation',
    location: 'Online',
    description: 'Help us raise funds to install clean water systems in communities facing water scarcity and contamination.',
    logo: 'https://i.pravatar.cc/150?img=3',
    image: '/placeholder.svg',
    category: 'Health',
    date: '2023-07-10',
    impactCategory: '15',
    sdgGoals: ['Clean Water and Sanitation', 'Good Health'],
    goal: 5000,
    raised: 2345,
    endDate: '2023-08-10',
    points: 150,
    impact: 'Every $100 raised provides clean water access for one person for a lifetime.',
    requirements: [],
    sdgs: ['Clean Water and Sanitation', 'Good Health'],
  },
  {
    id: '3',
    type: 'volunteer',
    title: 'Mentor Youth in Technology',
    organization: 'Tech For Good Foundation',
    location: 'Boston, MA',
    description: 'Share your tech skills with underserved youth to help bridge the digital divide and inspire future technologists.',
    logo: 'https://i.pravatar.cc/150?img=4',
    image: '/placeholder.svg',
    category: 'Education',
    date: '2023-07-20',
    impactCategory: '1',
    sdgGoals: ['Quality Education', 'Reduced Inequalities'],
    commitment: '2 hours/week for 8 weeks',
    points: 200,
    slots: 15,
    slotsFilled: 7,
    impact: 'Your mentorship can help a young person develop critical tech skills for future success.',
    requirements: ['Basic coding knowledge', 'Patient teaching style', 'Laptop'],
    sdgs: ['Quality Education', 'Reduced Inequalities'],
  },
  {
    id: '4',
    type: 'fundraising',
    title: 'School Supplies for Children',
    organization: 'Global Education Initiative',
    location: 'Online',
    description: 'Help us provide essential school supplies to children in low-income communities to support their education.',
    logo: 'https://i.pravatar.cc/150?img=5',
    image: '/placeholder.svg',
    category: 'Education',
    date: '2023-07-25',
    impactCategory: '1',
    sdgGoals: ['Quality Education', 'No Poverty'],
    goal: 3000,
    raised: 950,
    endDate: '2023-08-25',
    points: 100,
    impact: 'Every $25 provides a complete set of school supplies for one child.',
    requirements: [],
    sdgs: ['Quality Education', 'No Poverty'],
  },
  {
    id: '5',
    type: 'volunteer',
    title: 'Community Garden Maintenance',
    organization: 'Urban Greening Project',
    location: 'Chicago, IL',
    description: 'Help maintain community gardens that provide fresh produce to food-insecure neighborhoods.',
    logo: 'https://i.pravatar.cc/150?img=6',
    image: '/placeholder.svg',
    category: 'Environment',
    date: '2023-08-05',
    impactCategory: '5',
    sdgGoals: ['Zero Hunger', 'Sustainable Cities'],
    commitment: '4 hours',
    points: 130,
    slots: 20,
    slotsFilled: 5,
    impact: 'Your work will help produce approximately 500 pounds of fresh produce for the local community each season.',
    requirements: ['Gardening gloves', 'Water bottle', 'Sun protection'],
    sdgs: ['Zero Hunger', 'Sustainable Cities'],
  },
  {
    id: '6',
    type: 'fundraising',
    title: 'Emergency Medical Supplies',
    organization: 'Community Health Alliance',
    location: 'Online',
    description: 'Support our efforts to provide emergency medical supplies to underserved clinics in rural areas.',
    logo: 'https://i.pravatar.cc/150?img=7',
    image: '/placeholder.svg',
    category: 'Health',
    date: '2023-08-10',
    impactCategory: '4',
    sdgGoals: ['Good Health', 'Reduced Inequalities'],
    goal: 10000,
    raised: 3750,
    endDate: '2023-09-10',
    points: 180,
    impact: 'Your contribution helps provide critical medical supplies to clinics serving thousands of patients annually.',
    requirements: [],
    sdgs: ['Good Health', 'Reduced Inequalities'],
  },
];

// Utility functions
export const getOpportunityById = (id: string): Marketplace | undefined => {
  return mockOpportunities.find(opp => opp.id === id);
};

export const getCharityById = (id: string): Charity | undefined => {
  return mockCharities.find(charity => charity.id === id);
};

export const getImpactCategoryById = (id: string): ImpactCategory | undefined => {
  return mockImpactCategories.find(category => category.id === id);
};

export const getOpportunitiesBySDG = (sdgName: string): Marketplace[] => {
  return mockOpportunities.filter(opp => opp.sdgGoals?.includes(sdgName));
};

export const getOpportunitiesByCategory = (categoryId: string): Marketplace[] => {
  return mockOpportunities.filter(opp => opp.impactCategory === categoryId);
};
