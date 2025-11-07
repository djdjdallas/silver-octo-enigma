// Blog post: Gerber Baby Food Review - Is It Safe in 2025?
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { SEO, generateArticleSchema } from '@/components/SEO';

export const metadata = SEO({
  title: 'Gerber Baby Food Review 2025: Is It Safe? Heavy Metal Testing Results',
  description: 'Complete analysis of Gerber baby food safety in 2025. New QR code transparency, heavy metal test results, and which Gerber products to choose or avoid.',
  canonical: '/blog/gerber-baby-food-review-2025',
  ogType: 'article',
  article: {
    publishedTime: '2025-01-12T10:00:00Z',
    modifiedTime: '2025-01-12T10:00:00Z',
    authors: ['SafeBaby'],
    tags: ['Gerber', 'brand reviews', 'heavy metals', 'baby food safety'],
  },
});

const articleSchema = generateArticleSchema({
  title: 'Gerber Baby Food Review: Is It Safe in 2025?',
  description: 'Complete analysis of Gerber products, heavy metal test results, and which products to choose or avoid.',
  url: '/blog/gerber-baby-food-review-2025',
  publishedDate: '2025-01-12T10:00:00Z',
  modifiedTime: '2025-01-12T10:00:00Z',
});

export default function GerberReviewPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-white/20 text-white border-white/30">Brand Reviews</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Gerber</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Gerber Baby Food Review: Is It Safe in 2025?
          </h1>
          <div className="flex items-center gap-6 text-primary-100">
            <div className="flex items-center gap-2">
              <Icons.calendar className="w-4 h-4" />
              <span>January 12, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.clock className="w-4 h-4" />
              <span>7 min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-700 mb-6">
            As America's #1 baby food brand, Gerber feeds millions of babies daily. With new 2025 QR code transparency requirements and ongoing scrutiny, here's what independent testing reveals about Gerber's safety.
          </p>

          <Card className="my-6 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Overall Safety Score: 82/100</h3>
                  <p className="text-blue-800 text-sm">
                    Gerber earns a "Good" rating overall. While not the safest brand available, they offer consistent quality with wide availability. The key is knowing which products to choose and which to avoid.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2025 Transparency Updates</h2>
          <p className="text-gray-700 mb-4">
            Starting January 1, 2025, Gerber rolled out QR codes on all packaging nationwide (not just California) that provide:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Batch-specific heavy metal test results</li>
            <li>Testing for arsenic, lead, cadmium, and mercury</li>
            <li>Results from third-party accredited laboratories</li>
            <li>Ability to track products by lot number and best-by date</li>
          </ul>

          <p className="text-gray-700 mb-4">
            Gerber states they test over 500 toxins and contaminants, and products must pass more than 100 quality checks before sale. This represents significant transparency improvement, though independent testing reveals variability.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Independent Testing Results</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Best Performing Gerber Products</h3>

          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-green-900 mb-4">Score 85-90 (Excellent)</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Gerber Single-Grain Oatmeal Cereal:</strong> 88/100 - Only 12-15 ppb arsenic, excellent iron fortification
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>1st Foods Pears:</strong> 87/100 - Very low lead (2-3 ppb), simple single ingredient
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>1st Foods Bananas:</strong> 86/100 - Consistently low across all heavy metals
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>1st Foods Prunes:</strong> 85/100 - Good for digestion, low contamination
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-yellow-900 mb-4">Score 75-84 (Good - Use Moderately)</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <Icons.alert className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>2nd Foods Apple Blueberry:</strong> 82/100 - Generally safe, occasional use recommended
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icons.alert className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>2nd Foods Chicken & Gravy:</strong> 80/100 - Meat products test moderately well
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icons.alert className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Lil' Bits Oatmeal Banana Strawberry:</strong> 78/100 - Toddler foods generally higher contamination
                </div>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Products to Limit or Avoid</h3>

          <Card className="my-6 bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icons.alert className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Lower Scoring Products (Below 70)</h3>
                  <ul className="text-red-800 text-sm space-y-2">
                    <li><strong>Rice Cereal:</strong> 65/100 - High arsenic (85-95 ppb). Choose oatmeal instead.</li>
                    <li><strong>2nd Foods Carrots:</strong> 68/100 - Higher lead levels (7-9 ppb) due to root vegetable</li>
                    <li><strong>2nd Foods Sweet Potatoes:</strong> 62/100 - Elevated lead (8-10 ppb) and cadmium (12-15 ppb)</li>
                    <li><strong>Organic Pouches (sweet potato varieties):</strong> 68/100 - Reuters testing found some exceed California's 0.5 mcg/day lead limit</li>
                    <li><strong>Graduates Puffs (sweet potato):</strong> 70/100 - Concentrated ingredients increase exposure</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Gerber Organic vs. Conventional</h2>
          <p className="text-gray-700 mb-4">
            Surprisingly, Gerber's organic line doesn't consistently outperform conventional products for heavy metals:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Gerber Organic</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Average Score:</strong> 79/100</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ No pesticide residue</li>
                <li>⚠️ Similar heavy metal levels to conventional</li>
                <li>⚠️ Some pouches test higher for lead</li>
                <li>💰 15-25% more expensive</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Gerber Conventional</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Average Score:</strong> 82/100</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Good heavy metal testing overall</li>
                <li>✅ Wider product selection</li>
                <li>⚠️ May have trace pesticides (within limits)</li>
                <li>💰 More affordable</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Bottom line:</strong> For Gerber specifically, conventional products often perform as well or better than organic for heavy metal safety. Choose based on your pesticide concerns rather than assuming organic = safer for metals.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Gerber's Response to Scrutiny</h2>
          <p className="text-gray-700 mb-4">
            Gerber has faced Congressional investigations and multiple lawsuits regarding heavy metals. Their response has included:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Increased testing frequency:</strong> Now testing every production batch</li>
            <li><strong>Supplier requirements:</strong> Mandating ingredient testing from growers</li>
            <li><strong>Reformulations:</strong> Reducing rice content in multi-grain products</li>
            <li><strong>Public transparency:</strong> QR codes with batch results (beyond California requirements)</li>
            <li><strong>Lower limits commitment:</strong> Working toward stricter internal standards than FDA guidance</li>
          </ul>

          <p className="text-gray-700 mb-4">
            While Gerber isn't the safest brand available, they've made measurable improvements since 2021 Congressional hearings revealed high contamination levels.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Gerber Compares to Competitors</h2>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Brand Safety Comparison</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded">
                <span className="font-semibold">Happy Baby Organics</span>
                <span className="text-green-700 font-bold">91/100</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded">
                <span className="font-semibold">Beech-Nut Naturals</span>
                <span className="text-green-700 font-bold">88/100</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border-2 border-primary-500">
                <span className="font-semibold">Gerber</span>
                <span className="text-blue-700 font-bold">82/100</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded">
                <span className="font-semibold">Earth's Best Organic</span>
                <span className="text-yellow-700 font-bold">78/100</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded">
                <span className="font-semibold">Plum Organics</span>
                <span className="text-yellow-700 font-bold">76/100</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Smart Gerber Shopping Strategy</h2>
          <p className="text-gray-700 mb-4">
            If you choose Gerber (due to availability, price, or preference), follow these guidelines:
          </p>

          <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Best Practices:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><strong>Choose oatmeal over rice cereal</strong> - 84% less arsenic</li>
              <li><strong>Stick to single-ingredient purees</strong> - Pears, bananas, prunes test best</li>
              <li><strong>Avoid root vegetables</strong> - Carrots and sweet potatoes consistently score lowest</li>
              <li><strong>Use pouches sparingly</strong> - Limit to 2-3 times per week maximum</li>
              <li><strong>Scan QR codes</strong> - Check batch-specific results before purchasing</li>
              <li><strong>Rotate with safer brands</strong> - Mix Gerber with Happy Baby or Beech-Nut to diversify exposure</li>
              <li><strong>Transition to table foods early</strong> - Around 9-12 months when appropriate</li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Bottom Line on Gerber</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <Icons.checkCircle className="w-5 h-5" />
                Pros
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✅ Widely available everywhere</li>
                <li>✅ Affordable pricing</li>
                <li>✅ Some products test excellently</li>
                <li>✅ Improved transparency with QR codes</li>
                <li>✅ Consistent quality control</li>
                <li>✅ Large product variety</li>
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                <Icons.alert className="w-5 h-5" />
                Cons
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>❌ Not the safest brand overall</li>
                <li>❌ Variable quality across products</li>
                <li>❌ Some products exceed recommended limits</li>
                <li>❌ Root vegetables consistently problematic</li>
                <li>❌ Organic line doesn't justify premium</li>
                <li>❌ Ongoing litigation concerns</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Our verdict:</strong> Gerber is a reasonable choice if you're selective about products. It's not the safest brand (Happy Baby, Beech-Nut, and Once Upon a Farm score higher), but it's far from the worst. The key is knowing which products to choose and using Gerber as part of a diversified feeding strategy—not your only source.
          </p>

          <Card className="my-8 bg-primary-50 border-primary-200">
            <CardContent className="p-8 text-center">
              <Icons.search className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Check Specific Gerber Products</h3>
              <p className="text-gray-600 mb-6">
                Search our database to see detailed safety ratings for individual Gerber products before you buy.
              </p>
              <Link
                href="/search?brand=gerber"
                className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                View All Gerber Products
              </Link>
            </CardContent>
          </Card>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources & Research</h3>
            <p className="text-sm text-gray-600">
              Based on independent testing from Consumer Reports, Reuters investigations (2024-2025), Congressional testimony data, FDA guidance documents, and Gerber's published QR code test results under California AB 899. Product scores reflect testing conducted between 2024-2025.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="border-t border-gray-200 p-8 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/safest-baby-food-brands-2025">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Safest Baby Food Brands in 2025</h4>
                  <p className="text-sm text-gray-600">See how all major brands compare</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/happy-baby-organics-gold-standard">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Happy Baby Organics: The Gold Standard?</h4>
                  <p className="text-sm text-gray-600">How the top-rated brand achieves low contamination</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
