export interface Category {
  name: string;
  slug: string;
}

export interface Author {
  name: string;
  title: string;
  avatar: string;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  rating: number;
  summarize: string;
  minsRead: number;
  content: string;
  postView: number;
  url: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  images: any;
  thumbnail: any;
  category: Category[];
  tags: any;
  localizations: any;
}

export const articles: Article[] = [
  {
    id: 1,
    documentId: "doc1",
    title: "The Evolution of Sustainable Housing in Urban Tokyo",
    rating: 4.5,
    summarize: "Exploring sustainable housing solutions in Tokyo.",
    minsRead: 12,
    content: `
      <p>Tokyo's urban landscape presents unique challenges for sustainable housing. With limited space and a dense population, architects and designers are developing innovative solutions that balance environmental concerns with livability.</p>
    `,
    postView: 1200,
    url: "https://example.com/evolution-sustainable-housing",
    metaDescription:
      "Discover how Tokyo is tackling urban density with sustainable housing.",
    createdAt: "2023-06-15T00:00:00Z",
    updatedAt: "2023-06-15T00:00:00Z",
    publishedAt: "2023-06-15T00:00:00Z",
    locale: "en",
    images: null,
    thumbnail: null,
    category: [
      { name: "Architecture", slug: "architecture" },
      { name: "Sustainability", slug: "sustainability" },
    ],
    tags: [],
    localizations: [],
  },
  {
    id: 2,
    documentId: "doc2",
    title: "Traditional Meets Modern: The New Wave of Tokyo Residences",
    rating: 4.8,
    summarize: "Blending traditional Japanese elements with modern design.",
    minsRead: 8,
    content: `
      <p>In Tokyo's ever-evolving urban landscape, a new architectural movement is taking shape—one that harmoniously blends traditional Japanese design principles with contemporary aesthetics and functionality.</p>
    `,
    postView: 950,
    url: "https://example.com/traditional-meets-modern",
    metaDescription:
      "Learn how architects are blending traditional and modern design in Tokyo.",
    createdAt: "2023-05-28T00:00:00Z",
    updatedAt: "2023-05-28T00:00:00Z",
    publishedAt: "2023-05-28T00:00:00Z",
    locale: "en",
    images: null,
    thumbnail: null,
    category: [
      { name: "Architecture", slug: "architecture" },
      { name: "Design", slug: "design" },
    ],
    tags: [],
    localizations: [],
  },
  {
    id: 3,
    documentId: "doc3",
    title:
      "The Rural Renaissance: Investment Opportunities Outside Major Cities",
    rating: 4.2,
    summarize: "Exploring property investment in Japan's countryside.",
    minsRead: 10,
    content: `
      <p>As remote work becomes increasingly normalized in post-pandemic Japan, a significant shift in real estate investment is underway.</p>
    `,
    postView: 800,
    url: "https://example.com/rural-renaissance",
    metaDescription:
      "Discover investment opportunities in Japan's rural areas.",
    createdAt: "2023-05-14T00:00:00Z",
    updatedAt: "2023-05-14T00:00:00Z",
    publishedAt: "2023-05-14T00:00:00Z",
    locale: "en",
    images: null,
    thumbnail: null,
    category: [
      { name: "Real Estate", slug: "real-estate" },
      { name: "Investment", slug: "investment" },
    ],
    tags: [],
    localizations: [],
  },
];

export const getFeaturedArticles = () => {
  return articles.filter((article) => article.rating >= 4.5);
};

export const getLatestArticles = async () => {
  const response = await fetch(
    "https://appetizing-rainbow-7be3491610.strapiapp.com/api/blogs?pagination[pageSize]=6&populate=*"
  );
  const data = await response.json();
  return data;
};

export const getArticleBySlug = (slug: string) => {
  return articles.find((article) => article.url.includes(slug));
};

export const getRelatedArticles = (currentArticle: Article, count = 3) => {
  const relatedByCategoryArticles = articles.filter(
    (article) =>
      article.id !== currentArticle.id &&
      article.category.some((category) =>
        currentArticle.category.some(
          (currentCategory) => currentCategory.slug === category.slug
        )
      )
  );

  if (relatedByCategoryArticles.length >= count) {
    return relatedByCategoryArticles.slice(0, count);
  }

  const otherArticles = articles
    .filter(
      (article) =>
        article.id !== currentArticle.id &&
        !relatedByCategoryArticles.some((related) => related.id === article.id)
    )
    .slice(0, count - relatedByCategoryArticles.length);

  return [...relatedByCategoryArticles, ...otherArticles];
};

export const searchArticles = (query: string) => {
  const lowerCaseQuery = query.toLowerCase();

  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerCaseQuery) ||
      article.summarize.toLowerCase().includes(lowerCaseQuery) ||
      article.content.toLowerCase().includes(lowerCaseQuery) ||
      article.category.some((category) =>
        category.name.toLowerCase().includes(lowerCaseQuery)
      )
  );
};

export const getArticlesByCategory = (categorySlug: string) => {
  return articles.filter((article) =>
    article.category.some((category) => category.slug === categorySlug)
  );
};
