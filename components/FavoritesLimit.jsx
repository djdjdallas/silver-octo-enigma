// Favorites limit component - shows usage and upgrade prompt
'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { cn } from '@/lib/utils';

const FREE_FAVORITES_LIMIT = 5;

export default function FavoritesLimit({ variant = 'banner' }) {
  const { isPro, favoritesCount } = useSubscription();

  // Don't show for Pro users
  if (isPro) return null;

  const remainingFavorites = Math.max(0, FREE_FAVORITES_LIMIT - favoritesCount);
  const isAtLimit = favoritesCount >= FREE_FAVORITES_LIMIT;
  const isNearLimit = favoritesCount >= FREE_FAVORITES_LIMIT - 1;

  // Banner variant - shown on dashboard/favorites page
  if (variant === 'banner') {
    return (
      <Card className={cn(
        'border-2 mb-6',
        isAtLimit ? 'border-red-300 bg-red-50' :
        isNearLimit ? 'border-yellow-300 bg-yellow-50' :
        'border-primary-300 bg-primary-50'
      )}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={cn(
                'p-2 rounded-full',
                isAtLimit ? 'bg-red-100' : isNearLimit ? 'bg-yellow-100' : 'bg-primary-100'
              )}>
                <Icons.heart className={cn(
                  'w-5 h-5',
                  isAtLimit ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-primary-600'
                )} />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900">
                    Favorites: {favoritesCount} / {FREE_FAVORITES_LIMIT}
                  </span>
                  {isAtLimit && (
                    <Badge variant="destructive" className="text-xs">Limit Reached</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {isAtLimit
                    ? 'You\'ve reached the free limit. Upgrade to save unlimited favorites.'
                    : `${remainingFavorites} ${remainingFavorites === 1 ? 'slot' : 'slots'} remaining in free plan.`
                  }
                </p>
              </div>
            </div>
            <Link href="/upgrade">
              <Button size="sm" className={isAtLimit ? 'bg-red-600 hover:bg-red-700' : ''}>
                <Icons.unlock className="w-4 h-4 mr-2" />
                Upgrade
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Inline variant - shown when trying to add favorite at limit
  if (variant === 'inline' && isAtLimit) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icons.alert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-1">
              Favorites Limit Reached
            </h3>
            <p className="text-sm text-red-800 mb-3">
              You've saved {FREE_FAVORITES_LIMIT} favorites (free plan limit).
              Upgrade to Pro to save unlimited products.
            </p>
            <Link href="/upgrade">
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Icons.unlock className="w-4 h-4 mr-2" />
                Upgrade to Pro - $5.99/month
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Progress indicator variant - compact for sidebar/header
  if (variant === 'compact') {
    return (
      <div className={cn(
        'px-3 py-2 rounded-lg text-sm',
        isAtLimit ? 'bg-red-50' : isNearLimit ? 'bg-yellow-50' : 'bg-gray-50'
      )}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">Favorites</span>
          <span className={cn(
            'text-xs font-semibold',
            isAtLimit ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-gray-900'
          )}>
            {favoritesCount} / {FREE_FAVORITES_LIMIT}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={cn(
              'h-1.5 rounded-full transition-all',
              isAtLimit ? 'bg-red-500' : isNearLimit ? 'bg-yellow-500' : 'bg-primary-500'
            )}
            style={{ width: `${(favoritesCount / FREE_FAVORITES_LIMIT) * 100}%` }}
          />
        </div>
        {isAtLimit && (
          <Link href="/upgrade">
            <button className="text-xs text-red-600 hover:text-red-700 font-medium mt-2">
              Upgrade for unlimited
            </button>
          </Link>
        )}
      </div>
    );
  }

  return null;
}

// Hook for checking if user can add more favorites
export function useCanAddFavorite() {
  const { isPro, favoritesCount } = useSubscription();

  const canAdd = isPro || favoritesCount < FREE_FAVORITES_LIMIT;
  const message = !canAdd
    ? `You've reached the free limit of ${FREE_FAVORITES_LIMIT} favorites. Upgrade to Pro for unlimited favorites.`
    : null;

  return { canAdd, message, limit: FREE_FAVORITES_LIMIT };
}
