import { Layout } from "@/components/layout/Layout";
import { HeroSlider } from "@/components/home/HeroSlider";
import { AboutSection } from "@/components/home/AboutSection";
import { SignatureFlavors } from "@/components/home/SignatureFlavors";
import { FeaturedItems } from "@/components/home/FeaturedItems";
import { AmbienceGallery } from "@/components/home/AmbienceGallery";
import { HealthyPromise } from "@/components/home/HealthyPromise";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { FinalCTA } from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <AboutSection />
      <SignatureFlavors />
      <FeaturedItems />
      <AmbienceGallery />
      <HealthyPromise />
      <CustomerReviews />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
