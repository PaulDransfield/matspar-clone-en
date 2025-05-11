'use client';

import type React from 'react';
import { useState } from 'react';
import ProfileLayout from '@/components/profile/ProfileLayout';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Save, UserRound, Mail, Phone, BadgeCheck } from 'lucide-react';
import { useToast } from '@/lib/context/ToastContext';

const ProfilePage = () => {
  const { user, updateUser } = useAuthStore();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      // Email cannot be changed in this demo for simplicity
    });

    setIsEditing(false);

    addToast({
      title: 'Profile Updated',
      description: 'Your profile information has been successfully updated.',
      type: 'success',
    });
  };

  return (
    <ProfileLayout
      title="My Profile"
      description="View and manage your account details"
    >
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-gray-600"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="relative">
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <UserRound className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  className="pl-10 bg-gray-50"
                  disabled
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
                  <BadgeCheck className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="555-123-4567"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Phone className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">First Name</p>
                <p className="text-base text-gray-900">{user?.firstName}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Last Name</p>
                <p className="text-base text-gray-900">{user?.lastName}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <div className="flex items-center gap-1">
                  <p className="text-base text-gray-900">{user?.email}</p>
                  <BadgeCheck className="h-4 w-4 text-green-600" title="Verified" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-base text-gray-900">
                  {user?.phone || <span className="text-gray-400">Not provided</span>}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;
