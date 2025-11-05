// Product selector component for adding products to comparison
'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { debounce } from '@/lib/utils';
import Image from 'next/image';

export default function ProductSelector({ selectedProducts, onProductSelect, onProductRemove, maxProducts = 4 }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const supabase = createClient();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search products
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const searchProducts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('products')
        .select('id, name, brand, category, image_url, overall_score')
        .or(`name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%`)
        .order('overall_score', { ascending: false, nullsLast: true })
        .limit(8);

      if (error) {
        console.error('Error searching products:', error);
      } else {
        // Filter out already selected products
        const filtered = (data || []).filter(
          p => !selectedProducts.find(sp => sp.id === p.id)
        );
        setSearchResults(filtered);
        setShowResults(true);
      }

      setLoading(false);
    };

    const debouncedSearch = debounce(searchProducts, 300);
    debouncedSearch();
  }, [searchQuery, selectedProducts]);

  const handleProductSelect = (product) => {
    onProductSelect(product);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const canAddMore = selectedProducts.length < maxProducts;

  return (
    <div className="space-y-4">
      {/* Search Input */}
      {canAddMore && (
        <div className="relative" ref={searchRef}>
          <div className="relative">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products to add..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              className="pl-10"
            />
            {loading && (
              <Icons.spinner className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
            )}
          </div>

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <Card className="absolute z-10 w-full mt-2 max-h-96 overflow-y-auto">
              <CardContent className="p-0">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="w-full p-3 hover:bg-gray-50 flex items-center space-x-3 border-b last:border-b-0 text-left"
                  >
                    <div className="w-12 h-12 relative bg-gray-100 rounded flex-shrink-0">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                          sizes="48px"
                        />
                      ) : (
                        <Icons.package className="w-6 h-6 text-gray-300 m-auto" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.brand}</p>
                    </div>
                    {product.category && (
                      <Badge variant="secondary" className="capitalize flex-shrink-0">
                        {product.category}
                      </Badge>
                    )}
                  </button>
                ))}
              </CardContent>
            </Card>
          )}

          {showResults && searchQuery && searchResults.length === 0 && !loading && (
            <Card className="absolute z-10 w-full mt-2">
              <CardContent className="p-6 text-center">
                <p className="text-gray-600">No products found</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Selected Products */}
      {selectedProducts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              Selected Products ({selectedProducts.length}/{maxProducts})
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedProducts.map((product, index) => (
              <Card key={product.id} className="relative">
                <CardContent className="p-3">
                  <button
                    onClick={() => onProductRemove(product.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                    aria-label="Remove product"
                  >
                    <Icons.close className="w-4 h-4" />
                  </button>

                  <div className="flex items-start space-x-3 pr-8">
                    <div className="w-16 h-16 relative bg-gray-100 rounded flex-shrink-0">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                          sizes="64px"
                        />
                      ) : (
                        <Icons.package className="w-8 h-8 text-gray-300 m-auto" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 line-clamp-2 text-sm">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{product.brand}</p>
                      {product.category && (
                        <Badge variant="secondary" className="capitalize text-xs mt-2">
                          {product.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add via barcode scan */}
      {canAddMore && (
        <div className="text-center py-4 border-t">
          <p className="text-sm text-gray-600 mb-2">or</p>
          <Button variant="outline" size="sm" asChild>
            <a href="/scan">
              <Icons.scan className="w-4 h-4 mr-2" />
              Scan Barcode to Add
            </a>
          </Button>
        </div>
      )}

      {!canAddMore && (
        <div className="text-center py-2">
          <p className="text-sm text-gray-600">
            Maximum of {maxProducts} products reached
          </p>
        </div>
      )}
    </div>
  );
}
