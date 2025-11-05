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
import { validateComparisonLimit, generateComparisonShareLink, parseComparisonQuery, getComparisonSummary } from '@/lib/comparison';
import { getUserTier } from '@/lib/utils';
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
  const supabase = createClient();

  // Load user profile
  useEffect(() => {
    async function loadUserProfile() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setUserProfile(profile);
      }
    }

    loadUserProfile();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Compare Products
              </h1>
              <p className="text-gray-600">
                Compare up to 4 baby food products side-by-side
              </p>
            </div>

            {canCompare && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleShareComparison}>
                  <Icons.share className="w-4 h-4 mr-2" />
                  Share
                </Button>

                <Button variant="outline" size="sm" onClick={handleSaveComparison} disabled={savingComparison}>
                  {savingComparison ? (
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Icons.heart className="w-4 h-4 mr-2" />
                  )}
                  Save
                </Button>

                <Button variant="outline" size="sm" onClick={handleExportPDF}>
                  <Icons.download className="w-4 h-4 mr-2" />
                  Export PDF
                  {userTier !== 'pro' && (
                    <Badge className="ml-2 bg-primary-500">Pro</Badge>
                  )}
                </Button>

                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  <Icons.close className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Product Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Products to Compare</CardTitle>
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
          <Card className="mb-8 border-primary-500 bg-primary-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Icons.info className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Comparison Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Average Score</p>
                      <p className="text-2xl font-bold text-gray-900">{summary.averageScore}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Highest Score</p>
                      <p className="text-2xl font-bold text-green-600">{summary.highestScore}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Lowest Score</p>
                      <p className="text-2xl font-bold text-red-600">{summary.lowestScore}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Score Range</p>
                      <p className="text-2xl font-bold text-gray-900">{summary.scoreRange}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comparison Table */}
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Icons.spinner className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Loading products...</p>
            </CardContent>
          </Card>
        ) : canCompare ? (
          <ComparisonTable
            products={selectedProducts}
            contaminants={contaminants}
            userTier={userTier}
          />
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Icons.filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Start Comparing Products
              </h3>
              <p className="text-gray-600 mb-6">
                Add at least 2 products to see a side-by-side comparison
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild variant="outline">
                  <Link href="/search">
                    <Icons.search className="w-4 h-4 mr-2" />
                    Browse Products
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/scan">
                    <Icons.scan className="w-4 h-4 mr-2" />
                    Scan Barcode
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Feature Info */}
        {!userProfile && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Save and Share Comparisons</h3>
                  <p className="text-gray-700 mb-3">
                    Sign in to save your comparisons and access them later from any device.
                  </p>
                  <Button asChild size="sm">
                    <Link href="/login">Sign In</Link>
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
