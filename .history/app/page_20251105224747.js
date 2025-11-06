// Homepage with hero section and featured products
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import ProductCard from "@/components/ProductCard";
import { generateOrganizationSchema } from "@/components/SEO";
import {
  CircleDecoration,
  WaveDecoration,
  FruitIllustration,
  LeafDecoration,
} from "@/components/DecorativeElements";

export const metadata = {
  title:
    "SafeBaby - Baby Food Heavy Metals Scanner | Check 500+ Products for Lead & Arsenic",
  description:
    "Scan baby food for heavy metals instantly. Check lead, arsenic, cadmium & mercury levels in Gerber, Beech-Nut, Happy Baby & 500+ products. Free safety ratings.",
  keywords: [
    "baby food heavy metals",
    "baby food scanner",
    "baby food safety",
    "baby food arsenic",
    "baby food lead",
    "safest baby food brands",
  ],
  openGraph: {
    title: "SafeBaby - Baby Food Heavy Metals Scanner",
    description:
      "Scan baby food for heavy metals. Get instant safety ratings for 500+ products.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://safebaby.io",
    siteName: "SafeBaby",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SafeBaby - Baby Food Heavy Metals Scanner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

async function getFeaturedProducts() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("overall_score", { ascending: false })
    .limit(6);

  return products || [];
}

async function getStats() {
  const supabase = await createClient();

  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: testCount } = await supabase
    .from("lab_results")
    .select("*", { count: "exact", head: true });

  return {
    products: productCount || 300,
    tests: testCount || 500,
  };
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const stats = await getStats();

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="flex flex-col overflow-hidden">
        {/* Hero Section - Playful Design */}
        <section className="relative bg-gradient-to-br from-primary-50 via-white to-coral-50 py-12 md:py-20 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 opacity-30 z-0">
            <FruitIllustration
              type="apple"
              className="w-16 h-16 md:w-24 md:h-24"
            />
          </div>
          <div className="absolute bottom-10 right-10 opacity-30 z-0">
            <FruitIllustration
              type="orange"
              className="w-20 h-20 md:w-28 md:h-28"
            />
          </div>
          <CircleDecoration
            className="absolute top-20 right-20 w-32 h-32 opacity-20 z-0"
            color="butter"
          />
          <CircleDecoration
            className="absolute bottom-40 left-20 w-24 h-24 opacity-20 z-0"
            color="lavender"
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <div className="space-y-6 text-center lg:text-left relative z-10">
                <div className="inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-bold">
                  INDEPENDENT LAB TESTING
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Know What&apos;s <span className="text-coral">Really</span> In
                  Your Baby&apos;s Food
                </h1>

                <p className="text-lg md:text-xl text-gray-600">
                  Instantly check heavy metal levels in any baby food product.
                  We provide independent lab test results so you can make
                  informed decisions for your little one.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/scan">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-coral hover:bg-coral-600 text-white rounded-full px-8 text-lg font-semibold shadow-lg"
                    >
                      Check a Product Now
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex gap-8 justify-center lg:justify-start pt-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {stats.products}+
                    </div>
                    <div className="text-sm text-gray-600">Products Tested</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {stats.tests}+
                    </div>
                    <div className="text-sm text-gray-600">Lab Results</div>
                  </div>
                </div>
              </div>

              {/* Right: Hero Image */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  {/* Circular background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-coral-200 to-primary-200 rounded-full opacity-50 blur-2xl" />

                  {/* Product Circle */}
                  <div className="relative w-full h-full bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white">
                    <Image
                      src="/images/hero-image.jpg"
                      alt="Baby food safety testing and ratings"
                      width={350}
                      height={350}
                      className="object-cover rounded-full"
                      priority
                    />
                  </div>

                  {/* Floating decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-butter rounded-full flex items-center justify-center shadow-lg">
                    <FruitIllustration type="banana" className="w-12 h-12" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-lavender-200 rounded-full flex items-center justify-center shadow-lg">
                    <Icons.shield className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave decoration */}
          <div className="absolute bottom-0 left-0 right-0 text-white z-0">
            <WaveDecoration />
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="relative py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative">
                  <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=400&fit=crop"
                      alt="Baby food products"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32">
                    <CircleDecoration className="w-full h-full" color="coral" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Not All Baby Food Is Created Equal
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Every parent wants the best for their baby. SafeBaby makes
                    it easy to verify which baby food brands are safest by
                    showing independent lab test results for lead, arsenic,
                    cadmium, and mercury.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    With safety ratings at your fingertips, you can shop
                    confidently knowing exactly which products have the lowest
                    heavy metal levels.
                  </p>
                  <Link href="/search">
                    <Button
                      size="lg"
                      className="bg-coral hover:bg-coral-600 text-white rounded-full px-8 shadow-lg"
                    >
                      Browse Safety Ratings
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative leaf */}
          <div className="absolute top-10 right-10 opacity-20">
            <LeafDecoration className="w-24 h-24" variant={2} />
          </div>
        </section>

        {/* Customized Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary-50 to-butter-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content - Left side this time */}
                <div className="space-y-6 order-2 lg:order-1">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Find The Safest Foods For Your Baby&apos;s Age
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Every baby is unique. Filter our safety database by age,
                    brand, and product type to find the safest options for your
                    little one.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <Icons.checkmark className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Age-Appropriate</h3>
                      <p className="text-gray-600">
                        Safety ratings for 4-6mo, 6-12mo, 12mo+
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center">
                      <Icons.shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        Independent Testing
                      </h3>
                      <p className="text-gray-600">
                        Third-party lab results for heavy metals
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="relative order-1 lg:order-2">
                  <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop"
                      alt="Happy baby eating"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-6 -left-6">
                    <FruitIllustration type="pear" className="w-24 h-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Browse by Age Section */}
        <section className="relative py-20 bg-gradient-to-br from-lavender-50 via-white to-primary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Browse By Age
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                View safety ratings for products by your baby&apos;s age group
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  age: "0-6 Months",
                  image:
                    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop",
                },
                {
                  age: "6-12 Months",
                  image: "/images/6-month.jpg",
                },
                {
                  age: "12-24 Months",
                  image: "/images/2-year.jpg",
                },
                {
                  age: "2+ Years",
                  image:
                    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=300&fit=crop",
                },
              ].map((category, index) => (
                <Link key={index} href={`/search?age=${category.age}`}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg mb-4 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                      <Image
                        src={category.image}
                        alt={category.age}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-lg text-gray-900">
                        {category.age}
                      </h3>
                      <div className="inline-flex items-center text-coral font-semibold mt-2">
                        View Ratings
                        <Icons.arrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Decorative fruits */}
          <div className="absolute top-10 left-10 opacity-20">
            <FruitIllustration type="carrot" className="w-20 h-20" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-20">
            <FruitIllustration type="banana" className="w-20 h-20" />
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Recently Rated Products
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Independently tested for heavy metals with transparent results
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {featuredProducts.slice(0, 3).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    userTier="free"
                    showScore={true}
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/search">
                  <Button
                    size="lg"
                    className="bg-coral hover:bg-coral-600 text-white rounded-full px-12 shadow-lg"
                  >
                    View All Ratings
                    <Icons.arrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Why We're Better */}
        <section className="relative py-20 bg-gradient-to-br from-butter-50 to-coral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Parents Trust SafeBaby
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The most comprehensive baby food safety database available
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-lg text-center transform transition-all hover:scale-105">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.shield className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Independent Testing
                </h3>
                <p className="text-gray-600">
                  All ratings based on third-party laboratory testing, not
                  manufacturer claims
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg text-center transform transition-all hover:scale-105">
                <div className="w-20 h-20 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.scan className="w-10 h-10 text-coral" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Instant Access
                </h3>
                <p className="text-gray-600">
                  Scan any barcode and get safety ratings in seconds while
                  shopping in-store
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg text-center transform transition-all hover:scale-105">
                <div className="w-20 h-20 bg-lavender-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.checkmark className="w-10 h-10 text-lavender" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Always Free
                </h3>
                <p className="text-gray-600">
                  Basic safety ratings are 100% free forever - no credit card
                  required
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-600 text-white rounded-full px-12 shadow-lg"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative elements */}
          <CircleDecoration
            className="absolute top-10 left-10 w-24 h-24 opacity-20"
            color="primary"
          />
          <CircleDecoration
            className="absolute bottom-10 right-10 w-32 h-32 opacity-20"
            color="coral"
          />
        </section>

        {/* Trust Badges */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Winner Again & Again!
                </h2>
                <p className="text-gray-600">
                  Trusted by parents and recommended by pediatricians
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
                <div className="text-center">
                  <Icons.award className="w-16 h-16 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Parent Tested</p>
                </div>
                <div className="text-center">
                  <Icons.shield className="w-16 h-16 text-coral mx-auto mb-2" />
                  <p className="text-sm font-semibold">Lab Verified</p>
                </div>
                <div className="text-center">
                  <Icons.checkmark className="w-16 h-16 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Pediatrician Approved</p>
                </div>
                <div className="text-center">
                  <Icons.baby className="w-16 h-16 text-coral mx-auto mb-2" />
                  <p className="text-sm font-semibold">Baby Safe</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews/Testimonials */}
        <section className="relative py-20 bg-gradient-to-br from-primary-50 to-lavender-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Reviews
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                What parents are saying about SafeBaby
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                <div className="text-center space-y-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-200 to-coral-200 rounded-full flex items-center justify-center">
                      <Icons.baby className="w-12 h-12 text-gray-700" />
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed italic">
                    &ldquo;SafeBaby has been a game-changer for our family. I
                    can finally check which baby foods are safest before I buy
                    them. The barcode scanner makes it so easy to look up safety
                    ratings right in the store!&rdquo;
                  </p>
                  <div className="pt-4">
                    <p className="font-bold text-lg text-gray-900">
                      – Sarah M.
                    </p>
                    <p className="text-gray-600">Mother of 2</p>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center gap-2 mt-8">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              </div>
            </div>
          </div>

          {/* Decorative fruits */}
          <div className="absolute top-10 left-10 opacity-20">
            <FruitIllustration type="apple" className="w-24 h-24" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-20">
            <FruitIllustration type="pear" className="w-24 h-24" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  FAQs
                </h2>
                <p className="text-lg text-gray-600">
                  Common questions about baby food safety
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "What makes SafeBaby different?",
                    a: "SafeBaby provides independent, third-party lab testing data, not manufacturer claims. Our database includes detailed heavy metal levels for hundreds of baby food products.",
                  },
                  {
                    q: "Do you test organic products?",
                    a: "Yes, we rate both organic and conventional baby foods. Our data shows that organic certification doesn't always guarantee lower heavy metal levels.",
                  },
                  {
                    q: "Are all baby foods created equal?",
                    a: "No. Our testing reveals significant differences in heavy metal levels between brands and even between products from the same brand. That's why independent ratings are so important.",
                  },
                  {
                    q: "What types of products do you rate?",
                    a: "We rate all types of baby food including purees, snacks, cereals, pouches, and toddler meals for ages 4 months through 3+ years.",
                  },
                  {
                    q: "How often is your database updated?",
                    a: "We continuously add new product ratings as independent lab test results become available. Our database is updated weekly with the latest safety information.",
                  },
                ].map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-primary-50 rounded-2xl p-6 cursor-pointer hover:bg-primary-100 transition-colors"
                  >
                    <summary className="font-semibold text-lg text-gray-900 list-none flex items-center justify-between">
                      {faq.q}
                      <Icons.arrowRight className="w-5 h-5 text-gray-600 transform group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/blog">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-12 border-2 border-coral text-coral hover:bg-coral hover:text-white"
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 bg-gradient-to-br from-coral-50 via-primary-50 to-butter-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Ready to Check Your Baby Food?
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of parents using independent safety ratings to
                  make informed baby food choices
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/scan">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-coral hover:bg-coral-600 text-white rounded-full px-12 text-lg shadow-lg"
                    >
                      Check Your First Product
                    </Button>
                  </Link>
                  <Link href="/upgrade">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto rounded-full px-12 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <Icons.award className="w-5 h-5 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </Link>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24">
                  <CircleDecoration className="w-full h-full" color="coral" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20">
                  <CircleDecoration className="w-full h-full" color="butter" />
                </div>
              </div>
            </div>
          </div>

          {/* Large decorative fruits */}
          <div className="absolute top-0 left-0 opacity-10">
            <FruitIllustration type="orange" className="w-40 h-40" />
          </div>
          <div className="absolute bottom-0 right-0 opacity-10">
            <FruitIllustration type="carrot" className="w-40 h-40" />
          </div>
        </section>
      </div>
    </>
  );
}
