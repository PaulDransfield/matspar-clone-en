'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store/useCartStore';
import type { Product } from '@/components/products/ProductCard';
import ProductCard from '@/components/products/ProductCard';
import { sampleProducts } from '@/lib/data/sampleProducts';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductRecommendationsProps {
  title?: string;
  description?: string;
  maxRecommendations?: number;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  title = 'Recommended for you',
  description = 'Based on your shopping cart and browsing history',
  maxRecommendations = 4
}) => {
  const { items } = useCartStore();
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    // This is a simplified recommendation algorithm for demonstration
    // In a real app, this would be much more sophisticated, possibly using a backend API
    const getRecommendations = () => {
      // Get categories/tags from cart items - in this demo we'll just use product names
      const cartKeywords: string[] = [];

      // Extract keywords from cart item names
      for (const item of items) {
        const words = item.name.toLowerCase().split(' ');
        cartKeywords.push(...words.filter(word =>
          word.length > 3 && !['with', 'from', 'the'].includes(word)
        ));
      }

      if (cartKeywords.length === 0 || items.length === 0) {
        // If cart is empty, just return random products
        return getRandomProducts(maxRecommendations);
      }

      // Filter out products already in cart
      const cartProductIds = items.map(item => item.id);
      const availableProducts = sampleProducts.filter(
        product => !cartProductIds.includes(product.id)
      );

      // Score each product based on keyword matches
      const scoredProducts = availableProducts.map(product => {
        const productWords = (`${product.name} ${product.brand}`).toLowerCase().split(' ');

        // Count how many cart keywords match this product
        let score = 0;
        for (const keyword of cartKeywords) {
          if (productWords.some(word => word.includes(keyword) || keyword.includes(word))) {
            score += 1;
          }
        }

        return { product, score };
      });

      // Sort by score (highest first) and take the top N
      const topProducts = scoredProducts
        .sort((a, b) => b.score - a.score)
        .slice(0, maxRecommendations)
        .map(item => item.product);

      // If we don't have enough, pad with random products
      if (topProducts.length < maxRecommendations) {
        const randomProducts = getRandomProducts(
          maxRecommendations - topProducts.length,
          [...cartProductIds, ...topProducts.map(p => p.id)]
        );
        return [...topProducts, ...randomProducts];
      }

      return topProducts;
    };

    setRecommendations(getRecommendations());
  }, [items, maxRecommendations]);

  // Helper to get random products
  const getRandomProducts = (count: number, excludeIds: string[] = []) => {
    const availableProducts = sampleProducts.filter(
      product => !excludeIds.includes(product.id)
    );

    // Shuffle and take the first 'count' products
    return availableProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  };

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-12 mb-16">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <Button
          variant="link"
          className="text-green-600 flex items-center gap-1 hover:text-green-700"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductRecommendations;
