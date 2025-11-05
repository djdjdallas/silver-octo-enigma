// CSV import tool for manual baby food data entry
// Allows importing product data and test results from CSV files
// Run with: node scripts/import-csv.js <csv-file-path>

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// CSV parsing (simple implementation, doesn't handle all edge cases)
function parseCSV(content) {
  const lines = content.split('\n').map(line => line.trim()).filter(line => line);
  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row');
  }

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length !== headers.length) {
      console.warn(`Warning: Row ${i + 1} has ${values.length} columns, expected ${headers.length}. Skipping.`);
      continue;
    }

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    rows.push(row);
  }

  return rows;
}

// Parse a single CSV line (handles quoted values with commas)
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

// Validate required fields
function validateRow(row, rowNum) {
  const required = ['name', 'brand', 'category'];
  const missing = required.filter(field => !row[field] || row[field] === '');

  if (missing.length > 0) {
    console.error(`Row ${rowNum}: Missing required fields: ${missing.join(', ')}`);
    return false;
  }

  // Validate category
  const validCategories = ['cereal', 'puree', 'snack', 'juice', 'meal', 'other'];
  if (!validCategories.includes(row.category.toLowerCase())) {
    console.error(`Row ${rowNum}: Invalid category "${row.category}". Must be one of: ${validCategories.join(', ')}`);
    return false;
  }

  return true;
}

// Calculate safety score based on heavy metal levels
function calculateSafetyScore(lead, arsenic, cadmium, mercury) {
  const limits = {
    lead: 20.0,
    arsenic: 100.0,
    cadmium: 5.0,
    mercury: 1.0
  };

  const leadPct = (lead / limits.lead) * 100;
  const arsenicPct = (arsenic / limits.arsenic) * 100;
  const cadmiumPct = (cadmium / limits.cadmium) * 100;
  const mercuryPct = (mercury / limits.mercury) * 100;

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

// Parse numeric value safely
function parseNumber(value, defaultValue = 0) {
  if (!value || value === '') return defaultValue;
  const num = parseFloat(value);
  return isNaN(num) ? defaultValue : num;
}

// Import a single product row
async function importProduct(row, rowNum, options = {}) {
  try {
    // Parse heavy metal values
    const lead = parseNumber(row.lead_ppb);
    const arsenic = parseNumber(row.arsenic_ppb);
    const cadmium = parseNumber(row.cadmium_ppb);
    const mercury = parseNumber(row.mercury_ppb);

    // Calculate safety score
    const safetyScore = calculateSafetyScore(lead, arsenic, cadmium, mercury);

    // Check if product already exists
    let existingProduct = null;

    if (row.barcode) {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('barcode', row.barcode)
        .maybeSingle();
      existingProduct = data;
    }

    if (!existingProduct) {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('name', row.name)
        .eq('brand', row.brand)
        .maybeSingle();
      existingProduct = data;
    }

    let product;

    if (existingProduct && !options.skipExisting) {
      // Update existing product
      if (options.updateExisting) {
        const { data, error } = await supabase
          .from('products')
          .update({
            category: row.category.toLowerCase(),
            barcode: row.barcode || existingProduct.barcode,
            description: row.description || existingProduct.description,
            overall_score: safetyScore
          })
          .eq('id', existingProduct.id)
          .select()
          .single();

        if (error) throw error;
        product = data;
        console.log(`  ✓ Updated: ${row.name} (${row.brand})`);
      } else {
        product = existingProduct;
        console.log(`  ⚠ Skipped: ${row.name} (${row.brand}) - already exists`);
      }
    } else if (!existingProduct) {
      // Insert new product
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: row.name,
          brand: row.brand,
          category: row.category.toLowerCase(),
          barcode: row.barcode || null,
          description: row.description || '',
          overall_score: safetyScore
        })
        .select()
        .single();

      if (error) throw error;
      product = data;
      console.log(`  ✓ Inserted: ${row.name} (${row.brand})`);
    } else {
      console.log(`  ⚠ Skipped: ${row.name} (${row.brand}) - already exists`);
      return { success: true, action: 'skipped' };
    }

    // Insert lab result if test data provided
    if (row.lab_name || lead > 0 || arsenic > 0 || cadmium > 0 || mercury > 0) {
      const labName = row.lab_name || 'Manual Data Entry';
      const testDate = row.test_date || new Date().toISOString().split('T')[0];

      const { data: labResult, error: labError } = await supabase
        .from('lab_results')
        .insert({
          product_id: product.id,
          lab_name: labName,
          test_date: testDate,
          report_url: row.report_url || null
        })
        .select()
        .single();

      if (labError) throw labError;

      // Insert contaminants
      const contaminants = [
        {
          lab_result_id: labResult.id,
          contaminant_name: "Lead",
          amount_detected: lead,
          unit: "ppb",
          safety_limit: 20.0,
          exceeds_limit: lead > 20.0,
          health_impact: "Can affect brain development and cause learning difficulties"
        },
        {
          lab_result_id: labResult.id,
          contaminant_name: "Arsenic",
          amount_detected: arsenic,
          unit: "ppb",
          safety_limit: 100.0,
          exceeds_limit: arsenic > 100.0,
          health_impact: "Associated with developmental delays and immune system issues"
        },
        {
          lab_result_id: labResult.id,
          contaminant_name: "Cadmium",
          amount_detected: cadmium,
          unit: "ppb",
          safety_limit: 5.0,
          exceeds_limit: cadmium > 5.0,
          health_impact: "Can damage kidneys and bones, affects growth"
        },
        {
          lab_result_id: labResult.id,
          contaminant_name: "Mercury",
          amount_detected: mercury,
          unit: "ppb",
          safety_limit: 1.0,
          exceeds_limit: mercury > 1.0,
          health_impact: "Harmful to nervous system development and brain function"
        }
      ];

      const { error: contError } = await supabase
        .from('contaminants')
        .insert(contaminants);

      if (contError) throw contError;
    }

    return { success: true, action: existingProduct ? 'updated' : 'inserted', product };

  } catch (error) {
    console.error(`  ✗ Error importing row ${rowNum} (${row.name}):`, error.message);
    return { success: false, error: error.message };
  }
}

// Main import function
async function importCSV(filePath, options = {}) {
  console.log('SafeBaby CSV Import Tool');
  console.log('='.repeat(60));
  console.log('');

  // Check file exists
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    return process.exit(1);
  }

  // Read and parse CSV
  console.log(`Reading file: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');

  let rows;
  try {
    rows = parseCSV(content);
    console.log(`Parsed ${rows.length} rows`);
  } catch (error) {
    console.error('Error parsing CSV:', error.message);
    return process.exit(1);
  }

  if (rows.length === 0) {
    console.log('No data rows found in CSV');
    return process.exit(0);
  }

  console.log('');
  console.log('Validating rows...');

  // Validate all rows first
  const validRows = [];
  for (let i = 0; i < rows.length; i++) {
    if (validateRow(rows[i], i + 2)) { // +2 because of header and 0-index
      validRows.push({ row: rows[i], num: i + 2 });
    }
  }

  console.log(`${validRows.length} valid rows, ${rows.length - validRows.length} invalid rows`);

  if (validRows.length === 0) {
    console.log('No valid rows to import');
    return process.exit(0);
  }

  console.log('');
  console.log('Importing products...');
  console.log('');

  const results = {
    inserted: 0,
    updated: 0,
    skipped: 0,
    failed: 0
  };

  for (const { row, num } of validRows) {
    const result = await importProduct(row, num, options);

    if (result.success) {
      if (result.action === 'inserted') results.inserted++;
      else if (result.action === 'updated') results.updated++;
      else if (result.action === 'skipped') results.skipped++;
    } else {
      results.failed++;
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('IMPORT COMPLETE');
  console.log('='.repeat(60));
  console.log(`Total rows processed: ${validRows.length}`);
  console.log(`  ✓ Inserted: ${results.inserted}`);
  console.log(`  ✓ Updated: ${results.updated}`);
  console.log(`  ⚠ Skipped: ${results.skipped}`);
  console.log(`  ✗ Failed: ${results.failed}`);
  console.log('');
}

// Command line interface
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  console.log('SafeBaby CSV Import Tool');
  console.log('');
  console.log('Usage:');
  console.log('  node scripts/import-csv.js <csv-file> [options]');
  console.log('');
  console.log('Options:');
  console.log('  --update        Update existing products instead of skipping them');
  console.log('  --skip-existing Skip existing products (default behavior)');
  console.log('  --help, -h      Show this help message');
  console.log('');
  console.log('CSV Format:');
  console.log('  Required columns: name, brand, category');
  console.log('  Optional columns: barcode, description, lead_ppb, arsenic_ppb, cadmium_ppb,');
  console.log('                    mercury_ppb, lab_name, test_date, report_url');
  console.log('');
  console.log('Example:');
  console.log('  node scripts/import-csv.js data/baby-food-products.csv');
  console.log('  node scripts/import-csv.js data/baby-food-products.csv --update');
  console.log('');
  console.log('Template CSV:');
  console.log('  Use scripts/product-data-template.csv as a starting point');
  process.exit(0);
}

const csvFile = args[0];
const options = {
  updateExisting: args.includes('--update'),
  skipExisting: !args.includes('--update')
};

importCSV(csvFile, options)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

// Export for testing
module.exports = {
  parseCSV,
  parseCSVLine,
  validateRow,
  calculateSafetyScore,
  importProduct,
  importCSV
};
