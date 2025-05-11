// src/lib/store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (user: Omit<User, 'id'>, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Omit<Address, 'id'>>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  clearError: () => void;
}

// Mock database of users for demo purposes
const MOCK_USERS: Record<string, { user: User; password: string }> = {
  'user@example.com': {
    user: {
      id: '1',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '555-123-4567',
      addresses: [
        {
          id: '1',
          name: 'Home',
          street: '123 Main St',
          city: 'Stockholm',
          postalCode: '12345',
          country: 'Sweden',
          isDefault: true,
        }
      ]
    },
    password: 'password123',
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
          // Check if user exists in our mock database
          const userRecord = MOCK_USERS[email.toLowerCase()];

          if (!userRecord || userRecord.password !== password) {
            throw new Error('Invalid email or password');
          }

          set({
            user: userRecord.user,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred',
            isLoading: false
          });
        }
      },

      register: async (userData, password) => {
        set({ isLoading: true, error: null });

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
          // Check if email already exists
          if (MOCK_USERS[userData.email.toLowerCase()]) {
            throw new Error('Email already in use');
          }

          // Create new user
          const newUser: User = {
            id: Math.random().toString(36).substring(2, 9),
            ...userData,
            addresses: []
          };

          // Add to mock database
          MOCK_USERS[userData.email.toLowerCase()] = {
            user: newUser,
            password
          };

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred',
            isLoading: false
          });
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },

      updateUser: (userData) => {
        const { user } = get();
        if (!user) return;

        set({
          user: { ...user, ...userData }
        });
      },

      addAddress: (addressData) => {
        const { user } = get();
        if (!user) return;

        const newAddress: Address = {
          id: Math.random().toString(36).substring(2, 9),
          ...addressData,
          isDefault: user.addresses?.length === 0 ? true : addressData.isDefault
        };

        const addresses = user.addresses || [];

        // If this is set as default, update other addresses
        let updatedAddresses = [...addresses];
        if (newAddress.isDefault) {
          updatedAddresses = updatedAddresses.map(addr => ({
            ...addr,
            isDefault: false
          }));
        }

        updatedAddresses.push(newAddress);

        set({
          user: { ...user, addresses: updatedAddresses }
        });
      },

      updateAddress: (id, addressData) => {
        const { user } = get();
        if (!user || !user.addresses) return;

        const addressIndex = user.addresses.findIndex(addr => addr.id === id);
        if (addressIndex === -1) return;

        const updatedAddresses = [...user.addresses];
        updatedAddresses[addressIndex] = {
          ...updatedAddresses[addressIndex],
          ...addressData
        };

        // If setting as default, update other addresses
        if (addressData.isDefault) {
          updatedAddresses.forEach((addr, i) => {
            if (i !== addressIndex) {
              addr.isDefault = false;
            }
          });
        }

        set({
          user: { ...user, addresses: updatedAddresses }
        });
      },

      removeAddress: (id) => {
        const { user } = get();
        if (!user || !user.addresses) return;

        const filteredAddresses = user.addresses.filter(addr => addr.id !== id);

        // If removed address was default, set first address as default
        if (user.addresses.find(addr => addr.id === id)?.isDefault && filteredAddresses.length > 0) {
          filteredAddresses[0].isDefault = true;
        }

        set({
          user: { ...user, addresses: filteredAddresses }
        });
      },

      setDefaultAddress: (id) => {
        const { user } = get();
        if (!user || !user.addresses) return;

        const updatedAddresses = user.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === id
        }));

        set({
          user: { ...user, addresses: updatedAddresses }
        });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'smart-shop-auth', // name of the item in localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
