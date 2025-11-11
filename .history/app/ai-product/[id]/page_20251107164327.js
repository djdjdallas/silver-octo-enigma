/**
 * AI-Analyzed Product Detail Page
 *
 * Displays detailed information and AI safety analysis for products
 * that were analyzed via external APIs (Open Food Facts, UPCitemdb)
 * but don't have laboratory test results.
 *
 * @route /ai-product/[id]
 */

import { getAIAnalyzedProduct } from "@/app/actions/productLookup";
import { AIAnalyzedProduct } from "@/components/AIAnalyzedProduct";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await getAIAnalyzedProduct(id);

  if (result.type === "not_found") {
    return {
      title: "Product Not Found | SafeBaby",
      description: "The requested product could not be found.",
    };
  }

  const { product, analysis } = result;

  return {
    title: `${product.name} - AI Safety Analysis | SafeBaby`,
    description: `AI-powered safety analysis for ${product.name} by ${
      product.brand
    }. Overall safety score: ${
      analysis.overallScore
    }/100. ${analysis.recommendations.substring(0, 150)}...`,
    openGraph: {
      title: `${product.name} - AI Safety Analysis`,
      description: `Safety Score: ${analysis.overallScore}/100 - ${product.brand}`,
      images: product.image_url ? [product.image_url] : [],
    },
  };
}

export default async function AIProductPage({ params }) {
  const { id } = await params;
  const result = await getAIAnalyzedProduct(id);

  // Handle product not found
  if (result.type === "not_found") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-coral-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.xCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the product you're looking for. It may have been
            removed or the link may be incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/scan" className="flex-1">
              <Button className="w-full rounded-full">
                <Icons.scan className="w-5 h-5 mr-2" />
                Scan Another Product
              </Button>
            </Link>
            <Link href="/search" className="flex-1">
              <Button variant="outline" className="w-full rounded-full">
                <Icons.search className="w-5 h-5 mr-2" />
                Search Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render AI-analyzed product
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-coral-50 pb-16">
      {/* Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/scan">
              <Button variant="ghost" size="sm" className="rounded-full">
                <Icons.chevronRight className="w-5 h-5 mr-1 rotate-180" />
                Back to Scanner
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Link href="/search">
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Icons.search className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Icons.home className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="container mx-auto">
        <AIAnalyzedProduct
          product={result.product}
          analysis={result.analysis}
          source={result.source}
          analyzedAt={result.analyzedAt}
          cached={result.cached}
        />
      </div>

      {/* Related Actions */}
      <div className="container mx-auto px-4 mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">
              What would you like to do next?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/scan">
                <Button variant="outline" className="w-full rounded-full">
                  <Icons.scan className="w-5 h-5 mr-2" />
                  Scan Another Product
                </Button>
              </Link>
              <Link href="/search">
                <Button variant="outline" className="w-full rounded-full">
                  <Icons.package className="w-5 h-5 mr-2" />
                  Browse All Products
                </Button>
              </Link>
              <Link href="/compare">
                <Button variant="outline" className="w-full rounded-full">
                  <Icons.shield className="w-5 h-5 mr-2" />
                  Compare Products
                </Button>
              </Link>
              <Link href="/recalls">
                <Button variant="outline" className="w-full rounded-full">
                  <Icons.alert className="w-5 h-5 mr-2" />
                  Check Recalls
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
