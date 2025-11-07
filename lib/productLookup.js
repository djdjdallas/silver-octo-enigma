/**
 * External Product Lookup Service
 *
 * Looks up product information from external APIs when products aren't in our database.
 * Tries Open Food Facts first (free, excellent ingredient data), then UPCitemdb as fallback.
 *
 * @module lib/productLookup
 */

/**
 * Looks up product information by barcode from external APIs
 *
 * @param {string} barcode - UPC/EAN barcode number
 * @returns {Promise<Object>} Product information or error
 *
 * Success response structure:
 * {
 *   success: true,
 *   source: 'Open Food Facts' | 'UPCitemdb',
 *   product: {
 *     barcode: string,
 *     name: string,
 *     brand: string,
 *     image: string,
 *     ingredients: string,
 *     categories: string,
 *     nutrition?: object,
 *     labels?: string,
 *     packaging?: string
 *   }
 * }
 */
export async function lookupProductByBarcode(barcode) {
  // Validate barcode format
  if (!barcode || typeof barcode !== 'string') {
    return { success: false, error: 'Invalid barcode format' };
  }

  // Remove any non-numeric characters
  const cleanBarcode = barcode.replace(/[^0-9]/g, '');

  if (cleanBarcode.length < 8 || cleanBarcode.length > 14) {
    return { success: false, error: 'Barcode must be between 8 and 14 digits' };
  }

  // Try Open Food Facts first (free, best ingredient data)
  try {
    console.log(`Looking up barcode ${cleanBarcode} in Open Food Facts...`);

    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${cleanBarcode}.json`,
      {
        next: { revalidate: 86400 }, // Cache for 24 hours
        headers: {
          'User-Agent': 'SafeBaby - Baby Food Safety App - safebaby.app'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Open Food Facts API returned ${response.status}`);
    }

    const data = await response.json();

    // Check if product was found
    if (data.status === 1 && data.product) {
      const product = data.product;

      // Extract and normalize product information
      const productInfo = {
        barcode: cleanBarcode,
        name: product.product_name || product.product_name_en || 'Unknown Product',
        brand: product.brands || 'Unknown Brand',
        image: product.image_url || product.image_front_url || null,
        ingredients: product.ingredients_text || product.ingredients_text_en || null,
        categories: product.categories || '',
        // Additional useful data for AI analysis
        nutrition: product.nutriments || null,
        labels: product.labels || null,
        packaging: product.packaging || null,
        servingSize: product.serving_size || null
      };

      // Only return if we have at least a name
      if (productInfo.name && productInfo.name !== 'Unknown Product') {
        console.log(`✓ Found product in Open Food Facts: ${productInfo.name}`);
        return {
          success: true,
          source: 'Open Food Facts',
          product: productInfo
        };
      }
    }

    console.log(`Product not found in Open Food Facts`);
  } catch (error) {
    console.error('Open Food Facts lookup failed:', error.message);
  }

  // Fallback to UPCitemdb (limited free tier, 100 requests/day)
  try {
    console.log(`Trying UPCitemdb for barcode ${cleanBarcode}...`);

    const response = await fetch(
      `https://api.upcitemdb.com/prod/trial/lookup?upc=${cleanBarcode}`,
      {
        headers: {
          'User-Agent': 'SafeBaby - Baby Food Safety App'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`UPCitemdb API returned ${response.status}`);
    }

    const data = await response.json();

    // Check if product was found
    if (data.items && data.items.length > 0) {
      const item = data.items[0];

      const productInfo = {
        barcode: cleanBarcode,
        name: item.title || 'Unknown Product',
        brand: item.brand || 'Unknown Brand',
        image: item.images?.[0] || null,
        ingredients: item.description || null, // UPCitemdb doesn't have proper ingredient lists
        categories: item.category || ''
      };

      console.log(`✓ Found product in UPCitemdb: ${productInfo.name}`);
      return {
        success: true,
        source: 'UPCitemdb',
        product: productInfo
      };
    }

    console.log(`Product not found in UPCitemdb`);
  } catch (error) {
    console.error('UPCitemdb lookup failed:', error.message);
  }

  // Product not found in any database
  return {
    success: false,
    error: 'Product not found in Open Food Facts or UPCitemdb',
    barcode: cleanBarcode
  };
}

/**
 * Validates if a string looks like a valid barcode
 *
 * @param {string} barcode - String to validate
 * @returns {boolean} True if barcode format is valid
 */
export function isValidBarcode(barcode) {
  if (!barcode || typeof barcode !== 'string') {
    return false;
  }

  const cleanBarcode = barcode.replace(/[^0-9]/g, '');
  return cleanBarcode.length >= 8 && cleanBarcode.length <= 14;
}

/**
 * Formats barcode for display (adds hyphens for readability)
 *
 * @param {string} barcode - Raw barcode number
 * @returns {string} Formatted barcode
 */
export function formatBarcode(barcode) {
  if (!barcode) return '';

  const clean = barcode.replace(/[^0-9]/g, '');

  // Format UPC-A (12 digits): 0-12345-67890-1
  if (clean.length === 12) {
    return `${clean[0]}-${clean.slice(1, 6)}-${clean.slice(6, 11)}-${clean[11]}`;
  }

  // Format EAN-13 (13 digits): 123-4567890123
  if (clean.length === 13) {
    return `${clean.slice(0, 3)}-${clean.slice(3)}`;
  }

  // Return as-is for other lengths
  return clean;
}
