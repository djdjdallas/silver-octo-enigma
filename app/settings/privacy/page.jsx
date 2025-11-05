// Privacy Settings Page
// Allow users to manage their privacy preferences

import { CookieConsentStatus } from '@/components/CookieConsent';

export const metadata = {
  title: 'Privacy Settings - SafeBaby',
  description: 'Manage your privacy and data preferences',
};

export default function PrivacySettings() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Privacy Settings</h1>
      <p className="text-gray-600 mb-8">
        Manage how your data is collected and used
      </p>

      {/* Cookie Preferences */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cookie Preferences</h2>
        <CookieConsentStatus />
      </section>

      {/* Do Not Track */}
      <section className="mb-8">
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-semibold mb-2">Do Not Track</h3>
          <p className="text-sm text-gray-600 mb-4">
            We respect the "Do Not Track" browser setting. If you have DNT enabled,
            we will not collect analytics data.
          </p>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
            <p className="font-medium mb-1">How to enable Do Not Track:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Chrome: Settings → Privacy and security → Do Not Track</li>
              <li>Firefox: Settings → Privacy & Security → Send "Do Not Track"</li>
              <li>Safari: Settings → Privacy → Website tracking</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data Collection */}
      <section className="mb-8">
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-semibold mb-2">Data We Collect</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-1">Account Information</p>
              <p className="text-gray-600">
                Email address, password (encrypted), subscription status
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Usage Data (if analytics enabled)</p>
              <p className="text-gray-600">
                Products scanned, search queries, pages viewed, feature usage
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Device Information</p>
              <p className="text-gray-600">
                Browser type, operating system, screen size (for app optimization)
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Payment Information</p>
              <p className="text-gray-600">
                Processed securely by Stripe. We never store credit card details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Usage */}
      <section className="mb-8">
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-semibold mb-2">How We Use Your Data</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>Provide product safety ratings and recommendations</li>
            <li>Improve app performance and fix bugs</li>
            <li>Send important updates about product recalls</li>
            <li>Process payments for Pro subscriptions</li>
            <li>Understand how features are used to improve UX</li>
          </ul>
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm font-medium text-green-800">
              We NEVER sell your data or use it for advertising.
            </p>
          </div>
        </div>
      </section>

      {/* Data Rights */}
      <section className="mb-8">
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-semibold mb-2">Your Data Rights</h3>
          <p className="text-sm text-gray-600 mb-3">
            Under GDPR and CCPA, you have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data</li>
            <li>Opt out of data collection</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <a
            href="/contact"
            className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Contact Us About Your Data
          </a>
        </div>
      </section>

      {/* Delete Account */}
      <section className="mb-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold mb-2 text-red-900">Delete Account</h3>
          <p className="text-sm text-red-800 mb-4">
            Deleting your account will permanently remove all your data, including
            favorites, scan history, and account information. This action cannot be
            undone.
          </p>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
                // TODO: Implement account deletion
                alert('Account deletion will be implemented with proper authentication flow.');
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete My Account
          </button>
        </div>
      </section>

      {/* Links */}
      <section className="text-center text-sm text-gray-600">
        <p>
          Read our full{' '}
          <a href="/privacy" className="text-primary-500 underline">
            Privacy Policy
          </a>
          {' '}and{' '}
          <a href="/terms" className="text-primary-500 underline">
            Terms of Service
          </a>
        </p>
      </section>
    </div>
  );
}
