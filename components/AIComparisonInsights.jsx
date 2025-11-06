// AI-powered comparison insights component
// Generates intelligent analysis and recommendations for product comparisons
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AIComparisonInsights({ products, contaminants, userTier }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    setError(null);
    setHasGenerated(true);

    try {
      const response = await fetch('/api/ai/comparison-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products, contaminants }),
      });

      if (!response.ok) {
        if (response.status === 503) {
          setError('disabled');
        } else {
          throw new Error('Failed to generate insights');
        }
        return;
      }

      const data = await response.json();
      setInsights(data.insights);
    } catch (err) {
      console.error('Error generating insights:', err);
      setError('error');
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate for Pro users
  useEffect(() => {
    if (userTier === 'pro' && products && products.length >= 2 && !hasGenerated) {
      generateInsights();
    }
  }, [products, userTier, hasGenerated]);

  // Don't show if AI is disabled
  if (error === 'disabled') {
    return null;
  }

  // Don't show if not enough products
  if (!products || products.length < 2) {
    return null;
  }

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white shadow-xl">
      <CardContent className="p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <Icons.info className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                AI Comparison Analysis
              </h3>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                ✨ Powered by Claude 4.5
              </Badge>
            </div>

            {!hasGenerated && userTier !== 'pro' && (
              <div>
                <p className="text-gray-600 mb-4">
                  Get AI-powered insights that explain which product is safest and why,
                  with actionable recommendations tailored to your comparison.
                </p>
                <Button
                  onClick={generateInsights}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {loading ? (
                    <>
                      <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Icons.info className="w-4 h-4 mr-2" />
                      Generate AI Insights
                    </>
                  )}
                </Button>
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-3">
                <Icons.spinner className="w-5 h-5 text-purple-500 animate-spin" />
                <p className="text-gray-600">
                  Claude is analyzing your comparison and generating personalized insights...
                </p>
              </div>
            )}

            {error === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  Unable to generate AI insights at this time. Please try again later.
                </p>
              </div>
            )}

            {insights && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                  <div className="text-gray-800 leading-relaxed space-y-3">
                    {insights.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-purple-50 rounded-lg p-4">
                  <Icons.info className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-purple-900">
                    These insights were generated by Claude 4.5 Sonnet, Anthropic's most intelligent AI model.
                    The analysis is based on lab test data, safety scores, and expert knowledge of baby food safety.
                    Always consult with your pediatrician for personalized medical advice.
                  </p>
                </div>

                {userTier !== 'pro' && (
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-purple-900 mb-2">
                      <strong>💎 Love AI insights?</strong> Pro members get automatic AI analysis for every comparison,
                      plus AI-powered recommendations and meal planning.
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <a href="/upgrade">Upgrade to Pro</a>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
