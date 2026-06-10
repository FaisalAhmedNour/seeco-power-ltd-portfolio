import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import ProductsGrid from "@/components/products/ProductsGrid";
import MarqueeBand from "@/components/marquee/MarqueeBand";
import BrandIntroduction from "@/components/brand/BrandIntroduction";
import LatestNews from "@/components/news/LatestNews";
import BrandBanner from "@/components/brand/BrandBanner";
import ContactCTA from "@/components/contact/ContactCTA";
import Footer from "@/components/footer/Footer";
import Widgets from "@/components/widgets/Widgets";

/**
 * Home landing page container.
 * Integrates all homepage blocks in their correct chronological stack order.
 */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black overflow-x-hidden">
      
      {/* 1. Header (Navbar and Topbar navigation) */}
      <Header />
      
      {/* 2. Hero banner segment (with slideshow rotating background) */}
      <Hero />
      
      {/* 3. Four product item category cards grid */}
      <ProductsGrid />
      
      {/* 4. specialties marquee with looping video overlay background */}
      <MarqueeBand />
      
      {/* 5. Brand text copy segment (High Quality Distribution & Power) */}
      <BrandIntroduction />
      
      {/* 6. Latest news grid (with three blog articles cards) */}
      <LatestNews />
      
      {/* 7. Brand statement columns (Positive Power banner) */}
      <BrandBanner />
      
      {/* 8. Call to action contact block (with team circular image) */}
      <ContactCTA />
      
      {/* 9. Site footer (with dynamically drawn SVG world shipment routes map) */}
      <Footer />
      
      {/* 10. Floating widgets (WhatsApp Message and Back to Top floating items) */}
      <Widgets />

    </main>
  );
}
