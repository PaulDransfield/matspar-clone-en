'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/useCartStore';
import ProductRecommendations from '@/components/products/ProductRecommendations';

const CheckoutConfirmation = () => {
  const router = useRouter();
  const { clearCart, items } = useCartStore();

  // Store the number of items before clearing the cart
  const [orderDetails, setOrderDetails] = React.useState({
    orderNumber: '',
    itemCount: 0,
    store: '',
  });

  useEffect(() => {
    // Generate a random order number
    const generateOrderNumber = () => {
      return `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    };

    // Get store from URL query param or use default
    const urlParams = new URLSearchParams(window.location.search);
    const store = urlParams.get('store') || 'Partner Store';

    // Save order details before clearing cart
    setOrderDetails({
      orderNumber: generateOrderNumber(),
      itemCount: items.length,
      store,
    });

    // Clear the cart after confirmation page loads
    clearCart();
  }, [clearCart, items.length]);

  // If no order details (e.g., direct page access), redirect to home
  useEffect(() => {
    if (!orderDetails.orderNumber && window.location.search === '') {
      router.push('/');
    }
  }, [orderDetails.orderNumber, router]);

  return (
    <div className="container max-w-3xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-2">
          Thank you for your order. Your request has been sent to {orderDetails.store}.
        </p>
        <p className="text-gray-500">
          Order reference: <span className="font-semibold">{orderDetails.orderNumber}</span>
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-2 mt-1">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-sm">1</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Order Processing</h3>
              <p className="text-gray-600 text-sm">
                {orderDetails.store} will process your order and prepare your items.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-2 mt-1">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-sm">2</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Delivery</h3>
              <p className="text-gray-600 text-sm">
                Your order will be delivered according to the store's delivery schedule.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-2 mt-1">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-sm">3</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Enjoy!</h3>
              <p className="text-gray-600 text-sm">
                Receive your groceries and enjoy the best prices thanks to Smart Shop.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
        <Button
          onClick={() => router.push('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Home
        </Button>
        <Button
          onClick={() => router.push('/profile/orders')}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ShoppingBag className="h-4 w-4" />
          View Order History
        </Button>
      </div>

      <ProductRecommendations
        title="You might also like"
        description="Based on your shopping habits"
        maxRecommendations={4}
      />
    </div>
  );
};

export default CheckoutConfirmation;
