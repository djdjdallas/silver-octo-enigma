'use client';

// Analytics Provider Component
// Provides analytics context to the entire app

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  initPostHog,
  trackPageView,
  trackAppOpened,
  trackSource,
  trackSlowPageLoad,
  hasOptedOut
} from '@/lib/analytics';

const AnalyticsContext = createContext({});

export function useAnalytics() {
  return useContext(AnalyticsContext);
}

export default function AnalyticsProvider({ children, user }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize PostHog on mount
  useEffect(() => {
    // Don't initialize if user has opted out
    if (hasOptedOut()) {
      console.log('Analytics opted out');
      return;
    }

    // Initialize PostHog
    initPostHog();
    setIsInitialized(true);

    // Track app opened
    const displayMode = window.matchMedia('(display-mode: standalone)').matches
      ? 'pwa'
      : 'browser';
    trackAppOpened(displayMode);

    // Track UTM parameters if present
    const utmParams = {
      utm_source: searchParams.get('utm_source'),
      utm_medium: searchParams.get('utm_medium'),
      utm_campaign: searchParams.get('utm_campaign'),
      utm_term: searchParams.get('utm_term'),
      utm_content: searchParams.get('utm_content'),
    };

    // Only track if at least one UTM parameter is present
    if (Object.values(utmParams).some(v => v !== null)) {
      trackSource(utmParams);
    }
  }, []);

  // Track page views
  useEffect(() => {
    if (!isInitialized) return;

    const startTime = performance.now();

    // Track page view
    trackPageView(pathname, {
      referrer: document.referrer,
      url: window.location.href,
    });

    // Track page load time
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      trackSlowPageLoad(pathname, loadTime);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [pathname, isInitialized]);

  // Track JavaScript errors
  useEffect(() => {
    if (!isInitialized) return;

    const handleError = (event) => {
      const { message, filename, lineno, colno, error } = event;

      // Import trackJsError dynamically to avoid circular dependency
      import('@/lib/analytics').then(({ trackJsError }) => {
        trackJsError(error || new Error(message), {
          filename,
          lineno,
          colno,
        });
      });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [isInitialized]);

  const value = {
    isInitialized,
    user,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}
