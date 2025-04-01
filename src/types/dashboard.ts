
export interface Activity {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  type: 'volunteer' | 'donation' | 'event' | 'other';
  points: number;
  impact: string;
  hours?: number;
  amountRaised?: number;
}

export interface Kudos {
  id: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  date: string;
  seen: boolean;
}

export interface Interest {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface UserRanking {
  rank: number;
  title: string;
  description: string;
}

export interface Charity {
  id: string;
  name: string;
  logo: string;
  mission: string;
  sdgs: string[];
  website?: string;
  location?: string;
  contactEmail?: string;
  phoneNumber?: string;
  founder?: string;
  foundedYear?: number;
  employees?: number;
  description?: string;
  causes?: string[];
  opportunities?: string[];
  totalRaised?: number;
  volunteerCount?: number;
  upcomingEvents?: Event[];
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}
