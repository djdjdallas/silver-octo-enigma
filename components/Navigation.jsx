// Main navigation component
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: Icons.home },
    { href: '/search', label: 'Search', icon: Icons.search },
    { href: '/scan', label: 'Scan', icon: Icons.scan },
    { href: '/compare', label: 'Compare', icon: Icons.filter },
    { href: '/recalls', label: 'Recalls', icon: Icons.alert },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Icons.shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
              SafeBaby
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                    isActive(link.href)
                      ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  )}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link href="/dashboard" className="hidden sm:block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full hover:bg-primary-50 hover:text-primary-600"
                  >
                    <Icons.user className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/upgrade" className="hidden sm:block">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-coral to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Icons.award className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full hover:bg-primary-50 hover:text-primary-600 font-semibold"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="hidden sm:block">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    Sign Up Free
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-primary-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <Icons.close className="w-6 h-6 text-gray-700" />
              ) : (
                <Icons.menu className="w-6 h-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-6 bg-gradient-to-b from-white to-primary-50/30">
            <div className="flex flex-col space-y-2 px-2">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300',
                      isActive(link.href)
                        ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                    )}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <div className="border-t border-gray-200 pt-4 mt-4">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-300"
                    >
                      <Icons.user className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/upgrade"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-coral to-coral-600 text-white shadow-md mt-2"
                    >
                      <Icons.award className="w-5 h-5" />
                      <span>Upgrade to Pro</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-300"
                    >
                      <Icons.user className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-primary to-primary-600 text-white shadow-md mt-2"
                    >
                      <Icons.checkmark className="w-5 h-5" />
                      <span>Sign Up Free</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
