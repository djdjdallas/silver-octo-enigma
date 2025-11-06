// API route for AI-powered comparison insights
import { NextResponse } from 'next/server';
import { generateComparisonInsights, isAIEnabled } from '@/lib/ai';

export async function POST(request) {
  try {
    // Check if AI is enabled
    if (!isAIEnabled()) {
      return NextResponse.json(
        { error: 'AI features are not enabled' },
        { status: 503 }
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

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Comparison insights error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
