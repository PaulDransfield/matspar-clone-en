// src/lib/store/useFilterStore.ts
import { create } from 'zustand';

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  // Price range filter
  priceRange: PriceRange;
  defaultPriceRange: PriceRange;

  // Rating filter (1-5 stars)
  minRating: number;

  // Category filters
  selectedCategories: string[];

  // Special attributes
  attributes: {
    organic: boolean;
    glutenFree: boolean;
    vegan: boolean;
    sustainable: boolean;
    // Add other attributes as needed
  };

  // Store filters
  selectedStores: string[];

  // Sort options
  sortBy: 'price_asc' | 'price_desc' | 'rating' | 'popularity' | 'name_asc' | 'name_desc';

  // Actions
  setPriceRange: (range: PriceRange) => void;
  setMinRating: (rating: number) => void;
  toggleCategory: (category: string) => void;
  toggleAttribute: (attribute: keyof FilterState['attributes']) => void;
  toggleStore: (store: string) => void;
  setSortBy: (sortOption: FilterState['sortBy']) => void;
  resetFilters: () => void;

  // Active state
  hasActiveFilters: () => boolean;
}

export const useFilterStore = create<FilterState>((set, get) => {
  // Define default price range
  const defaultPriceRange = { min: 0, max: 1000 };

  return {
    // Default states
    priceRange: { ...defaultPriceRange },
    defaultPriceRange,
    minRating: 0,
    selectedCategories: [],
    attributes: {
      organic: false,
      glutenFree: false,
      vegan: false,
      sustainable: false,
    },
    selectedStores: [],
    sortBy: 'popularity',

    // Actions
    setPriceRange: (range: PriceRange) => {
      set({ priceRange: range });
    },

    setMinRating: (rating: number) => {
      set({ minRating: rating });
    },

    toggleCategory: (category: string) => {
      const currentCategories = get().selectedCategories;
      const isSelected = currentCategories.includes(category);

      if (isSelected) {
        // Remove category if already selected
        set({
          selectedCategories: currentCategories.filter(cat => cat !== category)
        });
      } else {
        // Add category if not selected
        set({
          selectedCategories: [...currentCategories, category]
        });
      }
    },

    toggleAttribute: (attribute: keyof FilterState['attributes']) => {
      set({
        attributes: {
          ...get().attributes,
          [attribute]: !get().attributes[attribute]
        }
      });
    },

    toggleStore: (store: string) => {
      const currentStores = get().selectedStores;
      const isSelected = currentStores.includes(store);

      if (isSelected) {
        // Remove store if already selected
        set({
          selectedStores: currentStores.filter(s => s !== store)
        });
      } else {
        // Add store if not selected
        set({
          selectedStores: [...currentStores, store]
        });
      }
    },

    setSortBy: (sortOption: FilterState['sortBy']) => {
      set({ sortBy: sortOption });
    },

    resetFilters: () => {
      set({
        priceRange: { ...get().defaultPriceRange },
        minRating: 0,
        selectedCategories: [],
        attributes: {
          organic: false,
          glutenFree: false,
          vegan: false,
          sustainable: false,
        },
        selectedStores: [],
        sortBy: 'popularity',
      });
    },

    hasActiveFilters: () => {
      const state = get();

      return (
        state.priceRange.min !== state.defaultPriceRange.min ||
        state.priceRange.max !== state.defaultPriceRange.max ||
        state.minRating > 0 ||
        state.selectedCategories.length > 0 ||
        Object.values(state.attributes).some(attr => attr) ||
        state.selectedStores.length > 0 ||
        state.sortBy !== 'popularity'
      );
    },
  };
});
