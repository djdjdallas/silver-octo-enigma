// Active recalls page
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { formatDate } from '@/lib/utils';
import {
  CircleDecoration,
  FruitIllustration,
} from '@/components/DecorativeElements';
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-coral-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-20 z-0">
        <FruitIllustration type="carrot" className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 z-0">
        <FruitIllustration type="pear" className="w-12 h-12 md:w-20 md:h-20" />
      </div>
      <CircleDecoration className="absolute top-60 right-20 w-32 h-32 opacity-10 z-0" color="coral" />
      <CircleDecoration className="absolute bottom-40 left-20 w-24 h-24 opacity-10 z-0" color="lavender" />

      <div className="container mx-auto px-4 max-w-6xl py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 bg-white rounded-3xl shadow-lg p-8 md:p-10 border-2 border-red-100 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-red-200 to-coral-200 rounded-full opacity-30 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 blur-2xl" />

          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
              Product Recalls ⚠️
            </h1>
            <p className="text-lg text-gray-600">
              Active FDA recalls for baby food products
            </p>
          </div>
        </div>

        {/* Alert Info */}
        <Card className="mb-6 rounded-3xl border-0 shadow-xl bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 rounded-full opacity-20 -mr-16 -mt-16" />
          <CardContent className="p-8 relative z-10">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Icons.info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-xl">About Recall Classifications</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-2xl shadow-sm">
                    <strong className="text-red-600 text-base">Class I:</strong>{' '}
                    <span className="text-gray-700">{getRiskLevelDescription('Class I')}</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm">
                    <strong className="text-orange-600 text-base">Class II:</strong>{' '}
                    <span className="text-gray-700">{getRiskLevelDescription('Class II')}</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm">
                    <strong className="text-yellow-600 text-base">Class III:</strong>{' '}
                    <span className="text-gray-700">{getRiskLevelDescription('Class III')}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        {userFavorites.size > 0 && (
          <Card className="mb-6 rounded-3xl border-0 shadow-xl bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Filter:</span>
                  <Button
                    variant={filterAffected ? 'default' : 'outline'}
                    size="default"
                    onClick={() => setFilterAffected(!filterAffected)}
                    className={filterAffected ? 'bg-red-500 hover:bg-red-600 rounded-full' : 'rounded-full border-2'}
                  >
                    <Icons.alert className="w-4 h-4 mr-2" />
                    My Favorites Only
                    {affectedCount > 0 && (
                      <Badge className="ml-2 bg-red-600">{affectedCount}</Badge>
                    )}
                  </Button>
                </div>

                <div className="text-base font-medium text-gray-600">
                  {filteredRecalls.length} {filteredRecalls.length === 1 ? 'recall' : 'recalls'}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recalls List */}
        {loading ? (
          <Card className="rounded-3xl border-0 shadow-xl bg-white">
            <CardContent className="p-16 text-center">
              <Icons.spinner className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-spin" />
              <p className="text-lg text-gray-600">Loading recalls...</p>
            </CardContent>
          </Card>
        ) : filteredRecalls.length > 0 ? (
          <div className="space-y-6">
            {filteredRecalls.map((recall) => {
              const isAffected = userFavorites.has(recall.product_id);

              return (
                <Card
                  key={recall.id}
                  className={`rounded-3xl border-0 shadow-xl transition-all hover:scale-102 ${isAffected ? 'border-2 border-red-500 bg-red-50' : 'bg-white'}`}
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
          <Card className="rounded-3xl border-0 shadow-xl bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-100 to-primary-100 rounded-full opacity-30 -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-lavender-100 to-butter-100 rounded-full opacity-30 -ml-16 -mb-16" />

            <CardContent className="p-12 md:p-16 text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icons.checkmark className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {filterAffected ? 'No Recalls for Your Favorites' : 'No Active Recalls'}
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                {filterAffected
                  ? 'Good news! None of your favorited products have active recalls.'
                  : 'There are currently no active recalls for baby food products.'}
              </p>
              {filterAffected && (
                <Button onClick={() => setFilterAffected(false)} className="bg-primary hover:bg-primary-600 rounded-full px-8">
                  View All Recalls
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Stay Informed */}
        <Card className="mt-8 rounded-3xl border-0 shadow-xl bg-gradient-to-br from-lavender-50 to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lavender-300 rounded-full opacity-20 -mr-16 -mt-16" />
          <CardContent className="p-8 relative z-10">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                <Icons.bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-xl">Stay Informed About Recalls</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Get instant notifications when products you've favorited are recalled.
                  Free tier users receive email alerts, while Pro members get instant push notifications and SMS.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Button asChild className="bg-primary hover:bg-primary-600 rounded-full">
                    <Link href="/dashboard" className="flex items-center">
                      Manage Notification Settings
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-2">
                    <Link href="/upgrade" className="flex items-center">
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
