// SafeBaby Database Cleanup Script
// Removes all estimated/generated products, keeps only verified HBBF data
// Run with: node scripts/cleanup-estimated.js

const { createClient } = require("@supabase/supabase-js");
const readline = require("readline");
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("\n❌ Missing Supabase credentials in .env.local\n");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Products to KEEP - these have verified HBBF lab data
const VERIFIED_PRODUCTS_TO_KEEP = [
  "Beech-Nut Rice Single Grain Baby Cereal",
  "Beech-Nut Classics Sweet Potato",
  "Beech-Nut Stage 1 Banana",
  "Beech-Nut Teething Wafers Banana",
  "Beech-Nut Apple Juice",
  "Beech-Nut Apple",
  "Earth's Best Organic Whole Grain Rice Cereal",
  "Earth's Best Organic Sweet Potato",
  "Earth's Best Organic Banana",
  "Earth's Best Organic Apple Juice",
  "Earth's Best Organic Apple",
  "Gerber 2nd Foods Sweet Potato",
  "Gerber Organic 1st Foods Carrots",
  "Gerber 1st Foods Apple",
  "Gerber Oatmeal Single Grain Cereal",
  "Gerber Puffs Banana",
  "Gerber Arrowroot Cookies",
  "Gerber Rice",
  "Gerber Oatmeal",
  "Gerber Rice Single Grain Cereal",
  "Gerber 100% Apple Juice",
  "Gerber Puffs",
  "Happy Baby Oatmeal Baby Cereal",
  "Happy Baby Clearly Crafted Pears",
  "Happy Baby Superfood Puffs Apple",
  "Parent's Choice Rice Baby Cereal",
  "Plum Organics Stage 1 Sweet Potato",
  "Plum Organics Stage 1 Sweet Potato Blend",
];

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().trim());
    });
  });
}

async function cleanupDatabase() {
  console.log("\n" + "=".repeat(70));
  console.log("🧹 SAFEBABY DATABASE CLEANUP");
  console.log("=".repeat(70));
  console.log("\nThis script will DELETE all estimated/generated products.");
  console.log("Only verified HBBF lab-tested products will be kept.\n");

  // Step 1: Find products to keep (verified ones)
  console.log("📋 Step 1: Identifying verified products to KEEP...\n");

  const { data: allProducts, error: fetchError } = await supabase
    .from("products")
    .select("id, name, brand");

  if (fetchError) {
    console.error("❌ Error fetching products:", fetchError);
    process.exit(1);
  }

  // Find verified product IDs
  const verifiedProducts = allProducts.filter((product) =>
    VERIFIED_PRODUCTS_TO_KEEP.some(
      (verifiedName) =>
        product.name.toLowerCase() === verifiedName.toLowerCase()
    )
  );

  const verifiedIds = verifiedProducts.map((p) => p.id);
  const productsToDelete = allProducts.filter(
    (p) => !verifiedIds.includes(p.id)
  );

  console.log(`   Total products in database: ${allProducts.length}`);
  console.log(`   ✅ Verified products to KEEP: ${verifiedProducts.length}`);
  console.log(`   🗑️  Products to DELETE: ${productsToDelete.length}`);

  console.log("\n   Products being KEPT:");
  verifiedProducts.forEach((p, i) => {
    console.log(`   ${(i + 1).toString().padStart(3)}. ${p.brand} - ${p.name}`);
  });

  // Step 2: Show what will be deleted
  console.log("\n" + "-".repeat(70));
  console.log("⚠️  WARNING: The following will be PERMANENTLY DELETED:");
  console.log("-".repeat(70));
  console.log(`\n   • ${productsToDelete.length} products`);
  console.log("   • All associated lab_results");
  console.log("   • All associated contaminants");
  console.log("   • All user_favorites for these products");
  console.log("   • All recently_viewed for these products");

  // Step 3: Ask for confirmation
  console.log("\n" + "⚠️".repeat(35));
  const answer = await askQuestion(
    '\n⚠️  Type "DELETE" to confirm deletion (or anything else to cancel): '
  );

  if (answer !== "delete") {
    console.log("\n❌ Cleanup CANCELLED. No changes were made.\n");
    process.exit(0);
  }

  console.log("\n🔄 Starting cleanup process...\n");

  // Step 4: Get IDs of products to delete
  const idsToDelete = productsToDelete.map((p) => p.id);

  if (idsToDelete.length === 0) {
    console.log("✅ No products to delete. Database is already clean.\n");
    process.exit(0);
  }

  // Step 5: Delete in correct order (respecting foreign keys)
  let deletedCounts = {
    userFavorites: 0,
    recentlyViewed: 0,
    contaminants: 0,
    labResults: 0,
    products: 0,
  };

  // 5a: Delete user_favorites
  console.log("   [1/5] Deleting user favorites...");
  const { error: favError, count: favCount } = await supabase
    .from("user_favorites")
    .delete({ count: "exact" })
    .in("product_id", idsToDelete);

  if (favError && !favError.message.includes("0 rows")) {
    console.log(`         ⚠️  Warning: ${favError.message}`);
  } else {
    deletedCounts.userFavorites = favCount || 0;
    console.log(`         ✅ Deleted ${deletedCounts.userFavorites} favorites`);
  }

  // 5b: Delete recently_viewed
  console.log("   [2/5] Deleting recently viewed...");
  const { error: viewError, count: viewCount } = await supabase
    .from("recently_viewed")
    .delete({ count: "exact" })
    .in("product_id", idsToDelete);

  if (viewError && !viewError.message.includes("0 rows")) {
    console.log(`         ⚠️  Warning: ${viewError.message}`);
  } else {
    deletedCounts.recentlyViewed = viewCount || 0;
    console.log(
      `         ✅ Deleted ${deletedCounts.recentlyViewed} recently viewed`
    );
  }

  // 5c: Get lab_result IDs for products being deleted
  console.log("   [3/5] Finding lab results to delete...");
  const { data: labResultsToDelete, error: labFetchError } = await supabase
    .from("lab_results")
    .select("id")
    .in("product_id", idsToDelete);

  if (labFetchError) {
    console.error("         ❌ Error finding lab results:", labFetchError);
  }

  const labResultIds = labResultsToDelete?.map((lr) => lr.id) || [];
  console.log(`         Found ${labResultIds.length} lab results to delete`);

  // 5d: Delete contaminants
  if (labResultIds.length > 0) {
    console.log("   [4/5] Deleting contaminants...");

    // Delete in batches to avoid query size limits
    const batchSize = 100;
    let totalContaminants = 0;

    for (let i = 0; i < labResultIds.length; i += batchSize) {
      const batch = labResultIds.slice(i, i + batchSize);
      const { error: contError, count: contCount } = await supabase
        .from("contaminants")
        .delete({ count: "exact" })
        .in("lab_result_id", batch);

      if (contError) {
        console.log(
          `         ⚠️  Batch ${Math.floor(i / batchSize) + 1} warning: ${
            contError.message
          }`
        );
      } else {
        totalContaminants += contCount || 0;
      }
    }
    deletedCounts.contaminants = totalContaminants;
    console.log(
      `         ✅ Deleted ${deletedCounts.contaminants} contaminants`
    );

    // 5e: Delete lab_results
    console.log("   [5/5] Deleting lab results and products...");

    for (let i = 0; i < labResultIds.length; i += batchSize) {
      const batch = labResultIds.slice(i, i + batchSize);
      const { error: labError, count: labCount } = await supabase
        .from("lab_results")
        .delete({ count: "exact" })
        .in("id", batch);

      if (labError) {
        console.log(
          `         ⚠️  Lab results batch warning: ${labError.message}`
        );
      } else {
        deletedCounts.labResults += labCount || 0;
      }
    }
    console.log(`         ✅ Deleted ${deletedCounts.labResults} lab results`);
  } else {
    console.log("   [4/5] No contaminants to delete");
    console.log("   [5/5] No lab results to delete");
  }

  // 5f: Delete products
  console.log("         Deleting products...");

  // Delete in batches
  const batchSize = 100;
  for (let i = 0; i < idsToDelete.length; i += batchSize) {
    const batch = idsToDelete.slice(i, i + batchSize);
    const { error: prodError, count: prodCount } = await supabase
      .from("products")
      .delete({ count: "exact" })
      .in("id", batch);

    if (prodError) {
      console.error(
        `         ❌ Error deleting products batch: ${prodError.message}`
      );
    } else {
      deletedCounts.products += prodCount || 0;
    }
  }
  console.log(`         ✅ Deleted ${deletedCounts.products} products`);

  // Step 6: Verify final state
  console.log("\n📋 Verifying final database state...\n");

  const { data: remainingProducts, error: verifyError } = await supabase
    .from("products")
    .select("id, name, brand")
    .order("brand");

  if (verifyError) {
    console.error("❌ Error verifying:", verifyError);
  }

  const { count: remainingLabResults } = await supabase
    .from("lab_results")
    .select("*", { count: "exact", head: true });

  const { count: remainingContaminants } = await supabase
    .from("contaminants")
    .select("*", { count: "exact", head: true });

  // Print summary
  console.log("=".repeat(70));
  console.log("✅ CLEANUP COMPLETE");
  console.log("=".repeat(70));

  console.log("\n📊 Deletion Summary:");
  console.log(`   • Products deleted: ${deletedCounts.products}`);
  console.log(`   • Lab results deleted: ${deletedCounts.labResults}`);
  console.log(`   • Contaminants deleted: ${deletedCounts.contaminants}`);
  console.log(`   • User favorites deleted: ${deletedCounts.userFavorites}`);
  console.log(`   • Recently viewed deleted: ${deletedCounts.recentlyViewed}`);

  console.log("\n📦 Remaining in Database:");
  console.log(`   • Products: ${remainingProducts?.length || 0}`);
  console.log(`   • Lab results: ${remainingLabResults || 0}`);
  console.log(`   • Contaminants: ${remainingContaminants || 0}`);

  if (remainingProducts && remainingProducts.length > 0) {
    console.log("\n✅ Verified Products Remaining:");
    remainingProducts.forEach((p, i) => {
      console.log(
        `   ${(i + 1).toString().padStart(3)}. ${p.brand} - ${p.name}`
      );
    });
  }

  console.log("\n" + "=".repeat(70));
  console.log("🎯 NEXT STEPS");
  console.log("=".repeat(70));
  console.log(`
1. Extract HBBF PDF data (168 products with real lab results)
   - Use the HBBF_PDF_EXTRACTION_PROMPT.md with Claude
   - Upload your PDF and get CSV output

2. Import the real data:
   node scripts/import-csv.js data/hbbf-2019.csv

3. You'll have ~170 products with VERIFIED lab data

4. Add AB 899 manufacturer disclosures as they become available
`);
  console.log("=".repeat(70) + "\n");
}

// Run cleanup
cleanupDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Cleanup failed:", error);
    process.exit(1);
  });
