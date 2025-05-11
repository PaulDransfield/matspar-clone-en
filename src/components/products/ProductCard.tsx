'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, PlusCircle, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCartStore } from '@/lib/store/useCartStore';
import { useToast } from '@/lib/context/ToastContext';

export interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  href: string;
  price: number;
  originalPrice?: number;
  // badges?: string[]; // For future use e.g. "Organic", "Swedish Origin"
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { addToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addItem(product);

    // Show success toast notification
    addToast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
      type: 'success',
      duration: 3000
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      <Link href={product.href} className="block group">
        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="contain" // Use contain to ensure the whole image is visible
            className="group-hover:scale-105 transition-transform duration-300 ease-in-out p-2"
          />
          {/* Favorite Button - top right */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8 z-10"
            // onClick={() => console.log("Favorite clicked:", product.id)} // Add actual handler later
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </Button>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={product.href} className="block group mb-1">
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors leading-tight truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-2 truncate">{product.brand}</p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-lg font-bold text-gray-900">{product.price.toFixed(2)}kr</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {product.originalPrice.toFixed(2)}kr
              </span>
            )}
          </div>

          <Button
            variant="outline"
            className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-xs py-2 transition-colors duration-150 flex items-center justify-center gap-1.5"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
