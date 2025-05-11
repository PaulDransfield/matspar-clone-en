'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Category {
  name: string;
  href: string;
}

const categories: Category[] = [
  { name: "All items", href: "/category/all" },
  { name: "LCHF", href: "/category/lchf" },
  { name: "Vegan Products", href: "/category/vegan" },
  { name: "Vegetarian Products", href: "/category/vegetarian" },
  { name: "Fruit & Vegetables", href: "/category/fruit-vegetables" },
  { name: "Bread & Bakery", href: "/category/bread-bakery" },
  { name: "Meat, Poultry & Deli", href: "/category/meat-poultry-deli" },
  { name: "Fish & Seafood", href: "/category/fish-seafood" },
  { name: "Dairy, Cheese & Eggs", href: "/category/dairy-cheese-eggs" },
  { name: "Ready Meals & Salads", href: "/category/ready-meals-salads" },
  { name: "World Food", href: "/category/world-food" },
  { name: "Pantry", href: "/category/pantry" },
  { name: "Drinks", href: "/category/drinks" },
  { name: "Ice Cream, Sweets & Snacks", href: "/category/ice-cream-sweets-snacks" },
  { name: "Baby & Child", href: "/category/baby-child" },
  { name: "Home & Household", href: "/category/home-household" },
  { name: "Electronics", href: "/category/electronics" },
  { name: "Flowers & Plants", href: "/category/flowers-plants" },
  { name: "Pet Supplies", href: "/category/pet-supplies" },
  { name: "Beauty & Health", href: "/category/beauty-health" },
  { name: "Kiosk & Newspapers", href: "/category/kiosk-newspapers" },
];

const CategoryNav = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="border-b border-gray-200 relative" ref={menuRef}>
      <div className="container mx-auto px-4">
        {/* Desktop view */}
        <div className="hidden md:flex">
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className="flex items-center py-3 px-4 text-gray-800 hover:text-green-600 transition-colors font-medium"
            aria-expanded={isCategoriesOpen}
            aria-controls="category-dropdown"
            type="button"
          >
            <Menu className="w-5 h-5 mr-2" />
            Categories
            {isCategoriesOpen ? (
              <ChevronUp className="w-4 h-4 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-1" />
            )}
          </button>
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center py-3 text-gray-800" type="button">
                <Menu className="w-6 h-6 mr-2" />
                <span className="font-medium">Categories</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Categories</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="flex flex-col space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="py-2 text-sm text-gray-700 hover:text-green-600 transition-colors border-b border-gray-100 last:border-b-0"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop category dropdown */}
      {isCategoriesOpen && (
        <div
          id="category-dropdown"
          className="hidden md:block absolute left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-sm text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryNav;
