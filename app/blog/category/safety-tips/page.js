// Blog category: Safety Tips
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { SEO } from '@/components/SEO';

export const metadata = SEO({
  title: 'Baby Food Safety Tips - SafeBaby Expert Advice',
  description: 'Practical tips and strategies to minimize heavy metal exposure and feed your baby the safest foods possible. Expert advice for parents.',
  canonical: '/blog/category/safety-tips',
  ogType: 'website',
});

export default function SafetyTipsCategory() {
  const tips = [
    {
      title: 'How to Avoid Heavy Metals in Baby Food: 10 Proven Strategies',
      description: 'Evidence-based tips to reduce your baby\'s heavy metal exposure by up to 80% through smart food choices and variety.',
      href: '/blog/how-to-avoid-heavy-metals-in-baby-food',
      category: 'Safety Tips',
      readTime: '6 min',
      date: 'January 14, 2025',
      featured: true,
    },
    {
      title: 'The Power of Variety: Why Rotation Reduces Risk',
      description: 'How rotating foods and brands can dramatically lower cumulative heavy metal exposure over time.',
      href: '#',
      category: 'Safety Tips',
      readTime: '5 min',
      date: 'January 11, 2025',
    },
    {
      title: 'Making Your Own Baby Food: Is It Safer?',
      description: 'The pros and cons of homemade baby food for heavy metal safety, plus best practices for preparation.',
      href: '#',
      category: 'Safety Tips',
      readTime: '8 min',
      date: 'January 7, 2025',
    },
    {
      title: 'Shopping Smart: How to Choose Safe Products at the Store',
      description: 'Quick decision-making strategies for selecting the safest baby food when shopping in-store or online.',
      href: '#',
      category: 'Safety Tips',
      readTime: '6 min',
      date: 'January 4, 2025',
    },
    {
      title: 'Transitioning to Table Foods: Safer Options for Toddlers',
      description: 'When and how to move beyond baby food, with guidance on choosing low-contamination whole foods.',
      href: '#',
      category: 'Safety Tips',
      readTime: '7 min',
      date: 'December 31, 2024',
    },
    {
      title: 'Water Matters: Choosing the Right Water for Formula and Food',
      description: 'How water quality affects heavy metal exposure and which water sources are safest for baby food preparation.',
      href: '#',
      category: 'Safety Tips',
      readTime: '5 min',
      date: 'December 27, 2024',
    },
  ];

  const featuredTip = tips.find(t => t.featured);
  const otherTips = tips.filter(t => !t.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Icons.lightbulb className="w-8 h-8" />
            <Badge className="bg-white/20 text-white border-white/30">Safety Tips</Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Safety Tips
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Practical, evidence-based strategies to minimize heavy metal exposure and make safer feeding choices for your baby every day.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Card */}
        <Card className="mb-8 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Icons.checkCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">You're Making a Difference</h3>
                <p className="text-green-800 text-sm">
                  By following even a few of these safety tips, you can reduce your baby's heavy metal exposure by 50-80%. Small changes add up to significant protection for your child's developing brain.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Article */}
        {featuredTip && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Icons.star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Featured Guide</h2>
            </div>
            <Link href={featuredTip.href}>
              <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-primary-200">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-primary-100 text-primary-700">{featuredTip.category}</Badge>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-primary-600 transition-colors">
                    {featuredTip.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {featuredTip.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Icons.calendar className="w-4 h-4" />
                      <span>{featuredTip.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.clock className="w-4 h-4" />
                      <span>{featuredTip.readTime} read</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}

        {/* Quick Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Safety Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Rotate Your Brands</h3>
                    <p className="text-sm text-gray-600">
                      Don't stick to one brand. Rotating reduces exposure to any single source of contamination.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Limit Rice Products</h3>
                    <p className="text-sm text-gray-600">
                      Rice naturally absorbs more arsenic. Choose oatmeal or multigrain cereals instead.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Check Before Buying</h3>
                    <p className="text-sm text-gray-600">
                      Use SafeBaby's scanner or database to verify safety ratings before purchasing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Variety is Key</h3>
                    <p className="text-sm text-gray-600">
                      Mix different fruits, vegetables, and proteins to dilute exposure from any single food.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Choose High-Scoring Brands</h3>
                    <p className="text-sm text-gray-600">
                      Brands like Happy Baby and Beech-Nut consistently score higher in safety tests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Start Table Foods Early</h3>
                    <p className="text-sm text-gray-600">
                      When age-appropriate, introduce whole foods which often have lower contamination.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* All Safety Tips */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Safety Tips Articles</h2>
          <div className="space-y-8">
            {otherTips.map((tip, index) => (
              <Link key={index} href={tip.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="outline">{tip.category}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                          {tip.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {tip.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Icons.calendar className="w-4 h-4" />
                            <span>{tip.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icons.clock className="w-4 h-4" />
                            <span>{tip.readTime} read</span>
                          </div>
                        </div>
                      </div>
                      <Icons.chevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-primary-50 border-primary-200">
          <CardContent className="p-8 text-center">
            <Icons.smartphone className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Scan Products While Shopping</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Use SafeBaby's barcode scanner to check safety ratings instantly while shopping. Make safer choices in seconds.
            </p>
            <Link
              href="/scan"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Barcode Scanner
            </Link>
          </CardContent>
        </Card>

        {/* Browse Other Categories */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Browse Other Categories</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/blog/category/product-guides">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Product Guides</h4>
                  <p className="text-sm text-gray-600">Expert guides to choosing safe products</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/category/brand-reviews">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Brand Reviews</h4>
                  <p className="text-sm text-gray-600">In-depth analysis of baby food brands</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/category/heavy-metals">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Heavy Metals</h4>
                  <p className="text-sm text-gray-600">Understanding heavy metal contamination</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
