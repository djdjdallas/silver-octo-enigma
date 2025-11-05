// Age-based filter component for product search
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { formatAge, getAgeMilestone, getRecommendationText } from '@/lib/age-calculator';
import Link from 'next/link';

export default function AgeFilter({ babyBirthdate, ageInMonths, onToggle, isActive }) {
  const [expanded, setExpanded] = useState(false);

  if (!babyBirthdate) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icons.baby className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  Get Age-Appropriate Recommendations
                </p>
                <p className="text-xs text-gray-600">
                  Add your baby's birthdate to see products perfect for their age
                </p>
              </div>
            </div>
            <Button asChild size="sm">
              <Link href="/profile">Add Birthdate</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const milestone = getAgeMilestone(ageInMonths);
  const recommendation = getRecommendationText(ageInMonths);

  return (
    <Card className={isActive ? 'border-2 border-primary-500 bg-primary-50' : ''}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icons.baby className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  Baby's Age: {formatAge(ageInMonths)}
                </p>
                {milestone && (
                  <p className="text-xs text-gray-600">{milestone}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {isActive && (
                <Badge className="bg-primary-500">Active</Badge>
              )}
              <Button
                size="sm"
                variant={isActive ? 'default' : 'outline'}
                onClick={onToggle}
              >
                {isActive ? 'Show All' : 'Filter by Age'}
              </Button>
            </div>
          </div>

          {/* Expandable Info */}
          {expanded && (
            <div className="pt-3 border-t space-y-2">
              <div className="flex items-start space-x-2">
                <Icons.info className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{recommendation}</p>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/profile">Update Birthdate</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/meal-plans">
                    <Icons.award className="w-4 h-4 mr-1" />
                    View Meal Plans
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Toggle expand */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center text-xs text-gray-600 hover:text-gray-900"
          >
            {expanded ? (
              <>
                <span>Show less</span>
                <Icons.chevronRight className="w-3 h-3 ml-1 rotate-90 transform" />
              </>
            ) : (
              <>
                <span>Learn more</span>
                <Icons.chevronRight className="w-3 h-3 ml-1 -rotate-90 transform" />
              </>
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
