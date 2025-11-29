import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Baby Food Contamination Checker | Instant Heavy Metals Report',
  description: 'Check baby food for contamination instantly. Scan or search 220+ verified products for lead, arsenic, cadmium & mercury levels. Free safety checker.',
  keywords: [
    'baby food contamination checker',
    'check baby food contamination',
    'baby food safety checker',
    'test baby food for heavy metals',
    'baby food contamination'
  ],
  openGraph: {
    title: 'Baby Food Contamination Checker | Instant Heavy Metals Report',
    description: 'Check baby food for contamination instantly. Scan or search 220+ verified products for heavy metals.',
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://safebaby.com'}/tools/contamination-checker`,
    siteName: 'SafeBaby',
    type: 'website',
  },
};

export default function ContaminationCheckerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-coral-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-block bg-coral text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
            FREE CONTAMINATION CHECKER
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Baby Food Contamination Checker
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Check any baby food product for contamination instantly. Get comprehensive heavy metal reports for lead, arsenic, cadmium, and mercury levels based on independent lab testing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scan">
              <Button size="lg" className="bg-coral hover:bg-coral-600 text-white rounded-full px-8">
                <Icons.scan className="w-5 h-5 mr-2" />
                Scan Product Barcode
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="rounded-full border-2 border-primary">
                <Icons.search className="w-5 h-5 mr-2" />
                Search by Name
              </Button>
            </Link>
          </div>
        </header>

        {/* Stats Section */}
        <section className="mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-white rounded-3xl shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">220+</div>
              <div className="text-gray-600">Verified Products</div>
            </Card>
            <Card className="p-6 text-center bg-white rounded-3xl shadow-lg">
              <div className="text-4xl font-bold text-coral mb-2">4</div>
              <div className="text-gray-600">Heavy Metals Tracked</div>
            </Card>
            <Card className="p-6 text-center bg-white rounded-3xl shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600">Free Forever</div>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            How the Contamination Checker Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scan or Search</h3>
              <p className="text-gray-600">
                Use your phone camera to scan a product barcode, or search by product name or brand
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Analysis</h3>
              <p className="text-gray-600">
                Our database cross-references independent lab test results from Consumer Reports and other trusted sources
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Safety Rating</h3>
              <p className="text-gray-600">
                View detailed contamination levels for lead, arsenic, cadmium, and mercury with easy-to-understand safety scores
              </p>
            </div>
          </div>
        </section>

        {/* What We Check */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            What We Check For
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mr-4">
                  <Icons.alert className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Lead Contamination</h3>
                  <p className="text-gray-600">
                    Neurotoxin with no safe level for children. We compare against FDA action levels (10-20 ppb)
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-butter-100 rounded-full flex items-center justify-center mr-4">
                  <Icons.alert className="w-6 h-6 text-butter" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Arsenic Levels</h3>
                  <p className="text-gray-600">
                    Particularly high in rice products. We track inorganic arsenic against FDA guidance (100 ppb for rice cereal)
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center mr-4">
                  <Icons.alert className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cadmium Content</h3>
                  <p className="text-gray-600">
                    Common in root vegetables. Linked to kidney damage and bone issues over time
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <Icons.alert className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mercury Testing</h3>
                  <p className="text-gray-600">
                    Found in some fish-based products. Can damage nervous system and impair cognitive development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recently Checked Products */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Recently Checked Products
          </h2>
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <p className="text-gray-600 text-center mb-6">
              See what other parents are checking for contamination:
            </p>
            <div className="space-y-4">
              {[
                { name: 'Gerber Rice Cereal', brand: 'Gerber', score: 65, risk: 'Moderate' },
                { name: 'Happy Baby Sweet Potato Puree', brand: 'Happy Baby', score: 58, risk: 'High' },
                { name: 'Once Upon a Farm Apple Blend', brand: 'Once Upon a Farm', score: 95, risk: 'Low' },
                { name: 'Beech-Nut Oatmeal Cereal', brand: 'Beech-Nut', score: 78, risk: 'Low' },
                { name: 'Earth\'s Best Carrot Puree', brand: 'Earth\'s Best', score: 72, risk: 'Moderate' },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.brand}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Safety Score</div>
                      <div className={`font-bold ${product.score >= 80 ? 'text-primary' : product.score >= 60 ? 'text-butter' : 'text-coral'}`}>
                        {product.score}/100
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.risk === 'Low' ? 'bg-primary-100 text-primary' :
                      product.risk === 'Moderate' ? 'bg-butter-100 text-butter' :
                      'bg-coral-100 text-coral'
                    }`}>
                      {product.risk} Risk
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/search">
                <Button className="bg-coral hover:bg-coral-600 text-white rounded-full">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Check for Contamination */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Why Check Baby Food for Contamination?
          </h2>
          <div className="bg-butter-50 rounded-3xl p-8 mb-6">
            <div className="flex items-start mb-6">
              <Icons.alert className="w-8 h-8 text-coral mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">94% of Baby Food Contains Heavy Metals</h3>
                <p className="text-gray-700">
                  A 2021 Congressional investigation found that 94% of baby food products contain detectable levels of toxic heavy metals, including lead, arsenic, cadmium, and mercury.
                </p>
              </div>
            </div>
            <div className="flex items-start mb-6">
              <Icons.alert className="w-8 h-8 text-coral mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Permanent Brain Damage</h3>
                <p className="text-gray-700">
                  Heavy metal exposure during the critical 0-24 month development window can cause permanent neurological damage, reducing IQ by 3-5 points and increasing ADHD risk.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Icons.alert className="w-8 h-8 text-coral mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Significant Differences Between Brands</h3>
                <p className="text-gray-700">
                  Testing reveals some brands have 20-60x more contamination than others. Checking before you buy helps you choose the safest options for your baby.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Standards */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Our Safety Standards
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <Icons.shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Independent Testing</h3>
              </div>
              <p className="text-gray-600">
                All safety ratings based on third-party laboratory testing from Consumer Reports, Clean Label Project, and academic research—not manufacturer claims.
              </p>
            </Card>
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center mr-4">
                  <Icons.checkmark className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">FDA Compliance</h3>
              </div>
              <p className="text-gray-600">
                We compare all products against FDA action levels and California AB 899 standards to give you comprehensive contamination reports.
              </p>
            </Card>
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-lavender rounded-full flex items-center justify-center mr-4">
                  <Icons.award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Regular Updates</h3>
              </div>
              <p className="text-gray-600">
                Our database is updated weekly with new test results as they become available, ensuring you always have the latest contamination information.
              </p>
            </Card>
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-butter rounded-full flex items-center justify-center mr-4">
                  <Icons.baby className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Free Access</h3>
              </div>
              <p className="text-gray-600">
                Basic contamination checking is 100% free forever. Every parent deserves access to baby food safety information.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-coral-50 to-primary-50 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Check Your Baby Food for Contamination Now
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of parents using our free contamination checker to make safer baby food choices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scan">
              <Button size="lg" className="bg-coral hover:bg-coral-600 text-white rounded-full px-8">
                <Icons.scan className="w-5 h-5 mr-2" />
                Start Checking Products
              </Button>
            </Link>
            <Link href="/blog/baby-food-heavy-metals-complete-guide">
              <Button size="lg" variant="outline" className="rounded-full border-2 border-primary">
                Learn More About Heavy Metals
              </Button>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Contamination Checker FAQs
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-6 group cursor-pointer shadow-md">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Is the contamination checker really free?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700">
                Yes, 100% free forever. Basic contamination checking for all products in our database is available to all users at no cost. Premium features like meal planning and personalized recommendations are optional upgrades.
              </p>
            </details>
            <details className="bg-white rounded-2xl p-6 group cursor-pointer shadow-md">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How accurate are the contamination reports?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700">
                Our reports are based on independent laboratory testing from trusted sources like Consumer Reports and the Congressional investigation. We use actual measured heavy metal levels (ppb) from certified labs, not estimates or manufacturer data.
              </p>
            </details>
            <details className="bg-white rounded-2xl p-6 group cursor-pointer shadow-md">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What if my product isn&apos;t in the database?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700">
                We&apos;re constantly adding new products as test results become available. You can request testing for specific products, and we&apos;ll prioritize adding them to our database based on user requests.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
