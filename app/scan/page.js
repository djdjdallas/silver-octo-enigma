/**
 * Scan Page - Photo-Based Product Scanning
 *
 * Allows users to scan products by taking photos instead of using unreliable barcode scanners.
 * The AI extracts the barcode, product name, brand, and ingredients from the photo.
 *
 * Flow:
 * 1. User takes photo or selects from gallery
 * 2. Scanning animation plays while AI processes
 * 3. Product lookup via unified lookup action
 * 4. Route to appropriate product page
 *
 * @route /scan
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { PhotoCapture } from '@/components/PhotoCapture';
import { scanProductPhoto } from '@/app/actions/photoScan';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/contexts/SubscriptionContext';

export default function ScanPage() {
  const router = useRouter();
  const supabase = createClient();
  const { incrementScanCount } = useSubscription();

  const [error, setError] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');

  // Check authentication
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Redirect to login with return URL
        const currentPath = window.location.pathname;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      setAuthChecking(false);
    }

    checkAuth();
  }, [router, supabase]);

  /**
   * Handle photo capture and processing
   */
  const handlePhotoCapture = async (imageBase64) => {
    setError(null);

    try {
      console.log('Processing captured photo...');
      console.log('Image base64 length:', imageBase64?.length);

      const result = await scanProductPhoto(imageBase64);

      console.log('Scan result:', result);

      if (!result.success) {
        const errorMsg = result.error || result.details || 'Failed to scan product';
        const suggestion = result.suggestion || '';
        setError(`${errorMsg}${suggestion ? ` ${suggestion}` : ''}`);
        console.error('Scan failed:', result);
        return;
      }

      console.log('Scan successful!', result);

      // Increment scan count for analytics
      incrementScanCount();

      // Route based on lookup result type
      const { lookupResult } = result;

      if (lookupResult.type === 'lab_tested') {
        // Navigate to lab-tested product page
        console.log('Routing to lab-tested product:', lookupResult.product.id);
        router.push(`/product/${lookupResult.product.id}`);
      } else if (lookupResult.type === 'ai_analyzed') {
        // Navigate to AI-analyzed product page
        console.log('Routing to AI-analyzed product:', lookupResult.product.id);
        router.push(`/ai-product/${lookupResult.product.id}`);
      } else if (lookupResult.type === 'not_found') {
        setError('Product not found in any database. Try again or request lab testing.');
      } else {
        setError('Unable to analyze product. Please try again.');
      }
    } catch (err) {
      console.error('Scan error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  /**
   * Handle manual barcode entry
   */
  const handleManualSubmit = async () => {
    if (!manualBarcode.trim()) return;

    // Import and use the lookup action directly
    const { lookupProduct } = await import('@/app/actions/productLookup');

    try {
      setError(null);
      const result = await lookupProduct(manualBarcode.trim());

      if (result.type === 'lab_tested') {
        router.push(`/product/${result.product.id}`);
      } else if (result.type === 'ai_analyzed') {
        router.push(`/ai-product/${result.product.id}`);
      } else if (result.type === 'not_found') {
        setError('Product not found. Please check the barcode and try again.');
      } else {
        setError('Unable to look up product. Please try again.');
      }
    } catch (err) {
      console.error('Manual lookup error:', err);
      setError('Failed to look up product. Please try again.');
    }
  };

  // Show loading screen while checking authentication
  if (authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-coral-50 flex items-center justify-center">
        <div className="text-center">
          <Icons.spinner className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-spin" />
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-coral-50 relative overflow-hidden">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Scan Product 📸
          </h1>
          <p className="text-gray-600 text-lg">
            Take a photo to check heavy metals and safety ratings
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="rounded-3xl">
            <Icons.alertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Photo Capture Component */}
        <PhotoCapture
          onPhotoCapture={handlePhotoCapture}
          onCancel={() => router.push('/')}
        />

        {/* Manual Entry Option */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px flex-1 bg-gray-300" />
            <p className="text-sm text-gray-600 font-medium">OR</p>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {!showManualInput ? (
            <Button
              variant="outline"
              onClick={() => setShowManualInput(true)}
              className="rounded-full"
            >
              <Icons.keyboard className="w-4 h-4 mr-2" />
              Enter Barcode Manually
            </Button>
          ) : (
            <Card className="rounded-3xl border-0 shadow-xl">
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPC Barcode Number
                  </label>
                  <input
                    type="text"
                    value={manualBarcode}
                    onChange={(e) => setManualBarcode(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleManualSubmit();
                      }
                    }}
                    placeholder="e.g., 051000013897"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    maxLength={14}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowManualInput(false);
                      setManualBarcode('');
                    }}
                    className="flex-1 rounded-full"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleManualSubmit}
                    className="flex-1 rounded-full"
                    disabled={!manualBarcode.trim()}
                  >
                    <Icons.search className="w-4 h-4 mr-2" />
                    Look Up
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Photo Tips */}
        <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center">
              <Icons.lightbulb className="w-5 h-5 mr-2 text-blue-600" />
              Photo Tips for Best Results
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">✓</span>
                <span>Make sure the barcode is clearly visible and in focus</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">✓</span>
                <span>Include the product name and brand in the photo</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">✓</span>
                <span>Use good lighting - avoid shadows on the barcode</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">✓</span>
                <span>You can also photograph the ingredients list for better analysis</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Alternative Actions */}
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-600">
            Prefer to search by name?
          </p>
          <Button
            variant="outline"
            onClick={() => router.push('/search')}
            className="rounded-full border-2 px-6"
          >
            <Icons.search className="w-5 h-5 mr-2" />
            Search Manually
          </Button>
        </div>
      </div>
    </div>
  );
}
