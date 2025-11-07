// Blog category: Heavy Metals
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { SEO } from '@/components/SEO';

export const metadata = SEO({
  title: 'Heavy Metals in Baby Food - SafeBaby Safety Guide',
  description: 'Learn about heavy metal contamination in baby food including arsenic, lead, cadmium, and mercury. Understand the risks and how to protect your baby.',
  canonical: '/blog/category/heavy-metals',
  ogType: 'website',
});

export default function HeavyMetalsCategory() {
  const articles = [
    {
      title: 'Baby Food Heavy Metals: Complete Parent Guide 2025',
      description: 'Everything you need to know about heavy metals in baby food - from testing methods to FDA limits and how to minimize exposure.',
      href: '/blog/baby-food-heavy-metals-complete-guide',
      category: 'Heavy Metals',
      readTime: '12 min',
      date: 'January 15, 2025',
      featured: true,
    },
    {
      title: 'Understanding Baby Food Lead Levels: A Parent\'s Guide',
      description: 'What do lead test results really mean? Learn how to interpret ppb levels and make safe choices.',
      href: '/blog/understanding-baby-food-lead-levels-guide',
      category: 'Heavy Metals',
      readTime: '7 min',
      date: 'January 13, 2025',
    },
    {
      title: 'Arsenic in Baby Food Rice: The Complete Guide',
      description: 'Why rice-based baby foods have higher arsenic levels and which alternatives are safest for your baby.',
      href: '#',
      category: 'Heavy Metals',
      readTime: '8 min',
      date: 'January 10, 2025',
    },
    {
      title: 'Cadmium in Baby Food: Hidden Dangers in Sweet Potatoes',
      description: 'Which vegetables absorb the most cadmium from soil and how to choose safer options.',
      href: '#',
      category: 'Heavy Metals',
      readTime: '6 min',
      date: 'January 6, 2025',
    },
    {
      title: 'Mercury in Baby Food: What Parents Should Know',
      description: 'Understanding mercury contamination in fish-based baby foods and safe feeding guidelines.',
      href: '#',
      category: 'Heavy Metals',
      readTime: '5 min',
      date: 'January 2, 2025',
    },
    {
      title: 'How Baby Food Gets Contaminated: From Soil to Shelf',
      description: 'The science behind heavy metal contamination and why some foods are more affected than others.',
      href: '#',
      category: 'Heavy Metals',
      readTime: '9 min',
      date: 'December 28, 2024',
    },
  ];

  const featuredArticle = articles.find(a => a.featured);
  const otherArticles = articles.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Icons.alert className="w-8 h-8" />
            <Badge className="bg-white/20 text-white border-white/30">Heavy Metals</Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Heavy Metals in Baby Food
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Understand heavy metal contamination in baby food, the health risks, and evidence-based strategies to protect your child.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Warning Card */}
        <Card className="mb-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Icons.alert className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Important Context</h3>
                <p className="text-yellow-800 text-sm mb-2">
                  While heavy metals in baby food are a real concern, they're present in all foods due to environmental contamination. The goal is to minimize exposure, not achieve zero exposure (which is impossible).
                </p>
                <p className="text-yellow-800 text-sm">
                  Making informed choices can reduce your baby's exposure by 50-80%, significantly lowering long-term health risks.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Icons.star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Featured Guide</h2>
            </div>
            <Link href={featuredArticle.href}>
              <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-primary-200">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-primary-100 text-primary-700">{featuredArticle.category}</Badge>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-primary-600 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {featuredArticle.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Icons.calendar className="w-4 h-4" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.clock className="w-4 h-4" />
                      <span>{featuredArticle.readTime} read</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}

        {/* Quick Facts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts About Heavy Metals</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Icons.shield className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">The Big Four</h3>
                    <p className="text-sm text-gray-600">
                      Arsenic, lead, cadmium, and mercury are the primary heavy metals of concern in baby food.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Icons.brain className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Developmental Impact</h3>
                    <p className="text-sm text-gray-600">
                      Heavy metals can affect brain development, lowering IQ and causing behavioral issues.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Icons.leaf className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Natural Occurrence</h3>
                    <p className="text-sm text-gray-600">
                      Heavy metals occur naturally in soil and water, making complete elimination impossible.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Icons.checkCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">You Can Make a Difference</h3>
                    <p className="text-sm text-gray-600">
                      Smart product selection and variety can reduce exposure by 50-80% compared to average diets.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Heavy Metals Articles</h2>
          <div className="space-y-8">
            {otherArticles.map((article, index) => (
              <Link key={index} href={article.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="outline">{article.category}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Icons.calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icons.clock className="w-4 h-4" />
                            <span>{article.readTime} read</span>
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
            <Icons.barcode className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Check Heavy Metal Levels</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Use our contamination checker to see detailed heavy metal test results for specific products before you buy.
            </p>
            <Link
              href="/tools/contamination-checker"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Check Product Safety
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
            <Link href="/blog/category/safety-tips">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Safety Tips</h4>
                  <p className="text-sm text-gray-600">Practical advice for safer feeding</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
