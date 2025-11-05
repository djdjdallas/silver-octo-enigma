// Admin Analytics API Route
// Fetches analytics data from PostHog and Stripe

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    // TODO: Add authentication to ensure only admins can access
    // For now, this is a basic implementation

    const supabase = await createClient();

    // Fetch user data from Supabase
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id, created_at, is_pro, subscription_tier');

    if (usersError) {
      console.error('Error fetching users:', usersError);
    }

    // Calculate acquisition metrics
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const dailySignups = users?.filter(
      u => new Date(u.created_at) >= oneDayAgo
    ).length || 0;

    const weeklySignups = users?.filter(
      u => new Date(u.created_at) >= oneWeekAgo
    ).length || 0;

    const monthlySignups = users?.filter(
      u => new Date(u.created_at) >= oneMonthAgo
    ).length || 0;

    // Calculate activation metrics
    // These would ideally come from PostHog, but we'll estimate from Supabase
    const totalUsers = users?.length || 0;
    const proUsers = users?.filter(u => u.is_pro).length || 0;

    // Calculate monetization metrics from Stripe
    let mrr = 0;
    let arr = 0;
    let activeSubscriptions = 0;

    try {
      const subscriptions = await stripe.subscriptions.list({
        status: 'active',
        limit: 100,
      });

      activeSubscriptions = subscriptions.data.length;

      // Calculate MRR (Monthly Recurring Revenue)
      subscriptions.data.forEach(sub => {
        const amount = sub.items.data[0]?.price?.unit_amount || 0;
        const interval = sub.items.data[0]?.price?.recurring?.interval;

        if (interval === 'month') {
          mrr += amount / 100; // Convert cents to dollars
        } else if (interval === 'year') {
          mrr += (amount / 100) / 12; // Convert annual to monthly
        }
      });

      arr = mrr * 12;
    } catch (stripeError) {
      console.error('Error fetching Stripe data:', stripeError);
    }

    // Calculate other metrics
    const arpu = totalUsers > 0 ? mrr / totalUsers : 0;
    const freeToProConversion = totalUsers > 0 ? (proUsers / totalUsers) * 100 : 0;

    // Estimate churn (would need historical data for accurate calculation)
    const monthlyChurn = 5; // Placeholder - calculate from actual data

    // Estimate LTV (Lifetime Value)
    const avgChurnRate = monthlyChurn / 100;
    const ltv = avgChurnRate > 0 ? arpu / avgChurnRate : 0;

    // Build KPI object
    const kpis = {
      acquisition: {
        daily_signups: dailySignups,
        weekly_signups: weeklySignups,
        monthly_signups: monthlySignups,
        cost_per_acquisition: 0, // Would calculate from ad spend
      },
      activation: {
        percent_who_scan: 75, // Placeholder - get from PostHog
        time_to_first_scan: 5, // Placeholder - get from PostHog
        percent_who_create_account: 100, // All users in DB have accounts
      },
      monetization: {
        free_to_pro_conversion: Math.round(freeToProConversion * 10) / 10,
        mrr: Math.round(mrr * 100) / 100,
        arr: Math.round(arr * 100) / 100,
        arpu: Math.round(arpu * 100) / 100,
        ltv: Math.round(ltv * 100) / 100,
      },
      retention: {
        day_1_retention: 60, // Placeholder - get from PostHog
        day_7_retention: 40, // Placeholder - get from PostHog
        day_30_retention: 25, // Placeholder - get from PostHog
        monthly_churn: monthlyChurn,
      },
      engagement: {
        total_scans: 0, // Would need to track in database
        daily_active_users: 0, // Get from PostHog
        avg_scans_per_user: 0, // Calculate from scan data
      },
      metadata: {
        total_users: totalUsers,
        pro_users: proUsers,
        free_users: totalUsers - proUsers,
        active_subscriptions: activeSubscriptions,
        last_updated: new Date().toISOString(),
      },
    };

    return NextResponse.json(kpis);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to fetch PostHog data
 * Requires PostHog API key and project ID
 */
async function fetchPostHogMetrics() {
  const posthogApiKey = process.env.POSTHOG_API_KEY;
  const posthogProjectId = process.env.POSTHOG_PROJECT_ID;

  if (!posthogApiKey || !posthogProjectId) {
    console.warn('PostHog API credentials not configured');
    return null;
  }

  try {
    // Example: Fetch insights from PostHog
    // https://posthog.com/docs/api/insights
    const response = await fetch(
      `https://app.posthog.com/api/projects/${posthogProjectId}/insights/`,
      {
        headers: {
          Authorization: `Bearer ${posthogApiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch PostHog data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching PostHog data:', error);
    return null;
  }
}
