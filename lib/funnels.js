// Analytics Funnel Definitions
// Define key conversion funnels for PostHog

/**
 * Funnel 1: Free to Pro Conversion
 * Tracks the journey from first app open to subscription
 */
export const FREE_TO_PRO_FUNNEL = {
  name: 'Free to Pro Conversion',
  description: 'User journey from free tier to paid subscription',
  steps: [
    {
      event: 'app_opened',
      name: 'App Opened',
      description: 'User opens the app for the first time',
    },
    {
      event: 'product_scanned',
      name: 'First Scan',
      description: 'User scans their first product',
      filters: {
        scan_count: 1,
      },
    },
    {
      event: 'product_scanned',
      name: '3rd Scan',
      description: 'User hits the free tier limit',
      filters: {
        scan_count: 3,
      },
    },
    {
      event: 'paywall_viewed',
      name: 'Paywall Viewed',
      description: 'User sees the upgrade prompt',
    },
    {
      event: 'upgrade_clicked',
      name: 'Upgrade Clicked',
      description: 'User clicks the upgrade button',
    },
    {
      event: 'checkout_started',
      name: 'Checkout Started',
      description: 'User begins Stripe checkout',
    },
    {
      event: 'subscription_created',
      name: 'Subscription Created',
      description: 'User completes payment',
    },
  ],
};

/**
 * Funnel 2: Product Discovery
 * Tracks how users discover and engage with products
 */
export const PRODUCT_DISCOVERY_FUNNEL = {
  name: 'Product Discovery',
  description: 'User journey from opening app to favoriting products',
  steps: [
    {
      event: 'app_opened',
      name: 'App Opened',
      description: 'User opens the app',
    },
    {
      event: 'product_searched',
      name: 'Product Search or Scan',
      description: 'User searches or scans a product',
      alternativeEvents: ['product_scanned'],
    },
    {
      event: 'product_viewed',
      name: 'Product Viewed',
      description: 'User views product details',
    },
    {
      event: 'score_viewed',
      name: 'Score Viewed',
      description: 'User views safety score',
    },
    {
      event: 'product_favorited',
      name: 'Product Favorited',
      description: 'User saves product to favorites',
    },
  ],
};

/**
 * Funnel 3: Comparison Feature
 * Tracks users who try to compare products (pro feature)
 */
export const COMPARISON_FUNNEL = {
  name: 'Comparison Feature Usage',
  description: 'User journey when using product comparison',
  steps: [
    {
      event: 'product_viewed',
      name: 'Product Viewed',
      description: 'User views a product',
    },
    {
      event: 'comparison_started',
      name: 'Comparison Started',
      description: 'User starts comparing products',
    },
    {
      event: 'paywall_viewed',
      name: 'Paywall Viewed',
      description: 'Free user hits comparison paywall',
      filters: {
        trigger: 'comparison',
      },
    },
    {
      event: 'upgrade_clicked',
      name: 'Upgrade Clicked',
      description: 'User clicks upgrade from comparison',
    },
  ],
};

/**
 * Funnel 4: Onboarding Activation
 * Measures how quickly new users activate
 */
export const ONBOARDING_ACTIVATION_FUNNEL = {
  name: 'Onboarding Activation',
  description: 'Time to first valuable action',
  steps: [
    {
      event: 'app_opened',
      name: 'App Opened',
      description: 'User opens app for first time',
    },
    {
      event: 'account_created',
      name: 'Account Created',
      description: 'User signs up',
    },
    {
      event: 'product_scanned',
      name: 'First Scan',
      description: 'User scans first product (activation)',
      filters: {
        scan_count: 1,
      },
    },
  ],
  timeframe: '24 hours', // Measure activation within 24 hours
};

/**
 * Funnel 5: Retention Loop
 * Tracks returning users
 */
export const RETENTION_FUNNEL = {
  name: 'User Retention',
  description: 'Measuring user return rates',
  steps: [
    {
      event: 'account_created',
      name: 'Account Created',
      description: 'User signs up',
    },
    {
      event: 'day_7_return',
      name: '7-Day Return',
      description: 'User returns after 7 days',
    },
    {
      event: 'day_30_return',
      name: '30-Day Return',
      description: 'User returns after 30 days',
    },
  ],
};

/**
 * All funnels combined for export
 */
export const ALL_FUNNELS = [
  FREE_TO_PRO_FUNNEL,
  PRODUCT_DISCOVERY_FUNNEL,
  COMPARISON_FUNNEL,
  ONBOARDING_ACTIVATION_FUNNEL,
  RETENTION_FUNNEL,
];

/**
 * PostHog dashboard configuration (JSON export)
 * Import this into PostHog to set up your dashboard
 */
export const POSTHOG_DASHBOARD_CONFIG = {
  name: 'SafeBaby - KPI Dashboard',
  description: 'Key metrics for SafeBaby product analytics',
  tiles: [
    // Acquisition Metrics
    {
      name: 'New Users (Daily)',
      type: 'TRENDS',
      filters: {
        events: [{ id: 'account_created', math: 'dau' }],
        date_from: '-30d',
      },
    },
    {
      name: 'App Opens by Source',
      type: 'TRENDS',
      filters: {
        events: [{ id: 'app_opened' }],
        breakdown: 'source',
        date_from: '-30d',
      },
    },

    // Activation Metrics
    {
      name: 'Time to First Scan',
      type: 'TRENDS',
      filters: {
        events: [{ id: 'product_scanned' }],
        math: 'avg',
        math_property: 'time_since_signup',
        date_from: '-30d',
      },
    },
    {
      name: 'Activation Rate (% who scan)',
      type: 'FUNNEL',
      filters: {
        funnel_viz_type: 'steps',
        events: [
          { id: 'account_created' },
          { id: 'product_scanned', order: 0 },
        ],
        date_from: '-30d',
      },
    },

    // Engagement Metrics
    {
      name: 'Total Scans (Daily)',
      type: 'TRENDS',
      filters: {
        events: [{ id: 'product_scanned' }],
        date_from: '-30d',
      },
    },
    {
      name: 'Products Favorited',
      type: 'TRENDS',
      filters: {
        events: [{ id: 'product_favorited' }],
        date_from: '-30d',
      },
    },

    // Monetization Metrics
    {
      name: 'Free to Pro Conversion',
      type: 'FUNNEL',
      filters: {
        funnel_viz_type: 'steps',
        events: FREE_TO_PRO_FUNNEL.steps.map((step, i) => ({
          id: step.event,
          order: i,
          ...step.filters,
        })),
        date_from: '-30d',
      },
    },
    {
      name: 'Paywall Views',
      type: 'TRENDS',
      filters: {
        events: [{ id: 'paywall_viewed' }],
        breakdown: 'trigger',
        date_from: '-30d',
      },
    },
    {
      name: 'Subscription Created',
      type: 'TRENDS',
      filters: {
        events: [{ id: 'subscription_created' }],
        breakdown: 'plan',
        date_from: '-30d',
      },
    },

    // Retention Metrics
    {
      name: '7-Day Retention',
      type: 'RETENTION',
      filters: {
        target_event: { id: 'app_opened' },
        returning_event: { id: 'app_opened' },
        date_from: '-90d',
        retention_type: 'retention_first_time',
        period: 'Day',
      },
    },
    {
      name: 'Churn Rate',
      type: 'TRENDS',
      filters: {
        events: [{ id: 'subscription_cancelled' }],
        date_from: '-90d',
      },
    },

    // Error Tracking
    {
      name: 'API Errors',
      type: 'TRENDS',
      filters: {
        events: [{ id: 'api_error' }],
        breakdown: 'endpoint',
        date_from: '-7d',
      },
    },
    {
      name: 'Scan Failures',
      type: 'TRENDS',
      filters: {
        events: [{ id: 'scan_failed' }],
        breakdown: 'reason',
        date_from: '-7d',
      },
    },
  ],
};

/**
 * Export dashboard config as JSON for PostHog import
 */
export function exportDashboardConfig() {
  return JSON.stringify(POSTHOG_DASHBOARD_CONFIG, null, 2);
}
