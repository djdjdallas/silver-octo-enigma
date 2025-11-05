// Age-based product recommendation utilities

// Calculate baby's age in months from birthdate
export function calculateAgeInMonths(birthdate) {
  if (!birthdate) return null;

  const birth = new Date(birthdate);
  const today = new Date();

  const years = today.getFullYear() - birth.getFullYear();
  const months = today.getMonth() - birth.getMonth();

  return years * 12 + months;
}

// Determine appropriate food stages for baby's age
export function getAppropriateStages(ageInMonths) {
  if (ageInMonths === null || ageInMonths === undefined) {
    return ['1', '2', '3', '4']; // All stages if age unknown
  }

  // FDA/AAP guidelines for introducing solid foods
  if (ageInMonths < 4) {
    return []; // Too young for solid foods
  } else if (ageInMonths < 6) {
    return ['1']; // Stage 1: Single-ingredient purees (4-6 months)
  } else if (ageInMonths < 8) {
    return ['1', '2']; // Stage 1-2: Simple combinations (6-8 months)
  } else if (ageInMonths < 12) {
    return ['1', '2', '3']; // Stage 1-3: Chunkier textures (8-12 months)
  } else {
    return ['1', '2', '3', '4']; // All stages (12+ months)
  }
}

// Get age-appropriate product categories
export function getAppropriateCategoriesForAge(ageInMonths) {
  if (ageInMonths === null || ageInMonths === undefined) {
    return ['cereal', 'puree', 'snack', 'juice', 'formula', 'teething', 'other'];
  }

  const categories = [];

  // Formula is appropriate at all ages
  categories.push('formula');

  if (ageInMonths >= 4) {
    categories.push('cereal', 'puree');
  }

  if (ageInMonths >= 6) {
    categories.push('juice'); // In moderation
  }

  if (ageInMonths >= 8) {
    categories.push('snack', 'teething');
  }

  categories.push('other'); // Always include other

  return categories;
}

// Get descriptive age range text
export function getAgeRangeText(minMonths, maxMonths) {
  if (!minMonths && !maxMonths) {
    return 'All ages';
  }

  if (minMonths && !maxMonths) {
    return `${minMonths}+ months`;
  }

  if (!minMonths && maxMonths) {
    return `Up to ${maxMonths} months`;
  }

  return `${minMonths}-${maxMonths} months`;
}

// Get stage description
export function getStageDescription(stage) {
  const descriptions = {
    '1': 'Single-ingredient smooth purees (4-6 months)',
    '2': 'Simple combinations with smooth texture (6-8 months)',
    '3': 'Chunkier textures and more complex flavors (8-12 months)',
    '4': 'Soft finger foods and table foods (12+ months)',
  };

  return descriptions[stage] || 'Unknown stage';
}

// Get age milestone text
export function getAgeMilestone(ageInMonths) {
  if (ageInMonths === null || ageInMonths === undefined) {
    return null;
  }

  if (ageInMonths < 4) {
    return 'Too young for solid foods - formula or breast milk only';
  } else if (ageInMonths < 6) {
    return 'Starting solids - Single-ingredient purees';
  } else if (ageInMonths < 8) {
    return 'Exploring flavors - Simple combinations';
  } else if (ageInMonths < 10) {
    return 'Developing chewing - Chunkier textures';
  } else if (ageInMonths < 12) {
    return 'Advanced eater - Soft finger foods';
  } else if (ageInMonths < 18) {
    return 'Toddler foods - More variety and textures';
  } else {
    return 'Eating family foods - Wide variety';
  }
}

// Check if product is age-appropriate
export function isProductAgeAppropriate(product, babyAgeInMonths) {
  if (babyAgeInMonths === null || babyAgeInMonths === undefined) {
    return true; // Show all if age unknown
  }

  // Check min age
  if (product.min_age_months && babyAgeInMonths < product.min_age_months) {
    return false;
  }

  // Check max age
  if (product.max_age_months && babyAgeInMonths > product.max_age_months) {
    return false;
  }

  // Check stage
  if (product.stage) {
    const appropriateStages = getAppropriateStages(babyAgeInMonths);
    if (!appropriateStages.includes(product.stage)) {
      return false;
    }
  }

  return true;
}

// Get personalized recommendation text
export function getRecommendationText(ageInMonths) {
  if (ageInMonths === null || ageInMonths === undefined) {
    return 'Add your baby\'s birthdate to get personalized recommendations';
  }

  if (ageInMonths < 4) {
    return 'Your baby is not yet ready for solid foods. Continue with formula or breast milk.';
  } else if (ageInMonths < 6) {
    return 'Perfect time to start solids! Try single-ingredient Stage 1 purees like sweet potato, peas, or bananas.';
  } else if (ageInMonths < 8) {
    return 'Your baby is ready for more variety! Try Stage 2 combinations with multiple ingredients.';
  } else if (ageInMonths < 12) {
    return 'Time for chunkier textures! Stage 3 foods help develop chewing skills.';
  } else {
    return 'Your toddler can enjoy a wide variety of foods! Focus on nutrition and low contaminant levels.';
  }
}

// Format age for display
export function formatAge(ageInMonths) {
  if (ageInMonths === null || ageInMonths === undefined) {
    return 'Age not set';
  }

  if (ageInMonths < 12) {
    return `${ageInMonths} ${ageInMonths === 1 ? 'month' : 'months'} old`;
  }

  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;

  if (months === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'} old`;
  }

  return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'} old`;
}

// Calculate max birthdate (babies only, not older children)
export function getMaxBirthdate() {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Today
}

// Calculate min birthdate (5 years ago - reasonable limit)
export function getMinBirthdate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 5);
  return date.toISOString().split('T')[0];
}

// Validate birthdate
export function validateBirthdate(birthdate) {
  if (!birthdate) {
    return { valid: false, message: 'Please enter a birthdate' };
  }

  const birth = new Date(birthdate);
  const today = new Date();
  const minDate = new Date(getMinBirthdate());

  if (birth > today) {
    return { valid: false, message: 'Birthdate cannot be in the future' };
  }

  if (birth < minDate) {
    return { valid: false, message: 'Birthdate must be within the last 5 years' };
  }

  return { valid: true };
}
