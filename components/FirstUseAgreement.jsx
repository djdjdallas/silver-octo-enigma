// First-time user agreement modal
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function FirstUseAgreement() {
  const [showModal, setShowModal] = useState(false);
  const [agreedToNotMedicalAdvice, setAgreedToNotMedicalAdvice] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    // Check if user has already agreed
    const hasAgreed = localStorage.getItem('safebaby_agreed_to_terms');

    if (!hasAgreed) {
      // Show modal after a brief delay for better UX
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleContinue = () => {
    // Store agreement in localStorage
    localStorage.setItem('safebaby_agreed_to_terms', 'true');
    localStorage.setItem('safebaby_agreement_date', new Date().toISOString());
    setShowModal(false);
  };

  const canContinue = agreedToNotMedicalAdvice && agreedToTerms;

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-primary-50 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
              <Icons.shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Welcome to SafeBaby</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Please read and agree to continue
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Introduction */}
          <div>
            <p className="text-gray-700 leading-relaxed">
              Thank you for choosing SafeBaby! Before you begin, please review and accept the following
              important information about our service.
            </p>
          </div>

          {/* Important Disclaimers */}
          <div className="space-y-4">
            {/* Not Medical Advice */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Icons.alert className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-900 mb-2">
                      This is NOT Medical Advice
                    </h3>
                    <p className="text-sm text-yellow-800 leading-relaxed mb-3">
                      SafeBaby provides publicly available food safety information for <strong>educational
                      purposes only</strong>. The information on this platform:
                    </p>
                    <ul className="text-sm text-yellow-800 space-y-1 ml-4 list-disc list-inside">
                      <li>Is NOT a substitute for professional medical advice</li>
                      <li>Should NOT replace consultation with your pediatrician</li>
                      <li>Is based on independent test results that may not reflect current formulations</li>
                      <li>May vary by batch and manufacturing date</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Accuracy */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      About Our Data
                    </h3>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Our database includes test results from independent laboratories, government agencies,
                      and manufacturer disclosures. While we strive for accuracy, heavy metal levels can
                      vary between batches, and products may be reformulated without notice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liability */}
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Icons.alert className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900 mb-2">
                      Limitation of Liability
                    </h3>
                    <p className="text-sm text-red-800 leading-relaxed">
                      SafeBaby is not liable for decisions made based on this information. You are solely
                      responsible for dietary choices for your child. Always verify information independently
                      and consult with qualified healthcare professionals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkbox Agreements */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-gray-900">
              Required Acknowledgments
            </h3>

            {/* Medical Advice Checkbox */}
            <label className="flex items-start space-x-3 cursor-pointer group">
              <div className="flex-shrink-0 pt-0.5">
                <input
                  type="checkbox"
                  checked={agreedToNotMedicalAdvice}
                  onChange={(e) => setAgreedToNotMedicalAdvice(e.target.checked)}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                I understand that SafeBaby provides information for educational purposes only and{' '}
                <strong>does not provide medical advice</strong>. I will consult my pediatrician before
                making dietary changes for my baby.
              </span>
            </label>

            {/* Terms Checkbox */}
            <label className="flex items-start space-x-3 cursor-pointer group">
              <div className="flex-shrink-0 pt-0.5">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                I agree to the{' '}
                <Link
                  href="/terms"
                  target="_blank"
                  className="text-primary-600 hover:text-primary-700 underline font-medium"
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-primary-600 hover:text-primary-700 underline font-medium"
                >
                  Privacy Policy
                </Link>
                . I understand that SafeBaby is not liable for decisions made based on this information.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className="flex-1"
              size="lg"
            >
              {canContinue ? (
                <>
                  <Icons.checkmark className="w-5 h-5 mr-2" />
                  Continue to SafeBaby
                </>
              ) : (
                <>
                  <Icons.lock className="w-5 h-5 mr-2" />
                  Accept Both to Continue
                </>
              )}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-gray-500 text-center pt-2 border-t">
            <p>
              By continuing, you confirm that you are 18 years or older and have the legal capacity to
              enter into this agreement. This agreement will be stored on your device.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
