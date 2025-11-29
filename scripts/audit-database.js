// SafeBaby Database Audit Script
// Identifies real vs estimated/generated product data
// Run with: node scripts/audit-database.js

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

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

async function auditDatabase() {
  console.log("\n" + "=".repeat(70));
  console.log("🔍 SAFEBABY DATABASE AUDIT REPORT");
  console.log("=".repeat(70));
  console.log(`\nAudit started: ${new Date().toISOString()}\n`);

  // Fetch all products
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .order("brand", { ascending: true });

  if (productsError) {
    console.error("❌ Error fetching products:", productsError);
    process.exit(1);
  }

  console.log(`📦 Total Products in Database: ${products.length}\n`);

  // Fetch all lab results with contaminants
  const { data: labResults, error: labError } = await supabase
    .from("lab_results")
    .select("*, contaminants(*)");

  if (labError) {
    console.error("❌ Error fetching lab results:", labError);
    process.exit(1);
  }

  // Create lookup map
  const labResultsByProduct = {};
  labResults.forEach((lr) => {
    labResultsByProduct[lr.product_id] = lr;
  });

  // Categorize products
  const verified = [];
  const estimated = [];
  const noData = [];

  for (const product of products) {
    const labResult = labResultsByProduct[product.id];

    // Check if it's a known verified product
    const isKnownVerified = VERIFIED_HBBF_PRODUCTS.some(
      (name) =>
        product.name &&
        name &&
        (product.name.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(product.name.toLowerCase()))
    );

    const hasLabResult = !!labResult;
    const labName = labResult?.lab_name || "";

    // Check for verified lab sources
    const hasVerifiedLabName =
      labName.toLowerCase().includes("hbbf") ||
      labName.toLowerCase().includes("consumer reports") ||
      labName.toLowerCase().includes("fda") ||
      labName.toLowerCase().includes("clean label") ||
      labName.toLowerCase().includes("healthy babies bright futures");

    // Categorize
    if (isKnownVerified || hasVerifiedLabName) {
      verified.push({
        ...product,
        labResult,
        reason: isKnownVerified
          ? "Known HBBF 2019 product"
          : `Verified lab: ${labName}`,
      });
    } else if (!hasLabResult) {
      noData.push({ ...product, reason: "No lab results" });
    } else {
      estimated.push({
        ...product,
        labResult,
        reason: `Unverified source: ${labName || "Unknown"}`,
      });
    }
  }

  // Print Summary
  console.log("-".repeat(70));
  console.log("📊 DATA QUALITY BREAKDOWN");
  console.log("-".repeat(70));

  const total = products.length || 1;
  const verifiedPct = ((verified.length / total) * 100).toFixed(1);
  const estimatedPct = ((estimated.length / total) * 100).toFixed(1);
  const noDataPct = ((noData.length / total) * 100).toFixed(1);

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
    if (brandStats[brand]) brandStats[brand].verified++;
  });

  estimated.forEach((p) => {
    const brand = p.brand || "Unknown";
    if (brandStats[brand]) brandStats[brand].estimated++;
  });

  noData.forEach((p) => {
    const brand = p.brand || "Unknown";
    if (brandStats[brand]) brandStats[brand].noData++;
  });

  const sortedBrands = Object.entries(brandStats).sort(
    (a, b) => b[1].total - a[1].total
  );

  console.log(
    "\nBrand                    Total   Verified   Estimated   No Data"
  );
  console.log("-".repeat(70));

  for (const [brand, stats] of sortedBrands) {
    const brandName = brand.padEnd(24).substring(0, 24);
    const totalStr = stats.total.toString().padStart(5);
    const ver = stats.verified.toString().padStart(10);
    const est = stats.estimated.toString().padStart(11);
    const no = stats.noData.toString().padStart(9);
    console.log(`${brandName} ${totalStr} ${ver} ${est} ${no}`);
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
    if (categoryStats[cat]) categoryStats[cat].verified++;
  });

  estimated.forEach((p) => {
    const cat = p.category || "unknown";
    if (categoryStats[cat]) categoryStats[cat].estimated++;
  });

  console.log("\nCategory       Total   Verified   Estimated");
  console.log("-".repeat(50));

  const sortedCategories = Object.entries(categoryStats).sort(
    (a, b) => b[1].total - a[1].total
  );
  for (const [cat, stats] of sortedCategories) {
    const catName = cat.padEnd(14);
    const totalStr = stats.total.toString().padStart(5);
    const ver = stats.verified.toString().padStart(10);
    const est = stats.estimated.toString().padStart(11);
    console.log(`${catName} ${totalStr} ${ver} ${est}`);
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

  console.log("\nLab/Source                                        Products");
  console.log("-".repeat(60));

  const sortedLabs = Object.entries(labStats).sort((a, b) => b[1] - a[1]);
  for (const [lab, count] of sortedLabs) {
    const labName = lab.padEnd(50).substring(0, 50);
    console.log(`${labName} ${count.toString().padStart(5)}`);
  }

  // List verified products
  console.log("\n" + "-".repeat(70));
  console.log("✅ VERIFIED PRODUCTS (Real Lab Data)");
  console.log("-".repeat(70));

  if (verified.length === 0) {
    console.log("\n⚠️  NO VERIFIED PRODUCTS FOUND!");
    console.log("All products appear to have estimated/generated data.");
  } else {
    console.log(
      `\nFound ${verified.length} products with verified lab data:\n`
    );
    verified.forEach((p, i) => {
      console.log(`${(i + 1).toString().padStart(3)}. ${p.brand} - ${p.name}`);
    });
  }

  // Sample of estimated products
  console.log("\n" + "-".repeat(70));
  console.log("⚠️  SAMPLE OF ESTIMATED/GENERATED PRODUCTS (first 30)");
  console.log("-".repeat(70));

  if (estimated.length > 0) {
    console.log(
      `\nShowing first 30 of ${estimated.length} estimated products:\n`
    );
    estimated.slice(0, 30).forEach((p, i) => {
      const labName = p.labResult?.lab_name || "No lab";
      console.log(`${(i + 1).toString().padStart(3)}. ${p.brand} - ${p.name}`);
      console.log(`      Lab: ${labName}`);
    });
    if (estimated.length > 30) {
      console.log(`\n... and ${estimated.length - 30} more estimated products`);
    }
  }

  // Recommendations
  console.log("\n" + "=".repeat(70));
  console.log("📋 RECOMMENDATIONS");
  console.log("=".repeat(70));

  if (estimated.length > verified.length) {
    console.log(`
⚠️  CRITICAL: ${estimatedPct}% of your products have ESTIMATED data

This is a trust/liability issue for a baby food safety app.
Parents are relying on this data to make health decisions for their children.

RECOMMENDED ACTIONS:

1. CLEAN SLATE (Safest option):
   Run: node scripts/cleanup-estimated.js
   This will delete all estimated products and keep only verified ones.
   You'll have ${verified.length} verified products to start with.

2. ADD TRANSPARENCY:
   Add a 'data_quality' column to show users what's verified vs estimated.
   At minimum, don't market estimated data as "lab results."

3. REPLACE WITH REAL DATA:
   - Extract HBBF PDF (168 products with real lab data)
   - Import AB 899 manufacturer disclosures
   - Build up from legitimate sources only
`);
  } else {
    console.log(`
✅ Good news! Most of your products have verified data.

Consider:
- Adding more verified products from HBBF PDF
- Monitoring AB 899 manufacturer disclosures
- Adding data_quality column for transparency
`);
  }

  console.log("=".repeat(70));
  console.log("Audit completed: " + new Date().toISOString());
  console.log("=".repeat(70) + "\n");

  return {
    total: products.length,
    verified: verified.length,
    estimated: estimated.length,
    noData: noData.length,
  };
}

// Run audit
auditDatabase()
  .then((stats) => {
    console.log("📊 Summary:");
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
    console.log(`   No Data: ${stats.noData}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Audit failed:", error);
    process.exit(1);
  });
