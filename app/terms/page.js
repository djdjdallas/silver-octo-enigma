// Terms of Service page with comprehensive legal protection
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export const metadata = {
  title: 'Terms of Service | SafeBaby',
  description: 'Terms of Service for SafeBaby - Baby Food Safety Ratings',
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Icons.alert className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">
                  Please Read Carefully
                </h3>
                <p className="text-sm text-yellow-800">
                  By using SafeBaby, you agree to these terms. These terms include important liability
                  limitations and legal disclaimers that affect your rights.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Content */}
        <div className="space-y-8 bg-white rounded-lg p-8 shadow-sm">
          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              By accessing or using SafeBaby (the "Service"), you agree to be bound by these Terms of Service
              ("Terms"). If you do not agree to these Terms, you may not access or use the Service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These Terms constitute a legally binding agreement between you and SafeBaby. We may update these
              Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
            </p>
          </section>

          {/* 2. Description of Service */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              SafeBaby provides access to publicly available information about heavy metal test results in
              baby food products. The Service aggregates data from:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-3">
              <li>Independent laboratory testing reports</li>
              <li>Government agency publications and databases</li>
              <li>Manufacturer disclosures and public filings</li>
              <li>Published research studies and academic sources</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold">
              SafeBaby DOES NOT:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Conduct our own laboratory testing</li>
              <li>Provide medical, nutritional, or pediatric advice</li>
              <li>Endorse or recommend specific products</li>
              <li>Guarantee the accuracy, completeness, or currentness of any data</li>
              <li>Replace consultation with qualified healthcare professionals</li>
            </ul>
          </section>

          {/* 3. No Medical Advice */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. No Medical Advice Disclaimer
            </h2>
            <Card className="bg-red-50 border-red-200 mb-4">
              <CardContent className="p-4">
                <p className="text-red-900 font-semibold">
                  THE SERVICE DOES NOT PROVIDE MEDICAL ADVICE
                </p>
              </CardContent>
            </Card>
            <p className="text-gray-700 leading-relaxed mb-3">
              All information provided through SafeBaby is for <strong>educational and informational purposes
              only</strong>. The information is not intended to be a substitute for professional medical advice,
              diagnosis, or treatment.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Always seek the advice of your pediatrician or other qualified health provider</strong> with
              any questions you may have regarding your child's health, nutrition, or dietary needs. Never disregard
              professional medical advice or delay in seeking it because of something you have read on SafeBaby.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you think your child may have a medical emergency, call your doctor or 911 immediately. SafeBaby
              does not recommend or endorse any specific products, treatments, or procedures.
            </p>
          </section>

          {/* 4. Data Accuracy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Data Accuracy and Limitations
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              While we strive to provide accurate information, you acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-3">
              <li>
                <strong>Test results may not reflect current formulations:</strong> Products may be reformulated
                at any time without notice. Test results reflect the specific batch tested.
              </li>
              <li>
                <strong>Variation by batch:</strong> Heavy metal levels can vary significantly between
                manufacturing batches due to ingredient sourcing and other factors.
              </li>
              <li>
                <strong>Testing methodology differences:</strong> Different laboratories may use different
                testing methods, detection limits, and reporting standards.
              </li>
              <li>
                <strong>Data may be outdated:</strong> We cannot guarantee that all data is current or
                up-to-date. Product availability and formulations change over time.
              </li>
              <li>
                <strong>Third-party data sources:</strong> We rely on third-party sources for our data
                and cannot verify the accuracy of their testing methods or results.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <strong>WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY, RELIABILITY, COMPLETENESS,
              OR TIMELINESS OF ANY INFORMATION PROVIDED THROUGH THE SERVICE.</strong>
            </p>
          </section>

          {/* 5. User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. User Responsibilities
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              By using SafeBaby, you agree that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>You will independently verify any information before making decisions for your child</li>
              <li>You will consult with your pediatrician before making any dietary changes</li>
              <li>You understand that the Service is for informational purposes only</li>
              <li>You will not use the Service as a substitute for professional medical advice</li>
              <li>You are solely responsible for your use of the information provided</li>
              <li>You will use the Service in compliance with all applicable laws and regulations</li>
            </ul>
          </section>

          {/* 6. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Limitation of Liability
            </h2>
            <Card className="bg-red-50 border-red-200 mb-4">
              <CardContent className="p-4">
                <p className="text-red-900 font-semibold text-sm leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, SAFEBABY AND ITS OFFICERS, DIRECTORS, EMPLOYEES,
                  AND AGENTS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                  OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE, INCLUDING BUT NOT
                  LIMITED TO DAMAGES FOR PERSONAL INJURY, PROPERTY DAMAGE, LOST PROFITS, OR ANY OTHER DAMAGES
                  WHATSOEVER, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
              </CardContent>
            </Card>
            <p className="text-gray-700 leading-relaxed mb-3">
              You expressly acknowledge and agree that SafeBaby shall not be liable for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Any health consequences or medical conditions arising from dietary choices</li>
              <li>Any reliance on information provided through the Service</li>
              <li>Errors, omissions, or inaccuracies in any data or information</li>
              <li>Product recalls, contamination, or safety issues</li>
              <li>Changes in product formulations or manufacturing processes</li>
              <li>Any damages resulting from interrupted access to the Service</li>
            </ul>
          </section>

          {/* 7. Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Indemnification
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless SafeBaby and its officers, directors, employees,
              agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs,
              expenses, or fees (including reasonable attorneys' fees) arising from: (a) your use of the Service;
              (b) your violation of these Terms; (c) your violation of any rights of another party; or (d) any
              decisions made based on information obtained through the Service.
            </p>
          </section>

          {/* 8. Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of material changes
              by updating the "Last Updated" date at the top of this page. Your continued use of the Service
              after any such changes constitutes your acceptance of the new Terms. We encourage you to review
              these Terms periodically.
            </p>
          </section>

          {/* 9. Disclaimer of Warranties */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Disclaimer of Warranties
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Implied warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy or completeness of content</li>
              <li>Uninterrupted or error-free operation</li>
            </ul>
          </section>

          {/* 10. Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Governing Law and Jurisdiction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of California,
              United States, without regard to its conflict of law provisions. Any legal action or proceeding arising
              under these Terms shall be brought exclusively in the federal or state courts located in California,
              and you hereby consent to personal jurisdiction and venue therein.
            </p>
          </section>

          {/* 11. Severability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Severability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be
              limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain
              in full force and effect and enforceable.
            </p>
          </section>

          {/* 12. Entire Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Entire Agreement
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and
              SafeBaby regarding the use of the Service and supersede all prior agreements and understandings,
              whether written or oral.
            </p>
          </section>

          {/* 13. Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              13. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <p className="text-gray-900">
                  <strong>SafeBaby</strong><br />
                  Email: legal@safebaby.app<br />
                  Website: www.safebaby.app
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Acknowledgment */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Your Acknowledgment
                  </h3>
                  <p className="text-sm text-blue-800">
                    By using SafeBaby, you acknowledge that you have read, understood, and agree to be bound
                    by these Terms of Service. You also acknowledge that you have read and understood our
                    disclaimer that this Service does not provide medical advice and should not replace
                    consultation with qualified healthcare professionals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
              Privacy Policy
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
