// Utility functions for the application
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes properly
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format date to readable string
export function formatDate(date) {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Calculate health score color
export function getScoreColor(score) {
  if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
  if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-red-600 bg-red-50 border-red-200';
}

// Get score badge text
export function getScoreBadge(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Fair';
  if (score >= 40) return 'Poor';
  return 'Unsafe';
}

// Get simple safety indicator for free users (Safe/Caution/Avoid)
export function getSafetyIndicator(score) {
  if (score >= 70) return { label: 'Safe', color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-50' };
  if (score >= 50) return { label: 'Caution', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgLight: 'bg-yellow-50' };
  return { label: 'Avoid', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50' };
}

// Check if contaminant exceeds safe limit
export function checkSafetyLimit(amount, limit) {
  if (!limit) return false;
  return amount > limit;
}

// Format contaminant amount
export function formatContaminant(amount, unit = 'ppb') {
  return `${amount.toFixed(2)} ${unit}`;
}

// Calculate subscription expiry
export function isSubscriptionActive(expiresAt) {
  if (!expiresAt) return false;
  return new Date(expiresAt) > new Date();
}

// Get user subscription tier
export function getUserTier(profile) {
  // Check for bypass flag (for testing/development)
  if (process.env.NEXT_PUBLIC_BYPASS_PREMIUM === 'true') {
    return 'pro';
  }

  if (!profile) return 'free';
  if (profile.subscription_tier === 'pro' && isSubscriptionActive(profile.subscription_expires_at)) {
    return 'pro';
  }
  return 'free';
}

// Truncate text
export function truncate(text, length = 100) {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

// Generate product URL slug
export function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Generate product slug from name and brand
export function generateProductSlug(product) {
  if (!product) return '';
  // Create slug from brand and name for better SEO
  const parts = [];
  if (product.brand) parts.push(product.brand);
  if (product.name) parts.push(product.name);
  return generateSlug(parts.join(' '));
}

// Get brand slug
export function getBrandSlug(brandName) {
  return generateSlug(brandName);
}

// Debounce function for search
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Get product category icon name
export function getCategoryIcon(category) {
  const icons = {
    cereal: 'Wheat',
    puree: 'Apple',
    snack: 'Cookie',
    juice: 'Coffee',
    formula: 'Milk',
    teething: 'Baby',
    other: 'Package',
  };
  return icons[category] || 'Package';
}

// Share product
export async function shareProduct(product) {
  const shareData = {
    title: `${product.name} - SafeBaby`,
    text: `Check out the safety rating for ${product.name} on SafeBaby`,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/product/${product.id}`,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (err) {
      console.error('Error sharing:', err);
      return false;
    }
  } else {
    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareData.url);
      return true;
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      return false;
    }
  }
}
