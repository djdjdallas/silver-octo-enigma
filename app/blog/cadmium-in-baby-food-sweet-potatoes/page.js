// Blog post: Cadmium in Baby Food - Hidden Dangers in Sweet Potatoes
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { SEO, generateArticleSchema } from '@/components/SEO';

export const metadata = SEO({
  title: 'Cadmium in Baby Food: Hidden Dangers in Sweet Potatoes 2025',
  description: 'Why sweet potatoes and root vegetables have the highest cadmium levels in baby food. Learn which vegetables to limit and safe alternatives for your baby.',
  canonical: '/blog/cadmium-in-baby-food-sweet-potatoes',
  ogType: 'article',
  article: {
    publishedTime: '2025-01-06T10:00:00Z',
    modifiedTime: '2025-01-06T10:00:00Z',
    authors: ['SafeBaby'],
    tags: ['cadmium', 'sweet potatoes', 'heavy metals', 'root vegetables'],
  },
});

const articleSchema = generateArticleSchema({
  title: 'Cadmium in Baby Food: Hidden Dangers in Sweet Potatoes',
  description: 'Which vegetables absorb the most cadmium from soil and how to choose safer options.',
  url: '/blog/cadmium-in-baby-food-sweet-potatoes',
  publishedDate: '2025-01-06T10:00:00Z',
  modifiedDate: '2025-01-06T10:00:00Z',
});

export default function CadmiumInBabyFoodPost() {
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
            <Badge className="bg-white/20 text-white border-white/30">Cadmium</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Cadmium in Baby Food: Hidden Dangers in Sweet Potatoes
          </h1>
          <div className="flex items-center gap-6 text-primary-100">
            <div className="flex items-center gap-2">
              <Icons.calendar className="w-4 h-4" />
              <span>January 6, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.clock className="w-4 h-4" />
              <span>9 min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-700 mb-6">
            Sweet potatoes are often recommended as a healthy first food, but testing reveals they contain some of the highest cadmium levels of any baby food vegetable—up to 20 ppb in some products, nearly reaching the FDA's proposed 10 ppb limit for root vegetables.
          </p>

          <Card className="my-6 bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icons.alert className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-2">The Root Vegetable Problem</h3>
                  <p className="text-orange-800 text-sm mb-2">
                    <strong>Testing shows:</strong> Root vegetables like sweet potatoes, carrots, and beets accumulate 3-5x more cadmium than above-ground vegetables. Sweet potato baby food averages 12-18 ppb cadmium, compared to just 2-4 ppb in green beans or peas.
                  </p>
                  <p className="text-orange-800 text-sm">
                    <strong>Health impact:</strong> Chronic cadmium exposure damages kidneys, weakens bones, and may impair cognitive development in young children.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Is Cadmium?</h2>
          <p className="text-gray-700 mb-4">
            Cadmium is a toxic heavy metal that occurs naturally in soil and accumulates through industrial pollution:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Natural occurrence:</strong> Present in all soils at varying levels due to geological deposits</li>
            <li><strong>Industrial sources:</strong> Mining, smelting, battery manufacturing, and phosphate fertilizers increase soil levels</li>
            <li><strong>Persistent pollutant:</strong> Remains in soil for decades, continuously contaminating crops</li>
            <li><strong>No biological function:</strong> Unlike zinc or iron, cadmium serves no purpose in the body—it's purely toxic</li>
            <li><strong>Long half-life:</strong> Takes 10-30 years for the body to eliminate half of accumulated cadmium</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Root Vegetables Absorb More Cadmium</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Direct Soil Contact</h3>
          <p className="text-gray-700 mb-4">
            Root vegetables grow underground in direct contact with contaminated soil:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>The edible portion (root) is surrounded by cadmium-containing soil</li>
            <li>Roots actively absorb nutrients and water from soil, pulling in cadmium along with them</li>
            <li>Extended growing time underground means prolonged exposure to soil cadmium</li>
            <li>No protective barrier like leaves or fruit skins that might block contamination</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Chemical Similarity to Nutrients</h3>
          <p className="text-gray-700 mb-4">
            Plants mistake cadmium for essential nutrients:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Mimics zinc:</strong> Cadmium is chemically similar to zinc, so plants transport it using the same pathways</li>
            <li><strong>Competes with calcium:</strong> Cadmium also interferes with calcium uptake systems</li>
            <li><strong>No rejection mechanism:</strong> Plants have no evolved defense against cadmium since it's relatively recent in agricultural soils</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Soil Acidity</h3>
          <p className="text-gray-700 mb-4">
            Soil pH dramatically affects cadmium uptake:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Acidic soils (pH below 6.5) make cadmium more available to plants</li>
            <li>Sweet potatoes often grown in slightly acidic soils, increasing cadmium absorption</li>
            <li>Alkaline soils bind cadmium, making it less accessible to roots</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cadmium Levels by Vegetable Type</h2>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Average Cadmium Content in Baby Foods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-red-500">
                <div>
                  <span className="font-semibold text-gray-900">Sweet Potatoes</span>
                  <p className="text-xs text-gray-600">Root vegetable, high accumulator</p>
                </div>
                <span className="text-red-700 font-bold">12-18 ppb</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-orange-500">
                <div>
                  <span className="font-semibold text-gray-900">Carrots</span>
                  <p className="text-xs text-gray-600">Root vegetable, moderate-high</p>
                </div>
                <span className="text-orange-700 font-bold">8-14 ppb</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-yellow-500">
                <div>
                  <span className="font-semibold text-gray-900">Beets</span>
                  <p className="text-xs text-gray-600">Root vegetable, moderate</p>
                </div>
                <span className="text-yellow-700 font-bold">6-10 ppb</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-yellow-500">
                <div>
                  <span className="font-semibold text-gray-900">White Potatoes</span>
                  <p className="text-xs text-gray-600">Tuber, moderate</p>
                </div>
                <span className="text-yellow-700 font-bold">5-9 ppb</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-500">
                <div>
                  <span className="font-semibold text-gray-900">Green Beans</span>
                  <p className="text-xs text-gray-600">Above-ground vegetable</p>
                </div>
                <span className="text-green-700 font-bold">2-4 ppb</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-600">
                <div>
                  <span className="font-semibold text-gray-900">Peas</span>
                  <p className="text-xs text-gray-600">Above-ground vegetable</p>
                </div>
                <span className="text-green-700 font-bold">1-3 ppb</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-green-600">
                <div>
                  <span className="font-semibold text-gray-900">Squash/Zucchini</span>
                  <p className="text-xs text-gray-600">Above-ground vegetable</p>
                </div>
                <span className="text-green-700 font-bold">1-3 ppb</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              *FDA proposed action level: 10 ppb for root vegetables, 5 ppb for other foods (not yet finalized)
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Health Effects of Cadmium Exposure</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Primary Target: Kidneys</h3>
          <p className="text-gray-700 mb-4">
            Cadmium preferentially accumulates in kidneys, causing long-term damage:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Kidney dysfunction:</strong> Damages tubules that filter waste, leading to protein in urine</li>
            <li><strong>Cumulative damage:</strong> Effects worsen over lifetime as cadmium accumulates</li>
            <li><strong>Irreversible:</strong> Kidney damage from cadmium cannot be reversed</li>
            <li><strong>High infant vulnerability:</strong> Developing kidneys are more susceptible to damage</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Bone Health Impacts</h3>
          <p className="text-gray-700 mb-4">
            Cadmium interferes with calcium metabolism and bone development:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Osteomalacia:</strong> Softening of bones due to calcium loss</li>
            <li><strong>Reduced bone density:</strong> Weaker bones more prone to fractures</li>
            <li><strong>Growth impairment:</strong> May slow skeletal development in children</li>
            <li><strong>"Itai-itai disease":</strong> Severe cadmium poisoning causes painful bone disease (first discovered in Japan)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Developmental & Cognitive Effects</h3>
          <p className="text-gray-700 mb-4">
            Emerging research links cadmium exposure to neurodevelopmental issues:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Learning difficulties:</strong> Some studies link early exposure to lower academic performance</li>
            <li><strong>Attention problems:</strong> Potential association with ADHD-like symptoms</li>
            <li><strong>IQ impacts:</strong> Possible reduction in cognitive scores (less studied than lead)</li>
            <li><strong>Behavioral issues:</strong> May contribute to increased aggression and behavioral problems</li>
          </ul>

          <Card className="my-6 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Why Cadmium Is Especially Dangerous for Babies</h3>
                  <p className="text-blue-800 text-sm mb-2">
                    Infants face unique cadmium risks:
                  </p>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• <strong>Higher absorption:</strong> Babies absorb up to 50% of dietary cadmium vs. 5% in adults</li>
                    <li>• <strong>Developing organs:</strong> Kidneys and bones still forming, more vulnerable to damage</li>
                    <li>• <strong>Longer exposure time:</strong> Cadmium absorbed in infancy accumulates for entire lifetime</li>
                    <li>• <strong>Smaller body size:</strong> Same amount of cadmium represents higher dose per kilogram</li>
                    <li>• <strong>Limited detoxification:</strong> Immature systems can't eliminate cadmium as efficiently</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">FDA Regulations & Industry Response</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Current Status (2025)</h3>
          <p className="text-gray-700 mb-4">
            Unlike lead and arsenic, the FDA has not yet finalized action levels for cadmium in baby food:
          </p>

          <div className="bg-yellow-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-yellow-900 mb-3">FDA Proposed Guidance (Not Yet Final)</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• <strong>Root vegetables:</strong> Proposed 10 ppb limit (sweet potatoes, carrots, beets)</li>
              <li>• <strong>Other vegetables:</strong> Proposed 5 ppb limit</li>
              <li>• <strong>Fruits:</strong> Proposed 5 ppb limit</li>
              <li>• <strong>Status:</strong> Still in draft form, manufacturers not required to comply</li>
              <li>• <strong>Timeline:</strong> Final guidance expected 2025-2026</li>
            </ul>
            <p className="text-xs text-yellow-800 mt-3 font-semibold">
              Many products currently exceed these proposed limits with no regulatory consequences.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Which Baby Foods Have Highest Cadmium</h2>

          <div className="bg-red-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-red-900 mb-4">Highest Risk Products (Limit or Avoid)</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-l-4 border-red-600">
                <h4 className="font-semibold text-gray-900 mb-2">1. Sweet Potato Purees (12-18 ppb)</h4>
                <p className="text-sm text-gray-700 mb-2">Single-ingredient or sweet potato-heavy blends consistently test highest for cadmium.</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Gerber 2nd Foods Sweet Potatoes: 14-16 ppb</li>
                  <li>• Earth's Best Organic Sweet Potato: 15-18 ppb</li>
                  <li>• Beech-Nut Sweet Potato: 12-14 ppb</li>
                </ul>
                <p className="text-xs text-red-700 font-semibold mt-2">Recommendation: Limit to 1-2 servings per week maximum</p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-gray-900 mb-2">2. Sweet Potato Pouches (10-16 ppb)</h4>
                <p className="text-sm text-gray-700 mb-2">Concentrated sweet potato in pouches, often mixed with fruit.</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Happy Baby Sweet Potato Banana: 10-12 ppb</li>
                  <li>• Plum Organics Sweet Potato blends: 12-14 ppb</li>
                </ul>
                <p className="text-xs text-orange-700 font-semibold mt-2">Recommendation: Use occasionally, prefer fruit-based pouches</p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-gray-900 mb-2">3. Carrot-Based Products (8-14 ppb)</h4>
                <p className="text-sm text-gray-700 mb-2">Second-highest vegetable for cadmium accumulation.</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Carrot purees: 9-12 ppb</li>
                  <li>• Carrot-heavy pouches: 8-11 ppb</li>
                </ul>
                <p className="text-xs text-orange-700 font-semibold mt-2">Recommendation: Rotate with low-cadmium vegetables</p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-gray-900 mb-2">4. Sweet Potato Puffs/Snacks (10-15 ppb)</h4>
                <p className="text-sm text-gray-700 mb-2">Concentrated forms of sweet potato for snacking.</p>
                <p className="text-xs text-yellow-700 font-semibold mt-2">Recommendation: Choose chickpea or oat-based puffs instead</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Safe Low-Cadmium Vegetable Alternatives</h2>

          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-green-900 mb-4">Best Vegetable Choices (2-4 ppb cadmium)</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-l-4 border-green-600">
                <h5 className="font-semibold text-gray-900 mb-2">Green Beans (2-4 ppb)</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ Above-ground vegetable, minimal soil contact</li>
                  <li>✅ Mild flavor, good first vegetable</li>
                  <li>✅ Available in all major brands</li>
                  <li>✅ Easy to make at home</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-600">
                <h5 className="font-semibold text-gray-900 mb-2">Peas (1-3 ppb)</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ One of the lowest cadmium vegetables</li>
                  <li>✅ High in protein and fiber</li>
                  <li>✅ Sweet taste babies enjoy</li>
                  <li>✅ Excellent alternative to sweet potatoes</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-600">
                <h5 className="font-semibold text-gray-900 mb-2">Squash/Zucchini (1-3 ppb)</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ Very low cadmium levels</li>
                  <li>✅ Similar sweet taste to sweet potatoes</li>
                  <li>✅ Butternut squash great substitute</li>
                  <li>✅ Easy to prepare at home</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-600">
                <h5 className="font-semibold text-gray-900 mb-2">Broccoli (2-3 ppb)</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ Nutrient-dense cruciferous vegetable</li>
                  <li>✅ Low cadmium accumulator</li>
                  <li>✅ High in vitamins and minerals</li>
                  <li>⚠️ Introduce around 8-10 months (can cause gas)</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Smart Feeding Strategies to Reduce Cadmium</h2>

          <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">7 Ways to Minimize Cadmium Exposure:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><strong>Limit sweet potatoes to 1-2 times per week</strong> - Not daily, not as primary vegetable</li>
              <li><strong>Rotate vegetables widely</strong> - Don't rely on any single vegetable</li>
              <li><strong>Prioritize above-ground vegetables</strong> - Peas, green beans, squash, broccoli</li>
              <li><strong>Choose butternut squash over sweet potato</strong> - Similar taste, 85% less cadmium</li>
              <li><strong>Mix high and low-cadmium foods</strong> - If feeding sweet potato, combine with peas or green beans</li>
              <li><strong>Check QR codes</strong> - Some batches test lower than others</li>
              <li><strong>Ensure adequate iron and zinc intake</strong> - These nutrients compete with cadmium absorption, reducing uptake</li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Reducing Cadmium in Homemade Baby Food</h2>
          <p className="text-gray-700 mb-4">
            If making your own sweet potato or carrot purees, these tips can help reduce cadmium:
          </p>

          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Peel thoroughly:</strong> Cadmium concentrates in skin—remove all peel and a thin layer beneath</li>
            <li><strong>Choose organic from trusted sources:</strong> Some organic farms use cadmium-containing phosphate fertilizers; ask about sourcing</li>
            <li><strong>Buy from low-cadmium regions:</strong> California and Pacific Northwest soils generally lower than Southeast</li>
            <li><strong>Boil and drain:</strong> Some cadmium leaches into cooking water; don't use cooking liquid</li>
            <li><strong>Select smaller specimens:</strong> Younger, smaller vegetables have had less time to accumulate cadmium</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Bottom Line on Cadmium</h2>

          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Key Takeaways:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>⚠️ <strong>Sweet potatoes are NOT a safe daily food</strong> - Despite nutritional benefits, cadmium levels too high for frequent consumption</li>
              <li>❌ <strong>Avoid making sweet potato your primary vegetable</strong> - Limit to 1-2 servings per week</li>
              <li>✅ <strong>Choose low-cadmium alternatives</strong> - Peas, green beans, squash, butternut squash</li>
              <li>✅ <strong>Rotate vegetables widely</strong> - Variety reduces exposure to any single contaminant</li>
              <li>✅ <strong>Above-ground vegetables safer</strong> - Prioritize vegetables that don't grow in soil contact</li>
              <li>⚠️ <strong>Watch for FDA finalization</strong> - Action levels expected 2025-2026 will change landscape</li>
            </ul>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>The reality:</strong> Sweet potatoes and other root vegetables provide excellent nutrition, but their high cadmium content makes them unsuitable as staple foods for babies. Occasional consumption (1-2 times weekly) is acceptable, but daily feeding risks cumulative kidney and bone damage.
          </p>

          <Card className="my-8 bg-primary-50 border-primary-200">
            <CardContent className="p-8 text-center">
              <Icons.search className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Check Cadmium Levels in Vegetables</h3>
              <p className="text-gray-600 mb-6">
                Search our database to see cadmium test results for specific vegetable products.
              </p>
              <Link
                href="/search?keyword=vegetables"
                className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Search Vegetable Products
              </Link>
            </CardContent>
          </Card>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources & Research</h3>
            <p className="text-sm text-gray-600">
              Based on FDA draft guidance on cadmium in foods (2024-2025), Consumer Reports testing, peer-reviewed studies on cadmium toxicity and kidney damage, soil science research on heavy metal uptake, and manufacturer-published test results. Cadmium levels reflect testing conducted between 2024-2025.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="border-t border-gray-200 p-8 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/baby-food-heavy-metals-complete-guide">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Heavy Metals in Baby Food: Complete Guide</h4>
                  <p className="text-sm text-gray-600">Understanding all four toxic metals</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/how-to-avoid-heavy-metals-in-baby-food">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">How to Avoid Heavy Metals</h4>
                  <p className="text-sm text-gray-600">10 proven strategies to reduce exposure</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
