# SafeBaby Freemium Model - Quick Start Guide

## What Changed?

### Free Users Now See:
- **Safe/Caution/Avoid badges** instead of locked scores
- **All contaminant data** (Lead, Arsenic, Cadmium, Mercury ppb levels)
- **5 favorites limit** with clear progress indicator
- **Blurred detailed score** with upgrade prompt
- **Comparison preview** (locked feature teaser)

### Pro Users Get:
- **Detailed 0-100 scores** with complete breakdown
- **Side-by-side product comparisons** (2-4 products)
- **Unlimited favorites**
- **Historical trends** and age-based recommendations
- **PDF exports** and recall alerts

---

## New Components

### 1. SubscriptionContext
**Location:** `/contexts/SubscriptionContext.jsx`

Provides global subscription state to all components.

**Usage:**
```jsx
import { useSubscription } from '@/contexts/SubscriptionContext';

function MyComponent() {
  const { isPro, scansCount, favoritesCount, incrementScanCount } = useSubscription();

  if (isPro) {
    // Show pro features
  } else {
    // Show free features with upgrade prompts
  }
}
```

### 2. UpgradeModal
**Location:** `/components/UpgradeModal.jsx`

Modal that appears after user scans 3 products.

**Usage:**
```jsx
import UpgradeModal from '@/components/UpgradeModal';

<UpgradeModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  scansCount={3}
/>
```

### 3. ScanTracker
**Location:** `/components/ScanTracker.jsx`

Automatically monitors scans and triggers upgrade modal. Already integrated in layout.

### 4. FavoritesLimit
**Location:** `/components/FavoritesLimit.jsx`

Shows favorites usage and limits for free users.

**Usage:**
```jsx
import FavoritesLimit from '@/components/FavoritesLimit';

// Banner variant (dashboard)
<FavoritesLimit variant="banner" />

// Inline variant (when limit reached)
<FavoritesLimit variant="inline" />

// Compact variant (sidebar)
<FavoritesLimit variant="compact" />
```

**Hook:**
```jsx
import { useCanAddFavorite } from '@/components/FavoritesLimit';

const { canAdd, message, limit } = useCanAddFavorite();

if (!canAdd) {
  alert(message); // "You've reached the free limit..."
}
```

### 5. ComparisonPaywall
**Location:** `/components/ComparisonPaywall.jsx`

Product comparison feature teaser with upgrade prompt.

**Usage:**
```jsx
import ComparisonPaywall from '@/components/ComparisonPaywall';

// Button variant
<ComparisonPaywall currentProduct={product} variant="button" />

// Card variant
<ComparisonPaywall variant="card" />
```

---

## Updated Components

### ScoreDisplay
**Location:** `/components/ScoreDisplay.jsx`

- Free users: See "Safe/Caution/Avoid" badge + blurred detailed score
- Pro users: See full 0-100 score with breakdown

### ProductCard
**Location:** `/components/ProductCard.jsx`

- Free users: See colored "Safe/Caution/Avoid" badge
- Pro users: See numeric score badge (e.g., "85")

### ProductActions
**Location:** `/app/product/[id]/ProductActions.jsx`

- Now checks favorites limit before adding
- Shows error toast and redirects to upgrade when limit reached

---

## How It Works

### Scan Counter Flow
1. User scans product → `incrementScanCount()` called
2. Count saved in localStorage (`safebaby_scan_count`)
3. ScanTracker monitors count
4. After 3rd scan → UpgradeModal appears
5. Modal shown once per session (sessionStorage flag)

### Favorites Limit Flow
1. User tries to add favorite
2. `useCanAddFavorite()` checks current count
3. If under limit (5) → Allow
4. If at limit → Show error toast → Redirect to /upgrade

### Safety Indicator Logic
```javascript
score >= 70 → "Safe" (Green)
score 50-69 → "Caution" (Yellow)
score < 50  → "Avoid" (Red)
```

---

## Testing Checklist

### Test as Free User
```
□ View product → See Safe/Caution/Avoid badge
□ Scan 3 products → Upgrade modal appears
□ Add 5 favorites → Limit banner shows
□ Try 6th favorite → Error + redirect
□ Click "Compare Products" → Preview modal
□ See blurred detailed score
□ All contaminant data visible
```

### Test as Pro User
```
□ View product → See numeric score (85)
□ No scan limit or modal
□ No favorites limit
□ Full comparison feature unlocked
□ Dashboard shows "Pro" badge
```

---

## Key Files Modified

**App Layout:**
- `/app/layout.js` - Added SubscriptionProvider and ScanTracker

**Product Pages:**
- `/app/product/[id]/page.js` - Added comparison button
- `/app/product/[id]/ProductActions.jsx` - Favorites limit check

**Dashboard:**
- `/app/dashboard/page.js` - Favorites limit banner

**Scan Page:**
- `/app/scan/page.js` - Increment scan count

**Components:**
- `/components/ScoreDisplay.jsx` - Safe/Caution/Avoid badges
- `/components/ProductCard.jsx` - Colored badges for free users

**Utilities:**
- `/lib/utils.js` - Added `getSafetyIndicator()` function

---

## Environment Requirements

Ensure these are set in your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Database Schema

Verify your Supabase tables have these columns:

**user_profiles:**
```sql
- id (uuid)
- subscription_tier (text: 'free' | 'pro' | 'trial')
- subscription_expires_at (timestamp)
```

**user_favorites:**
```sql
- id (uuid)
- user_id (uuid)
- product_id (uuid)
- created_at (timestamp)
```

---

## Common Issues

### Upgrade Modal Not Appearing
- Check localStorage: `safebaby_scan_count` should increment
- Check sessionStorage: `safebaby_upgrade_modal_shown` should be null
- Verify user is not Pro (check `subscription_tier`)

### Favorites Limit Not Working
- Verify SubscriptionProvider is wrapped around app
- Check `favoritesCount` in context
- Ensure user_favorites table is queried correctly

### Safe/Caution/Avoid Not Showing
- Check `product.overall_score` exists
- Verify `getSafetyIndicator()` is imported
- Check if score is null/undefined

### Context Not Loading
- Verify SubscriptionProvider in `/app/layout.js`
- Check browser console for errors
- Verify Supabase client is initialized

---

## Quick Commands

**Clear scan count (testing):**
```javascript
localStorage.removeItem('safebaby_scan_count');
sessionStorage.removeItem('safebaby_upgrade_modal_shown');
```

**Check current scan count:**
```javascript
console.log(localStorage.getItem('safebaby_scan_count'));
```

**Simulate Pro user (Supabase):**
```sql
UPDATE user_profiles
SET subscription_tier = 'pro',
    subscription_expires_at = '2025-12-31'
WHERE id = 'user_id';
```

---

## Support & Resources

- **Full Documentation:** See `/FREEMIUM_IMPLEMENTATION.md`
- **Component Examples:** Check component files for inline documentation
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

## Next Steps

1. **Test Thoroughly** - Use testing checklist above
2. **Set Up Analytics** - Track conversion metrics
3. **Monitor Performance** - Watch conversion rates
4. **Gather Feedback** - Survey users about new model
5. **Iterate** - A/B test different limits and timings

---

## Summary

The new freemium model balances:
- **Trust** - Full contaminant data for free
- **Value** - Immediate safety assessment
- **Conversion** - Strategic upgrade prompts
- **Respect** - Non-pushy, dismissible prompts

Target: **2-5% free-to-pro conversion rate**
