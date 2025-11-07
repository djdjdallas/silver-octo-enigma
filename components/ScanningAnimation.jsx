/**
 * Scanning Animation Component
 *
 * Displays a polished scanning animation with a moving line that travels
 * up and down over the captured product image while AI analyzes it.
 *
 * Features:
 * - Smooth scanning line with blue glow effect
 * - Corner brackets framing the scan area
 * - Pulsing status dots
 * - Professional text overlay
 *
 * @module components/ScanningAnimation
 */

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Scanning animation component
 *
 * @param {Object} props
 * @param {string} props.imageUrl - Data URL of the image being scanned
 */
export function ScanningAnimation({ imageUrl }) {
  const [scanPosition, setScanPosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for down, -1 for up

  useEffect(() => {
    // Smooth animation at 50fps (20ms interval)
    const interval = setInterval(() => {
      setScanPosition((prev) => {
        const next = prev + (direction * 2);

        // Reverse direction at boundaries
        if (next >= 100) {
          setDirection(-1);
          return 100;
        }
        if (next <= 0) {
          setDirection(1);
          return 0;
        }

        return next;
      });
    }, 20); // 50fps for smooth motion

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <Card className="rounded-3xl overflow-hidden border-0 shadow-2xl">
      <CardContent className="p-0 relative">
        {/* Product Image Container */}
        <div className="relative w-full aspect-[3/4] bg-black">
          {/* Product Image */}
          <img
            src={imageUrl}
            alt="Scanning product"
            className="w-full h-full object-contain"
          />

          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Scanning line with multi-layered glow effect */}
          <div
            className="absolute left-0 right-0 h-1 transition-all duration-75 ease-linear z-20"
            style={{
              top: `${scanPosition}%`,
              boxShadow: '0 0 20px 4px rgba(59, 130, 246, 0.8), 0 0 40px 8px rgba(59, 130, 246, 0.4)',
              background: 'linear-gradient(to right, transparent, #3b82f6, transparent)'
            }}
          >
            {/* Bright center line */}
            <div className="absolute inset-0 bg-blue-400 opacity-90" />
          </div>

          {/* Additional glow layers above and below the scanning line */}
          <div
            className="absolute left-0 right-0 h-8 pointer-events-none transition-all duration-75 ease-linear z-10"
            style={{
              top: `calc(${scanPosition}% - 1rem)`,
              background: 'linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.15), transparent)',
              filter: 'blur(8px)'
            }}
          />

          {/* Corner brackets for scanning frame */}
          <div className="absolute inset-4 pointer-events-none z-30">
            {/* Top-left corner */}
            <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-blue-500 rounded-tl-lg" />

            {/* Top-right corner */}
            <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-blue-500 rounded-tr-lg" />

            {/* Bottom-left corner */}
            <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-blue-500 rounded-bl-lg" />

            {/* Bottom-right corner */}
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-blue-500 rounded-br-lg" />
          </div>

          {/* Scanning status overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 z-30">
            <div className="text-center space-y-3">
              {/* Pulsing dots */}
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150" />
              </div>

              {/* Main scanning text */}
              <p className="text-white text-lg font-semibold">
                Scanning Product...
              </p>

              {/* Subtitle */}
              <p className="text-blue-200 text-sm">
                Reading barcode and extracting information
              </p>
            </div>
          </div>

          {/* Grid pattern overlay for tech feel (subtle) */}
          <div
            className="absolute inset-0 opacity-10 z-5 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ScanningAnimation;
