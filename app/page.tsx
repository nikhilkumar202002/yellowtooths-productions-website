import FeaturedBentoGrid from "@/components/sections/FeaturedBentoGrid";
import HeroBanner from "@/components/sections/HeroBanner";
import HomeAbout from "@/components/sections/HomeAbout";
import HomeContact from "@/components/sections/HomeContact";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedBentoGrid />
      <HomeAbout />
      <HomeContact />
    </>
  );
}
