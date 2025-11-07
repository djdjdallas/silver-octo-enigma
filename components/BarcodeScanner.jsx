// Barcode scanner component using HTML5 camera API
'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function BarcodeScanner({ onScan, onError }) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    // Check if we're on HTTPS (required for camera access)
    if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      setError('Camera access requires HTTPS. Please use a secure connection.');
      setHasPermission(false);
    }

    return () => {
      // Cleanup scanner on unmount
      if (html5QrCodeRef.current && isScanning) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  const checkCameraAvailability = async () => {
    try {
      // Check if mediaDevices API is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not available. Please use a modern browser.');
      }

      // Important: Use Html5Qrcode.getCameras() directly, not from instance
      const devices = await Html5Qrcode.getCameras();

      if (devices && devices.length > 0) {
        setDebugInfo(`Found ${devices.length} camera(s): ${devices.map(d => d.label || d.id).join(', ')}`);
        return devices; // Return devices for later use
      } else {
        throw new Error('No cameras found on this device');
      }
    } catch (err) {
      console.error('Camera check error:', err);
      setError(err.message || 'Failed to detect cameras');
      return false;
    }
  };

  const startScanning = async () => {
    setIsInitializing(true);
    setError(null);
    setDebugInfo('Initializing scanner...');

    try {
      // First check camera availability and get devices
      const cameras = await checkCameraAvailability();
      if (!cameras || cameras.length === 0) {
        setIsInitializing(false);
        return;
      }

      // Request camera permission with better error handling
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment' // Try to use back camera (without "exact")
          }
        });
        stream.getTracks().forEach(track => track.stop()); // Stop the test stream
        setHasPermission(true);
        setDebugInfo('Camera permission granted');
      } catch (permissionError) {
        console.error('Permission error:', permissionError);

        // Provide more specific error messages
        if (permissionError.name === 'NotAllowedError') {
          setError('Camera permission denied. Please allow camera access and refresh the page.');
        } else if (permissionError.name === 'NotFoundError') {
          setError('No camera found. Please ensure your device has a camera.');
        } else if (permissionError.name === 'NotReadableError') {
          setError('Camera is already in use by another application. Please close other apps using the camera.');
        } else if (permissionError.name === 'OverconstrainedError') {
          // Try again without constraints
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            setHasPermission(true);
            setDebugInfo('Camera permission granted (fallback)');
          } catch (fallbackError) {
            setError(`Camera error: ${fallbackError.message}`);
            setHasPermission(false);
            setIsInitializing(false);
            return;
          }
        } else {
          setError(`Camera error: ${permissionError.message}`);
          setHasPermission(false);
          setIsInitializing(false);
          return;
        }
      }

      // Initialize scanner with better configuration
      const html5QrCode = new Html5Qrcode('qr-reader');
      html5QrCodeRef.current = html5QrCode;

      // Calculate responsive qrbox size based on screen width
      const screenWidth = window.innerWidth;
      const qrboxSize = Math.min(screenWidth * 0.6, 250); // Adjusted for better mobile experience

      // Enhanced configuration with all barcode formats
      const config = {
        fps: 10,
        qrbox: {
          width: qrboxSize,
          height: qrboxSize
        },
        aspectRatio: 1.777778, // 16:9 aspect ratio
        disableFlip: false, // Allow flipping for front camera
        // Ensure barcode formats are properly supported
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true // Use native API if available
        },
        verbose: false, // Disable verbose logging in production
        supportedScanTypes: [
          Html5Qrcode.SCAN_TYPE.SCAN_TYPE_CAMERA
        ]
      };

      setDebugInfo('Starting camera...');

      // Find the best camera to use
      let cameraIdToUse = cameras[0]?.id; // Default to first camera

      // Try to find back/environment camera
      if (cameras.length > 1) {
        // Look for back camera keywords
        const backCamera = cameras.find(camera => {
          const label = (camera.label || '').toLowerCase();
          return label.includes('back') ||
                 label.includes('environment') ||
                 label.includes('rear') ||
                 label.includes('facing back');
        });

        if (backCamera) {
          cameraIdToUse = backCamera.id;
          setDebugInfo(`Using back camera: ${backCamera.label}`);
        } else {
          // On mobile, usually the last camera is the back camera
          cameraIdToUse = cameras[cameras.length - 1].id;
          setDebugInfo(`Using camera: ${cameras[cameras.length - 1].label || 'Camera ' + (cameras.length - 1)}`);
        }
      }

      // Start the scanner with proper error handling
      await html5QrCode.start(
        cameraIdToUse || { facingMode: 'environment' }, // Fallback to facingMode without "exact"
        config,
        (decodedText, decodedResult) => {
          // Barcode detected
          console.log('Barcode scanned:', decodedText, decodedResult);

          // Vibrate on successful scan (if supported)
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }

          // Stop scanning before calling onScan to prevent multiple scans
          stopScanning();
          if (onScan) {
            onScan(decodedText);
          }
        },
        (errorMessage) => {
          // Scanning error (normal during scanning, don't show to user)
          // This is called for every frame that doesn't have a QR code
        }
      ).catch(async (err) => {
        console.error('Scanner start error:', err);

        // Try fallback configuration if initial start fails
        if (err.message?.includes('OverconstrainedError') || err.message?.includes('Constraints')) {
          try {
            // Try with just basic video constraint
            await html5QrCode.start(
              { facingMode: 'environment' },
              {
                fps: 10,
                qrbox: { width: 250, height: 250 }
              },
              (decodedText) => {
                console.log('Barcode scanned (fallback):', decodedText);
                if (navigator.vibrate) navigator.vibrate(200);
                stopScanning();
                if (onScan) onScan(decodedText);
              },
              () => {}
            );
            setDebugInfo('Scanner active (fallback mode) - position barcode in view');
          } catch (fallbackErr) {
            throw fallbackErr;
          }
        } else {
          throw err;
        }
      });

      setIsScanning(true);
      setDebugInfo('Scanner active - position barcode in view');
      setError(null);
    } catch (err) {
      console.error('Error starting scanner:', err);

      // Provide helpful error messages
      let errorMessage = 'Failed to start scanner. ';

      if (err.message?.includes('Permission')) {
        errorMessage += 'Please allow camera access and refresh the page.';
      } else if (err.message?.includes('https')) {
        errorMessage += 'Camera requires HTTPS connection.';
      } else if (err.message?.includes('NotSupported')) {
        errorMessage += 'Your browser does not support camera access.';
      } else if (err.message?.includes('not found')) {
        errorMessage += 'Camera not found. Please check your device.';
      } else {
        errorMessage += err.message || 'Please try refreshing the page.';
      }

      setError(errorMessage);
      setHasPermission(false);

      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsInitializing(false);
    }
  };

  const stopScanning = async () => {
    try {
      if (html5QrCodeRef.current && isScanning) {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current = null;
        setIsScanning(false);
        setDebugInfo('Scanner stopped');
      }
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
  };

  // Manual barcode input fallback
  const [manualInput, setManualInput] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      if (onScan) {
        onScan(manualInput.trim());
      }
      setManualInput('');
      setShowManualInput(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Error display */}
      {error && (
        <Alert variant="destructive">
          <Icons.alertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Debug info for troubleshooting - temporarily enabled for all environments */}
      {debugInfo && (
        <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
          Status: {debugInfo}
        </div>
      )}

      {/* Scanner viewport */}
      <Card>
        <CardContent className="p-0">
          <div
            id="qr-reader"
            ref={scannerRef}
            className={`w-full ${isScanning ? 'block' : 'hidden'}`}
            style={{ minHeight: '300px' }}
          />

          {/* Loading state */}
          {isInitializing && (
            <div className="aspect-square bg-gray-100 flex flex-col items-center justify-center p-8">
              <Icons.spinner className="w-16 h-16 text-primary-500 animate-spin mb-4" />
              <p className="text-gray-600 text-center">Initializing camera...</p>
              <p className="text-xs text-gray-500 mt-2">This may take a few seconds</p>
            </div>
          )}

          {/* Placeholder when not scanning and not initializing */}
          {!isScanning && !isInitializing && (
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
          <>
            <Button
              onClick={startScanning}
              size="lg"
              className="w-full"
              disabled={hasPermission === false || isInitializing}
            >
              {isInitializing ? (
                <>
                  <Icons.spinner className="w-5 h-5 mr-2 animate-spin" />
                  Initializing...
                </>
              ) : (
                <>
                  <Icons.camera className="w-5 h-5 mr-2" />
                  Start Scanning
                </>
              )}
            </Button>

            {/* Manual input option */}
            <Button
              onClick={() => setShowManualInput(!showManualInput)}
              variant="outline"
              size="lg"
              className="w-full"
            >
              <Icons.keyboard className="w-5 h-5 mr-2" />
              Enter Barcode Manually
            </Button>
          </>
        ) : (
          <Button onClick={stopScanning} size="lg" variant="destructive" className="w-full">
            <Icons.close className="w-5 h-5 mr-2" />
            Stop Scanning
          </Button>
        )}

        {/* Manual barcode input */}
        {showManualInput && (
          <Card className="bg-white border-2 border-primary-200">
            <CardContent className="p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
                  placeholder="Enter barcode number"
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
                <Button onClick={handleManualSubmit} disabled={!manualInput.trim()}>
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
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
                  <li>• If scanning fails, try manual entry above</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting for mobile */}
        {hasPermission === false && (
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <Icons.alertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <p className="font-medium mb-1">Camera Access Required:</p>
                  <ul className="space-y-1 text-xs text-amber-800">
                    <li>• iOS: Settings → Safari → Camera → Allow</li>
                    <li>• Android: Settings → Site Settings → Camera → Allow</li>
                    <li>• Or use manual barcode entry above</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}