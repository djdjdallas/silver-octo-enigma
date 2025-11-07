// Barcode scanner component using HTML5 camera API
'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function BarcodeScanner({ onScan, onError }) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (html5QrCodeRef.current && isScanning) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  const startScanning = async () => {
    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the test stream
      setHasPermission(true);

      // Initialize scanner
      const html5QrCode = new Html5Qrcode('qr-reader');
      html5QrCodeRef.current = html5QrCode;

      // Calculate responsive qrbox size based on screen width
      const screenWidth = window.innerWidth;
      const qrboxSize = Math.min(screenWidth * 0.7, 300); // 70% of screen width, max 300px

      const config = {
        fps: 10,
        qrbox: { width: qrboxSize, height: qrboxSize },
        // Remove aspectRatio to let the library use the camera's native aspect ratio
      };

      await html5QrCode.start(
        { facingMode: 'environment' }, // Use back camera
        config,
        (decodedText) => {
          // Barcode detected
          console.log('Barcode scanned:', decodedText);
          stopScanning();
          if (onScan) {
            onScan(decodedText);
          }
        },
        (errorMessage) => {
          // Scanning error (can be ignored, happens frequently during scanning)
          // console.log('Scan error:', errorMessage);
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error('Error starting scanner:', err);
      setHasPermission(false);
      if (onError) {
        onError('Failed to access camera. Please check permissions.');
      }
    }
  };

  const stopScanning = async () => {
    try {
      if (html5QrCodeRef.current && isScanning) {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current = null;
        setIsScanning(false);
      }
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Scanner viewport */}
      <Card>
        <CardContent className="p-0">
          <div
            id="qr-reader"
            ref={scannerRef}
            className={`w-full ${isScanning ? 'block' : 'hidden'}`}
            style={{ minHeight: '300px' }}
          />

          {/* Placeholder when not scanning */}
          {!isScanning && (
            <div className="aspect-square bg-gray-100 flex flex-col items-center justify-center p-8">
              <div className="w-48 h-48 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                <Icons.camera className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-gray-600 text-center">
                {hasPermission === false
                  ? 'Camera access denied. Please enable camera permissions.'
                  : 'Position barcode within the frame to scan'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex flex-col space-y-2">
        {!isScanning ? (
          <Button
            onClick={startScanning}
            size="lg"
            className="w-full"
            disabled={hasPermission === false}
          >
            <Icons.camera className="w-5 h-5 mr-2" />
            Start Scanning
          </Button>
        ) : (
          <Button onClick={stopScanning} size="lg" variant="destructive" className="w-full">
            <Icons.close className="w-5 h-5 mr-2" />
            Stop Scanning
          </Button>
        )}

        {/* Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-2">
              <Icons.info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Scanning Tips:</p>
                <ul className="space-y-1 text-xs text-blue-800">
                  <li>• Hold the barcode 6-8 inches from your camera</li>
                  <li>• Ensure good lighting</li>
                  <li>• Keep the barcode steady and in focus</li>
                  <li>• Works with UPC, EAN, and other standard barcodes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
