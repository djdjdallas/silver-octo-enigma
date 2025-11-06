// Barcode scanner page
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import BarcodeScanner from '@/components/BarcodeScanner';
import Disclaimer from '@/components/Disclaimer';
import {
  CircleDecoration,
  FruitIllustration,
} from '@/components/DecorativeElements';
import toast from 'react-hot-toast';

export default function ScanPage() {
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const router = useRouter();
  const supabase = createClient();
  const { incrementScanCount } = useSubscription();

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
  }, [router]);

  const handleBarcodeScanned = async (barcode) => {
    setLoading(true);
    toast.loading('Looking up product...');

    try {
      // Search for product by barcode
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('barcode', barcode)
        .single();

      toast.dismiss();

      if (error || !product) {
        // Product not found
        toast.error('Product not found in database');
        setLoading(false);
        return;
      }

      // Increment scan count for conversion tracking
      incrementScanCount();

      // Product found - redirect to product page
      toast.success('Product found!');
      router.push(`/product/${product.id}`);
    } catch (error) {
      console.error('Error looking up product:', error);
      toast.dismiss();
      toast.error('Error looking up product');
      setLoading(false);
    }
  };

  const handleScanError = (error) => {
    toast.error(error);
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
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 opacity-20 z-0">
        <FruitIllustration type="banana" className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20 z-0">
        <FruitIllustration type="strawberry" className="w-12 h-12 md:w-20 md:h-20" />
      </div>
      <CircleDecoration className="absolute top-40 left-20 w-32 h-32 opacity-10 z-0" color="butter" />
      <CircleDecoration className="absolute bottom-60 right-10 w-24 h-24 opacity-10 z-0" color="lavender" />

      <div className="container mx-auto px-4 max-w-2xl py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 bg-white rounded-3xl shadow-lg p-8 md:p-10 border-2 border-primary-100 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary-200 to-coral-200 rounded-full opacity-30 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-butter-200 to-lavender-200 rounded-full opacity-30 blur-2xl" />

          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
              Scan Product Barcode 📱
            </h1>
            <p className="text-lg text-gray-600">
              Use your camera to scan the barcode on any baby food product
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-6">
          <Disclaimer variant="full" />
        </div>

        {/* Scanner */}
        <BarcodeScanner
          onScan={handleBarcodeScanned}
          onError={handleScanError}
        />

        {/* Product Not Found Card */}
        <Card className="mt-6 rounded-3xl border-0 shadow-xl bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 rounded-full opacity-20 -mr-16 -mt-16" />
          <CardContent className="p-8 relative z-10">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Icons.info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 text-xl">
                  Product Not in Database?
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  If we don't have your product yet, you can request it to be added.
                  We're constantly adding new products based on user requests.
                </p>
                <Button className="bg-primary hover:bg-primary-600 rounded-full">
                  Request Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Search */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600 mb-4 font-medium">
            Having trouble scanning?
          </p>
          <Button
            variant="outline"
            onClick={() => router.push('/search')}
            className="rounded-full border-2 px-8"
          >
            <Icons.search className="w-5 h-5 mr-2" />
            Search Manually
          </Button>
        </div>

        {/* Supported Barcodes */}
        <Card className="mt-8 rounded-3xl border-0 shadow-xl bg-white">
          <CardContent className="p-8">
            <h3 className="font-bold text-gray-900 mb-4 text-xl">
              Supported Barcode Types
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 p-4 bg-green-50 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Icons.checkmark className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">UPC-A and UPC-E (most common in US)</span>
              </li>
              <li className="flex items-center space-x-3 p-4 bg-green-50 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Icons.checkmark className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">EAN-13 and EAN-8 (international)</span>
              </li>
              <li className="flex items-center space-x-3 p-4 bg-green-50 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Icons.checkmark className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">QR codes (some products)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
