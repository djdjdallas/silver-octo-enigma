import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export const metadata = {
  title: 'Metal Detector App for Baby Food | Scan Heavy Metals Instantly',
  description: 'Metal detector app for baby food. Scan barcodes to detect lead, arsenic, cadmium & mercury instantly. Free app for iPhone & Android browsers.',
  keywords: [
    'metal detector app baby food',
    'baby food metal detector',
    'heavy metal scanner app',
    'baby food barcode scanner',
    'detect heavy metals app',
    'baby food safety app'
  ],
  openGraph: {
    title: 'Metal Detector App for Baby Food | Scan Heavy Metals Instantly',
    description: 'Metal detector app for baby food. Scan barcodes to detect lead, arsenic, cadmium & mercury instantly.',
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://safebaby.com'}/tools/metal-detector`,
    siteName: 'SafeBaby',
    type: 'website',
  },
};

export default function MetalDetectorAppPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-white to-primary-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
            FREE METAL DETECTOR APP
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Metal Detector App for Baby Food
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Instantly detect heavy metals in baby food with our free barcode scanning app. Scan any product to check lead, arsenic, cadmium, and mercury levels before you buy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scan">
              <Button size="lg" className="bg-coral hover:bg-coral-600 text-white rounded-full px-8">
                <Icons.scan className="w-5 h-5 mr-2" />
                Start Scanning Now
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="rounded-full border-2 border-primary">
                Browse Products
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Works on iPhone & Android browsers • No download required • 100% Free
          </p>
        </header>

        {/* App Preview Section */}
        <section className="mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  How the Metal Detector App Works
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">Scan Barcode</h3>
                      <p className="text-gray-600">Point your phone camera at any baby food product barcode</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">Instant Detection</h3>
                      <p className="text-gray-600">App instantly detects heavy metal levels from our database</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">View Results</h3>
                      <p className="text-gray-600">See safety score and detailed heavy metal breakdown</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-lavender text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">Make Decision</h3>
                      <p className="text-gray-600">Compare alternatives and choose the safest option</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-96 bg-gradient-to-br from-primary-100 to-coral-100 rounded-3xl flex items-center justify-center">
                <Icons.scan className="w-32 h-32 text-white opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">📱</div>
                    <p className="text-lg font-semibold">Scan any barcode</p>
                    <p className="text-sm">Get instant results</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Metal Detector App Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.scan className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Barcode Scanner</h3>
              <p className="text-gray-600 text-center">
                Scan UPC barcodes in-store or at home. Works with all standard baby food packaging.
              </p>
            </Card>
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">4 Metal Detection</h3>
              <p className="text-gray-600 text-center">
                Detects lead, arsenic, cadmium, and mercury levels based on independent lab testing.
              </p>
            </Card>
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-lavender rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.checkmark className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Safety Scores</h3>
              <p className="text-gray-600 text-center">
                Easy-to-understand 0-100 safety scores. Green = safe, yellow = caution, red = avoid.
              </p>
            </Card>
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-butter rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Compare Products</h3>
              <p className="text-gray-600 text-center">
                Side-by-side comparison of heavy metal levels across brands and products.
              </p>
            </Card>
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.baby className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Age Filtering</h3>
              <p className="text-gray-600 text-center">
                Filter results by your baby&apos;s age (4-6mo, 6-12mo, 12mo+) for age-appropriate options.
              </p>
            </Card>
            <Card className="p-6 bg-white rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.alert className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">FDA Compliance</h3>
              <p className="text-gray-600 text-center">
                Shows which products exceed FDA limits and California AB 899 standards.
              </p>
            </Card>
          </div>
        </section>

        {/* What Metals Are Detected */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Heavy Metals Detected by Our App
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-coral-50 border-l-4 border-coral rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Lead</h3>
              <p className="text-gray-700 mb-3">
                <strong>Detection Range:</strong> 0-50+ ppb (parts per billion)
              </p>
              <p className="text-gray-700 mb-3">
                <strong>FDA Action Level:</strong> 10-20 ppb depending on product type
              </p>
              <p className="text-gray-700">
                Our app flags products exceeding FDA limits and shows you lower-lead alternatives. Lead is particularly concerning because there is no safe level for children.
              </p>
            </div>
            <div className="bg-butter-50 border-l-4 border-butter rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Arsenic</h3>
              <p className="text-gray-700 mb-3">
                <strong>Detection Range:</strong> 0-200+ ppb inorganic arsenic
              </p>
              <p className="text-gray-700 mb-3">
                <strong>FDA Guidance:</strong> 100 ppb for rice cereal (not enforceable)
              </p>
              <p className="text-gray-700">
                The app specifically tracks inorganic arsenic (the toxic form) and warns you about high-risk rice-based products.
              </p>
            </div>
            <div className="bg-lavender-50 border-l-4 border-lavender rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Cadmium</h3>
              <p className="text-gray-700 mb-3">
                <strong>Detection Range:</strong> 0-30+ ppb
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Current Status:</strong> No FDA limits yet established
              </p>
              <p className="text-gray-700">
                Especially high in root vegetables like carrots and sweet potatoes. Our app helps you limit exposure by rotating food varieties.
              </p>
            </div>
            <div className="bg-primary-50 border-l-4 border-primary rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Mercury</h3>
              <p className="text-gray-700 mb-3">
                <strong>Detection Range:</strong> 0-10+ ppb
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Current Status:</strong> Rare in most baby food, higher in fish products
              </p>
              <p className="text-gray-700">
                Less common than other metals, but our app tracks it in all products, particularly those containing fish or seafood ingredients.
              </p>
            </div>
          </div>
        </section>

        {/* Why Use App */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Why Use a Metal Detector App?
          </h2>
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">The Problem</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Icons.alert className="w-5 h-5 text-coral mr-2 flex-shrink-0 mt-1" />
                    <span>94% of baby food contains detectable heavy metals</span>
                  </li>
                  <li className="flex items-start">
                    <Icons.alert className="w-5 h-5 text-coral mr-2 flex-shrink-0 mt-1" />
                    <span>Brands don&apos;t label heavy metal levels on packaging</span>
                  </li>
                  <li className="flex items-start">
                    <Icons.alert className="w-5 h-5 text-coral mr-2 flex-shrink-0 mt-1" />
                    <span>Some products have 60x more contamination than others</span>
                  </li>
                  <li className="flex items-start">
                    <Icons.alert className="w-5 h-5 text-coral mr-2 flex-shrink-0 mt-1" />
                    <span>Heavy metals cause permanent brain damage in babies</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">The Solution</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Icons.checkmark className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" />
                    <span>Scan barcodes to instantly see heavy metal levels</span>
                  </li>
                  <li className="flex items-start">
                    <Icons.checkmark className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" />
                    <span>Make informed decisions before purchasing</span>
                  </li>
                  <li className="flex items-start">
                    <Icons.checkmark className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" />
                    <span>Compare products in seconds to find safer options</span>
                  </li>
                  <li className="flex items-start">
                    <Icons.checkmark className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" />
                    <span>Protect your baby from neurotoxic exposure</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Get Started */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Get Started in 3 Easy Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Open on Your Phone</h3>
              <p className="text-gray-600">
                Visit SafeBaby.com on your iPhone or Android browser. No app download required—it works instantly in your browser.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-coral-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Scan or Search</h3>
              <p className="text-gray-600">
                Tap the scan button and point your camera at any baby food barcode. Or search by product name if you prefer.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-lavender-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. See Results</h3>
              <p className="text-gray-600">
                View safety score and detailed heavy metal breakdown. Compare alternatives to find the safest option.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            What Parents Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 bg-white rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <Icons.baby className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-600">Mother of 2</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                &quot;The metal detector app is a game-changer! I scan every product before buying now. Found out my baby&apos;s rice cereal had 180ppb of arsenic—switched to oat cereal immediately.&quot;
              </p>
            </Card>
            <Card className="p-8 bg-white rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mr-4">
                  <Icons.baby className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Michael K.</div>
                  <div className="text-sm text-gray-600">New Dad</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                &quot;So easy to use while grocery shopping. I just scan and it tells me if the product is safe. Already found 3 brands with way lower heavy metals than what we were using.&quot;
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary-50 to-lavender-50 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start Detecting Heavy Metals Now
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of parents using our free metal detector app to protect their babies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scan">
              <Button size="lg" className="bg-coral hover:bg-coral-600 text-white rounded-full px-12">
                <Icons.scan className="w-5 h-5 mr-2" />
                Open Scanner
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="rounded-full border-2 border-primary px-12">
                Browse Database
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Icons.checkmark className="w-5 h-5 text-primary mr-2" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center">
              <Icons.checkmark className="w-5 h-5 text-primary mr-2" />
              <span>No Download</span>
            </div>
            <div className="flex items-center">
              <Icons.checkmark className="w-5 h-5 text-primary mr-2" />
              <span>Works on All Phones</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Metal Detector App FAQs
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-6 group cursor-pointer shadow-md">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Do I need to download an app?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700">
                No! SafeBaby works directly in your phone&apos;s browser (Safari on iPhone, Chrome on Android). Just visit our website and start scanning—no app store download, no installation, no storage space needed.
              </p>
            </details>
            <details className="bg-white rounded-2xl p-6 group cursor-pointer shadow-md">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How does the barcode scanner work?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700">
                When you tap the scan button, your phone camera activates and reads the UPC barcode on baby food packaging. The app instantly matches the barcode to our database of 500+ tested products and displays heavy metal levels within seconds.
              </p>
            </details>
            <details className="bg-white rounded-2xl p-6 group cursor-pointer shadow-md">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Is the metal detection accurate?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700">
                Yes. Our app doesn&apos;t physically detect metals—it retrieves actual laboratory test results from independent testing by Consumer Reports, Clean Label Project, and government investigations. These are certified lab measurements, not estimates.
              </p>
            </details>
            <details className="bg-white rounded-2xl p-6 group cursor-pointer shadow-md">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What if a product isn&apos;t in the database?
                <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-700">
                If a product hasn&apos;t been tested yet, the app will let you know and allow you to request testing. We prioritize adding products based on user requests. You can also search for similar products from the same brand to get an idea of that brand&apos;s typical heavy metal levels.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
