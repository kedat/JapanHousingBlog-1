import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { getArticleBySlug, getRelatedArticles } from "@/data/articles";
import FeaturedArticles from "@/components/FeaturedArticles";
import NewsletterSection from "@/components/NewsletterSection";
import NotFound from "./not-found";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  
  const article = getArticleBySlug(slug);
  
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Japan Housing`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", article.excerpt);
      }
    }
  }, [article]);
  
  if (!article) {
    return <NotFound />;
  }
  
  const relatedArticles = getRelatedArticles(article);
  
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  
  return (
    <>
      <article className="py-12 px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-8 flex flex-wrap gap-2">
            {article.categories.map(category => (
              <span 
                key={category.slug} 
                onClick={() => setLocation(`/categories/${category.slug}`)}
                className="inline-block px-3 py-1 text-xs bg-secondary text-text rounded-full cursor-pointer hover:bg-secondary/80"
              >
                {category.name}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">{article.title}</h1>
          
          <div className="flex items-center mb-8">
            <img 
              src={article.author.avatar} 
              alt={article.author.name} 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4">
              <p className="font-medium">{article.author.name}</p>
              <div className="text-sm text-text">
                <span>{formattedDate}</span>
                <span className="mx-2">•</span>
                <span>{article.readingTime} min read</span>
              </div>
            </div>
          </div>
          
          <div className="mb-10">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto object-cover rounded"
            />
          </div>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
      
      <div className="py-12 px-6 bg-secondary/10">
        <div className="container">
          <h2 className="text-3xl font-bold text-primary mb-12">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map(relatedArticle => (
              <div 
                key={relatedArticle.slug} 
                className="group cursor-pointer"
                onClick={() => setLocation(`/articles/${relatedArticle.slug}`)}
              >
                <div className="overflow-hidden">
                  <img 
                    src={relatedArticle.image} 
                    alt={relatedArticle.title} 
                    className="w-full h-48 object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-primary group-hover:text-accent transition">
                  {relatedArticle.title}
                </h3>
                <p className="mt-2 text-text">{relatedArticle.excerpt.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <NewsletterSection />
    </>
  );
};

export default Article;
