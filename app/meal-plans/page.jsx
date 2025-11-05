// Weekly meal plans page (Pro feature)
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { getUserTier } from '@/lib/utils';
import { calculateAgeInMonths, formatAge, getAppropriateStages } from '@/lib/age-calculator';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export default function MealPlansPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [products, setProducts] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

      if (userError || !currentUser) {
        router.push('/login');
        return;
      }

      setUser(currentUser);

      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      setProfile(profileData);

      // Check if Pro user
      const userTier = getUserTier(profileData);
      if (userTier !== 'pro') {
        router.push('/upgrade');
        return;
      }

      // Load current week's meal plan
      const startOfWeek = getStartOfWeek(new Date());
      const { data: existingPlan } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('week_start', startOfWeek.toISOString().split('T')[0])
        .single();

      if (existingPlan) {
        setMealPlan(existingPlan);
      }

      // Load age-appropriate products
      if (profileData.baby_birthdate) {
        const ageInMonths = calculateAgeInMonths(profileData.baby_birthdate);
        const appropriateStages = getAppropriateStages(ageInMonths);

        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .in('stage', appropriateStages)
          .order('overall_score', { ascending: false, nullsLast: true })
          .limit(50);

        setProducts(productsData || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function generateMealPlan() {
    if (!profile.baby_birthdate) {
      toast.error('Please add your baby\'s birthdate in your profile first');
      router.push('/profile');
      return;
    }

    setGenerating(true);

    try {
      const ageInMonths = calculateAgeInMonths(profile.baby_birthdate);
      const appropriateStages = getAppropriateStages(ageInMonths);

      // Get top-rated age-appropriate products
      const { data: topProducts } = await supabase
        .from('products')
        .select('*')
        .in('stage', appropriateStages)
        .not('overall_score', 'is', null)
        .order('overall_score', { ascending: false })
        .limit(20);

      if (!topProducts || topProducts.length === 0) {
        toast.error('No products found for your baby\'s age');
        setGenerating(false);
        return;
      }

      // Generate meal plan with variety
      const meals = {};
      DAYS_OF_WEEK.forEach(day => {
        meals[day] = {};
        MEALS.forEach(mealType => {
          // Pick a random product, ensuring variety
          const randomProduct = topProducts[Math.floor(Math.random() * topProducts.length)];
          meals[day][mealType] = randomProduct.id;
        });
      });

      const startOfWeek = getStartOfWeek(new Date());

      // Save meal plan
      const { data: newPlan, error } = await supabase
        .from('meal_plans')
        .upsert({
          user_id: user.id,
          week_start: startOfWeek.toISOString().split('T')[0],
          baby_age_months: ageInMonths,
          meals,
        }, {
          onConflict: 'user_id,week_start'
        })
        .select()
        .single();

      if (error) throw error;

      setMealPlan(newPlan);
      toast.success('Meal plan generated!');
    } catch (error) {
      console.error('Error generating meal plan:', error);
      toast.error('Failed to generate meal plan');
    } finally {
      setGenerating(false);
    }
  }

  function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  }

  function getProductById(productId) {
    return products.find(p => p.id === productId);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <Icons.spinner className="w-12 h-12 text-gray-300 animate-spin" />
      </div>
    );
  }

  const ageInMonths = profile?.baby_birthdate ? calculateAgeInMonths(profile.baby_birthdate) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center">
                Weekly Meal Plans
                <Badge className="ml-3 bg-primary-500">
                  <Icons.award className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              </h1>
              <p className="text-gray-600">
                Personalized meal suggestions with the safest products for your baby
              </p>
              {ageInMonths !== null && (
                <p className="text-sm text-gray-500 mt-1">
                  {formatAge(ageInMonths)}
                </p>
              )}
            </div>

            <Button onClick={generateMealPlan} disabled={generating}>
              {generating ? (
                <>
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Icons.trending className="w-4 h-4 mr-2" />
                  {mealPlan ? 'Regenerate Plan' : 'Generate Plan'}
                </>
              )}
            </Button>
          </div>
        </div>

        {!profile?.baby_birthdate && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Icons.info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Add Baby's Birthdate</h3>
                  <p className="text-gray-700 mb-4">
                    To generate personalized meal plans, please add your baby's birthdate in your profile.
                  </p>
                  <Button asChild size="sm">
                    <Link href="/profile">Go to Profile</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Meal Plan */}
        {mealPlan ? (
          <div className="space-y-6">
            {/* Week Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icons.info className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Week of {new Date(mealPlan.week_start).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        All products selected based on safety scores and age-appropriateness
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Icons.download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Daily Meal Plan */}
            <div className="grid gap-6">
              {DAYS_OF_WEEK.map(day => {
                const dayMeals = mealPlan.meals[day] || {};

                return (
                  <Card key={day}>
                    <CardHeader>
                      <CardTitle className="text-lg">{day}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {MEALS.map(mealType => {
                          const productId = dayMeals[mealType];
                          const product = productId ? getProductById(productId) : null;

                          return (
                            <div key={mealType} className="space-y-2">
                              <p className="text-sm font-medium text-gray-700">{mealType}</p>

                              {product ? (
                                <Link href={`/product/${product.id}`}>
                                  <div className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="aspect-square relative bg-gray-100 rounded mb-2">
                                      {product.image_url ? (
                                        <Image
                                          src={product.image_url}
                                          alt={product.name}
                                          fill
                                          className="object-cover rounded"
                                          sizes="200px"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                          <Icons.package className="w-8 h-8 text-gray-300" />
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                                      {product.name}
                                    </p>
                                    <p className="text-xs text-gray-600">{product.brand}</p>
                                    {product.overall_score && (
                                      <div className="mt-2">
                                        <Badge className="bg-green-500 text-xs">
                                          Score: {product.overall_score}
                                        </Badge>
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              ) : (
                                <div className="border border-dashed rounded-lg p-3 text-center">
                                  <Icons.package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                  <p className="text-xs text-gray-500">No product</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Icons.trending className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Meal Plan Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Generate a personalized weekly meal plan with the safest products for your baby's age
              </p>
              <Button onClick={generateMealPlan} disabled={generating || !profile?.baby_birthdate}>
                {generating ? (
                  <>
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Icons.trending className="w-4 h-4 mr-2" />
                    Generate Meal Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Info */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Icons.info className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About Meal Plans</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Plans are personalized based on your baby's age and developmental stage</li>
                  <li>All products are selected from the safest options in our database</li>
                  <li>Variety is included to ensure balanced nutrition</li>
                  <li>Always consult with your pediatrician before introducing new foods</li>
                  <li>Regenerate your plan anytime for fresh suggestions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
