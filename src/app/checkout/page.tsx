'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/useCartStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Check, ExternalLink, ShieldCheck, Truck, Clock, Info } from 'lucide-react';
import { useToast } from '@/lib/context/ToastContext';
import ProductRecommendations from '@/components/products/ProductRecommendations';

// Define types for store data
interface Store {
  id: string;
  name: string;
  logo: string;
  deliveryFee: number;
  minOrder: number;
  deliveryTime: string;
  priceMultiplier: number;
}

interface StoreComparison extends Store {
  subtotal: number;
  total: number;
}

// Sample store data with price multipliers
const stores: Store[] = [
  {
    id: 'ica',
    name: 'ICA',
    logo: 'https://ext.same-assets.com/2461038866/3524747834.svg',
    deliveryFee: 49,
    minOrder: 500,
    deliveryTime: '1-2 days',
    priceMultiplier: 1.0, // Base price
  },
  {
    id: 'coop',
    name: 'COOP',
    logo: 'https://ext.same-assets.com/2461038866/4154634622.svg',
    deliveryFee: 39,
    minOrder: 700,
    deliveryTime: 'Same day',
    priceMultiplier: 1.03, // 3% more expensive
  },
  {
    id: 'willys',
    name: 'Willys',
    logo: 'https://ext.same-assets.com/2461038866/1116737128.svg',
    deliveryFee: 29,
    minOrder: 600,
    deliveryTime: '1-3 days',
    priceMultiplier: 0.98, // 2% cheaper
  },
  {
    id: 'hemkop',
    name: 'Hemköp',
    logo: 'https://ext.same-assets.com/2461038866/2792408408.svg',
    deliveryFee: 59,
    minOrder: 400,
    deliveryTime: '1 day',
    priceMultiplier: 1.05, // 5% more expensive
  }
];

const CheckoutPage = () => {
  const router = useRouter();
  const { items, getTotalPrice } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { addToast } = useToast();
  const [storeComparisons, setStoreComparisons] = useState<StoreComparison[]>([]);
  const [cheapestStore, setCheapestStore] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      router.push('/');
      addToast({
        title: 'Empty Cart',
        description: 'Your cart is empty. Add some items before proceeding to checkout.',
        type: 'default',
      });
      return;
    }

    // Calculate prices for each store
    const comparisons = stores.map(store => {
      const subtotal = getTotalPrice() * store.priceMultiplier;
      const total = subtotal + store.deliveryFee;
      return {
        ...store,
        subtotal,
        total,
      };
    });

    // Sort by total price
    const sortedComparisons = [...comparisons].sort((a, b) => a.total - b.total);
    setStoreComparisons(sortedComparisons);
    setCheapestStore(sortedComparisons[0].id);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [items, getTotalPrice, router, addToast]);

  const handleContinueToStore = (storeId: string) => {
    const selectedStore = stores.find(s => s.id === storeId);

    // In a real app, this would redirect to the store's website
    addToast({
      title: 'Store Redirect',
      description: `You would now be redirected to ${selectedStore?.name} to complete your purchase.`,
      type: 'success',
    });

    // For demo purposes, simulate a successful order and redirect to confirmation
    setTimeout(() => {
      // Redirect to confirmation page with store information
      router.push(`/checkout/confirmation?store=${selectedStore?.name}`);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-16 px-4">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Comparing prices across stores...</h2>
          <p className="text-gray-500 mt-2">Finding the best deal for your shopping cart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">
          Compare prices for your cart across different stores
        </p>
      </div>

      {/* Cart summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Cart Summary</h2>
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="py-4 flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-md bg-gray-50 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.brand}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">{item.price.toFixed(2)} kr</div>
                <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal:</span>
            <span>{getTotalPrice().toFixed(2)} kr</span>
          </div>
          <div className="text-xs text-gray-500 italic">
            * Delivery fees and final prices vary by store
          </div>
        </div>
      </div>

      {/* Store comparisons */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Compare Stores</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {storeComparisons.map((store) => (
            <div
              key={store.id}
              className={`border rounded-lg p-4 ${
                store.id === cheapestStore
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-20">
                    <Image
                      src={store.logo}
                      alt={store.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-medium">{store.name}</h3>
                </div>
                {store.id === cheapestStore && (
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Best price
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{store.subtotal.toFixed(2)} kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery fee:</span>
                  <span>{store.deliveryFee.toFixed(2)} kr</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span>{store.total.toFixed(2)} kr</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 space-y-1 mb-4">
                <div className="flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  <span>Min. order: {store.minOrder} kr</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Delivery: {store.deliveryTime}</span>
                </div>
              </div>

              <Button
                className={`w-full ${
                  store.id === cheapestStore
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
                onClick={() => handleContinueToStore(store.id)}
              >
                Continue to {store.name}
                <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-md p-4 text-sm text-blue-800 flex items-start gap-2">
          <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium mb-1">How Smart Shop works</p>
            <p>Smart Shop compares your cart across multiple stores to find you the best deal. When you click "Continue to Store", you'll be redirected to complete your purchase directly with the chosen retailer.</p>
          </div>
        </div>
      </div>

      {/* Additional checkout information */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <ShieldCheck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Secure Shopping</h3>
            <p className="text-sm text-gray-500">Your data is always protected</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Fast Delivery</h3>
            <p className="text-sm text-gray-500">Get your groceries when you need them</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Best Prices</h3>
            <p className="text-sm text-gray-500">Save up to 30% on your grocery shopping</p>
          </div>
        </div>
      </div>

      {/* Product recommendations */}
      <ProductRecommendations
        title="Frequently bought together"
        description="Complete your purchase with these complementary products"
        maxRecommendations={4}
      />
    </div>
  );
};

export default CheckoutPage;
