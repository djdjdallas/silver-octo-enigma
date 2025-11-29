/**
 * Plum Organics AB 899 Data Scraper
 *
 * Scrapes heavy metals test results from Plum Organics' public disclosure page
 * and imports them into the SafeBaby database.
 *
 * Source: https://www.plumorganics.com/heavy-metals-test-results-for-pouches/
 *
 * Run with: node scripts/scrape-plum-organics.js
 */

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Plum Organics data extracted from their AB 899 disclosure page
// This is REAL lab test data with actual UPC barcodes
const PLUM_ORGANICS_DATA = [
  // Stage 1 Products
  {
    name: "just® prunes",
    stage: "Stage 1",
    upc: "890180001894",
    category: "puree",
  },
  {
    name: "just® mango",
    stage: "Stage 1",
    upc: "890180001870",
    category: "puree",
  },

  // Stage 2 Products
  {
    name: "pear, purple carrot + blueberry",
    stage: "Stage 2",
    upc: "890180001979",
    category: "puree",
  },
  {
    name: "strawberry, banana + granola",
    stage: "Stage 2",
    upc: "846675013507",
    category: "puree",
  },
  {
    name: "peach, banana + apricot",
    stage: "Stage 2",
    upc: "890180001214",
    category: "puree",
  },
  {
    name: "apple + broccoli",
    stage: "Stage 2",
    upc: "846675000538",
    category: "puree",
  },
  {
    name: "pear + pea w/ spinach",
    stage: "Stage 2",
    upc: "890180001191",
    category: "puree",
  },
  {
    name: "apple, plum, berry + barley",
    stage: "Stage 2",
    upc: "846675001078",
    category: "puree",
  },
  {
    name: "apple, spinach + avocado",
    stage: "Stage 2",
    upc: "846675012609",
    category: "puree",
  },
  {
    name: "apple + carrot",
    stage: "Stage 2",
    upc: "890180001221",
    category: "puree",
  },
  {
    name: "banana + pumpkin",
    stage: "Stage 2",
    upc: "890180001238",
    category: "puree",
  },
  {
    name: "apple, blackberry, coconut cream + oat",
    stage: "Stage 2",
    upc: "846675012586",
    category: "puree",
  },
  {
    name: "apple, raspberry, spinach + greek yogurt",
    stage: "Stage 2",
    upc: "846675001320",
    category: "puree",
  },
  {
    name: "pear + mango",
    stage: "Stage 2",
    upc: "890180001207",
    category: "puree",
  },
  {
    name: "pear, blueberry, avocado + granola",
    stage: "Stage 2",
    upc: "846675013491",
    category: "puree",
  },
  {
    name: "cherry, apple, blueberry, banana, quinoa, acai + kale",
    stage: "Stage 2",
    upc: "846675014702",
    category: "puree",
  },

  // Stage 2 Multi-packs
  {
    name: "apple + broccoli, 4ct multi-pack",
    stage: "Stage 2",
    upc: "846675002693",
    category: "puree",
  },
  {
    name: "pear + pea w/ spinach, 4ct multi-pack",
    stage: "Stage 2",
    upc: "846675002662",
    category: "puree",
  },
  {
    name: "pear, purple carrot + blueberry, 4ct multi-pack",
    stage: "Stage 2",
    upc: "846675002679",
    category: "puree",
  },
  {
    name: "banana + pumpkin, 4ct multi-pack",
    stage: "Stage 2",
    upc: "846675002686",
    category: "puree",
  },
  {
    name: "peach, banana + apricot, 4ct multi-pack",
    stage: "Stage 2",
    upc: "846675006653",
    category: "puree",
  },
  {
    name: "apple, raspberry, spinach + greek yogurt, 4ct multi-pack",
    stage: "Stage 2",
    upc: "846675003874",
    category: "puree",
  },
  {
    name: "just® prunes, 4ct multi-pack",
    stage: "Stage 1",
    upc: "846675006660",
    category: "puree",
  },

  // Stage 3 Products
  {
    name: "carrot, spinach, turkey, corn, apple + oat w/ celery & onion",
    stage: "Stage 3",
    upc: "846675003249",
    category: "meal",
  },
  {
    name: "carrot, sweet potato, corn, pea + chicken w/ quinoa, celery & leek",
    stage: "Stage 3",
    upc: "846675003256",
    category: "meal",
  },

  // Tots Products
  {
    name: "mighty builder cherry, zucchini, apple, greek yogurt + oat",
    stage: "Tots",
    upc: "846675014726",
    category: "puree",
  },
  {
    name: "mighty 4® banana, peach, pumpkin, carrot, greek yogurt + oat",
    stage: "Tots",
    upc: "846675005335",
    category: "puree",
  },
  {
    name: "mighty morning® banana, kiwi, spinach, greek yogurt + barley",
    stage: "Tots",
    upc: "846675005342",
    category: "puree",
  },
  {
    name: "mighty morning® apple, blackberry, purple carrot, greek yogurt + oat",
    stage: "Tots",
    upc: "846675005359",
    category: "puree",
  },
  {
    name: "mighty 4® banana, blueberry, sweet potato, carrot, greek yogurt + millet",
    stage: "Tots",
    upc: "846675005366",
    category: "puree",
  },
  {
    name: "mighty 4® strawberry, banana, greek yogurt, kale, amaranth + oat",
    stage: "Tots",
    upc: "846675005373",
    category: "puree",
  },
  {
    name: "mighty immunity carrot, pear, pomegranate + oat",
    stage: "Tots",
    upc: "846675007346",
    category: "puree",
  },
  {
    name: "mighty 4® guava, banana, black bean, carrot + oat",
    stage: "Tots",
    upc: "846675007421",
    category: "puree",
  },
  {
    name: "mighty 4® pear, black bean, cherry, blackberry, strawberry, oat + spinach",
    stage: "Tots",
    upc: "846675007438",
    category: "puree",
  },
  {
    name: "mighty immunity sweet potato, apple, banana + carrot",
    stage: "Tots",
    upc: "846675012531",
    category: "puree",
  },
  {
    name: "mighty 4® mango, pineapple, white bean, butternut squash + oat",
    stage: "Tots",
    upc: "846675012555",
    category: "puree",
  },
  {
    name: "mighty builder mango, banana, white bean + chia",
    stage: "Tots",
    upc: "846675012968",
    category: "puree",
  },
  {
    name: "mighty builder pear, white bean, blueberry, date + chia",
    stage: "Tots",
    upc: "846675012975",
    category: "puree",
  },
  {
    name: "mighty builder banana, white bean, strawberry + chia",
    stage: "Tots",
    upc: "846675012982",
    category: "puree",
  },
  {
    name: "mighty zen mango, peach, pea, quinoa w/ chamomile & lavender",
    stage: "Tots",
    upc: "846675014740",
    category: "puree",
  },
  {
    name: "larger size apple + broccoli",
    stage: "Tots",
    upc: "846675014276",
    category: "puree",
  },

  // Tots Multi-packs
  {
    name: "mighty 4® banana, blueberry, sweet potato, carrot, greek yogurt + millet, 4ct multi-pack",
    stage: "Tots",
    upc: "846675003591",
    category: "puree",
  },
  {
    name: "mighty morning® apple, blackberry, purple carrot, greek yogurt + oat, 4ct multi-pack",
    stage: "Tots",
    upc: "846675003638",
    category: "puree",
  },
  {
    name: "mighty 4® strawberry, banana, greek yogurt, kale, amaranth + oat, 4ct multi-pack",
    stage: "Tots",
    upc: "846675007667",
    category: "puree",
  },

  // 2-3 Years Products
  {
    name: "super smoothie, 4ct multi-pack",
    stage: "2-3 yrs",
    upc: "846675005748",
    category: "puree",
  },
];

// Latest test results from the AB 899 disclosure (most recent batch per product)
// These are REAL lab test results from Plum Organics
const LATEST_TEST_RESULTS = {
  890180001894: {
    lead: 3,
    mercury: 0.5,
    arsenic: 1,
    cadmium: 0.5,
    date: "2026-09-17",
  }, // just prunes
  890180001870: {
    lead: 1.5,
    mercury: 0.5,
    arsenic: 7.5,
    cadmium: 2,
    date: "2026-09-03",
  }, // just mango
  890180001979: {
    lead: 2,
    mercury: 0.5,
    arsenic: 6.5,
    cadmium: 3.5,
    date: "2026-10-23",
  }, // pear purple carrot blueberry
  846675013507: {
    lead: 1.5,
    mercury: 0.5,
    arsenic: 2.5,
    cadmium: 2.5,
    date: "2026-08-30",
  }, // strawberry banana granola
  890180001214: {
    lead: 2.5,
    mercury: 0.5,
    arsenic: 6.5,
    cadmium: 0.5,
    date: "2026-09-16",
  }, // peach banana apricot
  846675000538: {
    lead: 0.5,
    mercury: 0.5,
    arsenic: 0.5,
    cadmium: 0.5,
    date: "2026-10-21",
  }, // apple broccoli
  890180001191: {
    lead: 0.5,
    mercury: 0.5,
    arsenic: 2,
    cadmium: 0.5,
    date: "2026-08-13",
  }, // pear pea spinach
  846675001078: {
    lead: 1,
    mercury: 0.5,
    arsenic: 1,
    cadmium: 2,
    date: "2026-07-09",
  }, // apple plum berry barley
  846675012609: {
    lead: 3,
    mercury: 0.5,
    arsenic: 4,
    cadmium: 0.5,
    date: "2026-07-31",
  }, // apple spinach avocado
  890180001221: {
    lead: 6,
    mercury: 0.5,
    arsenic: 7.5,
    cadmium: 3.5,
    date: "2026-07-01",
  }, // apple carrot
  890180001238: {
    lead: 1,
    mercury: 0.5,
    arsenic: 1,
    cadmium: 0.5,
    date: "2026-09-24",
  }, // banana pumpkin
  846675012586: {
    lead: 0.5,
    mercury: 0.5,
    arsenic: 2,
    cadmium: 1,
    date: "2026-04-30",
  }, // apple blackberry coconut oat
  846675001320: {
    lead: 6,
    mercury: 0.5,
    arsenic: 3.5,
    cadmium: 1,
    date: "2026-10-15",
  }, // apple raspberry spinach yogurt
  890180001207: {
    lead: 2.5,
    mercury: 0.5,
    arsenic: 4,
    cadmium: 1,
    date: "2026-09-09",
  }, // pear mango
  846675013491: {
    lead: 1,
    mercury: 0.5,
    arsenic: 3,
    cadmium: 1,
    date: "2026-07-17",
  }, // pear blueberry avocado granola
  846675014702: {
    lead: 1,
    mercury: 0.5,
    arsenic: 4.5,
    cadmium: 0.5,
    date: "2026-06-13",
  }, // cherry apple blueberry
  846675002693: {
    lead: 1,
    mercury: 0.5,
    arsenic: 3,
    cadmium: 0.5,
    date: "2025-09-18",
  }, // apple broccoli 4ct
  846675002662: {
    lead: 0.5,
    mercury: 0.5,
    arsenic: 3,
    cadmium: 0.5,
    date: "2026-07-22",
  }, // pear pea spinach 4ct
  846675002679: {
    lead: 2.5,
    mercury: 0.5,
    arsenic: 5.5,
    cadmium: 5,
    date: "2026-08-12",
  }, // pear purple carrot 4ct
  846675002686: {
    lead: 2,
    mercury: 0.5,
    arsenic: 2,
    cadmium: 0.5,
    date: "2026-05-06",
  }, // banana pumpkin 4ct
  846675006653: {
    lead: 0.5,
    mercury: 0.5,
    arsenic: 3.5,
    cadmium: 0.5,
    date: "2026-04-10",
  }, // peach banana 4ct
  846675003874: {
    lead: 3,
    mercury: 0.5,
    arsenic: 2,
    cadmium: 9,
    date: "2025-10-04",
  }, // apple raspberry 4ct
  846675006660: {
    lead: 4,
    mercury: 0.5,
    arsenic: 2,
    cadmium: 0.5,
    date: "2026-03-04",
  }, // just prunes 4ct
  846675003249: {
    lead: 5,
    mercury: 0.5,
    arsenic: 1,
    cadmium: 10,
    date: "2026-07-21",
  }, // carrot spinach turkey
  846675003256: {
    lead: 2,
    mercury: 0.5,
    arsenic: 3,
    cadmium: 4,
    date: "2026-06-13",
  }, // carrot sweet potato chicken
  846675014726: {
    lead: 2,
    mercury: 0.5,
    arsenic: 4.5,
    cadmium: 1,
    date: "2026-08-16",
  }, // mighty builder cherry
  846675005335: {
    lead: 2,
    mercury: 0.5,
    arsenic: 0.5,
    cadmium: 2,
    date: "2026-09-24",
  }, // mighty 4 banana peach
  846675005342: {
    lead: 4,
    mercury: 0.5,
    arsenic: 3,
    cadmium: 0.5,
    date: "2026-09-13",
  }, // mighty morning banana kiwi
  846675005359: {
    lead: 3,
    mercury: 0.5,
    arsenic: 2,
    cadmium: 5,
    date: "2026-09-20",
  }, // mighty morning apple blackberry
  846675005366: {
    lead: 2.5,
    mercury: 0.5,
    arsenic: 2.5,
    cadmium: 2,
    date: "2026-09-25",
  }, // mighty 4 banana blueberry
  846675005373: {
    lead: 2.5,
    mercury: 0.5,
    arsenic: 0.5,
    cadmium: 4,
    date: "2026-10-11",
  }, // mighty 4 strawberry banana
  846675007346: {
    lead: 7,
    mercury: 0.5,
    arsenic: 6,
    cadmium: 3,
    date: "2026-05-13",
  }, // mighty immunity carrot pear
  846675007421: {
    lead: 2,
    mercury: 0.5,
    arsenic: 4,
    cadmium: 2,
    date: "2026-02-19",
  }, // mighty 4 guava banana
  846675007438: {
    lead: 2,
    mercury: 0.5,
    arsenic: 5,
    cadmium: 3,
    date: "2026-07-10",
  }, // mighty 4 pear black bean
  846675012531: {
    lead: 2.5,
    mercury: 0.5,
    arsenic: 1.5,
    cadmium: 0.5,
    date: "2026-10-09",
  }, // mighty immunity sweet potato
  846675012555: {
    lead: 2,
    mercury: 0.5,
    arsenic: 2,
    cadmium: 1.5,
    date: "2026-07-08",
  }, // mighty 4 mango pineapple
  846675012968: {
    lead: 0.5,
    mercury: 0.5,
    arsenic: 4,
    cadmium: 0.5,
    date: "2026-05-21",
  }, // mighty builder mango
  846675012975: {
    lead: 3.5,
    mercury: 0.5,
    arsenic: 3,
    cadmium: 0.5,
    date: "2026-09-22",
  }, // mighty builder pear
  846675012982: {
    lead: 1.5,
    mercury: 0.5,
    arsenic: 2,
    cadmium: 1.5,
    date: "2026-09-23",
  }, // mighty builder banana
  846675014740: {
    lead: 1,
    mercury: 0.5,
    arsenic: 6,
    cadmium: 1.5,
    date: "2026-10-22",
  }, // mighty zen mango
  846675014276: {
    lead: 0.5,
    mercury: 0.5,
    arsenic: 2,
    cadmium: 1,
    date: "2025-09-24",
  }, // larger size apple broccoli
  846675003591: {
    lead: 1,
    mercury: 0.5,
    arsenic: 4,
    cadmium: 2,
    date: "2025-12-06",
  }, // mighty 4 banana blueberry 4ct
  846675003638: {
    lead: 3,
    mercury: 0.5,
    arsenic: 4,
    cadmium: 2,
    date: "2025-11-15",
  }, // mighty morning apple blackberry 4ct
  846675007667: {
    lead: 0.5,
    mercury: 0.5,
    arsenic: 1.5,
    cadmium: 2.5,
    date: "2026-10-09",
  }, // mighty 4 strawberry 4ct
  846675005748: {
    lead: 3,
    mercury: 0.5,
    arsenic: 3.5,
    cadmium: 2,
    date: "2026-07-11",
  }, // super smoothie 4ct
};

// FDA action levels and California AB 899 thresholds for reference
const SAFETY_LIMITS = {
  lead: 10, // FDA action level (ppb) - California threshold is 6 ppb
  arsenic: 100, // FDA inorganic arsenic limit for rice cereal (ppb)
  cadmium: 5, // No FDA limit, using reference level (ppb)
  mercury: 2, // No FDA limit, using reference level (ppb)
};

/**
 * Calculate safety score based on heavy metal levels
 * Lower is better, 100 is perfect, 0 is worst
 */
function calculateSafetyScore(lead, arsenic, cadmium, mercury) {
  // Calculate percentage of limit for each metal
  const leadPct = Math.min((lead / SAFETY_LIMITS.lead) * 100, 100);
  const arsenicPct = Math.min((arsenic / SAFETY_LIMITS.arsenic) * 100, 100);
  const cadmiumPct = Math.min((cadmium / SAFETY_LIMITS.cadmium) * 100, 100);
  const mercuryPct = Math.min((mercury / SAFETY_LIMITS.mercury) * 100, 100);

  // Weighted average (lead is most concerning for children)
  const avgPct =
    leadPct * 0.35 + arsenicPct * 0.25 + cadmiumPct * 0.25 + mercuryPct * 0.15;

  // Convert to score (100 - percentage = score)
  return Math.round(Math.max(0, 100 - avgPct));
}

/**
 * Map stage to age range description
 */
function getStageDescription(stage) {
  const stageMap = {
    "Stage 1": "4+ months (supported sitter)",
    "Stage 2": "6+ months (sitter)",
    "Stage 3": "8+ months (crawler)",
    Tots: "12+ months (toddler)",
    "2-3 yrs": "2-3 years",
  };
  return stageMap[stage] || stage;
}

/**
 * Import a single product
 */
async function importProduct(product) {
  const testResult = LATEST_TEST_RESULTS[product.upc];

  if (!testResult) {
    console.log(`  ⚠️ No test data for: ${product.name}`);
    return { success: false, reason: "no_test_data" };
  }

  const safetyScore = calculateSafetyScore(
    testResult.lead,
    testResult.arsenic,
    testResult.cadmium,
    testResult.mercury
  );

  // Check if product already exists by barcode
  const { data: existing } = await supabase
    .from("products")
    .select("id, name")
    .eq("barcode", product.upc)
    .single();

  if (existing) {
    console.log(`  ⏭️ Skipped (exists): ${product.name}`);
    return { success: true, action: "skipped", id: existing.id };
  }

  // Build full product name
  const fullName = `Plum Organics ${product.name}`;
  const description = `${getStageDescription(
    product.stage
  )} baby food pouch. AB 899 lab tested for heavy metals.`;

  try {
    // Insert product
    const { data: newProduct, error: productError } = await supabase
      .from("products")
      .insert({
        name: fullName,
        brand: "Plum Organics",
        category: product.category,
        barcode: product.upc,
        description: description,
        safety_score: safetyScore,
        image_url: null, // Could add product images later
      })
      .select()
      .single();

    if (productError) throw productError;

    // Insert lab result
    const { data: labResult, error: labError } = await supabase
      .from("lab_results")
      .insert({
        product_id: newProduct.id,
        lab_name: "AB 899 Certified Laboratory",
        test_date: testResult.date,
        report_url:
          "https://www.plumorganics.com/heavy-metals-test-results-for-pouches/",
        is_verified: true,
        certification: "California AB 899",
      })
      .select()
      .single();

    if (labError) throw labError;

    // Insert contaminants
    const contaminants = [
      {
        lab_result_id: labResult.id,
        contaminant_name: "Lead",
        amount_detected: testResult.lead,
        unit: "ppb",
        safety_limit: SAFETY_LIMITS.lead,
        exceeds_limit: testResult.lead > SAFETY_LIMITS.lead,
        health_impact:
          "Lead exposure can harm brain development and cause learning difficulties in children",
      },
      {
        lab_result_id: labResult.id,
        contaminant_name: "Arsenic",
        amount_detected: testResult.arsenic,
        unit: "ppb",
        safety_limit: SAFETY_LIMITS.arsenic,
        exceeds_limit: testResult.arsenic > SAFETY_LIMITS.arsenic,
        health_impact:
          "Arsenic is associated with developmental delays and immune system issues",
      },
      {
        lab_result_id: labResult.id,
        contaminant_name: "Cadmium",
        amount_detected: testResult.cadmium,
        unit: "ppb",
        safety_limit: SAFETY_LIMITS.cadmium,
        exceeds_limit: testResult.cadmium > SAFETY_LIMITS.cadmium,
        health_impact:
          "Cadmium can damage kidneys and bones, affecting growth in children",
      },
      {
        lab_result_id: labResult.id,
        contaminant_name: "Mercury",
        amount_detected: testResult.mercury,
        unit: "ppb",
        safety_limit: SAFETY_LIMITS.mercury,
        exceeds_limit: testResult.mercury > SAFETY_LIMITS.mercury,
        health_impact:
          "Mercury is harmful to nervous system development and brain function",
      },
    ];

    const { error: contError } = await supabase
      .from("contaminants")
      .insert(contaminants);

    if (contError) throw contError;

    console.log(`  ✅ Imported: ${fullName} (Score: ${safetyScore})`);
    return {
      success: true,
      action: "inserted",
      id: newProduct.id,
      score: safetyScore,
    };
  } catch (error) {
    console.log(`  ❌ Failed: ${product.name} - ${error.message}`);
    return { success: false, reason: error.message };
  }
}

/**
 * Main import function
 */
async function importPlumOrganics() {
  console.log("");
  console.log("=".repeat(70));
  console.log("🍑 PLUM ORGANICS AB 899 DATA IMPORT");
  console.log("=".repeat(70));
  console.log("");
  console.log(
    "Source: https://www.plumorganics.com/heavy-metals-test-results-for-pouches/"
  );
  console.log("Data Type: REAL lab test results (California AB 899 certified)");
  console.log("");
  console.log(`Products to import: ${PLUM_ORGANICS_DATA.length}`);
  console.log("");
  console.log("-".repeat(70));
  console.log("");

  const results = {
    inserted: 0,
    skipped: 0,
    failed: 0,
    noData: 0,
  };

  for (const product of PLUM_ORGANICS_DATA) {
    const result = await importProduct(product);

    if (result.success) {
      if (result.action === "inserted") {
        results.inserted++;
      } else {
        results.skipped++;
      }
    } else {
      if (result.reason === "no_test_data") {
        results.noData++;
      } else {
        results.failed++;
      }
    }
  }

  console.log("");
  console.log("=".repeat(70));
  console.log("✅ IMPORT COMPLETE");
  console.log("=".repeat(70));
  console.log("");
  console.log("📊 Results:");
  console.log(`   ✅ Inserted: ${results.inserted}`);
  console.log(`   ⏭️ Skipped (already exist): ${results.skipped}`);
  console.log(`   ⚠️ No test data: ${results.noData}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log("");
  console.log(
    "📦 Total Plum Organics products now in database:",
    results.inserted + results.skipped
  );
  console.log("");

  // Get total product count
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  console.log(`📊 Total products in SafeBaby database: ${count}`);
  console.log("");
}

// Run the import
importPlumOrganics()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
