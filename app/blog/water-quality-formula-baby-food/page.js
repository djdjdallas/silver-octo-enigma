import SEO from '@/components/SEO'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  Droplet,
  Filter,
  ShieldCheck,
  Home,
  CheckCircle,
  XCircle,
  Info,
  Beaker
} from '@/components/icons'
import Link from 'next/link'

export const metadata = SEO({
  title: 'Water Matters: Choosing Safe Water for Baby Formula & Food Preparation 2025',
  description: 'Complete guide to water quality for baby formula and food prep. Learn about tap, filtered, distilled water options, reverse osmosis systems, heavy metals, and fluoride concerns.',
  canonical: '/blog/water-quality-formula-baby-food',
});

// Generate JSON-LD structured data for the article
function generateArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Water Matters: Choosing Safe Water for Baby Formula & Food Preparation',
    description: 'Evidence-based guide to selecting safe water for infant formula preparation and homemade baby food, covering filtration methods and contaminant removal.',
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

export default function WaterQualityFormulaPage() {
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
            <Badge variant="secondary">Water Quality</Badge>
            <Badge variant="secondary">Formula Preparation</Badge>
            <Badge variant="secondary">2025 Guidelines</Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Water Matters: Choosing Safe Water for Formula & Baby Food
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            Why water quality is critical for infant health—and how to ensure the water you use is safe from heavy metals, fluoride, and contaminants.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <time dateTime="2025-01-06">Updated January 6, 2025</time>
            <span>•</span>
            <span>14 min read</span>
          </div>
        </div>

        {/* Critical Finding Card */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Droplet className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Water Is a Hidden Source of Heavy Metal & Contaminant Exposure
                </h3>
                <p className="text-blue-800 mb-3">
                  While tap water in most U.S. communities is generally safe to drink, it may contain trace amounts of <strong>lead, copper, PFAS (forever chemicals), microplastics, and fluoride</strong>—all especially concerning for infants. A 6-month-old consuming 24-32 oz of formula daily can be exposed to significant cumulative contamination from water alone.
                </p>
                <div className="bg-blue-100 rounded-lg p-4 mt-3">
                  <p className="font-semibold text-blue-900 mb-2">2025 Expert Consensus:</p>
                  <p className="text-blue-800">
                    The safest water for baby formula preparation is <strong>reverse osmosis filtered water</strong>, which removes heavy metals, fluoride, PFAS, and other contaminants while preserving essential mineral content when needed. This is more important than choosing organic formula or premium baby food.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-8">
          <p>
            Parents obsess over which formula brand to buy, which baby food jars are safest, and whether produce is organic. But many overlook a critical daily exposure source: <strong>the water used to prepare formula and dilute concentrated baby food</strong>.
          </p>

          <p>
            If your baby drinks 24-32 ounces of formula per day, that's 168-224 ounces of water per week—potentially carrying lead from pipes, fluoride from municipal treatment, PFAS from environmental contamination, or arsenic from natural sources. Over six months, that's <strong>over 200 liters of water</strong> passing through your baby's developing system.
          </p>

          <p>
            This comprehensive guide will help you understand water quality concerns specific to infants, evaluate your home water source, choose the right filtration system, and follow safe preparation practices that minimize contamination risks.
          </p>
        </div>

        {/* Contaminants of Concern Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Beaker className="w-8 h-8 text-red-600" />
            Water Contaminants of Concern for Infants
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Even "safe" municipal water may contain contaminants at levels problematic for babies due to their small size, developing organs, and proportionally higher water consumption.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Primary Water Contaminants & Infant Health Impacts
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4 bg-red-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Lead (Most Critical)</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Source:</strong> Old pipes, solder, fixtures in homes built before 1986 (especially pre-1950s)<br/>
                    <strong>Health impact:</strong> Severe neurological damage, IQ reduction, developmental delays—no safe level for infants<br/>
                    <strong>Prevalence:</strong> Estimated 5-10% of U.S. homes have elevated lead in drinking water
                  </p>
                  <p className="text-red-700 text-xs font-semibold">
                    Priority #1 for testing and filtration
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Fluoride (Dental Fluorosis Risk)</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Source:</strong> Municipal water fluoridation (added intentionally for dental health)<br/>
                    <strong>Health concern:</strong> Infant formula mixed with fluoridated water can cause dental fluorosis (white spots/staining on teeth). AAP recommends limiting fluoride for babies under 6 months<br/>
                    <strong>Prevalence:</strong> ~73% of U.S. public water systems add fluoride
                  </p>
                  <p className="text-orange-700 text-xs font-semibold">
                    Discuss with pediatrician; consider low-fluoride water for formula
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">PFAS (Forever Chemicals)</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Source:</strong> Industrial contamination, firefighting foam, non-stick cookware manufacturing<br/>
                    <strong>Health impact:</strong> Immune system suppression, hormone disruption, developmental effects—persist in body indefinitely<br/>
                    <strong>Prevalence:</strong> Detected in 45% of U.S. tap water samples (2025 research)
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Arsenic (Well Water Primary Concern)</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Source:</strong> Natural geological deposits, agricultural runoff<br/>
                    <strong>Health impact:</strong> Neurological damage, cancer risk, developmental impacts<br/>
                    <strong>Prevalence:</strong> 2.1 million Americans have arsenic levels above EPA limits in well water
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Nitrates</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Source:</strong> Agricultural fertilizer runoff, septic systems<br/>
                    <strong>Health impact:</strong> "Blue baby syndrome" (methemoglobinemia)—reduces oxygen-carrying capacity of blood<br/>
                    <strong>Risk group:</strong> Infants under 6 months most vulnerable
                  </p>
                </div>

                <div className="border-l-4 border-gray-500 pl-4 bg-gray-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Copper</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Source:</strong> Copper pipes, especially in soft/acidic water<br/>
                    <strong>Health impact:</strong> Gastrointestinal distress, liver damage at high levels<br/>
                    <strong>Note:</strong> Less common concern than lead, but worth testing
                  </p>
                </div>

                <div className="border-l-4 border-teal-500 pl-4 bg-teal-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Microplastics</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Source:</strong> Plastic pollution breakdown, water treatment systems<br/>
                    <strong>Health impact:</strong> Still being researched; potential hormone disruption, inflammatory responses<br/>
                    <strong>Prevalence:</strong> Found in 83% of global tap water samples
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testing Your Water Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Home className="w-8 h-8 text-purple-600" />
            Step 1: Test Your Home Water
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Before choosing a filtration system, know what contaminants are actually present in YOUR water. Municipal and well water vary dramatically.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                How to Test Your Water
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Option 1: Free/Low-Cost Municipal Testing</h4>
                  <div className="text-blue-800 text-sm space-y-2">
                    <p><strong>Who:</strong> Homes on municipal/city water</p>
                    <p><strong>How:</strong> Request Consumer Confidence Report (CCR) from local water utility—shows average contaminant levels for your area</p>
                    <p><strong>Cost:</strong> Free (required annual report)</p>
                    <p><strong>Limitation:</strong> Shows water AT the treatment plant, not at your tap. Lead and copper leach from home plumbing.</p>
                    <p className="pt-2"><strong>Next step:</strong> Contact local health department for free/low-cost at-home testing kit for lead, especially if home built before 1986</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Option 2: Comprehensive Home Test Kit</h4>
                  <div className="text-green-800 text-sm space-y-2">
                    <p><strong>Who:</strong> Anyone wanting detailed contaminant analysis of tap water</p>
                    <p><strong>Brands:</strong> SimpleLab Tap Score ($200-$300), MyTapScore, National Testing Labs</p>
                    <p><strong>Tests for:</strong> Lead, copper, arsenic, nitrates, PFAS, fluoride, heavy metals, bacteria</p>
                    <p><strong>How:</strong> Mail-order kit; collect water samples, send to lab, receive detailed report</p>
                    <p><strong>Best for:</strong> Homes with babies, old plumbing, well water, or known contamination issues</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Option 3: Well Water Testing (Essential)</h4>
                  <div className="text-purple-800 text-sm space-y-2">
                    <p><strong>Who:</strong> Private well owners (not connected to municipal water)</p>
                    <p><strong>How:</strong> Contact local health department or state-certified laboratory</p>
                    <p><strong>Frequency:</strong> Test annually minimum; test immediately when preparing for baby</p>
                    <p><strong>Priority tests:</strong> Lead, arsenic, nitrates, bacteria, fluoride</p>
                    <p><strong>Note:</strong> Well water is NOT regulated by EPA—owner responsible for testing and treatment</p>
                  </div>
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
                    High-Risk Homes: Test Immediately If...
                  </h3>
                  <div className="space-y-1 text-amber-800 text-sm">
                    <p>• Home built before 1986 (especially pre-1950s)—high lead risk from pipes/solder</p>
                    <p>• You have a private well</p>
                    <p>• You live in agricultural area (nitrate contamination from fertilizer runoff)</p>
                    <p>• You live near industrial sites, airports, or military bases (PFAS contamination)</p>
                    <p>• Water has metallic taste, discoloration, or unusual odor</p>
                    <p>• You're in area with known contamination issues (check local news, EPA databases)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Filtration Systems Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Filter className="w-8 h-8 text-green-600" />
            Step 2: Choose the Right Filtration System
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Not all filters remove the same contaminants. Here's an evidence-based comparison of filtration methods for infant formula preparation.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Filtration System Comparison
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-2">🏆 BEST: Reverse Osmosis (RO) Systems</h4>
                  <div className="text-green-800 text-sm space-y-2 mb-3">
                    <p><strong>Removes:</strong> Lead, arsenic, fluoride, PFAS, nitrates, heavy metals, microplastics, bacteria—99%+ removal for most contaminants</p>
                    <p><strong>How it works:</strong> Forces water through semi-permeable membrane that blocks contaminants</p>
                    <p><strong>Cost:</strong> $200-$600 for under-sink system + $50-100/year filter replacement</p>
                    <p><strong>Pros:</strong> Most comprehensive filtration; ideal for formula preparation; long-lasting</p>
                    <p><strong>Cons:</strong> Higher upfront cost; wastes 3-5 gallons per gallon filtered; removes beneficial minerals (can be remineralized)</p>
                  </div>
                  <p className="text-green-900 font-semibold text-sm">
                    ✓ Recommendation: Best choice for homes with babies, especially with lead/arsenic/PFAS concerns
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900 mb-2">GOOD: Activated Carbon Filters (Pitcher/Faucet)</h4>
                  <div className="text-blue-800 text-sm space-y-2 mb-3">
                    <p><strong>Removes:</strong> Chlorine, taste/odor, some PFAS, some lead (if certified for lead removal)</p>
                    <p><strong>Does NOT remove:</strong> Fluoride, nitrates, arsenic, most heavy metals</p>
                    <p><strong>Examples:</strong> Brita, PUR, ZeroWater (ZeroWater removes more than Brita/PUR)</p>
                    <p><strong>Cost:</strong> $20-50 pitcher + $5-15/month filter replacement</p>
                    <p><strong>Pros:</strong> Affordable, easy to use, improves taste</p>
                    <p><strong>Cons:</strong> Limited contaminant removal; filters need frequent replacement; slow filtration</p>
                  </div>
                  <p className="text-blue-900 font-semibold text-sm">
                    ✓ Recommendation: Acceptable for municipal water without lead/arsenic issues; upgrade to RO if possible
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-900 mb-2">SPECIALIZED: Distilled Water</h4>
                  <div className="text-purple-800 text-sm space-y-2 mb-3">
                    <p><strong>Removes:</strong> Nearly all minerals and contaminants (boiled and condensed)</p>
                    <p><strong>How to get:</strong> Buy bottled distilled water or home distiller unit</p>
                    <p><strong>Cost:</strong> $1-2 per gallon bottled; $100-300 for home distiller</p>
                    <p><strong>Pros:</strong> Very pure water; removes everything including heavy metals</p>
                    <p><strong>Cons:</strong> Removes beneficial minerals; flat taste; bottled water creates plastic waste</p>
                  </div>
                  <p className="text-purple-900 font-semibold text-sm">
                    ✓ Recommendation: Good temporary solution; safe for formula but lacks minerals (formula provides those)
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-900 mb-2">LIMITED: UV Filters</h4>
                  <div className="text-yellow-800 text-sm space-y-2 mb-3">
                    <p><strong>Removes:</strong> Bacteria, viruses, pathogens</p>
                    <p><strong>Does NOT remove:</strong> Heavy metals, chemicals, PFAS, fluoride</p>
                    <p><strong>Cost:</strong> $100-300</p>
                    <p><strong>Best for:</strong> Well water with bacterial contamination</p>
                  </div>
                  <p className="text-yellow-900 font-semibold text-sm">
                    ✓ Recommendation: Use in combination with other filtration; not sufficient alone for infant formula
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-900 mb-2">❌ NOT SUFFICIENT: Boiling Alone</h4>
                  <div className="text-red-800 text-sm space-y-2 mb-3">
                    <p><strong>Removes:</strong> Bacteria, viruses</p>
                    <p><strong>Does NOT remove:</strong> Heavy metals, chemicals, fluoride—actually CONCENTRATES them as water evaporates</p>
                    <p><strong>Important:</strong> Boiling kills bacteria but does not make contaminated water safe from chemicals/metals</p>
                  </div>
                  <p className="text-red-900 font-semibold text-sm">
                    ⚠ Warning: Do not rely on boiling alone for contaminated water—use proper filtration first
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bottled Water Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Bottled Water: When & What to Use
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Bottled water can be convenient for travel or as a temporary solution, but not all bottled water is appropriate for infant formula.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Bottled Water Guidelines for Formula
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">✓ Safe Bottled Water Choices:</h4>
                  <div className="space-y-2 text-green-800 text-sm">
                    <p><strong>• Distilled water</strong> (labeled "distilled")—purest option</p>
                    <p><strong>• Purified water</strong> (labeled "purified" or "reverse osmosis")—processed to remove contaminants</p>
                    <p><strong>• Low-mineral spring water</strong>—check label for sodium &lt;200 mg/L and sulfate &lt;250 mg/L</p>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">✗ Avoid These for Formula:</h4>
                  <div className="space-y-2 text-red-800 text-sm">
                    <p><strong>• Mineral water / Sparkling water</strong>—too high in minerals, carbonation inappropriate</p>
                    <p><strong>• Alkaline water</strong>—altered pH may interfere with formula</p>
                    <p><strong>• Flavored water</strong>—added ingredients inappropriate for infants</p>
                    <p><strong>• "Nursery water" with added fluoride</strong>—increases fluorosis risk if using fluoridated tap water too</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <p className="font-semibold text-amber-900 mb-2">Environmental & Cost Considerations:</p>
                <p className="text-amber-800 text-sm">
                  Bottled water generates significant plastic waste and costs $1-3 per gallon vs. pennies for filtered tap water. A reverse osmosis system pays for itself within 3-6 months compared to buying bottled water for all formula preparation.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Safe Preparation Practices Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            Safe Water Preparation Practices
          </h2>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Best Practices for Formula & Food Preparation
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Use Cold Water Only, Then Heat</h4>
                    <p className="text-gray-700 text-sm">
                      Hot tap water leaches more lead from pipes. Always use cold filtered water, then heat to appropriate temperature (lukewarm/room temp ~100°F for formula).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Flush Pipes Before Use</h4>
                    <p className="text-gray-700 text-sm">
                      If water has been sitting in pipes overnight or for several hours, run cold tap for 30-60 seconds before collecting for formula. This flushes out stagnant water with higher lead levels.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Maintain Filtration Systems</h4>
                    <p className="text-gray-700 text-sm">
                      Change filters on schedule (carbon every 2-3 months; RO every 6-12 months). Old filters lose effectiveness and can harbor bacteria.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Temperature Matters for Dissolving</h4>
                    <p className="text-gray-700 text-sm">
                      Formula powder dissolves best at lukewarm temperature (~100°F / 37.8°C). Too cold = clumpy; too hot = destroys nutrients and creates hot spots.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Sterilization for Newborns</h4>
                    <p className="text-gray-700 text-sm">
                      For infants under 3 months, immunocompromised, or premature babies: Boil filtered water for 1 minute, then cool to room temperature before mixing formula. This kills any bacteria in water or formula powder.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Clean Equipment Thoroughly</h4>
                    <p className="text-gray-700 text-sm">
                      Wash bottles, nipples, pitchers with hot soapy water or dishwasher after every use. Sanitize once daily for infants under 3 months.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Special Situations Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Special Situations & FAQs
          </h2>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Should I be concerned about fluoride in formula water?
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  The American Academy of Pediatrics notes that infants consuming formula mixed with fluoridated water may be at increased risk for dental fluorosis (cosmetic white spots on teeth). If your tap water is fluoridated AND you're using powdered formula regularly:
                </p>
                <div className="text-gray-700 text-sm space-y-1 ml-4">
                  <p>• <strong>Option 1:</strong> Use low-fluoride bottled water or RO filtered water (removes fluoride)</p>
                  <p>• <strong>Option 2:</strong> Alternate between fluoridated tap and low-fluoride water</p>
                  <p>• <strong>Option 3:</strong> Discuss with pediatrician about fluoride supplementation needs</p>
                </div>
                <p className="text-gray-600 text-xs mt-2 italic">
                  Note: Ready-to-feed formula already contains appropriate fluoride levels
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is it safe to use well water for baby formula?
                </h3>
                <p className="text-gray-700 text-sm">
                  Well water can be safe IF tested regularly and properly treated. Test annually for lead, arsenic, nitrates, bacteria, and fluoride. Install appropriate filtration (typically RO system for comprehensive protection). Boil water for first 3 months of baby's life even if filtered. Retest immediately if there's flooding, nearby construction, or changes in taste/smell.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I use my refrigerator water dispenser for formula?
                </h3>
                <p className="text-gray-700 text-sm">
                  Refrigerator filters are typically activated carbon—they improve taste but don't remove lead, fluoride, or most heavy metals. If your tap water is clean (tested), fridge filters are convenient. If there are contamination concerns, upgrade to under-sink RO system instead.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What about water for making homemade baby food?
                </h3>
                <p className="text-gray-700 text-sm">
                  Use the same filtered water you'd use for formula. Steaming vegetables or cooking grains in contaminated water introduces those contaminants into the food. Filtered water for cooking is just as important as for drinking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do I know if my RO system is working properly?
                </h3>
                <p className="text-gray-700 text-sm">
                  Test filtered water annually with home test kit or lab analysis. Check TDS (total dissolved solids) meter—RO water should read 0-50 ppm (tap water typically 150-400 ppm). Replace filters on schedule. If water flow slows significantly, filters likely need replacement.
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
                  <strong>Water quality is a critical but often overlooked factor in infant safety—potentially as important as formula brand or baby food selection.</strong>
                </p>
                <div className="bg-green-100 rounded-lg p-4 space-y-2">
                  <p><strong>✓ Test your water:</strong> Especially if home built before 1986, you have well water, or live in high-risk area</p>
                  <p><strong>✓ Invest in reverse osmosis:</strong> Gold standard for removing lead, arsenic, PFAS, fluoride, and heavy metals</p>
                  <p><strong>✓ Use cold water only:</strong> Hot tap leaches more lead from pipes</p>
                  <p><strong>✓ Flush pipes before use:</strong> 30-60 seconds if water has sat overnight</p>
                  <p><strong>✓ Maintain filtration systems:</strong> Change filters on schedule—old filters lose effectiveness</p>
                  <p><strong>✓ Consider fluoride levels:</strong> Discuss with pediatrician if using fluoridated water for formula</p>
                </div>
                <p className="pt-3">
                  A $300-500 investment in a reverse osmosis system provides years of safe, contaminant-free water for formula preparation, homemade baby food, and drinking—paying for itself quickly compared to bottled water while dramatically reducing infant exposure to heavy metals and chemicals.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Articles Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/making-your-own-baby-food-safer" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Safety Tips</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Making Your Own Baby Food: Is It Safer?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Water quality matters just as much for homemade baby food preparation as formula.
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
                    Understand how water contamination fits into the broader contamination pathway.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/power-of-variety-rotation-reduces-risk" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Safety Tips</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Power of Variety: Rotation Reduces Risk 50-80%
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Combining safe water with dietary rotation provides maximum protection.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/transitioning-to-table-foods-toddlers" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Safety Tips</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Transitioning to Table Foods: Safer Options
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Use filtered water when preparing table foods and whole food meals for toddlers.
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
              Check Heavy Metals in Your Baby's Food
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Now that you've secured safe water, ensure the formula and baby food products you're mixing with it are low in heavy metals too.
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
            <p>1. American Academy of Pediatrics - Fluoride and formula preparation guidelines</p>
            <p>2. EPA Safe Drinking Water Act - Contaminant limits and testing requirements</p>
            <p>3. CDC Water Quality Guidelines - Lead, arsenic, nitrates in drinking water</p>
            <p>4. Multiple filtration system efficacy studies (2023-2025)</p>
            <p>5. Consumer Reports Water Quality Testing (2025) - PFAS prevalence in tap water</p>
            <p>6. National Testing Labs - Home water testing standards and protocols</p>
          </div>
        </section>
      </article>
    </>
  )
}
