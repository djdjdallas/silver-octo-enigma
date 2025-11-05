// Product actions component (favorite, share)
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { shareProduct } from '@/lib/utils';
import { useCanAddFavorite } from '@/components/FavoritesLimit';
import toast from 'react-hot-toast';

export default function ProductActions({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const supabase = createClient();
  const { canAdd, message } = useCanAddFavorite();

  useEffect(() => {
    async function checkFavorite() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from('user_favorites')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_id', product.id)
          .single();

        setIsFavorite(!!data);
      }
    }

    checkFavorite();
  }, [product.id]);

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast.error('Please login to save favorites');
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', product.id);

        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        // Check if user can add more favorites
        if (!canAdd) {
          toast.error(message);
          // Redirect to upgrade page after a short delay
          setTimeout(() => {
            router.push('/upgrade');
          }, 2000);
          return;
        }

        // Add to favorites
        await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            product_id: product.id,
          });

        setIsFavorite(true);
        toast.success('Added to favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const success = await shareProduct(product);
    if (success) {
      toast.success('Link copied to clipboard!');
    } else {
      toast.error('Failed to share');
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={handleFavoriteToggle}
        disabled={loading}
        className="flex-1"
      >
        {isFavorite ? (
          <>
            <Icons.heart className="w-4 h-4 mr-2 fill-red-500 text-red-500" />
            Saved
          </>
        ) : (
          <>
            <Icons.heart className="w-4 h-4 mr-2" />
            Save
          </>
        )}
      </Button>

      <Button variant="outline" onClick={handleShare} className="flex-1">
        <Icons.share className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  );
}
