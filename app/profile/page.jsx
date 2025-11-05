// User profile page with baby birthdate and notification settings
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { formatDate, getUserTier } from '@/lib/utils';
import {
  calculateAgeInMonths,
  formatAge,
  getAgeMilestone,
  getMaxBirthdate,
  getMinBirthdate,
  validateBirthdate,
} from '@/lib/age-calculator';
import {
  isPushSupported,
  getPushSubscriptionStatus,
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
} from '@/lib/notifications';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [babyBirthdate, setBabyBirthdate] = useState('');
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationPush, setNotificationPush] = useState(false);
  const [notificationSms, setNotificationSms] = useState(false);

  // Push notification state
  const [pushSupported, setPushSupported] = useState(false);
  const [pushSubscribed, setPushSubscribed] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    loadProfile();
    checkPushSupport();
  }, []);

  async function loadProfile() {
    try {
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

      if (userError || !currentUser) {
        router.push('/login');
        return;
      }

      setUser(currentUser);

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (profileError) {
        console.error('Error loading profile:', profileError);
      } else {
        setProfile(profileData);
        setBabyBirthdate(profileData.baby_birthdate || '');
        setNotificationEmail(profileData.notification_email ?? true);
        setNotificationPush(profileData.notification_push ?? false);
        setNotificationSms(profileData.notification_sms ?? false);
      }
    } catch (error) {
      console.error('Error in loadProfile:', error);
    } finally {
      setLoading(false);
    }
  }

  async function checkPushSupport() {
    const supported = isPushSupported();
    setPushSupported(supported);

    if (supported) {
      const status = await getPushSubscriptionStatus();
      setPushSubscribed(status.subscribed);
    }
  }

  async function handleSaveProfile() {
    setSaving(true);

    try {
      // Validate birthdate if provided
      if (babyBirthdate) {
        const validation = validateBirthdate(babyBirthdate);
        if (!validation.valid) {
          toast.error(validation.message);
          setSaving(false);
          return;
        }
      }

      const { error } = await supabase
        .from('user_profiles')
        .update({
          baby_birthdate: babyBirthdate || null,
          notification_email: notificationEmail,
          notification_push: notificationPush,
          notification_sms: notificationSms,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');

      // Reload profile
      await loadProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  }

  async function handleTogglePushNotifications() {
    try {
      if (pushSubscribed) {
        await unsubscribeFromPushNotifications(user.id);
        setPushSubscribed(false);
        setNotificationPush(false);
        toast.success('Push notifications disabled');
      } else {
        const granted = await Notification.requestPermission();
        if (granted !== 'granted') {
          toast.error('Notification permission denied');
          return;
        }

        await subscribeToPushNotifications(user.id);
        setPushSubscribed(true);
        setNotificationPush(true);
        toast.success('Push notifications enabled!');
      }
    } catch (error) {
      console.error('Error toggling push notifications:', error);
      toast.error('Failed to update push notifications');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <Icons.spinner className="w-12 h-12 text-gray-300 animate-spin" />
      </div>
    );
  }

  const userTier = getUserTier(profile);
  const isPro = userTier === 'pro';
  const ageInMonths = babyBirthdate ? calculateAgeInMonths(babyBirthdate) : null;
  const milestone = ageInMonths !== null ? getAgeMilestone(ageInMonths) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account and notification preferences
          </p>
        </div>

        {/* Account Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your SafeBaby account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Email Address
                </label>
                <p className="text-gray-900">{user?.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Member Since
                </label>
                <p className="text-gray-900">{formatDate(user?.created_at)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Subscription
                </label>
                <div>
                  {isPro ? (
                    <Badge className="bg-primary-500">
                      <Icons.award className="w-3 h-3 mr-1" />
                      Pro Member
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Free Plan</Badge>
                  )}
                </div>
              </div>

              {!isPro && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Upgrade Account
                  </label>
                  <Button asChild size="sm">
                    <Link href="/upgrade">
                      <Icons.award className="w-4 h-4 mr-2" />
                      Upgrade to Pro
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Baby's Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icons.baby className="w-5 h-5 mr-2" />
              Baby's Information
            </CardTitle>
            <CardDescription>
              Get age-appropriate product recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="birthdate" className="text-sm font-medium text-gray-700 block mb-2">
                Baby's Birthdate
              </label>
              <Input
                id="birthdate"
                type="date"
                value={babyBirthdate}
                onChange={(e) => setBabyBirthdate(e.target.value)}
                min={getMinBirthdate()}
                max={getMaxBirthdate()}
                className="max-w-xs"
              />
              <p className="text-xs text-gray-600 mt-1">
                We'll use this to recommend age-appropriate products
              </p>
            </div>

            {ageInMonths !== null && (
              <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                <div className="flex items-start space-x-3">
                  <Icons.info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">
                      {formatAge(ageInMonths)}
                    </p>
                    {milestone && (
                      <p className="text-sm text-gray-700">{milestone}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icons.bell className="w-5 h-5 mr-2" />
              Recall Notifications
            </CardTitle>
            <CardDescription>
              Choose how you want to be notified about product recalls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icons.mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">
                    Receive recall alerts via email (Free)
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            {/* Push Notifications */}
            <div className={`flex items-center justify-between p-4 border rounded-lg ${!isPro ? 'opacity-60' : ''}`}>
              <div className="flex items-center space-x-3 flex-1">
                <Icons.bell className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    {!isPro && (
                      <Badge className="bg-primary-500 text-xs">Pro</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Instant browser notifications (Pro only)
                  </p>
                  {!pushSupported && (
                    <p className="text-xs text-red-600 mt-1">
                      Not supported in this browser
                    </p>
                  )}
                </div>
              </div>
              {isPro && pushSupported ? (
                <Button
                  size="sm"
                  variant={pushSubscribed ? 'default' : 'outline'}
                  onClick={handleTogglePushNotifications}
                >
                  {pushSubscribed ? 'Enabled' : 'Enable'}
                </Button>
              ) : (
                <Button size="sm" variant="outline" disabled>
                  {isPro ? 'Not Supported' : 'Pro Only'}
                </Button>
              )}
            </div>

            {/* SMS Notifications */}
            <div className={`flex items-center justify-between p-4 border rounded-lg ${!isPro ? 'opacity-60' : ''}`}>
              <div className="flex items-center space-x-3">
                <Icons.mail className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">SMS Notifications</p>
                    {!isPro && (
                      <Badge className="bg-primary-500 text-xs">Pro</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Text message alerts (Pro only - Coming soon)
                  </p>
                </div>
              </div>
              <label className={`relative inline-flex items-center ${isPro ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                <input
                  type="checkbox"
                  checked={notificationSms}
                  onChange={(e) => isPro && setNotificationSms(e.target.checked)}
                  disabled={!isPro}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button onClick={handleSaveProfile} disabled={saving}>
            {saving ? (
              <>
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
