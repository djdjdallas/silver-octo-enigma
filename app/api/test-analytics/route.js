// Test endpoint to verify PostHog is working
// This is for development only - delete before deploying to production

import { NextResponse } from 'next/server';

export async function GET() {
  const hasKey = !!process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const hasHost = !!process.env.NEXT_PUBLIC_POSTHOG_HOST;

  return NextResponse.json({
    status: 'PostHog Configuration',
    posthog: {
      hasApiKey: hasKey,
      hasHost: hasHost,
      host: hasHost ? process.env.NEXT_PUBLIC_POSTHOG_HOST : 'Not configured',
      keyPrefix: hasKey ? process.env.NEXT_PUBLIC_POSTHOG_KEY.substring(0, 10) + '...' : 'Not configured',
    },
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    message: hasKey && hasHost ? 'PostHog is configured correctly!' : 'Missing PostHog configuration',
  });
}