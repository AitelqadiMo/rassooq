import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FlashSaleTicker } from "@/components/sections/flash-sale-ticker";
import { FuturisticHero } from "@/components/ui/futuristic-hero";
import { CategoryGrid } from "@/components/ui/category-grid";
import { FloatingCart } from "@/components/ui/floating-cart";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { motion } from "framer-motion";
import { SouqPlusPromo } from "@/components/sections/souq-plus-promo";
import { BrandCarousel } from "@/components/sections/brand-carousel";
import { categories, products, heroBanners } from "@/data/mock-data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const navigate = useNavigate();
  
  // Filter products for different sections
  const flashSaleProducts = products.filter(p => p.isFlashSale);
  const newArrivals = products.slice(0, 6);
  const bestSellers = products.filter(p => p.badges?.includes("Best Seller") || p.badges?.includes("Bestseller"));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh relative">
      <Header />
      <FlashSaleTicker />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8">
          <FuturisticHero
            {...heroBanners[currentBanner]}
            onButtonClick={() => navigate('/categories')}
          />
        </section>

        {/* Categories Grid */}
        <CategoryGrid 
          categories={categories}
          onCategoryClick={(categoryId) => navigate(`/c/${categoryId}`)}
        />

        {/* Flash Sale Products */}
        {flashSaleProducts.length > 0 && (
          <section className="py-8">
            <ProductCarousel
              title="⚡ Flash Sale"
              products={flashSaleProducts}
            />
          </section>
        )}

        {/* New Arrivals */}
        <section className="py-8">
          <ProductCarousel
            title="✨ New Arrivals"
            products={newArrivals}
          />
        </section>

        {/* Rassooq+ Promo */}
        <section className="py-12">
          <SouqPlusPromo />
        </section>

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <section className="py-8">
            <ProductCarousel
              title="🏆 Best Sellers"
              products={bestSellers}
            />
          </section>
        )}

        {/* All Products */}
        <section className="py-8">
          <ProductCarousel
            title="Featured Products"
            products={products}
          />
        </section>

        {/* Brand Carousel */}
        <section className="py-12">
          <BrandCarousel />
        </section>
      </main>
      
      {/* Floating Cart */}
      <FloatingCart 
        itemCount={cartItems}
        onCartClick={() => navigate('/cart')}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
