// Upgrade modal shown after user scans 3-5 products
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function UpgradeModal({ isOpen, onClose, scansCount = 3 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    }
  }, [isOpen]);

  if (!show) return null;

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <Card
        className={`relative max-w-lg w-full transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <CardContent className="p-8">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <Icons.close className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 rounded-full p-4">
              <Icons.award className="w-12 h-12 text-primary-600" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              You're Making Great Choices!
            </h2>
            <p className="text-gray-600 mb-2">
              You've scanned {scansCount} products so far. Upgrade to Pro to unlock powerful
              features that help you make even better decisions for your baby.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-1 mt-0.5">
                <Icons.checkmark className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Detailed Safety Scores</p>
                <p className="text-sm text-gray-600">
                  See precise 0-100 scores with complete breakdowns
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-1 mt-0.5">
                <Icons.checkmark className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Compare Products Side-by-Side</p>
                <p className="text-sm text-gray-600">
                  Find the safest options by comparing 2-4 products at once
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-1 mt-0.5">
                <Icons.checkmark className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Age-Based Recommendations</p>
                <p className="text-sm text-gray-600">
                  Get personalized suggestions for your baby's age
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-1 mt-0.5">
                <Icons.checkmark className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Unlimited Favorites</p>
                <p className="text-sm text-gray-600">
                  Save as many products as you want
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-1 mt-0.5">
                <Icons.checkmark className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Instant Recall Alerts</p>
                <p className="text-sm text-gray-600">
                  Get notified immediately about product recalls
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link href="/upgrade" onClick={handleClose}>
            <Button size="lg" className="w-full mb-3">
              <Icons.unlock className="w-5 h-5 mr-2" />
              Unlock Full Safety Scores - $4/month
            </Button>
          </Link>

          {/* Pricing note */}
          <p className="text-center text-sm text-gray-500">
            or $40/year (save $8)
          </p>

          {/* Continue browsing */}
          <button
            onClick={handleClose}
            className="text-sm text-gray-500 hover:text-gray-700 mt-4 w-full text-center"
          >
            Continue browsing for free
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
