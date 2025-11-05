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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Search Products
          </h1>
          <p className="text-gray-600">
            Browse {displayedProducts.length} baby food products with lab test results
          </p>
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
        <Card className="mb-8">
          <CardContent className="p-6">
            {/* Search bar */}
            <div className="relative mb-6">
              <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by product name, brand, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category filters */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
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
          <Card>
            <CardContent className="p-12 text-center">
              <Icons.search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
