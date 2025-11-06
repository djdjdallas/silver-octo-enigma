// Sticky upgrade banner for free users
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function UpgradeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="sticky top-16 z-40 bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3 flex-1">
            <Icons.award className="w-6 h-6 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-sm md:text-base">
                Unlock safety scores and rankings
              </p>
              <p className="text-xs text-primary-100 hidden sm:block">
                Get Pro for just $5.99/month to see complete safety ratings
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Link href="/upgrade">
              <Button
                size="sm"
                variant="secondary"
                className="font-semibold whitespace-nowrap"
              >
                Upgrade Now
              </Button>
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-primary-100 p-1"
              aria-label="Dismiss banner"
            >
              <Icons.close className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
