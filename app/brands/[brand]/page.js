// SEO-optimized brand pages showing all products from a specific brand
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import ProductCard from '@/components/ProductCard';
import { generateProductSlug, getBrandSlug, getUserTier } from '@/lib/utils';
import { SEO, generateBreadcrumbSchema } from '@/components/SEO';

export async function generateMetadata({ params }) {
  const brandName = decodeURIComponent(params.brand).replace(/-/g, ' ');
  const supabase = await createClient();

  const { data: products, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .ilike('brand', brandName);

  if (!products || products.length === 0) {
    return {
      title: 'Brand Not Found',
    };
  }

  const actualBrand = products[0].brand;
  const avgScore = products.reduce((sum, p) => sum + (p.overall_score || 0), 0) / products.length;
  const safetyRating = avgScore >= 80 ? 'excellent' : avgScore >= 70 ? 'good' : avgScore >= 60 ? 'fair' : 'poor';

  return SEO({
    title: `${actualBrand} Baby Food Safety Ratings 2025 - Heavy Metal Test Results`,
    description: `Is ${actualBrand} baby food safe? View safety ratings for all ${count} ${actualBrand} products. Independent lab testing results for heavy metals including arsenic, lead, cadmium, and mercury. Compare ${actualBrand} safety scores.`,
    canonical: `/brands/${params.brand}`,
  });
}

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('brand');

  if (!products) return [];

  // Get unique brands
  const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  return uniqueBrands.map((brand) => ({
    brand: getBrandSlug(brand),
  }));
}

async function getBrandData(brandSlug) {
  const supabase = await createClient();
  const brandName = decodeURIComponent(brandSlug).replace(/-/g, ' ');

  // Get all products for this brand
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .ilike('brand', brandName)
    .order('overall_score', { ascending: false });

  if (!products || products.length === 0) {
    return null;
  }

  const actualBrand = products[0].brand;

  // Get lab results count
  const productIds = products.map(p => p.id);
  const { count: labResultsCount } = await supabase
    .from('lab_results')
    .select('*', { count: 'exact', head: true })
    .in('product_id', productIds);

  // Calculate statistics
  const scores = products.map(p => p.overall_score).filter(Boolean);
  const avgScore = scores.length > 0
    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    : 0;

  const excellentCount = scores.filter(s => s >= 80).length;
  const goodCount = scores.filter(s => s >= 70 && s < 80).length;
  const fairCount = scores.filter(s => s >= 60 && s < 70).length;
  const poorCount = scores.filter(s => s < 60).length;

  // Get competitor brands for comparison
  const { data: allBrands } = await supabase
    .from('products')
    .select('brand, overall_score')
    .neq('brand', actualBrand)
    .not('brand', 'is', null);

  const brandAverages = {};
  allBrands?.forEach(p => {
    if (!brandAverages[p.brand]) {
      brandAverages[p.brand] = { sum: 0, count: 0 };
    }
    if (p.overall_score) {
      brandAverages[p.brand].sum += p.overall_score;
      brandAverages[p.brand].count++;
    }
  });

  const competitors = Object.entries(brandAverages)
    .map(([brand, data]) => ({
      brand,
      avgScore: Math.round(data.sum / data.count),
      productCount: data.count,
    }))
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 5);

  return {
    brand: actualBrand,
    products,
    stats: {
      totalProducts: products.length,
      totalTests: labResultsCount || 0,
      avgScore,
      excellentCount,
      goodCount,
      fairCount,
      poorCount,
    },
    competitors,
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

export default async function BrandPage({ params }) {
  const data = await getBrandData(params.brand);

  if (!data) {
    notFound();
  }

  const { brand, products, stats, competitors } = data;
  const userProfile = await getUserProfile();
  const userTier = getUserTier(userProfile);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Brands', url: '/search' },
    { name: brand, url: `/brands/${params.brand}` },
  ]);

  const getSafetyRating = (score) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 70) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (score >= 60) return { label: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { label: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const brandRating = getSafetyRating(stats.avgScore);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="mb-6 text-sm">
              <ol className="flex items-center space-x-2 text-gray-600">
                <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
                <li><Icons.chevronRight className="w-4 h-4" /></li>
                <li><Link href="/search" className="hover:text-primary-600">All Products</Link></li>
                <li><Icons.chevronRight className="w-4 h-4" /></li>
                <li className="text-gray-900 font-medium">{brand}</li>
              </ol>
            </nav>

            {/* Brand Header */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{brand}</h1>
                  <p className="text-xl text-gray-600">Baby Food Safety Ratings</p>
                </div>
                <div className={`px-6 py-3 rounded-lg ${brandRating.bg}`}>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${brandRating.color}`}>
                      {stats.avgScore}
                    </div>
                    <div className={`text-sm font-medium ${brandRating.color}`}>
                      {brandRating.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalProducts}</div>
                  <div className="text-sm text-gray-600">Products Tested</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{stats.totalTests}</div>
                  <div className="text-sm text-gray-600">Lab Tests</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.excellentCount}</div>
                  <div className="text-sm text-green-700">Excellent (80+)</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{stats.poorCount}</div>
                  <div className="text-sm text-red-700">Below 60</div>
                </div>
              </div>

              {/* Distribution Bar */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Safety Score Distribution</h3>
                <div className="flex h-8 rounded-lg overflow-hidden">
                  {stats.excellentCount > 0 && (
                    <div
                      className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(stats.excellentCount / stats.totalProducts) * 100}%` }}
                    >
                      {stats.excellentCount}
                    </div>
                  )}
                  {stats.goodCount > 0 && (
                    <div
                      className="bg-blue-500 flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(stats.goodCount / stats.totalProducts) * 100}%` }}
                    >
                      {stats.goodCount}
                    </div>
                  )}
                  {stats.fairCount > 0 && (
                    <div
                      className="bg-yellow-500 flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(stats.fairCount / stats.totalProducts) * 100}%` }}
                    >
                      {stats.fairCount}
                    </div>
                  )}
                  {stats.poorCount > 0 && (
                    <div
                      className="bg-red-500 flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(stats.poorCount / stats.totalProducts) * 100}%` }}
                    >
                      {stats.poorCount}
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Excellent</span>
                  <span>Good</span>
                  <span>Fair</span>
                  <span>Poor</span>
                </div>
              </div>
            </div>

            {/* Comparison with Other Brands */}
            {competitors.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Compare with Other Brands
                  </h2>
                  <div className="space-y-3">
                    {competitors.map((competitor, index) => (
                      <Link
                        key={competitor.brand}
                        href={`/brands/${getBrandSlug(competitor.brand)}`}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                          <div>
                            <div className="font-semibold text-gray-900">{competitor.brand}</div>
                            <div className="text-sm text-gray-600">{competitor.productCount} products</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{competitor.avgScore}</div>
                          <div className="text-sm text-gray-600">Avg Score</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Products */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                All {brand} Products ({stats.totalProducts})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${generateProductSlug(product)}`}
                  >
                    <ProductCard
                      product={product}
                      userTier={userTier}
                      showScore={true}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
