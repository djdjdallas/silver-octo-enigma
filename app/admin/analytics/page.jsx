'use client';

// Admin Analytics Dashboard
// Internal dashboard to monitor key metrics

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsDashboard() {
  const [kpis, setKpis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/analytics');

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setKpis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <button
          onClick={fetchAnalytics}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          Refresh
        </button>
      </div>

      {/* Acquisition Metrics */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Acquisition</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Daily Signups"
            value={kpis?.acquisition?.daily_signups || 0}
            subtitle="New users today"
          />
          <MetricCard
            title="Weekly Signups"
            value={kpis?.acquisition?.weekly_signups || 0}
            subtitle="New users this week"
          />
          <MetricCard
            title="Monthly Signups"
            value={kpis?.acquisition?.monthly_signups || 0}
            subtitle="New users this month"
          />
        </div>
      </section>

      {/* Activation Metrics */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Activation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Scan Rate"
            value={`${kpis?.activation?.percent_who_scan || 0}%`}
            subtitle="% of users who scan"
          />
          <MetricCard
            title="Time to First Scan"
            value={`${kpis?.activation?.time_to_first_scan || 0} min`}
            subtitle="Average time to activate"
          />
          <MetricCard
            title="Account Creation Rate"
            value={`${kpis?.activation?.percent_who_create_account || 0}%`}
            subtitle="% who create account"
          />
        </div>
      </section>

      {/* Monetization Metrics */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Monetization</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Free to Pro Conversion"
            value={`${kpis?.monetization?.free_to_pro_conversion || 0}%`}
            subtitle="Conversion rate"
            highlighted
          />
          <MetricCard
            title="MRR"
            value={`$${kpis?.monetization?.mrr || 0}`}
            subtitle="Monthly recurring revenue"
            highlighted
          />
          <MetricCard
            title="ARR"
            value={`$${kpis?.monetization?.arr || 0}`}
            subtitle="Annual recurring revenue"
          />
          <MetricCard
            title="ARPU"
            value={`$${kpis?.monetization?.arpu || 0}`}
            subtitle="Average revenue per user"
          />
          <MetricCard
            title="LTV"
            value={`$${kpis?.monetization?.ltv || 0}`}
            subtitle="Lifetime value"
          />
        </div>
      </section>

      {/* Retention Metrics */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Retention</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Day 1 Retention"
            value={`${kpis?.retention?.day_1_retention || 0}%`}
            subtitle="Users who return"
          />
          <MetricCard
            title="Day 7 Retention"
            value={`${kpis?.retention?.day_7_retention || 0}%`}
            subtitle="7-day return rate"
          />
          <MetricCard
            title="Day 30 Retention"
            value={`${kpis?.retention?.day_30_retention || 0}%`}
            subtitle="30-day return rate"
          />
          <MetricCard
            title="Monthly Churn"
            value={`${kpis?.retention?.monthly_churn || 0}%`}
            subtitle="Pro users who cancel"
            danger
          />
        </div>
      </section>

      {/* Engagement Metrics */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Total Scans"
            value={kpis?.engagement?.total_scans || 0}
            subtitle="All-time scans"
          />
          <MetricCard
            title="Daily Active Users"
            value={kpis?.engagement?.daily_active_users || 0}
            subtitle="Users today"
          />
          <MetricCard
            title="Avg Scans per User"
            value={kpis?.engagement?.avg_scans_per_user || 0}
            subtitle="Average engagement"
          />
        </div>
      </section>

      {/* PostHog & Stripe Links */}
      <section className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">External Analytics</h3>
        <div className="flex gap-4">
          <a
            href="https://app.posthog.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Open PostHog Dashboard
          </a>
          <a
            href="https://dashboard.stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Open Stripe Dashboard
          </a>
        </div>
      </section>

      {/* Instructions */}
      <section className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">How to Use This Dashboard</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>This dashboard aggregates data from PostHog and Stripe APIs</li>
          <li>Metrics update in real-time when you click "Refresh"</li>
          <li>For detailed user journeys and session recordings, use PostHog</li>
          <li>For payment details and subscription management, use Stripe</li>
          <li>Set up alerts in PostHog for critical metric drops</li>
        </ul>
      </section>
    </div>
  );
}

function MetricCard({ title, value, subtitle, highlighted = false, danger = false }) {
  return (
    <Card className={highlighted ? 'border-2 border-primary-500' : danger ? 'border-2 border-red-500' : ''}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${danger ? 'text-red-600' : 'text-gray-900'}`}>
          {value}
        </div>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
