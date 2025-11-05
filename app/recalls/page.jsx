// Active recalls page
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function RecallsPage() {
  const [recalls, setRecalls] = useState([]);
  const [userFavorites, setUserFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [filterAffected, setFilterAffected] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // Load user favorites if logged in
      if (user) {
        const { data: favorites } = await supabase
          .from('user_favorites')
          .select('product_id')
          .eq('user_id', user.id);

        if (favorites) {
          setUserFavorites(new Set(favorites.map(f => f.product_id)));
        }
      }

      // Load all active recalls
      const { data: recallsData, error } = await supabase
        .from('recalls')
        .select(`
          *,
          products (
            id,
            name,
            brand,
            image_url,
            category
          )
        `)
        .eq('is_active', true)
        .order('recall_date', { ascending: false });

      if (error) {
        console.error('Error loading recalls:', error);
      } else {
        setRecalls(recallsData || []);
      }
    } catch (error) {
      console.error('Error in loadData:', error);
    } finally {
      setLoading(false);
    }
  }

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Class I':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Class II':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Class III':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevelDescription = (riskLevel) => {
    switch (riskLevel) {
      case 'Class I':
        return 'Dangerous or defective products that could cause serious health problems or death';
      case 'Class II':
        return 'Products that might cause temporary health problems or pose slight threat of serious nature';
      case 'Class III':
        return 'Products unlikely to cause adverse health reaction but violate FDA labeling or regulations';
      default:
        return '';
    }
  };

  const filteredRecalls = filterAffected
    ? recalls.filter(recall => userFavorites.has(recall.product_id))
    : recalls;

  const affectedCount = recalls.filter(recall => userFavorites.has(recall.product_id)).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Product Recalls
          </h1>
          <p className="text-gray-600">
            Active FDA recalls for baby food products
          </p>
        </div>

        {/* Alert Info */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About Recall Classifications</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong className="text-red-600">Class I:</strong>{' '}
                    {getRiskLevelDescription('Class I')}
                  </p>
                  <p>
                    <strong className="text-orange-600">Class II:</strong>{' '}
                    {getRiskLevelDescription('Class II')}
                  </p>
                  <p>
                    <strong className="text-yellow-600">Class III:</strong>{' '}
                    {getRiskLevelDescription('Class III')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        {userFavorites.size > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Filter:</span>
                  <Button
                    variant={filterAffected ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterAffected(!filterAffected)}
                  >
                    <Icons.alert className="w-4 h-4 mr-2" />
                    My Favorites Only
                    {affectedCount > 0 && (
                      <Badge className="ml-2 bg-red-500">{affectedCount}</Badge>
                    )}
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  {filteredRecalls.length} {filteredRecalls.length === 1 ? 'recall' : 'recalls'}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recalls List */}
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Icons.spinner className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Loading recalls...</p>
            </CardContent>
          </Card>
        ) : filteredRecalls.length > 0 ? (
          <div className="space-y-4">
            {filteredRecalls.map((recall) => {
              const isAffected = userFavorites.has(recall.product_id);

              return (
                <Card
                  key={recall.id}
                  className={isAffected ? 'border-2 border-red-500' : ''}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="w-full md:w-32 h-32 flex-shrink-0">
                        <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                          {recall.products?.image_url ? (
                            <Image
                              src={recall.products.image_url}
                              alt={recall.products.name}
                              fill
                              className="object-cover"
                              sizes="128px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Icons.package className="w-12 h-12 text-gray-300" />
                            </div>
                          )}

                          {isAffected && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-red-500">
                                <Icons.alert className="w-3 h-3 mr-1" />
                                Favorited
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Recall Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              <Link
                                href={`/product/${recall.products?.id}`}
                                className="hover:text-primary-500"
                              >
                                {recall.products?.name}
                              </Link>
                            </h3>
                            {recall.products?.brand && (
                              <p className="text-gray-600">{recall.products.brand}</p>
                            )}
                          </div>

                          <Badge className={getRiskLevelColor(recall.risk_level)}>
                            {recall.risk_level}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Reason for Recall:</h4>
                            <p className="text-gray-700">{recall.reason}</p>
                          </div>

                          {recall.description && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">Details:</h4>
                              <p className="text-gray-700 text-sm">{recall.description}</p>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-4 pt-3 border-t">
                            <div className="text-sm text-gray-600">
                              <Icons.alert className="w-4 h-4 inline mr-1" />
                              Recalled: {formatDate(recall.recall_date)}
                            </div>

                            {recall.products?.category && (
                              <Badge variant="secondary" className="capitalize">
                                {recall.products.category}
                              </Badge>
                            )}

                            {recall.fda_url && (
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                              >
                                <a
                                  href={recall.fda_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Icons.external className="w-4 h-4 mr-2" />
                                  FDA Notice
                                </a>
                              </Button>
                            )}

                            <Button asChild size="sm" variant="outline">
                              <Link href={`/product/${recall.products?.id}`}>
                                View Product
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Icons.checkmark className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {filterAffected ? 'No Recalls for Your Favorites' : 'No Active Recalls'}
              </h3>
              <p className="text-gray-600 mb-6">
                {filterAffected
                  ? 'Good news! None of your favorited products have active recalls.'
                  : 'There are currently no active recalls for baby food products.'}
              </p>
              {filterAffected && (
                <Button onClick={() => setFilterAffected(false)} variant="outline">
                  View All Recalls
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Stay Informed */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Icons.bell className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Stay Informed About Recalls</h3>
                <p className="text-gray-700 mb-4">
                  Get instant notifications when products you've favorited are recalled.
                  Free tier users receive email alerts, while Pro members get instant push notifications and SMS.
                </p>
                <div className="flex space-x-3">
                  <Button asChild size="sm">
                    <Link href="/dashboard">
                      Manage Notification Settings
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/upgrade">
                      <Icons.award className="w-4 h-4 mr-2" />
                      Upgrade to Pro
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
