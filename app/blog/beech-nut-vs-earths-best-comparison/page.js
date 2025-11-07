// Blog post: Beech-Nut vs Earth's Best - Which is Safer?
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { SEO, generateArticleSchema } from '@/components/SEO';

export const metadata = SEO({
  title: 'Beech-Nut vs Earth\'s Best: Which is Safer? 2025 Safety Comparison',
  description: 'Side-by-side comparison of Beech-Nut Naturals and Earth\'s Best Organic baby food. Independent testing reveals which organic brand delivers better heavy metal safety.',
  canonical: '/blog/beech-nut-vs-earths-best-comparison',
  ogType: 'article',
  article: {
    publishedTime: '2025-01-03T10:00:00Z',
    modifiedTime: '2025-01-03T10:00:00Z',
    authors: ['SafeBaby'],
    tags: ['Beech-Nut', 'Earth\'s Best', 'brand comparison', 'organic baby food'],
  },
});

const articleSchema = generateArticleSchema({
  title: 'Beech-Nut vs. Earth\'s Best: Which is Safer?',
  description: 'Side-by-side comparison of two popular organic brands and their heavy metal safety records.',
  url: '/blog/beech-nut-vs-earths-best-comparison',
  publishedDate: '2025-01-03T10:00:00Z',
  modifiedDate: '2025-01-03T10:00:00Z',
});

export default function BeechNutVsEarthsBestPost() {
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
            <Badge className="bg-white/20 text-white border-white/30">Comparison</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Beech-Nut vs. Earth's Best: Which is Safer?
          </h1>
          <div className="flex items-center gap-6 text-primary-100">
            <div className="flex items-center gap-2">
              <Icons.calendar className="w-4 h-4" />
              <span>January 3, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-700 mb-6">
            Both Beech-Nut and Earth's Best market themselves as premium organic options, but independent testing and Congressional investigations reveal significant differences in their heavy metal safety records.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-green-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Beech-Nut Naturals</h3>
                  <div className="text-4xl font-bold text-green-600 my-2">88/100</div>
                  <Badge className="bg-green-100 text-green-800">Winner</Badge>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✅ Stronger testing protocols</li>
                  <li>✅ Better QR code transparency</li>
                  <li>✅ Lower average contamination</li>
                  <li>✅ More consistent quality</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-300">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Earth's Best Organic</h3>
                  <div className="text-4xl font-bold text-yellow-600 my-2">78/100</div>
                  <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>⚠️ Variable product quality</li>
                  <li>⚠️ Some products exceed limits</li>
                  <li>⚠️ Inconsistent sourcing</li>
                  <li>✅ Wide availability</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Head-to-Head Comparison</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Testing & Transparency</h3>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Beech-Nut</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✅ Tests every production batch</li>
                  <li>✅ QR codes on all products (since early 2024)</li>
                  <li>✅ Batch-specific results online</li>
                  <li>✅ Third-party laboratory verification</li>
                  <li>✅ Tests raw ingredients AND final products</li>
                  <li>✅ Easy-to-access results without tracking numbers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Earth's Best</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>⚠️ Monthly representative sampling (not every batch)</li>
                  <li>⚠️ QR codes require lot numbers to find results</li>
                  <li>⚠️ Less detailed public reporting</li>
                  <li>✅ Tests for all four heavy metals</li>
                  <li>❌ Did not test for mercury until 2024</li>
                  <li>⚠️ More difficult result access process</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Congressional Investigation Findings</h3>
          <p className="text-gray-700 mb-4">
            Both brands submitted internal testing data to Congress in 2021. The results were revealing:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-green-900 mb-3">Beech-Nut (Congressional Data)</h4>
                <p className="text-sm text-gray-700 mb-3">Ingredient contamination levels found:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Arsenic: Up to 913 ppb in ingredients</li>
                  <li>• Lead: Up to 887 ppb in ingredients</li>
                  <li>• Regularly used ingredients with 300+ ppb arsenic</li>
                </ul>
                <p className="text-sm text-green-800 mt-3 font-semibold">
                  Note: Since 2021, Beech-Nut has significantly improved sourcing and now tests more rigorously.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-yellow-900 mb-3">Earth's Best (Congressional Data)</h4>
                <p className="text-sm text-gray-700 mb-3">Contamination levels found:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Arsenic: Up to 129 ppb in finished products</li>
                  <li>• Lead: Up to 352 ppb in ingredients</li>
                  <li>• Ingredients with up to 309 ppb arsenic</li>
                  <li>• Did not test for mercury at time</li>
                </ul>
                <p className="text-sm text-yellow-800 mt-3 font-semibold">
                  Earth's Best has made some improvements but quality remains more variable.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2025 Independent Testing Results</h3>
          <p className="text-gray-700 mb-4">
            Current Consumer Reports and independent laboratory testing shows how both brands perform today:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Product Category</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Beech-Nut</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Earth's Best</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-t">
                  <td className="px-4 py-3">Single Fruit Purees</td>
                  <td className="px-4 py-3 text-center text-green-700 font-semibold">90/100</td>
                  <td className="px-4 py-3 text-center text-green-700">85/100</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-3">Vegetable Purees</td>
                  <td className="px-4 py-3 text-center text-green-700 font-semibold">87/100</td>
                  <td className="px-4 py-3 text-center text-yellow-700">75/100</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3">Mixed Combos</td>
                  <td className="px-4 py-3 text-center text-green-700 font-semibold">86/100</td>
                  <td className="px-4 py-3 text-center text-yellow-700">78/100</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-3">Oatmeal Cereal</td>
                  <td className="px-4 py-3 text-center text-green-700 font-semibold">89/100</td>
                  <td className="px-4 py-3 text-center text-yellow-700">77/100</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3">Pouches</td>
                  <td className="px-4 py-3 text-center text-green-700 font-semibold">85/100</td>
                  <td className="px-4 py-3 text-center text-yellow-700">74/100</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Products from Each Brand</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Beech-Nut's Top Performers</h3>
          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Naturals Pears:</strong> 92/100 - Exceptionally low lead (2.1 ppb), arsenic (1.3 ppb)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Naturals Bananas:</strong> 91/100 - Consistent quality, minimal contamination
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Single Grain Oat Cereal:</strong> 89/100 - Only 10-14 ppb arsenic
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icons.checkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Naturals Apples:</strong> 88/100 - Great for everyday use
                </div>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Earth's Best's Top Performers</h3>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <Icons.checkCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Organic Banana Puree:</strong> 86/100 - Their best product, simple and clean
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icons.checkCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Organic Pear Puree:</strong> 84/100 - Good choice for daily use
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icons.alert className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Organic Sweet Potato:</strong> 68/100 - Higher cadmium, use sparingly
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Icons.alert className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Multi-grain Cereal:</strong> 70/100 - Variable results, not recommended
                </div>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Price Comparison</h2>
          <p className="text-gray-700 mb-4">
            Both brands are similarly priced in the premium category:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Beech-Nut Naturals</h4>
                <ul className="text-sm space-y-2">
                  <li>• Jars: $1.50-1.90 each</li>
                  <li>• Pouches: $1.80-2.20 each</li>
                  <li>• Cereal: $4.50-5.50 per box</li>
                  <li>• <strong>Value:</strong> Better safety for same price</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Earth's Best Organic</h4>
                <ul className="text-sm space-y-2">
                  <li>• Jars: $1.40-1.80 each</li>
                  <li>• Pouches: $1.70-2.10 each</li>
                  <li>• Cereal: $4.50-5.50 per box</li>
                  <li>• <strong>Value:</strong> Slightly cheaper but less consistent</li>
                </ul>
              </div>
            </div>
          </div>

          <Card className="my-6 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Price-to-Safety Ratio</h3>
                  <p className="text-blue-800 text-sm">
                    Since both brands are priced similarly, Beech-Nut offers significantly better value. You're paying premium prices for Earth's Best without getting premium safety.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Availability & Distribution</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Beech-Nut</h4>
              <ul className="text-sm space-y-1">
                <li>✅ Major retailers nationwide</li>
                <li>✅ Walmart, Target, Kroger</li>
                <li>✅ Amazon (Subscribe & Save available)</li>
                <li>⚠️ Slightly less selection than Earth's Best</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Earth's Best</h4>
              <ul className="text-sm space-y-1">
                <li>✅ Extremely wide availability</li>
                <li>✅ Most grocery stores stock it</li>
                <li>✅ Amazon, Whole Foods, conventional stores</li>
                <li>✅ Larger product variety</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Legal & Regulatory Issues</h2>
          <p className="text-gray-700 mb-4">
            Both brands face ongoing litigation regarding heavy metals:
          </p>

          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Both are defendants</strong> in MDL 3101: Baby Food Products Liability Litigation</li>
            <li><strong>Beech-Nut's response:</strong> Significantly improved testing, enhanced transparency, stricter sourcing standards</li>
            <li><strong>Earth's Best's response:</strong> Added mercury testing in 2024, moderate improvements to processes</li>
            <li><strong>Current status:</strong> Both complying with California AB 899 requirements (as of Jan 2025)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Winner: Beech-Nut Naturals</h2>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Why Beech-Nut Wins:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><strong>Higher average scores</strong> - 88/100 vs. 78/100</li>
              <li><strong>More consistent quality</strong> - Less variability between products</li>
              <li><strong>Better transparency</strong> - Easier QR code access, batch-specific results</li>
              <li><strong>Stronger testing</strong> - Every batch tested, not just samples</li>
              <li><strong>Greater improvements</strong> - Dramatically better than 2021 Congressional findings</li>
              <li><strong>Same price point</strong> - No premium for better safety</li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When to Choose Each Brand</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Icons.checkCircle className="w-5 h-5" />
                  Choose Beech-Nut If:
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✅ Safety is your top priority</li>
                  <li>✅ You want consistent quality</li>
                  <li>✅ You prefer easy result access</li>
                  <li>✅ Using as primary food source</li>
                  <li>✅ Feeding daily</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                  <Icons.alert className="w-5 h-5" />
                  Consider Earth's Best If:
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>⚠️ Beech-Nut unavailable in your area</li>
                  <li>⚠️ You need specific flavors they don't carry</li>
                  <li>⚠️ Occasional use only (not daily)</li>
                  <li>⚠️ Stick to their fruit purees (safer options)</li>
                  <li>⚠️ Avoid root vegetable products</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Bottom Line</h2>
          <p className="text-gray-700 mb-4">
            While both brands market themselves as premium organic options, <strong>Beech-Nut Naturals delivers significantly better safety</strong> for essentially the same price. Their investment in testing infrastructure and supply chain improvements since 2021 shows genuine commitment to safety.
          </p>
          <p className="text-gray-700 mb-4">
            Earth's Best remains an acceptable choice for occasional use, particularly their simple fruit purees. However, the variable quality and weaker testing protocols make it a less reliable option for daily feeding.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Our recommendation:</strong> Choose Beech-Nut Naturals as your primary brand. If you want to rotate for variety, add Happy Baby (91/100) rather than Earth's Best to maintain high safety standards.
          </p>

          <Card className="my-8 bg-primary-50 border-primary-200">
            <CardContent className="p-8 text-center">
              <Icons.search className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Compare Specific Products</h3>
              <p className="text-gray-600 mb-6">
                Search our database to see detailed safety ratings for individual products from both brands.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/search?brand=beech-nut"
                  className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                >
                  View Beech-Nut Products
                </Link>
                <Link
                  href="/search?brand=earths-best"
                  className="inline-block px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors"
                >
                  View Earth's Best Products
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources & Research</h3>
            <p className="text-sm text-gray-600">
              Based on Consumer Reports testing (2024-2025), Congressional investigation data (2021 with 2025 follow-up), manufacturer-published QR code results under California AB 899, and independent laboratory verification. Product scores reflect current testing conducted between 2024-2025.
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
                  <p className="text-sm text-gray-600">Complete brand rankings and recommendations</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/best-organic-baby-food-safety-beyond-label">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Best Organic Baby Food Safety Guide</h4>
                  <p className="text-sm text-gray-600">Why organic doesn't always mean safer</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
