// Legally-sound disclaimer component for liability protection
'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function Disclaimer({ variant = 'full' }) {
  // Full disclaimer for pages
  if (variant === 'full') {
    return (
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start space-x-3">
            <Icons.alert className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 mb-2">
                Important Disclaimer
              </h3>
              <p className="text-sm text-yellow-800 leading-relaxed">
                SafeBaby provides publicly available food safety information for educational purposes only.
                <strong> This is not medical advice.</strong> Test results are sourced from independent labs,
                government agencies, and manufacturer disclosures, and may not reflect current product formulations.
                Heavy metal levels can vary by batch and manufacturing date. Always consult your pediatrician
                before making dietary changes for your baby. SafeBaby is not liable for decisions made based
                on this information.{' '}
                <Link href="/terms" className="underline hover:text-yellow-900 font-medium">
                  View full Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Compact disclaimer for footer
  if (variant === 'compact') {
    return (
      <div className="text-xs text-gray-600 max-w-4xl mx-auto text-center">
        <p>
          <strong>Disclaimer:</strong> SafeBaby provides publicly available food safety information for
          educational purposes only. This is not medical advice. Always consult your pediatrician.{' '}
          <Link href="/terms" className="underline hover:text-gray-900">
            Terms
          </Link>{' '}
          |{' '}
          <Link href="/privacy" className="underline hover:text-gray-900">
            Privacy
          </Link>
        </p>
      </div>
    );
  }

  // Minimal disclaimer for inline use
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
      <p className="text-xs text-yellow-800">
        <strong>Disclaimer:</strong> This information is for educational purposes only and is not medical advice.
        Always consult your pediatrician before making dietary changes.
      </p>
    </div>
  );
}
