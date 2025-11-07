/**
 * Photo Capture Component
 *
 * Allows users to capture product photos using their device camera or select
 * from gallery. Displays scanning animation while AI processes the image.
 *
 * Features:
 * - Camera access with back camera preference
 * - Gallery selection fallback
 * - Live preview before submission
 * - Scanning animation during processing
 * - Retake functionality
 *
 * @module components/PhotoCapture
 */

'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icons } from '@/components/icons';
import { ScanningAnimation } from './ScanningAnimation';

/**
 * Photo capture component
 *
 * @param {Object} props
 * @param {Function} props.onPhotoCapture - Callback when photo is confirmed (receives base64 string)
 * @param {Function} props.onCancel - Callback when user cancels
 */
export function PhotoCapture({ onPhotoCapture, onCancel }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  /**
   * Handle file selection from gallery
   */
  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview and immediately start analyzing
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setPreviewUrl(dataUrl);
      // Automatically start analysis
      handleConfirm(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Open device camera
   */
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Camera access error:', error);
      alert('Could not access camera. Please use "Choose from Gallery" instead.');
    }
  };

  /**
   * Capture photo from video stream
   */
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setPreviewUrl(dataUrl);

    // Stop camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);

    // Automatically start analysis
    handleConfirm(dataUrl);
  };

  /**
   * Close camera without capturing
   */
  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  /**
   * Confirm photo and start scanning/processing
   * @param {string} dataUrl - Optional data URL to use instead of previewUrl
   */
  const handleConfirm = async (dataUrl = null) => {
    const imageUrl = dataUrl || previewUrl;
    if (!imageUrl) return;

    // Show scanning animation
    setIsScanning(true);

    // Convert data URL to base64 (remove the prefix)
    const base64 = imageUrl.split(',')[1];

    // Call parent callback with base64 image
    // The scanning animation will continue until the parent routes to results page
    await onPhotoCapture(base64);

    // Note: We don't set isScanning back to false here because
    // the parent will handle navigation, which will unmount this component
  };

  /**
   * Retake photo (go back to preview)
   */
  const handleRetake = () => {
    setPreviewUrl(null);
    setIsScanning(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Camera View */}
      {showCamera && (
        <Card className="rounded-3xl overflow-hidden border-0 shadow-xl">
          <CardContent className="p-0 relative aspect-[3/4] bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex flex-col justify-between p-4">
              {/* Instructions at top */}
              <Alert className="bg-black/70 border-0 backdrop-blur-sm">
                <AlertDescription className="text-white text-center text-sm">
                  Position the product so the barcode is clearly visible
                </AlertDescription>
              </Alert>

              {/* Camera Controls at bottom */}
              <div className="flex justify-center items-center space-x-4 pb-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={closeCamera}
                  className="rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                >
                  Cancel
                </Button>

                {/* Camera shutter button */}
                <Button
                  size="lg"
                  onClick={capturePhoto}
                  className="rounded-full w-20 h-20 p-0 bg-white hover:bg-gray-100 shadow-xl"
                >
                  <div className="w-16 h-16 rounded-full border-4 border-gray-900" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scanning Animation View - Shows immediately after photo is taken */}
      {isScanning && previewUrl && (
        <ScanningAnimation imageUrl={previewUrl} />
      )}

      {/* Initial Options (Camera or Gallery) */}
      {!previewUrl && !showCamera && (
        <div className="space-y-4">
          <Card className="rounded-3xl border-0 shadow-xl overflow-hidden">
            <CardContent className="p-8 text-center space-y-6">
              {/* Camera Icon */}
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                <Icons.camera className="w-12 h-12 text-primary" />
              </div>

              {/* Title and Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Take a Photo
                </h2>
                <p className="text-gray-600">
                  Capture the product packaging with the barcode clearly visible
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={openCamera}
                  size="lg"
                  className="w-full rounded-full"
                >
                  <Icons.camera className="w-5 h-5 mr-2" />
                  Open Camera
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icons.image className="w-5 h-5 mr-2" />
                  Choose from Gallery
                </Button>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Cancel Button */}
          {onCancel && (
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={onCancel}
                className="rounded-full"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PhotoCapture;
