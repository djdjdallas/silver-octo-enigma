// Product comparison paywall component
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { useSubscription } from '@/contexts/SubscriptionContext';

export default function ComparisonPaywall({ currentProduct, variant = 'button' }) {
  const { isPro } = useSubscription();
  const [showPreview, setShowPreview] = useState(false);

  // Button variant - shown on product pages
  if (variant === 'button') {
    if (isPro) {
      // For Pro users, show functional compare button
      return (
        <Button variant="outline" className="w-full">
          <Icons.filter className="w-4 h-4 mr-2" />
          Compare Products
        </Button>
      );
    }

    // For free users, show button that opens preview
    return (
      <>
        <Button
          variant="outline"
          className="w-full border-2 border-primary-300 hover:bg-primary-50"
          onClick={() => setShowPreview(true)}
        >
          <Icons.filter className="w-4 h-4 mr-2" />
          Compare Products
          <Icons.lock className="w-3 h-3 ml-2" />
        </Button>

        {/* Preview Modal */}
        {showPreview && (
          <ComparisonPreviewModal
            currentProduct={currentProduct}
            onClose={() => setShowPreview(false)}
          />
        )}
      </>
    );
  }

  // Card variant - shown in comparison section
  if (variant === 'card') {
    return (
      <Card className="border-2 border-primary-300 bg-gradient-to-br from-primary-50 to-white">
        <CardContent className="p-6 text-center">
          <div className="bg-primary-100 rounded-full p-4 inline-block mb-4">
            <Icons.filter className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Compare Products Side-by-Side
          </h3>
          <p className="text-gray-600 mb-4">
            Unlock Pro to compare up to 4 products at once and find the safest options for your baby.
          </p>
          <div className="space-y-2 mb-6 text-left max-w-sm mx-auto">
            <div className="flex items-center space-x-2 text-sm">
              <Icons.checkmark className="w-4 h-4 text-green-600" />
              <span>Side-by-side safety score comparison</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icons.checkmark className="w-4 h-4 text-green-600" />
              <span>Detailed contaminant level breakdown</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icons.checkmark className="w-4 h-4 text-green-600" />
              <span>Price per ounce comparison</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icons.checkmark className="w-4 h-4 text-green-600" />
              <span>Export results as PDF</span>
            </div>
          </div>
          <Link href="/upgrade">
            <Button size="lg" className="w-full">
              <Icons.unlock className="w-5 h-5 mr-2" />
              Upgrade to Pro - $4/month
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return null;
}

// Preview modal showing what comparison looks like
function ComparisonPreviewModal({ currentProduct, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <Icons.close className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Product Comparison Preview
            </h2>
            <p className="text-gray-600">
              See how you can compare up to 4 products side-by-side with Pro
            </p>
          </div>

          {/* Blurred comparison preview */}
          <div className="relative">
            <div className="blur-sm select-none pointer-events-none opacity-60">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Product 1 - Current */}
                <div className="border rounded-lg p-4">
                  <div className="aspect-square bg-gray-200 rounded mb-3 relative">
                    {currentProduct?.image_url && (
                      <Image
                        src={currentProduct.image_url}
                        alt={currentProduct.name}
                        fill
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{currentProduct?.name || 'Product 1'}</h3>
                  <Badge className="bg-green-500 mb-2">Score: 85</Badge>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Lead:</span>
                      <span>2.1 ppb</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Arsenic:</span>
                      <span>3.4 ppb</span>
                    </div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="border rounded-lg p-4">
                  <div className="aspect-square bg-gray-200 rounded mb-3" />
                  <h3 className="font-semibold text-sm mb-1">Similar Product 2</h3>
                  <Badge className="bg-yellow-500 mb-2">Score: 72</Badge>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Lead:</span>
                      <span>4.2 ppb</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Arsenic:</span>
                      <span>5.1 ppb</span>
                    </div>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="border rounded-lg p-4">
                  <div className="aspect-square bg-gray-200 rounded mb-3" />
                  <h3 className="font-semibold text-sm mb-1">Similar Product 3</h3>
                  <Badge className="bg-green-500 mb-2">Score: 88</Badge>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Lead:</span>
                      <span>1.5 ppb</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Arsenic:</span>
                      <span>2.8 ppb</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
              <div className="bg-primary-500 rounded-full p-4 mb-4">
                <Icons.lock className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center px-4">
                Unlock Side-by-Side Comparison
              </h3>
              <p className="text-gray-600 mb-6 max-w-md text-center px-4">
                Compare up to 4 products at once to find the safest options.
                See detailed scores, contaminant levels, and make informed decisions.
              </p>
              <Link href="/upgrade" onClick={onClose}>
                <Button size="lg">
                  <Icons.unlock className="w-5 h-5 mr-2" />
                  Upgrade to Pro - $4/month
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-3">
                or $40/year (save $8)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
