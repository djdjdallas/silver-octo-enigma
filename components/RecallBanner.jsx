// Banner to display active recalls for user's favorited products
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export default function RecallBanner({ userId }) {
  const [recalls, setRecalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    loadRecalls();
  }, [userId]);

  async function loadRecalls() {
    try {
      // Get user's favorited products with active recalls
      const { data: favorites } = await supabase
        .from('user_favorites')
        .select('product_id')
        .eq('user_id', userId);

      if (!favorites || favorites.length === 0) {
        setRecalls([]);
        setLoading(false);
        return;
      }

      const productIds = favorites.map(f => f.product_id);

      // Get active recalls for these products
      const { data: activeRecalls, error } = await supabase
        .from('recalls')
        .select(`
          *,
          products (
            id,
            name,
            brand,
            image_url
          )
        `)
        .in('product_id', productIds)
        .eq('is_active', true)
        .order('recall_date', { ascending: false });

      if (error) {
        console.error('Error loading recalls:', error);
      } else {
        setRecalls(activeRecalls || []);
      }
    } catch (error) {
      console.error('Error in loadRecalls:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || dismissed || recalls.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0">
            <Icons.alert className="w-6 h-6 text-red-600" />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 mb-1">
              Recall Alert{recalls.length > 1 ? 's' : ''}
            </h3>

            <p className="text-red-800 mb-3">
              {recalls.length === 1
                ? 'One of your favorited products has been recalled.'
                : `${recalls.length} of your favorited products have been recalled.`}
            </p>

            <div className="space-y-2 mb-4">
              {recalls.slice(0, 3).map((recall) => (
                <div key={recall.id} className="bg-white rounded p-3 border border-red-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {recall.products?.name}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">{recall.reason}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-600">
                          {new Date(recall.recall_date).toLocaleDateString()}
                        </span>
                        {recall.risk_level && (
                          <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
                            {recall.risk_level}
                          </span>
                        )}
                      </div>
                    </div>

                    {recall.fda_url && (
                      <a
                        href={recall.fda_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 text-red-600 hover:text-red-700 flex-shrink-0"
                      >
                        <Icons.external className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Button asChild size="sm" variant="destructive">
                <Link href="/recalls">
                  View All Recalls
                  {recalls.length > 3 && ` (${recalls.length})`}
                </Link>
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setDismissed(true)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 ml-4 text-red-600 hover:text-red-700"
          aria-label="Dismiss"
        >
          <Icons.close className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
