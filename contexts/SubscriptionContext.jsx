// Subscription Context for managing user subscription state across the app
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getUserTier } from '@/lib/utils';

const SubscriptionContext = createContext({
  isPro: false,
  isFreeTrial: false,
  scansCount: 0,
  favoritesCount: 0,
  profile: null,
  user: null,
  loading: true,
  incrementScanCount: () => {},
  resetScanCount: () => {},
  refreshSubscription: async () => {},
});

export function SubscriptionProvider({ children }) {
  const [isPro, setIsPro] = useState(false);
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [scansCount, setScansCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  // Load scan count from localStorage
  useEffect(() => {
    const storedCount = localStorage.getItem('safebaby_scan_count');
    if (storedCount) {
      setScansCount(parseInt(storedCount, 10));
    }
  }, []);

  // Fetch user subscription data
  const refreshSubscription = async () => {
    try {
      setLoading(true);

      // Get current user
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      if (!currentUser) {
        setIsPro(false);
        setIsFreeTrial(false);
        setProfile(null);
        setFavoritesCount(0);
        setLoading(false);
        return;
      }

      // Get user profile
      const { data: userProfile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      setProfile(userProfile);

      // Determine subscription status
      const tier = getUserTier(userProfile);
      setIsPro(tier === 'pro');
      setIsFreeTrial(userProfile?.subscription_tier === 'trial');

      // Get favorites count
      const { count } = await supabase
        .from('user_favorites')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', currentUser.id);

      setFavoritesCount(count || 0);
    } catch (error) {
      console.error('Error fetching subscription data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    refreshSubscription();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      refreshSubscription();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Increment scan count
  const incrementScanCount = () => {
    const newCount = scansCount + 1;
    setScansCount(newCount);
    localStorage.setItem('safebaby_scan_count', newCount.toString());
  };

  // Reset scan count (e.g., after showing upgrade modal)
  const resetScanCount = () => {
    setScansCount(0);
    localStorage.setItem('safebaby_scan_count', '0');
  };

  const value = {
    isPro,
    isFreeTrial,
    scansCount,
    favoritesCount,
    profile,
    user,
    loading,
    incrementScanCount,
    resetScanCount,
    refreshSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
