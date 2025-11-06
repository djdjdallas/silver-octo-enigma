// Script to manually add a product recall
// Usage: node scripts/add-recall.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Example recall data structure
const recallData = {
  productName: 'Gerber Soothe \'n\' Chew Teething Sticks',
  brand: 'Gerber',
  reason: 'Potential choking hazard',
  description: 'Gerber Products Company initiated a recall and discontinuation of all batches of Soothe \'n\' Chew Teething Sticks due to a potential choking hazard. The recall was issued after one child required emergency room treatment and multiple consumers reported choking incidents.',
  riskLevel: 'Class I', // Class I, Class II, or Class III
  recallDate: '2025-01-31',
  fdaUrl: 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts',
  fdaRecallId: 'F-0174-2025', // Optional: FDA recall tracking number
};

async function addRecall(recallInfo) {
  console.log('\n🔍 Searching for product in database...');
  console.log(`   Product: ${recallInfo.productName}`);
  console.log(`   Brand: ${recallInfo.brand}\n`);

  try {
    // Try to find the product in the database
    let { data: product, error: searchError } = await supabase
      .from('products')
      .select('id, name, brand')
      .ilike('name', `%${recallInfo.productName}%`)
      .ilike('brand', `%${recallInfo.brand}%`)
      .single();

    // If product not found, try a broader search
    if (searchError || !product) {
      console.log('⚠️  Exact match not found, searching by brand only...');

      const { data: products, error: brandError } = await supabase
        .from('products')
        .select('id, name, brand')
        .ilike('brand', `%${recallInfo.brand}%`)
        .limit(5);

      if (products && products.length > 0) {
        console.log('\n📋 Found similar products:');
        products.forEach((p, i) => {
          console.log(`   ${i + 1}. ${p.name} (${p.brand})`);
        });
        console.log('\n💡 Consider matching manually or creating a placeholder product first.\n');

        // For now, let's create a recall without product_id (orphaned recall)
        product = null;
      } else {
        console.log('❌ No products found for this brand.');
        console.log('💡 You may need to add the product to the database first.\n');
        product = null;
      }
    } else {
      console.log(`✅ Found product: ${product.name} (ID: ${product.id})\n`);
    }

    // Check if recall already exists
    if (recallInfo.fdaRecallId) {
      const { data: existingRecall } = await supabase
        .from('recalls')
        .select('id')
        .eq('fda_recall_id', recallInfo.fdaRecallId)
        .single();

      if (existingRecall) {
        console.log('⚠️  This recall already exists in the database!');
        console.log(`   Recall ID: ${existingRecall.id}\n`);
        return;
      }
    }

    // Insert the recall
    const { data: recall, error: insertError } = await supabase
      .from('recalls')
      .insert({
        product_id: product?.id || null,
        reason: recallInfo.reason,
        description: recallInfo.description,
        risk_level: recallInfo.riskLevel,
        recall_date: recallInfo.recallDate,
        fda_url: recallInfo.fdaUrl,
        fda_recall_id: recallInfo.fdaRecallId || null,
        is_active: true,
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    console.log('✅ Recall added successfully!');
    console.log(`   Recall ID: ${recall.id}`);
    console.log(`   Product ID: ${recall.product_id || 'None (orphaned)'}`);
    console.log(`   Risk Level: ${recall.risk_level}`);
    console.log(`   Recall Date: ${recall.recall_date}\n`);

    if (!product) {
      console.log('⚠️  NOTE: This recall is not linked to a product.');
      console.log('   It won\'t show up on the recalls page until you:');
      console.log('   1. Add the product to the products table');
      console.log('   2. Update this recall with the product_id\n');
    }

  } catch (error) {
    console.error('❌ Error adding recall:', error);
    process.exit(1);
  }
}

// Run the script
console.log('='.repeat(60));
console.log('BABY FOOD RECALL ENTRY TOOL');
console.log('='.repeat(60));

addRecall(recallData)
  .then(() => {
    console.log('Script completed successfully!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
