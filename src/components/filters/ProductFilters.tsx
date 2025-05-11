'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';

const categories = [
  { id: 'fruits', name: 'Fruits & Vegetables' },
  { id: 'dairy', name: 'Dairy & Eggs' },
  { id: 'meat', name: 'Meat & Poultry' },
  { id: 'bakery', name: 'Bread & Bakery' },
  { id: 'snacks', name: 'Snacks & Sweets' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'frozen', name: 'Frozen Food' },
  { id: 'pantry', name: 'Pantry Staples' },
];

const dietaryPreferences = [
  { id: 'organic', name: 'Organic' },
  { id: 'vegetarian', name: 'Vegetarian' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'glutenFree', name: 'Gluten Free' },
  { id: 'lactoseFree', name: 'Lactose Free' },
  { id: 'sustainable', name: 'Sustainable' },
];

interface ProductFiltersProps {
  onApplyFilters: (filters: {
    categories: string[];
    priceRange: [number, number];
    dietaryPreferences: string[];
  }) => void;
  minPrice?: number;
  maxPrice?: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onApplyFilters,
  minPrice = 0,
  maxPrice = 500,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  const handleDietaryPreferenceChange = (preferenceId: string, checked: boolean) => {
    if (checked) {
      setSelectedDietaryPreferences((prev) => [...prev, preferenceId]);
    } else {
      setSelectedDietaryPreferences((prev) => prev.filter((id) => id !== preferenceId));
    }
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      categories: selectedCategories,
      priceRange,
      dietaryPreferences: selectedDietaryPreferences,
    });
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setSelectedDietaryPreferences([]);
  };

  const totalFiltersApplied =
    selectedCategories.length +
    selectedDietaryPreferences.length +
    (priceRange[0] > minPrice || priceRange[1] < maxPrice ? 1 : 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Filter className="h-4 w-4" />
          Filter
          {totalFiltersApplied > 0 && (
            <span className="bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalFiltersApplied}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-green-600" />
            Product Filters
            {totalFiltersApplied > 0 && (
              <span className="ml-2 text-sm text-gray-500 font-normal">
                ({totalFiltersApplied} applied)
              </span>
            )}
          </SheetTitle>
          <SheetDescription>
            Refine your product search with these filters.
          </SheetDescription>
        </SheetHeader>

        <div className="py-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked === true)
                    }
                    className="mr-2 h-4 w-4"
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Price Range: {priceRange[0].toFixed(0)}kr - {priceRange[1].toFixed(0)}kr
            </h3>
            <Slider
              defaultValue={[priceRange[0], priceRange[1]]}
              max={maxPrice}
              min={minPrice}
              step={10}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceRangeChange}
              className="w-full"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Dietary Preferences</h3>
            <div className="space-y-2">
              {dietaryPreferences.map((preference) => (
                <div key={preference.id} className="flex items-center">
                  <Checkbox
                    id={`preference-${preference.id}`}
                    checked={selectedDietaryPreferences.includes(preference.id)}
                    onCheckedChange={(checked) =>
                      handleDietaryPreferenceChange(preference.id, checked === true)
                    }
                    className="mr-2 h-4 w-4"
                  />
                  <label
                    htmlFor={`preference-${preference.id}`}
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    {preference.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6 gap-3 flex-col">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="w-full flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProductFilters;
