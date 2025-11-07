// ZXing-based barcode scanner component
'use client';

import { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ZXingScanner({ onScan, onError }) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  // Initialize code reader
  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    // Get available cameras
    codeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        setDebugInfo(`Found ${videoInputDevices.length} cameras`);
        setDevices(videoInputDevices);

        // Select the back camera if available
        const backCamera = videoInputDevices.find(device =>
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('environment') ||
          device.label.toLowerCase().includes('rear')
        );

        if (backCamera) {
          setSelectedDevice(backCamera.deviceId);
        } else if (videoInputDevices.length > 0) {
          // Use the last camera (usually back camera on mobile)
          setSelectedDevice(videoInputDevices[videoInputDevices.length - 1].deviceId);
        }
      })
      .catch((err) => {
        console.error('Error listing devices:', err);
        setError('Failed to get camera devices');
      });

    // Cleanup
    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

  const startScanning = async () => {
    if (!selectedDevice) {
      setError('No camera device selected');
      return;
    }

    setError(null);
    setIsScanning(true);
    setDebugInfo('Starting ZXing scanner...');

    try {
      const codeReader = codeReaderRef.current;

      // Start decoding from video device
      await codeReader.decodeFromVideoDevice(
        selectedDevice,
        videoRef.current,
        (result, err) => {
          if (result) {
            const text = result.getText();
            console.log('ZXing scanned:', text);
            setDebugInfo(`Scanned: ${text}`);

            // Vibrate on successful scan
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }

            stopScanning();

            if (onScan) {
              onScan(text);
            }
          }

          if (err && !(err.name === 'NotFoundException')) {
            console.error('ZXing decode error:', err);
            // Don't show NotFoundException as it's normal during scanning
          }
        }
      );

      setDebugInfo('ZXing scanner active - position barcode in view');
    } catch (err) {
      console.error('Failed to start ZXing scanner:', err);
      setError(`Failed to start scanner: ${err.message}`);
      setIsScanning(false);

      if (onError) {
        onError(err.message);
      }
    }
  };

  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
    setIsScanning(false);
    setDebugInfo('Scanner stopped');
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

      {/* Camera selector */}
      {devices.length > 1 && !isScanning && (
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <label className="text-sm font-medium text-gray-700">
              Select Camera:
              <select
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="ml-2 px-3 py-1 border rounded-md text-sm"
              >
                {devices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Camera ${device.deviceId.substr(0, 5)}...`}
                  </option>
                ))}
              </select>
            </label>
          </CardContent>
        </Card>
      )}

      {/* Scanner viewport */}
      <Card>
        <CardContent className="p-0">
          <video
            ref={videoRef}
            className={`w-full ${isScanning ? 'block' : 'hidden'}`}
            style={{ maxHeight: '400px' }}
          />

          {!isScanning && (
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
              disabled={!selectedDevice}
            >
              <Icons.camera className="w-5 h-5 mr-2" />
              Start Scanning (ZXing)
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
                <p className="font-medium mb-1">ZXing Scanner Active:</p>
                <ul className="space-y-1 text-xs text-blue-800">
                  <li>• Direct barcode detection library</li>
                  <li>• Supports all major barcode formats</li>
                  <li>• Works best with good lighting</li>
                  <li>• Hold steady for best results</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}