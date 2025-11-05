// Blog layout with sidebar
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';

const categories = [
  { name: 'Safety Tips', slug: 'safety-tips', count: 1 },
  { name: 'Heavy Metals', slug: 'heavy-metals', count: 2 },
  { name: 'Brand Reviews', slug: 'brand-reviews', count: 1 },
  { name: 'Product Guides', slug: 'product-guides', count: 1 },
];

const recentPosts = [
  {
    title: 'Safest Baby Food Brands in 2025',
    slug: 'safest-baby-food-brands-2025',
    date: '2025-01-15',
  },
  {
    title: 'How to Avoid Heavy Metals in Baby Food',
    slug: 'how-to-avoid-heavy-metals-in-baby-food',
    date: '2025-01-10',
  },
  {
    title: 'Understanding Baby Food Lead Levels: A Parent\'s Guide',
    slug: 'understanding-baby-food-lead-levels-guide',
    date: '2025-01-05',
  },
];

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {children}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Search */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Search Articles</h3>
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <Icons.search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                {/* Categories */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category.slug}>
                          <Link
                            href={`/blog/category/${category.slug}`}
                            className="flex items-center justify-between text-gray-600 hover:text-primary-600 transition-colors"
                          >
                            <span>{category.name}</span>
                            <span className="text-sm text-gray-400">({category.count})</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Recent Posts */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Recent Posts</h3>
                    <ul className="space-y-3">
                      {recentPosts.map((post) => (
                        <li key={post.slug}>
                          <Link href={`/blog/${post.slug}`} className="group">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 line-clamp-2 mb-1">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="bg-primary-50 border-primary-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Icons.mail className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Get the latest safety alerts and tips delivered to your inbox.
                      </p>
                      <Link
                        href="/signup"
                        className="inline-block w-full px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Subscribe Now
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
