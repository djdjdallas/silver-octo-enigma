// API route for AI-powered lab results translation
import { NextResponse } from 'next/server';
import { translateLabResults, isAIEnabled } from '@/lib/ai';
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
    const rateLimitCheck = await checkAIRateLimit(user.id, 'lab_translator');

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

    const { product, contaminants } = await request.json();

    // Validate input
    if (!product || !contaminants || contaminants.length === 0) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      );
    }

    // Generate explanation
    const explanation = await translateLabResults(product, contaminants);

    if (!explanation) {
      return NextResponse.json(
        { error: 'Failed to generate explanation' },
        { status: 500 }
      );
    }

    // Log usage (only if successful)
    await logAIUsage(user.id, 'lab_translator');

    // Get updated rate limit info
    const updatedRateLimit = await checkAIRateLimit(user.id, 'lab_translator');

    return NextResponse.json({
      explanation,
      rateLimit: {
        remaining: updatedRateLimit.remaining,
        limit: updatedRateLimit.limit,
        isPro: updatedRateLimit.isPro,
      },
    });
  } catch (error) {
    console.error('Lab results translation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
