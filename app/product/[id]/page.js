// Product detail page with contaminant data and paywall logic
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import ScoreDisplay from '@/components/ScoreDisplay';
import ContaminantCard from '@/components/ContaminantCard';
import UpgradeBanner from '@/components/UpgradeBanner';
import ComparisonPaywall from '@/components/ComparisonPaywall';
import Disclaimer from '@/components/Disclaimer';
import { formatDate, getUserTier } from '@/lib/utils';
import ProductActions from './ProductActions';

export async function generateMetadata({ params }) {
  const supabase = await createClient();
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - Safety Rating | SafeBaby`,
    description: `View heavy metal test results and safety ratings for ${product.name} by ${product.brand}. See detailed lab data for arsenic, lead, cadmium, and mercury.`,
    openGraph: {
      title: `${product.name} - Safety Rating`,
      description: `Heavy metal test results for ${product.name}`,
      images: product.image_url ? [product.image_url] : [],
    },
  };
}

async function getProductData(productId) {
  const supabase = await createClient();

  // Get product
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (productError || !product) {
    return null;
  }

  // Get lab results with contaminants
  const { data: labResults } = await supabase
    .from('lab_results')
    .select(`
      *,
      contaminants (*)
    `)
    .eq('product_id', productId)
    .order('test_date', { ascending: false });

  return {
    product,
    labResults: labResults || [],
  };
}

async function getUserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile;
}

export default async function ProductDetailPage({ params }) {
  const data = await getProductData(params.id);

  if (!data) {
    notFound();
  }

  const { product, labResults } = data;
  const userProfile = await getUserProfile();
  const userTier = getUserTier(userProfile);
  const isPro = userTier === 'pro';

  // Check if any contaminants exceed limits
  const hasExceedingContaminants = labResults.some((result) =>
    result.contaminants?.some((c) => c.exceeds_limit)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Upgrade banner for free users */}
      {!isPro && <UpgradeBanner />}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Link href="/search">
            <Button variant="ghost" size="sm" className="mb-4">
              <Icons.chevronRight className="w-4 h-4 mr-1 rotate-180" />
              Back to Search
            </Button>
          </Link>

          {/* Disclaimer */}
          <div className="mb-6">
            <Disclaimer variant="full" />
          </div>

          {/* Product Header */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Product Image */}
            <div className="aspect-square relative bg-white rounded-lg overflow-hidden shadow-md">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icons.package className="w-32 h-32 text-gray-300" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                {product.category && (
                  <Badge variant="secondary" className="capitalize mb-2">
                    {product.category}
                  </Badge>
                )}
                {hasExceedingContaminants && (
                  <Badge variant="destructive" className="ml-2">
                    <Icons.alert className="w-3 h-3 mr-1" />
                    Contains Excess Contaminants
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {product.brand && (
                <p className="text-xl text-gray-600 mb-4">by {product.brand}</p>
              )}

              {product.description && (
                <p className="text-gray-700 mb-6">{product.description}</p>
              )}

              {/* Product Actions (Share, Favorite) */}
              <ProductActions product={product} />

              {/* Compare Products Button */}
              <div className="mt-4">
                <ComparisonPaywall currentProduct={product} variant="button" />
              </div>

              {/* Quick Stats */}
              <Card className="mt-6">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {labResults.length}
                      </div>
                      <div className="text-sm text-gray-600">Lab Tests</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {labResults.reduce((acc, r) => acc + (r.contaminants?.length || 0), 0)}
                      </div>
                      <div className="text-sm text-gray-600">Contaminants Tested</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Score Display */}
          {product.overall_score && (
            <div className="mb-8">
              <ScoreDisplay score={product.overall_score} userTier={userTier} />
            </div>
          )}

          {/* Lab Results Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Laboratory Test Results
              </h2>
              <p className="text-gray-600 mb-6">
                All lab results are available to everyone for free. These tests are conducted by independent laboratories.
              </p>
            </div>

            {labResults.length > 0 ? (
              labResults.map((labResult) => (
                <Card key={labResult.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">
                          {labResult.lab_name}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          Test Date: {formatDate(labResult.test_date)}
                        </p>
                      </div>
                      {labResult.report_url && (
                        <a
                          href={labResult.report_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            <Icons.external className="w-4 h-4 mr-2" />
                            View Report
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    {labResult.contaminants && labResult.contaminants.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {labResult.contaminants.map((contaminant) => (
                          <ContaminantCard key={contaminant.id} contaminant={contaminant} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No contaminant data available for this test.</p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Icons.alert className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Lab Results Available
                  </h3>
                  <p className="text-gray-600">
                    This product hasn't been tested yet or results are pending.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Information Card with Data Source Attribution */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    About Our Testing Data
                  </h3>
                  <p className="text-sm text-blue-800 mb-3">
                    Our database includes test results from independent laboratories and published reports from
                    organizations like Healthy Babies Bright Futures. All data is regularly updated as new test
                    results become available.
                  </p>
                  <div className="border-t border-blue-200 pt-3 mt-3">
                    <p className="text-xs text-blue-700 font-medium mb-2">Data Sources:</p>
                    <ul className="text-xs text-blue-700 space-y-1 ml-4 list-disc">
                      <li>Healthy Babies Bright Futures Study (2019)</li>
                      <li>California AB 899 Manufacturer Disclosures</li>
                      <li>Consumer Reports Baby Food Testing (2023)</li>
                      <li>FDA Total Diet Study and Testing Data</li>
                      <li>Independent laboratory test reports</li>
                      <li>Manufacturer voluntary disclosures</li>
                    </ul>
                    <p className="text-xs text-blue-600 mt-3 italic">
                      <strong>Important:</strong> Test results reflect the specific batch tested and may not represent
                      current product formulations. Heavy metal levels can vary by batch, manufacturing date, and
                      ingredient sourcing. Always verify with current product packaging and consult your pediatrician.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
