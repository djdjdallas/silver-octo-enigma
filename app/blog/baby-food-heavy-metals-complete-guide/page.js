import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export const metadata = {
  title: 'Heavy Metals in Baby Food: Complete 2025 Guide for Parents | SafeBaby',
  description: 'Everything parents need to know about heavy metals in baby food. Learn about lead, arsenic, cadmium & mercury levels, FDA limits, safest brands & how to protect your baby.',
  keywords: [
    'baby food heavy metals',
    'heavy metals in baby food',
    'baby food arsenic',
    'baby food lead',
    'baby food cadmium',
    'baby food mercury',
    'safest baby food brands',
    'FDA baby food limits'
  ],
  openGraph: {
    title: 'Heavy Metals in Baby Food: Complete 2025 Guide for Parents',
    description: 'Everything parents need to know about heavy metals in baby food, FDA limits, safest brands & how to protect your baby.',
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://safebaby.com'}/blog/baby-food-heavy-metals-complete-guide`,
    siteName: 'SafeBaby',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Heavy Metals in Baby Food Guide',
      },
    ],
  },
};

export default function HeavyMetalsGuidePage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <header className="mb-12 text-center">
          <div className="inline-block bg-coral text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            COMPLETE 2025 GUIDE
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Heavy Metals in Baby Food: The Complete Guide for Parents
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            94% of baby food contains detectable heavy metals. Here&apos;s what you need to know to protect your baby.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Link href="/scan">
              <Button size="lg" className="bg-coral hover:bg-coral-600 text-white rounded-full">
                Check Your Baby Food Now
              </Button>
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            Last Updated: January 2025 | Reading Time: 18 minutes
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="bg-primary-50 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
          <ol className="space-y-2 text-gray-700">
            <li><a href="#what-are" className="hover:text-primary font-medium">1. What Are Heavy Metals in Baby Food?</a></li>
            <li><a href="#health-impacts" className="hover:text-primary font-medium">2. Health Impacts on Your Baby</a></li>
            <li><a href="#fda-regulations" className="hover:text-primary font-medium">3. Current FDA Regulations & Limits</a></li>
            <li><a href="#highest-metals" className="hover:text-primary font-medium">4. Which Foods Have Highest Heavy Metals?</a></li>
            <li><a href="#safest-brands" className="hover:text-primary font-medium">5. Safest Baby Food Brands 2025</a></li>
            <li><a href="#reduce-exposure" className="hover:text-primary font-medium">6. How to Reduce Your Baby&apos;s Exposure</a></li>
            <li><a href="#check-baby-food" className="hover:text-primary font-medium">7. How to Check Baby Food for Heavy Metals</a></li>
            <li><a href="#faqs" className="hover:text-primary font-medium">8. Frequently Asked Questions</a></li>
          </ol>
        </nav>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            As a parent, you want to give your baby the best possible start in life. But a concerning reality has emerged: <strong>94% of baby food products contain detectable levels of heavy metals</strong>, including lead, arsenic, cadmium, and mercury.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            This comprehensive guide covers everything you need to know about heavy metals in baby food, from understanding the science to choosing the safest products for your little one. Whether you&apos;re just starting solids or looking to make safer choices, this guide will empower you with the knowledge to protect your baby&apos;s developing brain.
          </p>
          <div className="bg-butter-50 border-l-4 border-butter p-6 rounded-lg mb-8">
            <h3 className="font-bold text-lg mb-2">Key Takeaway</h3>
            <p className="text-gray-700">
              While most baby foods contain some level of heavy metals, significant differences exist between brands and products. By making informed choices, you can dramatically reduce your baby&apos;s exposure.
            </p>
          </div>
        </section>

        {/* Section 1: What Are Heavy Metals? */}
        <section id="what-are" className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What Are Heavy Metals in Baby Food?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Heavy metals are naturally occurring elements found in the earth&apos;s crust. The four heavy metals of most concern in baby food are:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lead</h3>
              <p className="text-gray-700">
                A neurotoxin that can cause permanent brain damage even at low levels. No safe level has been identified for children.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Arsenic</h3>
              <p className="text-gray-700">
                Particularly high in rice-based products. Associated with reduced IQ, learning difficulties, and developmental delays.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cadmium</h3>
              <p className="text-gray-700">
                Found in root vegetables and leafy greens. Linked to kidney damage and bone weakness over time.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mercury</h3>
              <p className="text-gray-700">
                Most commonly found in fish products. Can damage the nervous system and impair cognitive development.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">How Do Heavy Metals Get Into Baby Food?</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Heavy metals enter baby food through multiple pathways:
          </p>
          <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 mb-6">
            <li><strong>Soil contamination:</strong> Decades of industrial pollution, pesticide use, and lead paint have contaminated agricultural soil</li>
            <li><strong>Water sources:</strong> Irrigation water may contain elevated heavy metal levels from industrial runoff</li>
            <li><strong>Plant uptake:</strong> Root vegetables like carrots and sweet potatoes naturally absorb more heavy metals from soil</li>
            <li><strong>Food processing:</strong> Manufacturing equipment and processes can introduce additional contamination</li>
          </ul>

          <div className="bg-lavender-50 p-6 rounded-2xl">
            <h4 className="font-bold text-lg mb-2">Why Baby Food Has Higher Levels</h4>
            <p className="text-gray-700">
              Baby food often has higher heavy metal concentrations than adult food because it&apos;s made from vegetables and fruits that naturally absorb more metals (like carrots, sweet potatoes, and rice), and the pureed form concentrates these metals.
            </p>
          </div>
        </section>

        {/* Section 2: Health Impacts */}
        <section id="health-impacts" className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Health Impacts on Your Baby
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Heavy metal exposure during infancy and early childhood is particularly dangerous because babies&apos; brains and bodies are rapidly developing. Even low-level exposure can have lasting effects.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Neurological Development Effects</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Research shows that exposure to heavy metals in baby food can:
          </p>
          <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 mb-6">
            <li><strong>Reduce IQ scores:</strong> Studies indicate 3-5 IQ point reductions per standard increase in lead exposure</li>
            <li><strong>Impair memory and learning:</strong> Heavy metals interfere with synaptic development and neural connections</li>
            <li><strong>Affect attention and behavior:</strong> Linked to increased rates of ADHD and behavioral problems</li>
            <li><strong>Delay developmental milestones:</strong> Speech, motor skills, and social development may be impacted</li>
          </ul>

          <div className="bg-coral-50 border-l-4 border-coral p-6 rounded-lg mb-8">
            <h4 className="font-bold text-lg mb-2 text-coral-900">Critical Development Window</h4>
            <p className="text-gray-700">
              The period from birth to 24 months is the most critical for brain development. During this time, babies are most vulnerable to neurotoxic effects of heavy metals, and damage may be permanent.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Long-Term Health Risks</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Beyond immediate developmental concerns, heavy metal exposure in infancy has been associated with:
          </p>
          <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 mb-6">
            <li>Increased cancer risk later in life (particularly arsenic exposure)</li>
            <li>Cardiovascular problems in adulthood</li>
            <li>Kidney and liver dysfunction</li>
            <li>Weakened immune system response</li>
            <li>Reproductive health issues</li>
          </ul>
        </section>

        {/* Section 3: FDA Regulations */}
        <section id="fda-regulations" className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Current FDA Regulations & Limits (2025)
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            For decades, the FDA had no enforceable limits for heavy metals in baby food. This changed in 2024-2025 with new guidance, but significant gaps remain.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">FDA Action Levels for Lead (2025)</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            In January 2025, the FDA established the first enforceable limits for lead in baby food:
          </p>
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2">
                  <th className="pb-3 font-bold text-gray-900">Product Type</th>
                  <th className="pb-3 font-bold text-gray-900">Lead Limit (ppb)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="py-3">Baby food fruits & vegetables</td>
                  <td className="py-3 font-semibold">10 ppb</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Baby food root vegetables</td>
                  <td className="py-3 font-semibold">20 ppb</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Baby food cereals (dry)</td>
                  <td className="py-3 font-semibold">20 ppb</td>
                </tr>
                <tr>
                  <td className="py-3">Baby food meat/poultry</td>
                  <td className="py-3 font-semibold">10 ppb</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-butter-50 border-l-4 border-butter p-6 rounded-lg mb-8">
            <h4 className="font-bold text-lg mb-2">Important Note</h4>
            <p className="text-gray-700 mb-2">
              The FDA currently has <strong>NO limits</strong> for arsenic, cadmium, or mercury in most baby food products. This is a major regulatory gap that leaves babies vulnerable.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">California AB 899 Law (Effective January 2025)</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            California has taken a stronger stance with AB 899, requiring:
          </p>
          <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 mb-6">
            <li>Mandatory testing for lead, arsenic, cadmium, and mercury in all baby food sold in California</li>
            <li>QR codes on product labels linking to test results</li>
            <li>Stricter limits than federal FDA standards</li>
            <li>Regular testing and public disclosure requirements</li>
          </ul>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            This makes California the first state to require comprehensive heavy metal disclosure for baby food.
          </p>
        </section>

        {/* Section 4: Which Foods Have Highest Metals */}
        <section id="highest-metals" className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Which Foods Have Highest Heavy Metals?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Not all baby foods are created equal. Certain product categories consistently show higher heavy metal levels.
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-coral-50 border-l-4 border-coral p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🍚 Rice Products (Arsenic Concern)</h3>
              <p className="text-gray-700 mb-3">
                <strong>Risk Level: HIGHEST</strong>
              </p>
              <p className="text-gray-700 mb-3">
                Rice naturally absorbs 10 times more arsenic from soil and water than other grains. Baby rice cereals consistently show the highest arsenic levels of any baby food category.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Rice cereal (especially white rice)</li>
                <li>Rice puffs and snacks</li>
                <li>Rice-based teething biscuits</li>
              </ul>
              <p className="mt-3 font-semibold text-gray-900">
                Average arsenic levels: 85-120 ppb (some products exceed 200 ppb)
              </p>
            </div>

            <div className="bg-butter-50 border-l-4 border-butter p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🥕 Root Vegetables (Lead & Cadmium)</h3>
              <p className="text-gray-700 mb-3">
                <strong>Risk Level: HIGH</strong>
              </p>
              <p className="text-gray-700 mb-3">
                Root vegetables grow underground and absorb heavy metals directly from contaminated soil.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Sweet potatoes</li>
                <li>Carrots</li>
                <li>Beets</li>
              </ul>
              <p className="mt-3 font-semibold text-gray-900">
                Average lead levels: 5-15 ppb | Cadmium: 3-8 ppb
              </p>
            </div>

            <div className="bg-lavender-50 border-l-4 border-lavender p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🍎 Fruit Juice (Arsenic & Lead)</h3>
              <p className="text-gray-700 mb-3">
                <strong>Risk Level: MODERATE-HIGH</strong>
              </p>
              <p className="text-gray-700 mb-3">
                Concentrated fruit juices, particularly apple and grape juice, can contain concerning levels of arsenic and lead.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Apple juice</li>
                <li>Grape juice</li>
                <li>Mixed fruit juices</li>
              </ul>
              <p className="mt-3 font-semibold text-gray-900">
                Pediatricians recommend avoiding juice entirely for babies under 12 months
              </p>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🍪 Teething Biscuits (Multiple Metals)</h3>
              <p className="text-gray-700 mb-3">
                <strong>Risk Level: MODERATE</strong>
              </p>
              <p className="text-gray-700 mb-3">
                Teething biscuits often contain rice flour and are consumed in large quantities, making total exposure significant.
              </p>
              <p className="mt-3 font-semibold text-gray-900">
                Average combined heavy metal scores: 60-85/100 (lower is worse)
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Safest Brands */}
        <section id="safest-brands" className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Safest Baby Food Brands 2025
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Based on independent laboratory testing from Consumer Reports, the Congressional investigation, and Clean Label Project, here are the brands with consistently lower heavy metal levels:
          </p>

          <div className="bg-primary-50 p-8 rounded-3xl mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Top 5 Safest Brands</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Once Upon a Farm</h4>
                  <p className="text-gray-700">Cold-pressed, never heated. Consistently lowest heavy metal levels across product lines. Average safety score: 95/100</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Serenity Kids</h4>
                  <p className="text-gray-700">Meat and veggie pouches with minimal root vegetables. Focus on protein reduces heavy metal exposure. Average score: 92/100</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Little Spoon</h4>
                  <p className="text-gray-700">Fresh, subscription-based baby food. Regular testing and transparency about sourcing. Average score: 90/100</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</span>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Cerebelly</h4>
                  <p className="text-gray-700">Brain development focused with rigorous testing standards. Average score: 88/100</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">5</span>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Yumi</h4>
                  <p className="text-gray-700">Organic produce from verified farms. Strong sourcing standards. Average score: 87/100</p>
                </div>
              </li>
            </ol>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Brands to Approach With Caution</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            These popular brands have shown higher heavy metal levels in independent testing:
          </p>
          <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700 mb-6">
            <li><strong>Gerber:</strong> Some products exceeded FDA lead limits. Rice cereal particularly concerning. (Average score: 65/100)</li>
            <li><strong>Beech-Nut:</strong> Congressional investigation found high arsenic in multiple products. (Average score: 62/100)</li>
            <li><strong>Happy Baby (Happy Family Organics):</strong> Despite organic label, testing showed 64x FDA lead limits in some products. (Average score: 58/100)</li>
            <li><strong>Parent&apos;s Choice (Walmart brand):</strong> High levels across multiple product categories. (Average score: 55/100)</li>
          </ul>

          <div className="bg-coral-50 border-l-4 border-coral p-6 rounded-lg mb-8">
            <h4 className="font-bold text-lg mb-2">Why Organic ≠ Safe</h4>
            <p className="text-gray-700">
              A common misconception is that organic baby food has lower heavy metal levels. Testing shows this isn&apos;t true - organic certification addresses pesticides, not heavy metals. In fact, some organic brands like Happy Baby have shown higher contamination than conventional brands.
            </p>
          </div>

          <div className="text-center mt-8">
            <Link href="/search">
              <Button size="lg" className="bg-coral hover:bg-coral-600 text-white rounded-full px-8">
                Compare All Brands in Our Database
              </Button>
            </Link>
          </div>
        </section>

        {/* Section 6: Reduce Exposure */}
        <section id="reduce-exposure" className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How to Reduce Your Baby&apos;s Exposure
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            While you can&apos;t eliminate heavy metals entirely, these 10 strategies can significantly reduce your baby&apos;s exposure:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">1</span>
                <h3 className="text-xl font-bold text-gray-900">Avoid Rice-Based Products</h3>
              </div>
              <p className="text-gray-700 pl-11">
                Skip rice cereal entirely. Choose oat, barley, or quinoa cereals instead. Avoid rice puffs, rice crackers, and rice-based snacks.
              </p>
            </div>

            <div className="bg-white border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">2</span>
                <h3 className="text-xl font-bold text-gray-900">Rotate Food Varieties</h3>
              </div>
              <p className="text-gray-700 pl-11">
                Don&apos;t feed the same food every day. Rotation reduces cumulative exposure to any single contamination source.
              </p>
            </div>

            <div className="bg-white border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">3</span>
                <h3 className="text-xl font-bold text-gray-900">Limit Root Vegetables</h3>
              </div>
              <p className="text-gray-700 pl-11">
                Sweet potatoes and carrots are nutritious but high in heavy metals. Offer in moderation and balance with lower-risk foods.
              </p>
            </div>

            <div className="bg-white border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">4</span>
                <h3 className="text-xl font-bold text-gray-900">Choose Brands That Test</h3>
              </div>
              <p className="text-gray-700 pl-11">
                Look for brands that conduct third-party testing and publish results. Use SafeBaby to find tested products.
              </p>
            </div>

            <div className="bg-white border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">5</span>
                <h3 className="text-xl font-bold text-gray-900">Skip Fruit Juice</h3>
              </div>
              <p className="text-gray-700 pl-11">
                The American Academy of Pediatrics recommends no juice for babies under 12 months. Offer whole fruits instead.
              </p>
            </div>

            <div className="bg-white border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">6</span>
                <h3 className="text-xl font-bold text-gray-900">Include Protein Foods</h3>
              </div>
              <p className="text-gray-700 pl-11">
                Meat, poultry, eggs, and beans generally have lower heavy metal levels than plant-based foods.
              </p>
            </div>

            <div className="bg-white border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">7</span>
                <h3 className="text-xl font-bold text-gray-900">Wash and Peel Produce</h3>
              </div>
              <p className="text-gray-700 pl-11">
                When making homemade baby food, always wash thoroughly and peel root vegetables to remove surface contamination.
              </p>
            </div>

            <div className="bg-white border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">8</span>
                <h3 className="text-xl font-bold text-gray-900">Test Your Water</h3>
              </div>
              <p className="text-gray-700 pl-11">
                Use filtered water for mixing formula and making baby food. Test your tap water for lead if you live in an older home.
              </p>
            </div>

            <div className="bg-white border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">9</span>
                <h3 className="text-xl font-bold text-gray-900">Check AB 899 QR Codes</h3>
              </div>
              <p className="text-gray-700 pl-11">
                Products sold in California now have QR codes linking to test results. Scan before buying.
              </p>
            </div>

            <div className="bg-white border-2 border-primary-200 rounded-2xl p-6">
              <div className="flex items-start mb-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">10</span>
                <h3 className="text-xl font-bold text-gray-900">Use SafeBaby Scanner</h3>
              </div>
              <p className="text-gray-700 pl-11">
                Scan products while shopping to get instant heavy metal safety ratings based on independent lab testing.
              </p>
            </div>
          </div>

          <div className="bg-butter-50 border-l-4 border-butter p-6 rounded-lg mb-8">
            <h4 className="font-bold text-lg mb-2">Homemade vs. Store-Bought</h4>
            <p className="text-gray-700 mb-3">
              A 2022 study showed homemade baby food can have similar or even higher heavy metal levels than store-bought, depending on ingredients. The key is choosing low-risk ingredients and varying your baby&apos;s diet, whether making food at home or buying it.
            </p>
          </div>
        </section>

        {/* Section 7: How to Check */}
        <section id="check-baby-food" className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How to Check Baby Food for Heavy Metals
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Several tools are now available to help parents make informed decisions:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-primary-50 border-2 border-primary rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. SafeBaby Scanner (Recommended)</h3>
              <p className="text-gray-700 mb-4">
                Our free scanner gives you instant access to safety ratings based on independent lab testing. Simply scan a product&apos;s barcode or search by name.
              </p>
              <div className="flex gap-4">
                <Link href="/scan">
                  <Button className="bg-coral hover:bg-coral-600 text-white rounded-full">
                    <Icons.scan className="w-5 h-5 mr-2" />
                    Scan a Product Now
                  </Button>
                </Link>
                <Link href="/search">
                  <Button variant="outline" className="rounded-full border-2">
                    Browse Database
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. California AB 899 QR Codes</h3>
              <p className="text-gray-700 mb-3">
                Products sold in California must display QR codes linking to heavy metal test results. This applies to products manufactured after January 1, 2025.
              </p>
              <p className="text-gray-700">
                <strong>How to use:</strong> Look for the QR code on product packaging and scan with your phone camera to view test results.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Consumer Reports Database</h3>
              <p className="text-gray-700 mb-3">
                Consumer Reports has tested hundreds of baby food products and publishes detailed results for subscribers.
              </p>
              <p className="text-gray-700">
                <strong>Cost:</strong> Requires Consumer Reports subscription ($10/month)
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Clean Label Project Certification</h3>
              <p className="text-gray-700 mb-3">
                Some brands display Clean Label Project certification, indicating they&apos;ve met certain purity standards.
              </p>
              <p className="text-gray-700">
                <strong>Note:</strong> Certification standards vary and may not catch all contamination. Use as one factor among many.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: FAQs */}
        <section id="faqs" className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="bg-primary-50 rounded-2xl p-6 group cursor-pointer">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What baby food brands test for heavy metals?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Brands that publicly commit to testing include Once Upon a Farm, Serenity Kids, Little Spoon, Cerebelly, and Yumi. However, testing frequency and transparency vary. The safest approach is to use independent testing data from Consumer Reports or SafeBaby rather than relying on brand claims.
              </p>
            </details>

            <details className="bg-primary-50 rounded-2xl p-6 group cursor-pointer">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How much arsenic is in baby rice cereal?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Testing shows baby rice cereals contain 85-120 ppb of inorganic arsenic on average, with some products exceeding 200 ppb. For comparison, the FDA guidance level (not an enforceable limit) is 100 ppb. Many pediatricians now recommend avoiding rice cereal entirely and choosing oat, barley, or quinoa cereals instead.
              </p>
            </details>

            <details className="bg-primary-50 rounded-2xl p-6 group cursor-pointer">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Does organic baby food have less lead?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                No. Independent testing shows organic baby food has similar (and sometimes higher) heavy metal levels compared to conventional products. Organic certification addresses pesticides and farming practices, not heavy metals in soil. In fact, the 2021 Congressional report found Happy Baby (organic) had some of the highest contamination levels tested.
              </p>
            </details>

            <details className="bg-primary-50 rounded-2xl p-6 group cursor-pointer">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Are baby puffs safe from heavy metals?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                It depends on the ingredients. Rice-based puffs (like Gerber Graduates Puffs) have shown concerning arsenic levels. Puffs made from other grains like corn or wheat tend to have lower heavy metal levels. Check ingredients and use SafeBaby to scan specific products before purchasing.
              </p>
            </details>

            <details className="bg-primary-50 rounded-2xl p-6 group cursor-pointer">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What is the safest first food for babies?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                From a heavy metals perspective, the safest first foods are: pureed meats (chicken, turkey, beef), mashed avocado, mashed banana, pureed peas, and oatmeal cereal (not rice). These foods naturally have lower heavy metal content than root vegetables and rice products.
              </p>
            </details>

            <details className="bg-primary-50 rounded-2xl p-6 group cursor-pointer">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Should I stop using Gerber baby food?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Not necessarily all Gerber products, but be selective. Some Gerber products have tested well, while others (particularly rice cereal and sweet potato products) have shown concerning levels. Use SafeBaby to check specific Gerber products you&apos;re considering. Consider rotating between multiple brands rather than relying solely on Gerber.
              </p>
            </details>

            <details className="bg-primary-50 rounded-2xl p-6 group cursor-pointer">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Is homemade baby food safer than store-bought?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Not automatically. A 2022 study found homemade baby food had similar heavy metal levels to store-bought when using the same ingredients. The key is choosing low-risk ingredients (avoiding rice, limiting root vegetables) regardless of whether you buy or make. Homemade can be safer IF you carefully select ingredients and source produce from less contaminated areas.
              </p>
            </details>

            <details className="bg-primary-50 rounded-2xl p-6 group cursor-pointer">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can heavy metals be removed from baby food?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Unfortunately, no. Heavy metals are absorbed into the plant tissue and cannot be washed off or removed through cooking. The only way to reduce exposure is to choose products with lower contamination levels from the start. This is why ingredient selection and brand testing are so important.
              </p>
            </details>

            <details className="bg-primary-50 rounded-2xl p-6 group cursor-pointer">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What are the symptoms of heavy metal poisoning in babies?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Chronic low-level exposure typically doesn&apos;t cause obvious symptoms but affects development over time. Symptoms of higher exposure can include: developmental delays, speech delays, learning difficulties, irritability, loss of appetite, fatigue, and behavioral changes. If you&apos;re concerned about exposure, talk to your pediatrician about blood testing for lead levels.
              </p>
            </details>

            <details className="bg-primary-50 rounded-2xl p-6 group cursor-pointer">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How often should I check baby food for heavy metals?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Check new products before first purchase. For products you buy regularly, re-check every 3-6 months as brands reformulate or change suppliers. Set up SafeBaby alerts to be notified of testing updates for your favorite products. Also check when switching from one batch/lot to another, as contamination can vary.
              </p>
            </details>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            The Bottom Line
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            While the presence of heavy metals in baby food is concerning, you&apos;re not powerless. By making informed choices—avoiding high-risk foods like rice cereal, rotating varieties, choosing brands that test rigorously, and using tools like SafeBaby—you can significantly reduce your baby&apos;s exposure.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The key is not to panic but to be proactive. Every safer choice you make matters for your baby&apos;s developing brain and long-term health.
          </p>
          <div className="bg-coral-50 border-l-4 border-coral p-8 rounded-lg mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <Icons.checkmark className="w-6 h-6 text-coral mr-3 flex-shrink-0 mt-1" />
                <span>Scan your current baby food products with SafeBaby to check their safety ratings</span>
              </li>
              <li className="flex items-start">
                <Icons.checkmark className="w-6 h-6 text-coral mr-3 flex-shrink-0 mt-1" />
                <span>Replace any high-risk products (rice cereals, certain root vegetable purees) with safer alternatives</span>
              </li>
              <li className="flex items-start">
                <Icons.checkmark className="w-6 h-6 text-coral mr-3 flex-shrink-0 mt-1" />
                <span>Create a rotation plan so your baby isn&apos;t eating the same foods every day</span>
              </li>
              <li className="flex items-start">
                <Icons.checkmark className="w-6 h-6 text-coral mr-3 flex-shrink-0 mt-1" />
                <span>Share this guide with other parents who may not be aware of the heavy metals issue</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary-50 to-coral-50 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Check Your Baby Food Now
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Use SafeBaby to scan products in your pantry or while shopping. Get instant safety ratings based on independent lab testing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scan">
              <Button size="lg" className="bg-coral hover:bg-coral-600 text-white rounded-full px-8">
                <Icons.scan className="w-5 h-5 mr-2" />
                Scan a Product
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="rounded-full border-2 border-primary">
                Browse Database
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <section className="mt-12 pt-12 border-t-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/safest-baby-food-brands-2025" className="group">
              <div className="bg-primary-50 rounded-2xl p-6 hover:bg-primary-100 transition-colors">
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary">
                  Safest Baby Food Brands 2025
                </h3>
                <p className="text-gray-700 text-sm">
                  Complete brand-by-brand comparison of heavy metal levels
                </p>
              </div>
            </Link>
            <Link href="/blog/understanding-baby-food-lead-levels-guide" className="group">
              <div className="bg-primary-50 rounded-2xl p-6 hover:bg-primary-100 transition-colors">
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary">
                  Understanding Baby Food Lead Levels
                </h3>
                <p className="text-gray-700 text-sm">
                  What the new FDA limits mean for your baby
                </p>
              </div>
            </Link>
            <Link href="/blog/how-to-avoid-heavy-metals-in-baby-food" className="group">
              <div className="bg-primary-50 rounded-2xl p-6 hover:bg-primary-100 transition-colors">
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary">
                  How to Avoid Heavy Metals
                </h3>
                <p className="text-gray-700 text-sm">
                  Practical shopping tips and meal planning strategies
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t-2 text-center text-sm text-gray-600">
          <p className="mb-2">
            <strong>Medical Disclaimer:</strong> This article is for informational purposes only and does not constitute medical advice. Always consult your pediatrician about your baby&apos;s nutrition and health concerns.
          </p>
          <p>
            <strong>Sources:</strong> Consumer Reports Heavy Metals Testing (2024-2025), U.S. House Committee Oversight Report (2021), FDA Heavy Metals Guidance (2025), California AB 899, Clean Label Project Testing Data
          </p>
        </footer>
      </div>
    </article>
  );
}
