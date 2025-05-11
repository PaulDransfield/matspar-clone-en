// components/sections/WorldFoodSection.tsx
import ProductCard, { type Product } from "@/components/products/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const worldFoodProducts: Product[] = [
  {
    id: "world-1",
    name: "Organic Natural Tofu",
    brand: "YiPin",
    imageUrl: "https://ext.same-assets.com/2461038866/2949954589.webp",
    href: "/product/organic-natural-tofu",
    price: 28.90,
  },
  {
    id: "world-2",
    name: "Coconut Milk",
    brand: "ICA Asia",
    imageUrl: "https://ext.same-assets.com/2461038866/578935695.webp",
    href: "/product/ica-asia-coconut-milk",
    price: 12.50, // Assuming "2 for 25"
    originalPrice: 13.95,
  },
  {
    id: "world-3",
    name: "Spicy Instant Noodles",
    brand: "Samyang Ramen",
    imageUrl: "https://ext.same-assets.com/2461038866/622568793.webp",
    href: "/product/samyang-spicy-noodles",
    price: 4.00, // Assuming "10 for 40"
    originalPrice: 7.95,
  },
  {
    id: "world-4",
    name: "Medium Wheat Tortillas 8-pack",
    brand: "ICA",
    imageUrl: "https://ext.same-assets.com/2461038866/2897453230.webp",
    href: "/product/ica-medium-tortillas",
    price: 13.33, // Assuming "3 for 39.99"
    originalPrice: 14.50,
  },
  // Add more world food products if needed, up to 6 for a full row
   {
    id: "world-5",
    name: "Chicken Flavored Instant Noodles",
    brand: "Samyang Ramen",
    imageUrl: "https://ext.same-assets.com/2461038866/751183202.webp",
    href: "/product/samyang-chicken-noodles",
    price: 4.00, // Assuming "10 for 40"
    originalPrice: 7.95,
  },
  {
    id: "world-6",
    name: "Sweet Chili Sauce Original",
    brand: "Santa Maria",
    imageUrl: "https://ext.same-assets.com/2461038866/3587167626.webp",
    href: "/product/santa-maria-sweet-chili",
    price: 24.00,
    originalPrice: 31.00,
  },
];

const WorldFoodSection = () => {
  return (
    <section className="py-12 bg-gray-50"> {/* Alternating background */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Cook exciting dishes from around the world
          </h2>
          <Link href="/world-food" className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1">
            Explore world cuisine
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
          {worldFoodProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldFoodSection;
