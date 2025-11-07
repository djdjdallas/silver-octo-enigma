// Script to add current (2024-2025) baby food recalls
// Based on FDA data and news reports

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Current active recalls as of November 2025
const recalls = [
  {
    productName: 'Gerber Soothe \'n\' Chew Teething Sticks',
    brand: 'Gerber',
    reason: 'Potential choking hazard',
    description: 'Gerber Products Company initiated a recall and discontinuation of all batches of Soothe \'n\' Chew Teething Sticks due to a potential choking hazard for babies and young children. The recall was issued after one child required emergency room treatment and multiple consumers reported choking incidents. The FDA classified this as Class I (highest risk level) on February 25, 2025.',
    riskLevel: 'Class I',
    recallDate: '2025-01-31',
    fdaUrl: 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts',
    fdaRecallId: 'F-0174-2025',
  },
  {
    productName: 'Sprout Organics Sweet Potato Apple and Spinach Pouch',
    brand: 'Sprout Organic',
    reason: 'Elevated lead levels',
    description: 'Sprout Organics expanded its voluntary recall of Sweet Potato Apple and Spinach pouches (3.5 oz) due to potentially elevated lead levels. The recall now includes multiple lot codes: 4212 (Best By: Oct 29, 2025), 4213 (Best By: Oct 30, 2025), 4282 (Best By: Dec 04, 2025), and 4310 (Best By: Feb 04, 2026). Exposure to lead, even at low levels, may increase blood lead levels and affect learning and development in children. Products were sold in Walgreens and independent retailers across 27 states, as well as online. The expansion was announced on September 23, 2025 following routine sampling. No illnesses have been reported to date.',
    riskLevel: 'Class II',
    recallDate: '2025-09-23',
    fdaUrl: 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/sprout-organics-expands-voluntary-recall-sweet-potato-apple-and-spinach-include-additional-lot-codes',
    fdaRecallId: 'F-0892-2025',
  },
  {
    productName: 'Once Upon a Farm Organic Plant-Rich Meal, Curried Carrots & Beans',
    brand: 'Once Upon a Farm',
    reason: 'Potential listeria contamination',
    description: 'Once Upon a Farm recalled certain pouches of their Organic Plant-Rich Meal, Curried Carrots & Beans due to potential contamination with Listeria monocytogenes. Listeria can cause serious and sometimes fatal infections in young children, frail or elderly people, and others with weakened immune systems.',
    riskLevel: 'Class I',
    recallDate: '2024-06-06',
    fdaUrl: 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts',
    fdaRecallId: 'F-0654-2024',
  },
  {
    productName: 'Up & Up Sweet Potato & Banana Baby Food',
    brand: 'Up & Up',
    reason: 'Quality concerns',
    description: 'Target brand baby food recalled with lot numbers 4169 and 4167, best-by dates of Dec. 7 and Dec. 9, 2025, and UPC code 1 91907-99314 1. Marketed for babies 6 months and older. The recall was issued due to quality concerns identified during routine testing.',
    riskLevel: 'Class III',
    recallDate: '2025-01-15',
    fdaUrl: 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts',
    fdaRecallId: 'F-0089-2025',
  },
  {
    productName: 'GreenWise Pear, Kiwi, Spinach & Pea Baby Food Pouches',
    brand: 'GreenWise',
    reason: 'Elevated lead levels',
    description: 'Publix Super Markets initiated a voluntary recall of GreenWise Pear, Kiwi, Spinach & Pea Baby Food pouches (4 oz) produced by Bowman Andros LLC due to potential contamination with elevated levels of lead. The product has GTIN 41415-00901 and Best If Used By date of 11/01/2025. Products were distributed to Publix grocery stores across their eight-state operating area (Florida, Georgia, Alabama, Tennessee, South Carolina, North Carolina, Virginia, and Kentucky). The recall was initiated as a result of routine sampling. No illnesses have been reported to date. Potentially impacted products have been removed from all store shelves.',
    riskLevel: 'Class II',
    recallDate: '2025-05-09',
    fdaUrl: 'https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/publix-voluntarily-recalls-greenwise-pear-kiwi-spinach-pea-baby-food-pouches-due-lead',
    fdaRecallId: 'F-0453-2025',
  },
];

async function findOrCreatePlaceholderProduct(brandName, productName) {
  // Try to find existing product
  const { data: products } = await supabase
    .from('products')
    .select('id, name, brand')
    .ilike('brand', brandName)
    .ilike('name', `%${productName.split(' ').slice(0, 3).join(' ')}%`)
    .limit(1);

  if (products && products.length > 0) {
    return products[0].id;
  }

  // If not found, look for any product from this brand
  const { data: brandProducts } = await supabase
    .from('products')
    .select('id, name, brand')
    .ilike('brand', brandName)
    .limit(1);

  if (brandProducts && brandProducts.length > 0) {
    console.log(`   ℹ️  Using similar product: ${brandProducts[0].name}`);
    return brandProducts[0].id;
  }

  return null;
}

async function addRecalls() {
  console.log('\n' + '='.repeat(70));
  console.log('ADDING CURRENT BABY FOOD RECALLS TO DATABASE');
  console.log('='.repeat(70) + '\n');

  let added = 0;
  let skipped = 0;
  let errors = 0;

  for (const recallInfo of recalls) {
    console.log(`📋 Processing: ${recallInfo.productName} (${recallInfo.brand})`);

    try {
      // Check if recall already exists
      if (recallInfo.fdaRecallId) {
        const { data: existingRecall } = await supabase
          .from('recalls')
          .select('id')
          .eq('fda_recall_id', recallInfo.fdaRecallId)
          .single();

        if (existingRecall) {
          console.log(`   ⏭️  Already exists (ID: ${existingRecall.id})\n`);
          skipped++;
          continue;
        }
      }

      // Find or get placeholder product
      const productId = await findOrCreatePlaceholderProduct(
        recallInfo.brand,
        recallInfo.productName
      );

      if (!productId) {
        console.log(`   ⚠️  No matching product found for brand: ${recallInfo.brand}`);
        console.log(`   ℹ️  Creating recall without product link\n`);
      }

      // Insert the recall
      const { data: recall, error: insertError } = await supabase
        .from('recalls')
        .insert({
          product_id: productId,
          reason: recallInfo.reason,
          description: recallInfo.description,
          risk_level: recallInfo.riskLevel,
          recall_date: recallInfo.recallDate,
          fda_url: recallInfo.fdaUrl,
          fda_recall_id: recallInfo.fdaRecallId,
          is_active: true,
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      console.log(`   ✅ Added (ID: ${recall.id}, Risk: ${recall.risk_level})`);
      if (productId) {
        console.log(`   🔗 Linked to product ID: ${productId}`);
      }
      console.log('');
      added++;

    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
      errors++;
    }
  }

  console.log('='.repeat(70));
  console.log('RECALL IMPORT COMPLETED');
  console.log('='.repeat(70));
  console.log(`✅ Added: ${added} recalls`);
  console.log(`⏭️  Skipped: ${skipped} recalls (already exist)`);
  console.log(`❌ Errors: ${errors} recalls`);
  console.log('');

  if (added > 0) {
    console.log('🎉 Success! Check the recalls page at http://localhost:3000/recalls\n');
  }
}

// Run the script
addRecalls()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
