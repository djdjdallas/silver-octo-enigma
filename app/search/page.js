// Product search page with filters
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import ProductCard from '@/components/ProductCard';
import AgeFilter from '@/components/AgeFilter';
import { debounce } from '@/lib/utils';
import { calculateAgeInMonths, isProductAgeAppropriate } from '@/lib/age-calculator';
import {
  CircleDecoration,
  FruitIllustration,
} from '@/components/DecorativeElements';

const CATEGORIES = ['all', 'cereal', 'puree', 'snack', 'juice', 'formula', 'teething', 'other'];

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userProfile, setUserProfile] = useState(null);
  const [ageFilterActive, setAgeFilterActive] = useState(false);
  const supabase = createClient();

  // Get user profile to determine tier
  useEffect(() => {
    async function loadUserProfile() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setUserProfile(profile);
      }
    }

    loadUserProfile();
  }, []);

  // Search products
  useEffect(() => {
    const searchProducts = async () => {
      setLoading(true);

      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply category filter
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      // Apply search filter
      if (searchQuery.trim()) {
        query = query.or(
          `name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    // Debounce search
    const debouncedSearch = debounce(searchProducts, 300);
    debouncedSearch();
  }, [searchQuery, selectedCategory]);

  const userTier = userProfile?.subscription_tier || 'free';
  const ageInMonths = userProfile?.baby_birthdate ? calculateAgeInMonths(userProfile.baby_birthdate) : null;

  // Filter products by age if active
  const displayedProducts = ageFilterActive && ageInMonths !== null
    ? products.filter(product => isProductAgeAppropriate(product, ageInMonths))
    : products;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-coral-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-20 z-0">
        <FruitIllustration type="apple" className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 z-0">
        <FruitIllustration type="pear" className="w-12 h-12 md:w-20 md:h-20" />
      </div>
      <CircleDecoration className="absolute top-60 left-20 w-32 h-32 opacity-10 z-0" color="butter" />
      <CircleDecoration className="absolute bottom-40 right-20 w-24 h-24 opacity-10 z-0" color="lavender" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 bg-white rounded-3xl shadow-lg p-8 md:p-10 border-2 border-primary-100 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary-200 to-coral-200 rounded-full opacity-30 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-butter-200 to-lavender-200 rounded-full opacity-30 blur-2xl" />

          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
              Search Products 🔍
            </h1>
            <p className="text-lg text-gray-600">
              Browse {displayedProducts.length} baby food products with lab test results
            </p>
          </div>
        </div>

        {/* Age Filter */}
        {userProfile && (
          <div className="mb-6">
            <AgeFilter
              babyBirthdate={userProfile.baby_birthdate}
              ageInMonths={ageInMonths}
              onToggle={() => setAgeFilterActive(!ageFilterActive)}
              isActive={ageFilterActive}
            />
          </div>
        )}

        {/* Search and Filters */}
        <Card className="mb-8 rounded-3xl border-0 shadow-xl bg-white">
          <CardContent className="p-8">
            {/* Search bar */}
            <div className="relative mb-6">
              <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by product name, brand, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full border-2 text-lg"
              />
            </div>

            {/* Category filters */}
            <div>
              <label className="text-base font-bold text-gray-700 mb-3 block">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="default"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'capitalize rounded-full bg-coral hover:bg-coral-600' : 'capitalize rounded-full border-2'}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                userTier={userTier}
                showScore={true}
              />
            ))}
          </div>
        ) : (
          // No results
          <Card className="rounded-3xl border-0 shadow-xl bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-100 to-coral-100 rounded-full opacity-30 -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-lavender-100 to-butter-100 rounded-full opacity-30 -ml-16 -mb-16" />

            <CardContent className="p-12 md:p-16 text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icons.search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                No products found
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Try adjusting your search or filters
              </p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="bg-coral hover:bg-coral-600 rounded-full px-8 shadow-lg">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
