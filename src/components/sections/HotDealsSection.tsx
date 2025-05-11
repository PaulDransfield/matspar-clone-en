// components/sections/HotDealsSection.tsx
import ProductCard, { type Product } from "@/components/products/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Sample product data - replace with actual data or fetch from API later
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Bregott Butter & Rapeseed Normal Salted 75%",
    brand: "Bregott",
    imageUrl: "https://ext.same-assets.com/2461038866/3046215918.webp", // Original site image
    href: "/product/bregott-normal-salt",
    price: 47.90,
    originalPrice: 58.90,
  },
  {
    id: "2",
    name: "Brew Coffee Medium Roast",
    brand: "Arvid Nordquist",
    imageUrl: "https://ext.same-assets.com/2461038866/1212193402.webp", // Original site image
    href: "/product/arvid-nordquist-coffee",
    price: 75.00, // Assuming "2 for 150" means 75 each for this deal display
    originalPrice: 99.95,
  },
  {
    id: "3",
    name: "Falun Sausage Classic",
    brand: "Scan",
    imageUrl: "https://ext.same-assets.com/2461038866/2943723979.webp", // Original site image
    href: "/product/scan-falukorv",
    price: 30.00,
    originalPrice: 40.90,
  },
  {
    id: "4",
    name: "Coca-Cola Zero 1.5L",
    brand: "Coca-Cola",
    imageUrl: "https://ext.same-assets.com/2461038866/1576093767.webp", // Original site image
    href: "/product/coca-cola-zero",
    price: 19.50, // Assuming "2 for 39" means 19.50 each
    originalPrice: 21.90,
  },
    {
    id: "5",
    name: "Priest Cheese 31% Medium Aged",
    brand: "Arla Ko",
    imageUrl: "https://ext.same-assets.com/2461038866/2378028912.webp",
    href: "/product/arla-prast-ost",
    price: 85.68,
    originalPrice: 100.08,
  },
  {
    id: "6",
    name: "iKaffe Oat Drink",
    brand: "Oatly",
    imageUrl: "https://ext.same-assets.com/2461038866/2847128974.webp",
    href: "/product/oatly-ikaffe",
    price: 16.00, // Assuming "2 for 32"
    originalPrice: 20.95,
  },
];

const HotDealsSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Today's Hottest Deals
          </h2>
          <Link href="/deals" className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1">
            See all deals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotDealsSection;
