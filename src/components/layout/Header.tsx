'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, ChevronDown, X } from 'lucide-react';
import { useSearchStore } from '@/lib/store/useSearchStore';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from '@/lib/store/useCartStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import CartSheet from '@/components/cart/CartSheet';
import SearchResults from '@/components/search/SearchResults';
import AuthModal from '@/components/auth/AuthModal';

const Header = () => {
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const { searchTerm, clearSearch, addToSearchHistory, setSearchTerm } = useSearchStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  const navigateToProfile = () => {
    // In a real app, this would navigate to the profile page
    window.location.href = '/profile';
  };

  return (
    <>
      <header className="bg-white shadow-md py-3 border-b">
        <div className="container mx-auto px-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://ext.same-assets.com/2461038866/620650008.svg"
              alt="Smart Shop Logo"
              width={150}
              height={40}
              priority
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-grow max-w-xl relative">
            <Input
              type="search"
              placeholder="Search products, categories..."
              className="pl-10 pr-4 py-2.5 text-sm w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchTerm.trim() !== '') {
                  addToSearchHistory(searchTerm);
                }
              }}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => clearSearch()}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* Shop By Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-semibold text-gray-700 hover:text-green-600 hover:bg-gray-100 px-3 py-2">
                  Shop by
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Fruits & Vegetables</DropdownMenuItem>
                <DropdownMenuItem>Dairy & Eggs</DropdownMenuItem>
                <DropdownMenuItem>Meat & Poultry</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>All Categories</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* All Stores Button */}
            <Button variant="outline" className="text-sm font-semibold border-gray-300 text-gray-700 hover:text-green-600 hover:border-green-500 px-3 py-2">
              All stores
            </Button>

            {/* Cart Button */}
            <Button
              onClick={toggleCart}
              variant="ghost"
              className="relative text-sm font-semibold text-gray-700 hover:text-green-600 hover:bg-gray-100 px-3 py-2"
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span className="sr-only">Shopping Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>

            {/* Login/Profile Button */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                      {user?.firstName.charAt(0)}{user?.lastName.charAt(0)}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigateToProfile()}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>Order History</DropdownMenuItem>
                  <DropdownMenuItem>Saved Lists</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthModal>
                <Button className="text-sm font-semibold bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                  Login
                </Button>
              </AuthModal>
            )}
          </div>
        </div>
      </header>

      {/* Cart Sheet - This will be rendered conditionally based on the isOpen state in the cart store */}
      <CartSheet />

      {/* Search Results Modal */}
      {searchTerm && <SearchResults />}
    </>
  );
};

export default Header;
