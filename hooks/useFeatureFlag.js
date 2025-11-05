'use client';

// Feature Flag Hooks for A/B Testing
// Use PostHog feature flags to run experiments

import { useState, useEffect } from 'react';
import { getFeatureFlag, isFeatureFlagEnabled, getAllFeatureFlags } from '@/lib/analytics';

/**
 * Hook to get a specific feature flag value
 * Returns the variant name or null if not set
 */
export function useFeatureFlag(flagName) {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial value
    const flagValue = getFeatureFlag(flagName);
    setValue(flagValue);
    setIsLoading(false);

    // Listen for feature flag updates
    const handleFlagsUpdated = () => {
      const newValue = getFeatureFlag(flagName);
      setValue(newValue);
    };

    // PostHog fires this event when flags are updated
    window.addEventListener('posthog-flags-updated', handleFlagsUpdated);

    return () => {
      window.removeEventListener('posthog-flags-updated', handleFlagsUpdated);
    };
  }, [flagName]);

  return { value, isLoading };
}

/**
 * Hook to check if a feature flag is enabled (boolean)
 */
export function useFeatureFlagEnabled(flagName) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const enabled = isFeatureFlagEnabled(flagName);
    setIsEnabled(enabled);
    setIsLoading(false);

    const handleFlagsUpdated = () => {
      const newEnabled = isFeatureFlagEnabled(flagName);
      setIsEnabled(newEnabled);
    };

    window.addEventListener('posthog-flags-updated', handleFlagsUpdated);

    return () => {
      window.removeEventListener('posthog-flags-updated', handleFlagsUpdated);
    };
  }, [flagName]);

  return { isEnabled, isLoading };
}

/**
 * Hook to get all active feature flags
 */
export function useAllFeatureFlags() {
  const [flags, setFlags] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allFlags = getAllFeatureFlags();
    setFlags(allFlags);
    setIsLoading(false);

    const handleFlagsUpdated = () => {
      const newFlags = getAllFeatureFlags();
      setFlags(newFlags);
    };

    window.addEventListener('posthog-flags-updated', handleFlagsUpdated);

    return () => {
      window.removeEventListener('posthog-flags-updated', handleFlagsUpdated);
    };
  }, []);

  return { flags, isLoading };
}

/**
 * Predefined A/B test flags with their variants
 */
export const AB_TESTS = {
  // Test 1: Paywall Trigger Timing
  PAYWALL_TRIGGER: {
    name: 'paywall-trigger-timing',
    variants: {
      CONTROL: 'control', // 3 scans (current)
      VARIANT_A: 'variant-a', // 5 scans
      VARIANT_B: 'variant-b', // 10 scans
    },
    defaultValue: 3,
    getScansLimit: (variant) => {
      switch (variant) {
        case 'variant-a':
          return 5;
        case 'variant-b':
          return 10;
        default:
          return 3;
      }
    },
  },

  // Test 2: Paywall Copy
  PAYWALL_COPY: {
    name: 'paywall-copy-test',
    variants: {
      CONTROL: 'control', // "Unlock Full Safety Scores"
      VARIANT_A: 'variant-a', // "Protect Your Baby with Pro"
      VARIANT_B: 'variant-b', // "See Which Foods Are Safest"
    },
    getCopy: (variant) => {
      switch (variant) {
        case 'variant-a':
          return {
            title: 'Protect Your Baby with Pro',
            subtitle: 'Get unlimited scans and detailed safety analysis',
          };
        case 'variant-b':
          return {
            title: 'See Which Foods Are Safest',
            subtitle: 'Compare products and make informed choices',
          };
        default:
          return {
            title: 'Unlock Full Safety Scores',
            subtitle: 'Scan unlimited products and see complete results',
          };
      }
    },
  },

  // Test 3: Pricing Display
  PRICING_DISPLAY: {
    name: 'pricing-display-test',
    variants: {
      CONTROL: 'control', // "$4/month"
      VARIANT_A: 'variant-a', // "$0.13/day"
      VARIANT_B: 'variant-b', // "$4/month or $40/year (save 17%)"
    },
    getPricing: (variant) => {
      switch (variant) {
        case 'variant-a':
          return {
            primary: '$0.13/day',
            secondary: 'Less than a cup of coffee',
          };
        case 'variant-b':
          return {
            primary: '$4/month',
            secondary: 'or $40/year (save 17%)',
          };
        default:
          return {
            primary: '$4/month',
            secondary: 'Cancel anytime',
          };
      }
    },
  },

  // Test 4: CTA Button Text
  CTA_BUTTON: {
    name: 'cta-button-text',
    variants: {
      CONTROL: 'control', // "Upgrade to Pro"
      VARIANT_A: 'variant-a', // "Start Free Trial"
      VARIANT_B: 'variant-b', // "Get Unlimited Scans"
    },
    getButtonText: (variant) => {
      switch (variant) {
        case 'variant-a':
          return 'Start Free Trial';
        case 'variant-b':
          return 'Get Unlimited Scans';
        default:
          return 'Upgrade to Pro';
      }
    },
  },
};

/**
 * Hook to get paywall trigger limit based on A/B test
 */
export function usePaywallTriggerLimit() {
  const { value: variant, isLoading } = useFeatureFlag(AB_TESTS.PAYWALL_TRIGGER.name);
  const limit = AB_TESTS.PAYWALL_TRIGGER.getScansLimit(variant);

  return { limit, variant, isLoading };
}

/**
 * Hook to get paywall copy based on A/B test
 */
export function usePaywallCopy() {
  const { value: variant, isLoading } = useFeatureFlag(AB_TESTS.PAYWALL_COPY.name);
  const copy = AB_TESTS.PAYWALL_COPY.getCopy(variant);

  return { copy, variant, isLoading };
}

/**
 * Hook to get pricing display based on A/B test
 */
export function usePricingDisplay() {
  const { value: variant, isLoading } = useFeatureFlag(AB_TESTS.PRICING_DISPLAY.name);
  const pricing = AB_TESTS.PRICING_DISPLAY.getPricing(variant);

  return { pricing, variant, isLoading };
}

/**
 * Hook to get CTA button text based on A/B test
 */
export function useCtaButtonText() {
  const { value: variant, isLoading } = useFeatureFlag(AB_TESTS.CTA_BUTTON.name);
  const buttonText = AB_TESTS.CTA_BUTTON.getButtonText(variant);

  return { buttonText, variant, isLoading };
}
