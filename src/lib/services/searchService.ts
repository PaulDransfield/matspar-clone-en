// src/lib/services/searchService.ts
import type { Product } from '@/components/products/ProductCard';

interface SearchOptions {
  includeOutOfStock?: boolean;
  maxPrice?: number;
  minPrice?: number;
  categories?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'relevance';
}

export const searchProducts = (
  products: Product[],
  searchTerm: string,
  options: SearchOptions = {}
): Product[] => {
  if (!searchTerm || searchTerm.trim() === '') {
    return products;
  }

  const terms = searchTerm.toLowerCase().split(' ').filter(term => term.length > 0);

  // Filter products that match the search terms
  let filteredProducts = products.filter(product => {
    const name = product.name.toLowerCase();
    const brand = product.brand.toLowerCase();

    // Product matches if any term is found in name or brand
    return terms.some(term => name.includes(term) || brand.includes(term));
  });

  // Apply price filters
  if (options.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price >= options.minPrice);
  }

  if (options.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price <= options.maxPrice);
  }

  // Apply category filters
  if (options.categories && options.categories.length > 0) {
    // This would require products to have a 'category' field
    // filteredProducts = filteredProducts.filter(p => options.categories!.includes(p.category));
  }

  // Sort results
  if (options.sortBy) {
    switch (options.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // For relevance, products with more matching terms come first
        filteredProducts.sort((a, b) => {
          const aMatches = terms.filter(term =>
            a.name.toLowerCase().includes(term) ||
            a.brand.toLowerCase().includes(term)
          ).length;

          const bMatches = terms.filter(term =>
            b.name.toLowerCase().includes(term) ||
            b.brand.toLowerCase().includes(term)
          ).length;

          return bMatches - aMatches;
        });
        break;
    }
  }

  return filteredProducts;
};
