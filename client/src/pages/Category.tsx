import { useParams } from "wouter";
import { useEffect, useState } from "react";
import { getArticlesByCategory, Article } from "@/data/articles";
import { getCategoryBySlug } from "@/data/categories";
import ArticleCard from "@/components/ArticleCard";
import NotFound from "./not-found";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  
  const category = getCategoryBySlug(slug);
  
  useEffect(() => {
    if (category) {
      document.title = `${category.name} Articles | Japan Housing`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          category.description
        );
      }
      
      setArticles(getArticlesByCategory(slug));
    }
  }, [category, slug]);
  
  if (!category) {
    return <NotFound />;
  }
  
  return (
    <div className="py-16 px-6">
      <div className="container">
        <div className="relative h-96 mb-16 rounded-lg overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary/30"></div>
          <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-lg text-white/90">{category.description}</p>
          </div>
        </div>
        
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No articles found</h2>
            <p className="text-text">Check back soon for new content in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
