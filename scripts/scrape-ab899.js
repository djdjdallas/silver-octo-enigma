// Web scraper for California AB 899 manufacturer disclosure sites
// California Assembly Bill 899 requires baby food manufacturers to disclose heavy metal test results
// Run with: node scripts/scrape-ab899.js

const { createClient } = require('@supabase/supabase-js');
const https = require('https');
const http = require('http');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Known manufacturer disclosure URLs - Updated November 2025
// AB 899 became effective January 1, 2025
// Reference: California Assembly Bill 899 requires baby food manufacturers to disclose heavy metal test results
//
// TIER SYSTEM:
// - TIER 1: Excellent transparency, scrapeable HTML/JSON
// - TIER 2: Moderate transparency, form-based or complex scraping
// - TIER 3: Poor transparency, QR codes or barriers (NOT SCRAPEABLE)
//
const MANUFACTURER_URLS = {
  // ============================================================
  // TIER 1: EXCELLENT TRANSPARENCY (Scrapeable)
  // ============================================================

  plum: {
    name: "Plum Organics",
    url: "https://www.plumorganics.com/heavy-metals-test-results-for-pouches/",
    tier: 1,
    enabled: false, // Use dedicated scrape-plum-organics.js instead
    format: "HTML table",
    products: "~45 unique products, 936+ batch results",
    dataFields: "Lead, Mercury, Arsenic, Cadmium (ppb)",
    hasUPC: true,
    notes: "BEST SOURCE - Use scrape-plum-organics.js for this",
    parser: parsePlumData
  },

  littlespoon: {
    name: "Little Spoon",
    url: "https://www.littlespoon.com/our-standards",
    tier: 1,
    enabled: false, // Form scraping script needed
    format: "Interactive dashboard per product",
    products: "50+ Babyblends",
    dataFields: "All 4 metals + 500+ other contaminants",
    hasUPC: false, // Need to verify
    notes: "EU-aligned strict standards. Manual scraping required.",
    parser: parseLittleSpoonData
  },

  earthsbest: {
    name: "Earth's Best Organic",
    url: "https://www.earthsbest.com/producttesting",
    tier: 1,
    enabled: false, // Form scraping script needed
    format: "HTML form-based lookup",
    products: "~40 products",
    dataFields: "All 4 metals with exact values (no '<' symbols)",
    hasUPC: false, // Need to verify
    notes: "Most accurate reporting - exact ppb values. Form scraping required.",
    parser: parseEarthsBestData
  },

  // ============================================================
  // TIER 2: MODERATE TRANSPARENCY (Complex scraping)
  // ============================================================

  gerber: {
    name: "Gerber Products Company",
    url: "https://www.gerber.com/tet",
    tier: 2,
    enabled: false, // Form scraping script needed
    format: "Searchable database",
    products: "136+ products",
    dataFields: "All 4 metals (some use '<X' format)",
    hasUPC: true, // Likely available
    notes: "Uses ambiguous '<' reporting. Form scraping required.",
    parser: parseGerberData
  },

  onceuponafarm: {
    name: "Once Upon a Farm",
    url: "https://onceuponafarmorganics.com/pages/our-standards",
    tier: 2,
    enabled: false, // Complex - lot code required
    format: "QR codes + lot number entry",
    products: "100+ products",
    dataFields: "All 4 metals",
    hasUPC: false, // Via lot number only
    notes: "Complex - requires lot code from physical product",
    parser: parseOnceUponAFarmData
  },

  // ============================================================
  // TIER 3: POOR TRANSPARENCY (NOT SCRAPEABLE)
  // ============================================================

  beechnut: {
    name: "Beech-Nut Nutrition Company",
    url: "https://www.beechnut.com",
    tier: 3,
    enabled: false, // NOT SCRAPEABLE
    format: "QR code required",
    products: "Unknown",
    dataFields: "Unknown",
    hasUPC: false,
    notes: "NOT SCRAPEABLE - Physical product + QR + codes + CAPTCHA required",
    parser: parseBeechNutData
  },

  happybaby: {
    name: "Happy Family Organics (Happy Baby)",
    url: "https://www.happyfamilyorganics.com",
    tier: 3,
    enabled: false, // NOT SCRAPEABLE - AB 899 VIOLATION
    format: "QR code required",
    products: "Unknown",
    dataFields: "Unknown",
    hasUPC: false,
    notes: "NOT SCRAPEABLE - QR code + removes data after best-by date (AB 899 VIOLATION)",
    parser: parseHappyBabyData
  },

  sprout: {
    name: "Sprout Organics",
    url: "https://sproutorganics.com",
    tier: 3,
    enabled: false, // NOT SCRAPEABLE
    format: "QR code + lot code required",
    products: "Unknown",
    dataFields: "Unknown",
    hasUPC: false,
    notes: "NOT SCRAPEABLE - Lot code from physical product required",
    parser: parseSproutData
  }
};

// Fetch URL content
function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    const options = {
      headers: {
        'User-Agent': 'SafeBaby-Database-Bot/1.0 (contact@safebaby.co)',
        'Accept': 'text/html,application/json'
      }
    };

    client.get(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({
            statusCode: res.statusCode,
            contentType: res.headers['content-type'],
            body: data
          });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Generic parsers for different manufacturer formats
// These will need to be customized based on actual disclosure formats

function parseGerberData(html) {
  // Example parser - customize based on actual Gerber disclosure format
  // This is a template that should be adapted when the actual format is known

  console.log('Parsing Gerber data...');
  const products = [];

  // TODO: Implement actual parsing logic based on Gerber's disclosure format
  // Possible formats:
  // - HTML table with product names and test results
  // - JSON API endpoint
  // - PDF reports (would require PDF parsing library)
  // - CSV download

  // Example structure to extract:
  // - Product name
  // - Batch/lot number
  // - Test date
  // - Heavy metal levels (Lead, Arsenic, Cadmium, Mercury)
  // - Lab name
  // - Report URL

  return products;
}

function parseBeechNutData(html) {
  console.log('Parsing Beech-Nut data...');
  const products = [];

  // TODO: Implement Beech-Nut specific parsing

  return products;
}

function parseHappyBabyData(html) {
  console.log('Parsing Happy Baby data...');
  const products = [];

  // TODO: Implement Happy Baby specific parsing

  return products;
}

function parsePlumData(html) {
  console.log('Parsing Plum Organics data...');
  const products = [];

  // TODO: Implement Plum Organics specific parsing

  return products;
}

function parseEarthsBestData(html) {
  console.log('Parsing Earth\'s Best data...');
  const products = [];

  // TODO: Implement Earth's Best specific parsing
  // URL: https://www.earthsbest.com/producttesting
  // Format: HTML form-based lookup
  // Notes: Reports exact ppb values (no '<' symbols) - most accurate data
  // Products: ~40 products

  return products;
}

function parseLittleSpoonData(html) {
  console.log('Parsing Little Spoon data...');
  const products = [];

  // TODO: Implement Little Spoon specific parsing
  // URL: https://www.littlespoon.com/our-standards
  // Format: Interactive dashboard per product
  // Notes: EU-aligned strict standards, tests 500+ contaminants
  // Products: 50+ Babyblends

  return products;
}

function parseOnceUponAFarmData(html) {
  console.log('Parsing Once Upon a Farm data...');
  const products = [];

  // TODO: Implement Once Upon a Farm specific parsing
  // URL: https://onceuponafarmorganics.com/pages/our-standards
  // Format: QR codes + lot number entry
  // Notes: Requires lot code from physical product - complex scraping
  // Products: 100+ products

  return products;
}

function parseSproutData(html) {
  console.log('Parsing Sprout Organics data...');
  const products = [];

  // NOT SCRAPEABLE - Requires lot code from physical product
  // URL: https://sproutorganics.com
  console.log('  ⚠️  Sprout Organics requires lot codes from physical products');
  console.log('  ⚠️  This source is NOT scrapeable without product access');

  return products;
}

// Calculate safety score (same as seed-enhanced.js)
function calculateSafetyScore(heavyMetals) {
  const limits = {
    lead: 20.0,
    arsenic: 100.0,
    cadmium: 5.0,
    mercury: 1.0
  };

  const leadPct = (heavyMetals.lead / limits.lead) * 100;
  const arsenicPct = (heavyMetals.arsenic / limits.arsenic) * 100;
  const cadmiumPct = (heavyMetals.cadmium / limits.cadmium) * 100;
  const mercuryPct = (heavyMetals.mercury / limits.mercury) * 100;

  const avgPct = (leadPct * 0.3 + arsenicPct * 0.4 + cadmiumPct * 0.2 + mercuryPct * 0.1);

  let score = 100;
  if (avgPct < 20) {
    score = 90 + (20 - avgPct) / 2;
  } else if (avgPct < 100) {
    score = 90 - ((avgPct - 20) / 80) * 40;
  } else {
    score = 50 - ((avgPct - 100) / 100) * 30;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

// Process and import scraped data
async function importScrapedProduct(productData) {
  try {
    // Check if product exists by barcode
    let product;
    if (productData.barcode) {
      const { data: existing } = await supabase
        .from('products')
        .select('*')
        .eq('barcode', productData.barcode)
        .single();

      product = existing;
    }

    // If not found by barcode, try by name and brand
    if (!product) {
      const { data: existing } = await supabase
        .from('products')
        .select('*')
        .eq('name', productData.name)
        .eq('brand', productData.brand)
        .single();

      product = existing;
    }

    // Calculate score
    const safetyScore = calculateSafetyScore(productData.heavyMetals);

    // Insert or update product
    if (product) {
      // Update existing product
      const { error: updateError } = await supabase
        .from('products')
        .update({
          overall_score: safetyScore,
          barcode: productData.barcode || product.barcode,
          description: productData.description || product.description
        })
        .eq('id', product.id);

      if (updateError) throw updateError;
      console.log(`  Updated product: ${productData.name}`);
    } else {
      // Insert new product
      const { data: newProduct, error: insertError } = await supabase
        .from('products')
        .insert({
          name: productData.name,
          brand: productData.brand,
          category: productData.category || 'unknown',
          barcode: productData.barcode,
          description: productData.description,
          overall_score: safetyScore
        })
        .select()
        .single();

      if (insertError) throw insertError;
      product = newProduct;
      console.log(`  Inserted new product: ${productData.name}`);
    }

    // Insert lab result
    const { data: labResult, error: labError } = await supabase
      .from('lab_results')
      .insert({
        product_id: product.id,
        lab_name: productData.labName,
        test_date: productData.testDate,
        report_url: productData.reportUrl
      })
      .select()
      .single();

    if (labError) throw labError;

    // Insert contaminants
    const contaminants = [
      {
        lab_result_id: labResult.id,
        contaminant_name: "Lead",
        amount_detected: productData.heavyMetals.lead,
        unit: "ppb",
        safety_limit: 20.0,
        exceeds_limit: productData.heavyMetals.lead > 20.0,
        health_impact: "Can affect brain development and cause learning difficulties"
      },
      {
        lab_result_id: labResult.id,
        contaminant_name: "Arsenic",
        amount_detected: productData.heavyMetals.arsenic,
        unit: "ppb",
        safety_limit: 100.0,
        exceeds_limit: productData.heavyMetals.arsenic > 100.0,
        health_impact: "Associated with developmental delays and immune system issues"
      },
      {
        lab_result_id: labResult.id,
        contaminant_name: "Cadmium",
        amount_detected: productData.heavyMetals.cadmium,
        unit: "ppb",
        safety_limit: 5.0,
        exceeds_limit: productData.heavyMetals.cadmium > 5.0,
        health_impact: "Can damage kidneys and bones, affects growth"
      },
      {
        lab_result_id: labResult.id,
        contaminant_name: "Mercury",
        amount_detected: productData.heavyMetals.mercury,
        unit: "ppb",
        safety_limit: 1.0,
        exceeds_limit: productData.heavyMetals.mercury > 1.0,
        health_impact: "Harmful to nervous system development and brain function"
      }
    ];

    const { error: contError } = await supabase
      .from('contaminants')
      .insert(contaminants);

    if (contError) throw contError;

    return { success: true, product };
  } catch (error) {
    console.error(`  Error importing ${productData.name}:`, error.message);
    return { success: false, error };
  }
}

// Main scraping function
async function scrapeManufacturerData(manufacturerId) {
  const manufacturer = MANUFACTURER_URLS[manufacturerId];

  if (!manufacturer) {
    console.error(`Unknown manufacturer ID: ${manufacturerId}`);
    return { success: false, error: 'Unknown manufacturer' };
  }

  if (!manufacturer.enabled) {
    console.log(`Scraping disabled for ${manufacturer.name}`);
    console.log(`URL: ${manufacturer.url}`);
    console.log('This URL may not be active yet. Enable in MANUFACTURER_URLS when confirmed.');
    return { success: false, error: 'Scraping disabled' };
  }

  console.log(`Fetching data from ${manufacturer.name}...`);
  console.log(`URL: ${manufacturer.url}`);

  try {
    const response = await fetchURL(manufacturer.url);
    console.log(`Received ${response.body.length} bytes`);

    const products = manufacturer.parser(response.body);
    console.log(`Parsed ${products.length} products`);

    if (products.length === 0) {
      console.log('No products found. Parser may need updating.');
      return { success: true, imported: 0 };
    }

    // Import each product
    let imported = 0;
    let failed = 0;

    for (const product of products) {
      const result = await importScrapedProduct(product);
      if (result.success) {
        imported++;
      } else {
        failed++;
      }
    }

    console.log(`Import complete: ${imported} successful, ${failed} failed`);
    return { success: true, imported, failed };

  } catch (error) {
    console.error(`Error scraping ${manufacturer.name}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Scrape all enabled manufacturers
async function scrapeAll() {
  console.log('SafeBaby AB 899 Web Scraper');
  console.log('='.repeat(60));
  console.log('');

  const results = {};

  for (const [id, manufacturer] of Object.entries(MANUFACTURER_URLS)) {
    if (manufacturer.enabled) {
      console.log(`Scraping ${manufacturer.name}...`);
      results[id] = await scrapeManufacturerData(id);
      console.log('');

      // Delay between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      console.log(`⏭️  Skipping ${manufacturer.name} (disabled)`);
    }
  }

  console.log('='.repeat(60));
  console.log('SCRAPING COMPLETE');
  console.log('='.repeat(60));
  console.log('');
  console.log('Results:');

  let totalImported = 0;
  let totalFailed = 0;

  for (const [id, result] of Object.entries(results)) {
    const manufacturer = MANUFACTURER_URLS[id];
    if (result.success && result.imported !== undefined) {
      console.log(`  ${manufacturer.name}: ${result.imported} imported, ${result.failed || 0} failed`);
      totalImported += result.imported;
      totalFailed += result.failed || 0;
    } else {
      console.log(`  ${manufacturer.name}: ${result.error || 'No data'}`);
    }
  }

  console.log('');
  console.log(`Total: ${totalImported} products imported, ${totalFailed} failed`);
  console.log('');
  console.log('NOTE: Most manufacturer URLs are not yet enabled.');
  console.log('Update MANUFACTURER_URLS with actual disclosure URLs when available.');
}

// Show manufacturer status
function showStatus() {
  console.log('SafeBaby AB 899 Manufacturer Status');
  console.log('='.repeat(70));
  console.log('');

  const tiers = {
    1: { name: 'TIER 1: EXCELLENT TRANSPARENCY', color: '✅', manufacturers: [] },
    2: { name: 'TIER 2: MODERATE TRANSPARENCY', color: '⚠️', manufacturers: [] },
    3: { name: 'TIER 3: POOR TRANSPARENCY', color: '❌', manufacturers: [] }
  };

  for (const [id, m] of Object.entries(MANUFACTURER_URLS)) {
    tiers[m.tier].manufacturers.push({ id, ...m });
  }

  for (const [tier, data] of Object.entries(tiers)) {
    console.log(`${data.color} ${data.name}`);
    console.log('-'.repeat(70));
    for (const m of data.manufacturers) {
      const status = m.enabled ? '🟢 ENABLED' : '⚫ disabled';
      console.log(`  ${m.id.padEnd(15)} ${m.name.padEnd(30)} ${status}`);
      console.log(`                  URL: ${m.url}`);
      console.log(`                  Products: ${m.products} | UPC: ${m.hasUPC ? 'Yes' : 'No'}`);
      if (m.notes) {
        console.log(`                  Notes: ${m.notes}`);
      }
      console.log('');
    }
  }

  console.log('='.repeat(70));
  console.log('SCRAPING PRIORITY:');
  console.log('  1. Plum Organics   → Run scrape-plum-organics.js (~45 products)');
  console.log('  2. Earth\'s Best    → Form scraping script needed (~40 products)');
  console.log('  3. Gerber          → Form scraping script needed (~136 products)');
  console.log('  4. Little Spoon    → Dashboard scraping needed (~50 products)');
  console.log('');
  console.log('Estimated total from scrapeable sources: ~270 new products with REAL lab data');
  console.log('');
}

// Command line interface
const args = process.argv.slice(2);

if (args.length === 0) {
  // No args: scrape all enabled manufacturers
  scrapeAll()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
} else if (args[0] === '--help' || args[0] === '-h') {
  console.log('SafeBaby AB 899 Web Scraper');
  console.log('');
  console.log('Usage:');
  console.log('  node scripts/scrape-ab899.js [command|manufacturer]');
  console.log('');
  console.log('Commands:');
  console.log('  --status, -s    Show all manufacturers and their transparency status');
  console.log('  --help, -h      Show this help message');
  console.log('');
  console.log('Manufacturers (TIER 1 - Scrapeable):');
  console.log('  plum            Plum Organics (use scrape-plum-organics.js instead)');
  console.log('  littlespoon     Little Spoon');
  console.log('  earthsbest      Earth\'s Best Organic');
  console.log('');
  console.log('Manufacturers (TIER 2 - Complex):');
  console.log('  gerber          Gerber Products Company');
  console.log('  onceuponafarm   Once Upon a Farm');
  console.log('');
  console.log('Manufacturers (TIER 3 - NOT Scrapeable):');
  console.log('  beechnut        Beech-Nut (QR code required)');
  console.log('  happybaby       Happy Family Organics (QR code + data removed after best-by)');
  console.log('  sprout          Sprout Organics (lot code required)');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/scrape-ab899.js              # Scrape all enabled');
  console.log('  node scripts/scrape-ab899.js --status     # Show manufacturer status');
  console.log('  node scripts/scrape-ab899.js gerber       # Scrape only Gerber');
  console.log('');
  console.log('Note: Use scrape-plum-organics.js for Plum Organics data.');
  process.exit(0);
} else if (args[0] === '--status' || args[0] === '-s') {
  showStatus();
  process.exit(0);
} else {
  // Specific manufacturer
  const manufacturerId = args[0].toLowerCase();
  scrapeManufacturerData(manufacturerId)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

// Export for use as module
module.exports = {
  scrapeManufacturerData,
  scrapeAll,
  fetchURL,
  calculateSafetyScore,
  importScrapedProduct
};
