import { useEffect, useState } from "react";
import { getLatestArticles, Article } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [displayCount, setDisplayCount] = useState(8);
  
  useEffect(() => {
    document.title = "All Articles | Japan Housing";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Browse all articles about Japanese architecture, real estate, and interior design on Japan Housing."
      );
    }
    
    setArticles(getLatestArticles());
  }, []);
  
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 8);
  };
  
  const hasMoreArticles = displayCount < articles.length;
  
  return (
    <div className="py-16 px-6">
      <div className="container">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Articles</h1>
          <p className="text-lg text-text">
            Discover insights into Japanese architecture, real estate trends, and design innovations through our collection of in-depth articles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.slice(0, displayCount).map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        
        {hasMoreArticles && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="inline-block px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
