// SEO-optimized product detail page with slug-based URLs
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
import { formatDate, getUserTier, generateProductSlug } from '@/lib/utils';
import { SEO, generateProductSchema, generateBreadcrumbSchema } from '@/components/SEO';
import ProductActions from '@/app/product/[id]/ProductActions';

export async function generateMetadata({ params }) {
  const supabase = await createClient();

  // Find product by slug
  const { data: products } = await supabase
    .from('products')
    .select('*');

  const product = products?.find(p => generateProductSlug(p) === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://safebaby.app';

  return SEO({
    title: `${product.name} Safety Rating - Heavy Metal Test Results`,
    description: `Is ${product.name} safe for babies? View detailed heavy metal test results including arsenic, lead, cadmium, and mercury levels. Independent lab testing by ${product.brand}.`,
    canonical: `/products/${params.slug}`,
    ogImage: product.image_url,
    ogType: 'product',
  });
}

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('id, name, brand');

  if (!products) return [];

  return products.map((product) => ({
    slug: generateProductSlug(product),
  }));
}

async function getProductBySlug(slug) {
  const supabase = await createClient();

  // Get all products and find matching slug
  const { data: products } = await supabase
    .from('products')
    .select('*');

  const product = products?.find(p => generateProductSlug(p) === slug);

  if (!product) return null;

  // Get lab results with contaminants
  const { data: labResults } = await supabase
    .from('lab_results')
    .select(`
      *,
      contaminants (*)
    `)
    .eq('product_id', product.id)
    .order('test_date', { ascending: false });

  // Get related products (same brand or category)
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .or(`brand.eq.${product.brand},category.eq.${product.category}`)
    .neq('id', product.id)
    .limit(4);

  return {
    product,
    labResults: labResults || [],
    relatedProducts: relatedProducts || [],
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

export default async function ProductSlugPage({ params }) {
  const data = await getProductBySlug(params.slug);

  if (!data) {
    notFound();
  }

  const { product, labResults, relatedProducts } = data;
  const userProfile = await getUserProfile();
  const userTier = getUserTier(userProfile);
  const isPro = userTier === 'pro';

  // Check if any contaminants exceed limits
  const hasExceedingContaminants = labResults.some((result) =>
    result.contaminants?.some((c) => c.exceeds_limit)
  );

  const productSchema = generateProductSchema(product, labResults);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/search' },
    { name: product.brand, url: `/brands/${generateProductSlug({ name: product.brand })}` },
    { name: product.name, url: `/products/${params.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Upgrade banner for free users */}
        {!isPro && <UpgradeBanner />}

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="mb-6 text-sm">
              <ol className="flex items-center space-x-2 text-gray-600">
                <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
                <li><Icons.chevronRight className="w-4 h-4" /></li>
                <li><Link href="/search" className="hover:text-primary-600">Products</Link></li>
                <li><Icons.chevronRight className="w-4 h-4" /></li>
                <li><Link href={`/brands/${generateProductSlug({ name: product.brand })}`} className="hover:text-primary-600">{product.brand}</Link></li>
                <li><Icons.chevronRight className="w-4 h-4" /></li>
                <li className="text-gray-900 font-medium">{product.name}</li>
              </ol>
            </nav>

            {/* Product Header */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Product Image */}
              <div className="aspect-square relative bg-white rounded-lg overflow-hidden shadow-md">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={`${product.name} - Baby food safety rating`}
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
                  <p className="text-xl text-gray-600 mb-4">
                    by <Link href={`/brands/${generateProductSlug({ name: product.brand })}`} className="text-primary-600 hover:underline">{product.brand}</Link>
                  </p>
                )}

                {product.description && (
                  <p className="text-gray-700 mb-6">{product.description}</p>
                )}

                {/* Product Actions (Share, Favorite) */}
                <ProductActions product={product} />

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
            <div className="space-y-8 mb-12">
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

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Related Products from {product.brand}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <Link
                      key={relatedProduct.id}
                      href={`/products/${generateProductSlug(relatedProduct)}`}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="aspect-square relative bg-gray-100 rounded-lg mb-3 overflow-hidden">
                            {relatedProduct.image_url ? (
                              <Image
                                src={relatedProduct.image_url}
                                alt={relatedProduct.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Icons.package className="w-12 h-12 text-gray-300" />
                              </div>
                            )}
                          </div>
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-xs text-gray-600">{relatedProduct.brand}</p>
                          {relatedProduct.overall_score && (
                            <div className="mt-2">
                              <Badge variant="outline" className="text-xs">
                                Score: {relatedProduct.overall_score}
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Information Card */}
            <Card className="mt-8 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">
                      About Our Testing Data
                    </h3>
                    <p className="text-sm text-blue-800">
                      Our database includes test results from independent laboratories and published reports from
                      organizations like Healthy Babies Bright Futures. All data is regularly updated as new test
                      results become available.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
