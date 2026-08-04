export type UserRole = 'volunteer' | 'organizer';
export type AccountMode = 'myself' | 'parent';
export type RegistrationStatus = 'pending' | 'accepted' | 'declined';

export interface UserProfile {
  id: string;
  email: string | null;
  role: UserRole | null;
  name: string | null;
  age: number | null;
  country: string | null;
  province: string | null;
  city: string | null;
  avatar_url: string | null;
  account_mode: AccountMode;
  created_at: string;
}

export interface Organization {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  location: string | null;
  created_at: string;
}

export interface Organizer {
  id: string;
  organization_id: string;
  name: string;
  created_at?: string;
}

export interface Opportunity {
  id: string;
  organization_id: string;
  title: string;
  description: string;
  banner_url: string | null;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  location: string;
  minimum_age: number;
  max_volunteers: number;
  requirements: string | null;
  parking_info: string | null;
  accessibility_notes: string | null;
  contact_email: string;
  contact_phone: string | null;
  created_at: string;
  // Joined table data
  organization?: Organization;
  registrations_count?: number;
  is_registered?: boolean;
}

export interface Registration {
  id: string;
  opportunity_id: string;
  volunteer_id: string;
  status: RegistrationStatus;
  created_at: string;
  // Joined table data
  opportunity?: Opportunity;
  volunteer?: UserProfile;
}
