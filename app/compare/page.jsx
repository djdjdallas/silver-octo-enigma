// Product comparison page
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import ProductSelector from '@/components/ProductSelector';
import ComparisonTable from '@/components/ComparisonTable';
import AIComparisonInsights from '@/components/AIComparisonInsights';
import { validateComparisonLimit, generateComparisonShareLink, parseComparisonQuery, getComparisonSummary } from '@/lib/comparison';
import { getUserTier } from '@/lib/utils';
import {
  CircleDecoration,
  FruitIllustration,
} from '@/components/DecorativeElements';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [contaminants, setContaminants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [savingComparison, setSavingComparison] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const supabase = createClient();

  // Check authentication and load user profile
  useEffect(() => {
    async function checkAuthAndLoadProfile() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Redirect to login with return URL
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setUserProfile(profile);
      setAuthChecking(false);
    }

    checkAuthAndLoadProfile();
  }, [router]);

  // Load products from URL query params
  useEffect(() => {
    const productsParam = searchParams.get('products');
    if (!productsParam) return;

    const productIds = parseComparisonQuery(productsParam);
    if (productIds.length === 0) return;

    loadProductsFromIds(productIds);
  }, [searchParams]);

  async function loadProductsFromIds(productIds) {
    setLoading(true);

    try {
      // Load products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .in('id', productIds);

      if (productsError) throw productsError;

      if (products && products.length > 0) {
        setSelectedProducts(products);

        // Load contaminants for these products
        const { data: labResults } = await supabase
          .from('lab_results')
          .select('id, product_id')
          .in('product_id', productIds);

        if (labResults && labResults.length > 0) {
          const labResultIds = labResults.map(lr => lr.id);

          const { data: contaminantsData } = await supabase
            .from('contaminants')
            .select('*, lab_results!inner(product_id)')
            .in('lab_result_id', labResultIds);

          if (contaminantsData) {
            // Flatten the contaminants data
            const flatContaminants = contaminantsData.map(c => ({
              ...c,
              product_id: c.lab_results.product_id
            }));
            setContaminants(flatContaminants);
          }
        }
      }
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  const handleProductSelect = async (product) => {
    const validation = validateComparisonLimit(selectedProducts.length + 1);
    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    const newProducts = [...selectedProducts, product];
    setSelectedProducts(newProducts);

    // Update URL
    const productIds = newProducts.map(p => p.id).join(',');
    router.push(`/compare?products=${productIds}`, { scroll: false });

    // Load contaminants for this product
    const { data: labResults } = await supabase
      .from('lab_results')
      .select('id')
      .eq('product_id', product.id);

    if (labResults && labResults.length > 0) {
      const labResultIds = labResults.map(lr => lr.id);

      const { data: contaminantsData } = await supabase
        .from('contaminants')
        .select('*')
        .in('lab_result_id', labResultIds);

      if (contaminantsData) {
        const newContaminants = contaminantsData.map(c => ({
          ...c,
          product_id: product.id
        }));
        setContaminants([...contaminants, ...newContaminants]);
      }
    }

    toast.success(`${product.name} added to comparison`);
  };

  const handleProductRemove = (productId) => {
    const newProducts = selectedProducts.filter(p => p.id !== productId);
    setSelectedProducts(newProducts);

    // Update URL
    if (newProducts.length > 0) {
      const productIds = newProducts.map(p => p.id).join(',');
      router.push(`/compare?products=${productIds}`, { scroll: false });
    } else {
      router.push('/compare', { scroll: false });
    }

    // Remove contaminants for this product
    setContaminants(contaminants.filter(c => c.product_id !== productId));

    toast.success('Product removed from comparison');
  };

  const handleShareComparison = async () => {
    if (selectedProducts.length < 2) {
      toast.error('Select at least 2 products to share');
      return;
    }

    const shareLink = generateComparisonShareLink(selectedProducts.map(p => p.id));

    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success('Comparison link copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Failed to copy link');
    }
  };

  const handleSaveComparison = async () => {
    if (!userProfile) {
      toast.error('Please login to save comparisons');
      return;
    }

    if (selectedProducts.length < 2) {
      toast.error('Select at least 2 products to save');
      return;
    }

    setSavingComparison(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('product_comparisons')
        .insert({
          user_id: user.id,
          product_ids: selectedProducts.map(p => p.id),
          name: `Comparison ${new Date().toLocaleDateString()}`,
        });

      if (error) throw error;

      toast.success('Comparison saved!');
    } catch (error) {
      console.error('Error saving comparison:', error);
      toast.error('Failed to save comparison');
    } finally {
      setSavingComparison(false);
    }
  };

  const handleExportPDF = () => {
    const userTier = getUserTier(userProfile);

    if (userTier !== 'pro') {
      toast.error('PDF export is a Pro feature');
      router.push('/upgrade');
      return;
    }

    // In a real implementation, this would generate a PDF
    toast.success('PDF export feature coming soon!');
  };

  const handleClearAll = () => {
    setSelectedProducts([]);
    setContaminants([]);
    router.push('/compare', { scroll: false });
    toast.success('Comparison cleared');
  };

  const userTier = getUserTier(userProfile);
  const canCompare = selectedProducts.length >= 2;
  const summary = canCompare ? getComparisonSummary(selectedProducts) : null;

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
        <FruitIllustration type="apple" className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20 z-0">
        <FruitIllustration type="orange" className="w-12 h-12 md:w-20 md:h-20" />
      </div>
      <CircleDecoration className="absolute top-40 left-20 w-32 h-32 opacity-10 z-0" color="lavender" />
      <CircleDecoration className="absolute bottom-60 right-10 w-24 h-24 opacity-10 z-0" color="butter" />

      <div className="container mx-auto px-4 max-w-7xl py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 bg-white rounded-3xl shadow-lg p-8 md:p-10 border-2 border-primary-100 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-coral-200 to-primary-200 rounded-full opacity-30 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-butter-200 to-lavender-200 rounded-full opacity-30 blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
                  Compare Products 🔬
                </h1>
                <p className="text-lg text-gray-600">
                  Compare up to 4 baby food products side-by-side
                </p>
              </div>

              {canCompare && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="default" onClick={handleShareComparison} className="rounded-full border-2">
                    <Icons.share className="w-4 h-4 mr-2" />
                    Share
                  </Button>

                  <Button variant="outline" size="default" onClick={handleSaveComparison} disabled={savingComparison} className="rounded-full border-2">
                    {savingComparison ? (
                      <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Icons.heart className="w-4 h-4 mr-2" />
                    )}
                    Save
                  </Button>

                  <Button variant="outline" size="default" onClick={handleExportPDF} className="rounded-full border-2">
                    <Icons.download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>

                  <Button variant="outline" size="default" onClick={handleClearAll} className="rounded-full border-2 text-red-600 hover:bg-red-500 hover:text-white">
                    <Icons.close className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Selection */}
        <Card className="mb-8 rounded-3xl border-0 shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">Select Products to Compare</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductSelector
              selectedProducts={selectedProducts}
              onProductSelect={handleProductSelect}
              onProductRemove={handleProductRemove}
              maxProducts={4}
            />
          </CardContent>
        </Card>

        {/* Comparison Summary */}
        {canCompare && summary && userTier === 'pro' && (
          <Card className="mb-8 rounded-3xl border-2 border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-400 rounded-full opacity-20 -mr-16 -mt-16" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <Icons.info className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-4 text-xl">Comparison Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Average Score</p>
                      <p className="text-3xl font-bold text-gray-900">{summary.averageScore}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Highest Score</p>
                      <p className="text-3xl font-bold text-green-600">{summary.highestScore}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Lowest Score</p>
                      <p className="text-3xl font-bold text-red-600">{summary.lowestScore}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Score Range</p>
                      <p className="text-3xl font-bold text-gray-900">{summary.scoreRange}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Comparison Insights */}
        {canCompare && (
          <div className="mb-8">
            <AIComparisonInsights
              products={selectedProducts}
              contaminants={contaminants}
              userTier={userTier}
            />
          </div>
        )}

        {/* Comparison Table */}
        {loading ? (
          <Card className="rounded-3xl border-0 shadow-xl bg-white">
            <CardContent className="p-16 text-center">
              <Icons.spinner className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-spin" />
              <p className="text-lg text-gray-600">Loading products...</p>
            </CardContent>
          </Card>
        ) : canCompare ? (
          <ComparisonTable
            products={selectedProducts}
            contaminants={contaminants}
            userTier={userTier}
          />
        ) : (
          <Card className="rounded-3xl border-0 shadow-xl bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-coral-100 to-primary-100 rounded-full opacity-30 -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-lavender-100 to-butter-100 rounded-full opacity-30 -ml-16 -mb-16" />

            <CardContent className="p-12 md:p-16 text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-coral-100 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icons.filter className="w-12 h-12 text-primary-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Start Comparing Products
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Add at least 2 products to see a side-by-side comparison
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button asChild className="bg-coral hover:bg-coral-600 text-white rounded-full px-8 shadow-lg">
                  <Link href="/search" className="flex items-center">
                    <Icons.search className="w-5 h-5 mr-2" />
                    Browse Products
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-8 border-2">
                  <Link href="/scan" className="flex items-center">
                    <Icons.scan className="w-5 h-5 mr-2" />
                    Scan Barcode
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Feature Info */}
        {!userProfile && (
          <Card className="mt-8 rounded-3xl border-0 shadow-xl bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Icons.info className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-xl">Save and Share Comparisons</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Sign in to save your comparisons and access them later from any device.
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary-600 rounded-full">
                    <Link href="/login" className="flex items-center">Sign In</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
