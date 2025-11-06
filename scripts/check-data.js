// Quick script to check what's in the database
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkData() {
  console.log('Checking database contents...\n');

  // Count products
  const { count: productCount, error: countError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  console.log(`Total products: ${productCount || 0}`);

  if (countError) {
    console.error('Error counting products:', countError);
    return;
  }

  if (productCount === 0) {
    console.log('\n⚠️  No products found in database. You need to run a seed script.');
    return;
  }

  // Get sample products
  const { data: sampleProducts, error: sampleError } = await supabase
    .from('products')
    .select('id, name, brand, category, image_url, overall_score')
    .limit(5);

  console.log('\nSample products:');
  sampleProducts?.forEach(p => {
    console.log(`- ${p.name} (${p.brand})`);
    console.log(`  Score: ${p.overall_score}, Image: ${p.image_url ? 'Yes' : 'No'}`);
  });

  // Check how many have images
  const { count: withImages } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .not('image_url', 'is', null);

  const { count: withoutImages } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .is('image_url', null);

  console.log(`\nProducts with images: ${withImages || 0}`);
  console.log(`Products without images: ${withoutImages || 0}`);

  // Check brands
  const { data: brands } = await supabase
    .from('products')
    .select('brand')
    .not('brand', 'is', null);

  const brandCounts = {};
  brands?.forEach(b => {
    brandCounts[b.brand] = (brandCounts[b.brand] || 0) + 1;
  });

  console.log('\nBrand distribution (top 10):');
  Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([brand, count]) => {
      console.log(`  ${brand}: ${count}`);
    });

  // Check lab results
  const { count: labCount } = await supabase
    .from('lab_results')
    .select('*', { count: 'exact', head: true });

  console.log(`\nLab results: ${labCount || 0}`);
}

checkData()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
