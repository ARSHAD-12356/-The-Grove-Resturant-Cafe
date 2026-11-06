import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import { CartProvider } from "@/components/CartProvider";
import CtaBanner from "@/components/CtaBanner";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import Header from "@/components/Header";
import ImageBanner from "@/components/ImageBanner";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import OurStorySection from "@/components/OurStorySection";
import ReservationSection from "@/components/ReservationSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <CartProvider>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <ExperienceSection />
        <ImageBanner />
        <OurStorySection />
        <GallerySection />
        <TestimonialsSection />
        <ReservationSection />
        <BlogSection />
        <ContactSection />
        <CtaBanner />
      </main>
      <Footer />
    </CartProvider>
  );
}
