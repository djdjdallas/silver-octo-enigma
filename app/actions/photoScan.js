'use server';

/**
 * Photo Scanning Server Action
 *
 * Processes photos of baby food products to extract information and look up products.
 * Flow: Extract info from photo → Validate → Lookup product → Return results
 *
 * Includes timeout handling to prevent indefinite waiting.
 *
 * @module app/actions/photoScan
 */

import { extractProductFromPhoto, isValidBarcode } from '@/lib/photoExtraction';
import { lookupProduct } from './productLookup';

// Timeout for photo scanning (30 seconds)
const SCAN_TIMEOUT = 30000;

/**
 * Helper function to wrap a promise with a timeout
 */
function withTimeout(promise, timeoutMs, timeoutError) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(timeoutError)), timeoutMs)
    )
  ]);
}

/**
 * Processes a photo of a product and returns lookup results
 *
 * @param {string} imageBase64 - Base64-encoded image (without data URL prefix)
 * @returns {Promise<Object>} Scan results
 *
 * Success response structure:
 * {
 *   success: true,
 *   extraction: { barcode, productName, brand, ingredients, confidence, notes },
 *   lookupResult: { type, product, analysis, source, ... }
 * }
 *
 * Error response structure:
 * {
 *   success: false,
 *   error: string,
 *   suggestion?: string,
 *   extraction?: Object (partial extraction for debugging)
 * }
 */
export async function scanProductPhoto(imageBase64) {
  console.log('\n=== Photo Scan Started ===');

  try {
    // Wrap the entire scanning process with a timeout
    const result = await withTimeout(
      (async () => {
        // Step 1: Extract product info from photo using Claude Vision
        console.log('Step 1: Extracting product information from photo...');

        const extraction = await extractProductFromPhoto(imageBase64);

        if (!extraction.success) {
          console.log('✗ Extraction failed:', extraction.error);
          return {
            success: false,
            error: 'Failed to extract product information from photo',
            details: extraction.error,
            suggestion: 'Please ensure the photo is clear and well-lit, with the barcode visible.'
          };
        }

        console.log('✓ Extraction successful');
        console.log(`  Barcode: ${extraction.barcode || 'Not found'}`);
        console.log(`  Product: ${extraction.productName || 'Not found'}`);
        console.log(`  Brand: ${extraction.brand || 'Not found'}`);
        console.log(`  Ingredients: ${extraction.ingredients ? 'Found' : 'Not found'}`);
        console.log(`  Confidence: ${extraction.confidence}`);

        // Step 2: Validate extracted barcode
        if (!extraction.barcode || !isValidBarcode(extraction.barcode)) {
          console.log('✗ No valid barcode found in photo');

          // If we have product name and brand, suggest manual search
          if (extraction.productName || extraction.brand) {
            return {
              success: false,
              error: 'Could not find a valid barcode in the photo',
              suggestion: `We found "${extraction.productName || ''} ${extraction.brand || ''}".trim() - try searching for this product manually.`,
              extraction // Return what we found for debugging
            };
          }

          return {
            success: false,
            error: 'Could not find a valid barcode in the photo',
            suggestion: 'Please take a clearer photo showing the barcode clearly. Make sure the barcode is in focus and well-lit.',
            extraction
          };
        }

        console.log('✓ Valid barcode found:', extraction.barcode);

        // Step 3: Lookup product using the existing unified lookup
        console.log('Step 2: Looking up product by barcode...');

        const lookupResult = await lookupProduct(extraction.barcode);

        console.log(`✓ Lookup complete: ${lookupResult.type}`);

        // Step 4: Enhance result with extracted information
        // If product found via external API but we extracted ingredients from photo,
        // prefer the photo ingredients (more accurate/complete than scraped data)
        if (lookupResult.type === 'ai_analyzed' && extraction.ingredients) {
          console.log('✓ Enhancing product data with photo-extracted ingredients');

          if (lookupResult.product) {
            // Store original ingredients for reference
            lookupResult.product.ingredientsFromAPI = lookupResult.product.ingredients;

            // Use photo-extracted ingredients
            lookupResult.product.ingredients = extraction.ingredients;
            lookupResult.product.photoExtracted = true;

            // Also update product name and brand if not found in API
            if (!lookupResult.product.name && extraction.productName) {
              lookupResult.product.name = extraction.productName;
            }
            if (!lookupResult.product.brand && extraction.brand) {
              lookupResult.product.brand = extraction.brand;
            }
          }
        }

        // Step 5: If product not found but we have name/brand, include in result
        if (lookupResult.type === 'not_found') {
          lookupResult.extractedInfo = {
            productName: extraction.productName,
            brand: extraction.brand,
            ingredients: extraction.ingredients
          };
        }

        console.log('=== Photo Scan Complete ===\n');

        return {
          success: true,
          extraction, // Include what we extracted from photo
          lookupResult // Include the product lookup result
        };
      })(), // Close the async function
      SCAN_TIMEOUT,
      'Photo scanning timed out. Please try again with a different photo.'
    );

    return result;

  } catch (error) {
    console.error('Photo scan error:', error);
    console.log('=== Photo Scan Failed ===\n');

    // Check if it's a timeout error
    if (error.message.includes('timed out')) {
      return {
        success: false,
        error: 'Photo scanning took too long and timed out',
        details: error.message,
        suggestion: 'Please try again. Make sure you have a stable internet connection.'
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred while scanning the photo',
      details: error.message,
      suggestion: 'Please try again with a different photo or enter the barcode manually.'
    };
  }
}

/**
 * Analyzes a product photo without requiring a barcode
 * Useful for products where barcode is not visible but ingredients are
 *
 * @param {string} imageBase64 - Base64-encoded image
 * @returns {Promise<Object>} Analysis results
 */
export async function analyzePhotoWithoutBarcode(imageBase64) {
  console.log('\n=== Photo Analysis (No Barcode) Started ===');

  try {
    const extraction = await extractProductFromPhoto(imageBase64);

    if (!extraction.success) {
      return {
        success: false,
        error: 'Failed to extract product information from photo'
      };
    }

    // Even without barcode, we can provide useful information
    if (!extraction.productName && !extraction.brand && !extraction.ingredients) {
      return {
        success: false,
        error: 'Could not extract any product information from the photo',
        suggestion: 'Please take a clearer photo showing the product name, brand, or ingredients.'
      };
    }

    console.log('✓ Extracted product information without barcode');
    console.log('=== Photo Analysis Complete ===\n');

    return {
      success: true,
      extraction,
      message: 'Product information extracted. Enter barcode manually or search by name to continue.'
    };

  } catch (error) {
    console.error('Photo analysis error:', error);
    console.log('=== Photo Analysis Failed ===\n');

    return {
      success: false,
      error: 'Failed to analyze photo',
      details: error.message
    };
  }
}
