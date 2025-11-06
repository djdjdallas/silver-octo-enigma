// Stripe webhook handler for subscription events
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  const supabase = createServiceClient();

  // Handle different event types
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      // Get user ID from metadata
      const userId = session.metadata.userId;
      const customerId = session.customer;

      if (userId) {
        // Check if this is a subscription or one-time payment
        if (session.mode === 'subscription' && session.subscription) {
          // Handle subscription
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          const expiresAt = new Date(subscription.current_period_end * 1000);

          const { error } = await supabase
            .from('user_profiles')
            .update({
              subscription_tier: 'pro',
              subscription_expires_at: expiresAt.toISOString(),
              stripe_customer_id: customerId,
            })
            .eq('id', userId);

          if (error) {
            console.error('Error updating user profile:', error);
          } else {
            console.log('User subscription activated:', userId);
          }
        } else if (session.mode === 'payment') {
          // Handle one-time payment (lifetime access)
          // Set expiration to far future date (e.g., 100 years from now)
          const lifetimeExpiry = new Date();
          lifetimeExpiry.setFullYear(lifetimeExpiry.getFullYear() + 100);

          const { error } = await supabase
            .from('user_profiles')
            .update({
              subscription_tier: 'pro',
              subscription_expires_at: lifetimeExpiry.toISOString(),
              stripe_customer_id: customerId,
            })
            .eq('id', userId);

          if (error) {
            console.error('Error updating user profile for lifetime access:', error);
          } else {
            console.log('User lifetime access activated:', userId);
          }
        }
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      const customerId = subscription.customer;

      // Find user by stripe_customer_id
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (profile) {
        const expiresAt = new Date(subscription.current_period_end * 1000);
        const tier = subscription.status === 'active' ? 'pro' : 'free';

        await supabase
          .from('user_profiles')
          .update({
            subscription_tier: tier,
            subscription_expires_at: expiresAt.toISOString(),
          })
          .eq('id', profile.id);

        console.log('Subscription updated:', profile.id);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      const customerId = subscription.customer;

      // Find user by stripe_customer_id
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (profile) {
        await supabase
          .from('user_profiles')
          .update({
            subscription_tier: 'free',
            subscription_expires_at: null,
          })
          .eq('id', profile.id);

        console.log('Subscription cancelled:', profile.id);
      }
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object;
      const customerId = invoice.customer;
      const subscriptionId = invoice.subscription;

      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const expiresAt = new Date(subscription.current_period_end * 1000);

        const { data: profile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          await supabase
            .from('user_profiles')
            .update({
              subscription_tier: 'pro',
              subscription_expires_at: expiresAt.toISOString(),
            })
            .eq('id', profile.id);

          console.log('Payment succeeded, subscription renewed:', profile.id);
        }
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      const customerId = invoice.customer;

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (profile) {
        // Optionally send notification to user about payment failure
        console.log('Payment failed for user:', profile.id);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
