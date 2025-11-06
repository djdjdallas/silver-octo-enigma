// Get all unique brands from the database
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getBrands() {
  const { data: products } = await supabase
    .from('products')
    .select('brand')
    .not('brand', 'is', null);

  const brandCounts = {};
  products?.forEach(p => {
    brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
  });

  console.log('All brands in database:\n');
  console.log('Brand Name | Product Count');
  console.log('-'.repeat(50));

  Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([brand, count]) => {
      console.log(`${brand.padEnd(30)} | ${count} products`);
    });

  console.log('\n' + '='.repeat(50));
  console.log(`Total: ${Object.keys(brandCounts).length} brands`);
  console.log('='.repeat(50));
}

getBrands().then(() => process.exit(0)).catch(console.error);
