// components/sections/TacoFridaysSection.tsx
import ProductCard, { type Product } from "@/components/products/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tacoProducts: Product[] = [
  {
    id: "taco-1",
    name: "Organic Minced Beef 12%",
    brand: "Garant",
    imageUrl: "https://ext.same-assets.com/2461038866/4096530337.webp",
    href: "/product/organic-minced-beef",
    price: 139.00,
  },
  {
    id: "taco-2",
    name: "Chips Sourcream & Onion",
    brand: "Estrella",
    imageUrl: "https://ext.same-assets.com/2461038866/4197152896.webp",
    href: "/product/estrella-sourcream-onion-chips",
    price: 22.50, // Assuming "2 for 45"
    originalPrice: 27.95,
  },
  {
    id: "taco-3",
    name: "Coca-Cola 1.5L",
    brand: "Coca-Cola",
    imageUrl: "https://ext.same-assets.com/2461038866/2426340413.webp",
    href: "/product/coca-cola-1-5l",
    price: 19.00,
    originalPrice: 22.00,
  },
  {
    id: "taco-4",
    name: "Dip Cheddar Cheese Style",
    brand: "Santa Maria",
    imageUrl: "https://ext.same-assets.com/2461038866/1166648733.webp",
    href: "/product/santa-maria-cheddar-dip",
    price: 24.50, // Assuming "2 for 49"
    originalPrice: 36.95,
  },
  // We can add more taco-related products if needed, up to 6 for a nice grid row
];

const TacoFridaysSection = () => {
  return (
    <section className="py-12 bg-white"> {/* Changed background to white to alternate with gray-50 sections */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Taco Fridays!
          </h2>
          <Link href="/taco-fridays" className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1">
            More taco night inspiration
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Displaying up to 4 products for this section, similar to original site's taco section width */}
          {tacoProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TacoFridaysSection;
