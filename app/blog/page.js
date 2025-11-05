// Blog index page with all posts
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { SEO } from '@/components/SEO';

export const metadata = SEO({
  title: 'Baby Food Safety Blog - Tips, Guides & Heavy Metal Information',
  description: 'Expert advice on baby food safety, heavy metal contamination, product reviews, and tips to protect your baby from arsenic, lead, cadmium, and mercury in baby food.',
  canonical: '/blog',
});

const blogPosts = [
  {
    title: 'Safest Baby Food Brands in 2025',
    slug: 'safest-baby-food-brands-2025',
    excerpt: 'Comprehensive analysis of the safest baby food brands based on independent lab testing for heavy metals. Find out which brands consistently score highest for safety.',
    category: 'Brand Reviews',
    categorySlug: 'brand-reviews',
    date: '2025-01-15',
    readTime: '8 min read',
    image: null,
  },
  {
    title: 'How to Avoid Heavy Metals in Baby Food',
    slug: 'how-to-avoid-heavy-metals-in-baby-food',
    excerpt: 'Practical strategies to minimize your baby\'s exposure to arsenic, lead, cadmium, and mercury. Learn which foods to choose and which to avoid.',
    category: 'Heavy Metals',
    categorySlug: 'heavy-metals',
    date: '2025-01-10',
    readTime: '10 min read',
    image: null,
  },
  {
    title: 'Understanding Baby Food Lead Levels: A Parent\'s Guide',
    slug: 'understanding-baby-food-lead-levels-guide',
    excerpt: 'Everything parents need to know about lead in baby food, including safe levels, health impacts, and how to interpret lab test results.',
    category: 'Heavy Metals',
    categorySlug: 'heavy-metals',
    date: '2025-01-05',
    readTime: '12 min read',
    image: null,
  },
];

export default function BlogIndexPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Baby Food Safety Blog
        </h1>
        <p className="text-xl text-gray-600">
          Expert advice, safety tips, and the latest research on baby food heavy metals
        </p>
      </div>

      {/* Featured Post */}
      {blogPosts[0] && (
        <Link href={`/blog/${blogPosts[0].slug}`}>
          <Card className="mb-8 overflow-hidden hover:shadow-lg transition-shadow border-2 border-primary-200">
            <CardContent className="p-0">
              <div className="md:flex">
                {/* Image placeholder */}
                <div className="md:w-2/5 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-12">
                  <Icons.newspaper className="w-32 h-32 text-white/20" />
                </div>

                {/* Content */}
                <div className="md:w-3/5 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-primary-100 text-primary-800">Featured</Badge>
                    <Badge variant="outline">{blogPosts[0].category}</Badge>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Icons.calendar className="w-4 h-4" />
                      {new Date(blogPosts[0].date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icons.clock className="w-4 h-4" />
                      {blogPosts[0].readTime}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}

      {/* All Posts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {blogPosts.slice(1).map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mb-4">
                  <Icons.fileText className="w-16 h-16 text-primary-300" />
                </div>

                <Badge variant="outline" className="mb-3">{post.category}</Badge>

                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Icons.calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icons.clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <Card className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 text-white border-0">
        <CardContent className="p-8 text-center">
          <Icons.shield className="w-16 h-16 mx-auto mb-4 text-white/80" />
          <h2 className="text-2xl font-bold mb-3">Check Your Baby Food Safety</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Search our database of tested products to see safety ratings and heavy metal test results.
          </p>
          <Link
            href="/search"
            className="inline-block px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
          >
            Browse Products
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
