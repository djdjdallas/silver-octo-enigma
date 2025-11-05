// Badge showing if product is age-appropriate
'use client';

import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { getAgeRangeText, getStageDescription } from '@/lib/age-calculator';

export default function AgeBadge({ product, babyAgeInMonths, isAppropriate }) {
  // If no baby age set, don't show badge
  if (babyAgeInMonths === null || babyAgeInMonths === undefined) {
    return null;
  }

  // Show stage info if available
  if (product.stage) {
    return (
      <div className="flex items-center space-x-1">
        <Badge
          variant={isAppropriate ? 'default' : 'secondary'}
          className={isAppropriate ? 'bg-green-500' : 'bg-gray-400'}
        >
          <Icons.baby className="w-3 h-3 mr-1" />
          Stage {product.stage}
          {isAppropriate && ' - Perfect!'}
        </Badge>
      </div>
    );
  }

  // Show age range if available
  if (product.min_age_months || product.max_age_months) {
    const ageRange = getAgeRangeText(product.min_age_months, product.max_age_months);

    return (
      <Badge
        variant={isAppropriate ? 'default' : 'secondary'}
        className={isAppropriate ? 'bg-green-500' : 'bg-gray-400'}
      >
        <Icons.baby className="w-3 h-3 mr-1" />
        {ageRange}
        {isAppropriate && ' ✓'}
      </Badge>
    );
  }

  // If appropriate but no specific age data, show generic badge
  if (isAppropriate) {
    return (
      <Badge className="bg-green-500">
        <Icons.checkmark className="w-3 h-3 mr-1" />
        Age-Appropriate
      </Badge>
    );
  }

  return null;
}

// Compact version for product cards
export function AgeBadgeCompact({ isAppropriate }) {
  if (!isAppropriate) {
    return null;
  }

  return (
    <div className="inline-flex items-center space-x-1 text-green-600 text-xs font-medium">
      <Icons.checkmark className="w-3 h-3" />
      <span>Perfect for baby</span>
    </div>
  );
}

// Info tooltip for stage
export function StageInfo({ stage }) {
  if (!stage) return null;

  const description = getStageDescription(stage);

  return (
    <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
      <Icons.info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-gray-900 mb-1">Stage {stage}</p>
        <p className="text-xs text-gray-700">{description}</p>
      </div>
    </div>
  );
}
