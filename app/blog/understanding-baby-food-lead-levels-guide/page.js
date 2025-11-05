// Blog post: Understanding Baby Food Lead Levels: A Parent's Guide
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { SEO, generateArticleSchema, generateFAQSchema } from '@/components/SEO';

export const metadata = SEO({
  title: 'Understanding Baby Food Lead Levels: A Parent\'s Guide to Test Results',
  description: 'Learn what lead levels mean in baby food, what\'s considered safe, how to read lab reports, and what actions to take. Complete guide for parents with real test data examples.',
  canonical: '/blog/understanding-baby-food-lead-levels-guide',
  ogType: 'article',
  article: {
    publishedTime: '2025-01-05T10:00:00Z',
    modifiedTime: '2025-01-05T10:00:00Z',
    authors: ['SafeBaby'],
    tags: ['lead poisoning', 'heavy metals', 'baby food safety', 'lab testing', 'parenting guide'],
  },
});

const articleSchema = generateArticleSchema({
  title: 'Understanding Baby Food Lead Levels: A Parent\'s Guide',
  description: 'Everything parents need to know about lead in baby food, including safe levels and how to interpret test results.',
  url: '/blog/understanding-baby-food-lead-levels-guide',
  publishedDate: '2025-01-05T10:00:00Z',
  modifiedDate: '2025-01-05T10:00:00Z',
});

const faqSchema = generateFAQSchema([
  {
    question: 'What is a safe level of lead in baby food?',
    answer: 'There is no truly "safe" level of lead, but the FDA and expert organizations recommend levels below 1 ppb (parts per billion) in baby food. Products testing below 0.5 ppb are considered excellent.',
  },
  {
    question: 'How much lead exposure is dangerous for babies?',
    answer: 'Any detectable lead can have impacts, but the risk increases significantly above 5 micrograms per deciliter in blood tests. Regular consumption of foods with 5+ ppb lead can elevate blood lead levels into concerning ranges.',
  },
  {
    question: 'Should I stop feeding my baby all commercial baby food?',
    answer: 'No. Many commercial baby foods test very low for lead (under 1 ppb). The key is choosing tested products with low levels and rotating foods. Some commercial options are actually cleaner than homemade in areas with contaminated water or soil.',
  },
]);

export default function LeadLevelsGuidePost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-white/20 text-white border-white/30">Heavy Metals</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Lead Safety</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Understanding Baby Food Lead Levels: A Parent's Guide
          </h1>
          <div className="flex items-center gap-6 text-primary-100">
            <div className="flex items-center gap-2">
              <Icons.calendar className="w-4 h-4" />
              <span>January 5, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Icons.clock className="w-4 h-4" />
              <span>12 min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 prose prose-lg max-w-none">
          <p className="lead text-xl text-gray-700 mb-6">
            When you see "Lead: 2.3 ppb" on a test result, what does that actually mean for your baby? This comprehensive guide translates the numbers into practical actions you can take today.
          </p>

          <Card className="my-6 bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icons.alert className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Why Lead Matters Most</h3>
                  <p className="text-red-800 text-sm">
                    Of all heavy metals in baby food, lead is the most concerning because there's no safe level and it directly impacts brain development, even at very low concentrations. Understanding lead levels is your most important tool for protecting your baby.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding the Units: What is "ppb"?</h2>
          <p className="text-gray-700 mb-4">
            Lead levels in food are measured in <strong>ppb</strong> (parts per billion). To understand how tiny this is:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>1 ppb = 1 microgram per kilogram of food</li>
            <li>1 ppb = 1 grain of sand in an Olympic swimming pool</li>
            <li>Even these tiny amounts matter because babies eat so much relative to their body weight</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Lead Level Scale: What the Numbers Mean</h2>

          <Card className="my-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="text-2xl font-bold text-green-600">{'< 0.5'}</div>
                    <div className="text-xs text-gray-600">ppb</div>
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Excellent - Preferred Choice</p>
                    <p className="text-sm text-gray-700">Best available options. Use these products regularly without concern.</p>
                    <p className="text-xs text-gray-600 mt-1">Example: Many Happy Baby products, Beech-Nut pears</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="text-2xl font-bold text-blue-600">0.5 - 1.0</div>
                    <div className="text-xs text-gray-600">ppb</div>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Very Good - Safe for Regular Use</p>
                    <p className="text-sm text-gray-700">Acceptable for daily consumption. Most quality brands aim for this range.</p>
                    <p className="text-xs text-gray-600 mt-1">Example: Many Gerber products, Earth's Best organics</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="text-2xl font-bold text-yellow-600">1.0 - 3.0</div>
                    <div className="text-xs text-gray-600">ppb</div>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-900">Moderate - Use Occasionally</p>
                    <p className="text-sm text-gray-700">Not ideal for daily use. Rotate with lower-level options. Still better than many alternatives.</p>
                    <p className="text-xs text-gray-600 mt-1">Example: Some sweet potato products, certain grain blends</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="text-2xl font-bold text-orange-600">3.0 - 5.0</div>
                    <div className="text-xs text-gray-600">ppb</div>
                  </div>
                  <div>
                    <p className="font-semibold text-orange-900">Poor - Minimize Use</p>
                    <p className="text-sm text-gray-700">Use sparingly. Look for alternatives. If you must use, combine with high-iron foods.</p>
                    <p className="text-xs text-gray-600 mt-1">Example: Some carrot products, rice-based snacks</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="text-2xl font-bold text-red-600">{'>'}5.0</div>
                    <div className="text-xs text-gray-600">ppb</div>
                  </div>
                  <div>
                    <p className="font-semibold text-red-900">High - Avoid</p>
                    <p className="text-sm text-gray-700">Choose different products. Regular consumption at this level can raise blood lead.</p>
                    <p className="text-xs text-gray-600 mt-1">Example: Some rice cereals, certain juice products</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Much Lead Exposure is Dangerous?</h2>
          <p className="text-gray-700 mb-4">
            Let's put this in perspective with real calculations:
          </p>

          <Card className="my-6 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Real-World Example: 9-Month-Old Baby</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-blue-900"><strong>Scenario 1: Low Lead Diet</strong></p>
                  <ul className="list-disc pl-6 text-blue-800 mt-1">
                    <li>3 servings/day of products averaging 0.5 ppb lead</li>
                    <li>Daily lead intake: ~4 micrograms</li>
                    <li>Result: Blood lead stays below 2 μg/dL (excellent)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-blue-900"><strong>Scenario 2: High Lead Diet</strong></p>
                  <ul className="list-disc pl-6 text-blue-800 mt-1">
                    <li>3 servings/day of products averaging 5 ppb lead</li>
                    <li>Daily lead intake: ~40 micrograms</li>
                    <li>Result: Blood lead likely exceeds 5 μg/dL (concerning)</li>
                  </ul>
                </div>
              </div>
              <p className="text-blue-900 mt-4 font-semibold">
                The difference: Choosing products under 1 ppb keeps exposure 10x lower!
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Read Lab Test Reports</h2>
          <p className="text-gray-700 mb-4">
            When you look at a product's lab results on SafeBaby, here's what to focus on:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Look at All Four Heavy Metals</h3>
          <p className="text-gray-700 mb-4">
            Don't just check lead. A complete safety picture includes:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Lead:</strong> Target {'<'} 1 ppb</li>
            <li><strong>Arsenic:</strong> Target {'<'} 10 ppb (3 ppb for inorganic arsenic)</li>
            <li><strong>Cadmium:</strong> Target {'<'} 5 ppb</li>
            <li><strong>Mercury:</strong> Target {'<'} 1 ppb</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Check the Test Date</h3>
          <p className="text-gray-700 mb-4">
            Formulations change. Tests from 2020 may not reflect current products. Look for results from the last 12-24 months.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Understand "Non-Detect" vs "Below Limit"</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>"ND" or "Non-Detect":</strong> Lead present but below detection limit (usually {'<'} 0.1 ppb) - Excellent!</li>
            <li><strong>"Below Limit":</strong> Lead detected but below safety threshold - Still good</li>
            <li><strong>Specific number:</strong> Actual measured level - Use the scale above</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Some "Healthy" Foods Have Higher Lead</h2>
          <p className="text-gray-700 mb-4">
            It's frustrating when nutritious foods test high for lead. Here's why it happens:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Root Vegetables (Carrots, Sweet Potatoes)</h4>
                <p className="text-sm text-gray-700">Absorb lead from soil through their roots. Sweet potatoes especially accumulate cadmium and lead.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Leafy Greens</h4>
                <p className="text-sm text-gray-700">Large surface area means more contact with contaminated soil and water during growth.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Rice Products</h4>
                <p className="text-sm text-gray-700">Rice plants naturally absorb arsenic and lead from water more than other grains.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Fruit Juices</h4>
                <p className="text-sm text-gray-700">Concentration process increases heavy metal content. Plus lead can leach from processing equipment.</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What About Cumulative Exposure?</h2>
          <p className="text-gray-700 mb-4">
            This is where it gets tricky. A single serving of a 3 ppb product won't harm your baby. But:
          </p>

          <Card className="my-6 bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">The Accumulation Effect</h3>
              <div className="space-y-2 text-sm text-yellow-800">
                <p><strong>Scenario:</strong> Baby eats the same 3 ppb lead product 3x daily for 6 months</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Daily exposure: ~25 micrograms lead</li>
                  <li>6-month total: ~4,500 micrograms</li>
                  <li>Result: Likely blood lead elevation above 3 μg/dL</li>
                </ul>
                <p className="mt-3 font-semibold">Solution: Rotate products! Using 5 different products with similar levels reduces cumulative exposure by preventing buildup from any single source.</p>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4 my-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Q: Should I get my baby's blood lead level tested?</h3>
                <p className="text-gray-700 text-sm">
                  <strong>A:</strong> The AAP recommends testing at 12 and 24 months, or earlier if you have specific concerns. If your baby has primarily consumed high-lead products (3+ ppb regularly), discuss testing with your pediatrician at 9 months.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Q: What if my baby has been eating high-lead products for months?</h3>
                <p className="text-gray-700 text-sm">
                  <strong>A:</strong> Don't panic. Switch to lower-lead options now. The body eliminates lead over time, and the brain is remarkably resilient, especially with early intervention. Focus on: 1) Switching to products {'<'} 1 ppb, 2) Ensuring adequate iron and calcium intake, 3) Getting a blood test if concerned.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Q: Are expensive organic brands safer for lead?</h3>
                <p className="text-gray-700 text-sm">
                  <strong>A:</strong> Not necessarily. Price and organic certification don't correlate with heavy metal levels. Some budget brands test excellent while some premium organic brands test poorly. Always check actual test results, not marketing claims.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Q: Can I reduce lead by washing or cooking food differently?</h3>
                <p className="text-gray-700 text-sm">
                  <strong>A:</strong> Partially. Peeling root vegetables removes some lead (it concentrates in skin). Rinsing rice thoroughly helps. But lead absorbed into the plant tissue can't be removed by washing. The best strategy is choosing low-lead foods from the start.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Action Plan</h2>

          <Card className="my-6 bg-green-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-green-900 mb-4">This Week's Action Steps:</h3>
              <ol className="list-decimal pl-6 space-y-2 text-green-800">
                <li>Check lead levels for the 5 products you use most often</li>
                <li>Replace any products {'>'} 3 ppb with alternatives {'<'} 1 ppb</li>
                <li>If you regularly use 1-3 ppb products, rotate with lower options</li>
                <li>Add high-iron foods to daily meals (blocks lead absorption)</li>
                <li>Set a calendar reminder to recheck products every 3 months</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="my-8 bg-primary-50 border-primary-200">
            <CardContent className="p-8 text-center">
              <Icons.search className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Check Your Products Now</h3>
              <p className="text-gray-600 mb-6">
                Search for specific products to see lead levels and other heavy metal test results.
              </p>
              <Link
                href="/search"
                className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Search Product Database
              </Link>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Bottom Line</h2>
          <p className="text-gray-700 mb-4">
            Understanding lead levels doesn't have to be overwhelming. Remember these key points:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Aim for products under 1 ppb lead when possible</li>
            <li>Products 1-3 ppb are acceptable if rotated, not used daily</li>
            <li>Avoid products over 5 ppb - there are better alternatives</li>
            <li>Rotation and variety are your best protection</li>
            <li>Even imperfect choices are better than stress - progress, not perfection</li>
          </ul>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Disclaimer</h3>
            <p className="text-sm text-gray-600">
              This article provides educational information about lead in baby food. It is not medical advice. If you have concerns about lead exposure or your child's development, consult your pediatrician. Blood lead testing and medical guidance should come from qualified healthcare providers.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="border-t border-gray-200 p-8 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/how-to-avoid-heavy-metals-in-baby-food">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">How to Avoid Heavy Metals</h4>
                  <p className="text-sm text-gray-600">Practical strategies to reduce exposure</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/safest-baby-food-brands-2025">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Safest Brands in 2025</h4>
                  <p className="text-sm text-gray-600">Which brands consistently test lowest</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
