// Homepage with hero section and featured products
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import ProductCard from '@/components/ProductCard';
import Disclaimer from '@/components/Disclaimer';
import { generateOrganizationSchema } from '@/components/SEO';

export const metadata = {
  title: 'SafeBaby - Baby Food Safety Ratings & Heavy Metal Testing',
  description: 'Scan baby food products and check safety ratings based on independent lab testing for heavy metals like arsenic, lead, cadmium, and mercury.',
};

async function getFeaturedProducts() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('overall_score', { ascending: false })
    .limit(6);

  return products || [];
}

async function getStats() {
  const supabase = await createClient();

  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  const { count: testCount } = await supabase
    .from('lab_results')
    .select('*', { count: 'exact', head: true });

  return {
    products: productCount || 300,
    tests: testCount || 500,
  };
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const stats = await getStats();

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="flex flex-col">
        {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Icons.shield className="w-10 h-10" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Keep Your Baby Safe from Heavy Metals
            </h1>

            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Scan baby food products and instantly see independent lab results for arsenic, lead, cadmium, and mercury.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/scan">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Icons.scan className="w-5 h-5 mr-2" />
                  Scan Product Now
                </Button>
              </Link>
              <Link href="/search">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Icons.search className="w-5 h-5 mr-2" />
                  Browse Products
                </Button>
              </Link>
            </div>

            {/* Quick Disclaimer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-sm text-primary-100 max-w-2xl mx-auto">
              <p className="text-center">
                <strong className="text-white">Important:</strong> SafeBaby provides educational information only.
                This is not medical advice. Always consult your pediatrician.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mt-12 max-w-md mx-auto">
              <div>
                <div className="text-4xl font-bold">{stats.products}+</div>
                <div className="text-primary-100">Products Tested</div>
              </div>
              <div>
                <div className="text-4xl font-bold">{stats.tests}+</div>
                <div className="text-primary-100">Lab Results</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How SafeBaby Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, fast, and science-backed ratings you can trust
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.scan className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Scan Barcode</h3>
                <p className="text-gray-600">
                  Use your phone camera to scan any baby food product barcode
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.shield className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. View Lab Results</h3>
                <p className="text-gray-600">
                  See detailed test results from independent laboratories (100% free)
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.checkmark className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Make Informed Choices</h3>
                <p className="text-gray-600">
                  Choose safer products for your baby based on real science
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Recently Tested Products
                </h2>
                <p className="text-gray-600">
                  Browse our latest safety ratings
                </p>
              </div>
              <Link href="/search">
                <Button variant="outline">
                  View All
                  <Icons.arrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  userTier="free"
                  showScore={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Heavy Metals Matter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Heavy Metals Matter
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the risks in baby food
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Icons.alert className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Lead & Arsenic</h3>
                      <p className="text-gray-600 text-sm">
                        Even low levels can impact brain development and cause learning difficulties in children.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Icons.alert className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Cadmium & Mercury</h3>
                      <p className="text-gray-600 text-sm">
                        Can damage kidneys, bones, and nervous system development in infants and toddlers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icons.baby className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Higher Risk for Babies</h3>
                      <p className="text-gray-600 text-sm">
                        Babies are more vulnerable because their organs are still developing and they eat more food relative to body weight.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Icons.shield className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Prevention is Key</h3>
                      <p className="text-gray-600 text-sm">
                        By choosing products with lower heavy metal levels, you can significantly reduce your baby's exposure.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Making Safer Choices Today
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of parents protecting their babies with science-backed information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/upgrade">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Icons.award className="w-5 h-5 mr-2" />
                  View Pro Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
