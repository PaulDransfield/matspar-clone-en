'use client';

import React from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRound, Home, ClipboardList, Heart, LogOut } from 'lucide-react';
import { useToast } from '@/lib/context/ToastContext';

interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  title,
  description
}) => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const { addToast } = useToast();

  // Redirect to home if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null; // Or a loading spinner
  }

  const handleLogout = () => {
    logout();
    addToast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
      type: 'success',
    });
    router.push('/');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 text-xl font-medium">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => router.push('/profile')}
              >
                <UserRound className="mr-2 h-4 w-4" />
                My Profile
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => router.push('/profile/addresses')}
              >
                <Home className="mr-2 h-4 w-4" />
                My Addresses
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => router.push('/profile/orders')}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Order History
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => router.push('/profile/lists')}
              >
                <Heart className="mr-2 h-4 w-4" />
                Saved Lists
              </Button>
            </nav>

            <div className="mt-8 pt-4 border-t">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
              {children}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
