// Blog post: Arsenic in Baby Food Rice - The Complete Guide
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { SEO, generateArticleSchema } from '@/components/SEO';

export const metadata = SEO({
  title: 'Arsenic in Baby Food Rice: Complete Guide 2025 - FDA Limits & Safe Alternatives',
  description: 'Everything parents need to know about arsenic in rice baby food. Learn FDA limits, which rice products to avoid, and safe alternatives for your baby.',
  canonical: '/blog/arsenic-in-baby-food-rice-complete-guide',
  ogType: 'article',
  article: {
    publishedTime: '2025-01-10T10:00:00Z',
    modifiedTime: '2025-01-10T10:00:00Z',
    authors: ['SafeBaby'],
    tags: ['arsenic', 'rice', 'heavy metals', 'baby food safety'],
  },
});

const articleSchema = generateArticleSchema({
  title: 'Arsenic in Baby Food Rice: The Complete Guide',
  description: 'Why rice-based baby foods have higher arsenic levels and which alternatives are safest for your baby.',
  url: '/blog/arsenic-in-baby-food-rice-complete-guide',
  publishedDate: '2025-01-10T10:00:00Z',
  modifiedDate: '2025-01-10T10:00:00Z',
});

export default function ArsenicInRicePost() {
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
            <Badge className="bg-white/20 text-white border-white/30">Heavy Metals</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Arsenic</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Arsenic in Baby Food Rice: The Complete Guide
          </h1>
          <div className="flex items-center gap-6 text-primary-100">
            <div className="flex items-center gap-2">
              <Icons.calendar className="w-4 h-4" />
              <span>January 10, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.clock className="w-4 h-4" />
              <span>10 min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-700 mb-6">
            Rice baby food contains the highest levels of arsenic among all baby food categories—up to 10 times more than other grains. Understanding why this happens and how to protect your baby is critical for every parent.
          </p>

          <Card className="my-6 bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icons.alert className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">The Arsenic Crisis in Rice</h3>
                  <p className="text-red-800 text-sm mb-2">
                    <strong>Testing reveals:</strong> Infant rice cereal averages 85-100 ppb of inorganic arsenic, compared to just 12-18 ppb in oatmeal cereal. The FDA's action level is 100 ppb, but many experts believe even this is too high for developing babies.
                  </p>
                  <p className="text-red-800 text-sm">
                    <strong>Health impact:</strong> Studies link cumulative arsenic exposure to 3-7 point IQ reduction, increased ADHD risk, and long-term cancer risk.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Rice Accumulates So Much Arsenic</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. How Rice Is Grown</h3>
          <p className="text-gray-700 mb-4">
            Rice's unique growing environment makes it particularly vulnerable to arsenic contamination:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Flooded paddies:</strong> Rice grows in standing water, and arsenic is more water-soluble than other heavy metals</li>
            <li><strong>Anaerobic conditions:</strong> The oxygen-poor environment in flooded soil converts arsenic to forms more easily absorbed by plants</li>
            <li><strong>Root uptake:</strong> Rice roots actively transport arsenic along with nutrients like silicon, which arsenic chemically resembles</li>
            <li><strong>10x absorption rate:</strong> Rice absorbs approximately 10 times more arsenic from soil and water than other grains</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Historical Contamination</h3>
          <p className="text-gray-700 mb-4">
            Many rice-growing regions have elevated soil arsenic from past agricultural practices:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Arsenic-based pesticides:</strong> Used extensively in U.S. cotton fields until the 1980s, contaminating soil where rice is now grown (especially in Arkansas, Louisiana, Missouri)</li>
            <li><strong>Industrial pollution:</strong> Mining, smelting, and other industries have historically released arsenic into water supplies</li>
            <li><strong>Naturally occurring:</strong> Some geological formations naturally contain high arsenic levels</li>
            <li><strong>Persistent contamination:</strong> Arsenic remains in soil for decades, continuing to contaminate crops</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Geographic Differences</h3>
          <p className="text-gray-700 mb-4">
            Not all rice is equally contaminated—origin matters significantly:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Arsenic Levels by Rice Origin</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-red-500">
                <div>
                  <span className="font-semibold text-gray-900">U.S. Southern states</span>
                  <p className="text-xs text-gray-600">Arkansas, Louisiana, Missouri, Texas</p>
                </div>
                <span className="text-red-700 font-bold">Highest (100-150 ppb)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-yellow-500">
                <div>
                  <span className="font-semibold text-gray-900">California rice</span>
                  <p className="text-xs text-gray-600">Grown in less contaminated soil</p>
                </div>
                <span className="text-yellow-700 font-bold">Moderate (40-70 ppb)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-500">
                <div>
                  <span className="font-semibold text-gray-900">Basmati rice (India)</span>
                  <p className="text-xs text-gray-600">Different growing conditions</p>
                </div>
                <span className="text-green-700 font-bold">Lower (25-50 ppb)</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Types of Arsenic: Why Inorganic Is Dangerous</h2>
          <p className="text-gray-700 mb-4">
            Not all arsenic is equally harmful. Understanding the difference is crucial:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-red-50 border-2 border-red-300">
              <CardContent className="p-6">
                <h4 className="font-semibold text-red-900 mb-3">Inorganic Arsenic (Toxic)</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✗ Carcinogenic (cancer-causing)</li>
                  <li>✗ Neurotoxic (damages developing brains)</li>
                  <li>✗ Highly toxic even at low levels</li>
                  <li>✗ What FDA regulates in baby food</li>
                  <li>✗ <strong>This is what accumulates in rice</strong></li>
                </ul>
                <p className="text-xs text-red-800 mt-3 font-semibold">
                  FDA limit for infant rice cereal: 100 ppb inorganic arsenic
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-2 border-green-300">
              <CardContent className="p-6">
                <h4 className="font-semibold text-green-900 mb-3">Organic Arsenic (Less Toxic)</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✓ Found in seafood</li>
                  <li>✓ Rapidly excreted by body</li>
                  <li>✓ Considered less harmful</li>
                  <li>✓ Not the primary concern in rice</li>
                  <li>✓ Not regulated as strictly</li>
                </ul>
                <p className="text-xs text-green-800 mt-3 font-semibold">
                  Rice contains primarily inorganic arsenic (the dangerous type)
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">FDA Regulations & Limits</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Current FDA Action Level (2016)</h3>
          <p className="text-gray-700 mb-4">
            The FDA established an action level for inorganic arsenic in infant rice cereal:
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-blue-900 mb-3">FDA Guidance for Infant Rice Cereal</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>Action level:</strong> 100 parts per billion (ppb) inorganic arsenic</li>
              <li><strong>Applies to:</strong> Infant and toddler rice cereals only</li>
              <li><strong>Not regulated:</strong> Rice in pouches, puffs, teething biscuits, or other rice-containing products</li>
              <li><strong>Voluntary compliance:</strong> Manufacturers not legally required to meet this level</li>
              <li><strong>Testing frequency:</strong> No mandatory testing schedule specified</li>
            </ul>
          </div>

          <Card className="my-6 bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icons.alert className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">The 100 ppb Controversy</h3>
                  <p className="text-yellow-800 text-sm mb-2">
                    Many experts, including Consumer Reports and the American Academy of Pediatrics, argue that 100 ppb is too high for infants:
                  </p>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Some European countries have stricter limits (as low as 50 ppb)</li>
                    <li>• Babies eat more food per pound of body weight than adults</li>
                    <li>• Developing brains are more vulnerable to neurotoxins</li>
                    <li>• Cumulative exposure from multiple foods adds up</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Which Rice Products Are Most Dangerous</h2>

          <div className="bg-red-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-red-900 mb-4">Highest Arsenic Rice Products (Avoid)</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-l-4 border-red-600">
                <h4 className="font-semibold text-gray-900 mb-2">1. Rice Cereal (85-100 ppb)</h4>
                <p className="text-sm text-gray-700">Traditional first food, but highest arsenic per serving. Many products test at or near FDA's 100 ppb limit.</p>
                <p className="text-xs text-red-700 font-semibold mt-1">Recommendation: Switch to oatmeal cereal</p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-red-600">
                <h4 className="font-semibold text-gray-900 mb-2">2. Rice Puffs & Snacks (60-90 ppb)</h4>
                <p className="text-sm text-gray-700">Concentrated rice products with high arsenic levels. Popular brands like Gerber Puffs and Happy Baby Puffs (rice varieties) test high.</p>
                <p className="text-xs text-red-700 font-semibold mt-1">Recommendation: Choose oat-based or chickpea-based puffs</p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-red-600">
                <h4 className="font-semibold text-gray-900 mb-2">3. Rice-Based Teething Biscuits (50-80 ppb)</h4>
                <p className="text-sm text-gray-700">Extended chewing time means prolonged arsenic exposure. Not regulated by FDA infant cereal guidelines.</p>
                <p className="text-xs text-red-700 font-semibold mt-1">Recommendation: Use oat or wheat-based teethers</p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-gray-900 mb-2">4. Multi-Grain Cereals with Rice (40-70 ppb)</h4>
                <p className="text-sm text-gray-700">Lower than pure rice but still concerning. Check ingredient labels—rice should not be the first ingredient.</p>
                <p className="text-xs text-yellow-700 font-semibold mt-1">Recommendation: Use occasionally, not daily</p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-gray-900 mb-2">5. Rice-Containing Pouches (30-60 ppb)</h4>
                <p className="text-sm text-gray-700">Variable arsenic depending on rice content. Higher when rice is a primary ingredient.</p>
                <p className="text-xs text-yellow-700 font-semibold mt-1">Recommendation: Choose pouches without rice</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Health Effects of Arsenic Exposure</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Short-Term vs. Long-Term Risks</h3>
          <p className="text-gray-700 mb-4">
            Arsenic exposure in babies doesn't cause immediate symptoms—the damage is cumulative and long-term:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Cognitive & Developmental Effects</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>IQ reduction:</strong> 3-7 point decrease linked to prenatal and infant exposure</li>
                <li>• <strong>Memory impairment:</strong> Reduced working memory and learning capacity</li>
                <li>• <strong>Processing speed:</strong> Slower information processing</li>
                <li>• <strong>ADHD risk:</strong> Increased hyperactivity and attention problems</li>
                <li>• <strong>Language delays:</strong> Slower vocabulary development</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Long-Term Health Risks</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Cancer risk:</strong> Bladder, lung, and skin cancer in adulthood</li>
                <li>• <strong>Cardiovascular disease:</strong> Increased risk later in life</li>
                <li>• <strong>Immune dysfunction:</strong> Impaired immune system development</li>
                <li>• <strong>Respiratory problems:</strong> Chronic lung issues</li>
                <li>• <strong>Diabetes risk:</strong> Metabolic dysfunction</li>
              </ul>
            </div>
          </div>

          <Card className="my-6 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Why Babies Are Most Vulnerable</h3>
                  <p className="text-blue-800 text-sm mb-2">
                    Infants and toddlers face disproportionate risk from arsenic:
                  </p>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Eat 2-3x more food per pound of body weight than adults</li>
                    <li>• Developing brains are more susceptible to neurotoxins</li>
                    <li>• Immature detoxification systems can't eliminate arsenic as efficiently</li>
                    <li>• Longer lifetime for cancer risk to develop</li>
                    <li>• Rice cereal often introduced at peak brain development (4-6 months)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Safe Alternatives to Rice</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Best First Cereals (Instead of Rice)</h3>

          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-green-900 mb-4">Recommended Alternatives</h4>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-l-4 border-green-600">
                <h5 className="font-semibold text-gray-900 mb-2">1. Oatmeal Cereal (12-18 ppb arsenic)</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ 84% less arsenic than rice</li>
                  <li>✅ Iron-fortified options available</li>
                  <li>✅ Excellent first food texture</li>
                  <li>✅ AAP recommended alternative</li>
                  <li><strong>Best brands:</strong> Happy Baby, Beech-Nut, Gerber</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-600">
                <h5 className="font-semibold text-gray-900 mb-2">2. Barley Cereal (8-15 ppb arsenic)</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ Even lower arsenic than oatmeal</li>
                  <li>✅ Gentle on digestion</li>
                  <li>✅ Good for babies with oat sensitivity</li>
                  <li>⚠️ Less widely available</li>
                  <li><strong>Best brands:</strong> Beech-Nut, Earth's Best</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-600">
                <h5 className="font-semibold text-gray-900 mb-2">3. Multi-Grain (WITHOUT rice) (15-25 ppb)</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ Oat + barley + quinoa combinations</li>
                  <li>✅ Nutritional variety</li>
                  <li>✅ For babies 6+ months who've tried single grains</li>
                  <li>⚠️ MUST verify no rice in ingredients</li>
                  <li><strong>Check labels carefully:</strong> Many "multi-grain" include rice</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-600">
                <h5 className="font-semibold text-gray-900 mb-2">4. Quinoa Cereal (5-10 ppb arsenic)</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ Lowest arsenic levels</li>
                  <li>✅ Complete protein source</li>
                  <li>✅ Nutrient-dense</li>
                  <li>⚠️ More expensive, less common</li>
                  <li><strong>Best brands:</strong> Happy Baby, Little Spoon</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Reducing Arsenic in Home-Cooked Rice</h2>
          <p className="text-gray-700 mb-4">
            If you choose to make rice-based foods at home (for older toddlers), these methods can reduce arsenic by 40-60%:
          </p>

          <div className="bg-yellow-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Cooking Methods to Reduce Arsenic</h4>
            <ol className="list-decimal pl-5 space-y-3 text-gray-700">
              <li>
                <strong>Rinse thoroughly:</strong> Wash rice 3-4 times in fresh water before cooking (removes 10-15% arsenic)
              </li>
              <li>
                <strong>Use 6:1 water ratio:</strong> Cook rice in 6 cups water per 1 cup rice (like pasta), then drain excess water (removes 40-50% arsenic)
              </li>
              <li>
                <strong>Choose white over brown:</strong> Brown rice has 80% more arsenic (concentrated in the bran/outer layers)
              </li>
              <li>
                <strong>Select basmati or sushi rice:</strong> These varieties naturally absorb less arsenic (25-50% lower than long-grain white)
              </li>
              <li>
                <strong>Buy California-grown rice:</strong> Significantly lower arsenic than Southern U.S. rice
              </li>
            </ol>
            <p className="text-sm text-yellow-800 mt-4 font-semibold">
              Important: Even with these methods, rice still contains more arsenic than other grains. Limit to 1-2 servings per week for toddlers.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What If My Baby Already Ate Rice Cereal?</h2>

          <Card className="my-6 bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icons.checkCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">Don't Panic—Take Action Instead</h3>
                  <p className="text-green-800 text-sm mb-3">
                    If your baby has already consumed rice cereal, the damage from cumulative exposure is not irreversible. Here's what to do:
                  </p>
                  <ol className="text-green-800 text-sm space-y-2 list-decimal pl-5">
                    <li><strong>Stop rice products immediately:</strong> Switch to oatmeal, barley, or quinoa cereal today</li>
                    <li><strong>Increase variety:</strong> Diversify foods to include brain-healthy options (fruits, vegetables, healthy fats)</li>
                    <li><strong>Support detoxification:</strong> Adequate hydration and fiber help eliminate arsenic</li>
                    <li><strong>Don't stress excessively:</strong> The body does eliminate arsenic over time; focus on reducing future exposure</li>
                    <li><strong>Inform your pediatrician:</strong> They may recommend developmental monitoring if exposure was extensive</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Bottom Line on Rice</h2>

          <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Clear Recommendations:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>❌ <strong>NEVER use rice cereal as a first food</strong> - Choose oatmeal or barley instead</li>
              <li>❌ <strong>Avoid all rice-based baby products</strong> - Puffs, teethers, pouches with rice</li>
              <li>⚠️ <strong>Limit rice exposure to 1-2 servings per week maximum</strong> - For toddlers 12+ months only</li>
              <li>✅ <strong>Use oatmeal, barley, or quinoa cereals</strong> - 84-90% less arsenic</li>
              <li>✅ <strong>Check QR codes and labels</strong> - Verify products don't contain rice</li>
              <li>✅ <strong>Diversify grains</strong> - Rotate multiple low-arsenic options</li>
            </ul>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>The science is clear:</strong> Rice baby food contains unacceptably high arsenic levels for infant consumption. With safe, nutritious alternatives readily available at similar prices, there's no justifiable reason to feed rice cereal or rice-based products to babies under 12 months—and limited use after that.
          </p>

          <Card className="my-8 bg-primary-50 border-primary-200">
            <CardContent className="p-8 text-center">
              <Icons.search className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Check Arsenic Levels in Products</h3>
              <p className="text-gray-600 mb-6">
                Search our database to see arsenic test results for specific cereals and rice-containing products.
              </p>
              <Link
                href="/search?keyword=cereal"
                className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Search Baby Cereals
              </Link>
            </CardContent>
          </Card>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources & Research</h3>
            <p className="text-sm text-gray-600">
              Based on FDA guidance on arsenic in infant rice cereal (2016, updated 2025), Consumer Reports testing (2024-2025), Healthy Babies Bright Futures research, peer-reviewed studies on arsenic toxicity in children, and AAP recommendations updated January 2025.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="border-t border-gray-200 p-8 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/rice-vs-oatmeal-baby-cereal-which-is-safer">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Rice vs. Oatmeal Baby Cereal</h4>
                  <p className="text-sm text-gray-600">Detailed comparison and recommendations</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/baby-food-heavy-metals-complete-guide">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Heavy Metals in Baby Food: Complete Guide</h4>
                  <p className="text-sm text-gray-600">Understanding all four toxic metals</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
