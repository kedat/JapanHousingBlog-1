import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { Article } from "@/data/articles";

interface HeroSectionProps {
  article: Article;
}

const HeroSection = ({ article }: HeroSectionProps) => {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const readingTime = `${article.readingTime} min read`;

  return (
    <section className="py-12 md:py-24 px-6">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <span className="text-accent font-medium">Latest Feature</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-primary">
            {article.title}
          </h1>
          <p className="mt-6 text-lg text-text">
            {article.excerpt}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <img 
                src={article.author.avatar} 
                alt={article.author.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-primary">{article.author.name}</p>
                <p className="text-xs text-text">{article.author.title}</p>
              </div>
            </div>
            <div className="text-sm text-text">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{readingTime}</span>
            </div>
          </div>
        </div>
        <div className="mt-12 max-w-5xl mx-auto">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto object-cover aspect-[16/9]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
