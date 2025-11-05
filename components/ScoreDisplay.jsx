// Score display component with new freemium model
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { cn, getScoreColor, getScoreBadge, getSafetyIndicator } from '@/lib/utils';

export default function ScoreDisplay({ score, userTier = 'free' }) {
  const isPro = userTier === 'pro';
  const safetyIndicator = getSafetyIndicator(score);

  if (!isPro) {
    // Free users: Show Safe/Caution/Avoid indicator with blurred detailed score
    return (
      <Card className="border-2 border-primary-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icons.shield className="w-6 h-6 text-primary-500" />
            <span>Safety Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Safety Indicator Badge - FREE for all users */}
          <div className={cn('rounded-lg p-6 text-center mb-6', safetyIndicator.bgLight)}>
            <div className="flex items-center justify-center mb-3">
              <Badge className={cn('text-white text-lg px-4 py-2', safetyIndicator.color)}>
                {safetyIndicator.label}
              </Badge>
            </div>
            <p className={cn('text-sm font-medium', safetyIndicator.textColor)}>
              {score >= 70 && 'This product meets safety standards with low contaminant levels.'}
              {score >= 50 && score < 70 && 'This product has moderate contaminant levels. Consider alternatives.'}
              {score < 50 && 'This product has high contaminant levels. We recommend choosing alternatives.'}
            </p>
          </div>

          {/* Blurred detailed score - Pro feature */}
          <div className="bg-gray-100 rounded-lg p-6 text-center relative overflow-hidden">
            <div className="blur-md select-none pointer-events-none">
              <div className="text-5xl font-bold text-gray-400 mb-2">
                {score}
              </div>
              <div className="text-sm text-gray-500">
                Detailed Safety Score
              </div>
            </div>

            {/* Overlay with lock */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
              <div className="bg-primary-500 rounded-full p-3 mb-3">
                <Icons.lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Unlock Detailed Score
              </h3>
              <p className="text-gray-600 mb-3 max-w-xs mx-auto text-xs">
                See 0-100 score breakdown and compare products
              </p>
              <Link href="/upgrade">
                <Button size="sm">
                  <Icons.unlock className="w-4 h-4 mr-2" />
                  Upgrade to Pro - $4/month
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icons.info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">All contaminant data is free!</p>
                <p className="text-blue-700 mb-2">
                  View detailed lab results below. Pro unlocks detailed 0-100 scores,
                  side-by-side comparisons, and personalized recommendations.
                </p>
                <p className="text-xs text-blue-600 border-t border-blue-200 pt-2 mt-2">
                  <strong>Data Sources:</strong> Independent laboratory testing, Healthy Babies Bright Futures Study (2019),
                  CA AB 899 Manufacturer Disclosures, Consumer Reports (2023), FDA testing data, and manufacturer disclosures.
                  Test results may not reflect current formulations.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Pro user view
  return (
    <Card className="border-2 border-primary-500">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icons.award className="w-6 h-6 text-primary-500" />
          <span>Overall Safety Score</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn('rounded-lg p-8 text-center border-2', getScoreColor(score))}>
          <div className="text-6xl font-bold mb-2">
            {score}
          </div>
          <div className="text-lg font-semibold mb-4">
            {getScoreBadge(score)}
          </div>

          {/* Score explanation */}
          <div className="text-sm text-left space-y-2 mt-6 pt-6 border-t">
            <p className="font-medium">Score Breakdown:</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>90-100:</span>
                <span className="text-green-600 font-medium">Excellent - Minimal contaminants</span>
              </div>
              <div className="flex justify-between">
                <span>70-89:</span>
                <span className="text-green-600 font-medium">Good - Low levels detected</span>
              </div>
              <div className="flex justify-between">
                <span>50-69:</span>
                <span className="text-yellow-600 font-medium">Fair - Moderate levels</span>
              </div>
              <div className="flex justify-between">
                <span>Below 50:</span>
                <span className="text-red-600 font-medium">Poor - High levels detected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Source Attribution */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Data Sources:</strong> Independent laboratory testing, Healthy Babies Bright Futures Study (2019),
            CA AB 899 Manufacturer Disclosures, Consumer Reports (2023), FDA testing data, and manufacturer disclosures.
            Test results may not reflect current formulations. Always verify with current product packaging.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
