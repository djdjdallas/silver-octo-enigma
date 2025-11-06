// Rate limiting utilities for AI features
// Free users: 3 AI calls per day
// Pro users: Unlimited

import { createClient } from '@/lib/supabase/server';

const DAILY_FREE_LIMIT = 3;

/**
 * Check if user can use AI feature and get remaining calls
 * Returns: { allowed: boolean, remaining: number, limit: number, isPro: boolean }
 */
export async function checkAIRateLimit(userId, featureType) {
  if (!userId) {
    return { allowed: false, remaining: 0, limit: 0, isPro: false, error: 'Not authenticated' };
  }

  const supabase = await createClient();

  try {
    // Check if user is Pro
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('subscription_tier, subscription_expires_at')
      .eq('id', userId)
      .single();

    const isPro =
      profile &&
      profile.subscription_tier === 'pro' &&
      (!profile.subscription_expires_at || new Date(profile.subscription_expires_at) > new Date());

    // Pro users have unlimited access
    if (isPro) {
      return { allowed: true, remaining: Infinity, limit: Infinity, isPro: true };
    }

    // Get today's usage count for this feature
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: usageLogs, error: usageError } = await supabase
      .from('ai_usage_logs')
      .select('id')
      .eq('user_id', userId)
      .eq('feature_type', featureType)
      .gte('created_at', today.toISOString());

    if (usageError) {
      console.error('Error checking usage:', usageError);
      return { allowed: false, remaining: 0, limit: DAILY_FREE_LIMIT, isPro: false, error: usageError.message };
    }

    const usageCount = usageLogs?.length || 0;
    const remaining = Math.max(0, DAILY_FREE_LIMIT - usageCount);
    const allowed = usageCount < DAILY_FREE_LIMIT;

    return {
      allowed,
      remaining,
      limit: DAILY_FREE_LIMIT,
      isPro: false,
      used: usageCount,
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    return { allowed: false, remaining: 0, limit: DAILY_FREE_LIMIT, isPro: false, error: error.message };
  }
}

/**
 * Log AI feature usage
 */
export async function logAIUsage(userId, featureType) {
  if (!userId) return false;

  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from('ai_usage_logs')
      .insert({
        user_id: userId,
        feature_type: featureType,
      });

    if (error) {
      console.error('Error logging AI usage:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error logging AI usage:', error);
    return false;
  }
}

/**
 * Get user's daily AI usage stats (for dashboard/profile)
 */
export async function getDailyAIUsageStats(userId) {
  if (!userId) return null;

  const supabase = await createClient();

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: usageLogs } = await supabase
      .from('ai_usage_logs')
      .select('feature_type')
      .eq('user_id', userId)
      .gte('created_at', today.toISOString());

    const stats = {
      lab_translator: 0,
      comparison_insights: 0,
      total: 0,
    };

    usageLogs?.forEach((log) => {
      if (log.feature_type in stats) {
        stats[log.feature_type]++;
      }
      stats.total++;
    });

    return {
      ...stats,
      limit: DAILY_FREE_LIMIT,
      remaining: Math.max(0, DAILY_FREE_LIMIT - stats.total),
    };
  } catch (error) {
    console.error('Error getting usage stats:', error);
    return null;
  }
}
