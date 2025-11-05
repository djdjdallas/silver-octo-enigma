// Web Push API integration for recall notifications

// Check if browser supports push notifications
export function isPushSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

// Request permission for push notifications
export async function requestNotificationPermission() {
  if (!isPushSupported()) {
    throw new Error('Push notifications are not supported in this browser');
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

// Subscribe to push notifications
export async function subscribeToPushNotifications(userId) {
  if (!isPushSupported()) {
    throw new Error('Push notifications are not supported');
  }

  // Register service worker
  const registration = await navigator.serviceWorker.ready;

  // Get VAPID public key from environment
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  if (!vapidPublicKey) {
    throw new Error('VAPID public key not configured');
  }

  // Subscribe to push notifications
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  });

  // Send subscription to backend
  const response = await fetch('/api/notifications/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      subscription,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save push subscription');
  }

  return subscription;
}

// Unsubscribe from push notifications
export async function unsubscribeFromPushNotifications(userId) {
  if (!isPushSupported()) {
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) {
    await subscription.unsubscribe();

    // Remove subscription from backend
    await fetch('/api/notifications/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
  }
}

// Check current push subscription status
export async function getPushSubscriptionStatus() {
  if (!isPushSupported()) {
    return { supported: false, subscribed: false };
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    return {
      supported: true,
      subscribed: !!subscription,
      permission: Notification.permission,
    };
  } catch (error) {
    console.error('Error checking push subscription:', error);
    return { supported: true, subscribed: false, permission: 'default' };
  }
}

// Show local notification (for testing)
export async function showNotification(title, options = {}) {
  if (!isPushSupported()) {
    console.warn('Notifications not supported');
    return;
  }

  if (Notification.permission !== 'granted') {
    const granted = await requestNotificationPermission();
    if (!granted) {
      throw new Error('Notification permission denied');
    }
  }

  const registration = await navigator.serviceWorker.ready;

  await registration.showNotification(title, {
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    ...options,
  });
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// Email notification preferences
export async function updateEmailNotifications(userId, enabled) {
  const response = await fetch('/api/notifications/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      enabled,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update email notification preferences');
  }

  return await response.json();
}

// Get unread notifications count
export async function getUnreadNotificationsCount(supabase, userId) {
  const { data, error } = await supabase
    .from('recall_notifications')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)
    .is('read_at', null);

  if (error) {
    console.error('Error fetching unread notifications:', error);
    return 0;
  }

  return data?.length || 0;
}

// Mark notification as read
export async function markNotificationAsRead(supabase, notificationId) {
  const { error } = await supabase
    .from('recall_notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('id', notificationId);

  if (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

// Get user notifications
export async function getUserNotifications(supabase, userId, limit = 20) {
  const { data, error } = await supabase
    .from('recall_notifications')
    .select(`
      *,
      recalls (
        *,
        products (name, brand, image_url)
      )
    `)
    .eq('user_id', userId)
    .order('sent_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }

  return data || [];
}
