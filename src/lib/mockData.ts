import { Opportunity, Organization, UserProfile } from './types/database';

export const MOCK_ORGANIZATION: Organization = {
  id: 'org-krow-community',
  owner_id: 'user-organizer-1',
  name: 'Krow Community Action',
  description: 'Empowering local neighborhoods through sustainable environmental and community support initiatives.',
  logo_url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150&auto=format&fit=crop&q=80',
  banner_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&auto=format&fit=crop&q=80',
  location: 'Toronto, Ontario, Canada',
  created_at: new Date().toISOString(),
};

export const MOCK_VOLUNTEER: UserProfile = {
  id: 'vol-user-1',
  email: 'alex.volunteer@krow.org',
  role: 'volunteer',
  name: 'Alex Mercer',
  age: 22,
  country: 'Canada',
  province: 'Ontario',
  city: 'Toronto',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  account_mode: 'myself',
  created_at: new Date().toISOString(),
};

export const MOCK_OPPORTUNITIES: Opportunity[] = [];

