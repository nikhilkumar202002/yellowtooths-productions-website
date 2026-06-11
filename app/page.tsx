
import FeaturedBentoGrid from "@/components/sections/FeaturedBentoGrid";
import HeroBanner from "@/components/sections/HeroBanner";
import HomeAboutSection from "@/components/sections/HomeAboutSection";
import HomeContact from "@/components/sections/HomeContact";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedBentoGrid />
      <HomeAboutSection />
      <HomeContact />
    </>
  );
}
