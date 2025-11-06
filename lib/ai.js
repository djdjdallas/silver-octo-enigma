// AI-powered features using Claude 4.5 Sonnet
// Provides intelligent insights for baby food safety

import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = 'claude-sonnet-4-5-20250929';

/**
 * Translate lab results into parent-friendly language
 * Explains contaminant levels in context
 */
export async function translateLabResults(product, contaminants) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
    return null; // AI features disabled without API key
  }

  try {
    // Prepare contaminant data
    const contaminantData = contaminants.map(c => ({
      name: c.contaminant_name,
      detected: c.amount_detected,
      unit: c.unit || 'ppb',
      limit: c.safety_limit,
      exceeds: c.exceeds_limit,
    }));

    const prompt = `You are a baby food safety expert helping worried parents understand lab test results.

Product: ${product.name} by ${product.brand}
Safety Score: ${product.overall_score}/100
Category: ${product.category}

Lab Test Results:
${contaminantData.map(c => `- ${c.name}: ${c.detected} ${c.unit} (FDA limit: ${c.limit} ${c.unit}) ${c.exceeds ? '⚠️ EXCEEDS LIMIT' : '✓ Within limits'}`).join('\n')}

Task: Write a clear, reassuring but honest explanation for parents that:
1. Explains what these numbers mean in simple terms
2. Puts levels in context (% of FDA limit)
3. Explains real-world implications
4. Provides practical guidance (daily use vs occasional)
5. Mentions cumulative exposure considerations if relevant

Tone: Reassuring but honest, avoiding medical advice
Length: 2-3 paragraphs, 150-200 words
Format: Plain text, no markdown`;

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0].text;
  } catch (error) {
    console.error('AI translation error:', error);
    return null;
  }
}

/**
 * Generate intelligent insights for product comparison
 * Analyzes multiple products and provides actionable recommendations
 */
export async function generateComparisonInsights(products, contaminants) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
    return null;
  }

  try {
    // Group contaminants by product
    const productData = products.map(p => {
      const productContaminants = contaminants.filter(c => c.product_id === p.id);

      const contaminantLevels = {};
      productContaminants.forEach(c => {
        contaminantLevels[c.contaminant_name] = {
          amount: c.amount_detected,
          unit: c.unit || 'ppb',
          limit: c.safety_limit,
          exceeds: c.exceeds_limit,
        };
      });

      return {
        name: p.name,
        brand: p.brand,
        score: p.overall_score,
        category: p.category,
        contaminants: contaminantLevels,
      };
    });

    const prompt = `You are a baby food safety expert helping parents compare products.

Products being compared:
${productData.map((p, i) => `
${i + 1}. ${p.name} (${p.brand})
   Safety Score: ${p.score}/100
   Contaminants:
   ${Object.entries(p.contaminants).map(([name, data]) =>
     `   - ${name}: ${data.amount} ${data.unit} (limit: ${data.limit} ${data.unit})`
   ).join('\n')}
`).join('\n')}

Task: Provide practical comparison insights that help parents decide:
1. Which product is safest overall and specifically why
2. Key differences in contaminant levels (use percentages and relative comparisons)
3. Practical recommendations for usage (daily vs occasional)
4. Any important trade-offs or considerations
5. One clear recommendation

Requirements:
- Use simple, parent-friendly language
- Focus on actionable insights, not just data
- Be specific about which product and why
- Include reassurance where appropriate
- Mention if differences are minimal or significant

Tone: Helpful expert, reassuring but honest
Length: 3-4 paragraphs, 200-250 words
Format: Plain text with clear sections, no markdown`;

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0].text;
  } catch (error) {
    console.error('AI comparison insights error:', error);
    return null;
  }
}

/**
 * Generate personalized recall alert message
 * Creates urgent but helpful notifications for recalled products
 */
export async function generateRecallAlert(user, recalledProduct, recall, alternatives = []) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
    return null;
  }

  try {
    const alternativesText = alternatives.length > 0
      ? alternatives.map(a => `- ${a.name} (${a.brand}) - Score: ${a.overall_score}/100`).join('\n')
      : 'No specific alternatives available';

    const prompt = `You are a baby food safety assistant sending an urgent but helpful recall notification to a parent.

Recalled Product: ${recalledProduct.name} by ${recalledProduct.brand}
Recall Reason: ${recall.reason}
Risk Level: ${recall.risk_level}
Recall Date: ${recall.recall_date}
FDA Notice: ${recall.fda_url}

Context:
- This is a product the user has favorited/used
- ${recall.risk_level} indicates ${getRiskLevelDescription(recall.risk_level)}
- User needs to know: what to do immediately, why it matters, what alternatives exist

Suggested Safe Alternatives:
${alternativesText}

Task: Write a personalized recall notification that:
1. Clearly states what product is recalled (with brand)
2. Explains the specific issue in plain language
3. Tells them exactly what to do (stop use, return, dispose)
4. Provides context on urgency based on risk level
5. Suggests 2-3 specific alternative products if available
6. Includes link to FDA notice

Tone: Urgent but not alarming, helpful and action-oriented
Length: 3 short paragraphs, 150-180 words
Format: Email-friendly plain text, clear sections`;

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0].text;
  } catch (error) {
    console.error('AI recall alert error:', error);
    return null;
  }
}

/**
 * Helper function to get risk level descriptions
 */
function getRiskLevelDescription(riskLevel) {
  switch (riskLevel) {
    case 'Class I':
      return 'serious health problems or death';
    case 'Class II':
      return 'temporary health problems or slight threat';
    case 'Class III':
      return 'unlikely to cause adverse health reaction';
    default:
      return 'potential health concerns';
  }
}

/**
 * Generate AI-powered product recommendations
 * Based on user preferences, baby age, and safety patterns
 */
export async function generateRecommendations(userFavorites, babyAge, allProducts, limit = 5) {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
    return null;
  }

  try {
    // Prepare data with limited product set for efficiency
    const topProducts = allProducts
      .filter(p => p.overall_score >= 80) // Only safe products
      .sort((a, b) => b.overall_score - a.overall_score)
      .slice(0, 50); // Limit to top 50 to reduce token usage

    const favoritesData = userFavorites.map(f => ({
      name: f.name,
      brand: f.brand,
      category: f.category,
      score: f.overall_score,
    }));

    const productsData = topProducts.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      category: p.category,
      score: p.overall_score,
    }));

    const prompt = `You are a baby food nutrition and safety expert recommending products.

User's Current Favorites:
${favoritesData.map(f => `- ${f.name} (${f.brand}) - ${f.category} - Score: ${f.score}/100`).join('\n')}

Baby's Age: ${babyAge} months

Available Safe Products (score >= 80):
${productsData.map(p => `ID:${p.id}|${p.name}|${p.brand}|${p.category}|${p.score}`).join('\n')}

Task: Recommend ${limit} products that:
1. Have higher safety scores than current favorites
2. Provide dietary variety (different brands/categories)
3. Are age-appropriate for ${babyAge} months
4. Fill nutritional gaps
5. Rotate ingredients to minimize cumulative heavy metal exposure

Return ONLY a JSON array with this exact format:
[
  {
    "productId": "exact ID from list",
    "reason": "brief reason (20 words max)"
  }
]

Example:
[
  {"productId": "abc123", "reason": "Higher score with 40% less lead, provides variety from rice-based options"}
]`;

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    // Parse JSON response
    const text = response.content[0].text;
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const recommendations = JSON.parse(jsonMatch[0]);
      return recommendations;
    }

    return null;
  } catch (error) {
    console.error('AI recommendations error:', error);
    return null;
  }
}

/**
 * Check if AI features are enabled
 */
export function isAIEnabled() {
  return (
    process.env.ANTHROPIC_API_KEY &&
    process.env.ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here'
  );
}
