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
      <article className="flex flex-col md:flex-row gap-6 group">
        <div className="md:w-1/3 overflow-hidden">
          <Link href={`/articles/${article.slug}`}>
            <a>
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 md:h-full object-cover transition duration-500 group-hover:scale-105"
              />
            </a>
          </Link>
        </div>
        <div className="md:w-2/3">
          <div className="flex gap-2 mb-3 flex-wrap">
            {article.categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`}>
                <a className="inline-block px-3 py-1 text-xs bg-secondary text-text rounded-full">
                  {category.name}
                </a>
              </Link>
            ))}
          </div>
          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition">
            <Link href={`/articles/${article.slug}`}>
              <a>{article.title}</a>
            </Link>
          </h3>
          <p className="mt-3 text-text">{article.excerpt}</p>
          <div className="mt-4 flex items-center text-sm text-text">
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={`/articles/${article.slug}`}>
        <a className="block">
          <div className="overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="mt-6">
            <div className="flex gap-2 mb-3 flex-wrap">
              {article.categories.map((category) => (
                <span
                  key={category.slug}
                  className="inline-block px-3 py-1 text-xs bg-secondary text-text rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition">
              {article.title}
            </h3>
            <p className="mt-3 text-text">{article.excerpt}</p>
            <div className="mt-4 flex items-center text-sm text-text">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </a>
      </Link>
    </article>
  );
};

export default ArticleCard;
