'use client';

import React, { useEffect, useState } from 'react';
import { useSearchStore } from '@/lib/store/useSearchStore';
import { searchProducts } from '@/lib/services/searchService';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/filters/ProductFilters';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// We'll need some sample products for demonstration
import { sampleProducts } from '@/lib/data/sampleProducts';

const SearchResults = () => {
  const { searchTerm, isSearching, setResults, results, clearSearch } = useSearchStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    // Simulate a search delay
    const searchTimeout = setTimeout(() => {
      setLoading(true);

      // Search through our sample products
      const searchResults = searchProducts(sampleProducts, searchTerm);
      setResults(searchResults);
      setLoading(false);
    }, 300); // Debounce the search to avoid excessive filtering

    return () => clearTimeout(searchTimeout);
  }, [searchTerm, setResults]);

  if (!isSearching) {
    return null;
  }

  // Function to handle filter application
  const handleApplyFilters = (filters: {
    categories: string[];
    priceRange: [number, number];
    dietaryPreferences: string[];
  }) => {
    // In a real app, we would filter the products based on the filters
    // For now, we'll just log the filters
    console.log('Applied filters:', filters);

    // We could apply the filters to the search results here
    // For demo purposes, let's just keep the current results
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-24 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[70vh] overflow-hidden">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-lg font-medium">
            {loading ? 'Searching...' : `Results for "${searchTerm}"`}
          </h2>
          <div className="flex items-center gap-2">
            <ProductFilters onApplyFilters={handleApplyFilters} />
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="h-8 w-8 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(70vh-4rem)]">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500" />
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">No results found</p>
              <p className="text-gray-400 text-sm mb-4">
                We couldn't find any products matching your search.
              </p>
              <p className="text-gray-400 text-sm">
                Try using different keywords or check for typos.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {results.length} {results.length === 1 ? 'product' : 'products'} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
