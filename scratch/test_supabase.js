const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pmuhmzarkjhxptddtayk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdWhtemFya2poeHB0ZGR0YXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NzIxNDgsImV4cCI6MjEwMTQ0ODE0OH0.TXtX9pwCdKl4cNzQ23NXVNKNmKPtq-J32h9ake-2pBw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fullTest() {
  console.log('--- Step 1: Inserting Test User ---');
  const userId = '00000000-0000-4000-a000-000000000000';
  const { data: userData, error: userErr } = await supabase
    .from('users')
    .upsert([{
      id: userId,
      email: 'organizer@krow.org',
      name: 'Default Organizer',
      role: 'organizer'
    }])
    .select();

  console.log('User Upsert Result:', { data: userData, error: userErr });

  console.log('\n--- Step 2: Inserting Test Organization ---');
  const orgId = '11111111-1111-4111-a111-111111111111';
  const { data: orgData, error: orgErr } = await supabase
    .from('organizations')
    .upsert([{
      id: orgId,
      owner_id: userId,
      name: 'Community Action Organization',
      location: 'Toronto, ON'
    }])
    .select();

  console.log('Org Insert Result:', { data: orgData, error: orgErr });

  console.log('\n--- Step 3: Inserting Test Opportunity ---');
  const oppId = '22222222-2222-4222-a222-222222222222';
  const { data: oppData, error: oppErr } = await supabase
    .from('opportunities')
    .insert([{
      id: oppId,
      organization_id: orgId,
      title: 'High Park Tree Planting Drive',
      description: 'Help plant native trees and restore High Park trail habitats.',
      date: '2026-08-25',
      start_time: '09:00',
      end_time: '13:00',
      location: 'Toronto, ON',
      minimum_age: 14,
      max_volunteers: 25,
      contact_email: 'volunteer@krow.org'
    }])
    .select();

  console.log('Opp Insert Result:', { data: oppData, error: oppErr });

  console.log('\n--- Step 4: Final Fetch Test ---');
  let { data: finalOpps, error: err4 } = await supabase.from('opportunities').select('*');
  console.log('Final Opps count:', finalOpps ? finalOpps.length : 0, 'Data:', finalOpps);
}

fullTest();
