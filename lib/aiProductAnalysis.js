/**
 * AI Product Analysis Service
 *
 * Uses Claude API to analyze baby food products based on ingredients, packaging,
 * and other available information. Provides safety scores, identifies harmful substances,
 * and gives recommendations for parents.
 *
 * @module lib/aiProductAnalysis
 */

/**
 * Analyzes a baby food product using Claude AI
 *
 * @param {Object} productInfo - Product information from external API
 * @param {string} productInfo.name - Product name
 * @param {string} productInfo.brand - Brand name
 * @param {string} [productInfo.ingredients] - Ingredients list (if available)
 * @param {string} [productInfo.categories] - Product categories
 * @param {string} [productInfo.labels] - Product labels (organic, etc.)
 * @param {string} [productInfo.packaging] - Packaging type
 * @returns {Promise<Object>} AI analysis results
 *
 * Success response structure:
 * {
 *   success: true,
 *   analysis: {
 *     overallScore: number (0-100),
 *     harmfulSubstances: { count: number, details: string[] },
 *     microplasticsRisk: 'none' | 'low' | 'medium' | 'high',
 *     microplasticsReason: string,
 *     beneficialIngredients: { count: number, details: string[] },
 *     concerns: string[],
 *     recommendations: string
 *   }
 * }
 */
export async function analyzeProductWithAI(productInfo) {
  // Validate required fields
  if (!productInfo || !productInfo.name || !productInfo.brand) {
    return {
      success: false,
      error: 'Product name and brand are required for analysis'
    };
  }

  // Build the analysis prompt
  const prompt = buildAnalysisPrompt(productInfo);

  try {
    console.log(`Analyzing product with AI: ${productInfo.name}`);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2500,
        temperature: 0.3, // Lower temperature for more consistent, factual analysis
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Claude API error: ${response.status} ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    const analysisText = data.content[0].text;

    // Extract and parse JSON from response
    const analysis = extractAndParseJSON(analysisText);

    // Validate the response structure
    validateAnalysisStructure(analysis);

    console.log(`✓ AI analysis complete. Score: ${analysis.overallScore}/100`);

    return {
      success: true,
      analysis
    };

  } catch (error) {
    console.error('AI analysis failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Builds the detailed analysis prompt for Claude
 *
 * @param {Object} productInfo - Product information
 * @returns {string} Formatted prompt
 */
function buildAnalysisPrompt(productInfo) {
  return `You are a baby food safety expert analyzing products for concerned parents.

Product Information:
- Name: ${productInfo.name}
- Brand: ${productInfo.brand}
${productInfo.ingredients ? `- Ingredients: ${productInfo.ingredients}` : '- Ingredients: Not available on packaging'}
${productInfo.categories ? `- Categories: ${productInfo.categories}` : ''}
${productInfo.labels ? `- Labels: ${productInfo.labels}` : ''}
${productInfo.packaging ? `- Packaging: ${productInfo.packaging}` : ''}
${productInfo.servingSize ? `- Serving Size: ${productInfo.servingSize}` : ''}

Provide a comprehensive safety analysis in JSON format. Respond ONLY with valid JSON, no markdown formatting or code blocks:

{
  "overallScore": <number 0-100>,
  "harmfulSubstances": {
    "count": <number>,
    "details": [
      "Specific substance name and brief explanation of concern for babies"
    ]
  },
  "microplasticsRisk": "<none|low|medium|high>",
  "microplasticsReason": "Brief explanation of microplastic risk based on packaging and ingredients",
  "beneficialIngredients": {
    "count": <number>,
    "details": [
      "Ingredient name and specific benefit for baby development"
    ]
  },
  "concerns": [
    "Specific safety concern relevant to babies (e.g., choking hazard, allergen, added sugar)"
  ],
  "recommendations": "One paragraph recommendation for parents considering this product"
}

Scoring Criteria (0-100):
- 90-100: Excellent - Organic, minimal processing, no concerning ingredients, ideal for babies
- 75-89: Good - Safe and nutritious, minor concerns only
- 60-74: Fair - Acceptable but has some concerning ingredients or processing
- 40-59: Poor - Multiple concerning ingredients, not recommended
- 0-39: Avoid - Significant safety concerns, do not use

Baby-Specific Safety Considerations:
1. Heavy metal risk factors:
   - Rice products (especially rice cereal) - high arsenic risk
   - Root vegetables (carrots, sweet potatoes) - can accumulate heavy metals from soil
   - Certain grains and legumes

2. Added sugars:
   - Any added sugar is concerning for babies under 2 years
   - Watch for: cane sugar, corn syrup, fruit juice concentrate, honey

3. Preservatives and artificial additives:
   - Artificial colors, flavors, preservatives should be avoided
   - Look for natural preservation methods

4. Sodium content:
   - Babies need very low sodium (less than 200mg per serving)
   - High sodium can stress developing kidneys

5. Organic vs conventional:
   - Organic reduces pesticide exposure
   - Especially important for produce with high pesticide residues

6. Processing level:
   - Less processed is better
   - Avoid ultra-processed foods with long ingredient lists

7. Common allergens:
   - Dairy, soy, wheat, eggs, nuts, fish
   - Note if present, but don't over-penalize (exposure is part of development)

8. Choking hazards:
   - Texture should be appropriate for baby's age
   - Smooth purees are safest for young babies

9. Packaging:
   - Glass jars are best (no BPA, phthalates)
   - Plastic pouches may leach chemicals
   - BPA-free plastic is better but still contains other plasticizers

Important Guidelines:
- If ingredients are not available, base analysis on product name, brand reputation, category, and packaging information
- Be conservative but fair in your scoring
- Note any limitations in the recommendations if information is incomplete
- Focus on actionable advice for parents
- Consider that "trace amounts" of concerning substances are often unavoidable but not immediately harmful
- Balance safety concerns with nutritional benefits

Respond ONLY with the JSON object. Do not include markdown formatting, code blocks, or any other text.`;
}

/**
 * Extracts and parses JSON from Claude's response
 * Handles markdown code blocks if present
 *
 * @param {string} text - Raw response text from Claude
 * @returns {Object} Parsed JSON object
 */
function extractAndParseJSON(text) {
  let jsonText = text.trim();

  // Remove markdown code blocks if present
  jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

  // Remove any leading/trailing whitespace
  jsonText = jsonText.trim();

  try {
    return JSON.parse(jsonText);
  } catch (error) {
    // If parsing fails, try to find JSON within the text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error(`Failed to parse JSON from AI response: ${error.message}`);
  }
}

/**
 * Validates that the AI analysis has the required structure
 *
 * @param {Object} analysis - Parsed analysis object
 * @throws {Error} If structure is invalid
 */
function validateAnalysisStructure(analysis) {
  const requiredFields = [
    'overallScore',
    'harmfulSubstances',
    'microplasticsRisk',
    'microplasticsReason',
    'beneficialIngredients',
    'concerns',
    'recommendations'
  ];

  for (const field of requiredFields) {
    if (!(field in analysis)) {
      throw new Error(`Missing required field in AI analysis: ${field}`);
    }
  }

  // Validate score range
  if (typeof analysis.overallScore !== 'number' ||
      analysis.overallScore < 0 ||
      analysis.overallScore > 100) {
    throw new Error('overallScore must be a number between 0 and 100');
  }

  // Validate nested structures
  if (!analysis.harmfulSubstances.count === undefined ||
      !Array.isArray(analysis.harmfulSubstances.details)) {
    throw new Error('harmfulSubstances must have count and details array');
  }

  if (!analysis.beneficialIngredients.count === undefined ||
      !Array.isArray(analysis.beneficialIngredients.details)) {
    throw new Error('beneficialIngredients must have count and details array');
  }

  // Validate microplastics risk value
  const validRisks = ['none', 'low', 'medium', 'high'];
  if (!validRisks.includes(analysis.microplasticsRisk)) {
    throw new Error(`microplasticsRisk must be one of: ${validRisks.join(', ')}`);
  }

  // Validate concerns is an array
  if (!Array.isArray(analysis.concerns)) {
    throw new Error('concerns must be an array');
  }
}

/**
 * Helper function to get a human-readable score label
 *
 * @param {number} score - Score from 0-100
 * @returns {string} Score label
 */
export function getScoreLabel(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
  if (score >= 40) return 'Poor';
  return 'Avoid';
}

/**
 * Helper function to get score color class
 *
 * @param {number} score - Score from 0-100
 * @returns {string} Tailwind color class
 */
export function getScoreColor(score) {
  if (score >= 90) return 'text-green-600';
  if (score >= 75) return 'text-blue-600';
  if (score >= 60) return 'text-yellow-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
}
