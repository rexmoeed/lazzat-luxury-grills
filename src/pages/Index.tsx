import { Suspense, lazy } from "react";
import { Layout } from "@/components/layout/Layout";
import { RouteLoader } from "@/components/shared/RouteLoader";
import { HeroSlider } from "@/components/home/HeroSlider";
import { AboutSection } from "@/components/home/AboutSection";

const FeaturedItems = lazy(() =>
  import("@/components/home/FeaturedItems").then((module) => ({
    default: module.FeaturedItems,
  }))
);
const AmbienceGallery = lazy(() =>
  import("@/components/home/AmbienceGallery").then((module) => ({
    default: module.AmbienceGallery,
  }))
);
const HealthyPromise = lazy(() =>
  import("@/components/home/HealthyPromise").then((module) => ({
    default: module.HealthyPromise,
  }))
);
const CustomerReviews = lazy(() =>
  import("@/components/home/CustomerReviews").then((module) => ({
    default: module.CustomerReviews,
  }))
);
const FinalCTA = lazy(() =>
  import("@/components/home/FinalCTA").then((module) => ({
    default: module.FinalCTA,
  }))
);

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <AboutSection />

      <Suspense
        fallback={
          <RouteLoader />
        }
      >
        <FeaturedItems />
        <AmbienceGallery />
        <HealthyPromise />
        <CustomerReviews />
        <FinalCTA />
      </Suspense>
    </Layout>
  );
};

export default Index;
