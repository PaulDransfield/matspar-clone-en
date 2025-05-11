// components/sections/PopularBrandsSection.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Brand {
  name: string;
  logoUrl: string;
  href: string;
}

// Using the product images as placeholders for logos for now, as per scrape.
// Ideally, these would be actual brand logos.
const sampleBrands: Brand[] = [
  {
    name: "Samyang Ramen",
    logoUrl: "https://ext.same-assets.com/2461038866/622568793.webp",
    href: "/brand/samyang-ramen",
  },
  {
    name: "Felix",
    logoUrl: "https://ext.same-assets.com/2461038866/515826729.webp",
    href: "/brand/felix",
  },
  {
    name: "Lindströms",
    logoUrl: "https://ext.same-assets.com/2461038866/3666286455.webp",
    href: "/brand/lindstroms",
  },
  {
    name: "Grandiosa",
    logoUrl: "https://ext.same-assets.com/2461038866/705897335.webp",
    href: "/brand/grandiosa",
  },
  {
    name: "Abba",
    logoUrl: "https://ext.same-assets.com/2461038866/3765804210.webp",
    href: "/brand/abba",
  },
  {
    name: "Pågen",
    logoUrl: "https://ext.same-assets.com/2461038866/4194629803.webp",
    href: "/brand/pagen",
  },
  // Add more brands as identified or with better logos
];

const PopularBrandsSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Popular Brands on Smart Shop
          </h2>
          <Link href="/brands" className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1">
            See all brands
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {sampleBrands.map((brand) => (
            <Link key={brand.name} href={brand.href} className="block group">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center aspect-square group-hover:shadow-md transition-shadow duration-200 border border-gray-200">
                <div className="relative w-full h-20 mb-2">
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    layout="fill"
                    objectFit="contain"
                    className="group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 truncate">{brand.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrandsSection;
