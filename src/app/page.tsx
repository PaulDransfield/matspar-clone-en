// app/page.tsx
import NutshellSection from "@/components/sections/NutshellSection";
import HotDealsSection from "@/components/sections/HotDealsSection";
import PopularBrandsSection from "@/components/sections/PopularBrandsSection";
import TacoFridaysSection from "@/components/sections/TacoFridaysSection";
import WorldFoodSection from "@/components/sections/WorldFoodSection";
import ProductRecommendations from "@/components/products/ProductRecommendations";

export default function HomePage() {
  return (
    <div>
      <NutshellSection />
      <HotDealsSection />

      {/* Product recommendations based on browsing/cart */}
      <ProductRecommendations
        title="Just for you"
        description="Personalized suggestions based on your preferences"
      />

      <PopularBrandsSection />
      <TacoFridaysSection />
      <WorldFoodSection />

      {/* More recommendations with different title */}
      <ProductRecommendations
        title="You might also like"
        description="Discover more great products"
        maxRecommendations={4}
      />
    </div>
  );
}
