// src/lib/store/useSearchStore.ts
import { create } from 'zustand';
import type { Product } from '@/components/products/ProductCard';

interface SearchState {
  searchTerm: string;
  results: Product[];
  isSearching: boolean;
  searchHistory: string[];

  // Actions
  setSearchTerm: (term: string) => void;
  setResults: (results: Product[]) => void;
  clearSearch: () => void;
  addToSearchHistory: (term: string) => void;
  clearSearchHistory: () => void;
  setIsSearching: (isSearching: boolean) => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  searchTerm: '',
  results: [],
  isSearching: false,
  searchHistory: [],

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
    if (term.trim().length > 0) {
      get().setIsSearching(true);
    } else {
      get().setIsSearching(false);
    }
  },

  setResults: (results: Product[]) => {
    set({ results });
  },

  clearSearch: () => {
    set({ searchTerm: '', results: [], isSearching: false });
  },

  addToSearchHistory: (term: string) => {
    // Don't add empty terms or duplicates
    if (term.trim() === '' || get().searchHistory.includes(term)) {
      return;
    }

    // Keep only the 10 most recent searches
    const newHistory = [term, ...get().searchHistory].slice(0, 10);
    set({ searchHistory: newHistory });
  },

  clearSearchHistory: () => {
    set({ searchHistory: [] });
  },

  setIsSearching: (isSearching: boolean) => {
    set({ isSearching });
  },
}));
