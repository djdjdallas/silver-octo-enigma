import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Check Baby Food Arsenic Levels Online | Free Arsenic Testing Database',
  description: 'Check arsenic levels in baby food online. Search 500+ products for arsenic contamination. See which baby cereals, purees & snacks exceed FDA limits.',
  keywords: [
    'check baby food arsenic online',
    'baby food arsenic levels',
    'baby food arsenic testing',
    'rice cereal arsenic',
    'baby food arsenic checker',
    'inorganic arsenic baby food'
  ],
  openGraph: {
    title: 'Check Baby Food Arsenic Levels Online | Free Testing Database',
    description: 'Check arsenic levels in baby food online. Search 500+ products for arsenic contamination.',
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://safebaby.com'}/tools/arsenic-checker`,
    siteName: 'SafeBaby',
    type: 'website',
  },
};

export default function ArsenicCheckerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-butter-50 via-white to-coral-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-block bg-coral text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
            FREE ARSENIC CHECKER
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Check Baby Food Arsenic Levels Online
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Instantly check arsenic contamination in baby food products. Search our database of 500+ tested products to see inorganic arsenic levels and FDA compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scan">
              <Button size="lg" className="bg-coral hover:bg-coral-600 text-white rounded-full px-8">
                <Icons.scan className="w-5 h-5 mr-2" />
                Check Arsenic Levels Now
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="rounded-full border-2 border-primary">
                <Icons.search className="w-5 h-5 mr-2" />
                Browse Database
              </Button>
            </Link>
          </div>
        </header>

        {/* Alert Section */}
        <section className="mb-12">
          <div className="bg-coral-50 border-l-4 border-coral rounded-2xl p-8">
            <div className="flex items-start">
              <Icons.alert className="w-12 h-12 text-coral mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Rice Products Have 10x More Arsenic
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Rice naturally absorbs 10 times more arsenic from soil and water than other grains. Baby rice cereals consistently show the highest arsenic levels of any baby food category, with some products containing over 200 ppb of inorganic arsenic.
                </p>
                <p className="text-gray-700 font-semibold">
                  The FDA guidance level for rice cereal is 100 ppb inorganic arsenic, yet many popular brands exceed this limit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-white rounded-3xl shadow-lg">
              <div className="text-4xl font-bold text-coral mb-2">85-120</div>
              <div className="text-sm text-gray-600">Average ppb in Rice Cereal</div>
            </Card>
            <Card className="p-6 text-center bg-white rounded-3xl shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">100</div>
              <div className="text-sm text-gray-600">FDA Guidance ppb Limit</div>
            </Card>
            <Card className="p-6 text-center bg-white rounded-3xl shadow-lg">
              <div className="text-4xl font-bold text-coral mb-2">200+</div>
              <div className="text-sm text-gray-600">Worst Product ppb Level</div>
            </Card>
            <Card className="p-6 text-center bg-white rounded-3xl shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-gray-600">Products in Database</div>
            </Card>
          </div>
        </section>

        {/* Why Arsenic is Dangerous */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Why Arsenic in Baby Food is Dangerous
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Brain Development Impact</h3>
              <p className="text-gray-700 mb-4">
                Inorganic arsenic is a known neurotoxin that crosses the blood-brain barrier. Even low-level exposure during infancy can:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Reduce IQ by 3-5 points</li>
                <li>Cause learning difficulties and memory problems</li>
                <li>Increase risk of ADHD and behavioral issues</li>
                <li>Lead to developmental delays</li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Long-Term Health Risks</h3>
              <p className="text-gray-700 mb-4">
                Beyond immediate developmental concerns, childhood arsenic exposure is linked to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Increased cancer risk (lung, bladder, skin)</li>
                <li>Cardiovascular disease in adulthood</li>
                <li>Type 2 diabetes</li>
                <li>Weakened immune system function</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Highest Arsenic Products */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Baby Foods With Highest Arsenic Levels
          </h2>
          <div className="space-y-6">
            <div className="bg-coral-50 border-l-4 border-coral rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">🍚 Rice Cereals</h3>
                <span className="bg-coral text-white px-4 py-1 rounded-full text-sm font-bold">HIGHEST RISK</span>
              </div>
              <p className="text-gray-700 mb-3">
                <strong>Average inorganic arsenic: 85-120 ppb</strong>
              </p>
              <p className="text-gray-700 mb-3">
                White rice cereals have significantly higher arsenic than brown rice or other grains. Popular brands like Gerber Rice Cereal consistently exceed FDA guidance levels.
              </p>
              <div className="bg-white rounded-lg p-4 mt-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Safer Alternative:</p>
                <p className="text-gray-700">Choose oat, barley, or quinoa cereals instead. These have 80-90% less arsenic than rice cereals.</p>
              </div>
            </div>

            <div className="bg-butter-50 border-l-4 border-butter rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">🍪 Rice-Based Snacks</h3>
                <span className="bg-butter text-white px-4 py-1 rounded-full text-sm font-bold">HIGH RISK</span>
              </div>
              <p className="text-gray-700 mb-3">
                <strong>Average inorganic arsenic: 60-95 ppb</strong>
              </p>
              <p className="text-gray-700 mb-3">
                Rice puffs, rice crackers, and rice-based teething biscuits accumulate arsenic because they&apos;re made from concentrated rice flour.
              </p>
              <div className="bg-white rounded-lg p-4 mt-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Products to Check:</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Gerber Graduates Puffs (rice-based)</li>
                  <li>Happy Baby Puffs (rice varieties)</li>
                  <li>Beech-Nut Rice Rusks</li>
                </ul>
              </div>
            </div>

            <div className="bg-lavender-50 border-l-4 border-lavender rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">🍎 Rice-Containing Purees</h3>
                <span className="bg-lavender text-white px-4 py-1 rounded-full text-sm font-bold">MODERATE RISK</span>
              </div>
              <p className="text-gray-700 mb-3">
                <strong>Average inorganic arsenic: 25-50 ppb</strong>
              </p>
              <p className="text-gray-700 mb-3">
                Purees and pouches that include rice as a thickener or filler ingredient. Even small amounts of rice significantly increase arsenic levels.
              </p>
              <div className="bg-white rounded-lg p-4 mt-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">What to Look For:</p>
                <p className="text-gray-700">Check ingredient lists for rice, rice flour, rice cereal, or rice starch. These indicate arsenic risk even in non-rice products.</p>
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">🥕 Non-Rice Products</h3>
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">LOW RISK</span>
              </div>
              <p className="text-gray-700 mb-3">
                <strong>Average inorganic arsenic: 5-15 ppb</strong>
              </p>
              <p className="text-gray-700 mb-3">
                Products made without rice typically have much lower arsenic levels. Focus on oat-based cereals, meat purees, and most fruit/vegetable purees.
              </p>
            </div>
          </div>
        </section>

        {/* How to Check */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            How to Check Arsenic Levels Online
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Search or Scan</h3>
              <p className="text-gray-600">
                Enter the product name in our search bar or scan the barcode with your phone camera
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-butter rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">View Arsenic Data</h3>
              <p className="text-gray-600">
                See exact inorganic arsenic levels in ppb (parts per billion) from independent lab testing
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compare & Decide</h3>
              <p className="text-gray-600">
                Compare arsenic levels against FDA guidance and safer alternatives to make informed choices
              </p>
            </div>
          </div>
        </section>

        {/* Testing Data */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Our Arsenic Testing Data Sources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <Icons.shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Independent Lab Testing</h3>
              </div>
              <p className="text-gray-600">
                All arsenic data comes from certified third-party laboratories using ICP-MS (Inductively Coupled Plasma Mass Spectrometry), the gold standard for heavy metal analysis.
              </p>
            </Card>
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center mr-4">
                  <Icons.checkmark className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Trusted Sources</h3>
              </div>
              <p className="text-gray-600">
                We compile data from Consumer Reports testing, the 2021 Congressional investigation, Clean Label Project, and published academic research.
              </p>
            </Card>
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-lavender rounded-full flex items-center justify-center mr-4">
                  <Icons.award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Inorganic Arsenic Focus</h3>
              </div>
              <p className="text-gray-600">
                We specifically track inorganic arsenic (the toxic form) rather than total arsenic, matching FDA methodology for accurate health risk assessment.
              </p>
            </Card>
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-butter rounded-full flex items-center justify-center mr-4">
                  <Icons.baby className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Regular Updates</h3>
              </div>
              <p className="text-gray-600">
                Database updated weekly as new testing results are published. Products are re-tested periodically to catch formulation changes.
              </p>
            </Card>
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            How to Reduce Your Baby&apos;s Arsenic Exposure
          </h2>
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Eliminate Rice Cereal</h3>
                  <p className="text-gray-700">Skip rice cereal entirely. Use oat, barley, or multi-grain cereals instead. Studies show oat cereal has 80-90% less arsenic than rice cereal.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Avoid Rice-Based Snacks</h3>
                  <p className="text-gray-700">Choose puffs and snacks made from corn, wheat, or other grains. Read ingredients carefully—rice flour is often hidden in multi-grain products.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Check Ingredient Lists</h3>
                  <p className="text-gray-700">Look for rice, rice flour, rice cereal, rice syrup, or rice starch in ingredient lists. These ingredients dramatically increase arsenic content.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Use Our Checker Before Buying</h3>
                  <p className="text-gray-700">Scan products with SafeBaby before purchasing to see exact arsenic levels. Compare brands to find the lowest-arsenic options in each category.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">5</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Rotate Food Varieties</h3>
                  <p className="text-gray-700">Don&apos;t serve the same food every day. Variety reduces cumulative arsenic exposure and ensures balanced nutrition.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-coral-50 to-butter-50 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Check Arsenic Levels in Your Baby&apos;s Food Now
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Free instant access to arsenic testing data for 500+ baby food products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scan">
              <Button size="lg" className="bg-coral hover:bg-coral-600 text-white rounded-full px-8">
                <Icons.scan className="w-5 h-5 mr-2" />
                Check Arsenic Now
              </Button>
            </Link>
            <Link href="/blog/baby-food-heavy-metals-complete-guide">
              <Button size="lg" variant="outline" className="rounded-full border-2 border-primary">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Arsenic in Baby Food FAQs
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-6 group cursor-pointer shadow-md">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What is a safe level of arsenic in baby food?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700">
                There is no completely safe level of inorganic arsenic. The FDA guidance level for rice cereal is 100 ppb, but this is not an enforceable limit. Many experts recommend choosing products with less than 50 ppb whenever possible, and avoiding rice-based products entirely.
              </p>
            </details>
            <details className="bg-white rounded-2xl p-6 group cursor-pointer shadow-md">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Does organic rice have less arsenic?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700">
                No. Organic rice has similar arsenic levels to conventional rice because arsenic comes from soil and water, not pesticides. Organic certification doesn&apos;t address heavy metal contamination. Brown rice actually has slightly more arsenic than white rice.
              </p>
            </details>
            <details className="bg-white rounded-2xl p-6 group cursor-pointer shadow-md">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I rinse arsenic out of rice?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700">
                Partially. Rinsing and cooking rice with extra water (then draining) can reduce arsenic by 30-50%, but significant levels remain. For baby food, it&apos;s safer to avoid rice products entirely rather than trying to reduce arsenic through cooking methods.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
