import { SEO } from '@/components/SEO';

export const metadata = SEO({
  title: 'Contact Us - SafeBaby Baby Food Safety',
  description: 'Get in touch with SafeBaby. Questions about baby food safety, product data, or feature requests? We\'re here to help.',
  canonical: '/contact',
  ogType: 'website',
});

export default function ContactLayout({ children }) {
  return children;
}
