// Script to make a user Pro for testing purposes
// Usage: node scripts/make-user-pro.js <email>

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function makeUserPro(email) {
  if (!email) {
    console.log('\n❌ Error: Please provide an email address');
    console.log('Usage: node scripts/make-user-pro.js <email>\n');
    process.exit(1);
  }

  console.log(`\n🔍 Looking up user: ${email}...`);

  // Get user by email
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    console.error('Error listing users:', listError);
    process.exit(1);
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    console.log(`\n❌ User not found: ${email}`);
    console.log('\nAvailable users:');
    users.forEach(u => console.log(`  - ${u.email}`));
    console.log('\n💡 Tip: Sign up at http://localhost:3000/signup first\n');
    process.exit(1);
  }

  console.log(`✅ Found user: ${user.email} (ID: ${user.id})`);

  // Update user profile to Pro
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1); // 1 year from now

  const { data: profile, error: updateError } = await supabase
    .from('user_profiles')
    .update({
      subscription_tier: 'pro',
      subscription_expires_at: expirationDate.toISOString()
    })
    .eq('id', user.id)
    .select()
    .single();

  if (updateError) {
    console.error('Error updating profile:', updateError);
    process.exit(1);
  }

  console.log('\n✅ User upgraded to Pro!');
  console.log(`   - Email: ${user.email}`);
  console.log(`   - Tier: ${profile.subscription_tier}`);
  console.log(`   - Expires: ${new Date(profile.subscription_expires_at).toLocaleDateString()}`);
  console.log('\n💡 Refresh your browser to see Pro features!\n');
}

// Get email from command line
const email = process.argv[2];
makeUserPro(email)
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Script failed:', err);
    process.exit(1);
  });
