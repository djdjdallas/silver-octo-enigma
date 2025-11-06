// API route to create Stripe checkout session
import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request) {
  try {
    const { priceId, userId, email, mode } = await request.json();

    if (!priceId || !userId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Default to 'subscription' if mode not provided
    const checkoutMode = mode || 'subscription';
    const session = await createCheckoutSession(userId, priceId, email, checkoutMode);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
