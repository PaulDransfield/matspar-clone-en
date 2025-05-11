'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/useCartStore';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Minus, Plus, ShoppingCart, Trash2, X, PlusCircle } from 'lucide-react';
import { sampleProducts } from '@/lib/data/sampleProducts';
import Image from 'next/image';

const CartSheet = () => {
  const router = useRouter();
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    addItem
  } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            Your Shopping Cart
            <span className="ml-2 text-sm text-gray-500 font-normal">
              ({getTotalItems()} items)
            </span>
          </SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-2">Your shopping cart is empty</p>
            <p className="text-gray-400 text-sm text-center">
              Add some items to your cart to see them here.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={closeCart}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 my-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 border-b border-gray-100 pb-4"
                >
                  <div className="relative w-16 h-16 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.brand}</p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold">
                          {(item.price * item.quantity).toFixed(2)} kr
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{getTotalPrice().toFixed(2)} kr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Estimated Tax</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-base font-semibold mt-4 pt-4 border-t border-gray-100">
                <span>Total</span>
                <span>{getTotalPrice().toFixed(2)} kr</span>
              </div>
            </div>

            <SheetFooter className="mt-6 gap-3 flex-col">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  closeCart();
                  router.push('/checkout');
                }}
              >
                Checkout
              </Button>
              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear Cart
              </Button>
            </SheetFooter>
          </>
        )}
        {/* Product Recommendations */}
        {items.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-sm font-medium mb-4">Recommended with your cart</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* We'll just display 2 sample products here for simplicity */}
              {sampleProducts.slice(0, 2).map((product) => (
                <div key={product.id} className="border rounded-md p-2">
                  <div className="relative w-full aspect-square bg-gray-100 mb-2 rounded-md overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <h4 className="text-xs font-medium truncate">{product.name}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs font-semibold">{product.price.toFixed(2)} kr</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => addItem(product)}
                    >
                      <PlusCircle className="h-4 w-4 text-green-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
