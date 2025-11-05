// Dynamic robots.txt generation
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://safebaby.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
