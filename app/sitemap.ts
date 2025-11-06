import { createClient } from '@/lib/supabase/server';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://safebaby.com';
  const currentDate = new Date();

  // Initialize static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    // Tier 1: Primary Landing Pages
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },

    // Tier 2: Cornerstone Content
    {
      url: `${baseUrl}/blog/baby-food-heavy-metals-complete-guide`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Tier 3: Quick Win Landing Pages (NEW)
    {
      url: `${baseUrl}/tools/contamination-checker`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/arsenic-checker`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/metal-detector`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Tier 4: Existing Blog Content
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/safest-baby-food-brands-2025`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-avoid-heavy-metals-in-baby-food`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/understanding-baby-food-lead-levels-guide`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Tier 6: Functional Pages
    {
      url: `${baseUrl}/scan`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/recalls`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/meal-plans`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },

    // Tier 7: Auth Pages (lower priority, no frequent updates)
    {
      url: `${baseUrl}/upgrade`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },

    // Tier 8: Legal Pages
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  try {
    const supabase = await createClient();

    // Fetch all products for dynamic product pages
    const { data: products } = await supabase
      .from('products')
      .select('id, name, updated_at')
      .order('overall_score', { ascending: false })
      .limit(500); // Limit to top 500 products

    // Fetch all unique brands
    const { data: brands } = await supabase
      .from('products')
      .select('brand')
      .not('brand', 'is', null);

    // Get unique brand list
    const uniqueBrands = [...new Set(brands?.map(b => b.brand) || [])];

    // Add product pages to sitemap
    const productRoutes: MetadataRoute.Sitemap = (products || []).map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: product.updated_at ? new Date(product.updated_at) : currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Add brand pages to sitemap
    const brandRoutes: MetadataRoute.Sitemap = uniqueBrands.map((brand) => ({
      url: `${baseUrl}/brands/${encodeURIComponent(brand)}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Combine all routes
    return [...staticRoutes, ...productRoutes, ...brandRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static routes if database fetch fails
    return staticRoutes;
  }
}
