'use server';

/**
 * Unified Product Lookup Server Action
 *
 * This server action provides a single entry point for product lookups.
 * It checks multiple sources in order of data quality:
 * 1. Our database for lab-tested products (premium data with real lab results)
 * 2. AI-analyzed products cache (previously analyzed products)
 * 3. External APIs + AI analysis (new lookups via Open Food Facts/UPCitemdb)
 *
 * @module app/actions/productLookup
 */

import { createClient } from '@/lib/supabase/server';
import { lookupProductByBarcode } from '@/lib/productLookup';
import { analyzeProductWithAI } from '@/lib/aiProductAnalysis';

/**
 * Looks up a product by barcode across all available sources
 *
 * @param {string} barcode - UPC/EAN barcode number
 * @returns {Promise<Object>} Product information and analysis
 *
 * Response types:
 * - lab_tested: Product from our database with real lab results
 * - ai_analyzed: Product analyzed by AI (cached or new)
 * - not_found: Product not found in any database
 * - analysis_failed: Product found but AI analysis failed
 */
export async function lookupProduct(barcode) {
  console.log(`\n=== Product Lookup Started for Barcode: ${barcode} ===`);

  // Clean and validate barcode
  const cleanBarcode = barcode?.replace(/[^0-9]/g, '') || '';

  if (!cleanBarcode || cleanBarcode.length < 8 || cleanBarcode.length > 14) {
    return {
      type: 'error',
      error: 'Invalid barcode format. Must be 8-14 digits.',
      barcode
    };
  }

  const supabase = await createClient();

  // ===================================================================
  // STEP 1: Check for lab-tested products in our database (PREMIUM DATA)
  // ===================================================================
  console.log('Step 1: Checking our lab-tested products database...');

  try {
    const { data: labProduct, error: labError } = await supabase
      .from('products')
      .select(`
        *,
        lab_results (
          *,
          contaminants (*)
        )
      `)
      .eq('barcode', cleanBarcode)
      .single();

    if (labProduct && !labError) {
      console.log(`✓ Found lab-tested product: ${labProduct.name}`);
      console.log('=== Product Lookup Complete (Lab-Tested) ===\n');

      return {
        type: 'lab_tested',
        product: labProduct,
        source: 'SafeBaby Lab Database',
        hasLabResults: labProduct.lab_results && labProduct.lab_results.length > 0
      };
    }

    console.log('  No lab-tested product found');
  } catch (error) {
    console.error('Error checking lab products:', error.message);
  }

  // ===================================================================
  // STEP 2: Check if we've already AI-analyzed this product (CACHED)
  // ===================================================================
  console.log('Step 2: Checking AI-analyzed products cache...');

  try {
    const { data: cachedAnalysis, error: cacheError } = await supabase
      .from('ai_analyzed_products')
      .select('*')
      .eq('barcode', cleanBarcode)
      .single();

    if (cachedAnalysis && !cacheError) {
      console.log(`✓ Found cached AI analysis: ${cachedAnalysis.product_name}`);
      console.log(`  Score: ${cachedAnalysis.overall_score}/100`);
      console.log('=== Product Lookup Complete (Cached AI) ===\n');

      return {
        type: 'ai_analyzed',
        product: {
          id: cachedAnalysis.id,
          barcode: cachedAnalysis.barcode,
          name: cachedAnalysis.product_name,
          brand: cachedAnalysis.brand,
          image_url: cachedAnalysis.image_url,
          ingredients: cachedAnalysis.ingredients_text,
          categories: cachedAnalysis.categories,
        },
        analysis: {
          overallScore: cachedAnalysis.overall_score,
          harmfulSubstances: {
            count: cachedAnalysis.harmful_substances_count,
            details: cachedAnalysis.harmful_substances_details || []
          },
          microplasticsRisk: cachedAnalysis.microplastics_risk,
          microplasticsReason: cachedAnalysis.microplastics_reason,
          beneficialIngredients: {
            count: cachedAnalysis.beneficial_ingredients_count,
            details: cachedAnalysis.beneficial_ingredients_details || []
          },
          concerns: cachedAnalysis.concerns || [],
          recommendations: cachedAnalysis.recommendations
        },
        source: cachedAnalysis.source,
        analyzedAt: cachedAnalysis.analyzed_at,
        cached: true
      };
    }

    console.log('  No cached AI analysis found');
  } catch (error) {
    console.error('Error checking AI cache:', error.message);
  }

  // ===================================================================
  // STEP 3: Product not in our database, lookup externally
  // ===================================================================
  console.log('Step 3: Looking up product in external databases...');

  const externalLookup = await lookupProductByBarcode(cleanBarcode);

  if (!externalLookup.success) {
    console.log('✗ Product not found in any external database');
    console.log('=== Product Lookup Complete (Not Found) ===\n');

    return {
      type: 'not_found',
      barcode: cleanBarcode,
      message: 'Product not found in Open Food Facts, UPCitemdb, or our database.',
      suggestion: 'Try scanning the barcode again, or manually search for the product.'
    };
  }

  console.log(`✓ Found product in ${externalLookup.source}`);
  console.log(`  Name: ${externalLookup.product.name}`);
  console.log(`  Brand: ${externalLookup.product.brand}`);
  console.log(`  Has ingredients: ${!!externalLookup.product.ingredients}`);

  // ===================================================================
  // STEP 4: Analyze with AI
  // ===================================================================
  console.log('Step 4: Analyzing product with AI...');

  const aiResult = await analyzeProductWithAI(externalLookup.product);

  if (!aiResult.success) {
    console.log(`✗ AI analysis failed: ${aiResult.error}`);
    console.log('=== Product Lookup Complete (Analysis Failed) ===\n');

    return {
      type: 'analysis_failed',
      product: externalLookup.product,
      source: externalLookup.source,
      error: aiResult.error,
      message: 'Product found but AI analysis failed. Please try again.'
    };
  }

  console.log(`✓ AI analysis complete`);
  console.log(`  Overall Score: ${aiResult.analysis.overallScore}/100`);
  console.log(`  Harmful Substances: ${aiResult.analysis.harmfulSubstances.count}`);
  console.log(`  Beneficial Ingredients: ${aiResult.analysis.beneficialIngredients.count}`);

  // ===================================================================
  // STEP 5: Save to database for future lookups (cache the result)
  // ===================================================================
  console.log('Step 5: Caching AI analysis to database...');

  try {
    const { data: savedProduct, error: saveError } = await supabase
      .from('ai_analyzed_products')
      .insert({
        barcode: cleanBarcode,
        product_name: externalLookup.product.name,
        brand: externalLookup.product.brand,
        image_url: externalLookup.product.image,
        ingredients_text: externalLookup.product.ingredients,
        categories: externalLookup.product.categories,
        source: externalLookup.source,
        overall_score: aiResult.analysis.overallScore,
        harmful_substances_count: aiResult.analysis.harmfulSubstances.count,
        harmful_substances_details: aiResult.analysis.harmfulSubstances.details,
        microplastics_risk: aiResult.analysis.microplasticsRisk,
        microplastics_reason: aiResult.analysis.microplasticsReason,
        beneficial_ingredients_count: aiResult.analysis.beneficialIngredients.count,
        beneficial_ingredients_details: aiResult.analysis.beneficialIngredients.details,
        concerns: aiResult.analysis.concerns,
        recommendations: aiResult.analysis.recommendations
      })
      .select()
      .single();

    if (saveError) {
      console.error('Failed to cache AI analysis:', saveError.message);
    } else {
      console.log('✓ AI analysis cached successfully');
    }
  } catch (error) {
    console.error('Error caching AI analysis:', error.message);
  }

  console.log('=== Product Lookup Complete (New AI Analysis) ===\n');

  return {
    type: 'ai_analyzed',
    product: externalLookup.product,
    analysis: aiResult.analysis,
    source: externalLookup.source,
    analyzedAt: new Date().toISOString(),
    cached: false,
    isNewAnalysis: true
  };
}

/**
 * Gets a product by ID (for direct links to AI-analyzed products)
 *
 * @param {string} id - UUID of the AI-analyzed product
 * @returns {Promise<Object>} Product and analysis data
 */
export async function getAIAnalyzedProduct(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('ai_analyzed_products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return {
      type: 'not_found',
      error: 'Product not found'
    };
  }

  return {
    type: 'ai_analyzed',
    product: {
      id: data.id,
      barcode: data.barcode,
      name: data.product_name,
      brand: data.brand,
      image_url: data.image_url,
      ingredients: data.ingredients_text,
      categories: data.categories,
    },
    analysis: {
      overallScore: data.overall_score,
      harmfulSubstances: {
        count: data.harmful_substances_count,
        details: data.harmful_substances_details || []
      },
      microplasticsRisk: data.microplastics_risk,
      microplasticsReason: data.microplastics_reason,
      beneficialIngredients: {
        count: data.beneficial_ingredients_count,
        details: data.beneficial_ingredients_details || []
      },
      concerns: data.concerns || [],
      recommendations: data.recommendations
    },
    source: data.source,
    analyzedAt: data.analyzed_at
  };
}
