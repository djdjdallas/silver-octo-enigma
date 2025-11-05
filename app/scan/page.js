// Barcode scanner page
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import BarcodeScanner from '@/components/BarcodeScanner';
import Disclaimer from '@/components/Disclaimer';
import toast from 'react-hot-toast';

export default function ScanPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { incrementScanCount } = useSubscription();

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Scan Product Barcode
          </h1>
          <p className="text-gray-600">
            Use your camera to scan the barcode on any baby food product
          </p>
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
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Product Not in Database?
                </h3>
                <p className="text-sm text-blue-800 mb-3">
                  If we don't have your product yet, you can request it to be added.
                  We're constantly adding new products based on user requests.
                </p>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  Request Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Search */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Having trouble scanning?
          </p>
          <Button
            variant="outline"
            onClick={() => router.push('/search')}
          >
            <Icons.search className="w-4 h-4 mr-2" />
            Search Manually
          </Button>
        </div>

        {/* Supported Barcodes */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Supported Barcode Types
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <Icons.checkmark className="w-4 h-4 text-green-600" />
                <span>UPC-A and UPC-E (most common in US)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icons.checkmark className="w-4 h-4 text-green-600" />
                <span>EAN-13 and EAN-8 (international)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icons.checkmark className="w-4 h-4 text-green-600" />
                <span>QR codes (some products)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
