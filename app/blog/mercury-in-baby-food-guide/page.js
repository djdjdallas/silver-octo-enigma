import SEO from '@/components/SEO'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  Fish,
  Brain,
  ShieldCheck,
  Droplet,
  Baby,
  CheckCircle,
  XCircle,
  Info
} from '@/components/icons'
import Link from 'next/link'

export const metadata = SEO({
  title: 'Mercury in Baby Food: Complete Safety Guide for Fish & Seafood 2025',
  description: 'Understand mercury risks in baby food fish products. Learn which fish are safe, FDA guidelines, methylmercury impacts on development, and safer seafood alternatives for infants.',
  canonical: '/blog/mercury-in-baby-food-guide',
});

// Generate JSON-LD structured data for the article
function generateArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Mercury in Baby Food: Complete Safety Guide for Fish & Seafood 2025',
    description: 'Comprehensive guide to understanding mercury contamination in baby food, fish safety guidelines, and protecting infant brain development.',
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

export default function MercuryBabyFoodGuidePage() {
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
            <Badge variant="default">Heavy Metals</Badge>
            <Badge variant="secondary">Mercury</Badge>
            <Badge variant="secondary">Fish Safety</Badge>
            <Badge variant="secondary">2025 FDA Guidelines</Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Mercury in Baby Food: Complete Safety Guide for Fish & Seafood
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            Understanding mercury risks in fish-based baby foods and making safer seafood choices for your infant's developing brain.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <time dateTime="2025-01-06">Updated January 6, 2025</time>
            <span>•</span>
            <span>14 min read</span>
          </div>
        </div>

        {/* Critical Warning Card */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                  Mercury Poses Unique Risks to Infant Brain Development
                </h3>
                <p className="text-red-800 mb-3">
                  Unlike other heavy metals, mercury (specifically methylmercury) crosses the placenta and blood-brain barrier easily, accumulating in developing neural tissue. Consumer Reports' 2025 analysis suggests pregnant women may be best off avoiding tuna altogether, and pediatricians recommend extreme caution with any fish-based baby foods.
                </p>
                <div className="bg-red-100 rounded-lg p-4 mt-3">
                  <p className="font-semibold text-red-900 mb-2">Key Finding:</p>
                  <p className="text-red-800">
                    Methylmercury levels in a baby's blood can exceed those in the mother by up to 70%, making infants particularly vulnerable even when maternal exposure seems low.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-8">
          <p>
            When you pick up a jar of fish-based baby food, you might assume it's a healthy choice—after all, fish is rich in omega-3 fatty acids that support brain development. But there's a hidden danger lurking in many seafood products: <strong>methylmercury</strong>, a neurotoxin that can seriously impact your baby's developing brain.
          </p>

          <p>
            In 2025, mercury contamination in baby food remains a significant concern, with new FDA/EPA guidelines highlighting the delicate balance between nutritional benefits and toxicity risks. This comprehensive guide will help you understand mercury in baby food, identify safe fish choices, and make informed decisions that protect your child's neurological development.
          </p>
        </div>

        {/* What is Mercury Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Droplet className="w-8 h-8 text-blue-600" />
            What is Mercury and Why Is It in Fish?
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Mercury is a naturally occurring element, but human industrial activities—particularly coal-fired power plants, mining, and manufacturing—have dramatically increased environmental mercury levels. When mercury enters water systems, bacteria convert it into <strong>methylmercury</strong>, the most toxic form.
            </p>
          </div>

          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" />
                How Mercury Accumulates in Fish
              </h3>
              <div className="space-y-3 text-blue-800">
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[30px]">1.</span>
                  <p><strong>Bioaccumulation:</strong> Small fish absorb methylmercury from contaminated water and food</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[30px]">2.</span>
                  <p><strong>Biomagnification:</strong> Larger predatory fish eat smaller fish, concentrating mercury at each level</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[30px]">3.</span>
                  <p><strong>Long-lived species accumulate more:</strong> Fish that live longer (tuna, swordfish) build up higher mercury levels over time</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 mt-4">
                  <p className="font-semibold mb-2">Critical Insight:</p>
                  <p>A single serving of high-mercury fish can contain 1,000+ times more methylmercury than the water it swam in—making fish the primary source of human mercury exposure.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none">
            <p>
              The problem is particularly acute for <strong>large, predatory fish</strong> like tuna, swordfish, and king mackerel. These species sit at the top of the ocean food chain and accumulate methylmercury from all the smaller fish they consume throughout their lifetimes.
            </p>
          </div>
        </section>

        {/* Health Impacts Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            How Mercury Damages Infant Brain Development
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Methylmercury is uniquely dangerous to developing brains because it <strong>crosses the blood-brain barrier</strong> and <strong>concentrates in neural tissue</strong>. For infants and fetuses, whose brains are rapidly developing, even low-level exposure can cause permanent damage.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Documented Neurological Impacts
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Cognitive Deficits</h4>
                  <p className="text-gray-700">
                    Studies show prenatal mercury exposure correlates with reduced IQ scores, learning disabilities, and memory problems that persist into adolescence and adulthood.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Attention & Executive Function</h4>
                  <p className="text-gray-700">
                    Children exposed to higher methylmercury levels show increased rates of ADHD, difficulty with attention span, and impaired executive functioning skills.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Motor Skills Development</h4>
                  <p className="text-gray-700">
                    Mercury interferes with fine motor skill development, coordination, and visual-spatial processing—skills critical for early childhood development.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Severe Cases</h4>
                  <p className="text-gray-700">
                    High doses can lead to cerebral palsy, deafness, blindness, and severe cognitive disabilities—though such extreme outcomes are rare with dietary exposure alone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">
                    Why Infants Are Most Vulnerable
                  </h3>
                  <ul className="space-y-2 text-amber-800">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span><strong>Rapid brain growth:</strong> Infant brains develop faster than at any other time, making them more susceptible to neurotoxins</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span><strong>Immature blood-brain barrier:</strong> The protective barrier that keeps toxins out of the brain is not fully developed in infants</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span><strong>Higher absorption rate:</strong> Infants absorb and retain more methylmercury than adults from the same food source</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span><strong>Lower body weight:</strong> The same amount of mercury represents a much higher dose per kilogram of body weight in babies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2025 FDA/EPA Guidelines Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-green-600" />
            2025 FDA/EPA Guidelines: What Parents Need to Know
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              The FDA and EPA have updated their fish consumption advice to incorporate the Dietary Guidelines for Americans 2020-2025, which includes new recommendations for children under age 2. However, as part of the "Closer to Zero Action Plan," regulators acknowledge the need to balance nutritional benefits with mercury risks.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Fish Categories by Mercury Content
              </h3>

              <div className="space-y-4">
                {/* Best Choices */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-900 text-lg mb-2">Best Choices (Lowest Mercury)</h4>
                      <p className="text-green-800 text-sm mb-3">Children can eat 2-3 servings per week</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-green-800">
                    <div>• Salmon (wild & farmed)</div>
                    <div>• Cod</div>
                    <div>• Tilapia</div>
                    <div>• Catfish</div>
                    <div>• Sardines</div>
                    <div>• Anchovies</div>
                    <div>• Pollock</div>
                    <div>• Trout (freshwater)</div>
                    <div>• Haddock</div>
                    <div>• Flounder</div>
                  </div>
                </div>

                {/* Good Choices */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 text-lg mb-2">Good Choices (Moderate Mercury)</h4>
                      <p className="text-yellow-800 text-sm mb-3">Children can eat 1 serving per week</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-yellow-800">
                    <div>• Canned light tuna (skipjack)</div>
                    <div>• Snapper</div>
                    <div>• Mahi-mahi</div>
                    <div>• Halibut</div>
                    <div>• Sea bass</div>
                    <div>• Grouper</div>
                  </div>
                </div>

                {/* Avoid */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-red-900 text-lg mb-2">Choices to Avoid (Highest Mercury)</h4>
                      <p className="text-red-800 text-sm mb-3">Do NOT feed to babies or young children</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-red-800">
                    <div>• King mackerel</div>
                    <div>• Marlin</div>
                    <div>• Orange roughy</div>
                    <div>• Shark</div>
                    <div>• Swordfish</div>
                    <div>• Tilefish (Gulf of Mexico)</div>
                    <div>• Bigeye tuna</div>
                    <div>• Albacore/white tuna</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Serving Size Guidelines for Infants & Toddlers
              </h3>
              <div className="space-y-3 text-blue-800">
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[100px]">6-12 months:</span>
                  <span>1 ounce per serving (about 2 tablespoons of flaked fish)</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[100px]">1-3 years:</span>
                  <span>2 ounces per serving (about 4 tablespoons of flaked fish)</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[100px]">4-7 years:</span>
                  <span>3 ounces per serving (about ¼ cup of flaked fish)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tuna Controversy Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Fish className="w-8 h-8 text-orange-600" />
            The Tuna Controversy: Why Consumer Reports Says Avoid It
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              While the FDA lists canned light tuna as a "Best Choice" for pregnant women and young children, <strong>Consumer Reports' 2025 testing reveals concerning mercury variability</strong> that has led their food safety experts to recommend avoiding tuna altogether during pregnancy—and by extension, for infants.
            </p>
          </div>

          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">
                Consumer Reports Key Findings (2025)
              </h3>
              <div className="space-y-3 text-orange-800">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <p>
                    <strong>Unpredictable mercury spikes:</strong> Of 30 samples tested, 6 individual cans showed mercury levels high enough to change FDA recommendations about safe consumption frequency
                  </p>
                </div>
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <p>
                    <strong>Light tuna isn't always low:</strong> While skipjack varieties average lower mercury, significant variation between cans makes it impossible to guarantee safety
                  </p>
                </div>
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <p>
                    <strong>Albacore (white tuna) particularly risky:</strong> Consistently contains 3-5x more mercury than light tuna—absolutely should be avoided for babies
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Mercury Levels by Tuna Type (Average ppb)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-2 px-3">Tuna Type</th>
                      <th className="text-left py-2 px-3">Average Mercury (ppb)</th>
                      <th className="text-left py-2 px-3">Safe Servings/Week (1-3 yrs)</th>
                      <th className="text-left py-2 px-3">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3 font-medium">Skipjack (light)</td>
                      <td className="py-2 px-3">90-120</td>
                      <td className="py-2 px-3">2-3</td>
                      <td className="py-2 px-3"><Badge variant="default" className="bg-yellow-500">Use Caution</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-red-50">
                      <td className="py-2 px-3 font-medium">Albacore (white)</td>
                      <td className="py-2 px-3">350-450</td>
                      <td className="py-2 px-3">≤1</td>
                      <td className="py-2 px-3"><Badge variant="destructive">Avoid for Babies</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-red-50">
                      <td className="py-2 px-3 font-medium">Yellowfin</td>
                      <td className="py-2 px-3">280-380</td>
                      <td className="py-2 px-3">≤1</td>
                      <td className="py-2 px-3"><Badge variant="destructive">Avoid for Babies</Badge></td>
                    </tr>
                    <tr className="bg-red-100">
                      <td className="py-2 px-3 font-medium">Bigeye</td>
                      <td className="py-2 px-3">600-800</td>
                      <td className="py-2 px-3">0</td>
                      <td className="py-2 px-3"><Badge variant="destructive">NEVER</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-3 italic">
                Note: Mercury levels can vary significantly between individual cans, even within the same brand and type.
              </p>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none">
            <p>
              <strong>Our recommendation:</strong> Given the unpredictable mercury variability and the extreme vulnerability of infant brains, we suggest avoiding tuna-based baby foods entirely. There are plenty of safer fish options (salmon, cod, tilapia) that provide the same omega-3 benefits without the mercury risk.
            </p>
          </div>
        </section>

        {/* Baby Food Products Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Baby className="w-8 h-8 text-blue-600" />
            Fish-Based Baby Food Products: What to Choose
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Many baby food brands offer fish-based products, but not all fish are created equal when it comes to mercury content. Here's what to look for—and what to avoid—when shopping for fish-based baby foods.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Safer Fish-Based Baby Food Options
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Salmon-Based Products (Best Choice)
                  </h4>
                  <p className="text-gray-700 mb-2">
                    Brands: Once Upon a Farm, Plum Organics, Serenity Kids, Little Spoon
                  </p>
                  <p className="text-gray-600 text-sm">
                    Salmon consistently tests low for mercury while providing high omega-3 DHA/EPA. Wild-caught Alaskan salmon is ideal, but farmed salmon is also acceptably low in mercury.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 bg-green-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Cod & Whitefish Products
                  </h4>
                  <p className="text-gray-700 mb-2">
                    Brands: Beech-Nut, Gerber, Little Spoon
                  </p>
                  <p className="text-gray-600 text-sm">
                    Cod and other whitefish are very low in mercury. However, they contain lower omega-3 levels than salmon, so they're nutritionally less ideal but perfectly safe.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Tuna-Based Products (Use Extreme Caution)
                  </h4>
                  <p className="text-gray-700 mb-2">
                    Brands: Gerber Graduates, Beech-Nut (limited products)
                  </p>
                  <p className="text-gray-600 text-sm">
                    Most experts, including Consumer Reports, recommend avoiding tuna for babies due to unpredictable mercury content. If you choose to use tuna products, limit to once per month maximum and only use products explicitly labeled "light tuna" or "skipjack."
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 bg-red-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    Products to Completely Avoid
                  </h4>
                  <p className="text-gray-700 mb-2">
                    Any products containing: swordfish, shark, king mackerel, marlin, bigeye tuna, ahi tuna, or albacore/white tuna
                  </p>
                  <p className="text-gray-600 text-sm">
                    These should NEVER be given to infants or toddlers under any circumstances due to extremely high mercury levels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                How to Read Baby Food Labels for Fish Safety
              </h3>
              <div className="space-y-3 text-blue-800">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1 text-green-600" />
                  <p><strong>Look for specific fish species:</strong> "Salmon" or "Cod" is better than generic "fish"</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1 text-green-600" />
                  <p><strong>Check for origin:</strong> "Wild Alaskan salmon" or "Atlantic cod" provides more transparency</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1 text-green-600" />
                  <p><strong>QR codes (as of 2025):</strong> California AB 899 requires heavy metal testing results via QR codes—scan to check mercury levels</p>
                </div>
                <div className="flex gap-3">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-1 text-red-600" />
                  <p><strong>Avoid vague language:</strong> "Ocean fish" or "whitefish blend" may hide high-mercury species</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Practical Recommendations Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-green-600" />
            Practical Recommendations: Balancing Nutrition & Safety
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Fish provides crucial nutrients for brain development—especially DHA and EPA omega-3 fatty acids. The key is choosing low-mercury options and following safe serving guidelines.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                5-Step Safe Fish Strategy for Babies
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Start with salmon at 6-8 months</h4>
                    <p className="text-gray-700">
                      Introduce well-cooked, flaked salmon as one of baby's first proteins. It's low in mercury, high in omega-3s, and easy to digest.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Rotate between 2-3 low-mercury fish</h4>
                    <p className="text-gray-700">
                      Don't rely on a single fish species. Rotate between salmon, cod, tilapia, or sardines to minimize cumulative exposure.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Limit fish to 2-3 servings per week</h4>
                    <p className="text-gray-700">
                      Even low-mercury fish should be balanced with other protein sources (chicken, beans, eggs, dairy) to ensure dietary variety.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Choose smaller, younger fish when possible</h4>
                    <p className="text-gray-700">
                      Younger fish accumulate less mercury. Sardines, anchovies, and small salmon are ideal choices.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Avoid tuna entirely for first 2 years</h4>
                    <p className="text-gray-700">
                      Given the mercury variability and expert caution, it's safest to wait until age 2+ before introducing any tuna, and even then, limit to light tuna only.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">
                Alternative Omega-3 Sources (No Mercury Risk)
              </h3>
              <p className="text-purple-800 mb-3">
                If you're concerned about mercury but want to ensure adequate omega-3 intake:
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-purple-800">
                <div className="flex gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                  <span><strong>Chia seeds</strong> (ground, mixed into purees)</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                  <span><strong>Flaxseed</strong> (ground, added to oatmeal)</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                  <span><strong>Walnuts</strong> (finely ground, age 1+)</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                  <span><strong>Algae-based DHA supplements</strong> (infant formula enriched)</span>
                </div>
              </div>
              <p className="text-purple-700 text-sm mt-3 italic">
                Note: Plant-based omega-3s (ALA) must be converted to DHA/EPA in the body, making them less efficient than fish-based sources—but they're completely mercury-free.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Homemade vs Commercial Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Homemade vs. Commercial Fish Baby Food
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Making your own fish-based baby food doesn't reduce mercury content—the mercury is in the fish itself, regardless of who cooks it. However, preparing fish at home gives you more control over fish selection and preparation methods.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Benefits of Homemade
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Choose specific fish species and sources</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Control preparation methods</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Ensure freshness</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Avoid added ingredients</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Benefits of Commercial
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Testing for heavy metals (QR codes in 2025)</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Consistent portion sizes</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Convenience for busy parents</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Age-appropriate textures</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                How to Prepare Fish Safely at Home
              </h3>
              <div className="space-y-3 text-blue-800">
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[30px]">1.</span>
                  <p><strong>Choose fresh or frozen low-mercury fish</strong> from reputable sources (wild Alaskan salmon, Atlantic cod, farm-raised tilapia)</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[30px]">2.</span>
                  <p><strong>Cook thoroughly</strong> to 145°F internal temperature—no sushi or raw fish for babies</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[30px]">3.</span>
                  <p><strong>Remove all bones, skin, and dark meat</strong> (dark meat can contain higher toxin levels)</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[30px]">4.</span>
                  <p><strong>Flake finely or puree</strong> depending on baby's age and feeding development</p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[30px]">5.</span>
                  <p><strong>Store safely:</strong> Refrigerate for up to 48 hours or freeze in portions for up to 2 months</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Frequently Asked Questions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I give my 6-month-old canned tuna?
                </h3>
                <p className="text-gray-700">
                  Most experts, including Consumer Reports, recommend avoiding tuna for babies due to unpredictable mercury variability. If you choose to introduce tuna, wait until at least 12 months, use only "light" or "skipjack" tuna (never albacore), and limit to no more than once per month. Safer alternatives like salmon, cod, or tilapia are strongly preferred.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is farm-raised salmon safe for babies?
                </h3>
                <p className="text-gray-700">
                  Yes. Farm-raised salmon typically contains even lower mercury levels than wild salmon (though wild has slightly higher omega-3 content). Both are excellent choices for babies. The mercury difference is negligible, so choose based on availability, price, and sustainability preferences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do I know if my baby has been exposed to too much mercury?
                </h3>
                <p className="text-gray-700">
                  Mercury exposure from diet rarely causes acute symptoms. Long-term exposure may manifest as developmental delays, learning difficulties, or attention problems—but these have many potential causes. If you're concerned about mercury exposure, discuss with your pediatrician. Blood tests can measure mercury levels, though interpretation can be complex. The best approach is prevention through careful fish selection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Does cooking fish reduce mercury content?
                </h3>
                <p className="text-gray-700">
                  No. Mercury is tightly bound to fish protein and cannot be reduced through cooking, freezing, or any home preparation method. The only way to reduce mercury exposure is to choose low-mercury fish species and limit serving frequency.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Are fish sticks safe for toddlers?
                </h3>
                <p className="text-gray-700">
                  Commercial fish sticks are typically made from low-mercury fish like pollock, cod, or haddock, making them safe from a mercury perspective. However, they're often highly processed with added sodium, breading, and sometimes unhealthy oils. Choose brands made from whole fish fillets with minimal ingredients, or make homemade fish sticks from fresh low-mercury fish.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Should I avoid sushi restaurants entirely while feeding my baby?
                </h3>
                <p className="text-gray-700">
                  Babies under 12 months should never eat raw fish due to food safety concerns (bacteria, parasites). After age 1, the bigger concern is mercury content rather than raw vs. cooked. If introducing sushi after age 2+, stick to cooked sushi rolls or low-mercury raw fish options like salmon. Absolutely avoid tuna, yellowtail, and other high-mercury sushi fish for young children.
                </p>
              </CardContent>
            </Card>
          </div>
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
                  <strong>Mercury in fish is a real concern for infant brain development, but it doesn't mean avoiding fish entirely.</strong>
                </p>
                <div className="bg-green-100 rounded-lg p-4 space-y-2">
                  <p><strong>✓ DO:</strong> Choose low-mercury fish like salmon, cod, tilapia, and sardines</p>
                  <p><strong>✓ DO:</strong> Serve fish 2-3 times per week, rotating between species</p>
                  <p><strong>✓ DO:</strong> Start fish introduction at 6-8 months with well-cooked, flaked options</p>
                  <p><strong>✓ DO:</strong> Use California QR codes (2025+) to check commercial baby food mercury testing</p>
                  <p className="pt-2"><strong>✗ DON'T:</strong> Give babies tuna, especially albacore/white tuna</p>
                  <p><strong>✗ DON'T:</strong> Serve high-mercury fish like swordfish, shark, king mackerel, or marlin</p>
                  <p><strong>✗ DON'T:</strong> Rely on a single fish species—variety reduces cumulative exposure</p>
                </div>
                <p className="pt-3 text-base">
                  By choosing the right fish and following safe serving guidelines, you can provide your baby with crucial omega-3 nutrients for brain development while minimizing mercury exposure. When in doubt, opt for salmon—it's the safest bet for growing brains.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Articles Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/arsenic-in-baby-food-rice-complete-guide" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Heavy Metals</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Arsenic in Baby Food Rice: Complete Guide
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Learn why rice absorbs 10x more arsenic than other grains and safer alternatives for infant cereals.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/cadmium-in-baby-food-sweet-potatoes" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Heavy Metals</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Cadmium in Baby Food: Hidden Dangers in Sweet Potatoes
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Discover why root vegetables contain more cadmium and how to safely include them in your baby's diet.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/baby-food-pouches-safety-guide" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Product Guides</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Complete Guide to Baby Food Pouches Safety
                  </h3>
                  <p className="text-gray-600 text-sm">
                    2025 recall information, heavy metal concerns, and safer usage guidelines for convenient pouches.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/how-to-avoid-heavy-metals-in-baby-food" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Safety Tips</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    How to Avoid Heavy Metals in Baby Food
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Practical strategies for reducing heavy metal exposure across all baby food categories.
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
              Want to Check Mercury Levels in Your Baby's Food?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Use our comprehensive database to search for specific fish-based products and see their heavy metal testing results, including mercury levels. Make informed decisions with real data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search Our Database
              </Link>
              <Link
                href="/blog/category/heavy-metals"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                More Heavy Metal Guides
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Sources Section */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Sources & Research</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>1. FDA/EPA Fish Consumption Advice (Updated 2025) - Technical information on mercury limits</p>
            <p>2. Consumer Reports Mercury in Tuna Testing (2025) - Variability in canned tuna mercury levels</p>
            <p>3. NCBI Methylmercury in Fish Research - Neurodevelopmental impacts on children</p>
            <p>4. FDA Closer to Zero Action Plan (2025) - Reducing childhood exposure to contaminants</p>
            <p>5. Dietary Guidelines for Americans 2020-2025 - Fish consumption recommendations for children under 2</p>
            <p>6. Multiple peer-reviewed studies on prenatal and infant mercury exposure impacts</p>
          </div>
        </section>
      </article>
    </>
  )
}
