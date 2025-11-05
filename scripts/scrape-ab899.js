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

// Known manufacturer disclosure URLs (as they become available)
// AB 899 became effective January 1, 2022
const MANUFACTURER_URLS = {
  gerber: {
    name: "Gerber Products Company",
    url: "https://www.gerber.com/heavy-metal-testing", // Example URL
    enabled: false, // Set to true when URL is confirmed
    parser: parseGerberData
  },
  beechnut: {
    name: "Beech-Nut Nutrition Company",
    url: "https://www.beechnut.com/ab899-disclosure", // Example URL
    enabled: false,
    parser: parseBeechNutData
  },
  happybaby: {
    name: "Nurture Inc. (Happy Baby)",
    url: "https://www.happyfamilyorganics.com/heavy-metals", // Example URL
    enabled: false,
    parser: parseHappyBabyData
  },
  plum: {
    name: "Plum Organics",
    url: "https://www.plumorganics.com/quality-safety", // Example URL
    enabled: false,
    parser: parsePlumData
  },
  earthsbest: {
    name: "Earth's Best Organic",
    url: "https://www.earthsbest.com/safety-testing", // Example URL
    enabled: false,
    parser: parseEarthsBestData
  }
};

// Fetch URL content
function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    const options = {
      headers: {
        'User-Agent': 'SafeBaby-Database-Bot/1.0 (contact@safebaby.app)',
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
  console.log('  node scripts/scrape-ab899.js [manufacturer]');
  console.log('');
  console.log('Arguments:');
  console.log('  manufacturer    Scrape specific manufacturer (gerber, beechnut, happybaby, plum, earthsbest)');
  console.log('                  Omit to scrape all enabled manufacturers');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/scrape-ab899.js              # Scrape all enabled');
  console.log('  node scripts/scrape-ab899.js gerber       # Scrape only Gerber');
  console.log('');
  console.log('Note: Most URLs are disabled by default. Enable in MANUFACTURER_URLS when confirmed.');
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
