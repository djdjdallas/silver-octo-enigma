// Script to add category-based stock photos to products
// Uses high-quality Unsplash images for each product category
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Category-specific stock images from Unsplash
// Using high-quality, baby-food appropriate images
const CATEGORY_IMAGES = {
  cereal: [
    'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&h=800&fit=crop&q=80', // Baby cereal bowl
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=800&fit=crop&q=80', // Oats
    'https://images.unsplash.com/photo-1574392334147-4ab0e3bafd3d?w=800&h=800&fit=crop&q=80', // Rice cereal
    'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&h=800&fit=crop&q=80', // Grain cereal
  ],
  puree: [
    'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=800&h=800&fit=crop&q=80', // Baby food puree
    'https://images.unsplash.com/photo-1560155477-48c59c99f7cc?w=800&h=800&fit=crop&q=80', // Fruit puree
    'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&h=800&fit=crop&q=80', // Vegetables
    'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&h=800&fit=crop&q=80', // Carrot puree
    'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=800&h=800&fit=crop&q=80', // Apple
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=800&fit=crop&q=80', // Banana
    'https://images.unsplash.com/photo-1619546952812-520e98064a52?w=800&h=800&fit=crop&q=80', // Sweet potato
    'https://images.unsplash.com/photo-1507330439931-1e5b200d4d17?w=800&h=800&fit=crop&q=80', // Pear
  ],
  snack: [
    'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=800&fit=crop&q=80', // Baby snacks
    'https://images.unsplash.com/photo-1606312619070-d48b4cde8e0f?w=800&h=800&fit=crop&q=80', // Puffs/snacks
    'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=800&fit=crop&q=80', // Baby cookies
    'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&h=800&fit=crop&q=80', // Healthy snacks
  ],
  juice: [
    'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=800&fit=crop&q=80', // Apple juice
    'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&h=800&fit=crop&q=80', // Fruit juice
    'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=800&h=800&fit=crop&q=80', // Juice glass
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&h=800&fit=crop&q=80', // Fresh juice
  ],
  meal: [
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=800&fit=crop&q=80', // Baby meal
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=800&fit=crop&q=80', // Toddler food
    'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&h=800&fit=crop&q=80', // Kids meal
    'https://images.unsplash.com/photo-1621510456681-2330135e5871?w=800&h=800&fit=crop&q=80', // Pasta meal
  ],
  formula: [
    'https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?w=800&h=800&fit=crop&q=80', // Baby bottle
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=800&fit=crop&q=80', // Baby feeding
  ],
  teething: [
    'https://images.unsplash.com/photo-1588328263929-5b8e39bdf0b2?w=800&h=800&fit=crop&q=80', // Teething biscuits
    'https://images.unsplash.com/photo-1603046891726-36bfd957e0f1?w=800&h=800&fit=crop&q=80', // Baby biscuits
  ],
  other: [
    'https://images.unsplash.com/photo-1628594107295-1c0e1e3e1bde?w=800&h=800&fit=crop&q=80', // Baby food general
    'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=800&fit=crop&q=80', // Baby food jars
  ]
};

// Helper to get a semi-random but consistent image for a product
function getImageForProduct(productId, category) {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.other;

  // Use product ID to deterministically select an image
  // This ensures same product always gets same image
  const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % images.length;

  return images[index];
}

async function addProductImages() {
  console.log('Starting to add category-based images to products...\n');

  try {
    // Get all products
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, name, category');

    if (fetchError) {
      throw fetchError;
    }

    console.log(`Found ${products.length} products to update\n`);

    // Update each product with category-appropriate image
    let updated = 0;
    let errors = 0;

    for (const product of products) {
      const imageUrl = getImageForProduct(product.id, product.category);

      const { error: updateError } = await supabase
        .from('products')
        .update({ image_url: imageUrl })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Error updating ${product.name}:`, updateError.message);
        errors++;
      } else {
        updated++;
        if (updated % 50 === 0) {
          console.log(`Updated ${updated}/${products.length} products...`);
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('IMAGE UPDATE COMPLETED!');
    console.log('='.repeat(60));
    console.log(`Successfully updated: ${updated} products`);
    console.log(`Errors: ${errors}`);
    console.log('');

    // Show category breakdown
    const categoryCounts = {};
    products.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    console.log('Images added by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      const numImages = CATEGORY_IMAGES[category]?.length || CATEGORY_IMAGES.other.length;
      console.log(`  ${category}: ${count} products (${numImages} image variations)`);
    });

  } catch (error) {
    console.error('Error adding images:', error);
    process.exit(1);
  }
}

// Run the script
addProductImages()
  .then(() => {
    console.log('\nScript finished successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
