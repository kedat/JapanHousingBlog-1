import { Link } from "wouter";
import ArticleCard from "./ArticleCard";
import { Article } from "@/data/articles";
import { useState } from "react";

interface LatestArticlesProps {
  articles: Article[];
  initialDisplayCount?: number;
}

const LatestArticles = ({ 
  articles,
  initialDisplayCount = 4
}: LatestArticlesProps) => {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 4);
  };

  const hasMoreArticles = displayCount < articles.length;

  return (
    <section className="py-16 px-6 bg-secondary/10">
      <div className="container">
        <h2 className="text-3xl font-bold text-primary mb-12">Latest Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles.slice(0, displayCount).map((article) => (
            <ArticleCard key={article.slug} article={article} variant="latest" />
          ))}
        </div>
        
        {hasMoreArticles && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-block px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestArticles;
