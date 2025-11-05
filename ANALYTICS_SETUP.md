# SafeBaby Analytics Setup Guide

Comprehensive analytics tracking with PostHog for measuring KPIs and optimizing conversion.

## Table of Contents
- [Overview](#overview)
- [PostHog Setup](#posthog-setup)
- [Environment Configuration](#environment-configuration)
- [Events Tracked](#events-tracked)
- [Conversion Funnels](#conversion-funnels)
- [A/B Testing](#ab-testing)
- [KPI Dashboard](#kpi-dashboard)
- [Privacy Compliance](#privacy-compliance)
- [Testing](#testing)

---

## Overview

SafeBaby uses **PostHog** for comprehensive product analytics:

- **Free Tier**: 1M events/month + session recordings
- **Features**: Event tracking, funnel analysis, A/B testing, session replay
- **Privacy**: GDPR/CCPA compliant with user opt-out

### What's Included

✅ PostHog integration with automatic initialization
✅ 30+ event types covering acquisition, activation, engagement, monetization, and retention
✅ 5 key conversion funnels pre-configured
✅ A/B test infrastructure with 4 active experiments
✅ Admin analytics dashboard (Supabase + Stripe data)
✅ Cookie consent banner (GDPR/CCPA compliant)
✅ Privacy settings page with opt-out option

---

## PostHog Setup

### 1. Create PostHog Account

1. Go to [https://posthog.com](https://posthog.com)
2. Sign up for a free account
3. Create a new project for SafeBaby

### 2. Get Your API Keys

**Project API Key (required):**
1. PostHog Dashboard → Settings → Project API Key
2. Copy the key starting with `phc_`

**Personal API Key (optional, for server-side analytics):**
1. PostHog Dashboard → Settings → Personal API Keys
2. Create a new key
3. Copy the key starting with `phx_`

**Project ID (optional):**
1. PostHog Dashboard → Settings
2. Copy the numeric Project ID

### 3. Configure Environment Variables

Copy `.env.local.template` to `.env.local` and add your keys:

```bash
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Optional: For server-side analytics
POSTHOG_API_KEY=phx_your_personal_key_here
POSTHOG_PROJECT_ID=12345
```

### 4. Import Dashboard Configuration

1. Go to PostHog Dashboard → Insights → Dashboards
2. Click "New Dashboard"
3. Import the configuration from `lib/funnels.js` (see POSTHOG_DASHBOARD_CONFIG)
4. Or manually create the dashboard using the funnel definitions

---

## Environment Configuration

### Required Variables

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxx  # From PostHog project settings
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Optional Variables

```bash
POSTHOG_API_KEY=phx_xxxx  # For server-side API calls
POSTHOG_PROJECT_ID=12345  # Your PostHog project ID
```

---

## Events Tracked

### Acquisition Events

| Event | Description | Properties |
|-------|-------------|------------|
| `app_opened` | User opens PWA | `source`, `is_standalone`, `is_mobile` |
| `source_tracked` | UTM parameters captured | `utm_source`, `utm_medium`, `utm_campaign` |
| `page_view` | Page navigation | `page_name`, `referrer`, `url` |

### Activation Events

| Event | Description | Properties |
|-------|-------------|------------|
| `account_created` | User signs up | `signup_method`, `signup_date` |
| `product_scanned` | Barcode scanned | `upc`, `method`, `scan_count`, `is_pro` |
| `product_searched` | Product search | `query`, `results_count` |
| `product_viewed` | Product details viewed | `product_id`, `product_name`, `is_pro` |

### Engagement Events

| Event | Description | Properties |
|-------|-------------|------------|
| `product_favorited` | Product saved | `product_id`, `total_favorites` |
| `comparison_started` | Comparison initiated | `product_count`, `product_ids`, `is_pro` |
| `score_viewed` | Safety score viewed | `product_id`, `score`, `score_type` |
| `blog_post_read` | Blog content read | `post_id`, `read_time_seconds` |

### Monetization Events

| Event | Description | Properties |
|-------|-------------|------------|
| `paywall_viewed` | Upgrade prompt shown | `trigger`, `location`, `scan_count` |
| `upgrade_clicked` | Upgrade CTA clicked | `source`, `plan` |
| `checkout_started` | Stripe checkout begun | `plan`, `price` |
| `subscription_created` | Payment completed | `plan`, `price` |
| `subscription_cancelled` | User cancels Pro | `reason` |

### Retention Events

| Event | Description | Properties |
|-------|-------------|------------|
| `day_7_return` | User returns after 7 days | `days_since_signup` |
| `day_30_return` | User returns after 30 days | `days_since_signup` |
| `notification_clicked` | Notification tapped | `notification_type`, `notification_id` |

### Error & Performance Events

| Event | Description | Properties |
|-------|-------------|------------|
| `api_error` | API call fails | `endpoint`, `error_code`, `error_message` |
| `scan_failed` | Barcode scan fails | `reason` |
| `slow_page_load` | Page loads >3s | `page_name`, `load_time_ms` |
| `javascript_error` | JS exception | `error_message`, `error_stack` |

---

## Conversion Funnels

### 1. Free to Pro Conversion

**Goal**: Track conversion from free user to paid subscriber

```
app_opened
  → product_scanned (1st)
  → product_scanned (3rd)
  → paywall_viewed
  → upgrade_clicked
  → checkout_started
  → subscription_created
```

**Expected Conversion**: 2-5% of free users

### 2. Product Discovery

**Goal**: Measure product engagement

```
app_opened
  → product_searched OR product_scanned
  → product_viewed
  → score_viewed
  → product_favorited
```

**Expected Conversion**: 40-60% to favorites

### 3. Comparison Feature

**Goal**: Track Pro feature usage leading to upgrades

```
product_viewed
  → comparison_started
  → paywall_viewed (if free)
  → upgrade_clicked
```

**Expected Conversion**: 10-15% of comparison attempts

### 4. Onboarding Activation

**Goal**: Time to first valuable action

```
app_opened
  → account_created
  → product_scanned (within 24h)
```

**Expected Conversion**: 70-80% within 24h

### 5. User Retention

**Goal**: Long-term engagement

```
account_created
  → day_7_return
  → day_30_return
```

**Expected Retention**: 40% day-7, 25% day-30

---

## A/B Testing

### Setting Up Feature Flags

1. Go to PostHog → Feature Flags
2. Create a new feature flag
3. Set up variants and rollout percentage
4. Use in code with the hooks provided

### Active Experiments

#### 1. Paywall Trigger Timing

**Flag**: `paywall-trigger-timing`

**Variants**:
- `control`: Show after 3 scans (current)
- `variant-a`: Show after 5 scans
- `variant-b`: Show after 10 scans

**Hypothesis**: Showing paywall later increases conversion by building more trust

**Usage**:
```javascript
import { usePaywallTriggerLimit } from '@/hooks/useFeatureFlag';

const { limit, variant } = usePaywallTriggerLimit();
// limit will be 3, 5, or 10 based on variant
```

#### 2. Paywall Copy

**Flag**: `paywall-copy-test`

**Variants**:
- `control`: "Unlock Full Safety Scores"
- `variant-a`: "Protect Your Baby with Pro"
- `variant-b`: "See Which Foods Are Safest"

**Hypothesis**: Emotional framing ("Protect Your Baby") increases conversion

**Usage**:
```javascript
import { usePaywallCopy } from '@/hooks/useFeatureFlag';

const { copy, variant } = usePaywallCopy();
// Returns { title, subtitle }
```

#### 3. Pricing Display

**Flag**: `pricing-display-test`

**Variants**:
- `control`: "$4/month"
- `variant-a`: "$0.13/day"
- `variant-b`: "$4/month or $40/year (save 17%)"

**Hypothesis**: Daily pricing makes cost seem lower

**Usage**:
```javascript
import { usePricingDisplay } from '@/hooks/useFeatureFlag';

const { pricing, variant } = usePricingDisplay();
// Returns { primary, secondary }
```

#### 4. CTA Button Text

**Flag**: `cta-button-text`

**Variants**:
- `control`: "Upgrade to Pro"
- `variant-a`: "Start Free Trial"
- `variant-b`: "Get Unlimited Scans"

**Hypothesis**: Action-oriented CTAs increase clicks

**Usage**:
```javascript
import { useCtaButtonText } from '@/hooks/useFeatureFlag';

const { buttonText, variant } = useCtaButtonText();
```

### Creating Custom A/B Tests

```javascript
import ABTestWrapper from '@/components/ABTestWrapper';

<ABTestWrapper
  flagName="my-new-test"
  variants={{
    control: <ControlComponent />,
    'variant-a': <VariantAComponent />,
    'variant-b': <VariantBComponent />,
  }}
/>
```

---

## KPI Dashboard

### Accessing the Dashboard

Navigate to: `/admin/analytics`

### Metrics Displayed

#### Acquisition
- Daily/Weekly/Monthly signups
- Cost per acquisition (if running ads)

#### Activation
- % who scan within 24h
- Time to first scan (minutes)
- % who create account

#### Monetization
- **Free-to-Pro conversion rate** (%)
- **MRR** (Monthly Recurring Revenue)
- **ARR** (Annual Recurring Revenue)
- **ARPU** (Average Revenue Per User)
- **LTV** (Lifetime Value)

#### Retention
- Day 1/7/30 retention rates
- Monthly churn rate

#### Engagement
- Total scans
- Daily active users
- Average scans per user

### Data Sources

- **Supabase**: User data, account creation
- **Stripe**: Subscriptions, revenue
- **PostHog**: Events, user behavior (via API)

### Calculating Key Metrics

```javascript
// Free-to-Pro Conversion
conversion_rate = (pro_users / total_users) * 100

// MRR (Monthly Recurring Revenue)
mrr = sum(active_monthly_subscriptions) + sum(annual_subscriptions / 12)

// ARPU (Average Revenue Per User)
arpu = mrr / total_users

// LTV (Lifetime Value)
ltv = arpu / monthly_churn_rate

// Churn Rate
churn_rate = (cancelled_subscriptions / active_subscriptions) * 100
```

---

## Privacy Compliance

### GDPR/CCPA Features

✅ Cookie consent banner on first visit
✅ Opt-out option in privacy settings
✅ Respects Do Not Track browser setting
✅ Data deletion when user deletes account
✅ Transparent data collection disclosure

### Cookie Consent Flow

1. First-time visitor sees consent banner
2. User can:
   - **Accept All**: Enable all tracking
   - **Necessary Only**: Disable analytics
   - **Reject All**: Disable all non-essential cookies
3. Choice is saved in localStorage
4. Can be changed in Settings → Privacy

### Privacy Settings

Navigate to: `/settings/privacy`

**Features**:
- View current cookie preferences
- Change consent settings
- View data collection details
- Request data deletion
- Delete account

### Opting Out Programmatically

```javascript
import { optOutAnalytics, optInAnalytics } from '@/lib/analytics';

// Opt out
optOutAnalytics();

// Opt in
optInAnalytics();
```

### Checking Opt-Out Status

```javascript
import { hasOptedOut } from '@/lib/analytics';

if (hasOptedOut()) {
  console.log('User has opted out of analytics');
}
```

---

## Testing

### 1. Verify PostHog Initialization

1. Open browser DevTools → Console
2. Look for PostHog debug logs (in development)
3. Check Network tab for requests to PostHog API

### 2. Test Event Tracking

```javascript
import { trackProductScanned } from '@/lib/analytics';

// Trigger test event
trackProductScanned('012345678901', 'camera', 1, false);
```

Then check PostHog Dashboard → Events to see the event appear.

### 3. Test Feature Flags

1. Create a test feature flag in PostHog
2. Set it to show specific variant
3. Use the hook:

```javascript
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

const { value, isLoading } = useFeatureFlag('test-flag');
console.log('Flag value:', value);
```

### 4. Test Cookie Consent

1. Clear localStorage: `localStorage.clear()`
2. Reload the page
3. Cookie consent banner should appear
4. Accept/reject and verify tracking behavior

### 5. Test Analytics Dashboard

1. Navigate to `/admin/analytics`
2. Click "Refresh" to fetch latest data
3. Verify metrics are displaying
4. Check console for any API errors

### 6. Verify Privacy Compliance

1. Go to `/settings/privacy`
2. Change cookie preferences
3. Verify PostHog tracking stops/starts accordingly
4. Check localStorage for consent flags

---

## Implementation Examples

### Track User Sign Up

```javascript
import { trackAccountCreated, identifyUser } from '@/lib/analytics';

// After successful signup
trackAccountCreated(user.id, 'email');
identifyUser(user.id, {
  email: user.email,
  signup_date: new Date().toISOString(),
  is_pro: false,
});
```

### Track Product Scan

```javascript
import { trackProductScanned } from '@/lib/analytics';

// After successful scan
trackProductScanned(
  productUpc,
  'camera', // or 'manual'
  userScanCount,
  user.isPro
);
```

### Track Paywall View

```javascript
import { trackPaywallViewed } from '@/lib/analytics';

// When paywall is shown
trackPaywallViewed(
  '3_scans', // trigger: why was paywall shown
  'modal',   // location: how was it shown
  userScanCount
);
```

### Track Subscription Created

```javascript
import { trackSubscriptionCreated, updateUserProperties } from '@/lib/analytics';

// After Stripe webhook confirms subscription
trackSubscriptionCreated(userId, 'monthly', 4.00);
updateUserProperties({
  is_pro: true,
  subscription_tier: 'monthly',
  upgrade_date: new Date().toISOString(),
});
```

### Use A/B Test in Component

```javascript
import ABTestWrapper from '@/components/ABTestWrapper';

export default function UpgradePage() {
  return (
    <ABTestWrapper flagName="paywall-copy-test">
      {(variant) => {
        if (variant === 'variant-a') {
          return <h1>Protect Your Baby with Pro</h1>;
        } else if (variant === 'variant-b') {
          return <h1>See Which Foods Are Safest</h1>;
        }
        return <h1>Unlock Full Safety Scores</h1>;
      }}
    </ABTestWrapper>
  );
}
```

---

## Troubleshooting

### PostHog not initializing

**Problem**: No events showing in PostHog

**Solutions**:
1. Check `.env.local` has correct `NEXT_PUBLIC_POSTHOG_KEY`
2. Verify key starts with `phc_`
3. Check browser console for errors
4. Ensure user hasn't opted out

### Events not tracking

**Problem**: Specific events not appearing

**Solutions**:
1. Check if analytics is initialized: `isInitialized` in console
2. Verify user hasn't opted out: `localStorage.getItem('analytics_opted_out')`
3. Check browser Network tab for PostHog API calls
4. Ensure event is called after PostHog initialization

### Feature flags not working

**Problem**: Flags always return null

**Solutions**:
1. Check flag exists in PostHog dashboard
2. Verify flag is enabled and rolled out
3. Check if user is identified: PostHog needs user ID for flags
4. Wait for flags to load (use `isLoading` from hook)

### Analytics dashboard showing 0s

**Problem**: Admin dashboard shows no data

**Solutions**:
1. Check API route: `/api/admin/analytics`
2. Verify Supabase connection
3. Check Stripe API key is set
4. Look for errors in browser console
5. Ensure database has data

---

## Next Steps

1. **Set up PostHog account** and add API keys to `.env.local`
2. **Test locally** by triggering events and checking PostHog dashboard
3. **Configure feature flags** for A/B tests in PostHog
4. **Set up alerts** in PostHog for critical metrics (churn, errors)
5. **Monitor conversion funnels** and identify drop-off points
6. **Run A/B tests** and analyze results after statistical significance
7. **Optimize based on data** - improve low-performing steps

---

## Resources

- **PostHog Docs**: https://posthog.com/docs
- **PostHog API**: https://posthog.com/docs/api
- **Feature Flags Guide**: https://posthog.com/docs/feature-flags
- **Funnels Guide**: https://posthog.com/docs/user-guides/funnels
- **Session Recording**: https://posthog.com/docs/session-recording

---

## Support

For analytics questions or issues:
1. Check PostHog documentation
2. Review this guide
3. Check browser console for errors
4. Contact development team

---

**Last Updated**: November 2024
**Version**: 1.0
**Status**: Production Ready
