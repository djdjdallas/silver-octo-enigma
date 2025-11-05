// PostHog Analytics Library
// Comprehensive analytics tracking for SafeBaby

import posthog from 'posthog-js';

// Track if PostHog has been initialized
let isInitialized = false;

/**
 * Initialize PostHog with configuration
 * Call this once at app startup
 */
export function initPostHog() {
  if (typeof window === 'undefined') return;
  if (isInitialized) return;

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

  if (!posthogKey) {
    console.warn('PostHog key not found. Analytics disabled.');
    return;
  }

  // Check if user has opted out
  const hasOptedOut = localStorage.getItem('analytics_opted_out') === 'true';
  if (hasOptedOut) {
    console.log('Analytics opted out by user');
    return;
  }

  posthog.init(posthogKey, {
    api_host: posthogHost,
    // Enable session recording for UX debugging
    session_recording: {
      recordCrossOriginIframes: true,
    },
    // Enable autocapture for basic interactions
    autocapture: true,
    // Enable feature flags for A/B testing
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') {
        posthog.debug();
      }
    },
    // Performance monitoring
    capture_pageview: true,
    capture_pageleave: true,
    // Privacy settings
    respect_dnt: true,
    persistence: 'localStorage+cookie',
  });

  isInitialized = true;
}

/**
 * Identify a user with properties
 * Call this after user logs in or signs up
 */
export function identifyUser(userId, properties = {}) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.identify(userId, properties);
}

/**
 * Reset user identity (e.g., on logout)
 */
export function resetUser() {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.reset();
}

/**
 * Update user properties
 */
export function updateUserProperties(properties) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.people.set(properties);
}

/**
 * Opt out of analytics tracking
 */
export function optOutAnalytics() {
  localStorage.setItem('analytics_opted_out', 'true');
  if (isInitialized) {
    posthog.opt_out_capturing();
  }
}

/**
 * Opt in to analytics tracking
 */
export function optInAnalytics() {
  localStorage.removeItem('analytics_opted_out');
  if (!isInitialized) {
    initPostHog();
  } else {
    posthog.opt_in_capturing();
  }
}

/**
 * Check if user has opted out
 */
export function hasOptedOut() {
  return localStorage.getItem('analytics_opted_out') === 'true';
}

// ==============================================
// ACQUISITION EVENTS
// ==============================================

/**
 * Track page view
 */
export function trackPageView(pageName, properties = {}) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('$pageview', {
    page_name: pageName,
    ...properties,
  });
}

/**
 * Track app opened (PWA)
 */
export function trackAppOpened(source = 'unknown') {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('app_opened', {
    source, // 'browser' | 'pwa' | 'home_screen'
    is_standalone: window.matchMedia('(display-mode: standalone)').matches,
    is_mobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
  });
}

/**
 * Track source parameters (UTM tracking)
 */
export function trackSource(utmParams) {
  if (!isInitialized || typeof window === 'undefined') return;

  const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = utmParams;

  posthog.capture('source_tracked', {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
  });

  // Also set as user properties for segmentation
  posthog.people.set({
    utm_source: utm_source || 'direct',
    utm_campaign: utm_campaign || 'none',
  });
}

// ==============================================
// ACTIVATION EVENTS
// ==============================================

/**
 * Track product scanned
 */
export function trackProductScanned(productUpc, scanMethod, scanCount = 1, isPro = false) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('product_scanned', {
    upc: productUpc,
    method: scanMethod, // 'camera' | 'manual'
    scan_count: scanCount,
    is_pro: isPro,
    timestamp: new Date().toISOString(),
  });

  // Update user properties
  posthog.people.set({
    total_scans: scanCount,
    last_scan_date: new Date().toISOString(),
  });

  // Set first scan date if this is the first scan
  if (scanCount === 1) {
    posthog.people.set_once({
      first_scan_date: new Date().toISOString(),
    });
  }
}

/**
 * Track product searched
 */
export function trackProductSearched(query, resultsCount = 0) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('product_searched', {
    query,
    results_count: resultsCount,
    query_length: query.length,
  });
}

/**
 * Track product viewed
 */
export function trackProductViewed(productId, productName, productBrand, isPro = false) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('product_viewed', {
    product_id: productId,
    product_name: productName,
    product_brand: productBrand,
    is_pro: isPro,
  });
}

/**
 * Track account created
 */
export function trackAccountCreated(userId, signupMethod = 'email') {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('account_created', {
    signup_method: signupMethod, // 'email' | 'google' | 'apple'
    signup_date: new Date().toISOString(),
  });

  // Identify the user
  identifyUser(userId, {
    signup_date: new Date().toISOString(),
    signup_method: signupMethod,
    is_pro: false,
    subscription_tier: 'free',
  });
}

// ==============================================
// ENGAGEMENT EVENTS
// ==============================================

/**
 * Track product favorited
 */
export function trackProductFavorited(productId, productName, totalFavorites = 1) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('product_favorited', {
    product_id: productId,
    product_name: productName,
    total_favorites: totalFavorites,
  });

  // Update user properties
  posthog.people.set({
    total_favorites: totalFavorites,
  });
}

/**
 * Track product unfavorited
 */
export function trackProductUnfavorited(productId, totalFavorites = 0) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('product_unfavorited', {
    product_id: productId,
    total_favorites: totalFavorites,
  });

  // Update user properties
  posthog.people.set({
    total_favorites: totalFavorites,
  });
}

/**
 * Track comparison started
 */
export function trackComparisonStarted(productIds, isPro = false) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('comparison_started', {
    product_count: productIds.length,
    product_ids: productIds,
    is_pro: isPro,
  });
}

/**
 * Track safety score viewed
 */
export function trackScoreViewed(productId, score, isPro = false, scoreType = 'limited') {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('score_viewed', {
    product_id: productId,
    score,
    is_pro: isPro,
    score_type: scoreType, // 'limited' | 'full'
  });
}

/**
 * Track blog post read
 */
export function trackBlogPostRead(postId, postTitle, readTime = 0) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('blog_post_read', {
    post_id: postId,
    post_title: postTitle,
    read_time_seconds: readTime,
  });
}

// ==============================================
// MONETIZATION EVENTS
// ==============================================

/**
 * Track paywall viewed
 */
export function trackPaywallViewed(trigger, location, scanCount = 0, metadata = {}) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('paywall_viewed', {
    trigger, // '3_scans' | 'comparison' | 'favorites_limit' | 'full_score'
    location, // 'modal' | 'inline' | 'banner'
    scan_count: scanCount,
    ...metadata,
  });
}

/**
 * Track upgrade clicked
 */
export function trackUpgradeClicked(source, plan = 'monthly') {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('upgrade_clicked', {
    source, // 'paywall' | 'settings' | 'banner'
    plan, // 'monthly' | 'annual'
  });
}

/**
 * Track checkout started
 */
export function trackCheckoutStarted(plan, price) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('checkout_started', {
    plan, // 'monthly' | 'annual'
    price,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track subscription created
 */
export function trackSubscriptionCreated(userId, plan, price) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('subscription_created', {
    plan, // 'monthly' | 'annual'
    price,
    timestamp: new Date().toISOString(),
  });

  // Update user properties
  posthog.people.set({
    is_pro: true,
    subscription_tier: plan,
    upgrade_date: new Date().toISOString(),
  });
}

/**
 * Track subscription cancelled
 */
export function trackSubscriptionCancelled(reason = 'unknown') {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('subscription_cancelled', {
    reason,
    cancellation_date: new Date().toISOString(),
  });

  // Update user properties
  posthog.people.set({
    is_pro: false,
    subscription_tier: 'free',
    cancellation_date: new Date().toISOString(),
  });
}

// ==============================================
// RETENTION EVENTS
// ==============================================

/**
 * Track return visit
 */
export function trackReturn(daysSinceSignup) {
  if (!isInitialized || typeof window === 'undefined') return;

  // Track specific milestones
  if (daysSinceSignup === 7) {
    posthog.capture('day_7_return', {
      days_since_signup: 7,
    });
  } else if (daysSinceSignup === 30) {
    posthog.capture('day_30_return', {
      days_since_signup: 30,
    });
  }

  // Update last active date
  posthog.people.set({
    last_active_date: new Date().toISOString(),
  });
}

/**
 * Track notification clicked
 */
export function trackNotificationClicked(notificationType, notificationId) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('notification_clicked', {
    notification_type: notificationType, // 'recall' | 'promotion' | 'engagement'
    notification_id: notificationId,
  });
}

// ==============================================
// ERROR & PERFORMANCE TRACKING
// ==============================================

/**
 * Track API error
 */
export function trackApiError(endpoint, errorCode, errorMessage) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('api_error', {
    endpoint,
    error_code: errorCode,
    error_message: errorMessage,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track scan failed
 */
export function trackScanFailed(reason) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('scan_failed', {
    reason, // 'camera_permission' | 'invalid_barcode' | 'timeout'
  });
}

/**
 * Track slow page load
 */
export function trackSlowPageLoad(pageName, loadTime) {
  if (!isInitialized || typeof window === 'undefined') return;

  if (loadTime > 3000) {
    posthog.capture('slow_page_load', {
      page_name: pageName,
      load_time_ms: loadTime,
    });
  }
}

/**
 * Track JavaScript error
 */
export function trackJsError(error, errorInfo = {}) {
  if (!isInitialized || typeof window === 'undefined') return;

  posthog.capture('javascript_error', {
    error_message: error.message,
    error_stack: error.stack,
    ...errorInfo,
  });
}

// ==============================================
// FEATURE FLAGS & A/B TESTING
// ==============================================

/**
 * Get feature flag value
 */
export function getFeatureFlag(flagName) {
  if (!isInitialized || typeof window === 'undefined') return null;

  return posthog.getFeatureFlag(flagName);
}

/**
 * Check if feature flag is enabled
 */
export function isFeatureFlagEnabled(flagName) {
  if (!isInitialized || typeof window === 'undefined') return false;

  return posthog.isFeatureEnabled(flagName);
}

/**
 * Get all active feature flags
 */
export function getAllFeatureFlags() {
  if (!isInitialized || typeof window === 'undefined') return {};

  return posthog.getFeatureFlags();
}

// Export the posthog instance for direct access if needed
export { posthog };
