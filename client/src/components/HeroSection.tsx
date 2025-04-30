import { Link } from "wouter";
import { Article } from "@/data/articles";

interface HeroSectionProps {
  article: Article;
}

const HeroSection = ({ article }: HeroSectionProps) => {
  return (
    <section className="py-12 md:py-24 px-6">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <span className="text-accent font-medium">Latest Feature</span>
          <Link href={`/articles/${article?.url}`}>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-primary hover:underline">
              {article?.title}
            </h1>
          </Link>
          <p className="mt-6 text-lg text-text">{article?.summarize}</p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
            <div className="text-sm text-text">
              <span>{new Date(article?.publishedAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{article?.minsRead} min read</span>
            </div>
          </div>
        </div>
        <div className="mt-12 max-w-5xl mx-auto">
          <Link href={`/articles/${article?.url}`}>
            <img
              src={article?.thumbnail?.url || ""}
              alt={article?.title}
              className="w-full h-auto object-cover aspect-[16/9] cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
