import { useEffect, useState } from "react";
import { getFeaturedArticles, getLatestArticles } from "@/data/articles";
import { getFeaturedCategories } from "@/data/categories";
import HeroSection from "@/components/HeroSection";
import FeaturedArticles from "@/components/FeaturedArticles";
import CategorySection from "@/components/CategorySection";
import LatestArticles from "@/components/LatestArticles";
import NewsletterSection from "@/components/NewsletterSection";
import PopularCategories from "@/components/PopularCategories";
import KeyStatsSection from "@/components/KeyStatsSection";
import NeighborhoodGuide from "@/components/NeighborhoodGuide";
const Home = () => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);

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

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const articles = await getLatestArticles();
        setLatestArticles(articles.data);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
      }
    };

    fetchLatestArticles();
  }, []);

  return (
    <>
      {latestArticles && (
        <>
          <HeroSection article={latestArticles[0]} />
          {/* <FeaturedArticles articles={latestArticles.slice(1)} />
          <PopularCategories />
          <KeyStatsSection />
          <CategorySection categories={featuredCategories} />
          <NeighborhoodGuide />
          <LatestArticles articles={latestArticles} />
          <NewsletterSection /> */}
        </>
      )}
    </>
  );
};

export default Home;
