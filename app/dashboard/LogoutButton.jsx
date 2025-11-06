// Logout button component
'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import toast from 'react-hot-toast';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <Button
      variant="outline"
      size="default"
      className="w-full justify-start text-red-600 hover:text-white hover:bg-red-500 border-2 hover:border-red-500 rounded-full py-6"
      onClick={handleLogout}
    >
      <Icons.logout className="w-5 h-5 mr-3" />
      Logout
    </Button>
  );
}
