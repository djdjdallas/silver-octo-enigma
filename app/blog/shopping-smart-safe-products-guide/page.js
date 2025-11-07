import SEO from '@/components/SEO'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  ShoppingCart,
  Smartphone,
  ShieldCheck,
  Search,
  CheckCircle,
  XCircle,
  Info,
  Barcode,
  TrendingUp
} from '@/components/icons'
import Link from 'next/link'

export const metadata = SEO({
  title: 'Shopping Smart for Safe Baby Food: Complete 2025 Guide with QR Codes',
  description: 'Master baby food shopping with 2025 QR code scanning, label reading strategies, brand selection criteria, and real-time safety checks at the store.',
  canonical: '/blog/shopping-smart-safe-products-guide',
});

// Generate JSON-LD structured data for the article
function generateArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Shopping Smart for Safe Baby Food: Complete 2025 Guide with QR Codes',
    description: 'Comprehensive shopping guide for selecting safe baby food using 2025 QR code technology, label reading, and evidence-based brand selection.',
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

export default function ShoppingSmartSafeProductsPage() {
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
            <Badge variant="secondary">Shopping Guide</Badge>
            <Badge variant="secondary">QR Codes</Badge>
            <Badge variant="secondary">2025 Technology</Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Shopping Smart: How to Choose Safe Baby Food Products at the Store
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            Your complete 2025 guide to using QR codes, reading labels, and making informed decisions in the baby food aisle.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <time dateTime="2025-01-06">Updated January 6, 2025</time>
            <span>•</span>
            <span>13 min read</span>
          </div>
        </div>

        {/* Game Changer Card */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Smartphone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  2025 Game Changer: QR Codes Reveal Heavy Metal Test Results at Point of Purchase
                </h3>
                <p className="text-blue-800 mb-3">
                  As of January 1, 2025, California law requires baby food manufacturers to provide QR codes on packaging that link to monthly heavy metal testing results. Major brands (Gerber, Beech-Nut, Happy Baby) are implementing nationwide. <strong>You can now check lead, arsenic, cadmium, and mercury levels before buying.</strong>
                </p>
                <div className="bg-blue-100 rounded-lg p-4 mt-3">
                  <p className="font-semibold text-blue-900 mb-2">How to Use QR Codes:</p>
                  <p className="text-blue-800">
                    Scan the QR code with your phone's camera → Enter batch number from package → View test results for that specific batch → Compare to FDA guidelines → Make informed purchase decision.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-8">
          <p>
            The baby food aisle can be overwhelming. Dozens of brands, hundreds of products, organic vs. conventional, pouches vs. jars, premium vs. store brand—and now you're supposed to worry about heavy metals too?
          </p>

          <p>
            But 2025 brings unprecedented transparency. For the first time, <strong>parents have access to actual testing data at the point of purchase</strong>. Combined with evidence-based brand selection strategies and smart label reading, you can make confident decisions that prioritize your baby's safety.
          </p>

          <p>
            This comprehensive guide will show you exactly how to shop smart using the latest tools and research, turning what once felt like guesswork into data-driven decision-making.
          </p>
        </div>

        {/* QR Code Deep Dive Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Barcode className="w-8 h-8 text-green-600" />
            2025 QR Code Revolution: Your New Superpower
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              California's AB 899 law (effective January 1, 2025) requires monthly testing for four heavy metals with results accessible via QR codes. This is a <strong>massive transparency breakthrough</strong>—but only if you know how to use it effectively.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Step-by-Step: Using QR Codes While Shopping
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Locate the QR Code</h4>
                    <p className="text-gray-700 text-sm">
                      Look on the back or side of packaging. Most brands place QR codes near nutrition facts or ingredient lists. Some products may not have codes yet if manufactured before 2025.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Scan with Your Phone Camera</h4>
                    <p className="text-gray-700 text-sm">
                      Open your phone's camera app (works on iPhone and most Android phones). Point at QR code—a notification should appear. Tap to open the link.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Find the Batch Number</h4>
                    <p className="text-gray-700 text-sm">
                      Look on the package for batch/lot number (usually on lid or bottom). It might be labeled "Batch," "Lot," "Code," or simply a series of numbers/letters.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Enter Batch Number on Website</h4>
                    <p className="text-gray-700 text-sm">
                      The QR code takes you to the manufacturer's testing database. Enter the batch number to retrieve results for that specific product batch.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Review Test Results</h4>
                    <p className="text-gray-700 text-sm">
                      You'll see ppb (parts per billion) levels for lead, arsenic, cadmium, and mercury. Compare these to FDA guidance levels (see chart below).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Make Your Decision</h4>
                    <p className="text-gray-700 text-sm">
                      If levels are low (see safe thresholds below), add to cart. If high, compare to alternative products. Take screenshots for future reference.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Understanding Heavy Metal Test Results: What's Safe?
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-2 px-3">Heavy Metal</th>
                      <th className="text-left py-2 px-3">FDA Action Level (ppb)</th>
                      <th className="text-left py-2 px-3">Ideal Target (ppb)</th>
                      <th className="text-left py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3 font-medium">Lead</td>
                      <td className="py-2 px-3">10 ppb (most foods)<br/>20 ppb (root veg/cereals)</td>
                      <td className="py-2 px-3">≤5 ppb</td>
                      <td className="py-2 px-3"><Badge variant="default" className="bg-green-500">Below 5 = Excellent</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3 font-medium">Arsenic</td>
                      <td className="py-2 px-3">100 ppb (rice cereal)</td>
                      <td className="py-2 px-3">≤10 ppb</td>
                      <td className="py-2 px-3"><Badge variant="default" className="bg-green-500">Below 10 = Excellent</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3 font-medium">Cadmium</td>
                      <td className="py-2 px-3">10 ppb (proposed)</td>
                      <td className="py-2 px-3">≤5 ppb</td>
                      <td className="py-2 px-3"><Badge variant="default" className="bg-green-500">Below 5 = Excellent</Badge></td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3 font-medium">Mercury</td>
                      <td className="py-2 px-3">No FDA limit for baby food</td>
                      <td className="py-2 px-3">≤3 ppb</td>
                      <td className="py-2 px-3"><Badge variant="default" className="bg-green-500">Below 3 = Excellent</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-3 italic">
                Note: FDA action levels are guidance, not legally binding limits. Many experts argue they're too high—aim for ideal targets when possible.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">
                    QR Code Limitations & Challenges
                  </h3>
                  <p className="text-amber-800 mb-3">
                    While QR codes are revolutionary, they have practical limitations:
                  </p>
                  <div className="space-y-2 text-amber-800 text-sm">
                    <p>• <strong>Time-consuming in store:</strong> Scanning multiple products and entering batch numbers can add 15-20 minutes to shopping</p>
                    <p>• <strong>Compliance varies:</strong> Early 2025 investigation found only 4 of 28 companies fully compliant with California law</p>
                    <p>• <strong>Batch number confusion:</strong> Some packages don't clearly label batch numbers, making lookup difficult</p>
                    <p>• <strong>Online-only sellers exempt:</strong> Brands selling exclusively online may skip QR code requirements</p>
                    <p>• <strong>Old inventory:</strong> Products manufactured before Jan 2025 won't have QR codes—may stay on shelves for months</p>
                  </div>
                  <p className="text-amber-700 mt-3 font-semibold">
                    Solution: Pre-shop at home using brand websites, then verify batch numbers in-store for your favorites.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Label Reading Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Search className="w-8 h-8 text-purple-600" />
            Label Reading: What to Look For (Beyond Heavy Metals)
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              QR codes tell you heavy metal levels, but labels reveal other important safety and quality indicators.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Critical Label Reading Strategies
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    ✓ Check Ingredient Order
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Ingredients are listed by quantity. <strong>Water as the first ingredient is a red flag</strong>—it means the product is diluted, reducing nutritional density while keeping heavy metal contamination.
                  </p>
                  <p className="text-gray-600 text-xs italic">
                    Better: Real food ingredients first (e.g., "Organic Pears, Organic Blueberries")
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 bg-green-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    ✓ Avoid Rice-Based Products
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    If "rice" or "rice flour" appears anywhere in the ingredient list, the product likely contains elevated arsenic levels. Look for oat, barley, or quinoa alternatives.
                  </p>
                  <p className="text-gray-600 text-xs italic">
                    Watch out for: "Rice cereal," "brown rice," "rice starch," "rice syrup"
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 bg-green-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    ✓ Look for Specific Fish Species
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    "Salmon" or "Cod" is much better than vague "fish" or "whitefish." Specific species names indicate transparent sourcing.
                  </p>
                  <p className="text-gray-600 text-xs italic">
                    Avoid: "Ocean fish blend," "whitefish" (may hide high-mercury species)
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 bg-green-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    ✓ Verify "Made in USA" Context
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    "Made in USA" indicates processing location, NOT ingredient source. Look for brands that disclose ingredient origins (e.g., "California-grown oats").
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 bg-green-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    ✓ Check for Testing Claims
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Phrases like "Tested for heavy metals" or "Independently verified" indicate brands taking contamination seriously. Look for third-party testing mentions.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 bg-red-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    ✗ Don't Be Fooled by "Organic"
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    Organic certification addresses pesticides, NOT heavy metals. Organic baby food has identical heavy metal contamination rates to conventional.
                  </p>
                  <p className="text-gray-600 text-xs italic">
                    Organic IS valuable for avoiding pesticides—just don't assume it means heavy-metal-free.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 bg-red-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    ✗ Ignore Marketing Buzzwords
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    "Natural," "Pure," "Wholesome," "Clean"—these terms are unregulated and meaningless for heavy metal safety. Focus on actual testing data instead.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Brand Selection Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            Evidence-Based Brand Selection: Who Tests Rigorously?
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Some brands have consistently lower heavy metal levels because they implement rigorous testing protocols and strategic sourcing. Here's who stands out based on 2025 data.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Brand Tier Rankings (Based on Testing Protocols & Results)
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-2">Tier 1: Gold Standard (Test Every Batch, Consistently Low Levels)</h4>
                  <div className="space-y-3 text-green-800">
                    <div>
                      <p className="font-semibold">Happy Baby Organics (91/100)</p>
                      <p className="text-sm">Tests every batch before and after processing. Strategic sourcing from low-contamination regions. Full transparency via QR codes and website.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Once Upon a Farm (89/100)</p>
                      <p className="text-sm">Cold-pressed fresh products. Soil-to-spoon testing. Shorter supply chain = better traceability.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Serenity Kids (88/100)</p>
                      <p className="text-sm">Focus on meat/veggie blends (avoids high-risk ingredients). Comprehensive testing. Transparent sourcing.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900 mb-2">Tier 2: Solid Choice (Regular Testing, Generally Safe Levels)</h4>
                  <div className="space-y-3 text-blue-800">
                    <div>
                      <p className="font-semibold">Beech-Nut (88/100)</p>
                      <p className="text-sm">Strong testing protocols post-2021 reforms. QR code compliance. Improved sourcing practices.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Gerber (82/100)</p>
                      <p className="text-sm">Market leader investing in testing infrastructure. Variable results but improving. QR codes implemented nationwide.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Little Spoon (85/100)</p>
                      <p className="text-sm">Fresh baby food delivery. Good testing. Higher cost but convenient rotation options.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-900 mb-2">Tier 3: Use Caution (Inconsistent Testing or Higher Levels)</h4>
                  <div className="space-y-3 text-yellow-800">
                    <div>
                      <p className="font-semibold">Earth's Best (78/100)</p>
                      <p className="text-sm">Organic but testing protocols less rigorous than competitors. Some products test well, others don't. Check QR codes carefully.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Plum Organics (76/100)</p>
                      <p className="text-sm">Popular brand with variable results. Some products excellent, others problematic. Requires careful product-by-product selection.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-900 mb-2">Tier 4: Avoid (Poor Testing, High Contamination, or Recalls)</h4>
                  <div className="space-y-3 text-red-800">
                    <div>
                      <p className="font-semibold">Store Brands (Parent's Choice 58/100, Good & Gather 62/100)</p>
                      <p className="text-sm">Highly variable quality. 2025 recalls (Target Good & Gather lead contamination). Not worth minor cost savings.</p>
                    </div>
                    <div>
                      <p className="font-semibold">Sprout Organics (70/100)</p>
                      <p className="text-sm">2025 recall for lead in pouches. Inconsistent testing. Better options available at similar price point.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* In-Store Decision Framework */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-orange-600" />
            Quick In-Store Decision Framework (30 Seconds Per Product)
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              You can't QR-scan every product. Use this rapid assessment framework for quick decision-making.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                30-Second Safety Check
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    5s
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Brand Check</h4>
                    <p className="text-gray-700 text-sm">
                      Is this a Tier 1-2 brand? (Happy Baby, Once Upon a Farm, Serenity Kids, Beech-Nut, Gerber, Little Spoon) → If yes, proceed. If no or unknown, be cautious.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    10s
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ingredient Scan</h4>
                    <p className="text-gray-700 text-sm">
                      Read first 3 ingredients. Red flags: Water first, Rice/rice flour, Sweet potato as main ingredient. Green flags: Fruits, above-ground vegetables, specific proteins.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    5s
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Product Type Assessment</h4>
                    <p className="text-gray-700 text-sm">
                      High-risk: Rice cereals, root vegetable purees, crackers/puffs. Medium-risk: Mixed blends, meat combinations. Low-risk: Fruit-only purees, above-ground veggie pouches.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    10s
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Rotation Check</h4>
                    <p className="text-gray-700 text-sm">
                      Do I already have this brand/flavor at home? If yes, choose different option. Enforce variety at point of purchase.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4 mt-4">
                  <p className="font-semibold text-gray-900 mb-2">Decision Rule:</p>
                  <p className="text-gray-700 text-sm">
                    <strong>Green light (buy):</strong> Tier 1-2 brand + safe ingredients + fits rotation<br/>
                    <strong>Yellow light (QR scan first):</strong> Tier 2-3 brand OR questionable ingredients<br/>
                    <strong>Red light (skip):</strong> Tier 4 brand, rice-based, store brand, or duplicate of what you have
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pre-Shopping Strategy */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Pro Strategy: Pre-Shop at Home, Verify in Store
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              The most efficient approach combines home research with in-store verification.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Step-by-Step Pre-Shopping System
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Before Leaving Home (15-20 minutes):</h4>
                  <div className="space-y-2 text-blue-800 text-sm">
                    <p>1. Visit brand websites (HappyBaby.com, BeechNut.com, Gerber.com)</p>
                    <p>2. Browse testing results databases—identify consistently low-contamination products</p>
                    <p>3. Make a shopping list of 10-15 products across multiple brands</p>
                    <p>4. Screenshot or save favorite products for quick reference</p>
                    <p>5. Use our SafeBaby database to search specific products before shopping</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">In Store (5-10 minutes):</h4>
                  <div className="space-y-2 text-green-800 text-sm">
                    <p>1. Shop from your pre-researched list</p>
                    <p>2. Scan QR codes only for high-risk products (rice, root vegetables)</p>
                    <p>3. Verify batch numbers match your research (if you checked specific batches)</p>
                    <p>4. Substitute similar products if your first choice is out of stock</p>
                    <p>5. Enforce rotation by choosing different brands/flavors than last trip</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <p className="font-semibold text-purple-900 mb-2">Time Savings:</p>
                <p className="text-purple-800 text-sm">
                  Pre-shopping reduces in-store time from 30-40 minutes (scanning everything) to 5-10 minutes (verification only). After 2-3 shopping trips, you'll have trusted go-to products memorized.
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
                  <strong>2025 brings unprecedented transparency to baby food shopping—but only if you know how to leverage QR codes and evidence-based brand selection.</strong>
                </p>
                <div className="bg-green-100 rounded-lg p-4 space-y-2">
                  <p><strong>✓ QR code game changer:</strong> First-ever access to batch-specific heavy metal test results at point of purchase</p>
                  <p><strong>✓ Label reading essentials:</strong> Watch for water-first, rice-based products, and vague ingredient claims</p>
                  <p><strong>✓ Brand tiers matter:</strong> Tier 1 brands (Happy Baby, Once Upon a Farm, Serenity Kids) test every batch; store brands often don't test at all</p>
                  <p><strong>✓ 30-second decision framework:</strong> Brand check → Ingredient scan → Rotation verification = confident choices</p>
                  <p><strong>✓ Pro strategy:</strong> Pre-shop at home using brand websites, verify batch numbers in store for efficiency</p>
                </div>
                <p className="pt-3">
                  Shopping smart doesn't mean perfect—it means informed, strategic choices that prioritize rotation and transparency. With these tools, you can navigate the baby food aisle confidently, knowing you're making data-driven decisions that protect your baby.
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
                    Power of Variety: Rotation Reduces Risk 50-80%
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Once you've shopped smart, implement rotation strategies to maximize safety benefits.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/happy-baby-organics-gold-standard" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Brand Reviews</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Happy Baby Organics: The Gold Standard?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Deep dive into why Happy Baby consistently tests lowest for heavy metals.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/beech-nut-vs-earths-best-comparison" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Brand Reviews</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Beech-Nut vs. Earth's Best: Which is Safer?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Product-by-product comparison to help you choose between mid-tier brands.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/store-brand-baby-food-safety" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Brand Reviews</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Store Brand Baby Food Safety: What You Need to Know
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Why Target, Walmart, and other store brands aren't worth the minimal savings.
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
              Pre-Shop with Our Baby Food Safety Database
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Search 1000s of products by brand, ingredient, and heavy metal levels before your shopping trip. Build your safe product list in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search Our Database
              </Link>
              <Link
                href="/blog/category/brand-reviews"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Read Brand Reviews
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Sources Section */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Sources & Research</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>1. California AB 899 Implementation (January 2025) - QR code transparency requirements</p>
            <p>2. FDA Final Guidance on Lead Action Levels (January 6, 2025) - Heavy metal limits for baby food</p>
            <p>3. Consumer Reports Brand Testing (August 2025) - Brand-by-brand heavy metal analysis</p>
            <p>4. Beech-Nut Heavy Metals Testing & QR Codes (2025) - Brand transparency initiatives</p>
            <p>5. Unleaded Kids & Consumer Reports Compliance Investigation (Early 2025) - QR code adoption analysis</p>
            <p>6. CNN, UConn, multiple media outlets - QR code implementation coverage</p>
          </div>
        </section>
      </article>
    </>
  )
}
