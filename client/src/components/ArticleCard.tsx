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
      <article className="flex flex-col md:flex-row gap-4 group bg-card border border-secondary/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        {/* Image container */}
        <div className="md:w-1/3 relative overflow-hidden">
          <Link href={`/articles/${article.slug}`} className="block h-full">
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              className="w-full h-48 md:h-full object-cover transition duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay - mobile version */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 md:hidden"></div>
            {/* Gradient overlay - desktop version */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-60 hidden md:block"></div>
            
            {/* Categories positioned over the image on mobile */}
            <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap z-10 md:hidden">
              {article.categories.slice(0, 2).map((category) => (
                <span
                  key={category.slug}
                  className="inline-block px-2 py-1 text-xs bg-white/90 text-primary rounded-full shadow-sm backdrop-blur-sm"
                >
                  {category.name}
                </span>
              ))}
              {article.categories.length > 2 && (
                <span className="inline-block px-2 py-1 text-xs bg-white/90 text-primary rounded-full shadow-sm backdrop-blur-sm">
                  +{article.categories.length - 2}
                </span>
              )}
            </div>
          </Link>
        </div>
        
        {/* Content */}
        <div className="md:w-2/3 p-4 md:p-6 flex flex-col justify-center">
          {/* Categories - desktop only */}
          <div className="hidden md:flex gap-2 mb-4 flex-wrap">
            {article.categories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/categories/${category.slug}`}
                className="inline-block px-3 py-1 text-xs bg-secondary/20 text-primary rounded-full hover:bg-secondary/40 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
          
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
            <Link href={`/articles/${article.slug}`} className="hover:text-accent">
              {article.title}
            </Link>
          </h3>
          
          {/* Excerpt */}
          <p className="mt-2 md:mt-3 text-sm md:text-base text-foreground/80 line-clamp-2">{article.excerpt}</p>
          
          {/* Author and meta information */}
          <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-secondary/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                loading="lazy"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover mr-2 md:mr-3"
              />
              <span className="text-xs md:text-sm font-medium">{article.author.name}</span>
            </div>
            <div className="flex items-center text-xs text-foreground/70">
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
    <article className="group bg-card border border-secondary/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={`/articles/${article.slug}`} className="block">
        {/* Image section */}
        <div className="relative overflow-hidden h-52 sm:h-64">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70"></div>
          
          {/* Categories positioned over the image */}
          <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap z-10 max-w-[90%]">
            {article.categories.slice(0, 2).map((category) => (
              <span
                key={category.slug}
                className="inline-block px-2 py-0.5 md:px-3 md:py-1 text-xs bg-white/90 text-primary rounded-full shadow-sm backdrop-blur-sm"
              >
                {category.name}
              </span>
            ))}
            {article.categories.length > 2 && (
              <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 text-xs bg-white/90 text-primary rounded-full shadow-sm backdrop-blur-sm">
                +{article.categories.length - 2}
              </span>
            )}
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
            {article.title}
          </h3>
          <p className="mt-2 md:mt-3 text-sm md:text-base text-foreground/80 line-clamp-2">{article.excerpt}</p>
          
          <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-secondary/10 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                loading="lazy"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover mr-2 md:mr-3"
              />
              <span className="text-xs md:text-sm font-medium">{article.author.name}</span>
            </div>
            <div className="flex items-center text-xs text-foreground/70">
              <span className="hidden sm:inline">{formattedDate}</span>
              <span className="sm:inline hidden mx-2">•</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
