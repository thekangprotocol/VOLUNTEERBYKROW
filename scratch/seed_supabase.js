const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pmuhmzarkjhxptddtayk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdWhtemFya2poeHB0ZGR0YXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NzIxNDgsImV4cCI6MjEwMTQ0ODE0OH0.TXtX9pwCdKl4cNzQ23NXVNKNmKPtq-J32h9ake-2pBw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('--- Seeding Opportunity into Supabase ---');
  
  const userId = '00000000-0000-4000-a000-000000000000';
  const orgId = '11111111-1111-4111-a111-111111111111';
  const oppId = '22222222-2222-4222-a222-222222222222';

  // 1. Insert User
  const { error: userErr } = await supabase
    .from('users')
    .upsert([{ id: userId, email: 'organizer@krow.org', name: 'Krow Organizer', role: 'organizer' }]);
  console.log('User seed error:', userErr);

  // 2. Insert Organization
  const { error: orgErr } = await supabase
    .from('organizations')
    .upsert([{ id: orgId, owner_id: userId, name: 'Krow Community Action', location: 'Toronto, ON' }]);
  console.log('Org seed error:', orgErr);

  // 3. Insert Opportunity
  const { data: oppData, error: oppErr } = await supabase
    .from('opportunities')
    .upsert([{
      id: oppId,
      organization_id: orgId,
      title: 'Community Tree Planting & Park Restoration',
      description: 'Join us for a morning of planting native trees and restoring green space in High Park.',
      banner_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
      date: '2026-08-25',
      start_time: '09:00',
      end_time: '13:00',
      location: 'High Park, Toronto, ON',
      minimum_age: 14,
      max_volunteers: 25,
      contact_email: 'volunteer@krow.org'
    }])
    .select();

  console.log('Opp seed result:', { data: oppData, error: oppErr });
}

seed();
