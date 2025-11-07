import SEO from '@/components/SEO'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  Sprout,
  Droplet,
  Factory,
  Package,
  TrendingUp,
  Leaf,
  ShieldCheck,
  Info,
  CheckCircle,
  XCircle
} from '@/components/icons'
import Link from 'next/link'

export const metadata = SEO({
  title: 'How Baby Food Gets Contaminated: From Soil to Shelf | Complete 2025 Guide',
  description: 'Understand the contamination pathway for heavy metals in baby food—from agricultural sources through processing and manufacturing. Learn how to minimize exposure at every stage.',
  canonical: '/blog/how-baby-food-gets-contaminated',
});

// Generate JSON-LD structured data for the article
function generateArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Baby Food Gets Contaminated: From Soil to Shelf',
    description: 'Comprehensive guide to understanding how heavy metal contamination occurs throughout the baby food supply chain, from agricultural production to final product.',
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

export default function HowBabyFoodGetsContaminatedPage() {
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
            <Badge variant="secondary">Supply Chain</Badge>
            <Badge variant="secondary">Contamination Sources</Badge>
            <Badge variant="secondary">2025 Research</Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            How Baby Food Gets Contaminated: From Soil to Shelf
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            Understanding the contamination pathway for heavy metals in baby food—and what manufacturers can do (or aren't doing) to stop it.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <time dateTime="2025-01-06">Updated January 6, 2025</time>
            <span>•</span>
            <span>15 min read</span>
          </div>
        </div>

        {/* Critical Context Card */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Info className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-orange-900 mb-2">
                  Understanding Contamination Helps You Make Better Choices
                </h3>
                <p className="text-orange-800 mb-3">
                  Heavy metal contamination in baby food isn't a simple "dirty factory" problem. It's a complex supply chain issue starting with historical industrial pollution in agricultural soil, continuing through water sources and processing equipment, and ending with inadequate testing protocols.
                </p>
                <div className="bg-orange-100 rounded-lg p-4 mt-3">
                  <p className="font-semibold text-orange-900 mb-2">2025 Reality Check:</p>
                  <p className="text-orange-800">
                    Even organic baby food—grown without pesticides on "clean" farms—tests positive for heavy metals because the contamination often happened decades ago. The U.S. imports 50-60% of fruits/vegetables, 80%+ of fish, and nearly all spices, making global supply chain monitoring nearly impossible.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-8">
          <p>
            When a baby food jar tests positive for lead, arsenic, or cadmium, parents naturally wonder: <em>How did this happen?</em> Was the factory dirty? Did someone cut corners? Is this brand particularly negligent?
          </p>

          <p>
            The reality is far more complex—and in some ways, more troubling. Heavy metal contamination in baby food is a <strong>multi-stage problem</strong> that begins long before ingredients reach the manufacturing facility. From contaminated soil to processing equipment to packaging materials, every step in the supply chain presents potential contamination risks.
          </p>

          <p>
            Understanding this contamination pathway is crucial because it explains why even premium organic brands test positive for heavy metals, why some products are consistently safer than others, and what manufacturers can actually control (versus what they can't).
          </p>
        </div>

        {/* Stage 1: Agricultural Sources */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Sprout className="w-8 h-8 text-green-600" />
            Stage 1: Agricultural Contamination (Soil & Water)
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              The contamination story begins in agricultural fields, often decades before the current crop is planted. <strong>Heavy metals persist in soil for 100+ years</strong>, meaning today's "clean" farming practices cannot undo historical pollution.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Primary Sources of Soil Contamination
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Historical Pesticide Use (Pre-1980s)</h4>
                  <p className="text-gray-700 mb-2">
                    Lead arsenate pesticides were widely used on fruit orchards and vegetable farms until banned in the 1980s. These pesticides left lasting contamination in agricultural soils.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    <strong>Most affected crops:</strong> Apples, pears, rice, root vegetables grown in formerly treated fields
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Industrial Pollution & Emissions</h4>
                  <p className="text-gray-700 mb-2">
                    Factories, smelters, mining operations, and coal-fired power plants have released heavy metals into air and water for over a century. These contaminants settle into agricultural soil through atmospheric deposition.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    <strong>Most affected regions:</strong> Agricultural areas near industrial zones, historically mined regions, downwind of power plants
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Contaminated Irrigation Water</h4>
                  <p className="text-gray-700 mb-2">
                    Groundwater and surface water used for irrigation often contains heavy metals from industrial runoff, mining waste, and natural geological sources. Rice fields, which require flooding, are particularly susceptible to water-borne arsenic contamination.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    <strong>Most affected crops:</strong> Rice (absorbs arsenic from water), leafy greens, any crops using contaminated water sources
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Natural Geological Sources</h4>
                  <p className="text-gray-700 mb-2">
                    Some soils naturally contain elevated levels of arsenic, cadmium, and other heavy metals due to underlying geology. Volcanic soils, certain sedimentary deposits, and areas with specific mineral compositions pose inherent risks.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    <strong>Most affected regions:</strong> Parts of California, Southwest U.S., volcanic regions, certain Asian rice-growing areas
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Fertilizers & Soil Amendments</h4>
                  <p className="text-gray-700 mb-2">
                    Some fertilizers—especially phosphate-based products and manure from livestock fed contaminated feed—can introduce additional heavy metals into soil over time.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    <strong>Risk level:</strong> Generally lower than other sources, but cumulative over repeated applications
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Why Organic Doesn't Mean Heavy-Metal-Free
              </h3>
              <p className="text-green-800 mb-3">
                Parents often assume organic baby food is safer from heavy metals, but <strong>organic certification only restricts current pesticide use</strong>—it doesn't address legacy contamination in soil.
              </p>
              <div className="space-y-2 text-green-800">
                <div className="flex gap-2">
                  <span>•</span>
                  <span>Organic farms may be located on historically contaminated land</span>
                </div>
                <div className="flex gap-2">
                  <span>•</span>
                  <span>Heavy metals from decades-old pesticides persist regardless of current farming practices</span>
                </div>
                <div className="flex gap-2">
                  <span>•</span>
                  <span>Irrigation water sources may still be contaminated</span>
                </div>
                <div className="flex gap-2">
                  <span>•</span>
                  <span>Natural geological contamination affects organic and conventional farms equally</span>
                </div>
              </div>
              <p className="text-green-700 mt-3 font-semibold">
                Bottom line: Organic is valuable for avoiding current pesticides, but it's NOT a guarantee against heavy metal contamination.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Stage 2: Plant Uptake */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            Stage 2: Plant Uptake & Bioaccumulation
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Once heavy metals are present in soil or water, plants actively absorb them through their root systems. <strong>This isn't contamination from surface dirt</strong>—the metals are incorporated into the plant tissue itself, making them impossible to wash off.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Why Some Crops Absorb More Heavy Metals
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">High-Risk Crop Categories:</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">🍚 Rice & Water-Based Grains</p>
                      <p className="text-gray-700 text-sm">
                        Rice grows in flooded fields, allowing arsenic to dissolve and be absorbed through roots at much higher rates than other crops. Rice accumulates <strong>10x more arsenic</strong> than other grains.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">🥔 Root Vegetables (Sweet Potatoes, Carrots, Beets)</p>
                      <p className="text-gray-700 text-sm">
                        Root vegetables are in direct contact with soil throughout growth. They readily absorb cadmium and lead. Sweet potatoes can contain <strong>12-18 ppb cadmium</strong> vs 2-4 ppb in green beans.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">🥬 Leafy Greens (Spinach, Kale)</p>
                      <p className="text-gray-700 text-sm">
                        Large surface area and proximity to soil make leafy greens susceptible to both root uptake and surface contamination from soil particles.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">🍎 Fruit from Historically Treated Orchards</p>
                      <p className="text-gray-700 text-sm">
                        Apple and pear orchards treated with lead arsenate pesticides decades ago still show elevated heavy metal levels in fruit—even after trees are replanted.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-3">Lower-Risk Crop Categories:</h4>
                  <div className="space-y-2 text-green-800">
                    <p><strong>• Tree fruits with peels</strong> (bananas, citrus) - peel provides protection barrier</p>
                    <p><strong>• Above-ground vegetables</strong> (peas, green beans, broccoli) - less soil contact</p>
                    <p><strong>• Alternative grains</strong> (oats, barley, quinoa) - grown in drier conditions, absorb less</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Why Washing Produce Doesn't Remove Heavy Metals
                  </h3>
                  <p className="text-blue-800 mb-3">
                    Heavy metals absorbed through plant roots are incorporated into the cellular structure of the plant. They're not surface contaminants that can be rinsed away.
                  </p>
                  <p className="text-blue-800">
                    Washing <em>does</em> remove dirt particles that might contain additional contaminants, so it's still recommended—but don't expect it to significantly reduce heavy metal content in the plant tissue itself.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stage 3: Processing & Manufacturing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Factory className="w-8 h-8 text-purple-600" />
            Stage 3: Processing & Manufacturing Contamination
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              After crops are harvested, they enter processing facilities where <strong>additional contamination can occur</strong> through equipment, water, and ingredients from multiple sources being combined.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Manufacturing Contamination Pathways
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Processing Equipment</h4>
                  <p className="text-gray-700 mb-2">
                    Metal grinding, cutting, and processing equipment can leach small amounts of heavy metals into food products—especially with acidic foods or prolonged contact.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Risk level:</strong> Generally minor contributor, but cumulative across batches
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Water Used in Processing</h4>
                  <p className="text-gray-700 mb-2">
                    Manufacturing facilities use water for washing, steam processing, and product dilution. If this water contains heavy metals from municipal sources or facility pipes, it can contribute to final product contamination.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Quality facilities:</strong> Use filtered/purified water; lower-cost operations may use standard tap water
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Cross-Batch Contamination</h4>
                  <p className="text-gray-700 mb-2">
                    Equipment not thoroughly cleaned between batches can transfer contaminants from high-contamination ingredients to lower-contamination batches.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Evidence:</strong> Consumer Reports noted variability within same brands, suggesting batch-to-batch contamination issues
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Ingredient Mixing from Global Sources</h4>
                  <p className="text-gray-700 mb-2">
                    Baby food manufacturers often source ingredients from multiple suppliers and countries. When rice from high-arsenic regions is blended with other grains, or produce from multiple farms is combined, contamination from one source dilutes across—but doesn't eliminate—final products.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>2025 challenge:</strong> U.S. imports 50-60% of produce, 80%+ of seafood, nearly 100% of spices—making supply chain oversight extremely difficult
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Additives & Fortification Minerals</h4>
                  <p className="text-gray-700 mb-2">
                    Some vitamin/mineral supplements added to baby food (especially iron fortification) may contain trace heavy metal contaminants if not properly purified.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Risk level:</strong> Generally very low with quality ingredient suppliers
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
                    What About "Made in USA" Labels?
                  </h3>
                  <p className="text-amber-800 mb-3">
                    "Made in USA" or "Processed in USA" labels can be misleading. They indicate where the food was <em>manufactured</em>, not where ingredients were grown.
                  </p>
                  <div className="space-y-2 text-amber-800">
                    <p>• A product "Made in USA" can contain imported rice from high-arsenic regions</p>
                    <p>• Final processing location tells you nothing about agricultural contamination sources</p>
                    <p>• Look for brands that disclose ingredient sourcing, not just manufacturing location</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stage 4: Packaging */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Package className="w-8 h-8 text-orange-600" />
            Stage 4: Packaging Materials
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Packaging materials—especially metal cans and lids—can potentially leach heavy metals into food products, though this is generally a <strong>minor contributor</strong> compared to agricultural contamination.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Packaging Contamination Concerns
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Metal Cans & Lids</h4>
                  <p className="text-gray-700 mb-2">
                    Lead solder was historically used in canned food seams (banned in U.S. in 1995). Modern cans use welded seams and internal coatings, but imported products or old stock may still pose risks.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Current risk:</strong> Very low for U.S.-manufactured baby food; higher for imported products
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Glass Jars</h4>
                  <p className="text-gray-700 mb-2">
                    Glass itself is inert and doesn't leach contaminants. However, some decorative labels or lid linings may contain trace heavy metals.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Current risk:</strong> Extremely low; glass is safest packaging option
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Plastic Pouches</h4>
                  <p className="text-gray-700 mb-2">
                    Modern food-grade plastics don't typically contain heavy metals, though concerns about BPA and phthalates persist (different category of contaminants).
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Heavy metal risk:</strong> Very low; other chemical concerns are more relevant for plastic packaging
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 mb-2">Bottom Line on Packaging:</p>
                <p className="text-blue-800 text-sm">
                  While packaging <em>can</em> contribute to contamination, it's a very minor factor compared to agricultural and processing sources. Focus your attention on ingredient sourcing and brand testing protocols rather than packaging type.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What Manufacturers Can Control */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-green-600" />
            What Can Manufacturers Actually Control?
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Understanding contamination sources reveals a critical truth: <strong>manufacturers cannot eliminate heavy metals entirely</strong>, but they can take meaningful steps to minimize them. The difference between high-quality and low-quality brands often comes down to these preventive measures.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Actions High-Quality Manufacturers Take
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Test Soil Before Planting</h4>
                    <p className="text-gray-700">
                      Premium brands work with farmers to test soil heavy metal levels before crops are planted, avoiding high-contamination fields entirely.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Strategic Ingredient Sourcing</h4>
                    <p className="text-gray-700">
                      Source rice from regions with naturally lower arsenic (California vs Southern U.S.), select root vegetable suppliers from tested low-cadmium fields.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Test Every Batch</h4>
                    <p className="text-gray-700">
                      Leading brands like Happy Baby test ingredients before processing AND final products before shipping, allowing them to reject high-contamination batches.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Use Filtered Processing Water</h4>
                    <p className="text-gray-700">
                      Invest in water purification systems rather than using standard municipal water in processing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Maintain Clean Equipment</h4>
                    <p className="text-gray-700">
                      Implement rigorous cleaning protocols between batches to prevent cross-contamination.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Transparent Testing Results (2025 QR Codes)</h4>
                    <p className="text-gray-700">
                      California AB 899 now requires testing results via QR codes. Brands that voluntarily exceed these requirements demonstrate commitment to transparency.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-red-900">
                What Lower-Quality Manufacturers Don't Do
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <p className="text-red-800">
                    <strong>Buy from cheapest suppliers</strong> without regard to sourcing location or contamination risk
                  </p>
                </div>
                <div className="flex gap-3">
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <p className="text-red-800">
                    <strong>Test only final products</strong> (or not at all), missing contamination in individual ingredients
                  </p>
                </div>
                <div className="flex gap-3">
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <p className="text-red-800">
                    <strong>Rely on supplier claims</strong> without independent verification
                  </p>
                </div>
                <div className="flex gap-3">
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <p className="text-red-800">
                    <strong>Provide no transparency</strong> into testing protocols or results
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2025 Regulatory Changes */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            2025 Regulatory Changes: What's Improving?
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Several regulatory changes in 2025 are improving transparency and accountability—though experts argue they don't go far enough.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Key 2025 Developments
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    ✓ FDA Final Guidance on Lead Limits (January 6, 2025)
                  </h4>
                  <p className="text-blue-800 mb-2">
                    FDA finalized action levels: 10 ppb lead for most baby foods, 20 ppb for root vegetables and cereals. However, these are <em>guidance levels</em>, not legally binding limits.
                  </p>
                  <p className="text-sm text-blue-700 italic">
                    Criticism: Many experts argue 10 ppb is too high, and lack of enforcement makes guidance largely voluntary.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    ✓ California AB 899 QR Code Requirements (January 1, 2025)
                  </h4>
                  <p className="text-blue-800 mb-2">
                    California now requires monthly testing for lead, arsenic, cadmium, and mercury with results accessible via QR codes on all baby food labels.
                  </p>
                  <p className="text-sm text-blue-700 italic">
                    Impact: Provides unprecedented transparency, but only covers California-sold products (though many brands comply nationally to avoid dual labeling).
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    ✓ Congressional Litigation (MDL 3101, November 2025 deadline)
                  </h4>
                  <p className="text-blue-800 mb-2">
                    Ongoing litigation against major baby food manufacturers continues to drive industry changes through legal pressure and public scrutiny.
                  </p>
                </div>

                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">
                    ⏳ Still Missing: Mandatory Limits & Enforcement
                  </h4>
                  <p className="text-amber-800">
                    Unlike the EU, which has legally binding limits on heavy metals in baby food, U.S. regulations remain largely guidance-based with minimal enforcement mechanisms. Advocacy groups continue pushing for mandatory, enforceable standards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What Parents Can Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            What Parents Can Do to Minimize Contamination Risk
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Understanding the contamination pathway empowers you to make strategic choices that minimize your baby's exposure.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                7 Evidence-Based Strategies
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Choose brands that test ingredients AND final products</h4>
                    <p className="text-gray-700 text-sm">
                      Happy Baby, Once Upon a Farm, and Serenity Kids publish comprehensive testing protocols.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Avoid rice cereal entirely—choose oat, barley, or quinoa</h4>
                    <p className="text-gray-700 text-sm">
                      Rice's unique contamination profile makes it the highest-risk grain. Oatmeal has 85% less arsenic.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Limit root vegetables to 1-2 servings per week</h4>
                    <p className="text-gray-700 text-sm">
                      Sweet potatoes, carrots, and beets absorb more cadmium. Balance with above-ground vegetables.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Rotate brands and products—never rely on one source</h4>
                    <p className="text-gray-700 text-sm">
                      Variety dilutes exposure across different supply chains, reducing cumulative contamination by 50-80%.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Scan QR codes before purchase (California 2025 requirement)</h4>
                    <p className="text-gray-700 text-sm">
                      Check actual test results rather than relying on marketing claims about safety.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Choose brands with transparent sourcing practices</h4>
                    <p className="text-gray-700 text-sm">
                      Brands that disclose where ingredients are grown demonstrate supply chain accountability.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    7
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Transition to table foods earlier when appropriate</h4>
                    <p className="text-gray-700 text-sm">
                      Whole foods you prepare at home give you more control over ingredient sources and variety.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bottom Line */}
        <section className="mb-12">
          <Card className="border-2 border-green-300 bg-green-50">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-green-900 flex items-center gap-3">
                <CheckCircle className="w-7 h-7" />
                The Bottom Line
              </h2>
              <div className="space-y-3 text-green-900">
                <p className="text-lg">
                  <strong>Heavy metal contamination in baby food is a complex, multi-stage problem—but understanding the pathway helps you minimize risk.</strong>
                </p>
                <div className="bg-green-100 rounded-lg p-4 space-y-3">
                  <p>
                    <strong>Agricultural contamination</strong> (soil, water) is the primary source—meaning organic doesn't guarantee heavy-metal-free products.
                  </p>
                  <p>
                    <strong>Plant uptake</strong> varies dramatically by crop type—rice and root vegetables absorb far more than above-ground alternatives.
                  </p>
                  <p>
                    <strong>Processing & manufacturing</strong> can add contamination, but high-quality brands test rigorously and source strategically.
                  </p>
                  <p>
                    <strong>Packaging</strong> is a minor contributor—focus on ingredient sourcing instead.
                  </p>
                  <p className="pt-2 border-t border-green-200">
                    <strong>Your power as a parent:</strong> Choose brands with transparent testing, avoid high-risk foods (rice, excessive root vegetables), rotate products religiously, and use 2025's new QR code transparency tools to verify claims.
                  </p>
                </div>
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
                    Deep dive into why rice accumulates 10x more arsenic and what parents can do about it.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/cadmium-in-baby-food-sweet-potatoes" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Heavy Metals</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Cadmium in Baby Food: Sweet Potato Dangers
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Why root vegetables absorb more cadmium and safer alternatives for your baby.
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
                    Why organic doesn't mean heavy-metal-free and which organic brands actually test rigorously.
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
                    How Happy Baby's "test every batch" approach and strategic sourcing deliver consistently lower contamination.
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
              Check Heavy Metal Levels in Any Baby Food Product
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Use our comprehensive database to search for specific products and see their contamination test results. Make informed decisions with real data.
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
            <p>1. FDA Closer to Zero Action Plan (2025) - Reducing childhood exposure to contaminants</p>
            <p>2. California AB 899 Implementation (January 2025) - QR code transparency requirements</p>
            <p>3. Target Good & Gather Recall (March 2025) - FRUSELVA USA lead contamination</p>
            <p>4. Publix GreenWise Recall (2025) - Lead contamination in baby food pouches</p>
            <p>5. Congressional Investigation Reports (2021-2025) - Heavy metal testing across major brands</p>
            <p>6. Consumer Reports Testing (August 2025) - Brand-by-brand heavy metal analysis</p>
            <p>7. Pure Earth Research - Contamination sources in global supply chains</p>
            <p>8. Multiple peer-reviewed studies on agricultural contamination pathways</p>
          </div>
        </section>
      </article>
    </>
  )
}
