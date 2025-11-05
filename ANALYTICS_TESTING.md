# Analytics Testing Guide

Quick testing instructions for SafeBaby analytics.

## Prerequisites

1. PostHog account created at https://posthog.com
2. Project API key added to `.env.local`
3. Next.js dev server running: `npm run dev`

---

## Step 1: Verify PostHog Initialization

### Test 1.1: Check Console Logs

1. Open browser DevTools (F12)
2. Go to Console tab
3. Load http://localhost:3000
4. Look for PostHog initialization messages

**Expected Output** (in development):
```
PostHog initialized
[PostHog] Loaded feature flags: {...}
```

**If you see errors**:
- Check `.env.local` has correct `NEXT_PUBLIC_POSTHOG_KEY`
- Verify key starts with `phc_`
- Restart dev server

### Test 1.2: Check Network Requests

1. Open DevTools → Network tab
2. Filter by "posthog" or "batch"
3. Load http://localhost:3000
4. Look for requests to `https://app.posthog.com/batch/`

**Expected**: Green 200 OK status

---

## Step 2: Test Event Tracking

### Test 2.1: Track Page View

1. Navigate to different pages
2. Check Network tab for PostHog requests
3. Go to PostHog Dashboard → Events
4. Filter by `$pageview` event

**Expected**: See page view events for each page

### Test 2.2: Track Product Scan

1. Open browser console
2. Run this code:

```javascript
import('/lib/analytics.js').then(({ trackProductScanned }) => {
  trackProductScanned('012345678901', 'camera', 1, false);
});
```

3. Check PostHog Dashboard → Events → `product_scanned`

**Expected**: Event appears within 1-2 minutes

### Test 2.3: Track Sign Up

1. Go to http://localhost:3000/signup
2. Create a test account
3. Check PostHog Dashboard → Events → `account_created`

**Expected**: Sign up event with user properties

### Test 2.4: Track Paywall View

Open console and run:

```javascript
import('/lib/analytics.js').then(({ trackPaywallViewed }) => {
  trackPaywallViewed('3_scans', 'modal', 3);
});
```

**Expected**: `paywall_viewed` event in PostHog

---

## Step 3: Test Cookie Consent

### Test 3.1: First Visit

1. Open browser in incognito mode
2. Go to http://localhost:3000
3. Cookie consent banner should appear

**Expected**: Banner with Accept/Reject buttons

### Test 3.2: Accept Cookies

1. Click "Accept All"
2. Reload page
3. Banner should not appear

**Expected**: `cookie_consent` in localStorage = `"accepted"`

### Test 3.3: Reject Cookies

1. Clear localStorage: `localStorage.clear()`
2. Reload page
3. Click "Reject All"

**Expected**:
- `cookie_consent` = `"rejected"`
- `analytics_opted_out` = `"true"`
- No PostHog events sent

### Test 3.4: Change Preferences

1. Go to http://localhost:3000/settings/privacy
2. Change cookie preference
3. Check localStorage

**Expected**: Settings persist and page reloads

---

## Step 4: Test Feature Flags

### Test 4.1: Create Test Flag

1. Go to PostHog → Feature Flags
2. Create new flag: `test-feature`
3. Set rollout to 100%
4. Enable flag

### Test 4.2: Use Flag in Code

Open console and run:

```javascript
import('/lib/analytics.js').then(({ getFeatureFlag }) => {
  console.log('Flag value:', getFeatureFlag('test-feature'));
});
```

**Expected**: See flag value (true or variant name)

### Test 4.3: Test A/B Test Hook

Create a test component:

```javascript
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

export default function TestComponent() {
  const { value, isLoading } = useFeatureFlag('test-feature');

  if (isLoading) return <div>Loading...</div>;

  return <div>Flag value: {value}</div>;
}
```

**Expected**: Component shows flag value

---

## Step 5: Test Analytics Dashboard

### Test 5.1: Access Dashboard

1. Go to http://localhost:3000/admin/analytics
2. Dashboard should load

**Expected**: See KPI cards (may show 0s if no data)

### Test 5.2: Check API

1. Go to http://localhost:3000/api/admin/analytics
2. Should return JSON

**Expected**:
```json
{
  "acquisition": { ... },
  "activation": { ... },
  "monetization": { ... },
  "retention": { ... }
}
```

### Test 5.3: Verify Metrics

After creating test account and data:

1. Refresh dashboard
2. Check metrics update

**Expected**: Numbers reflect database state

---

## Step 6: Test Privacy Settings

### Test 6.1: Access Privacy Page

1. Go to http://localhost:3000/settings/privacy
2. Page should load

**Expected**: See cookie preferences and data information

### Test 6.2: Change Cookie Settings

1. Click "Necessary Only"
2. Page reloads
3. Check console for PostHog

**Expected**: PostHog not initialized or opted out

### Test 6.3: Verify Opt-Out

Open console:

```javascript
import('/lib/analytics.js').then(({ hasOptedOut }) => {
  console.log('Opted out:', hasOptedOut());
});
```

**Expected**: Returns `true` if opted out

---

## Step 7: Test Error Tracking

### Test 7.1: Track API Error

Open console and run:

```javascript
import('/lib/analytics.js').then(({ trackApiError }) => {
  trackApiError('/api/test', 500, 'Test error');
});
```

**Expected**: `api_error` event in PostHog

### Test 7.2: Track Scan Failure

```javascript
import('/lib/analytics.js').then(({ trackScanFailed }) => {
  trackScanFailed('camera_permission');
});
```

**Expected**: `scan_failed` event in PostHog

### Test 7.3: Test Automatic Error Tracking

1. Open console
2. Throw an error: `throw new Error('Test error')`
3. Check PostHog for `javascript_error` event

**Expected**: Error captured automatically

---

## Step 8: Test Funnels

### Test 8.1: Import Dashboard Config

1. Go to PostHog → Dashboards
2. Create new dashboard
3. Manually create insights based on `lib/funnels.js`

### Test 8.2: Test Free-to-Pro Funnel

Simulate the funnel:

```javascript
const lib = await import('/lib/analytics.js');

// Step 1: App opened
lib.trackAppOpened('browser');

// Step 2: Account created
lib.trackAccountCreated('test-user-123', 'email');

// Step 3: First scan
lib.trackProductScanned('012345', 'camera', 1, false);

// Step 4: Third scan
lib.trackProductScanned('012345', 'camera', 3, false);

// Step 5: Paywall viewed
lib.trackPaywallViewed('3_scans', 'modal', 3);

// Step 6: Upgrade clicked
lib.trackUpgradeClicked('paywall', 'monthly');

// Step 7: Checkout started
lib.trackCheckoutStarted('monthly', 4.00);

// Step 8: Subscription created
lib.trackSubscriptionCreated('test-user-123', 'monthly', 4.00);
```

**Expected**: All events in PostHog, funnel shows 100% completion

---

## Step 9: Test User Identification

### Test 9.1: Identify User

```javascript
import('/lib/analytics.js').then(({ identifyUser }) => {
  identifyUser('test-user-123', {
    email: 'test@example.com',
    is_pro: false,
    signup_date: new Date().toISOString(),
  });
});
```

**Expected**: User appears in PostHog → Persons

### Test 9.2: Update User Properties

```javascript
import('/lib/analytics.js').then(({ updateUserProperties }) => {
  updateUserProperties({
    total_scans: 5,
    is_pro: true,
  });
});
```

**Expected**: Properties updated in PostHog

### Test 9.3: Reset User

```javascript
import('/lib/analytics.js').then(({ resetUser }) => {
  resetUser();
});
```

**Expected**: User identity cleared

---

## Step 10: Production Testing

### Test 10.1: Build for Production

```bash
npm run build
npm run start
```

### Test 10.2: Verify in Production

1. Open http://localhost:3000
2. Check console (should NOT see debug logs)
3. Verify events still tracked
4. Check Network tab for PostHog requests

**Expected**: No debug logs, but events still work

### Test 10.3: Test PWA Mode

1. Install PWA to home screen
2. Open from home screen
3. Check event tracking

**Expected**: `app_opened` event with `source: 'pwa'`

---

## Common Issues

### Issue 1: Events Not Appearing

**Symptoms**: No events in PostHog dashboard

**Solutions**:
1. Check PostHog API key is correct
2. Wait 1-2 minutes for events to appear
3. Verify user hasn't opted out
4. Check Network tab for failed requests
5. Look for errors in console

### Issue 2: Feature Flags Not Loading

**Symptoms**: `getFeatureFlag()` returns null

**Solutions**:
1. Verify flag exists in PostHog
2. Check flag is enabled
3. Wait for flags to load (use `isLoading`)
4. Identify user with `identifyUser()`

### Issue 3: Cookie Consent Not Showing

**Symptoms**: Banner doesn't appear

**Solutions**:
1. Clear localStorage: `localStorage.clear()`
2. Reload page in incognito
3. Check for JavaScript errors
4. Verify component is imported in layout

### Issue 4: Analytics Dashboard Shows 0s

**Symptoms**: All metrics are 0

**Solutions**:
1. Create test users in database
2. Check Supabase connection
3. Verify Stripe API key
4. Look at API response: `/api/admin/analytics`

---

## Verification Checklist

Use this checklist to verify complete setup:

- [ ] PostHog API key configured in `.env.local`
- [ ] PostHog initializes on page load (check console)
- [ ] Page views tracked automatically
- [ ] Cookie consent banner appears on first visit
- [ ] Events appear in PostHog dashboard
- [ ] User identification works
- [ ] Feature flags load correctly
- [ ] Analytics dashboard accessible
- [ ] Privacy settings page works
- [ ] Opt-out prevents tracking
- [ ] Error tracking captures issues
- [ ] Funnels configured in PostHog
- [ ] A/B tests can be created

---

## Testing Script

Run this complete test in browser console:

```javascript
(async function testAnalytics() {
  const lib = await import('/lib/analytics.js');

  console.log('Testing PostHog Analytics...\n');

  // Test 1: Page view
  console.log('1. Tracking page view...');
  lib.trackPageView('/test', { test: true });

  // Test 2: Product scan
  console.log('2. Tracking product scan...');
  lib.trackProductScanned('012345678901', 'camera', 1, false);

  // Test 3: Paywall view
  console.log('3. Tracking paywall view...');
  lib.trackPaywallViewed('3_scans', 'modal', 3);

  // Test 4: User identification
  console.log('4. Identifying user...');
  lib.identifyUser('test-user-' + Date.now(), {
    email: 'test@example.com',
    is_pro: false,
  });

  // Test 5: Feature flag
  console.log('5. Getting feature flag...');
  const flag = lib.getFeatureFlag('test-feature');
  console.log('Feature flag value:', flag);

  // Test 6: Check opt-out
  console.log('6. Checking opt-out status...');
  const optedOut = lib.hasOptedOut();
  console.log('User opted out:', optedOut);

  console.log('\n✅ All tests complete!');
  console.log('Check PostHog dashboard for events.');
})();
```

**Expected**: All tests pass, events in PostHog

---

## Performance Testing

### Monitor Page Load Time

1. Open DevTools → Performance
2. Record page load
3. Check for slow analytics initialization

**Expected**: PostHog loads asynchronously, minimal impact

### Check Bundle Size

```bash
npm run build
```

Check `.next/static/chunks` for bundle size.

**Expected**: PostHog adds ~100-150KB gzipped

---

## Next Steps

After testing:

1. Set up PostHog alerts for critical metrics
2. Configure feature flags for A/B tests
3. Import funnel configurations
4. Monitor real user data
5. Iterate based on insights

---

**Testing Status**: Ready
**Last Updated**: November 2024
