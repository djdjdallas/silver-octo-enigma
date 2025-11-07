// Reusable SEO component for consistent meta tags across pages
function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  article,
  noindex = false,
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.safebaby.co';
  const fullTitle = title ? `${title} | SafeBaby` : 'SafeBaby - Baby Food Safety Ratings';
  const fullDescription = description || 'Scan baby food products and check safety ratings based on independent lab testing for heavy metals like arsenic, lead, cadmium, and mercury.';
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const imageUrl = ogImage || `${baseUrl}/og-image.png`;

  return {
    title: fullTitle,
    description: fullDescription,
    ...(noindex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      siteName: 'SafeBaby',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: ogType,
      ...(article && {
        article: {
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          authors: article.authors || ['SafeBaby'],
          tags: article.tags || [],
        },
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
    },
  };
}

// Helper function to generate JSON-LD structured data
export function generateProductSchema(product, contaminants = []) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.safebaby.co';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `${product.name} by ${product.brand} - Safety ratings and heavy metal test results`,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    image: product.image_url || `${baseUrl}/icons/icon-512x512.png`,
    url: `${baseUrl}/product/${product.slug || product.id}`,
    aggregateRating: product.overall_score ? {
      '@type': 'AggregateRating',
      ratingValue: (product.overall_score / 20).toFixed(1), // Convert 0-100 to 0-5 scale
      bestRating: '5',
      worstRating: '1',
      ratingCount: '1',
    } : undefined,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
    },
  };
}

export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.safebaby.co';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SafeBaby',
    description: 'Baby food safety ratings and heavy metal testing information',
    url: baseUrl,
    logo: `${baseUrl}/icons/icon-512x512.png`,
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@safebaby.co',
    },
  };
}

export function generateBreadcrumbSchema(items) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.safebaby.co';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function generateArticleSchema(article) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.safebaby.co';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || `${baseUrl}/og-image.png`,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: {
      '@type': 'Organization',
      name: 'SafeBaby',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SafeBaby',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icons/icon-512x512.png`,
      },
    },
    url: `${baseUrl}${article.url}`,
  };
}

export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Export SEO as both default and named export for compatibility
export default SEO;
export { SEO };
