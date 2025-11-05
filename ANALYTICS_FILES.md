# Analytics Files Reference

All files created for the SafeBaby analytics infrastructure.

## Core Analytics Files

### 1. Analytics Library
**File**: `/lib/analytics.js`
- PostHog initialization
- 30+ event tracking functions
- User identification and properties
- Privacy controls (opt-in/opt-out)
- Feature flag utilities

### 2. Analytics Provider
**File**: `/components/AnalyticsProvider.jsx`
- React context provider
- Auto-tracks page views
- Handles UTM parameters
- Tracks JavaScript errors
- Monitors page load performance

### 3. Funnel Definitions
**File**: `/lib/funnels.js`
- 5 key conversion funnels
- PostHog dashboard configuration
- Funnel export for PostHog import

## Feature Flags & A/B Testing

### 4. Feature Flag Hooks
**File**: `/hooks/useFeatureFlag.js`
- `useFeatureFlag()` - Get flag value
- `useFeatureFlagEnabled()` - Check if enabled
- `useAllFeatureFlags()` - Get all flags
- Predefined A/B test definitions
- Specialized hooks for each test

### 5. A/B Test Wrapper
**File**: `/components/ABTestWrapper.jsx`
- Generic wrapper component
- Variant rendering
- Specialized test components

## Dashboard & Admin

### 6. Analytics Dashboard
**File**: `/app/admin/analytics/page.jsx`
- Visual KPI dashboard
- Real-time metrics
- Acquisition, activation, monetization, retention
- Links to PostHog and Stripe

### 7. Analytics API Route
**File**: `/app/api/admin/analytics/route.js`
- Fetches data from Supabase
- Integrates Stripe subscription data
- Calculates KPIs (MRR, ARPU, LTV, etc.)
- Returns JSON metrics

## Privacy & Compliance

### 8. Cookie Consent Banner
**File**: `/components/CookieConsent.jsx`
- GDPR/CCPA compliant
- Accept/Reject/Necessary-only options
- Detailed cookie information
- Persistent consent status

### 9. Privacy Settings Page
**File**: `/app/settings/privacy/page.jsx`
- Cookie preference management
- Data collection transparency
- User data rights (GDPR/CCPA)
- Account deletion option

## Configuration

### 10. Environment Template
**File**: `.env.local.template` (updated)
- PostHog API keys
- PostHog host configuration
- Personal API key (optional)
- Project ID (optional)

### 11. App Layout
**File**: `/app/layout.js` (updated)
- AnalyticsProvider integration
- CookieConsent component
- Wraps entire app

## Documentation

### 12. Setup Guide
**File**: `/ANALYTICS_SETUP.md`
- Complete setup instructions
- Event catalog
- Funnel descriptions
- A/B test guide
- Privacy compliance details
- Troubleshooting

### 13. Integration Guide
**File**: `/ANALYTICS_INTEGRATION.md`
- Code examples for common scenarios
- Quick reference
- Copy-paste snippets
- Testing checklist

### 14. Files Reference
**File**: `/ANALYTICS_FILES.md` (this file)
- Complete file listing
- File purposes
- Cross-references

## Dependencies

### 15. Package Updates
**File**: `/package.json` (updated)
- Added: `posthog-js@^1.285.1`

---

## File Tree

```
/Users/dominickhill/Baby-food/
├── lib/
│   ├── analytics.js                      # Core analytics library
│   └── funnels.js                        # Funnel definitions
├── hooks/
│   └── useFeatureFlag.js                 # A/B testing hooks
├── components/
│   ├── AnalyticsProvider.jsx             # Analytics context provider
│   ├── ABTestWrapper.jsx                 # A/B test wrapper
│   └── CookieConsent.jsx                 # GDPR/CCPA cookie consent
├── app/
│   ├── layout.js                         # Updated with analytics
│   ├── admin/
│   │   └── analytics/
│   │       └── page.jsx                  # Admin dashboard
│   ├── api/
│   │   └── admin/
│   │       └── analytics/
│   │           └── route.js              # Analytics API
│   └── settings/
│       └── privacy/
│           └── page.jsx                  # Privacy settings
├── .env.local.template                   # Updated with PostHog config
├── package.json                          # Updated with posthog-js
├── ANALYTICS_SETUP.md                    # Complete setup guide
├── ANALYTICS_INTEGRATION.md              # Integration examples
└── ANALYTICS_FILES.md                    # This file
```

---

## Event Tracking Functions

**Location**: `/lib/analytics.js`

### Acquisition
- `trackPageView()`
- `trackAppOpened()`
- `trackSource()`

### Activation
- `trackAccountCreated()`
- `trackProductScanned()`
- `trackProductSearched()`
- `trackProductViewed()`

### Engagement
- `trackProductFavorited()`
- `trackProductUnfavorited()`
- `trackComparisonStarted()`
- `trackScoreViewed()`
- `trackBlogPostRead()`

### Monetization
- `trackPaywallViewed()`
- `trackUpgradeClicked()`
- `trackCheckoutStarted()`
- `trackSubscriptionCreated()`
- `trackSubscriptionCancelled()`

### Retention
- `trackReturn()`
- `trackNotificationClicked()`

### Errors
- `trackApiError()`
- `trackScanFailed()`
- `trackSlowPageLoad()`
- `trackJsError()`

### User Management
- `identifyUser()`
- `updateUserProperties()`
- `resetUser()`

### Privacy
- `optInAnalytics()`
- `optOutAnalytics()`
- `hasOptedOut()`

### Feature Flags
- `getFeatureFlag()`
- `isFeatureFlagEnabled()`
- `getAllFeatureFlags()`

---

## Conversion Funnels

**Location**: `/lib/funnels.js`

1. **Free to Pro Conversion** - 7 steps from app open to subscription
2. **Product Discovery** - 5 steps from open to favorite
3. **Comparison Feature** - 4 steps from view to upgrade
4. **Onboarding Activation** - 3 steps to first scan
5. **User Retention** - 3 steps tracking long-term engagement

---

## A/B Tests

**Location**: `/hooks/useFeatureFlag.js`

1. **Paywall Trigger Timing** - Test 3 vs 5 vs 10 scan limits
2. **Paywall Copy** - Test different value propositions
3. **Pricing Display** - Test $4/mo vs $0.13/day vs annual
4. **CTA Button Text** - Test different call-to-action phrases

---

## KPIs Tracked

**Dashboard**: `/app/admin/analytics`

### Acquisition
- Daily/weekly/monthly signups
- Cost per acquisition

### Activation
- % who scan within 24h
- Time to first scan
- Account creation rate

### Monetization
- Free-to-Pro conversion rate
- MRR (Monthly Recurring Revenue)
- ARR (Annual Recurring Revenue)
- ARPU (Average Revenue Per User)
- LTV (Lifetime Value)

### Retention
- Day 1/7/30 retention
- Monthly churn rate

### Engagement
- Total scans
- Daily active users
- Average scans per user

---

## Privacy Features

1. **Cookie Consent Banner** - First visit consent
2. **Privacy Settings** - User-controlled preferences
3. **Do Not Track** - Browser setting respect
4. **Opt-Out** - Complete tracking disable
5. **Data Deletion** - Account removal

---

## Quick Start

1. Copy `.env.local.template` to `.env.local`
2. Add PostHog API key from https://posthog.com
3. Restart Next.js dev server
4. Open app and check browser console
5. Verify events in PostHog dashboard

---

## Next Steps

1. Set up PostHog account
2. Configure environment variables
3. Test event tracking
4. Set up feature flags
5. Import dashboard configuration
6. Start monitoring KPIs
7. Run A/B tests

---

**Status**: Production Ready
**Last Updated**: November 2024
