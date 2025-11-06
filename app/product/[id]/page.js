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
import AILabResultsTranslator from '@/components/AILabResultsTranslator';
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

  // Generate SEO-friendly title and description with keywords
  const brandLower = product.brand?.toLowerCase() || '';
  const nameLower = product.name?.toLowerCase() || '';

  // Add brand-specific keywords
  let brandKeyword = '';
  if (brandLower.includes('gerber')) brandKeyword = 'Is Gerber Safe?';
  else if (brandLower.includes('happy')) brandKeyword = 'Happy Baby Safety';
  else if (brandLower.includes('beech')) brandKeyword = 'Beech-Nut Testing';

  // Add product-specific keywords
  let productTypeKeyword = '';
  if (nameLower.includes('rice') || nameLower.includes('cereal')) {
    productTypeKeyword = 'Baby Food Arsenic';
  } else if (nameLower.includes('carrot') || nameLower.includes('sweet potato')) {
    productTypeKeyword = 'Baby Food Lead & Cadmium';
  } else {
    productTypeKeyword = 'Baby Food Heavy Metals';
  }

  return {
    title: `${product.name} Heavy Metals Test | ${brandKeyword || `${product.brand} Safety`} | SafeBaby`,
    description: `${product.name} by ${product.brand} heavy metals test results. See lead, arsenic, cadmium & mercury levels. ${brandKeyword} Check ${product.brand} baby food safety score and compare alternatives.`,
    keywords: [
      `${product.name} heavy metals`,
      `${product.brand} baby food safety`,
      `is ${product.brand} safe`,
      productTypeKeyword,
      `${product.brand} ${product.category || 'baby food'} testing`,
    ],
    openGraph: {
      title: `${product.name} - Heavy Metals Safety Rating`,
      description: `${productTypeKeyword} test results for ${product.name} by ${product.brand}. Independent lab testing data.`,
      images: product.image_url ? [product.image_url] : [],
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://safebaby.com'}/product/${product.id}`,
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

  // Check for active recalls
  const { data: recalls } = await supabase
    .from('recalls')
    .select('*')
    .eq('product_id', productId)
    .eq('is_active', true)
    .order('recall_date', { ascending: false });

  return {
    product,
    labResults: labResults || [],
    recalls: recalls || [],
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

  const { product, labResults, recalls } = data;
  const userProfile = await getUserProfile();
  const userTier = getUserTier(userProfile);
  const isPro = userTier === 'pro';

  // Check if any contaminants exceed limits
  const hasExceedingContaminants = labResults.some((result) =>
    result.contaminants?.some((c) => c.exceeds_limit)
  );

  // Check if product has active recalls
  const hasActiveRecalls = recalls && recalls.length > 0;

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

          {/* RECALL WARNING BANNER */}
          {hasActiveRecalls && (
            <div className="mb-8 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl shadow-2xl border-4 border-red-800 overflow-hidden animate-pulse">
              <div className="p-8 md:p-10 relative">
                {/* Warning pattern background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
                  }} />
                </div>

                <div className="relative z-10">
                  {/* Icon and heading */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Icons.alert className="w-10 h-10 md:w-12 md:h-12 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                        ⚠️ PRODUCT RECALLED
                      </h2>
                      <p className="text-xl md:text-2xl text-red-100 font-semibold">
                        This product has {recalls.length} active {recalls.length === 1 ? 'recall' : 'recalls'}
                      </p>
                    </div>
                  </div>

                  {/* Recall details */}
                  <div className="space-y-4 mb-6">
                    {recalls.map((recall) => (
                      <div key={recall.id} className="bg-white bg-opacity-95 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-red-600 text-white text-sm px-3 py-1">
                                {recall.risk_level}
                              </Badge>
                              <span className="text-sm text-gray-600">
                                Recalled: {formatDate(recall.recall_date)}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {recall.reason}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                              {recall.description}
                            </p>
                          </div>
                        </div>
                        {recall.fda_url && (
                          <div className="pt-3 border-t border-gray-200">
                            <a
                              href={recall.fda_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors"
                            >
                              <Icons.external className="w-4 h-4 mr-2" />
                              View Official FDA Recall Notice
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Action message */}
                  <div className="bg-white bg-opacity-95 rounded-2xl p-6 shadow-lg">
                    <p className="text-lg font-bold text-gray-900 mb-2">
                      ⚠️ DO NOT USE THIS PRODUCT
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      If you have this product, stop using it immediately and follow the manufacturer's instructions for returns or disposal. Contact your pediatrician if you have concerns about your child's health.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

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

              {/* SEO-optimized description */}
              <div className="text-sm text-gray-600 mb-6 bg-gray-50 rounded-lg p-4">
                <p>
                  Wondering <strong>is {product.brand} {product.name} safe</strong> for your baby?
                  Based on independent <strong>baby food heavy metals</strong> testing, this product contains measurable levels of lead, arsenic, cadmium, or mercury.
                  {product.overall_score && product.overall_score >= 80 ?
                    ` With a safety score of ${product.overall_score}/100, this is one of the safer ${product.category || 'baby food'} options available.` :
                    product.overall_score && product.overall_score < 60 ?
                    ` Consider checking our database for lower heavy metal alternatives in the ${product.category || 'baby food'} category.` :
                    ` Review the complete test results below to make an informed decision.`
                  }
                </p>
              </div>

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
              {hasActiveRecalls && (
                <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <Icons.info className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-900">
                      <p className="font-semibold mb-1">About This Safety Score</p>
                      <p className="leading-relaxed">
                        This score reflects heavy metals testing (lead, arsenic, cadmium, mercury) only.
                        It does NOT include recall status. See the recall warning above for critical safety information.
                      </p>
                    </div>
                  </div>
                </div>
              )}
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

            {/* AI-Powered Lab Results Translation */}
            {labResults.length > 0 && labResults[0].contaminants && (
              <AILabResultsTranslator
                product={product}
                contaminants={labResults.flatMap(lr => lr.contaminants || [])}
                userTier={userTier}
              />
            )}

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
