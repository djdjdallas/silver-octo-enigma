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
import {
  CircleDecoration,
  WaveDecoration,
  FruitIllustration,
  LeafDecoration
} from '@/components/DecorativeElements';
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-coral-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-20 z-0">
        <FruitIllustration type="banana" className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <div className="absolute top-40 right-20 opacity-20 z-0">
        <FruitIllustration type="apple" className="w-12 h-12 md:w-20 md:h-20" />
      </div>
      <CircleDecoration className="absolute bottom-40 left-10 w-32 h-32 opacity-10 z-0" color="lavender" />
      <CircleDecoration className="absolute top-60 right-10 w-24 h-24 opacity-10 z-0" color="butter" />

      <div className="container mx-auto px-4 max-w-7xl py-8 relative z-10">
        {/* Header with decorative background */}
        <div className="mb-8 bg-white rounded-3xl shadow-lg p-8 md:p-10 border-2 border-primary-100 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-coral-200 to-primary-200 rounded-full opacity-30 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-butter-200 to-lavender-200 rounded-full opacity-30 blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
                  Welcome Back! 👋
                </h1>
                <p className="text-lg text-gray-600">
                  {user.email}
                </p>
              </div>
              {isPro && (
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                  <Icons.award className="w-6 h-6" />
                  <span className="font-bold text-lg">Pro Member</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recall Banner */}
        <DashboardClient userId={user.id} />

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Subscription Card */}
          <Card className={`rounded-3xl border-0 shadow-xl relative overflow-hidden transform transition-all hover:scale-105 ${isPro ? 'bg-gradient-to-br from-primary-50 to-primary-100' : 'bg-white'}`}>
            {isPro && (
              <>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-400 rounded-full opacity-20 -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-300 rounded-full opacity-20 -ml-12 -mb-12" />
              </>
            )}
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                  <Icons.shield className="w-7 h-7 text-white" />
                </div>
                {isPro ? (
                  <Badge className="bg-primary-500 text-white px-4 py-1.5 text-sm">
                    <Icons.award className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="px-4 py-1.5">Free</Badge>
                )}
              </div>
              <CardTitle className="text-2xl">Subscription</CardTitle>
              <CardDescription className="text-base">
                {isPro ? 'Pro Member' : 'Free Plan'}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              {isPro ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Icons.checkmark className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium">Full safety scores</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Icons.checkmark className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium">Product rankings</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Icons.checkmark className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium">Advanced filters</span>
                  </div>
                  {profile?.subscription_expires_at && (
                    <div className="mt-4 pt-4 border-t border-primary-200">
                      <p className="text-xs text-gray-700 font-medium">
                        Renews: {formatDate(profile.subscription_expires_at)}
                      </p>
                    </div>
                  )}
                  <Button variant="outline" size="default" className="w-full mt-4 border-2 border-primary-300 hover:bg-primary-500 hover:text-white rounded-full">
                    <Icons.settings className="w-4 h-4 mr-2" />
                    Manage Subscription
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Unlock detailed safety scores, product rankings, and advanced filtering
                  </p>
                  <Link href="/upgrade">
                    <Button className="w-full bg-coral hover:bg-coral-600 rounded-full shadow-lg">
                      <Icons.award className="w-4 h-4 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-br from-coral-50 to-butter-50 relative overflow-hidden transform transition-all hover:scale-105">
            <div className="absolute top-0 right-0 w-24 h-24 bg-coral-300 rounded-full opacity-20 -mr-12 -mt-12" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-butter-400 rounded-full opacity-20 -ml-16 -mb-16" />

            <CardHeader className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center shadow-lg mb-2">
                <Icons.trending className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-2xl">Your Activity</CardTitle>
              <CardDescription className="text-base">Quick stats</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <Icons.heart className="w-6 h-6 text-red-500" />
                    </div>
                    <span className="font-medium">Favorites</span>
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{favorites.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <Icons.scan className="w-6 h-6 text-primary-500" />
                    </div>
                    <span className="font-medium">Scans</span>
                  </div>
                  <span className="text-3xl font-bold text-gray-900">-</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-br from-lavender-50 to-primary-50 relative overflow-hidden transform transition-all hover:scale-105">
            <div className="absolute top-0 right-0 w-28 h-28 bg-lavender-300 rounded-full opacity-20 -mr-14 -mt-14" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-300 rounded-full opacity-20 -ml-12 -mb-12" />

            <CardHeader className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-lavender-400 to-lavender-600 flex items-center justify-center shadow-lg mb-2">
                <Icons.settings className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-2xl">Quick Actions</CardTitle>
              <CardDescription className="text-base">Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex flex-col gap-4">
                <Link href="/scan">
                  <Button variant="outline" size="default" className="w-full justify-start border-2 hover:bg-primary-500 hover:text-white hover:border-primary-500 rounded-full py-6">
                    <Icons.scan className="w-5 h-5 mr-3" />
                    Scan Product
                  </Button>
                </Link>
                <Link href="/search">
                  <Button variant="outline" size="default" className="w-full justify-start border-2 hover:bg-primary-500 hover:text-white hover:border-primary-500 rounded-full py-6">
                    <Icons.search className="w-5 h-5 mr-3" />
                    Search Products
                  </Button>
                </Link>
                <Link href="/compare">
                  <Button variant="outline" size="default" className="w-full justify-start border-2 hover:bg-primary-500 hover:text-white hover:border-primary-500 rounded-full py-6">
                    <Icons.filter className="w-5 h-5 mr-3" />
                    Compare Products
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" size="default" className="w-full justify-start border-2 hover:bg-primary-500 hover:text-white hover:border-primary-500 rounded-full py-6">
                    <Icons.settings className="w-5 h-5 mr-3" />
                    Profile Settings
                  </Button>
                </Link>
                {isPro && (
                  <Link href="/meal-plans">
                    <Button variant="outline" size="default" className="w-full justify-start border-2 hover:bg-primary-500 hover:text-white hover:border-primary-500 rounded-full py-6">
                      <Icons.trending className="w-5 h-5 mr-3" />
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
        <div className="mb-8 relative">
          <div className="absolute -top-10 -left-10 opacity-10">
            <FruitIllustration type="pear" className="w-24 h-24" />
          </div>

          <div className="flex items-center justify-between mb-6 relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Your Favorites ❤️
              </h2>
              <p className="text-lg text-gray-600">
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
            <Card className="rounded-3xl border-0 shadow-xl bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-100 to-coral-100 rounded-full opacity-30 -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-lavender-100 rounded-full opacity-30 -ml-16 -mb-16" />

              <CardContent className="p-12 md:p-16 text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-coral-100 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Icons.heart className="w-12 h-12 text-coral" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  No favorites yet
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                  Start adding products to your favorites to see them here
                </p>
                <Link href="/search">
                  <Button className="bg-coral hover:bg-coral-600 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                    <Icons.search className="w-5 h-5 mr-2" />
                    Browse Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Account Settings */}
        <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-br from-butter-50 to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-butter-300 rounded-full opacity-20 -mr-16 -mt-16" />

          <CardHeader className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-butter-400 to-butter-600 flex items-center justify-center shadow-lg mb-2">
              <Icons.baby className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-2xl">Account Settings</CardTitle>
            <CardDescription className="text-base">Manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-white rounded-2xl shadow-sm">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Email</label>
                <p className="text-lg font-medium text-gray-900">{user.email}</p>
              </div>
              <div className="p-5 bg-white rounded-2xl shadow-sm">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Member Since</label>
                <p className="text-lg font-medium text-gray-900">{formatDate(user.created_at)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
