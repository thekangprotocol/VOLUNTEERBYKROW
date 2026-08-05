const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pmuhmzarkjhxptddtayk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdWhtemFya2poeHB0ZGR0YXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NzIxNDgsImV4cCI6MjEwMTQ0ODE0OH0.TXtX9pwCdKl4cNzQ23NXVNKNmKPtq-J32h9ake-2pBw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testOrgInsert() {
  console.log('--- Testing Organization Insert ---');
  
  const testOrg = {
    id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    name: 'Default Community Org',
    location: 'Toronto, ON',
  };

  const { data, error } = await supabase
    .from('organizations')
    .insert([testOrg]);

  console.log('Org Insert Result:', { data, error });
}

testOrgInsert();
