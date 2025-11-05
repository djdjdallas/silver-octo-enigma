'use client';

// A/B Test Wrapper Component
// Renders different variants based on feature flags

import { useFeatureFlag } from '@/hooks/useFeatureFlag';

/**
 * Generic A/B test wrapper component
 * Renders different children based on feature flag variant
 */
export default function ABTestWrapper({
  flagName,
  variants,
  fallback = null,
  children,
}) {
  const { value: variant, isLoading } = useFeatureFlag(flagName);

  // Show fallback while loading
  if (isLoading) {
    return fallback;
  }

  // If children is a function, call it with the variant
  if (typeof children === 'function') {
    return children(variant);
  }

  // If variants is provided, render the matching variant
  if (variants && variant in variants) {
    return variants[variant];
  }

  // Fallback to default
  return variants?.control || fallback;
}

/**
 * Simple boolean feature flag wrapper
 * Shows children only if feature is enabled
 */
export function FeatureFlag({ flagName, children, fallback = null }) {
  const { value: variant } = useFeatureFlag(flagName);

  if (variant === true || variant === 'true') {
    return children;
  }

  return fallback;
}

/**
 * Wrapper for paywall trigger A/B test
 */
export function PaywallTriggerTest({ children }) {
  return (
    <ABTestWrapper flagName="paywall-trigger-timing">
      {children}
    </ABTestWrapper>
  );
}

/**
 * Wrapper for paywall copy A/B test
 */
export function PaywallCopyTest({ control, variantA, variantB }) {
  return (
    <ABTestWrapper
      flagName="paywall-copy-test"
      variants={{
        control,
        'variant-a': variantA,
        'variant-b': variantB,
      }}
    />
  );
}

/**
 * Wrapper for pricing display A/B test
 */
export function PricingDisplayTest({ control, variantA, variantB }) {
  return (
    <ABTestWrapper
      flagName="pricing-display-test"
      variants={{
        control,
        'variant-a': variantA,
        'variant-b': variantB,
      }}
    />
  );
}

/**
 * Example usage:
 *
 * <ABTestWrapper
 *   flagName="my-test"
 *   variants={{
 *     control: <ControlComponent />,
 *     'variant-a': <VariantAComponent />,
 *     'variant-b': <VariantBComponent />,
 *   }}
 * />
 *
 * Or with render prop:
 *
 * <ABTestWrapper flagName="my-test">
 *   {(variant) => {
 *     if (variant === 'variant-a') return <VariantA />;
 *     return <Control />;
 *   }}
 * </ABTestWrapper>
 */
