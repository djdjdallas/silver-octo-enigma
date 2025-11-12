// Root layout for the application
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/Navigation';
import InstallPrompt from '@/components/InstallPrompt';
import Disclaimer from '@/components/Disclaimer';
import FirstUseAgreement from '@/components/FirstUseAgreement';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import ScanTracker from '@/components/ScanTracker';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import CookieConsent from '@/components/CookieConsent';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SafeBaby - Baby Food Safety Ratings',
  description: 'Scan baby food products and check safety ratings based on heavy metal test results. Helping parents make informed decisions.',
  keywords: 'baby food safety, heavy metals, arsenic, lead, cadmium, mercury, baby food ratings',
  authors: [{ name: 'SafeBaby' }],
  creator: 'SafeBaby',
  publisher: 'SafeBaby',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.safebaby.co'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SafeBaby - Baby Food Safety Ratings',
    description: 'Scan baby food products and check safety ratings based on heavy metal test results.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'SafeBaby',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SafeBaby - Baby Food Safety Ratings',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeBaby - Baby Food Safety Ratings',
    description: 'Scan baby food products and check safety ratings based on heavy metal test results.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SafeBaby',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#10b981',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SafeBaby" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={inter.className}>
        {/* Add Google Analytics - only loads in production */}
        <GoogleAnalytics />

        <Suspense fallback={null}>
          <AnalyticsProvider>
            <SubscriptionProvider>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-1">
                {children}
              </main>
          <footer className="border-t bg-white mt-auto">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Compact Disclaimer */}
              <Disclaimer variant="compact" />

              {/* Footer Links and Copyright */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  © 2024 SafeBaby. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm">
                  <a href="/about" className="text-gray-600 hover:text-primary-500">
                    About
                  </a>
                  <a href="/privacy" className="text-gray-600 hover:text-primary-500">
                    Privacy
                  </a>
                  <a href="/terms" className="text-gray-600 hover:text-primary-500">
                    Terms
                  </a>
                  <a href="/contact" className="text-gray-600 hover:text-primary-500">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <InstallPrompt />
        <FirstUseAgreement />
        <ScanTracker />
        <CookieConsent />
            </SubscriptionProvider>
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  );
}
