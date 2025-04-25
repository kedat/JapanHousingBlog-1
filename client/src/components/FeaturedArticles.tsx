import { Link } from "wouter";
import ArticleCard from "./ArticleCard";
import { Article } from "@/data/articles";

interface FeaturedArticlesProps {
  articles: Article[];
}

const FeaturedArticles = ({ articles }: FeaturedArticlesProps) => {
  return (
    <section className="py-16 px-6 bg-secondary/10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
          <h2 className="text-3xl font-bold text-primary">Featured Articles</h2>
          <Link href="/articles" className="mt-3 md:mt-0 text-accent hover:underline">
            View All Articles →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
