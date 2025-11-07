// Privacy Policy page - GDPR and CCPA compliant
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export const metadata = {
  title: 'Privacy Policy | SafeBaby',
  description: 'Privacy Policy for SafeBaby - How we collect, use, and protect your data',
};

export default function PrivacyPage() {
  const lastUpdated = 'November 4, 2025';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <div className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4">
              <Icons.chevronRight className="w-4 h-4 rotate-180" />
              <span className="text-sm font-medium">Back to Home</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Your Privacy Matters
                </h3>
                <p className="text-sm text-blue-800">
                  SafeBaby is committed to protecting your privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Content */}
        <div className="space-y-8 bg-white rounded-lg p-8 shadow-sm">
          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              1.1 Information You Provide
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you create an account or use SafeBaby, we may collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li><strong>Account Information:</strong> Email address, password (encrypted), and name</li>
              <li><strong>Profile Information:</strong> Optional information about your baby's age and dietary preferences</li>
              <li><strong>Payment Information:</strong> Processed securely through Stripe (we do not store credit card numbers)</li>
              <li><strong>User Content:</strong> Favorite products, scan history, and search queries</li>
              <li><strong>Communications:</strong> Messages you send us through contact forms or support</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              1.2 Automatically Collected Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you use our Service, we automatically collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Device Information:</strong> Device type, operating system, browser type</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent on pages</li>
              <li><strong>Location Data:</strong> General location based on IP address (city/country level)</li>
              <li><strong>Cookies and Tracking:</strong> Analytics cookies through PostHog</li>
              <li><strong>Camera Access:</strong> Only when you use the barcode scanner feature (images are not stored)</li>
            </ul>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide, maintain, and improve our Service</li>
              <li>Create and manage your account</li>
              <li>Process payments and subscriptions</li>
              <li>Send you product recalls and safety alerts (with your consent)</li>
              <li>Respond to your comments, questions, and support requests</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Detect, prevent, and address technical issues or fraud</li>
              <li>Send promotional emails (you can opt-out at any time)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* 3. Data Sharing and Disclosure */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Data Sharing and Disclosure
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We do not sell your personal information. We may share your information with:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              3.1 Service Providers
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li><strong>Supabase:</strong> Database hosting and authentication (data stored in US servers)</li>
              <li><strong>Stripe:</strong> Payment processing (they have their own privacy policy)</li>
              <li><strong>PostHog:</strong> Analytics and user behavior tracking (anonymized data)</li>
              <li><strong>Vercel:</strong> Hosting and deployment infrastructure</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              3.2 Legal Requirements
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may disclose your information if required to do so by law or in response to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Valid legal processes (subpoenas, court orders)</li>
              <li>Governmental requests</li>
              <li>Protection of our rights, property, or safety</li>
              <li>Prevention of fraud or security threats</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              3.3 Business Transfers
            </h3>
            <p className="text-gray-700 leading-relaxed">
              If SafeBaby is involved in a merger, acquisition, or sale of assets, your information may be
              transferred. We will provide notice before your information is transferred and becomes subject
              to a different privacy policy.
            </p>
          </section>

          {/* 4. Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to track activity on our Service. You can
              instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              Types of Cookies We Use:
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for authentication and basic functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our Service (PostHog)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
            </ul>
          </section>

          {/* 5. Your Rights and Choices */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Your Rights and Choices
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the following rights regarding your personal information:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              5.1 Access and Portability
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can access and download your personal data from your account settings. You can export your
              favorite products and scan history at any time.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              5.2 Correction and Update
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can update your account information at any time through your profile settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              5.3 Deletion
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can delete your account at any time. This will permanently remove your personal information
              from our active databases. Some information may be retained in backups for a limited time or as
              required by law.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              5.4 Marketing Opt-Out
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can opt out of promotional emails by clicking the "unsubscribe" link in any marketing email
              or by updating your email preferences in your account settings. Note: You will still receive
              transactional emails (account confirmations, password resets, etc.).
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              5.5 Cookie Control
            </h3>
            <p className="text-gray-700 leading-relaxed">
              You can control cookies through your browser settings. However, disabling certain cookies may
              limit your ability to use some features of the Service.
            </p>
          </section>

          {/* 6. Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We implement appropriate technical and organizational security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Encryption of data in transit using HTTPS/TLS</li>
              <li>Password encryption using industry-standard hashing</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure database hosting with Supabase</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              However, no method of transmission over the Internet or electronic storage is 100% secure.
              While we strive to use commercially acceptable means to protect your information, we cannot
              guarantee absolute security.
            </p>
          </section>

          {/* 7. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Children's Privacy (COPPA Compliance)
            </h2>
            <Card className="bg-yellow-50 border-yellow-200 mb-4">
              <CardContent className="p-4">
                <p className="text-yellow-900 font-semibold">
                  SafeBaby is designed for use by parents and caregivers, not children.
                </p>
              </CardContent>
            </Card>
            <p className="text-gray-700 leading-relaxed mb-3">
              Our Service is not directed to children under 13 years of age. We do not knowingly collect
              personal information from children under 13. If you are a parent or guardian and believe your
              child has provided us with personal information, please contact us, and we will delete such
              information.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The Service is intended for adults making decisions about baby food products. While the Service
              contains information about products for babies, it is the parent or caregiver who creates the
              account and uses the Service.
            </p>
          </section>

          {/* 8. California Residents (CCPA) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. California Residents (CCPA Rights)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you are a California resident, you have additional rights under the California Consumer
              Privacy Act (CCPA):
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li><strong>Right to Know:</strong> Request disclosure of personal information we collect, use, and share</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information (we don't sell your data)</li>
              <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your rights</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              To exercise these rights, contact us at privacy@safebaby.co. We will verify your identity
              before processing your request.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>California "Shine the Light" Law:</strong> California residents can request information
              about how we share certain personal information with third parties for their direct marketing
              purposes. We do not share personal information with third parties for their direct marketing.
            </p>
          </section>

          {/* 9. European Union Users (GDPR) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. European Union Users (GDPR Rights)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you are in the European Economic Area (EEA), you have rights under the General Data Protection
              Regulation (GDPR):
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li><strong>Right of Access:</strong> Request copies of your personal data</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of data to another service</li>
              <li><strong>Right to Object:</strong> Object to processing of your data</li>
              <li><strong>Rights Related to Automated Decision-Making:</strong> Not be subject to automated decisions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              Legal Basis for Processing
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We process your personal data based on:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li><strong>Consent:</strong> When you agree to receive marketing communications</li>
              <li><strong>Contract:</strong> To provide the Service you requested</li>
              <li><strong>Legitimate Interests:</strong> To improve our Service and prevent fraud</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              International Data Transfers
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Your data may be transferred to and processed in the United States. We ensure appropriate
              safeguards are in place for such transfers in compliance with GDPR requirements.
            </p>
          </section>

          {/* 10. Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Provide you with the Service</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Maintain business records</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              When you delete your account, we delete your personal information from our active databases within
              30 days. Some information may be retained in backups for up to 90 days or longer if required by law.
            </p>
          </section>

          {/* 11. Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Third-Party Links
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our Service may contain links to third-party websites, including lab reports, manufacturer websites,
              and research studies. We are not responsible for the privacy practices of these external sites.
              We encourage you to read the privacy policies of any third-party sites you visit.
            </p>
          </section>

          {/* 12. Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Updating the "Last Updated" date at the top of this page</li>
              <li>Sending you an email notification (if you have an account)</li>
              <li>Displaying a prominent notice on the Service</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Your continued use of the Service after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* 13. Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              13. Contact Us About Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <p className="text-gray-900 mb-3">
                  <strong>SafeBaby Privacy Team</strong><br />
                  Email: privacy@safebaby.co<br />
                  Website: www.safebaby.co
                </p>
                <p className="text-sm text-gray-600">
                  For GDPR-related inquiries: gdpr@safebaby.co<br />
                  For CCPA-related inquiries: ccpa@safebaby.co
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Summary Card */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Icons.shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">
                    Your Privacy in Summary
                  </h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>✓ We don't sell your personal information</li>
                    <li>✓ You can delete your account and data at any time</li>
                    <li>✓ We use industry-standard security measures</li>
                    <li>✓ You control your email preferences</li>
                    <li>✓ We comply with GDPR and CCPA regulations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/terms" className="text-primary-600 hover:text-primary-700">
              Terms of Service
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/contact" className="text-primary-600 hover:text-primary-700">
              Contact Us
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/" className="text-primary-600 hover:text-primary-700">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
