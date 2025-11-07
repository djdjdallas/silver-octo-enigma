// Modern barcode scanner component using @yudiel/react-qr-scanner
'use client';

import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ModernBarcodeScanner({ onScan, onError }) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const handleScan = (result) => {
    // Add debugging
    console.log('Scanner result:', result);
    setDebugInfo(`Scan attempt: ${JSON.stringify(result)}`);

    if (!result || result.length === 0) {
      return;
    }

    // Handle different result formats
    let scannedValue = null;
    if (typeof result === 'string') {
      scannedValue = result;
    } else if (Array.isArray(result) && result.length > 0) {
      scannedValue = result[0]?.rawValue || result[0]?.text || result[0];
    } else if (result.text) {
      scannedValue = result.text;
    } else if (result.rawValue) {
      scannedValue = result.rawValue;
    }

    if (scannedValue) {
      console.log('Barcode scanned with modern scanner:', scannedValue);
      setDebugInfo(`Found: ${scannedValue}`);

      // Vibrate on successful scan
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }

      setIsScanning(false);
      if (onScan) {
        onScan(scannedValue);
      }
    }
  };

  const handleError = (error) => {
    console.error('Scanner error:', error);
    const errorMessage = error?.message || 'Failed to access camera';
    setError(errorMessage);
    if (onError) {
      onError(errorMessage);
    }
  };

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      if (onScan) {
        onScan(manualInput.trim());
      }
      setManualInput('');
      setShowManualInput(false);
    }
  };

  const startScanning = () => {
    setError(null);
    setDebugInfo('Scanner starting...');
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
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

      {/* Debug info */}
      {debugInfo && (
        <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
          Status: {debugInfo}
        </div>
      )}

      {/* Scanner viewport */}
      <Card>
        <CardContent className="p-0 relative">
          {isScanning ? (
            <div className="relative">
              <Scanner
                onScan={handleScan}
                onError={handleError}
                constraints={{
                  facingMode: 'environment',
                  // Simplified constraints for better compatibility
                }}
                formats={[
                  'qr_code',
                  'ean_13',
                  'ean_8',
                  'upc_a',
                  'upc_e',
                  'code_128',
                  'code_39',
                  'code_93',
                  'codabar',
                  'data_matrix',
                  'pdf417',
                  'itf',
                  'aztec',
                ]}
                paused={false} // Ensure scanning is not paused
                components={{
                  audio: false, // Disable audio
                  finder: true, // Show finder frame
                  torch: false, // Disable torch button
                  zoom: false, // Disable zoom controls
                }}
                styles={{
                  container: {
                    width: '100%',
                    height: '100%',
                  },
                  video: {
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  },
                }}
                scanDelay={300} // Scan every 300ms for faster detection
              />

              {/* Overlay instructions */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="inline-block bg-black/70 text-white px-4 py-2 rounded-lg">
                  <p className="text-sm">Position barcode within the frame</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-square bg-gray-100 flex flex-col items-center justify-center p-8">
              <div className="w-48 h-48 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                <Icons.camera className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-gray-600 text-center">
                Click "Start Scanning" to begin
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
            >
              <Icons.camera className="w-5 h-5 mr-2" />
              Start Scanning
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
      </div>
    </div>
  );
}