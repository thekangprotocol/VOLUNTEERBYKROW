const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pmuhmzarkjhxptddtayk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdWhtemFya2poeHB0ZGR0YXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NzIxNDgsImV4cCI6MjEwMTQ0ODE0OH0.TXtX9pwCdKl4cNzQ23NXVNKNmKPtq-J32h9ake-2pBw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function directOppInsert() {
  console.log('--- Direct Opportunity Insert Test ---');

  const oppId = '33333333-3333-4333-a333-333333333333';
  const orgId = '11111111-1111-4111-a111-111111111111';

  const { data, error } = await supabase
    .from('opportunities')
    .insert([{
      id: oppId,
      organization_id: orgId,
      title: 'Direct Test Opportunity',
      description: 'Testing direct insertion into opportunities table',
      date: '2026-08-25',
      start_time: '10:00',
      end_time: '14:00',
      location: 'Toronto, ON',
      minimum_age: 14,
      max_volunteers: 20,
      contact_email: 'test@krow.org'
    }])
    .select();

  console.log('Direct Insert Result:', { data, error });
}

directOppInsert();
