// Blog category: Product Guides
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { SEO } from '@/components/SEO';

export const metadata = SEO({
  title: 'Product Guides - SafeBaby Baby Food Safety',
  description: 'Expert guides to help you choose the safest baby food products. Compare brands, understand testing results, and make informed decisions for your baby.',
  canonical: '/blog/category/product-guides',
  ogType: 'website',
});

export default function ProductGuidesCategory() {
  const guides = [
    {
      title: 'Safest Baby Food Brands in 2025',
      description: 'Comprehensive analysis of the safest baby food brands based on independent lab testing for heavy metals.',
      href: '/blog/safest-baby-food-brands-2025',
      category: 'Brand Reviews',
      readTime: '8 min',
      date: 'January 15, 2025',
      featured: true,
    },
    {
      title: 'Best Organic Baby Food: Safety Beyond the Label',
      description: 'Not all organic baby food is created equal. Learn which organic brands actually test safer for heavy metals.',
      href: '#',
      category: 'Product Guides',
      readTime: '6 min',
      date: 'January 10, 2025',
    },
    {
      title: 'Rice vs. Oatmeal Baby Cereal: Which is Safer?',
      description: 'A detailed comparison of arsenic levels in rice and oatmeal cereals, plus our top recommendations.',
      href: '#',
      category: 'Product Guides',
      readTime: '5 min',
      date: 'January 5, 2025',
    },
    {
      title: 'Complete Guide to Baby Food Pouches Safety',
      description: 'Everything you need to know about heavy metals in baby food pouches and which brands score highest.',
      href: '#',
      category: 'Product Guides',
      readTime: '7 min',
      date: 'December 28, 2024',
    },
  ];

  const featuredGuide = guides.find(g => g.featured);
  const otherGuides = guides.filter(g => !g.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Icons.book className="w-8 h-8" />
            <Badge className="bg-white/20 text-white border-white/30">Product Guides</Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Product Guides
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Expert reviews and comprehensive guides to help you choose the safest baby food products for your little one.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Featured Article */}
        {featuredGuide && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Icons.star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Featured Guide</h2>
            </div>
            <Link href={featuredGuide.href}>
              <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-primary-200">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-primary-100 text-primary-700">{featuredGuide.category}</Badge>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-primary-600 transition-colors">
                    {featuredGuide.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {featuredGuide.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Icons.calendar className="w-4 h-4" />
                      <span>{featuredGuide.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.clock className="w-4 h-4" />
                      <span>{featuredGuide.readTime} read</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}

        {/* All Guides */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Product Guides</h2>
          <div className="space-y-8">
            {otherGuides.map((guide, index) => (
              <Link key={index} href={guide.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="outline">{guide.category}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {guide.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Icons.calendar className="w-4 h-4" />
                            <span>{guide.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icons.clock className="w-4 h-4" />
                            <span>{guide.readTime} read</span>
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
            <Icons.shield className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Check Products Before You Buy</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Use our comprehensive database to check safety ratings and heavy metal test results for thousands of baby food products.
            </p>
            <Link
              href="/search"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse Product Database
            </Link>
          </CardContent>
        </Card>

        {/* Browse Other Categories */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Browse Other Categories</h3>
          <div className="grid md:grid-cols-3 gap-4">
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
