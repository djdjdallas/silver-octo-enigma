// Side-by-side product comparison table
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { cn, getScoreColor, getScoreBadge, formatCurrency } from '@/lib/utils';
import { getComparisonWinner } from '@/lib/comparison';

export default function ComparisonTable({ products, contaminants, userTier = 'free' }) {
  const isPro = userTier === 'pro';
  const winner = getComparisonWinner(products);

  // Group contaminants by product and type
  const getContaminantForProduct = (productId, contaminantName) => {
    return contaminants.find(
      c => c.product_id === productId && c.contaminant_name === contaminantName
    );
  };

  const contaminantTypes = ['Lead', 'Arsenic', 'Cadmium', 'Mercury'];

  // Get max value for each contaminant type for scaling bars
  const getMaxContaminantValue = (contaminantName) => {
    const values = products
      .map(p => {
        const c = getContaminantForProduct(p.id, contaminantName);
        return c ? c.amount_detected : 0;
      })
      .filter(v => v > 0);

    return values.length > 0 ? Math.max(...values) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Overall Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Safety Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn(
            "grid gap-4",
            products.length === 2 ? "grid-cols-2" :
            products.length === 3 ? "grid-cols-3" :
            "grid-cols-2 md:grid-cols-4"
          )}>
            {products.map((product) => {
              const isWinner = winner && winner.id === product.id;

              return (
                <div key={product.id} className="text-center space-y-3">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icons.package className="w-16 h-16 text-gray-300" />
                      </div>
                    )}

                    {/* Winner Badge */}
                    {isWinner && isPro && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-amber-500 text-white">
                          <Icons.award className="w-3 h-3 mr-1" />
                          Best
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                      <Link href={`/product/${product.id}`} className="hover:text-primary-500">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-600">{product.brand}</p>
                  </div>

                  {/* Score */}
                  {isPro ? (
                    <div className="space-y-2">
                      <div className={cn(
                        'inline-flex items-center justify-center px-4 py-2 rounded-full font-bold text-lg',
                        getScoreColor(product.overall_score)
                      )}>
                        {product.overall_score}
                      </div>
                      <p className={cn(
                        'text-xs font-semibold',
                        getScoreColor(product.overall_score)
                      )}>
                        {getScoreBadge(product.overall_score)}
                      </p>
                    </div>
                  ) : (
                    <div className="py-8 px-4 bg-gray-50 rounded-lg">
                      <Icons.lock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-600">
                        Upgrade to Pro to see scores
                      </p>
                    </div>
                  )}

                  {/* Price */}
                  {product.price && (
                    <p className="text-sm text-gray-700 font-medium">
                      {formatCurrency(product.price)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Contaminant Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Contaminant Levels</CardTitle>
        </CardHeader>
        <CardContent>
          {isPro ? (
            <div className="space-y-6">
              {contaminantTypes.map((contaminantName) => {
                const maxValue = getMaxContaminantValue(contaminantName);

                return (
                  <div key={contaminantName}>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      {contaminantName}
                      <Icons.info className="w-4 h-4 ml-2 text-gray-400" />
                    </h4>

                    <div className={cn(
                      "grid gap-4",
                      products.length === 2 ? "grid-cols-2" :
                      products.length === 3 ? "grid-cols-3" :
                      "grid-cols-2 md:grid-cols-4"
                    )}>
                      {products.map((product) => {
                        const contaminant = getContaminantForProduct(product.id, contaminantName);

                        if (!contaminant) {
                          return (
                            <div key={product.id} className="text-center py-4">
                              <p className="text-sm text-gray-500">No data</p>
                            </div>
                          );
                        }

                        const percentage = maxValue > 0
                          ? (contaminant.amount_detected / maxValue) * 100
                          : 0;

                        const exceedsLimit = contaminant.exceeds_limit;

                        return (
                          <div key={product.id} className="space-y-2">
                            {/* Bar Chart */}
                            <div className="h-32 flex items-end">
                              <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden">
                                <div
                                  className={cn(
                                    'transition-all duration-500',
                                    exceedsLimit ? 'bg-red-500' : 'bg-green-500'
                                  )}
                                  style={{ height: `${percentage}%`, minHeight: percentage > 0 ? '8px' : '0' }}
                                />
                              </div>
                            </div>

                            {/* Value */}
                            <div className="text-center">
                              <p className={cn(
                                'font-semibold text-sm',
                                exceedsLimit ? 'text-red-600' : 'text-gray-900'
                              )}>
                                {contaminant.amount_detected.toFixed(2)} {contaminant.unit}
                              </p>

                              {contaminant.safety_limit && (
                                <p className="text-xs text-gray-500">
                                  Limit: {contaminant.safety_limit} {contaminant.unit}
                                </p>
                              )}

                              {exceedsLimit && (
                                <Badge variant="destructive" className="mt-1 text-xs">
                                  Exceeds Limit
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center bg-gray-50 rounded-lg">
              <Icons.lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Unlock Detailed Comparison
              </h3>
              <p className="text-gray-600 mb-4">
                Upgrade to Pro to see detailed contaminant levels and get personalized recommendations
              </p>
              <Button asChild>
                <Link href="/upgrade">
                  <Icons.award className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Details */}
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Feature</th>
                  {products.map((product) => (
                    <th key={product.id} className="text-center py-3 px-2 text-sm font-medium text-gray-700">
                      {product.name.split(' ').slice(0, 3).join(' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-2 text-sm text-gray-600">Brand</td>
                  {products.map((product) => (
                    <td key={product.id} className="py-3 px-2 text-sm text-center">{product.brand || '-'}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2 text-sm text-gray-600">Category</td>
                  {products.map((product) => (
                    <td key={product.id} className="py-3 px-2 text-sm text-center capitalize">{product.category || '-'}</td>
                  ))}
                </tr>
                {products.some(p => p.stage) && (
                  <tr className="border-b">
                    <td className="py-3 px-2 text-sm text-gray-600">Stage</td>
                    {products.map((product) => (
                      <td key={product.id} className="py-3 px-2 text-sm text-center">
                        {product.stage ? `Stage ${product.stage}` : '-'}
                      </td>
                    ))}
                  </tr>
                )}
                {products.some(p => p.price) && (
                  <tr className="border-b">
                    <td className="py-3 px-2 text-sm text-gray-600">Price</td>
                    {products.map((product) => (
                      <td key={product.id} className="py-3 px-2 text-sm text-center font-medium">
                        {product.price ? formatCurrency(product.price) : '-'}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pro Features Recommendation */}
      {isPro && winner && (
        <Card className="border-primary-500 bg-primary-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Icons.award className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Our Recommendation</h3>
                <p className="text-gray-700">
                  Based on safety scores and contaminant levels, we recommend{' '}
                  <strong>{winner.name}</strong> with a safety score of <strong>{winner.overall_score}</strong>.
                  {winner.price && ' '}
                  {winner.price && `Available for ${formatCurrency(winner.price)}.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
