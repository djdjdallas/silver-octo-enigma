// Product card component for displaying products in grid/list
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { cn, getScoreColor, getScoreBadge, getSafetyIndicator } from '@/lib/utils';

export default function ProductCard({ product, userTier = 'free', showScore = true }) {
  const isPro = userTier === 'pro';
  const hasScore = product.overall_score !== null && product.overall_score !== undefined;
  const safetyIndicator = hasScore ? getSafetyIndicator(product.overall_score) : null;

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full group hover:scale-105 rounded-3xl border-0">
        <div className="aspect-square relative bg-gradient-to-br from-primary-50 to-coral-50">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icons.package className="w-16 h-16 text-gray-300" />
            </div>
          )}

          {/* Score Badge - Circular */}
          {showScore && hasScore && (
            <div className="absolute top-2 right-2 z-10">
              {isPro ? (
                // Pro users see numeric score in circle
                <div
                  className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg',
                    product.overall_score >= 70 ? 'bg-primary' :
                    product.overall_score >= 40 ? 'bg-butter-400' :
                    'bg-coral'
                  )}
                >
                  {product.overall_score}
                </div>
              ) : (
                // Free users see Safe/Caution/Avoid badge in rounded pill
                <div
                  className={cn(
                    'px-4 py-2 rounded-full text-white text-xs font-bold shadow-lg',
                    safetyIndicator.label === 'Safe' ? 'bg-primary' :
                    safetyIndicator.label === 'Caution' ? 'bg-butter-400' :
                    'bg-coral'
                  )}
                >
                  {safetyIndicator.label}
                </div>
              )}
            </div>
          )}

          {/* Category Badge */}
          {product.category && (
            <div className="absolute bottom-3 left-3">
              <Badge className="capitalize bg-white/90 text-gray-700 hover:bg-white rounded-full px-3">
                {product.category}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5">
          <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 text-lg">
            {product.name}
          </h3>

          {product.brand && (
            <p className="text-sm text-gray-600 font-medium mb-3">{product.brand}</p>
          )}

          {/* Score Info */}
          {showScore && hasScore && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              {isPro ? (
                <>
                  <span className="text-xs text-gray-500 font-medium">Safety Score</span>
                  <span className={cn('text-sm font-bold',
                    product.overall_score >= 70 ? 'text-primary' :
                    product.overall_score >= 40 ? 'text-butter-600' :
                    'text-coral'
                  )}>
                    {product.overall_score}/100
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xs text-gray-500 font-medium">Safety Rating</span>
                  <div className="flex items-center gap-1">
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      safetyIndicator.label === 'Safe' ? 'bg-primary' :
                      safetyIndicator.label === 'Caution' ? 'bg-butter-400' :
                      'bg-coral'
                    )} />
                    <span className={cn('text-sm font-bold',
                      safetyIndicator.label === 'Safe' ? 'text-primary' :
                      safetyIndicator.label === 'Caution' ? 'text-butter-600' :
                      'text-coral'
                    )}>
                      {safetyIndicator.label}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* View Details Button */}
          <div className="mt-4">
            <div className="flex items-center text-coral font-semibold text-sm group-hover:gap-2 transition-all">
              View Details
              <Icons.arrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
