// AI-powered lab results translator component
// Translates technical contaminant data into parent-friendly explanations
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';

export default function AILabResultsTranslator({ product, contaminants, userTier }) {
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const isPro = userTier === 'pro';

  const fetchExplanation = async () => {
    setLoading(true);
    setError(null);
    setHasGenerated(true);

    try {
      const response = await fetch('/api/ai/translate-lab-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, contaminants }),
      });

      if (!response.ok) {
        if (response.status === 503) {
          // AI features not available
          setError('disabled');
        } else {
          throw new Error('Failed to generate explanation');
        }
        return;
      }

      const data = await response.json();
      setExplanation(data.explanation);
    } catch (err) {
      console.error('Error fetching AI explanation:', err);
      setError('error');
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate for Pro users only
  useEffect(() => {
    if (isPro && product && contaminants && contaminants.length > 0 && !hasGenerated) {
      fetchExplanation();
    }
  }, [isPro, product, contaminants, hasGenerated]);

  // Don't show anything if AI is disabled
  if (error === 'disabled') {
    return null;
  }

  // Don't show if no contaminants data
  if (!contaminants || contaminants.length === 0) {
    return null;
  }

  return (
    <Card className="border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
            <Icons.info className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-bold text-gray-900">
                AI-Powered Safety Analysis
              </h3>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                ✨ AI
              </Badge>
              {!isPro && (
                <Badge className="bg-primary-500 text-white text-xs">
                  PRO
                </Badge>
              )}
            </div>

            {!hasGenerated && !isPro ? (
              // Free users see button to generate
              <div>
                <p className="text-gray-600 mb-4">
                  Get an AI-powered explanation of these lab results in simple, parent-friendly language.
                  Claude 4.5 will explain what the numbers mean and provide practical guidance.
                </p>
                <Button
                  onClick={fetchExplanation}
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
                      Get AI Explanation
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  💎 Pro members get automatic AI analysis on every product
                </p>
              </div>
            ) : loading ? (
              // Loading state
              <div className="flex items-center gap-3">
                <Icons.spinner className="w-5 h-5 text-primary-500 animate-spin" />
                <p className="text-gray-600">
                  Claude is analyzing the lab results...
                </p>
              </div>
            ) : error === 'error' ? (
              // Error state
              <div className="text-gray-600">
                <p className="mb-2">
                  Unable to generate AI explanation at this time. Please review the lab results data above.
                </p>
              </div>
            ) : explanation ? (
              // Explanation generated
              <div className="text-gray-700 leading-relaxed space-y-3">
                {explanation.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}

                <div className="mt-4 pt-4 border-t border-primary-200">
                  <p className="text-xs text-gray-500 italic">
                    💡 This explanation was generated by Claude 4.5 Sonnet to help you understand the lab results.
                    Always consult with your pediatrician for personalized advice.
                  </p>
                </div>

                {!isPro && (
                  <div className="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border border-purple-200">
                    <p className="text-sm text-purple-900 mb-2">
                      <strong>💎 Love AI insights?</strong> Pro members get automatic AI analysis on every product page,
                      plus AI-powered comparison insights and personalized recommendations.
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <a href="/upgrade">Upgrade to Pro - $5.99/month</a>
                    </Button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
