// Client-side dashboard wrapper
'use client';

import RecallBanner from '@/components/RecallBanner';

export default function DashboardClient({ userId }) {
  return <RecallBanner userId={userId} />;
}
