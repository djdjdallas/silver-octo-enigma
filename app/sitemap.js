// Dynamic sitemap generation with SEO-optimized URLs
import { createClient } from '@/lib/supabase/server';
import { generateProductSlug, getBrandSlug } from '@/lib/utils';

export default async function sitemap() {
  const supabase = await createClient();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://safebaby.app';

  // Get all products for product pages
  const { data: products } = await supabase
    .from('products')
    .select('id, name, brand, updated_at')
    .order('updated_at', { ascending: false });

  // Product slug URLs (SEO-friendly)
  const productSlugUrls = (products || []).map((product) => ({
    url: `${baseUrl}/products/${generateProductSlug(product)}`,
    lastModified: product.updated_at,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Legacy product ID URLs (keep for backward compatibility)
  const productIdUrls = (products || []).map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: product.updated_at,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Brand pages
  const uniqueBrands = [...new Set((products || []).map(p => p.brand).filter(Boolean))];
  const brandUrls = uniqueBrands.map((brand) => ({
    url: `${baseUrl}/brands/${getBrandSlug(brand)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Blog posts
  const blogPosts = [
    {
      slug: 'safest-baby-food-brands-2025',
      date: '2025-01-15',
    },
    {
      slug: 'how-to-avoid-heavy-metals-in-baby-food',
      date: '2025-01-10',
    },
    {
      slug: 'understanding-baby-food-lead-levels-guide',
      date: '2025-01-05',
    },
  ];

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/scan`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/upgrade`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  return [
    ...staticPages,
    ...brandUrls,
    ...productSlugUrls,
    ...productIdUrls,
    ...blogUrls,
  ];
}
