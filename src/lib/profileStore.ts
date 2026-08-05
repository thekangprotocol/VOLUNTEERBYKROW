import { UserProfile } from './types/database';
import { createClient } from './supabase/client';

const PROFILE_KEY = 'krow_user_profile';

export const DEFAULT_PROFILE: UserProfile = {
  id: '',
  email: '',
  role: 'volunteer',
  name: '',
  age: null,
  country: 'Canada',
  province: 'Ontario',
  city: 'Toronto',
  avatar_url: null,
  account_mode: 'myself',
  created_at: new Date().toISOString(),
};

export function getSavedProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading profile from localStorage:', err);
  }
  return DEFAULT_PROFILE;
}

export function saveProfile(profile: Partial<UserProfile>): UserProfile {
  const current = getSavedProfile();
  const updated: UserProfile = {
    ...current,
    ...profile,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving profile to localStorage:', err);
    }
  }

  // Attempt async sync to Supabase if authenticated
  try {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email || updated.email,
            name: updated.name,
            role: updated.role,
            age: updated.age,
            country: updated.country,
            province: updated.province,
            city: updated.city,
            avatar_url: updated.avatar_url,
            account_mode: updated.account_mode,
          })
          .then(({ error }) => {
            if (error) console.log('Supabase profile upsert note:', error.message);
          });
      }
    });
  } catch (err) {
    // Non-blocking fallback
  }

  return updated;
}
