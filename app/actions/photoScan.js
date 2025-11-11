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

        // Step 2: Check what information we have
        const hasBarcode = extraction.barcode && isValidBarcode(extraction.barcode);
        const hasIngredients = extraction.ingredients && extraction.ingredients.length > 0;
        const hasProductName = extraction.productName && extraction.productName.length > 0;
        const hasBrand = extraction.brand && extraction.brand.length > 0;

        // We need at least product name or barcode to proceed
        if (!hasBarcode && !hasIngredients && !hasProductName) {
          console.log('✗ No useful information found in photo');
          return {
            success: false,
            error: 'Could not identify the product',
            suggestion: 'Please take a clearer photo showing the product name, ingredients list, or barcode.',
            extraction
          };
        }

        // Step 2a: Handle product name only (no barcode or ingredients)
        if (!hasBarcode && !hasIngredients && hasProductName) {
          console.log('✓ No barcode or ingredients, but product identified - analyzing by name');
          console.log(`  Product: ${extraction.productName}`);
          console.log(`  Brand: ${extraction.brand || 'Unknown'}`);

          // Import AI analysis function
          const { analyzeProductWithAI } = await import('@/lib/aiProductAnalysis');
          const { createClient } = await import('@supabase/supabase-js');

          // Create a product info object with what we know
          const productInfo = {
            name: extraction.productName,
            brand: extraction.brand || 'Unknown',
            ingredients: null, // We'll let AI infer typical ingredients
            barcode: null
          };

          console.log('Step 2a: Analyzing product by name and type...');

          // Add a note that we're analyzing based on product name only
          productInfo.analysisNote = 'Analysis based on product name and typical ingredients for this type of product. For more accurate results, please photograph the ingredients list.';

          const aiAnalysis = await analyzeProductWithAI(productInfo);

          if (!aiAnalysis.success) {
            return {
              success: false,
              error: 'Failed to analyze product',
              details: aiAnalysis.error
            };
          }

          console.log('✓ AI analysis complete');

          // Save to AI-analyzed products cache
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
          );

          const productData = {
            barcode: `name-${Date.now()}-${Math.random().toString(36).substring(7)}`, // Generate unique ID
            product_name: productInfo.name,
            brand: productInfo.brand,
            source: 'Photo Analysis', // Required field
            ingredients: 'Typical ingredients inferred from product type',
            overall_score: aiAnalysis.overallScore,
            harmful_substances_count: aiAnalysis.harmfulSubstances.length,
            harmful_substances_details: aiAnalysis.harmfulSubstances,
            microplastics_risk: aiAnalysis.microplasticsRisk,
            heavy_metals_risk: aiAnalysis.heavyMetalsRisk,
            allergen_info: aiAnalysis.allergenInfo,
            age_appropriateness: aiAnalysis.ageAppropriateness,
            nutritional_concerns: aiAnalysis.nutritionalConcerns,
            recommendations: aiAnalysis.recommendations,
            confidence_score: aiAnalysis.confidenceScore || 75, // Lower confidence since no ingredients
            analysis_notes: 'Analyzed from product name only (no barcode or ingredients visible). Analysis based on typical formulation.',
            photo_extracted: true
          };

          const { data: savedProduct, error: saveError } = await supabase
            .from('ai_analyzed_products')
            .insert(productData)
            .select()
            .single();

          if (saveError) {
            console.error('Error saving AI analysis:', saveError);
          } else {
            console.log('✓ AI analysis saved to cache');
          }

          console.log('=== Photo Scan Complete (Name-Only) ===\n');

          return {
            success: true,
            extraction,
            lookupResult: {
              type: 'ai_analyzed',
              product: savedProduct || {
                id: productData.barcode,
                ...productData
              },
              analysis: aiAnalysis,
              source: 'photo_name_only'
            }
          };
        }

        // Step 2b: Handle ingredient-only analysis (no barcode)
        if (!hasBarcode && hasIngredients) {
          console.log('✓ No barcode, but ingredients found - analyzing directly');
          console.log(`  Product: ${extraction.productName || 'Unknown'}`);
          console.log(`  Brand: ${extraction.brand || 'Unknown'}`);
          console.log(`  Ingredients: ${extraction.ingredients}`);

          // Import AI analysis function
          const { analyzeProductWithAI } = await import('@/lib/aiProductAnalysis');
          const { createClient } = await import('@supabase/supabase-js');

          // Analyze ingredients with AI
          const productInfo = {
            name: extraction.productName || 'Unknown Product',
            brand: extraction.brand || 'Unknown Brand',
            ingredients: extraction.ingredients,
            barcode: null // No barcode available
          };

          console.log('Step 2a: Analyzing ingredients with AI...');
          const aiAnalysis = await analyzeProductWithAI(productInfo);

          if (!aiAnalysis.success) {
            return {
              success: false,
              error: 'Failed to analyze product ingredients',
              details: aiAnalysis.error
            };
          }

          console.log('✓ AI analysis complete');

          // Save to AI-analyzed products cache (without barcode)
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
          );

          const productData = {
            barcode: `photo-${Date.now()}-${Math.random().toString(36).substring(7)}`, // Generate unique ID
            product_name: productInfo.name,
            brand: productInfo.brand,
            source: 'Photo Analysis', // Required field
            ingredients: productInfo.ingredients,
            overall_score: aiAnalysis.overallScore,
            harmful_substances_count: aiAnalysis.harmfulSubstances.length,
            harmful_substances_details: aiAnalysis.harmfulSubstances,
            microplastics_risk: aiAnalysis.microplasticsRisk,
            heavy_metals_risk: aiAnalysis.heavyMetalsRisk,
            allergen_info: aiAnalysis.allergenInfo,
            age_appropriateness: aiAnalysis.ageAppropriateness,
            nutritional_concerns: aiAnalysis.nutritionalConcerns,
            recommendations: aiAnalysis.recommendations,
            confidence_score: aiAnalysis.confidenceScore,
            analysis_notes: 'Analyzed from photo ingredients (no barcode)',
            photo_extracted: true
          };

          const { data: savedProduct, error: saveError } = await supabase
            .from('ai_analyzed_products')
            .insert(productData)
            .select()
            .single();

          if (saveError) {
            console.error('Error saving AI analysis:', saveError);
            // Continue anyway - we still have the analysis
          } else {
            console.log('✓ AI analysis saved to cache');
          }

          console.log('=== Photo Scan Complete (Ingredient-Only) ===\n');

          return {
            success: true,
            extraction,
            lookupResult: {
              type: 'ai_analyzed',
              product: savedProduct || {
                id: productData.barcode,
                ...productData
              },
              analysis: aiAnalysis,
              source: 'photo_ingredients'
            }
          };
        }

        console.log('✓ Valid barcode found:', extraction.barcode);

        // Step 3: Lookup product using the existing unified lookup
        console.log('Step 3: Looking up product by barcode...');

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
