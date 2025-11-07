import SEO from '@/components/SEO'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  Chef,
  ShieldCheck,
  Leaf,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  XCircle,
  Info,
  Lightbulb
} from '@/components/icons'
import Link from 'next/link'

export const metadata = SEO({
  title: 'Making Your Own Baby Food: Is It Safer? Complete 2025 Guide',
  description: 'Homemade baby food is just as likely to contain heavy metals as store-bought. Learn the truth, best practices, safer ingredient choices, and how to minimize contamination risks.',
  canonical: '/blog/making-your-own-baby-food-safer',
});

// Generate JSON-LD structured data for the article
function generateArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Making Your Own Baby Food: Is It Safer? Complete 2025 Guide',
    description: 'Evidence-based guide to homemade baby food safety, heavy metal risks, and preparation strategies that actually reduce contamination.',
    author: {
      '@type': 'Organization',
      name: 'SafeBaby',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SafeBaby',
      logo: {
        '@type': 'ImageObject',
        url: 'https://safebaby.ai/logo.png',
      },
    },
    datePublished: '2025-01-06',
    dateModified: '2025-01-06',
  };
}

export default function MakingYourOwnBabyFoodPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateArticleSchema()) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="default">Safety Tips</Badge>
            <Badge variant="secondary">Homemade Baby Food</Badge>
            <Badge variant="secondary">Preparation</Badge>
            <Badge variant="secondary">2025 Research</Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Making Your Own Baby Food: Is It Safer?
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            The surprising truth about homemade baby food heavy metal contamination—and evidence-based strategies to minimize risks.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <time dateTime="2025-01-06">Updated January 6, 2025</time>
            <span>•</span>
            <span>14 min read</span>
          </div>
        </div>

        {/* Critical Finding Card */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-orange-900 mb-2">
                  The Inconvenient Truth: Homemade Baby Food Is Just as Contaminated as Store-Bought
                </h3>
                <p className="text-orange-800 mb-3">
                  Groundbreaking 2022 research by Healthy Babies Bright Futures found that <strong>94% of both homemade AND commercial baby foods</strong> tested positive for one or more heavy metals. "We found no evidence to suggest that homemade baby foods made from store-bought produce are better than store-bought baby foods when it comes to heavy metal contamination."
                </p>
                <div className="bg-orange-100 rounded-lg p-4 mt-3">
                  <p className="font-semibold text-orange-900 mb-2">Why This Happens:</p>
                  <p className="text-orange-800">
                    Heavy metals come from contaminated soil and water—not from commercial processing. Unless you're growing ingredients in tested, clean soil, homemade baby food faces the exact same agricultural contamination as store-bought versions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-8">
          <p>
            Many well-intentioned parents turn to homemade baby food thinking it's inherently safer than commercial options. The logic seems sound: <em>If I make it myself with fresh ingredients, I control what goes in—no factories, no processing, no contamination, right?</em>
          </p>

          <p>
            Unfortunately, the science tells a different story. <strong>Heavy metal contamination begins in the soil and water where produce is grown</strong>, long before it reaches your kitchen. Making baby food at home doesn't eliminate these contaminants—it simply means you're processing the same contaminated ingredients yourself.
          </p>

          <p>
            But this doesn't mean homemade baby food is a bad choice. When done strategically, it offers significant benefits: <strong>cost savings, freshness, ingredient control, and the ability to implement rotation strategies</strong>. This comprehensive guide will show you how to make homemade baby food as safely as possible, using evidence-based practices that genuinely reduce contamination risks.
          </p>
        </div>

        {/* Reality Check Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Info className="w-8 h-8 text-blue-600" />
            The Research: What We Know About Homemade Baby Food Safety
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Multiple studies from 2022-2025 have fundamentally changed our understanding of homemade baby food contamination.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Key Research Findings (2022-2025)
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">94% Contamination Rate (Healthy Babies Bright Futures, 2022)</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Testing found identical contamination rates between homemade and commercial baby foods. Both showed detectable levels of arsenic, lead, cadmium, or mercury in the vast majority of samples.
                  </p>
                  <p className="text-gray-600 text-xs italic">
                    Lead researcher Jane Houlihan: "We found no evidence to suggest that homemade baby foods made from store-bought produce are better than store-bought baby foods."
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Organic Doesn't Protect (Cleveland Clinic, 2025)</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    "It's the soil and water that's contaminated with arsenic and other heavy metals, so it doesn't matter if it's organic or traditional farming methods."
                  </p>
                  <p className="text-gray-600 text-xs italic">
                    Making organic baby food at home provides no heavy metal advantage over conventional homemade or commercial options.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Same Ingredients, Same Contamination (CNN, 2022)</h4>
                  <p className="text-gray-700 text-sm">
                    Since homemade baby food uses the same produce available at grocery stores, it faces the same agricultural contamination issues. Heavy metals are absorbed into plant tissue—not added during commercial processing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    What Homemade Baby Food CAN Control
                  </h3>
                  <p className="text-green-800 mb-3">
                    While homemade baby food doesn't eliminate agricultural contamination, it DOES offer other valuable controls:
                  </p>
                  <div className="space-y-2 text-green-800">
                    <p>• <strong>Ingredient selection:</strong> Choose lower-contamination produce categories</p>
                    <p>• <strong>Rotation enforcement:</strong> Easier to rotate widely when you're not limited by jar availability</p>
                    <p>• <strong>Freshness:</strong> Minimize nutrient loss from storage</p>
                    <p>• <strong>Additive avoidance:</strong> No fillers, stabilizers, or unnecessary ingredients</p>
                    <p>• <strong>Cost savings:</strong> Significantly cheaper per serving</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pros and Cons Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Homemade vs. Commercial: Complete Comparison
          </h2>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-green-600" />
                    Benefits of Homemade Baby Food
                  </h3>
                  <ul className="space-y-3 text-gray-700 text-sm">
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <span><strong>Maximum variety:</strong> Not limited by jar selection; can rotate widely</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <span><strong>Cost effective:</strong> 50-70% cheaper than premium jarred options</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <span><strong>Freshness:</strong> No nutrient degradation from long-term storage</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <span><strong>Texture control:</strong> Customize thickness and chunkiness</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <span><strong>No additives:</strong> Avoid ascorbic acid, citric acid, water fillers</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                      <span><strong>Choose produce sources:</strong> Can buy from tested farms or farmers markets</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                    <ThumbsDown className="w-5 h-5 text-red-600" />
                    Limitations of Homemade Baby Food
                  </h3>
                  <ul className="space-y-3 text-gray-700 text-sm">
                    <li className="flex gap-2">
                      <XCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                      <span><strong>No heavy metal testing:</strong> You won't know actual contamination levels</span>
                    </li>
                    <li className="flex gap-2">
                      <XCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                      <span><strong>Same contamination:</strong> 94% contamination rate identical to commercial</span>
                    </li>
                    <li className="flex gap-2">
                      <XCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                      <span><strong>Time investment:</strong> Prep, cooking, and storage require significant time</span>
                    </li>
                    <li className="flex gap-2">
                      <XCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                      <span><strong>Food safety risks:</strong> Improper preparation/storage can introduce bacteria</span>
                    </li>
                    <li className="flex gap-2">
                      <XCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                      <span><strong>Less convenient:</strong> Not portable; requires refrigeration/heating</span>
                    </li>
                    <li className="flex gap-2">
                      <XCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                      <span><strong>Iron fortification missed:</strong> Rice cereal alternatives lack added iron</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-green-600" />
            Evidence-Based Strategies for Safer Homemade Baby Food
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              While you can't eliminate heavy metals through home preparation, you CAN significantly reduce exposure by following these research-backed strategies.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Strategy 1: Choose Lower-Contamination Ingredients
              </h3>
              <p className="text-gray-700 mb-4">
                Since you're buying produce yourself, prioritize ingredients with naturally lower heavy metal accumulation.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-3">Serve Freely (Low Contamination)</h4>
                  <div className="space-y-1 text-green-800 text-sm">
                    <p>• Bananas</p>
                    <p>• Oranges & citrus</p>
                    <p>• Avocados</p>
                    <p>• Green beans</p>
                    <p>• Peas</p>
                    <p>• Broccoli</p>
                    <p>• Cucumber</p>
                    <p>• Eggs</p>
                    <p>• Chicken</p>
                    <p>• Whole milk yogurt</p>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-900 mb-3">Limit & Rotate (Higher Contamination)</h4>
                  <div className="space-y-1 text-red-800 text-sm">
                    <p>• Rice (avoid entirely if possible)</p>
                    <p>• Sweet potatoes (max 1-2x/week)</p>
                    <p>• Carrots (max 2x/week)</p>
                    <p>• Regular potatoes</p>
                    <p>• Beets</p>
                    <p>• Apples (from historic orchards)</p>
                    <p>• Spinach</p>
                    <p>• Kale</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Strategy 2: Preparation Methods That Reduce Heavy Metals
              </h3>
              <p className="text-gray-700 mb-4">
                Certain cooking and prep techniques can lower heavy metal content in the final product.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">✓ Peel Root Vegetables</h4>
                  <p className="text-blue-800 text-sm">
                    Peeling sweet potatoes and carrots removes the outer layer where heavy metals concentrate, reducing cadmium and lead by 20-40%. Always peel before cooking for baby food.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">✓ Cook Rice Like Pasta (If You Must Use Rice)</h4>
                  <p className="text-blue-800 text-sm">
                    Cook brown rice in 6-10 parts water, then drain excess water like pasta. This removes 40-60% of arsenic. Never use the absorption method for baby food.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">✓ Steam Instead of Boil (For Most Vegetables)</h4>
                  <p className="text-blue-800 text-sm">
                    Steaming preserves more nutrients than boiling while still cooking thoroughly. However, for rice, boiling and draining is preferred to remove arsenic.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">✓ Remove Dark Meat and Skin from Fish</h4>
                  <p className="text-blue-800 text-sm">
                    Toxins including mercury concentrate in dark meat and skin. Use only the light meat portions for baby food.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">✗ Washing Alone Doesn't Help</h4>
                  <p className="text-blue-800 text-sm">
                    Heavy metals are absorbed into plant tissue through roots—washing removes dirt but not internal contamination. Still wash produce for general cleanliness, but don't expect heavy metal reduction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Strategy 3: Implement Aggressive Rotation
              </h3>
              <p className="text-gray-700 mb-4">
                Homemade baby food makes rotation easier since you're not limited by jar availability.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-3">Sample Weekly Rotation Plan</h4>
                <div className="space-y-3 text-purple-800 text-sm">
                  <div>
                    <p className="font-semibold mb-1">Grains (7 servings, 7 different types):</p>
                    <p>Oatmeal, barley, quinoa, millet, amaranth, buckwheat, farro—never repeat in same week</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Vegetables (14 servings, rotate through 10+ types):</p>
                    <p>Green beans, peas, broccoli, zucchini, butternut squash, avocado, cucumber, spinach, sweet potato (1x only), carrots (2x max)</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Fruits (10 servings, 7+ types):</p>
                    <p>Banana, pear, blueberries, mango, peach, apple, plum—rotate daily</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Proteins (7 servings, 5+ types):</p>
                    <p>Salmon, chicken, lentils, eggs, tofu, beef, white fish—rotate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Strategy 4: Test Your Water Source
              </h3>
              <p className="text-gray-700 mb-4">
                Water used in preparation can add heavy metals, especially if you have old pipes or well water.
              </p>
              <div className="space-y-3 text-gray-700">
                <p className="flex gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <span><strong>Test home water:</strong> Contact local health department for lead/arsenic testing (often free)</span>
                </p>
                <p className="flex gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <span><strong>Use filtered water:</strong> Reverse osmosis filters remove heavy metals most effectively</span>
                </p>
                <p className="flex gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <span><strong>Avoid boiled-only water:</strong> Boiling kills bacteria but concentrates heavy metals—use filtered water instead</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Strategy 5: Source from Local, Tested Farms When Possible
              </h3>
              <p className="text-gray-700 mb-4">
                Some farmers markets and CSAs work with farms that conduct soil testing. Ask about it!
              </p>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Questions to Ask at Farmers Markets:</h4>
                <div className="space-y-2 text-green-800 text-sm">
                  <p>• "Do you test your soil for heavy metals?"</p>
                  <p>• "Have you had issues with historical pesticide use on your land?"</p>
                  <p>• "Where is your farm located?" (Avoid farms near industrial areas, former orchards, mining regions)</p>
                  <p>• "What's your water source for irrigation?"</p>
                </div>
                <p className="text-green-700 text-xs mt-3 italic">
                  Note: Few farms conduct heavy metal testing, but asking raises awareness and helps you identify farms that take contamination seriously.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Food Safety Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Chef className="w-8 h-8 text-orange-600" />
            Food Safety: Preventing Bacterial Contamination
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              While heavy metals are one concern, bacterial contamination is an immediate safety risk with homemade baby food. Follow these guidelines rigorously.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Essential Food Safety Practices
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Wash Hands & Equipment Thoroughly</h4>
                    <p className="text-gray-700 text-sm">
                      Wash hands with soap for 20+ seconds. Sanitize cutting boards, knives, food processor, and storage containers before use.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Cook to Safe Temperatures</h4>
                    <p className="text-gray-700 text-sm">
                      Poultry: 165°F | Ground meats: 160°F | Fish: 145°F | Eggs: Cook until firm | Vegetables: Cook until very soft for babies under 8 months
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Cool and Store Quickly</h4>
                    <p className="text-gray-700 text-sm">
                      Cool cooked food within 2 hours. Refrigerate immediately (use within 48 hours) or freeze in portions (use within 2-3 months). Never leave baby food at room temperature.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Use Ice Cube Trays for Portioning</h4>
                    <p className="text-gray-700 text-sm">
                      Pour purees into clean ice cube trays, freeze, then transfer to labeled freezer bags. Each cube = approximately 1 ounce (perfect portion size).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Thaw Safely</h4>
                    <p className="text-gray-700 text-sm">
                      Thaw in refrigerator overnight OR heat directly from frozen. Never thaw at room temperature. Once thawed, use within 24 hours—never refreeze.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Never Feed from Storage Container</h4>
                    <p className="text-gray-700 text-sm">
                      Bacteria from baby's saliva will contaminate the entire batch. Always portion out what you'll serve, then refrigerate the rest immediately.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Hybrid Approach Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            The Hybrid Approach: Best of Both Worlds
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Many parents find that combining homemade and commercial baby food offers the best balance of safety, convenience, and cost.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Recommended Hybrid Strategy
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">60% Homemade (When Home, Time Permitting)</h4>
                  <div className="text-blue-800 text-sm space-y-2">
                    <p>• Fresh fruits mashed (bananas, avocados, soft pears)</p>
                    <p>• Steamed vegetables (green beans, peas, broccoli)</p>
                    <p>• Simple proteins (scrambled eggs, shredded chicken)</p>
                    <p>• Alternative grains prepared weekly (oatmeal, barley, quinoa)</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-3">40% Commercial (For Convenience & Testing Data)</h4>
                  <div className="text-purple-800 text-sm space-y-2">
                    <p>• Premium brands with testing protocols (Happy Baby, Once Upon a Farm)</p>
                    <p>• Pouches for outings and travel</p>
                    <p>• Complex combinations you wouldn't make at home</p>
                    <p>• Backup options when time is short</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="font-semibold text-green-900 mb-2">Why This Works:</p>
                <p className="text-green-800 text-sm">
                  You get cost savings and variety from homemade food, while commercial options provide tested products for high-risk categories and convenience. This hybrid approach maximizes rotation while minimizing both cost and time investment.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bottom Line Section */}
        <section className="mb-12">
          <Card className="border-2 border-green-300 bg-green-50">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-green-900 flex items-center gap-3">
                <CheckCircle className="w-7 h-7" />
                The Bottom Line
              </h2>
              <div className="space-y-3 text-green-900">
                <p className="text-lg">
                  <strong>Homemade baby food isn't inherently safer from heavy metals than commercial options—but it offers other valuable benefits when done strategically.</strong>
                </p>
                <div className="bg-green-100 rounded-lg p-4 space-y-2">
                  <p><strong>✓ Reality Check:</strong> 94% of homemade baby food contains heavy metals, identical to store-bought rates</p>
                  <p><strong>✓ Contamination source:</strong> Heavy metals come from soil/water, not commercial processing</p>
                  <p><strong>✓ What homemade DOES offer:</strong> Cost savings, maximum variety, freshness, additive control</p>
                  <p><strong>✓ Reduce risk with:</strong> Lower-contamination ingredients, peeling/draining prep methods, aggressive rotation</p>
                  <p><strong>✓ Hybrid approach:</strong> 60% homemade + 40% tested commercial brands = best balance</p>
                </div>
                <p className="pt-3">
                  If you choose to make baby food at home, focus on ingredient selection and rotation rather than assuming homemade automatically equals safer. Combined with commercial products from transparent brands, you can provide your baby with nutritious, varied, and relatively low-contamination meals.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Articles Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/power-of-variety-rotation-reduces-risk" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Safety Tips</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Power of Variety: How Rotation Reduces Risk 50-80%
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Essential rotation strategies to dilute heavy metal exposure across diverse food sources.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/how-baby-food-gets-contaminated" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Heavy Metals</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    How Baby Food Gets Contaminated: Soil to Shelf
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Understand why agricultural contamination affects homemade and commercial food equally.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/best-organic-baby-food-safety-beyond-label" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Product Guides</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Best Organic Baby Food: Safety Beyond the Label
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Why organic ingredients don't guarantee heavy-metal-free products—and what actually works.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/water-quality-formula-baby-food" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Safety Tips</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Water Quality: Choosing Safe Water for Formula & Food
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Why water quality matters for homemade baby food and how to ensure safe preparation water.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardContent className="pt-8 pb-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Compare Homemade Ingredients to Commercial Products
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Use our database to check heavy metal levels in produce and compare to tested commercial baby food options for informed hybrid meal planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search Our Database
              </Link>
              <Link
                href="/blog/category/safety-tips"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                More Safety Tips
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Sources Section */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Sources & Research</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>1. Healthy Babies Bright Futures (2022) - "Is Homemade Baby Food Better?" research study</p>
            <p>2. Consumer Reports (2022) - Homemade baby food arsenic and heavy metals analysis</p>
            <p>3. Cleveland Clinic (2025) - "What To Know About Heavy Metals in Baby Food"</p>
            <p>4. Harvard Health (2021-2025) - Heavy metals in baby food guidance for parents</p>
            <p>5. Minnesota Department of Health (April 2025) - Updated heavy metals in infant foods guidance</p>
            <p>6. American Academy of Pediatrics - Food preparation safety guidelines</p>
            <p>7. FDA Food Safety Guidelines - Home food preparation for infants</p>
          </div>
        </section>
      </article>
    </>
  )
}
