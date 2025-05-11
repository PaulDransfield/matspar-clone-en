// src/lib/store/useCartStore.ts
import { create } from 'zustand';
import type { Product } from '@/components/products/ProductCard';

// Extended product interface with quantity for cart items
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;

  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  // Add item to cart (or increase quantity if it already exists)
  addItem: (product: Product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      // If item exists, increase quantity
      set({
        items: currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      // If item doesn't exist, add it with quantity 1
      set({ items: [...currentItems, { ...product, quantity: 1 }] });
    }

    // Open cart when adding items
    set({ isOpen: true });
  },

  // Remove item from cart
  removeItem: (productId: string) => {
    set({
      items: get().items.filter(item => item.id !== productId),
    });
  },

  // Update quantity of an item
  updateQuantity: (productId: string, quantity: number) => {
    const newQuantity = Math.max(0, quantity); // Ensure quantity is not negative

    if (newQuantity === 0) {
      // If quantity is 0, remove the item
      get().removeItem(productId);
    } else {
      // Otherwise, update the quantity
      set({
        items: get().items.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        ),
      });
    }
  },

  // Clear all items from cart
  clearCart: () => {
    set({ items: [] });
  },

  // Toggle cart open/closed
  toggleCart: () => {
    set({ isOpen: !get().isOpen });
  },

  // Close cart
  closeCart: () => {
    set({ isOpen: false });
  },

  // Open cart
  openCart: () => {
    set({ isOpen: true });
  },

  // Get total number of items in cart
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  // Get total price of all items in cart
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));
