import HeroSection from "@/components/HeroSection";
import FeaturedArticles from "@/components/FeaturedArticles";
import CategorySection from "@/components/CategorySection";
import LatestArticles from "@/components/LatestArticles";
import NewsletterSection from "@/components/NewsletterSection";
import PopularCategories from "@/components/PopularCategories";
import KeyStatsSection from "@/components/KeyStatsSection";
import NeighborhoodGuide from "@/components/NeighborhoodGuide";
import ReaderTestimonials from "@/components/ReaderTestimonials";
import { getFeaturedArticles, getLatestArticles } from "@/data/articles";
import { getFeaturedCategories } from "@/data/categories";
import { useEffect } from "react";

const Home = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = "Japan Housing - Modern Real Estate & Architecture Blog";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Discover insights and trends in Japanese real estate and architecture through our curated blog posts about modern and traditional housing in Japan."
      );
    }
  }, []);

  const featuredArticles = getFeaturedArticles();
  const latestArticles = getLatestArticles().slice(0, 8);
  const featuredCategories = getFeaturedCategories();

  return (
    <>
      <HeroSection article={featuredArticles[0]} />
      <FeaturedArticles articles={featuredArticles.slice(1)} />
      <PopularCategories />
      <KeyStatsSection />
      <CategorySection categories={featuredCategories} />
      <NeighborhoodGuide />
      <LatestArticles articles={latestArticles} />
      <ReaderTestimonials />
      <NewsletterSection />
    </>
  );
};

export default Home;
