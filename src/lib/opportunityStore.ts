import { Opportunity } from './types/database';
import { createClient } from './supabase/client';

const OPPORTUNITIES_KEY = 'krow_published_opportunities';

// Helper to generate a valid UUID v4 string
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const localData = getLocalOpportunities();

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('opportunities')
      .select('*, organization:organizations(*)');

    if (!error && data && data.length > 0) {
      const dbOpportunities: Opportunity[] = data.map((item: any) => ({
        id: item.id,
        organization_id: item.organization_id,
        title: item.title,
        description: item.description,
        banner_url: item.banner_url || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80',
        date: item.date,
        start_time: item.start_time,
        end_time: item.end_time,
        location: item.location,
        minimum_age: item.minimum_age || 0,
        max_volunteers: item.max_volunteers || 20,
        requirements: item.requirements,
        parking_info: item.parking_info,
        accessibility_notes: item.accessibility_notes,
        contact_email: item.contact_email,
        contact_phone: item.contact_phone,
        created_at: item.created_at,
        organization: item.organization ? {
          id: item.organization.id,
          owner_id: item.organization.owner_id,
          name: item.organization.name,
          description: item.organization.description,
          logo_url: item.organization.logo_url,
          banner_url: item.organization.banner_url,
          location: item.organization.location,
          created_at: item.organization.created_at,
        } : {
          id: item.organization_id,
          owner_id: 'org-owner',
          name: 'Community Organization',
          description: 'Local non-profit organization',
          logo_url: null,
          banner_url: null,
          location: item.location,
          created_at: item.created_at,
        },
        registrations_count: 0,
        is_registered: false,
      }));

      // Combine DB opportunities with local storage (deduplicating by ID)
      const combinedMap = new Map<string, Opportunity>();
      dbOpportunities.forEach((opp) => combinedMap.set(opp.id, opp));
      localData.forEach((opp) => combinedMap.set(opp.id, opp));

      return Array.from(combinedMap.values());
    }
  } catch (err) {
    console.log('Supabase fetch note:', err);
  }

  return localData;
}

export async function saveLocalOpportunity(opportunity: Opportunity): Promise<Opportunity[]> {
  const current = getLocalOpportunities();
  
  // Ensure valid UUID for Supabase
  const validOppId = opportunity.id.includes('-') && opportunity.id.length >= 32 ? opportunity.id : generateUUID();
  const updatedOpp = { ...opportunity, id: validOppId };
  
  const updated = [updatedOpp, ...current];

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving opportunity to localStorage:', err);
    }
  }

  // Sync to Supabase
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const ownerId = user ? user.id : '00000000-0000-4000-a000-000000000000';
    let orgId: string | null = null;

    // Check if an organization exists for this owner
    const { data: orgData } = await supabase
      .from('organizations')
      .select('id')
      .eq('owner_id', ownerId)
      .limit(1)
      .maybeSingle();

    if (orgData && orgData.id) {
      orgId = orgData.id;
    } else {
      // Create an organization record
      const newOrgId = generateUUID();
      const { data: createdOrg, error: orgError } = await supabase
        .from('organizations')
        .insert([
          {
            id: newOrgId,
            owner_id: ownerId,
            name: opportunity.organization?.name || 'Community Organization',
            location: opportunity.location,
          },
        ])
        .select('id')
        .maybeSingle();

      if (createdOrg && createdOrg.id) {
        orgId = createdOrg.id;
      } else {
        orgId = newOrgId;
      }
    }

    if (orgId) {
      const { error } = await supabase.from('opportunities').insert([
        {
          id: validOppId,
          organization_id: orgId,
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
      ]);

      if (error) {
        console.error('Supabase opportunity insert error:', error.message);
      } else {
        console.log('Successfully inserted opportunity into Supabase!');
      }
    }
  } catch (err) {
    console.error('Supabase sync exception:', err);
  }

  return updated;
}
