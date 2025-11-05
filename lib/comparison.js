// Utility functions for product comparison feature

// Calculate winner based on overall score
export function getComparisonWinner(products) {
  if (!products || products.length === 0) return null;

  const validProducts = products.filter(p => p.overall_score !== null && p.overall_score !== undefined);
  if (validProducts.length === 0) return null;

  return validProducts.reduce((winner, current) => {
    return current.overall_score > winner.overall_score ? current : winner;
  });
}

// Compare two products and return differences
export function compareProducts(product1, product2) {
  return {
    scoreDiff: Math.abs((product1.overall_score || 0) - (product2.overall_score || 0)),
    priceDiff: product1.price && product2.price ? Math.abs(product1.price - product2.price) : null,
    sameBrand: product1.brand === product2.brand,
    sameCategory: product1.category === product2.category,
  };
}

// Get contaminant data for comparison
export function getContaminantComparison(products, contaminants) {
  const contaminantTypes = ['Lead', 'Arsenic', 'Cadmium', 'Mercury'];
  const comparison = {};

  contaminantTypes.forEach(type => {
    comparison[type] = products.map(product => {
      const productContaminants = contaminants.filter(c =>
        c.product_id === product.id && c.contaminant_name === type
      );

      if (productContaminants.length === 0) return null;

      // Get the most recent or highest reading
      const contaminant = productContaminants.reduce((max, c) =>
        c.amount_detected > max.amount_detected ? c : max
      );

      return {
        amount: contaminant.amount_detected,
        unit: contaminant.unit,
        exceedsLimit: contaminant.exceeds_limit,
        safetyLimit: contaminant.safety_limit,
      };
    });
  });

  return comparison;
}

// Generate shareable link for comparison
export function generateComparisonShareLink(productIds) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const ids = productIds.join(',');
  return `${baseUrl}/compare?products=${ids}`;
}

// Parse product IDs from URL query
export function parseComparisonQuery(query) {
  if (!query) return [];
  return query.split(',').filter(id => id.length > 0);
}

// Calculate comparison summary
export function getComparisonSummary(products) {
  const validProducts = products.filter(p => p.overall_score !== null);

  if (validProducts.length === 0) {
    return {
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      scoreRange: 0,
      recommendation: null,
    };
  }

  const scores = validProducts.map(p => p.overall_score);
  const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);
  const scoreRange = highestScore - lowestScore;

  const winner = getComparisonWinner(validProducts);

  return {
    averageScore: Math.round(averageScore),
    highestScore,
    lowestScore,
    scoreRange,
    recommendation: winner ? {
      productId: winner.id,
      productName: winner.name,
      score: winner.overall_score,
    } : null,
  };
}

// Validate product limit for comparison
export function validateComparisonLimit(count) {
  if (count < 2) {
    return { valid: false, message: 'Please select at least 2 products to compare' };
  }
  if (count > 4) {
    return { valid: false, message: 'You can compare up to 4 products at a time' };
  }
  return { valid: true };
}

// Format comparison data for PDF export
export function formatComparisonForExport(products, contaminants, summary) {
  return {
    generatedAt: new Date().toISOString(),
    products: products.map(p => ({
      name: p.name,
      brand: p.brand,
      category: p.category,
      score: p.overall_score,
      price: p.price,
    })),
    contaminants: getContaminantComparison(products, contaminants),
    summary,
    disclaimer: 'This comparison is based on independent lab test results. Always consult with your pediatrician.',
  };
}
