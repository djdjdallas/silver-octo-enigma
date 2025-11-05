// User dashboard with favorites and subscription status
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import ProductCard from '@/components/ProductCard';
import FavoritesLimit from '@/components/FavoritesLimit';
import { formatDate, getUserTier, isSubscriptionActive } from '@/lib/utils';
import LogoutButton from './LogoutButton';
import DashboardClient from './DashboardClient';

export const metadata = {
  title: 'Dashboard | SafeBaby',
  description: 'Manage your account, view favorites, and track your subscription',
};

async function getUserData() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get favorites with product data
  const { data: favorites } = await supabase
    .from('user_favorites')
    .select(`
      *,
      products (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return {
    user,
    profile,
    favorites: favorites || [],
  };
}

export default async function DashboardPage() {
  const { user, profile, favorites } = await getUserData();
  const userTier = getUserTier(profile);
  const isPro = userTier === 'pro';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user.email}
          </p>
        </div>

        {/* Recall Banner */}
        <DashboardClient userId={user.id} />

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Subscription Card */}
          <Card className={isPro ? 'border-2 border-primary-500' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Subscription</span>
                {isPro ? (
                  <Badge className="bg-primary-500">
                    <Icons.award className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                ) : (
                  <Badge variant="secondary">Free</Badge>
                )}
              </CardTitle>
              <CardDescription>
                {isPro ? 'Pro Member' : 'Free Plan'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isPro ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Icons.checkmark className="w-4 h-4 text-green-600" />
                    <span>Full safety scores</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icons.checkmark className="w-4 h-4 text-green-600" />
                    <span>Product rankings</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icons.checkmark className="w-4 h-4 text-green-600" />
                    <span>Advanced filters</span>
                  </div>
                  {profile?.subscription_expires_at && (
                    <p className="text-xs text-gray-600 mt-4">
                      Renews: {formatDate(profile.subscription_expires_at)}
                    </p>
                  )}
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Icons.settings className="w-4 h-4 mr-2" />
                    Manage Subscription
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Upgrade to Pro to unlock safety scores and rankings
                  </p>
                  <Link href="/upgrade">
                    <Button className="w-full">
                      <Icons.award className="w-4 h-4 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Activity</CardTitle>
              <CardDescription>Quick stats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icons.heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm">Favorites</span>
                  </div>
                  <span className="text-2xl font-bold">{favorites.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icons.scan className="w-5 h-5 text-primary-500" />
                    <span className="text-sm">Scans</span>
                  </div>
                  <span className="text-2xl font-bold">-</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/scan">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Icons.scan className="w-4 h-4 mr-2" />
                    Scan Product
                  </Button>
                </Link>
                <Link href="/search">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Icons.search className="w-4 h-4 mr-2" />
                    Search Products
                  </Button>
                </Link>
                <Link href="/compare">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Icons.filter className="w-4 h-4 mr-2" />
                    Compare Products
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Icons.settings className="w-4 h-4 mr-2" />
                    Profile Settings
                  </Button>
                </Link>
                {isPro && (
                  <Link href="/meal-plans">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Icons.trending className="w-4 h-4 mr-2" />
                      Meal Plans
                    </Button>
                  </Link>
                )}
                <LogoutButton />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Favorites Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Your Favorites
              </h2>
              <p className="text-gray-600">
                Products you've bookmarked
              </p>
            </div>
          </div>

          {/* Favorites Limit Banner */}
          <FavoritesLimit variant="banner" />

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => (
                <ProductCard
                  key={favorite.product_id}
                  product={favorite.products}
                  userTier={userTier}
                  showScore={true}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Icons.heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start adding products to your favorites to see them here
                </p>
                <Link href="/search">
                  <Button>
                    <Icons.search className="w-4 h-4 mr-2" />
                    Browse Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Member Since</label>
                <p className="text-gray-900">{formatDate(user.created_at)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
