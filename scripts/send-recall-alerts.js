// Script to send AI-powered recall alerts to affected users
// Run when new recalls are added to notify users who have favorited the product

const { createClient } = require('@supabase/supabase-js');
const { generateRecallAlert } = require('../lib/ai');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function sendRecallAlerts(recallId) {
  console.log('\n' + '='.repeat(70));
  console.log('AI-POWERED RECALL NOTIFICATION SYSTEM');
  console.log('='.repeat(70) + '\n');

  try {
    // Get recall details
    const { data: recall, error: recallError } = await supabase
      .from('recalls')
      .select(`
        *,
        products (
          id,
          name,
          brand,
          category,
          overall_score
        )
      `)
      .eq('id', recallId)
      .single();

    if (recallError || !recall) {
      console.error('❌ Recall not found');
      return;
    }

    console.log(`📋 Recall: ${recall.products.name} by ${recall.products.brand}`);
    console.log(`⚠️  Risk Level: ${recall.risk_level}`);
    console.log(`📅 Recall Date: ${recall.recall_date}\n`);

    // Find users who favorited this product
    const { data: affectedUsers } = await supabase
      .from('user_favorites')
      .select(`
        user_id,
        user_profiles!inner (
          id,
          notification_email
        )
      `)
      .eq('product_id', recall.product_id);

    if (!affectedUsers || affectedUsers.length === 0) {
      console.log('ℹ️  No users have favorited this product\n');
      return;
    }

    console.log(`👥 Found ${affectedUsers.length} affected user(s)\n`);

    // Find safe alternatives in the same category
    const { data: alternatives } = await supabase
      .from('products')
      .select('id, name, brand, category, overall_score')
      .eq('category', recall.products.category)
      .gte('overall_score', 85)
      .neq('id', recall.product_id)
      .order('overall_score', { ascending: false })
      .limit(3);

    console.log(`🔄 Found ${alternatives?.length || 0} safe alternatives\n`);

    // Generate and send alerts to each user
    let sent = 0;
    for (const userFavorite of affectedUsers) {
      const userProfile = userFavorite.user_profiles;

      if (!userProfile.notification_email) {
        console.log(`   ⏭️  User ${userProfile.id}: Notifications disabled`);
        continue;
      }

      console.log(`   📧 Generating alert for user ${userProfile.id}...`);

      // Generate AI-powered alert message
      const alertMessage = await generateRecallAlert(
        userProfile,
        recall.products,
        recall,
        alternatives || []
      );

      if (!alertMessage) {
        console.log(`   ⚠️  Failed to generate AI alert, using fallback`);
        // Here you would use a fallback template
        continue;
      }

      // In a real implementation, you would send this via email
      // For now, we'll just log it and save to the database
      console.log(`   ✅ Alert generated (${alertMessage.length} characters)\n`);

      // Save notification to database
      const { error: notifError } = await supabase
        .from('recall_notifications')
        .insert({
          user_id: userProfile.id,
          recall_id: recall.id,
          notification_type: 'email',
        });

      if (!notifError) {
        sent++;
      }

      // Preview the alert message
      console.log('   📝 Alert Preview:');
      console.log('   ' + '-'.repeat(66));
      console.log('   ' + alertMessage.split('\n').join('\n   '));
      console.log('   ' + '-'.repeat(66) + '\n');
    }

    console.log('='.repeat(70));
    console.log(`✅ Recall alerts processed: ${sent}/${affectedUsers.length} sent\n`);
    console.log('💡 In production, these would be sent via:');
    console.log('   - Email (SendGrid, AWS SES, etc.)');
    console.log('   - Push notifications (Firebase, OneSignal, etc.)');
    console.log('   - SMS (Twilio, etc.)\n');

  } catch (error) {
    console.error('❌ Error sending recall alerts:', error);
  }
}

// Get recall ID from command line or use most recent
async function main() {
  const recallId = process.argv[2];

  if (recallId) {
    await sendRecallAlerts(recallId);
  } else {
    // Get most recent recall
    const { data: recalls } = await supabase
      .from('recalls')
      .select('id, products(name, brand), recall_date')
      .eq('is_active', true)
      .order('recall_date', { ascending: false })
      .limit(5);

    if (!recalls || recalls.length === 0) {
      console.log('❌ No active recalls found\n');
      process.exit(1);
    }

    console.log('\n📋 Recent Active Recalls:\n');
    recalls.forEach((r, i) => {
      console.log(`${i + 1}. ${r.products.name} (${r.products.brand})`);
      console.log(`   ID: ${r.id}`);
      console.log(`   Date: ${r.recall_date}\n`);
    });

    console.log('💡 Usage: node scripts/send-recall-alerts.js <recall_id>');
    console.log(`   Example: node scripts/send-recall-alerts.js ${recalls[0].id}\n`);
  }

  process.exit(0);
}

main();
