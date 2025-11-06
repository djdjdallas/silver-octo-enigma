// Script to list all users in the system
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function listUsers() {
  console.log('\n📋 Fetching all users...\n');

  const { data: { users }, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error('Error listing users:', error);
    process.exit(1);
  }

  if (users.length === 0) {
    console.log('No users found.');
    console.log('\n💡 Sign up at http://localhost:3000/signup to create a test user\n');
    return;
  }

  console.log(`Found ${users.length} user(s):\n`);

  for (const user of users) {
    // Get profile for each user
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    console.log(`Email: ${user.email}`);
    console.log(`  User ID: ${user.id}`);
    console.log(`  Tier: ${profile?.subscription_tier || 'free'}`);
    if (profile?.subscription_expires_at) {
      console.log(`  Expires: ${new Date(profile.subscription_expires_at).toLocaleDateString()}`);
    }
    console.log(`  Created: ${new Date(user.created_at).toLocaleDateString()}`);
    console.log('');
  }

  console.log('To make a user Pro, run:');
  console.log('  node scripts/make-user-pro.js <email>\n');
}

listUsers()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Script failed:', err);
    process.exit(1);
  });
