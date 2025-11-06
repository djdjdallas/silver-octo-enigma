// Check distribution of safety scores across all products
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkScores() {
  const { data: products } = await supabase
    .from('products')
    .select('id, name, brand, overall_score')
    .order('overall_score', { ascending: true });

  if (!products) {
    console.log('No products found');
    return;
  }

  // Categorize by safety rating
  const safe = products.filter(p => p.overall_score >= 70);
  const caution = products.filter(p => p.overall_score >= 40 && p.overall_score < 70);
  const avoid = products.filter(p => p.overall_score < 40);

  console.log('Safety Score Distribution:\n');
  console.log(`Safe (70-100):     ${safe.length} products (${Math.round(safe.length/products.length*100)}%)`);
  console.log(`Caution (40-69):   ${caution.length} products (${Math.round(caution.length/products.length*100)}%)`);
  console.log(`Avoid (0-39):      ${avoid.length} products (${Math.round(avoid.length/products.length*100)}%)`);
  console.log(`\nTotal: ${products.length} products\n`);

  // Show lowest scoring products
  console.log('Lowest Scoring Products (Bottom 10):\n');
  products.slice(0, 10).forEach((p, i) => {
    const rating = p.overall_score >= 70 ? 'Safe' : p.overall_score >= 40 ? 'Caution' : 'Avoid';
    console.log(`${i + 1}. ${p.name} (${p.brand})`);
    console.log(`   Score: ${p.overall_score} - ${rating}\n`);
  });

  // Show highest scoring products
  console.log('\nHighest Scoring Products (Top 10):\n');
  products.slice(-10).reverse().forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} (${p.brand})`);
    console.log(`   Score: ${p.overall_score} - Safe\n`);
  });

  // Show score ranges
  const scores = products.map(p => p.overall_score);
  console.log('\nScore Statistics:');
  console.log(`Lowest:  ${Math.min(...scores)}`);
  console.log(`Highest: ${Math.max(...scores)}`);
  console.log(`Average: ${Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)}`);
}

checkScores().then(() => process.exit(0)).catch(console.error);
