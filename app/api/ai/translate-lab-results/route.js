// API route for AI-powered lab results translation
import { NextResponse } from 'next/server';
import { translateLabResults, isAIEnabled } from '@/lib/ai';

export async function POST(request) {
  try {
    // Check if AI is enabled
    if (!isAIEnabled()) {
      return NextResponse.json(
        { error: 'AI features are not enabled' },
        { status: 503 }
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

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error('Lab results translation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
