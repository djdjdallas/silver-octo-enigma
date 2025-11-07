// Blog category: Brand Reviews
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { SEO } from '@/components/SEO';

export const metadata = SEO({
  title: 'Brand Reviews - SafeBaby Baby Food Safety',
  description: 'Independent reviews and safety ratings for all major baby food brands. See which brands score highest for heavy metal safety.',
  canonical: '/blog/category/brand-reviews',
  ogType: 'website',
});

export default function BrandReviewsCategory() {
  const reviews = [
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
      title: 'Gerber Baby Food Review: Is It Safe in 2025?',
      description: 'Complete analysis of Gerber products, heavy metal test results, and which products to choose or avoid.',
      href: '#',
      category: 'Brand Reviews',
      readTime: '7 min',
      date: 'January 12, 2025',
    },
    {
      title: 'Happy Baby Organics: The Gold Standard?',
      description: 'Why Happy Baby consistently scores highest in safety tests and which products lead the category.',
      href: '#',
      category: 'Brand Reviews',
      readTime: '6 min',
      date: 'January 8, 2025',
    },
    {
      title: 'Beech-Nut vs. Earth\'s Best: Which is Safer?',
      description: 'Side-by-side comparison of two popular organic brands and their heavy metal safety records.',
      href: '#',
      category: 'Brand Reviews',
      readTime: '8 min',
      date: 'January 3, 2025',
    },
    {
      title: 'Store Brand Baby Food Safety: What You Need to Know',
      description: 'How do Parent\'s Choice, Walmart, and Target brands compare to name brands for safety?',
      href: '#',
      category: 'Brand Reviews',
      readTime: '6 min',
      date: 'December 30, 2024',
    },
  ];

  const featuredReview = reviews.find(r => r.featured);
  const otherReviews = reviews.filter(r => !r.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Icons.checkCircle className="w-8 h-8" />
            <Badge className="bg-white/20 text-white border-white/30">Brand Reviews</Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Brand Reviews
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Independent safety reviews and heavy metal test results for all major baby food brands. Make informed choices based on real data.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Featured Article */}
        {featuredReview && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Icons.star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Featured Review</h2>
            </div>
            <Link href={featuredReview.href}>
              <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-primary-200">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-primary-100 text-primary-700">{featuredReview.category}</Badge>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-primary-600 transition-colors">
                    {featuredReview.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {featuredReview.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Icons.calendar className="w-4 h-4" />
                      <span>{featuredReview.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icons.clock className="w-4 h-4" />
                      <span>{featuredReview.readTime} read</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}

        {/* Info Card */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Our Review Process</h3>
                <p className="text-blue-800 text-sm">
                  All brand reviews are based on aggregated lab test data from independent laboratories. We analyze hundreds of products per brand to provide accurate safety ratings and recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Reviews */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Brand Reviews</h2>
          <div className="space-y-8">
            {otherReviews.map((review, index) => (
              <Link key={index} href={review.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="outline">{review.category}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                          {review.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {review.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Icons.calendar className="w-4 h-4" />
                            <span>{review.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icons.clock className="w-4 h-4" />
                            <span>{review.readTime} read</span>
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
            <Icons.search className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Search by Brand</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Looking for a specific brand? Search our database to find all products and safety ratings from your preferred brands.
            </p>
            <Link
              href="/search"
              className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Search Products by Brand
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
