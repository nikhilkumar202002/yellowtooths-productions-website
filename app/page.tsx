
import FeaturedBentoGrid from "@/components/sections/FeaturedBentoGrid";
import HeroBanner from "@/components/sections/HeroBanner";
import HomeAboutSection from "@/components/sections/HomeAboutSection";
import HomeContact from "@/components/sections/HomeContact";
import HomeAbout from "@/components/sections/HomeAbout";
import SliderService from "@/components/sections/SldierService";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedBentoGrid />
      <SliderService />
      <HomeAbout />
      <HomeAboutSection />
      <HomeContact />
    </>
  );
}
