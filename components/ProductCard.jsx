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
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full">
        <div className="aspect-square relative bg-gray-100">
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

          {/* Score Badge */}
          {showScore && hasScore && (
            <div className="absolute top-2 right-2">
              {isPro ? (
                // Pro users see numeric score
                <Badge
                  className={cn(
                    'text-sm font-bold px-3 py-1',
                    getScoreColor(product.overall_score)
                  )}
                >
                  {product.overall_score}
                </Badge>
              ) : (
                // Free users see Safe/Caution/Avoid badge
                <Badge
                  className={cn(
                    'text-white text-sm font-bold px-3 py-1',
                    safetyIndicator.color
                  )}
                >
                  {safetyIndicator.label}
                </Badge>
              )}
            </div>
          )}

          {/* Category Badge */}
          {product.category && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="capitalize">
                {product.category}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
            {product.name}
          </h3>

          {product.brand && (
            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          )}

          {/* Score Info */}
          {showScore && hasScore && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              {isPro ? (
                <>
                  <span className="text-xs text-gray-600">Safety Score</span>
                  <span className={cn('text-xs font-semibold', getScoreColor(product.overall_score))}>
                    {product.overall_score}/100 - {getScoreBadge(product.overall_score)}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xs text-gray-600">Safety Rating</span>
                  <span className={cn('text-xs font-semibold', safetyIndicator.textColor)}>
                    {safetyIndicator.label}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Quick Info */}
          {product.description && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
              {product.description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
