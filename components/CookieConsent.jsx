'use client';

// Cookie Consent Banner
// GDPR/CCPA compliant cookie consent

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { optInAnalytics, optOutAnalytics } from '@/lib/analytics';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsented = localStorage.getItem('cookie_consent');

    if (!hasConsented) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('analytics_consent', 'true');
    optInAnalytics();
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    localStorage.setItem('analytics_consent', 'false');
    optOutAnalytics();
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie_consent', 'necessary_only');
    localStorage.setItem('analytics_consent', 'false');
    optOutAnalytics();
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold mb-2">
                We Value Your Privacy
              </h2>
              <p className="text-sm text-gray-600">
                We use cookies to improve your experience and analyze app usage.
              </p>
            </div>
            <button
              onClick={handleRejectAll}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cookie Details */}
          {showDetails && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
              <div>
                <h3 className="font-semibold text-sm mb-1">
                  Strictly Necessary Cookies
                </h3>
                <p className="text-xs text-gray-600">
                  These cookies are essential for the app to function. They enable
                  core features like authentication and security. These cannot be
                  disabled.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-1">
                  Analytics Cookies
                </h3>
                <p className="text-xs text-gray-600">
                  We use PostHog to understand how you use SafeBaby. This helps us
                  improve the app and fix bugs. These cookies collect anonymous data
                  about your usage patterns.
                </p>
                <ul className="text-xs text-gray-600 mt-2 ml-4 list-disc">
                  <li>Page views and navigation patterns</li>
                  <li>Feature usage and engagement</li>
                  <li>Error tracking and performance monitoring</li>
                  <li>Session recordings (for UX improvements)</li>
                </ul>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-gray-600">
                  We do not sell your data or use it for advertising. All data is
                  processed in accordance with our{' '}
                  <a href="/privacy" className="text-primary-500 underline">
                    Privacy Policy
                  </a>
                  . You can change your preferences anytime in Settings.
                </p>
              </div>
            </div>
          )}

          {/* Toggle Details */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-primary-500 hover:text-primary-600 mb-4"
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-primary-500 hover:bg-primary-600 text-white"
            >
              Accept All
            </Button>
            <Button
              onClick={handleAcceptNecessary}
              variant="outline"
              className="flex-1"
            >
              Necessary Only
            </Button>
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="flex-1"
            >
              Reject All
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            By using SafeBaby, you agree to our{' '}
            <a href="/terms" className="text-primary-500 underline">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="/privacy" className="text-primary-500 underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}

/**
 * Simple cookie consent status component
 * Shows in settings to allow users to change their choice
 */
export function CookieConsentStatus() {
  const [consentStatus, setConsentStatus] = useState('unknown');

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    const analyticsConsent = localStorage.getItem('analytics_consent');

    if (consent === 'accepted') {
      setConsentStatus('all');
    } else if (consent === 'necessary_only') {
      setConsentStatus('necessary');
    } else if (consent === 'rejected') {
      setConsentStatus('rejected');
    } else {
      setConsentStatus('not_set');
    }
  }, []);

  const handleChangeConsent = (newConsent) => {
    if (newConsent === 'all') {
      localStorage.setItem('cookie_consent', 'accepted');
      localStorage.setItem('analytics_consent', 'true');
      optInAnalytics();
      setConsentStatus('all');
    } else if (newConsent === 'necessary') {
      localStorage.setItem('cookie_consent', 'necessary_only');
      localStorage.setItem('analytics_consent', 'false');
      optOutAnalytics();
      setConsentStatus('necessary');
    } else if (newConsent === 'rejected') {
      localStorage.setItem('cookie_consent', 'rejected');
      localStorage.setItem('analytics_consent', 'false');
      optOutAnalytics();
      setConsentStatus('rejected');
    }

    // Reload to apply changes
    window.location.reload();
  };

  return (
    <div className="p-4 bg-white rounded-lg border">
      <h3 className="font-semibold mb-2">Cookie Preferences</h3>
      <p className="text-sm text-gray-600 mb-4">
        Current status:{' '}
        <span className="font-medium">
          {consentStatus === 'all' && 'All cookies accepted'}
          {consentStatus === 'necessary' && 'Necessary cookies only'}
          {consentStatus === 'rejected' && 'All cookies rejected'}
          {consentStatus === 'not_set' && 'Not set'}
        </span>
      </p>

      <div className="flex flex-col gap-2">
        <Button
          onClick={() => handleChangeConsent('all')}
          variant={consentStatus === 'all' ? 'default' : 'outline'}
          className="w-full"
        >
          Accept All Cookies
        </Button>
        <Button
          onClick={() => handleChangeConsent('necessary')}
          variant={consentStatus === 'necessary' ? 'default' : 'outline'}
          className="w-full"
        >
          Necessary Cookies Only
        </Button>
        <Button
          onClick={() => handleChangeConsent('rejected')}
          variant={consentStatus === 'rejected' ? 'default' : 'outline'}
          className="w-full"
        >
          Reject All Cookies
        </Button>
      </div>
    </div>
  );
}
