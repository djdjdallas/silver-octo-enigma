// SafeBaby Database Audit Script
// Identifies real vs estimated/generated product data
// Run with: node scripts/audit-database.js

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("\n❌ ERROR: Missing Supabase credentials");
  console.error("Make sure .env.local contains:");
  console.error("  NEXT_PUBLIC_SUPABASE_URL=your_url");
  console.error("  SUPABASE_SERVICE_ROLE_KEY=your_key\n");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Known REAL HBBF 2019 products (these have verified lab data)
// These are the only products with Level 1 verified data from the original seed
const VERIFIED_HBBF_PRODUCTS = [
  "Gerber Rice Single Grain Cereal",
  "Beech-Nut Rice Single Grain Baby Cereal",
  "Parent's Choice Rice Baby Cereal",
  "Earth's Best Organic Whole Grain Rice Cereal",
  "Happy Baby Oatmeal Baby Cereal",
  "Gerber 2nd Foods Sweet Potato",
  "Beech-Nut Classics Sweet Potato",
  "Earth's Best Organic Sweet Potato",
  "Plum Organics Stage 1 Sweet Potato",
  "Gerber Organic 1st Foods Carrots",
  "Gerber 1st Foods Apple",
  "Beech-Nut Stage 1 Banana",
  "Happy Baby Clearly Crafted Pears",
  "Earth's Best Organic Banana",
  "Gerber Oatmeal Single Grain Cereal",
  "Gerber Puffs Banana",
  "Happy Baby Superfood Puffs Apple",
  "Gerber Arrowroot Cookies",
  "Beech-Nut Teething Wafers Banana",
  "Gerber 100% Apple Juice",
  "Beech-Nut Apple Juice",
  "Earth's Best Organic Apple Juice",
];

// Patterns that indicate generated/fake data
const GENERATED_PATTERNS = {
  // Fake barcode patterns (generated barcodes often follow patterns)
  suspiciousBarcodes: [
    /^0150000\d{5}$/, // Gerber-like but sequential
    /^0528004\d{5}$/, // Beech-Nut-like but sequential
    /^8526970\d{5}$/, // Happy Baby-like but sequential
  ],

  // Lab names that indicate generated data
  generatedLabNames: [
    "SafeBaby Testing",
    "Generated",
    "Estimated",
    "Internal Testing",
    "Algorithm Generated",
  ],

  // Round numbers often indicate estimates
  suspiciouslyRoundValues: (value) => {
    return value === Math.round(value) && value > 0;
  },
};

async function auditDatabase() {
  console.log("\n" + "=".repeat(70));
  console.log("🔍 SAFEBABY DATABASE AUDIT REPORT");
  console.log("=".repeat(70));
  console.log(`\nAudit started: ${new Date().toISOString()}\n`);

  // Fetch all products with their lab results and contaminants
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .order("brand", { ascending: true });

  if (productsError) {
    console.error("❌ Error fetching products:", productsError);
    process.exit(1);
  }

  console.log(`📦 Total Products in Database: ${products.length}\n`);

  // Fetch all lab results
  const { data: labResults, error: labError } = await supabase
    .from("lab_results")
    .select("*, contaminants(*)");

  if (labError) {
    console.error("❌ Error fetching lab results:", labError);
    process.exit(1);
  }

  // Create lookup map for lab results by product_id
  const labResultsByProduct = {};
  labResults.forEach((lr) => {
    labResultsByProduct[lr.product_id] = lr;
  });

  // Categorize products
  const verified = [];
  const estimated = [];
  const noData = [];
  const suspicious = [];

  for (const product of products) {
    const labResult = labResultsByProduct[product.id];
    const isKnownVerified = VERIFIED_HBBF_PRODUCTS.some(
      (name) =>
        product.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(product.name.toLowerCase())
    );

    // Check for verification indicators
    const hasLabResult = !!labResult;
    const labName = labResult?.lab_name || "";
    const hasVerifiedLabName =
      labName.includes("HBBF") ||
      labName.includes("Consumer Reports") ||
      labName.includes("FDA") ||
      labName.includes("Clean Label");

    // Check for generated indicators
    const hasGeneratedLabName = GENERATED_PATTERNS.generatedLabNames.some(
      (name) => labName.toLowerCase().includes(name.toLowerCase())
    );

    // Check contaminant values for suspicious patterns
    const contaminants = labResult?.contaminants || [];
    const allRoundValues =
      contaminants.length > 0 &&
      contaminants.every(
        (c) => c.amount_detected === Math.round(c.amount_detected)
      );

    // Categorize
    if (isKnownVerified && hasLabResult) {
      verified.push({
        ...product,
        labResult,
        reason: "Known HBBF 2019 product",
      });
    } else if (hasVerifiedLabName) {
      verified.push({
        ...product,
        labResult,
        reason: `Verified lab: ${labName}`,
      });
    } else if (!hasLabResult) {
      noData.push({ ...product, reason: "No lab results" });
    } else if (hasGeneratedLabName) {
      estimated.push({
        ...product,
        labResult,
        reason: `Generated lab name: ${labName}`,
      });
    } else if (allRoundValues && contaminants.length >= 4) {
      suspicious.push({
        ...product,
        labResult,
        reason: "All round numbers (likely estimated)",
      });
    } else {
      // Default to estimated if we can't verify
      estimated.push({ ...product, labResult, reason: "Unverified source" });
    }
  }

  // Move suspicious to estimated
  estimated.push(...suspicious);

  // Print Summary
  console.log("-".repeat(70));
  console.log("📊 DATA QUALITY BREAKDOWN");
  console.log("-".repeat(70));

  const verifiedPct = ((verified.length / products.length) * 100).toFixed(1);
  const estimatedPct = ((estimated.length / products.length) * 100).toFixed(1);
  const noDataPct = ((noData.length / products.length) * 100).toFixed(1);

  console.log(
    `\n✅ VERIFIED LAB DATA:     ${verified.length
      .toString()
      .padStart(4)} products (${verifiedPct}%)`
  );
  console.log(
    `⚠️  ESTIMATED/GENERATED:   ${estimated.length
      .toString()
      .padStart(4)} products (${estimatedPct}%)`
  );
  console.log(
    `❌ NO DATA:               ${noData.length
      .toString()
      .padStart(4)} products (${noDataPct}%)`
  );

  // Brand breakdown
  console.log("\n" + "-".repeat(70));
  console.log("🏷️  BY BRAND");
  console.log("-".repeat(70));

  const brandStats = {};
  products.forEach((p) => {
    const brand = p.brand || "Unknown";
    if (!brandStats[brand]) {
      brandStats[brand] = { total: 0, verified: 0, estimated: 0, noData: 0 };
    }
    brandStats[brand].total++;
  });

  verified.forEach((p) => {
    const brand = p.brand || "Unknown";
    brandStats[brand].verified++;
  });

  estimated.forEach((p) => {
    const brand = p.brand || "Unknown";
    brandStats[brand].estimated++;
  });

  noData.forEach((p) => {
    const brand = p.brand || "Unknown";
    brandStats[brand].noData++;
  });

  // Sort by total products
  const sortedBrands = Object.entries(brandStats).sort(
    (a, b) => b[1].total - a[1].total
  );

  console.log(
    "\nBrand                    Total   Verified   Estimated   No Data"
  );
  console.log("-".repeat(70));

  for (const [brand, stats] of sortedBrands) {
    const brandName = brand.padEnd(24).substring(0, 24);
    const total = stats.total.toString().padStart(5);
    const ver = stats.verified.toString().padStart(10);
    const est = stats.estimated.toString().padStart(11);
    const no = stats.noData.toString().padStart(9);
    console.log(`${brandName} ${total} ${ver} ${est} ${no}`);
  }

  // Category breakdown
  console.log("\n" + "-".repeat(70));
  console.log("📁 BY CATEGORY");
  console.log("-".repeat(70));

  const categoryStats = {};
  products.forEach((p) => {
    const cat = p.category || "unknown";
    if (!categoryStats[cat]) {
      categoryStats[cat] = { total: 0, verified: 0, estimated: 0 };
    }
    categoryStats[cat].total++;
  });

  verified.forEach((p) => {
    const cat = p.category || "unknown";
    categoryStats[cat].verified++;
  });

  estimated.forEach((p) => {
    const cat = p.category || "unknown";
    categoryStats[cat].estimated++;
  });

  console.log("\nCategory       Total   Verified   Estimated");
  console.log("-".repeat(50));

  for (const [cat, stats] of Object.entries(categoryStats).sort(
    (a, b) => b[1].total - a[1].total
  )) {
    const catName = cat.padEnd(14);
    const total = stats.total.toString().padStart(5);
    const ver = stats.verified.toString().padStart(10);
    const est = stats.estimated.toString().padStart(11);
    console.log(`${catName} ${total} ${ver} ${est}`);
  }

  // Lab sources
  console.log("\n" + "-".repeat(70));
  console.log("🔬 BY LAB/DATA SOURCE");
  console.log("-".repeat(70));

  const labStats = {};
  labResults.forEach((lr) => {
    const lab = lr.lab_name || "Unknown";
    if (!labStats[lab]) {
      labStats[lab] = 0;
    }
    labStats[lab]++;
  });

  console.log("\nLab/Source                              Products");
  console.log("-".repeat(50));

  for (const [lab, count] of Object.entries(labStats).sort((a, b) => b - a)) {
    const labName = lab.padEnd(40).substring(0, 40);
    console.log(`${labName} ${count.toString().padStart(5)}`);
  }

  // List verified products
  console.log("\n" + "-".repeat(70));
  console.log("✅ VERIFIED PRODUCTS (Real Lab Data)");
  console.log("-".repeat(70));

  if (verified.length === 0) {
    console.log("\n⚠️  NO VERIFIED PRODUCTS FOUND!");
  } else {
    console.log(
      `\nFound ${verified.length} products with verified lab data:\n`
    );
    verified.slice(0, 30).forEach((p, i) => {
      console.log(`${(i + 1).toString().padStart(3)}. ${p.brand} - ${p.name}`);
      console.log(`      Reason: ${p.reason}`);
    });
    if (verified.length > 30) {
      console.log(`\n... and ${verified.length - 30} more verified products`);
    }
  }

  // Sample of estimated products
  console.log("\n" + "-".repeat(70));
  console.log("⚠️  SAMPLE OF ESTIMATED/GENERATED PRODUCTS");
  console.log("-".repeat(70));

  if (estimated.length > 0) {
    console.log(
      `\nShowing first 20 of ${estimated.length} estimated products:\n`
    );
    estimated.slice(0, 20).forEach((p, i) => {
      console.log(`${(i + 1).toString().padStart(3)}. ${p.brand} - ${p.name}`);
      console.log(`      Reason: ${p.reason}`);
    });
  }

  // Recommendations
  console.log("\n" + "=".repeat(70));
  console.log("📋 RECOMMENDATIONS");
  console.log("=".repeat(70));

  console.log(`
CRITICAL ISSUES:
`);

  if (estimated.length > verified.length) {
    console.log(`❌ ${estimatedPct}% of your products have ESTIMATED data`);
    console.log(`   This is a trust/liability issue for a safety app.`);
  }

  if (verified.length < 50) {
    console.log(`❌ Only ${verified.length} products have verified lab data`);
    console.log(`   You need at least 150+ verified products for credibility.`);
  }

  console.log(`
IMMEDIATE ACTIONS:

1. OPTION A - Clean Slate:
   Delete all estimated products and start fresh with only verified data.
   
   SQL: DELETE FROM products WHERE id NOT IN (
     SELECT id FROM products WHERE name IN (${VERIFIED_HBBF_PRODUCTS.map(
       (n) => `'${n}'`
     ).join(", ")})
   );

2. OPTION B - Add Data Quality Column:
   Mark all products with their data quality level so users know what's verified.
   
   SQL: ALTER TABLE products ADD COLUMN data_quality text;
   UPDATE products SET data_quality = 'estimated' WHERE ...;

3. OPTION C - Replace with Real Data:
   Extract HBBF PDF (168 products) and import to replace estimates.
   This gives you ~170 products with Level 1 verified data.

4. LONG TERM:
   - Add AB 899 manufacturer disclosures (Level 2 data)
   - Only show verified products in search results
   - Display "Verified" badge on products with real lab data
   - Be transparent about data sources
`);

  console.log("=".repeat(70));
  console.log("Audit completed: " + new Date().toISOString());
  console.log("=".repeat(70) + "\n");

  // Return stats for programmatic use
  return {
    total: products.length,
    verified: verified.length,
    estimated: estimated.length,
    noData: noData.length,
    verifiedProducts: verified,
    estimatedProducts: estimated,
  };
}

// Run audit
auditDatabase()
  .then((stats) => {
    console.log("\n📊 Quick Stats:");
    console.log(`   Total: ${stats.total}`);
    console.log(
      `   Verified: ${stats.verified} (${(
        (stats.verified / stats.total) *
        100
      ).toFixed(1)}%)`
    );
    console.log(
      `   Estimated: ${stats.estimated} (${(
        (stats.estimated / stats.total) *
        100
      ).toFixed(1)}%)`
    );
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Audit failed:", error);
    process.exit(1);
  });
