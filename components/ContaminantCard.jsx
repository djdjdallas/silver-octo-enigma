// Contaminant card component showing individual contaminant details
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { cn, formatContaminant } from '@/lib/utils';

const contaminantInfo = {
  Lead: {
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    icon: 'alert',
    description: 'Can affect brain development and cause learning difficulties',
  },
  Arsenic: {
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    icon: 'alert',
    description: 'Associated with developmental delays and immune system issues',
  },
  Cadmium: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: 'alert',
    description: 'Can damage kidneys and bones, affects growth',
  },
  Mercury: {
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    icon: 'alert',
    description: 'Harmful to nervous system development and brain function',
  },
};

export default function ContaminantCard({ contaminant }) {
  const info = contaminantInfo[contaminant.contaminant_name] || contaminantInfo.Lead;
  const IconComponent = Icons[info.icon];
  const exceedsLimit = contaminant.exceeds_limit;

  return (
    <Card className={cn(
      'border-l-4',
      exceedsLimit ? 'border-l-red-500 bg-red-50/50' : 'border-l-gray-300'
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={cn('p-2 rounded-lg', info.bgColor)}>
              <IconComponent className={cn('w-5 h-5', info.color)} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                {contaminant.contaminant_name}
              </h4>
              {exceedsLimit && (
                <Badge variant="destructive" className="mt-1">
                  <Icons.alert className="w-3 h-3 mr-1" />
                  Exceeds Safe Limit
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Amount detected */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-xs text-gray-600 mb-1">Amount Detected</p>
            <p className={cn(
              'text-lg font-semibold',
              exceedsLimit ? 'text-red-600' : 'text-gray-900'
            )}>
              {formatContaminant(contaminant.amount_detected, contaminant.unit)}
            </p>
          </div>

          {contaminant.safety_limit && (
            <div>
              <p className="text-xs text-gray-600 mb-1">Safe Limit</p>
              <p className="text-lg font-semibold text-green-600">
                {formatContaminant(contaminant.safety_limit, contaminant.unit)}
              </p>
            </div>
          )}
        </div>

        {/* Health impact */}
        <div className="pt-3 border-t">
          <p className="text-xs font-medium text-gray-700 mb-1">Health Impact:</p>
          <p className="text-xs text-gray-600">
            {contaminant.health_impact || info.description}
          </p>
        </div>

        {/* Warning message if exceeds limit */}
        {exceedsLimit && (
          <div className="mt-3 p-2 bg-red-100 rounded-md">
            <div className="flex items-start space-x-2">
              <Icons.alert className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-800">
                This contaminant level exceeds recommended safety limits.
                Consider choosing alternative products with lower levels.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
