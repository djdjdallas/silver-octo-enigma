// Script to update all products with brand logos
// Looks for logo files in public/images/brands/ and updates database
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Map brand names to logo filenames
const BRAND_LOGO_MAP = {
  'Gerber': 'gerber',
  'Beech-Nut': 'beech-nut',
  'Happy Baby': 'happy-baby',
  'Parent\'s Choice': 'parents-choice',
  'Plum Organics': 'plum-organics',
  'Sprout Organic': 'sprout-organic',
  'Up & Up': 'up-and-up',
  'Earth\'s Best': 'earths-best',
  '365 Everyday Value': '365-everyday-value',
  'Little Spoon': 'little-spoon',
  'Once Upon a Farm': 'once-upon-a-farm',
  'Simple Truth Organic': 'simple-truth-organic'
};

function findLogoFile(brandSlug) {
  const brandsDir = path.join(__dirname, '../public/images/brands');
  const extensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];

  for (const ext of extensions) {
    const filePath = path.join(brandsDir, brandSlug + ext);
    if (fs.existsSync(filePath)) {
      return `/images/brands/${brandSlug}${ext}`;
    }
  }

  return null;
}

async function updateBrandLogos() {
  console.log('Checking for brand logos and updating database...\n');

  const brandsDir = path.join(__dirname, '../public/images/brands');

  if (!fs.existsSync(brandsDir)) {
    console.error('Error: public/images/brands directory not found!');
    return;
  }

  let updated = 0;
  let skipped = 0;
  let missing = [];

  for (const [brandName, brandSlug] of Object.entries(BRAND_LOGO_MAP)) {
    const logoPath = findLogoFile(brandSlug);

    if (!logoPath) {
      console.log(`⏭️  Skipping ${brandName} - no logo file found (looking for: ${brandSlug}.png/jpg/svg)`);
      missing.push({ brand: brandName, filename: brandSlug });
      skipped++;
      continue;
    }

    // Update all products with this brand
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id')
      .eq('brand', brandName);

    if (fetchError) {
      console.error(`Error fetching products for ${brandName}:`, fetchError);
      continue;
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({ image_url: logoPath })
      .eq('brand', brandName);

    if (updateError) {
      console.error(`Error updating ${brandName}:`, updateError);
    } else {
      console.log(`✅ Updated ${products.length} products for ${brandName} with logo: ${logoPath}`);
      updated++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('BRAND LOGO UPDATE COMPLETED!');
  console.log('='.repeat(60));
  console.log(`Brands updated: ${updated}/${Object.keys(BRAND_LOGO_MAP).length}`);
  console.log(`Brands skipped (no logo): ${skipped}`);

  if (missing.length > 0) {
    console.log('\n⚠️  Missing logos for:');
    missing.forEach(({ brand, filename }) => {
      console.log(`   - ${brand} (add as: ${filename}.png or ${filename}.jpg)`);
    });
    console.log('\nAdd logo files to public/images/brands/ and run this script again.');
  }
}

updateBrandLogos()
  .then(() => {
    console.log('\nScript finished!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
