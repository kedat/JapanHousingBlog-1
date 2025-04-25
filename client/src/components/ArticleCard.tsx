import { Link } from "wouter";
import { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
  variant?: "featured" | "latest";
}

const ArticleCard = ({ article, variant = "featured" }: ArticleCardProps) => {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (variant === "latest") {
    return (
      <article className="flex flex-col md:flex-row gap-6 group bg-white border border-secondary/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="md:w-1/3 relative overflow-hidden">
          <Link href={`/articles/${article.slug}`} className="block h-full">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-60 md:h-full object-cover transition duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-60 md:block hidden"></div>
          </Link>
        </div>
        <div className="md:w-2/3 p-6 flex flex-col justify-center">
          <div className="flex gap-2 mb-4 flex-wrap">
            {article.categories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/categories/${category.slug}`}
                className="inline-block px-3 py-1 text-xs bg-secondary/20 text-primary rounded-full"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
            <Link href={`/articles/${article.slug}`} className="hover:text-accent">
              {article.title}
            </Link>
          </h3>
          <p className="mt-3 text-text/80 line-clamp-2">{article.excerpt}</p>
          
          <div className="mt-6 pt-4 border-t border-secondary/10 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              <span className="text-sm font-medium">{article.author.name}</span>
            </div>
            <div className="flex items-center text-xs text-text/70">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white border border-secondary/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative overflow-hidden h-64">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70"></div>
          
          {/* Categories positioned over the image */}
          <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap z-10">
            {article.categories.map((category) => (
              <span
                key={category.slug}
                className="inline-block px-3 py-1 text-xs bg-white/90 text-primary rounded-full shadow-sm backdrop-blur-sm"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
            {article.title}
          </h3>
          <p className="mt-3 text-text/80 line-clamp-2">{article.excerpt}</p>
          
          <div className="mt-6 pt-4 border-t border-secondary/10 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              <span className="text-sm font-medium">{article.author.name}</span>
            </div>
            <div className="flex items-center text-xs text-text/70">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
