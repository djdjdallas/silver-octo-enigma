// Seed script to populate database with sample products and lab results
// Run with: node scripts/seed.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Sample product data based on common baby food products
const PRODUCTS = [
  // Cereals
  {
    name: "Gerber Oatmeal Baby Cereal",
    brand: "Gerber",
    category: "cereal",
    barcode: "015000076207",
    description: "Single grain oatmeal cereal for babies",
    overall_score: 85,
  },
  {
    name: "Beech-Nut Rice Baby Cereal",
    brand: "Beech-Nut",
    category: "cereal",
    barcode: "052800450028",
    description: "Rice cereal for first foods",
    overall_score: 62,
  },
  {
    name: "Earth's Best Organic Multi-Grain Cereal",
    brand: "Earth's Best",
    category: "cereal",
    barcode: "023923302006",
    description: "Organic multi-grain cereal",
    overall_score: 78,
  },
  {
    name: "Happy Baby Oatmeal Baby Cereal",
    brand: "Happy Baby",
    category: "cereal",
    barcode: "852697001354",
    description: "Organic oatmeal cereal with iron",
    overall_score: 88,
  },
  {
    name: "Parent's Choice Rice Cereal",
    brand: "Parent's Choice",
    category: "cereal",
    barcode: "078742119755",
    description: "Rice baby cereal",
    overall_score: 58,
  },

  // Purees
  {
    name: "Gerber 1st Foods Apple",
    brand: "Gerber",
    category: "puree",
    barcode: "015000076276",
    description: "Apple puree for babies",
    overall_score: 92,
  },
  {
    name: "Beech-Nut Stage 1 Banana",
    brand: "Beech-Nut",
    category: "puree",
    barcode: "052800450127",
    description: "Banana puree",
    overall_score: 90,
  },
  {
    name: "Earth's Best Organic Sweet Potato",
    brand: "Earth's Best",
    category: "puree",
    barcode: "023923302051",
    description: "Organic sweet potato puree",
    overall_score: 75,
  },
  {
    name: "Happy Baby Clearly Crafted Pears",
    brand: "Happy Baby",
    category: "puree",
    barcode: "852697001446",
    description: "Organic pear puree",
    overall_score: 94,
  },
  {
    name: "Plum Organics Stage 1 Carrot",
    brand: "Plum Organics",
    category: "puree",
    barcode: "846675000101",
    description: "Organic carrot puree",
    overall_score: 72,
  },
  {
    name: "Gerber 2nd Foods Sweet Potato",
    brand: "Gerber",
    category: "puree",
    barcode: "015000076313",
    description: "Sweet potato puree",
    overall_score: 68,
  },

  // Snacks
  {
    name: "Gerber Puffs Banana",
    brand: "Gerber",
    category: "snack",
    barcode: "015000073466",
    description: "Banana flavored puffs",
    overall_score: 82,
  },
  {
    name: "Happy Baby Superfood Puffs Apple",
    brand: "Happy Baby",
    category: "snack",
    barcode: "852697001521",
    description: "Organic apple puffs",
    overall_score: 86,
  },
  {
    name: "Plum Organics Super Puffs Purple Carrot",
    brand: "Plum Organics",
    category: "snack",
    barcode: "846675000218",
    description: "Purple carrot puffs",
    overall_score: 80,
  },
  {
    name: "Gerber Yogurt Melts Strawberry",
    brand: "Gerber",
    category: "snack",
    barcode: "015000073558",
    description: "Strawberry yogurt melts",
    overall_score: 76,
  },

  // Juices
  {
    name: "Gerber 100% Apple Juice",
    brand: "Gerber",
    category: "juice",
    barcode: "015000076832",
    description: "100% apple juice for toddlers",
    overall_score: 70,
  },
  {
    name: "Earth's Best Organic Apple Juice",
    brand: "Earth's Best",
    category: "juice",
    barcode: "023923302174",
    description: "Organic apple juice",
    overall_score: 84,
  },
  {
    name: "Beech-Nut Apple Juice",
    brand: "Beech-Nut",
    category: "juice",
    barcode: "052800450233",
    description: "100% apple juice",
    overall_score: 66,
  },

  // Add more products to reach 50+
  {
    name: "Gerber 1st Foods Peas",
    brand: "Gerber",
    category: "puree",
    barcode: "015000076290",
    description: "Green pea puree",
    overall_score: 88,
  },
  {
    name: "Happy Baby Clearly Crafted Apples",
    brand: "Happy Baby",
    category: "puree",
    barcode: "852697001439",
    description: "Organic apple puree",
    overall_score: 95,
  },
  {
    name: "Beech-Nut Stage 2 Pear & Pineapple",
    brand: "Beech-Nut",
    category: "puree",
    barcode: "052800450165",
    description: "Pear and pineapple blend",
    overall_score: 87,
  },
  {
    name: "Plum Organics Stage 2 Apple & Broccoli",
    brand: "Plum Organics",
    category: "puree",
    barcode: "846675000143",
    description: "Apple and broccoli blend",
    overall_score: 79,
  },
  {
    name: "Earth's Best Organic Banana",
    brand: "Earth's Best",
    category: "puree",
    barcode: "023923302068",
    description: "Organic banana puree",
    overall_score: 91,
  },
  {
    name: "Gerber 2nd Foods Apples & Blueberries",
    brand: "Gerber",
    category: "puree",
    barcode: "015000076344",
    description: "Apple and blueberry blend",
    overall_score: 81,
  },
  {
    name: "Happy Baby Clearly Crafted Butternut Squash",
    brand: "Happy Baby",
    category: "puree",
    barcode: "852697001453",
    description: "Organic butternut squash",
    overall_score: 89,
  },
  {
    name: "Beech-Nut Naturals Stage 1 Pear",
    brand: "Beech-Nut",
    category: "puree",
    barcode: "052800450134",
    description: "Pear puree",
    overall_score: 93,
  },
];

// Generate realistic lab results and contaminants
function generateLabResults(productScore) {
  const labs = [
    "Healthy Babies Bright Futures",
    "Consumer Reports Testing Lab",
    "EPA Laboratory",
    "Independent Food Testing Laboratory",
  ];

  const contaminants = [
    {
      name: "Lead",
      safetyLimit: 1.0,
      healthImpact: "Can affect brain development and cause learning difficulties",
    },
    {
      name: "Arsenic",
      safetyLimit: 10.0,
      healthImpact: "Associated with developmental delays and immune system issues",
    },
    {
      name: "Cadmium",
      safetyLimit: 5.0,
      healthImpact: "Can damage kidneys and bones, affects growth",
    },
    {
      name: "Mercury",
      safetyLimit: 1.0,
      healthImpact: "Harmful to nervous system development and brain function",
    },
  ];

  // Generate amounts based on score (lower score = higher amounts)
  const scoreFactor = productScore / 100;

  return {
    lab_name: labs[Math.floor(Math.random() * labs.length)],
    test_date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      .toISOString()
      .split('T')[0],
    report_url: "https://example.com/report.pdf",
    contaminants: contaminants.map((cont) => ({
      contaminant_name: cont.name,
      amount_detected: parseFloat((cont.safetyLimit * (1 - scoreFactor) * (0.5 + Math.random())).toFixed(3)),
      unit: "ppb",
      safety_limit: cont.safetyLimit,
      exceeds_limit: scoreFactor < 0.6 && Math.random() > 0.5,
      health_impact: cont.healthImpact,
    })),
  };
}

async function seedDatabase() {
  console.log('Starting database seed...');

  try {
    // Insert products
    console.log('Inserting products...');
    const { data: insertedProducts, error: productError } = await supabase
      .from('products')
      .insert(PRODUCTS)
      .select();

    if (productError) {
      throw productError;
    }

    console.log(`Inserted ${insertedProducts.length} products`);

    // Insert lab results and contaminants for each product
    console.log('Inserting lab results and contaminants...');

    for (const product of insertedProducts) {
      const labData = generateLabResults(product.overall_score);

      // Insert lab result
      const { data: labResult, error: labError } = await supabase
        .from('lab_results')
        .insert({
          product_id: product.id,
          lab_name: labData.lab_name,
          test_date: labData.test_date,
          report_url: labData.report_url,
        })
        .select()
        .single();

      if (labError) {
        console.error(`Error inserting lab result for ${product.name}:`, labError);
        continue;
      }

      // Insert contaminants for this lab result
      const contaminantsToInsert = labData.contaminants.map((cont) => ({
        ...cont,
        lab_result_id: labResult.id,
      }));

      const { error: contError } = await supabase
        .from('contaminants')
        .insert(contaminantsToInsert);

      if (contError) {
        console.error(`Error inserting contaminants for ${product.name}:`, contError);
      }
    }

    console.log('Database seed completed successfully!');
    console.log(`Total products: ${insertedProducts.length}`);
    console.log('Lab results and contaminants have been generated for all products');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed
seedDatabase()
  .then(() => {
    console.log('Seed script finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
  });
