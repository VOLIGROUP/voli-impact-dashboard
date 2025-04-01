
import { ImpactCategory, Marketplace } from '../types/dashboard';

// Mock Impact Categories
export const mockImpactCategories: ImpactCategory[] = [
  { id: '1', name: 'Environment', color: 'green' },
  { id: '2', name: 'Education', color: 'blue' },
  { id: '3', name: 'Health', color: 'red' },
  { id: '4', name: 'Community', color: 'purple' },
  { id: '5', name: 'Economic', color: 'orange' },
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
    impactCategory: '1',
    commitment: '4-8 hours monthly',
    points: 120,
    slots: 25,
    slotsFilled: 18,
  },
  {
    id: '2',
    type: 'fundraising',
    title: 'Clean Water Initiative',
    organization: 'Water For All',
    location: 'Global',
    description: 'Fundraising campaign to provide clean water access in developing regions',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80',
    impactCategory: '3',
    goal: 50000,
    raised: 32750,
    endDate: '2023-08-30T23:59:59Z',
    points: 200,
  },
  {
    id: '3',
    type: 'volunteer',
    title: 'Literacy Program Tutor',
    organization: 'Readers of Tomorrow',
    location: 'Online',
    description: 'Become a virtual tutor for adult literacy programs',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1622&q=80',
    impactCategory: '2',
    commitment: '2 hours weekly',
    points: 100,
    slots: 50,
    slotsFilled: 37,
  },
  {
    id: '4',
    type: 'fundraising',
    title: 'Youth Sports Equipment',
    organization: 'Play It Forward',
    location: 'National',
    description: 'Raising funds to provide sports equipment to underserved communities',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1807&q=80',
    impactCategory: '4',
    goal: 25000,
    raised: 10875,
    endDate: '2023-09-15T23:59:59Z',
    points: 150,
  },
  {
    id: '5',
    type: 'volunteer',
    title: 'Habitat Construction',
    organization: 'Homes For Everyone',
    location: 'Multiple Cities',
    description: 'Help build affordable housing for families in need',
    image: 'https://images.unsplash.com/photo-1523575708161-ad0fc2a9b951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    impactCategory: '4',
    commitment: 'Full day events',
    points: 200,
    slots: 100,
    slotsFilled: 65,
  },
  {
    id: '6',
    type: 'fundraising',
    title: 'Renewable Energy Projects',
    organization: 'Future Power Initiative',
    location: 'Global',
    description: 'Funding small-scale renewable energy projects in rural communities',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    impactCategory: '5',
    goal: 75000,
    raised: 41200,
    endDate: '2023-10-01T23:59:59Z',
    points: 180,
  },
];

export const getImpactCategoryById = (id: string): ImpactCategory | undefined => {
  return mockImpactCategories.find(category => category.id === id);
};

export const getMarketplaceItemById = (id: string): Marketplace | undefined => {
  return mockMarketplace.find(item => item.id === id);
};
