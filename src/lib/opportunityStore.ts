import { Opportunity } from './types/database';
import { createClient } from './supabase/client';

const OPPORTUNITIES_KEY = 'krow_published_opportunities';

export function getLocalOpportunities(): Opportunity[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(OPPORTUNITIES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading opportunities from localStorage:', err);
  }
  return [];
}

export function saveLocalOpportunity(opportunity: Opportunity): Opportunity[] {
  const current = getLocalOpportunities();
  const updated = [opportunity, ...current];

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving opportunity to localStorage:', err);
    }
  }

  // Attempt async write to Supabase table
  try {
    const supabase = createClient();
    supabase
      .from('opportunities')
      .insert([
        {
          id: opportunity.id,
          organization_id: opportunity.organization_id || 'org-krow-default',
          title: opportunity.title,
          description: opportunity.description,
          banner_url: opportunity.banner_url,
          date: opportunity.date,
          start_time: opportunity.start_time,
          end_time: opportunity.end_time,
          location: opportunity.location,
          minimum_age: opportunity.minimum_age,
          max_volunteers: opportunity.max_volunteers,
          requirements: opportunity.requirements,
          parking_info: opportunity.parking_info,
          accessibility_notes: opportunity.accessibility_notes,
          contact_email: opportunity.contact_email,
          contact_phone: opportunity.contact_phone,
        },
      ])
      .then(({ error }) => {
        if (error) console.log('Supabase opportunity insert note:', error.message);
      });
  } catch (err) {
    // Non-blocking fallback
  }

  return updated;
}
