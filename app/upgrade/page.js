// Upgrade/pricing page with Stripe integration
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { formatCurrency, getUserTier } from '@/lib/utils';
import toast from 'react-hot-toast';

const PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 5.99,
    interval: 'month',
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    description: '7-day free trial, then billed monthly',
    savings: null,
    trial: '7-day free trial',
  },
  {
    id: 'annual',
    name: 'Annual',
    price: 59.99,
    interval: 'year',
    priceId: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
    description: 'Billed yearly',
    savings: '17% off',
    popular: true,
  },
  {
    id: 'lifetime',
    name: 'Lifetime Access',
    price: 149.99,
    interval: 'one-time',
    priceId: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID,
    description: 'Pay once, own forever',
    savings: 'Best Value',
    badge: 'Most Popular',
  },
];

const PRO_FEATURES = [
  {
    icon: 'award',
    title: 'Overall Safety Scores',
    description: 'See comprehensive 0-100 safety ratings for every product',
  },
  {
    icon: 'trending',
    title: 'Product Rankings',
    description: 'Compare products and find the safest options in each category',
  },
  {
    icon: 'filter',
    title: 'Advanced Filtering',
    description: 'Filter by score, contaminant levels, and more',
  },
  {
    icon: 'bell',
    title: 'Alert Notifications',
    description: 'Get notified when new test results are available',
  },
  {
    icon: 'download',
    title: 'Export Reports',
    description: 'Download detailed safety reports for your records',
  },
  {
    icon: 'shield',
    title: 'Priority Support',
    description: 'Get help from our team when you need it',
  },
];

export default function UpgradePage() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setUserProfile(profile);
      }
    }

    loadUser();
  }, []);

  const userTier = getUserTier(userProfile);
  const isPro = userTier === 'pro';

  const handleSubscribe = async (plan) => {
    if (!user) {
      toast.error('Please login to subscribe');
      router.push('/login');
      return;
    }

    if (isPro) {
      toast('You already have an active subscription');
      return;
    }

    setLoading(true);

    try {
      // Determine checkout mode based on plan interval
      const checkoutMode = plan.interval === 'one-time' ? 'payment' : 'subscription';

      // Call API to create Stripe checkout session
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          userId: user.id,
          email: user.email,
          mode: checkoutMode,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start checkout');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          {isPro && (
            <Badge className="bg-primary-500 mb-4">
              <Icons.award className="w-3 h-3 mr-1" />
              You're a Pro Member
            </Badge>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unlock Full Safety Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upgrade to Pro and get access to comprehensive safety scores, rankings, and personalized recommendations
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular || plan.badge ? 'border-2 border-primary-500 shadow-lg' : ''
              } ${selectedPlan === plan.id ? 'ring-2 ring-primary-500' : ''}`}
            >
              {(plan.popular || plan.badge) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary-500">{plan.badge || 'Most Popular'}</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>

                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-gray-600 ml-2">/{plan.interval}</span>
                  </div>
                  {plan.trial && (
                    <Badge variant="success" className="mt-3">
                      {plan.trial}
                    </Badge>
                  )}
                  {plan.savings && !plan.trial && (
                    <Badge variant="success" className="mt-3">
                      {plan.savings}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <Button
                  className="w-full mb-6"
                  size="lg"
                  disabled={loading || isPro}
                  onClick={() => handleSubscribe(plan)}
                  variant={selectedPlan === plan.id ? 'default' : 'outline'}
                >
                  {loading ? (
                    <>
                      <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : isPro ? (
                    'Current Plan'
                  ) : plan.trial ? (
                    'Start Free Trial'
                  ) : (
                    `Subscribe ${plan.name}`
                  )}
                </Button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Icons.checkmark className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>All free features included</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icons.checkmark className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Overall safety scores</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icons.checkmark className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Product rankings</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icons.checkmark className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Advanced filtering</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icons.checkmark className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            What's Included in Pro
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Get all the tools you need to make the safest choices for your baby
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRO_FEATURES.map((feature, index) => {
              const IconComponent = Icons[feature.icon];
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How does the 7-day free trial work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Start your monthly subscription with a 7-day free trial. You won't be charged during
                  the trial period. Cancel anytime before the trial ends to avoid being charged. If you
                  love it, do nothing and your subscription will continue automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! You can cancel your subscription at any time from your dashboard.
                  You'll continue to have access until the end of your billing period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We accept all major credit cards (Visa, Mastercard, American Express, Discover)
                  through our secure payment processor, Stripe.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are lab results still free?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely! All detailed lab results and contaminant data remain 100% free for everyone.
                  Pro membership adds overall scores, rankings, and advanced features.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How are safety scores calculated?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our scores are based on independent lab test results, considering the levels of heavy metals
                  detected compared to FDA and EPA safety limits, as well as recommendations from pediatric health experts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
