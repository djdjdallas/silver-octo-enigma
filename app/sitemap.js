// Dynamic sitemap generation with SEO-optimized URLs
import { createClient } from '@/lib/supabase/server';
import { generateProductSlug, getBrandSlug } from '@/lib/utils';

export default async function sitemap() {
  const supabase = await createClient();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.safebaby.co';

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
    {
      slug: 'baby-food-heavy-metals-complete-guide',
      date: '2025-01-05',
    },
    {
      slug: 'best-organic-baby-food-safety-beyond-label',
      date: '2025-01-06',
    },
    {
      slug: 'rice-vs-oatmeal-baby-cereal-which-is-safer',
      date: '2025-01-06',
    },
    {
      slug: 'baby-food-pouches-safety-guide',
      date: '2025-01-06',
    },
    {
      slug: 'gerber-baby-food-review-2025',
      date: '2025-01-06',
    },
    {
      slug: 'happy-baby-organics-gold-standard',
      date: '2025-01-06',
    },
    {
      slug: 'beech-nut-vs-earths-best-comparison',
      date: '2025-01-06',
    },
    {
      slug: 'store-brand-baby-food-safety',
      date: '2025-01-06',
    },
    {
      slug: 'arsenic-in-baby-food-rice-complete-guide',
      date: '2025-01-06',
    },
    {
      slug: 'cadmium-in-baby-food-sweet-potatoes',
      date: '2025-01-06',
    },
    {
      slug: 'mercury-in-baby-food-guide',
      date: '2025-01-06',
    },
    {
      slug: 'how-baby-food-gets-contaminated',
      date: '2025-01-06',
    },
    {
      slug: 'power-of-variety-rotation-reduces-risk',
      date: '2025-01-06',
    },
    {
      slug: 'making-your-own-baby-food-safer',
      date: '2025-01-06',
    },
    {
      slug: 'shopping-smart-safe-products-guide',
      date: '2025-01-06',
    },
    {
      slug: 'transitioning-to-table-foods-toddlers',
      date: '2025-01-06',
    },
    {
      slug: 'water-quality-formula-baby-food',
      date: '2025-01-06',
    },
  ];

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Blog category pages
  const blogCategories = [
    {
      slug: 'product-guides',
      date: '2025-01-15',
    },
    {
      slug: 'brand-reviews',
      date: '2025-01-15',
    },
    {
      slug: 'heavy-metals',
      date: '2025-01-15',
    },
    {
      slug: 'safety-tips',
      date: '2025-01-15',
    },
  ];

  const blogCategoryUrls = blogCategories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.slug}`,
    lastModified: category.date,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Tool pages
  const toolUrls = [
    {
      url: `${baseUrl}/tools/contamination-checker`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/arsenic-checker`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/metal-detector`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

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
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
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
    ...blogCategoryUrls,
    ...toolUrls,
  ];
}
