import SEO from '@/components/SEO'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  Baby,
  TrendingUp,
  ShieldCheck,
  Utensils,
  CheckCircle,
  Clock,
  Info,
  Heart
} from '@/components/icons'
import Link from 'next/link'

export const metadata = SEO({
  title: 'Transitioning to Table Foods: Safer Options for Toddlers | Complete 2025 Guide',
  description: 'When and how to transition from purees to table foods safely. Age-appropriate finger foods, choking prevention, and lower heavy metal exposure through whole foods.',
  canonical: '/blog/transitioning-to-table-foods-toddlers',
});

// Generate JSON-LD structured data for the article
function generateArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Transitioning to Table Foods: Safer Options for Toddlers',
    description: 'Comprehensive guide to transitioning babies from purees to table foods, including safety guidelines, heavy metal reduction, and age-appropriate progression.',
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

export default function TransitioningToTableFoodsPage() {
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
            <Badge variant="secondary">Table Foods</Badge>
            <Badge variant="secondary">Finger Foods</Badge>
            <Badge variant="secondary">2025 Guidelines</Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Transitioning to Table Foods: Safer Options for Toddlers
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            When and how to move beyond purees—reducing heavy metal exposure while building healthy eating skills.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <time dateTime="2025-01-06">Updated January 6, 2025</time>
            <span>•</span>
            <span>14 min read</span>
          </div>
        </div>

        {/* Key Finding Card */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Heart className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Good News: Table Foods Often Contain Lower Heavy Metal Levels Than Purees
                </h3>
                <p className="text-green-800 mb-3">
                  Research shows that transitioning to appropriately prepared table foods can significantly reduce heavy metal exposure. Whole foods you prepare at home give you maximum control over ingredient selection, while commercial baby food purees concentrate ingredients (and their contaminants) into small jars.
                </p>
                <div className="bg-green-100 rounded-lg p-4 mt-3">
                  <p className="font-semibold text-green-900 mb-2">Critical Window for Introduction:</p>
                  <p className="text-green-800">
                    Updated 2025 research confirms there's an optimal window between 6-9 months for introducing textured foods. Babies who haven't experienced lumpy, chewable foods by 9 months have increased risk of feeding problems and picky eating later—making the transition even harder.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-8">
          <p>
            For months, you've been carefully selecting the safest baby food brands, rotating products, and scanning QR codes for heavy metal levels. But there's a point when <strong>the best thing you can do for your baby is move beyond jarred purees entirely</strong>.
          </p>

          <p>
            Transitioning to table foods—the same foods your family eats, prepared appropriately—offers multiple benefits: <strong>lower heavy metal exposure, better nutrition, cost savings, and crucial developmental skills</strong>. But the process can feel intimidating. When is the right time? How do you prevent choking? Which foods are safest?
          </p>

          <p>
            This comprehensive guide will walk you through evidence-based strategies for transitioning your baby to table foods safely, while continuing to minimize heavy metal exposure through strategic food selection.
          </p>
        </div>

        {/* When to Transition Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            When to Transition: Developmental Readiness Signs
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              The "right time" varies by child, but research identifies clear developmental readiness signs and an optimal introduction window.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Age-Based Guidelines (2020-2025 Dietary Guidelines)
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900 mb-2">6 Months: Begin Finger Foods Alongside Purees</h4>
                  <p className="text-blue-800 text-sm mb-2">
                    It's safe—and beneficial—to introduce finger foods as soon as baby is developmentally ready for solids (around 6 months). You don't have to wait for a "stages" progression.
                  </p>
                  <div className="text-blue-800 text-sm space-y-1 mt-2">
                    <p><strong>Start with:</strong> Soft, meltable foods like puffs, well-cooked veggie strips, mashed banana pieces</p>
                    <p><strong>Frequency:</strong> Offer at 50-60% of meals to build skills</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-2">8-9 Months: Increase Texture & Chunk Size</h4>
                  <p className="text-green-800 text-sm mb-2">
                    This is the optimal window for introducing lumpy, textured foods. Babies who haven't experienced these textures by 9 months may develop feeding resistance.
                  </p>
                  <div className="text-green-800 text-sm space-y-1 mt-2">
                    <p><strong>Progress to:</strong> Soft cubes, irregular shapes (scrambled eggs, ground meat), crunchy-melt foods (Cheerios)</p>
                    <p><strong>Goal:</strong> Table foods become primary, purees as supplement</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-900 mb-2">12+ Months: Mostly Table Foods</h4>
                  <p className="text-purple-800 text-sm mb-2">
                    By one year, most babies should eat primarily table foods, with commercial baby food used only for convenience or travel.
                  </p>
                  <div className="text-purple-800 text-sm space-y-1 mt-2">
                    <p><strong>Eat family meals:</strong> Same foods as family, just cut smaller and softer</p>
                    <p><strong>Self-feeding mastery:</strong> Pincer grasp developed, using utensils begins</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Readiness Signs (More Important Than Age)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Physical Readiness:</h4>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                      <span>Sits upright with minimal support</span>
                    </p>
                    <p className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                      <span>Can grasp objects and bring to mouth</span>
                    </p>
                    <p className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                      <span>Has lost tongue-thrust reflex</span>
                    </p>
                    <p className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                      <span>Shows interest in family foods</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Motor Skill Readiness:</h4>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                      <span>Rakes objects toward self</span>
                    </p>
                    <p className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                      <span>Chewing motions (even without teeth)</span>
                    </p>
                    <p className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                      <span>Can move food from center to side of mouth</span>
                    </p>
                    <p className="flex gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                      <span>Gags less frequently as learns to manage food</span>
                    </p>
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
                    Don't Wait Too Long: The 9-Month Window
                  </h3>
                  <p className="text-amber-800 mb-3">
                    Research very clearly shows babies who haven't been introduced to lumpy and textured foods by 9 months may have increased risk of:
                  </p>
                  <div className="space-y-1 text-amber-800 text-sm">
                    <p>• Feeding problems and texture aversions</p>
                    <p>• Picky eating behaviors that persist into childhood</p>
                    <p>• Difficulty transitioning away from purees later</p>
                    <p>• Delayed oral motor skill development</p>
                  </div>
                  <p className="text-amber-700 mt-3 font-semibold">
                    Bottom line: Start introducing textured foods by 6-7 months, even if you continue purees alongside. Practice builds skills.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Step-by-Step Progression Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            Step-by-Step Texture Progression
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Successful transition happens gradually through systematic texture progression. Here's the evidence-based sequence.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                4-Stage Texture Progression
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Stage 1: Melt-in-Mouth Foods (6-7 months)</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Texture:</strong> Crunchy but dissolves quickly with saliva
                    </p>
                    <div className="bg-gray-50 rounded p-3 text-sm">
                      <p className="font-semibold text-gray-900 mb-2">Examples:</p>
                      <div className="grid md:grid-cols-2 gap-2 text-gray-700">
                        <p>• Puffs (baby cereal)</p>
                        <p>• Cheese puffs (baked, not fried)</p>
                        <p>• Graham crackers</p>
                        <p>• Mum-Mums rice crackers</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 italic">
                      Why start here: Teaches self-feeding and tongue movements with minimal choking risk
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Stage 2: Soft Cubes & Strips (7-8 months)</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Texture:</strong> Soft enough to mash between fingers, no larger than ½ inch
                    </p>
                    <div className="bg-gray-50 rounded p-3 text-sm">
                      <p className="font-semibold text-gray-900 mb-2">Examples:</p>
                      <div className="grid md:grid-cols-2 gap-2 text-gray-700">
                        <p>• Steamed broccoli florets</p>
                        <p>• Well-cooked carrot sticks</p>
                        <p>• Soft-cooked apple pieces</p>
                        <p>• Banana slices</p>
                        <p>• Avocado cubes</p>
                        <p>• Baked sweet potato wedges</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 italic">
                      Cut to fingertip size; should squish easily but maintain shape
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Stage 3: Irregular Shapes & Ground Meats (8-10 months)</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Texture:</strong> Lumpy, requires chewing, irregular shapes (not smooth cubes)
                    </p>
                    <div className="bg-gray-50 rounded p-3 text-sm">
                      <p className="font-semibold text-gray-900 mb-2">Examples:</p>
                      <div className="grid md:grid-cols-2 gap-2 text-gray-700">
                        <p>• Scrambled eggs</p>
                        <p>• Ground turkey/beef crumbles</p>
                        <p>• Shredded chicken</p>
                        <p>• Pasta (short shapes)</p>
                        <p>• Toast strips with toppings</p>
                        <p>• Cheerios</p>
                        <p>• Beans (mashed or whole)</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 italic">
                      Irregular shapes teach tongue manipulation skills better than uniform cubes
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Stage 4: Mixed Textures & Family Foods (10-12+ months)</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Texture:</strong> Multiple textures in one meal (e.g., soups with chunks, casseroles)
                    </p>
                    <div className="bg-gray-50 rounded p-3 text-sm">
                      <p className="font-semibold text-gray-900 mb-2">Examples:</p>
                      <div className="grid md:grid-cols-2 gap-2 text-gray-700">
                        <p>• Macaroni and cheese</p>
                        <p>• Spaghetti with meat sauce</p>
                        <p>• Chicken noodle soup</p>
                        <p>• Yogurt with granola</p>
                        <p>• Stir-fries (cut small)</p>
                        <p>• Tacos/burritos (deconstructed)</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 italic">
                      Most challenging texture; introduce slowly after mastering previous stages
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Choking Safety Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-red-600" />
            Choking Prevention: Essential Safety Guidelines
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              Choking is the primary concern parents have about table foods. Following evidence-based safety guidelines dramatically reduces risk.
            </p>
          </div>

          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Foods to NEVER Give Babies/Toddlers (High Choking Risk)
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-red-800 text-sm">
                <div className="space-y-1">
                  <p>• <strong>Whole grapes</strong> (must quarter lengthwise)</p>
                  <p>• <strong>Hot dogs</strong> (unless quartered lengthwise)</p>
                  <p>• <strong>Nuts</strong> (whole; nut butters okay if thin)</p>
                  <p>• <strong>Raw vegetables</strong> (carrots, celery—must cook)</p>
                  <p>• <strong>Popcorn</strong> (not until age 4+)</p>
                </div>
                <div className="space-y-1">
                  <p>• <strong>Hard candy</strong></p>
                  <p>• <strong>Chunks of meat/cheese</strong> (shred or cut tiny)</p>
                  <p>• <strong>Whole cherry tomatoes</strong> (quarter)</p>
                  <p>• <strong>Marshmallows</strong></p>
                  <p>• <strong>Globs of nut butter</strong> (spread thin)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Essential Choking Prevention Rules
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Always Supervise Eating</p>
                    <p className="text-gray-700 text-sm">
                      Never leave baby alone while eating, even for a moment. Sit with them, make eye contact, watch for difficulties.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Seated Upright Position</p>
                    <p className="text-gray-700 text-sm">
                      Baby must be fully upright in high chair—never reclined, never eating while crawling/walking.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Size Matters: Fingertip Rule</p>
                    <p className="text-gray-700 text-sm">
                      Pieces should be no larger than ½ inch (about the size of baby's fingertip) and pinchable/mashable between your fingers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Cook to Optimal Softness</p>
                    <p className="text-gray-700 text-sm">
                      Vegetables should be fork-tender; meats should shred easily. Test by mashing between your fingers—if you can mash it, baby can too.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Understand Gagging vs. Choking</p>
                    <p className="text-gray-700 text-sm">
                      <strong>Gagging is normal</strong>—baby coughs, makes noise, face may redden. This is protective reflex. <strong>Choking is silent</strong>—no noise, can't breathe, face turns blue. Know infant CPR.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Lower Heavy Metal Foods Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Utensils className="w-8 h-8 text-green-600" />
            Table Foods with Lower Heavy Metal Exposure
          </h2>

          <div className="prose prose-lg max-w-none mb-6">
            <p>
              One major advantage of table foods: you can emphasize ingredients with naturally low contamination and avoid concentrated high-risk purees.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Safer Table Food Choices by Category
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-3">Proteins (Consistently Low Heavy Metals)</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-green-800 text-sm">
                    <p>• <strong>Eggs</strong> (scrambled, hard-boiled)</p>
                    <p>• <strong>Chicken</strong> (shredded, ground)</p>
                    <p>• <strong>Turkey</strong> (ground, shredded)</p>
                    <p>• <strong>Salmon</strong> (flaked, no bones)</p>
                    <p>• <strong>Beans</strong> (black, pinto, kidney)</p>
                    <p>• <strong>Lentils</strong> (well-cooked)</p>
                    <p>• <strong>Tofu</strong> (cubed, soft or firm)</p>
                    <p>• <strong>Yogurt</strong> (whole milk, plain)</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-3">Vegetables (Lower-Risk Options)</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-green-800 text-sm">
                    <p>• <strong>Green beans</strong> (steamed soft)</p>
                    <p>• <strong>Peas</strong> (mashed or whole if soft)</p>
                    <p>• <strong>Broccoli</strong> (florets, very soft)</p>
                    <p>• <strong>Zucchini</strong> (roasted or steamed)</p>
                    <p>• <strong>Cucumber</strong> (peeled, seeded)</p>
                    <p>• <strong>Bell peppers</strong> (roasted, peeled)</p>
                    <p>• <strong>Butternut squash</strong> (cubed, roasted)</p>
                    <p>• <strong>Avocado</strong> (cubed)</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-3">Fruits (Excellent Choices)</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-green-800 text-sm">
                    <p>• <strong>Banana</strong> (sliced or chunks)</p>
                    <p>• <strong>Blueberries</strong> (quartered for under 12mo)</p>
                    <p>• <strong>Strawberries</strong> (quartered)</p>
                    <p>• <strong>Mango</strong> (cubed)</p>
                    <p>• <strong>Peaches</strong> (soft, sliced)</p>
                    <p>• <strong>Pears</strong> (soft, cubed)</p>
                    <p>• <strong>Watermelon</strong> (cubed, seedless)</p>
                    <p>• <strong>Oranges</strong> (segments, membranes removed)</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-3">Grains (Avoid Rice, Choose Alternatives)</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-green-800 text-sm">
                    <p>• <strong>Oatmeal</strong> (cooked, not instant)</p>
                    <p>• <strong>Whole wheat bread</strong> (toast strips)</p>
                    <p>• <strong>Pasta</strong> (whole wheat, small shapes)</p>
                    <p>• <strong>Quinoa</strong> (well-cooked)</p>
                    <p>• <strong>Barley</strong> (well-cooked)</p>
                    <p>• <strong>Cheerios</strong> (original, not rice-based)</p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-900 mb-3">Limit to 1-2x Per Week (Higher Contamination)</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-yellow-800 text-sm">
                    <p>• <strong>Sweet potatoes</strong> (cubed, roasted)</p>
                    <p>• <strong>Carrots</strong> (cooked very soft)</p>
                    <p>• <strong>Regular potatoes</strong></p>
                    <p>• <strong>Rice/rice products</strong> (minimize entirely)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Practical Implementation Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Baby className="w-8 h-8 text-purple-600" />
            Practical Implementation: Sample Meal Plans
          </h2>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Sample Daily Meal Plan (8-10 Months)
              </h3>
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">Breakfast</h4>
                  <p className="text-orange-800 text-sm">
                    • Scrambled eggs (cut into strips)<br/>
                    • Steamed broccoli florets<br/>
                    • Soft pear slices<br/>
                    • Oatmeal (as supplement if still hungry)
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">Lunch</h4>
                  <p className="text-orange-800 text-sm">
                    • Shredded chicken mixed with mashed avocado<br/>
                    • Steamed green beans (soft)<br/>
                    • Banana slices<br/>
                    • Small pieces of whole wheat toast
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">Dinner</h4>
                  <p className="text-orange-800 text-sm">
                    • Ground turkey crumbles<br/>
                    • Well-cooked pasta (small shapes)<br/>
                    • Roasted zucchini cubes<br/>
                    • Quartered blueberries
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">Snacks</h4>
                  <p className="text-orange-800 text-sm">
                    • Whole milk yogurt<br/>
                    • Mango cubes<br/>
                    • Cheerios<br/>
                    • Soft cheese cubes
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4 italic">
                Note: All foods should be soft enough to mash between fingers. Continue offering variety and rotating ingredients weekly.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Common Challenges Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Overcoming Common Transition Challenges
          </h2>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge: Baby Refuses Table Foods, Only Wants Purees</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Solution:</strong> Mix textures—add small chunks to purees, gradually increase chunk size. Offer finger foods at every meal for practice, even if rejected. Persistence is key—can take 15+ exposures to accept new textures.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge: Baby Gags Frequently</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Solution:</strong> Gagging is normal and protective—don't panic or stop offering foods. Make pieces smaller, cook softer, slow down progression. Gagging decreases with practice as babies learn tongue control.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge: Baby Won't Self-Feed, Waits for Spoon</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Solution:</strong> Offer pre-loaded spoons baby can grab. Place food directly on high chair tray (not bowl). Model self-feeding. Make it fun, not stressful. Some babies take longer to embrace independence.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 rounded-r">
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge: Worried About Nutritional Adequacy</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Solution:</strong> Initial transition is messy and inefficient—that's normal. Continue offering breast milk or formula as primary nutrition source until 12 months. Focus on variety and exposure, not quantity consumed. Most babies self-regulate intake well.
                  </p>
                </div>
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
                  <strong>Transitioning to table foods reduces heavy metal exposure while building critical developmental skills—but timing and safety protocols matter.</strong>
                </p>
                <div className="bg-green-100 rounded-lg p-4 space-y-2">
                  <p><strong>✓ Start early:</strong> Introduce finger foods by 6-7 months; critical window is 6-9 months for textured foods</p>
                  <p><strong>✓ Progress gradually:</strong> Melt-in-mouth → soft cubes → irregular shapes → mixed textures</p>
                  <p><strong>✓ Prioritize safety:</strong> Upright position, appropriate sizing, avoid high-risk foods, always supervise</p>
                  <p><strong>✓ Choose lower-contamination options:</strong> Proteins, above-ground vegetables, fruits; limit root vegetables</p>
                  <p><strong>✓ Avoid rice-based table foods:</strong> Choose oat, barley, quinoa, whole wheat alternatives</p>
                  <p><strong>✓ Be patient with challenges:</strong> Gagging is normal, texture resistance decreases with practice</p>
                </div>
                <p className="pt-3">
                  By 12-15 months, most toddlers should eat primarily table foods alongside family meals. This gives you maximum control over ingredient selection, enforces variety naturally, and significantly reduces reliance on processed baby food products with concentrated contaminants.
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
                    Preparation strategies for table foods and homemade purees that minimize contamination.
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
                    Apply rotation principles to table foods for maximum heavy metal reduction.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog/arsenic-in-baby-food-rice-complete-guide" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">Heavy Metals</Badge>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    Arsenic in Rice: Complete Guide
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Why avoiding rice-based table foods (crackers, puffs, rice cereals) is crucial for toddlers.
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
                    Which brands to keep on hand for backup when table food transition needs supplementation.
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
              Track Your Toddler's Table Food Transition
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Use our database to identify safe table food ingredients and track which whole foods are lowest in heavy metals for your meal planning.
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
            <p>1. Dietary Guidelines for Americans 2020-2025 - Infant and toddler feeding recommendations</p>
            <p>2. Johns Hopkins Medicine - Do's and Don'ts of Transitioning Baby to Solid Foods</p>
            <p>3. Solid Starts (2025) - Evidence-based finger food introduction guidelines</p>
            <p>4. American Academy of Pediatrics - Choking prevention and food safety</p>
            <p>5. Multiple peer-reviewed studies on texture introduction timing (6-9 month window)</p>
            <p>6. Healthy Babies Bright Futures - Lower-contamination table food ingredients</p>
          </div>
        </section>
      </article>
    </>
  )
}
