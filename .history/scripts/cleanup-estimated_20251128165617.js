// SafeBaby Database Cleanup Script
// Removes estimated/generated products, keeps only verified data
// Run with: node scripts/cleanup-estimated.js

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("\n❌ Missing Supabase credentials in .env.local\n");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ONLY these products have verified HBBF 2019 lab data
const VERIFIED_PRODUCT_NAMES = [
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

async function confirmAction(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "yes" || answer.toLowerCase() === "y");
    });
  });
}

async function cleanupDatabase() {
  console.log("\n" + "=".repeat(70));
  console.log("🧹 SAFEBABY DATABASE CLEANUP");
  console.log("=".repeat(70));

  // Get current counts
  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  console.log(`\n📦 Current products in database: ${totalProducts}`);
  console.log(`✅ Verified products to keep: ${VERIFIED_PRODUCT_NAMES.length}`);
  console.log(
    `🗑️  Products to delete: ~${totalProducts - VERIFIED_PRODUCT_NAMES.length}`
  );

  // Find verified product IDs
  const { data: verifiedProducts, error: findError } = await supabase
    .from("products")
    .select("id, name, brand")
    .or(VERIFIED_PRODUCT_NAMES.map((name) => `name.ilike.%${name}%`).join(","));

  if (findError) {
    console.error("❌ Error finding verified products:", findError);
    process.exit(1);
  }

  console.log(
    `\n✅ Found ${verifiedProducts.length} verified products to keep:\n`
  );
  verifiedProducts.forEach((p, i) => {
    console.log(`   ${i + 1}. ${p.brand} - ${p.name}`);
  });

  const verifiedIds = verifiedProducts.map((p) => p.id);

  console.log("\n" + "⚠️".repeat(35));
  console.log(
    "\n⚠️  WARNING: This will PERMANENTLY DELETE all other products!"
  );
  console.log("⚠️  This includes:");
  console.log("   - All generated/estimated products");
  console.log("   - Their lab results");
  console.log("   - Their contaminant records");
  console.log("   - User favorites referencing them");
  console.log("   - Recently viewed referencing them");
  console.log("\n" + "⚠️".repeat(35));

  const confirmed = await confirmAction(
    '\nType "yes" to proceed with deletion: '
  );

  if (!confirmed) {
    console.log("\n❌ Cleanup cancelled. No changes made.\n");
    process.exit(0);
  }

  console.log("\n🔄 Starting cleanup...\n");

  // Step 1: Delete user_favorites for non-verified products
  console.log("1/6 Deleting user favorites for estimated products...");
  const { error: favError } = await supabase
    .from("user_favorites")
    .delete()
    .not("product_id", "in", `(${verifiedIds.join(",")})`);

  if (favError && favError.code !== "PGRST116") {
    console.log("   ⚠️  Warning:", favError.message);
  } else {
    console.log("   ✅ Done");
  }

  // Step 2: Delete recently_viewed for non-verified products
  console.log("2/6 Deleting recently viewed for estimated products...");
  const { error: viewError } = await supabase
    .from("recently_viewed")
    .delete()
    .not("product_id", "in", `(${verifiedIds.join(",")})`);

  if (viewError && viewError.code !== "PGRST116") {
    console.log("   ⚠️  Warning:", viewError.message);
  } else {
    console.log("   ✅ Done");
  }

  // Step 3: Get lab_result IDs for non-verified products
  console.log("3/6 Finding lab results to delete...");
  const { data: labResultsToDelete } = await supabase
    .from("lab_results")
    .select("id")
    .not("product_id", "in", `(${verifiedIds.join(",")})`);

  const labResultIds = labResultsToDelete?.map((lr) => lr.id) || [];
  console.log(`   Found ${labResultIds.length} lab results to delete`);

  // Step 4: Delete contaminants for those lab results
  if (labResultIds.length > 0) {
    console.log("4/6 Deleting contaminants...");

    // Delete in batches to avoid query size limits
    const batchSize = 100;
    for (let i = 0; i < labResultIds.length; i += batchSize) {
      const batch = labResultIds.slice(i, i + batchSize);
      const { error: contError } = await supabase
        .from("contaminants")
        .delete()
        .in("lab_result_id", batch);

      if (contError) {
        console.log(
          `   ⚠️  Warning on batch ${i / batchSize + 1}:`,
          contError.message
        );
      }
    }
    console.log("   ✅ Done");

    // Step 5: Delete lab results
    console.log("5/6 Deleting lab results...");
    for (let i = 0; i < labResultIds.length; i += batchSize) {
      const batch = labResultIds.slice(i, i + batchSize);
      const { error: labError } = await supabase
        .from("lab_results")
        .delete()
        .in("id", batch);

      if (labError) {
        console.log(
          `   ⚠️  Warning on batch ${i / batchSize + 1}:`,
          labError.message
        );
      }
    }
    console.log("   ✅ Done");
  } else {
    console.log("4/6 No contaminants to delete");
    console.log("5/6 No lab results to delete");
  }

  // Step 6: Delete non-verified products
  console.log("6/6 Deleting estimated products...");
  const { error: prodError, count: deletedCount } = await supabase
    .from("products")
    .delete({ count: "exact" })
    .not("id", "in", `(${verifiedIds.join(",")})`);

  if (prodError) {
    console.error("   ❌ Error:", prodError);
  } else {
    console.log(`   ✅ Deleted ${deletedCount} products`);
  }

  // Final count
  const { count: finalCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  console.log("\n" + "=".repeat(70));
  console.log("✅ CLEANUP COMPLETE");
  console.log("=".repeat(70));
  console.log(`\n📦 Products remaining: ${finalCount}`);
  console.log(`🎯 All remaining products have VERIFIED lab data\n`);

  console.log("NEXT STEPS:");
  console.log("1. Extract HBBF PDF data (168 products)");
  console.log("2. Import with: npm run db:import data/hbbf-2019.csv");
  console.log("3. This will give you ~170 verified products\n");
}

cleanupDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Cleanup failed:", error);
    process.exit(1);
  });
