'use client';

import type React from 'react';
import { useState } from 'react';
import ProfileLayout from '@/components/profile/ProfileLayout';
import { useAuthStore, type Address } from '@/lib/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Home, Building, MapPin, Check, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/lib/context/ToastContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AddressesPage = () => {
  const { user, addAddress, updateAddress, removeAddress, setDefaultAddress } = useAuthStore();
  const { addToast } = useToast();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
      isDefault: false,
    });
    setEditingAddress(null);
  };

  const handleOpenModal = (address?: Address) => {
    if (address) {
      setFormData({
        name: address.name,
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
        isDefault: address.isDefault,
      });
      setEditingAddress(address);
    } else {
      resetForm();
    }
    setIsAddressModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAddress) {
      updateAddress(editingAddress.id, formData);
      addToast({
        title: 'Address Updated',
        description: 'Your address has been successfully updated.',
        type: 'success',
      });
    } else {
      addAddress(formData);
      addToast({
        title: 'Address Added',
        description: 'Your new address has been added successfully.',
        type: 'success',
      });
    }

    setIsAddressModalOpen(false);
    resetForm();
  };

  const handleRemove = (id: string) => {
    if (confirm('Are you sure you want to remove this address?')) {
      removeAddress(id);
      addToast({
        title: 'Address Removed',
        description: 'Your address has been removed.',
        type: 'success',
      });
    }
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
    addToast({
      title: 'Default Address Set',
      description: 'Your default delivery address has been updated.',
      type: 'success',
    });
  };

  return (
    <ProfileLayout
      title="My Addresses"
      description="Manage your delivery addresses"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Your Addresses</h3>
          <Button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="h-4 w-4" />
            Add New Address
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user?.addresses && user.addresses.length > 0 ? (
            user.addresses.map((address) => (
              <div
                key={address.id}
                className={`p-4 border rounded-lg ${
                  address.isDefault ? 'border-green-300 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-1 font-medium">
                    {address.name === 'Home' ? (
                      <Home className="h-4 w-4" />
                    ) : address.name === 'Work' ? (
                      <Building className="h-4 w-4" />
                    ) : (
                      <MapPin className="h-4 w-4" />
                    )}
                    {address.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                      onClick={() => handleOpenModal(address)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                      onClick={() => handleRemove(address.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>

                <address className="not-italic text-sm text-gray-600 mb-4">
                  {address.street}<br />
                  {address.city}, {address.postalCode}<br />
                  {address.country}
                </address>

                {address.isDefault ? (
                  <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <Check className="h-3 w-3" />
                    Default Address
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 border border-dashed rounded-lg flex flex-col items-center justify-center bg-gray-50">
              <MapPin className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">You don't have any saved addresses yet</p>
              <p className="text-gray-400 text-sm text-center mb-4">
                Add an address to make checkout faster
              </p>
              <Button
                onClick={() => handleOpenModal()}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Address
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Address Form Modal */}
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
            <DialogDescription>
              {editingAddress
                ? 'Update your delivery address details'
                : 'Add a new delivery address to your account'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Address Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Home, Work, etc."
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="street" className="text-sm font-medium text-gray-700">
                Street Address
              </label>
              <Input
                id="street"
                name="street"
                placeholder="123 Main St, Apt 4B"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium text-gray-700">
                  City
                </label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Stockholm"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="12345"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium text-gray-700">
                Country
              </label>
              <Input
                id="country"
                name="country"
                placeholder="Sweden"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isDefault: checked as boolean })
                }
              />
              <label
                htmlFor="isDefault"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Set as default delivery address
              </label>
            </div>

            <DialogFooter className="pt-4 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddressModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingAddress ? 'Update Address' : 'Add Address'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </ProfileLayout>
  );
};

export default AddressesPage;
