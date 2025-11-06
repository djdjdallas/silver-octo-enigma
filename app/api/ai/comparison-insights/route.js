// API route for AI-powered comparison insights
import { NextResponse } from 'next/server';
import { generateComparisonInsights, isAIEnabled } from '@/lib/ai';
import { checkAIRateLimit, logAIUsage } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';

export async function POST(request) {
  try {
    // Check if AI is enabled
    if (!isAIEnabled()) {
      return NextResponse.json(
        { error: 'AI features are not enabled' },
        { status: 503 }
      );
    }

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check rate limit
    const rateLimitCheck = await checkAIRateLimit(user.id, 'comparison_insights');

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'You have reached your daily limit of 3 AI analyses. Upgrade to Pro for unlimited access.',
          limit: rateLimitCheck.limit,
          remaining: rateLimitCheck.remaining,
          isPro: rateLimitCheck.isPro,
        },
        { status: 429 }
      );
    }

    const { products, contaminants } = await request.json();

    // Validate input
    if (!products || products.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 products required for comparison' },
        { status: 400 }
      );
    }

    // Generate insights
    const insights = await generateComparisonInsights(products, contaminants);

    if (!insights) {
      return NextResponse.json(
        { error: 'Failed to generate insights' },
        { status: 500 }
      );
    }

    // Log usage (only if successful)
    await logAIUsage(user.id, 'comparison_insights');

    // Get updated rate limit info
    const updatedRateLimit = await checkAIRateLimit(user.id, 'comparison_insights');

    return NextResponse.json({
      insights,
      rateLimit: {
        remaining: updatedRateLimit.remaining,
        limit: updatedRateLimit.limit,
        isPro: updatedRateLimit.isPro,
      },
    });
  } catch (error) {
    console.error('Comparison insights error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
