// Scan tracker component - triggers upgrade modal after 3 scans
'use client';

import { useEffect, useState } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import UpgradeModal from './UpgradeModal';

export default function ScanTracker() {
  const { isPro, scansCount, incrementScanCount, resetScanCount } = useSubscription();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  useEffect(() => {
    // Don't show modal for Pro users
    if (isPro) return;

    // Check if we've already shown the modal this session
    const modalShown = sessionStorage.getItem('safebaby_upgrade_modal_shown');
    if (modalShown) {
      setHasShownModal(true);
      return;
    }

    // Show modal after 3rd scan
    if (scansCount >= 3 && !hasShownModal) {
      // Small delay to make it feel less jarring
      const timer = setTimeout(() => {
        setShowUpgradeModal(true);
        setHasShownModal(true);
        sessionStorage.setItem('safebaby_upgrade_modal_shown', 'true');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [scansCount, isPro, hasShownModal]);

  const handleCloseModal = () => {
    setShowUpgradeModal(false);
  };

  return (
    <UpgradeModal
      isOpen={showUpgradeModal}
      onClose={handleCloseModal}
      scansCount={scansCount}
    />
  );
}
