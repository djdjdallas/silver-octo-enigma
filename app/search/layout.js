export const metadata = {
  title: 'Safest Baby Food Brands 2025 | Compare Heavy Metal Levels',
  description: 'Compare safety ratings for 500+ baby food products. See which brands have lowest lead, arsenic & cadmium. Gerber vs Beech-Nut vs Happy Baby testing results.',
  keywords: [
    'safest baby food brands',
    'safest baby food brands 2025',
    'baby food heavy metals comparison',
    'which baby food brands are safest'
  ],
  openGraph: {
    title: 'Safest Baby Food Brands 2025 | Compare Heavy Metal Levels',
    description: 'Compare safety ratings for 500+ baby food products. See which brands have lowest lead, arsenic & cadmium.',
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://safebaby.com'}/search`,
    siteName: 'SafeBaby',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SafeBaby - Compare Baby Food Brands',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function SearchLayout({ children }) {
  return children;
}
