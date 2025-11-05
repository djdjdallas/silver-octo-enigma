# Analytics Integration Guide

Quick reference for adding analytics to SafeBaby components.

## Common Scenarios

### 1. Track Product Scan

**File**: `app/scan/page.js` or `components/BarcodeScanner.jsx`

```javascript
import { trackProductScanned } from '@/lib/analytics';

// After successful scan
const handleScanSuccess = (upc) => {
  // ... existing code ...

  trackProductScanned(
    upc,
    'camera', // or 'manual' for manual entry
    scanCount, // Total scans for this user
    user.isPro
  );
};
```

### 2. Track Product Search

**File**: `app/search/page.js`

```javascript
import { trackProductSearched } from '@/lib/analytics';

const handleSearch = async (query) => {
  const results = await searchProducts(query);

  trackProductSearched(query, results.length);

  // ... existing code ...
};
```

### 3. Track Product View

**File**: `app/product/[id]/page.js`

```javascript
import { trackProductViewed } from '@/lib/analytics';

export default function ProductPage({ params }) {
  useEffect(() => {
    // After product data loads
    if (product) {
      trackProductViewed(
        product.id,
        product.name,
        product.brand,
        user?.isPro || false
      );
    }
  }, [product]);

  // ... rest of component ...
}
```

### 4. Track Favorite/Unfavorite

**File**: `app/product/[id]/ProductActions.jsx`

```javascript
import { trackProductFavorited, trackProductUnfavorited } from '@/lib/analytics';

const handleToggleFavorite = async () => {
  if (isFavorited) {
    await unfavoriteProduct(productId);
    trackProductUnfavorited(productId, totalFavorites - 1);
  } else {
    await favoriteProduct(productId);
    trackProductFavorited(
      productId,
      productName,
      totalFavorites + 1
    );
  }
};
```

### 5. Track Paywall View

**File**: `components/UpgradeBanner.jsx` or paywall modal

```javascript
import { trackPaywallViewed } from '@/lib/analytics';

useEffect(() => {
  // When paywall is shown
  trackPaywallViewed(
    '3_scans', // trigger: '3_scans' | 'comparison' | 'favorites_limit' | 'full_score'
    'modal',   // location: 'modal' | 'inline' | 'banner'
    scanCount,
    {
      // Additional metadata
      feature_attempted: 'product_scan',
    }
  );
}, []);
```

### 6. Track Upgrade Click

**File**: `app/upgrade/page.js`

```javascript
import { trackUpgradeClicked } from '@/lib/analytics';

const handleUpgradeClick = (plan) => {
  trackUpgradeClicked(
    'paywall', // source: 'paywall' | 'settings' | 'banner'
    plan       // 'monthly' | 'annual'
  );

  // Redirect to checkout
  window.location.href = '/api/stripe/create-checkout?plan=' + plan;
};
```

### 7. Track Checkout Started

**File**: `app/api/stripe/create-checkout/route.js`

```javascript
import { trackCheckoutStarted } from '@/lib/analytics';

export async function POST(request) {
  const { plan } = await request.json();
  const price = plan === 'monthly' ? 4.00 : 40.00;

  trackCheckoutStarted(plan, price);

  // Create Stripe session
  // ... existing code ...
}
```

### 8. Track Subscription Created

**File**: `app/api/stripe/webhook/route.js`

```javascript
import { trackSubscriptionCreated, updateUserProperties } from '@/lib/analytics';

// In webhook handler for 'checkout.session.completed'
if (event.type === 'checkout.session.completed') {
  const session = event.data.object;

  trackSubscriptionCreated(
    userId,
    session.subscription.plan.interval, // 'month' or 'year'
    session.amount_total / 100
  );

  updateUserProperties({
    is_pro: true,
    subscription_tier: session.subscription.plan.interval === 'month' ? 'monthly' : 'annual',
    upgrade_date: new Date().toISOString(),
  });
}
```

### 9. Track Subscription Cancelled

**File**: `app/api/stripe/webhook/route.js`

```javascript
import { trackSubscriptionCancelled, updateUserProperties } from '@/lib/analytics';

// In webhook handler for 'customer.subscription.deleted'
if (event.type === 'customer.subscription.deleted') {
  trackSubscriptionCancelled('user_initiated'); // or 'payment_failed'

  updateUserProperties({
    is_pro: false,
    subscription_tier: 'free',
    cancellation_date: new Date().toISOString(),
  });
}
```

### 10. Track User Sign Up

**File**: `app/signup/page.js`

```javascript
import { trackAccountCreated, identifyUser } from '@/lib/analytics';

const handleSignUp = async (email, password) => {
  const { user } = await supabase.auth.signUp({ email, password });

  trackAccountCreated(user.id, 'email'); // or 'google', 'apple'

  identifyUser(user.id, {
    email: user.email,
    signup_date: new Date().toISOString(),
    is_pro: false,
    subscription_tier: 'free',
  });
};
```

### 11. Track User Login

**File**: `app/login/page.js`

```javascript
import { identifyUser } from '@/lib/analytics';

const handleLogin = async (email, password) => {
  const { user } = await supabase.auth.signInWithPassword({ email, password });

  // Re-identify user on login
  identifyUser(user.id, {
    email: user.email,
    last_login: new Date().toISOString(),
  });
};
```

### 12. Track Logout

**File**: `app/dashboard/LogoutButton.jsx`

```javascript
import { resetUser } from '@/lib/analytics';

const handleLogout = async () => {
  await supabase.auth.signOut();
  resetUser(); // Clear PostHog user identity
  router.push('/');
};
```

### 13. Track Return Visit

**File**: `app/page.js` or `app/layout.js`

```javascript
import { trackReturn } from '@/lib/analytics';

useEffect(() => {
  if (user && user.signup_date) {
    const daysSinceSignup = Math.floor(
      (Date.now() - new Date(user.signup_date).getTime()) / (1000 * 60 * 60 * 24)
    );

    trackReturn(daysSinceSignup);
  }
}, [user]);
```

### 14. Track Comparison Started

**File**: Compare products feature (when implemented)

```javascript
import { trackComparisonStarted } from '@/lib/analytics';

const handleStartComparison = (productIds) => {
  trackComparisonStarted(productIds, user?.isPro || false);

  // Show comparison view
  // ... existing code ...
};
```

### 15. Track API Error

**File**: Any API call (e.g., `app/search/page.js`)

```javascript
import { trackApiError } from '@/lib/analytics';

try {
  const response = await fetch('/api/products/search?q=' + query);
  if (!response.ok) {
    throw new Error('Search failed');
  }
} catch (error) {
  trackApiError(
    '/api/products/search',
    500,
    error.message
  );

  toast.error('Search failed. Please try again.');
}
```

### 16. Track Scan Failed

**File**: `components/BarcodeScanner.jsx`

```javascript
import { trackScanFailed } from '@/lib/analytics';

const handleScanError = (error) => {
  let reason = 'unknown';

  if (error.name === 'NotAllowedError') {
    reason = 'camera_permission';
  } else if (error.message.includes('timeout')) {
    reason = 'timeout';
  } else if (error.message.includes('invalid')) {
    reason = 'invalid_barcode';
  }

  trackScanFailed(reason);
};
```

### 17. Use A/B Test for Paywall Copy

**File**: `components/PaywallModal.jsx`

```javascript
import { usePaywallCopy } from '@/hooks/useFeatureFlag';

export default function PaywallModal() {
  const { copy, variant } = usePaywallCopy();

  return (
    <div className="modal">
      <h2>{copy.title}</h2>
      <p>{copy.subtitle}</p>
      {/* Rest of modal */}
    </div>
  );
}
```

### 18. Use A/B Test for Pricing Display

**File**: `app/upgrade/page.js`

```javascript
import { usePricingDisplay } from '@/hooks/useFeatureFlag';

export default function UpgradePage() {
  const { pricing, variant } = usePricingDisplay();

  return (
    <div>
      <h1>{pricing.primary}</h1>
      <p>{pricing.secondary}</p>
    </div>
  );
}
```

### 19. Use A/B Test for CTA Button

**File**: `components/UpgradeBanner.jsx`

```javascript
import { useCtaButtonText } from '@/hooks/useFeatureFlag';

export default function UpgradeBanner() {
  const { buttonText, variant } = useCtaButtonText();

  return (
    <button onClick={handleUpgrade}>
      {buttonText}
    </button>
  );
}
```

### 20. Custom A/B Test Wrapper

**File**: Any component with A/B test

```javascript
import ABTestWrapper from '@/components/ABTestWrapper';

export default function MyComponent() {
  return (
    <ABTestWrapper
      flagName="my-custom-test"
      variants={{
        control: <ControlVersion />,
        'variant-a': <VariantA />,
        'variant-b': <VariantB />,
      }}
    />
  );
}
```

---

## User Properties to Set

Track these properties for segmentation:

```javascript
import { updateUserProperties } from '@/lib/analytics';

updateUserProperties({
  // Account info
  is_pro: true,
  subscription_tier: 'monthly', // or 'annual', 'free'

  // Engagement
  total_scans: 15,
  total_favorites: 5,

  // Dates
  signup_date: '2024-01-15T10:30:00Z',
  first_scan_date: '2024-01-15T10:35:00Z',
  last_scan_date: '2024-01-20T15:20:00Z',
  last_active_date: '2024-01-20T15:20:00Z',
  upgrade_date: '2024-01-18T12:00:00Z',

  // Demographics (optional)
  baby_age_months: 6,

  // Acquisition
  utm_source: 'facebook',
  utm_campaign: 'summer-2024',
});
```

---

## Privacy-Compliant Tracking

Always check opt-out before tracking:

```javascript
import { hasOptedOut } from '@/lib/analytics';

if (!hasOptedOut()) {
  trackProductScanned(upc, 'camera', scanCount, isPro);
}
```

Or just use the tracking functions directly - they check opt-out internally.

---

## Testing Analytics

### In Development

1. Check browser console for PostHog debug logs
2. Look at Network tab for `https://app.posthog.com/batch/` requests
3. Verify events in PostHog dashboard (may take 1-2 minutes)

### In Production

1. Test with real user flows
2. Monitor PostHog dashboard for events
3. Check funnel conversion rates
4. Review session recordings for UX issues

---

## Quick Checklist

When adding a new feature, track:

- [ ] User views the feature (page view)
- [ ] User interacts with the feature (button click, form submit)
- [ ] Feature succeeds (success event)
- [ ] Feature fails (error event)
- [ ] User converts (if applicable to monetization)

---

## Need Help?

- See `ANALYTICS_SETUP.md` for full documentation
- Check `lib/analytics.js` for all available tracking functions
- Review `hooks/useFeatureFlag.js` for A/B testing hooks
- Look at `lib/funnels.js` for funnel definitions
