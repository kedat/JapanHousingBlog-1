export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  articleCount: number;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Architecture",
    slug: "architecture",
    description: "Exploring Japanese architectural styles, innovations, and influential designers shaping Japan's built environment.",
    image: "https://images.unsplash.com/photo-1545042746-ec9e5a59bc5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    articleCount: 42
  },
  {
    id: 2,
    name: "Real Estate",
    slug: "real-estate",
    description: "Analysis of Japan's property market trends, investment opportunities, and residential real estate developments.",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    articleCount: 36
  },
  {
    id: 3,
    name: "Interior Design",
    slug: "interior",
    description: "Japanese approaches to interior spaces, from traditional minimalism to contemporary styling and space optimization.",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    articleCount: 29
  },
  {
    id: 4,
    name: "Sustainability",
    slug: "sustainability",
    description: "Green building practices, eco-friendly housing solutions, and sustainable living approaches in Japan.",
    image: "https://images.unsplash.com/photo-1555044272-56e8f5585e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    articleCount: 24
  },
  {
    id: 5,
    name: "Design",
    slug: "design",
    description: "Innovative design approaches, space optimization, and aesthetic principles in Japanese housing.",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    articleCount: 31
  },
  {
    id: 6,
    name: "Technology",
    slug: "technology",
    description: "Smart home innovations, technological integration, and futuristic housing concepts in Japan.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    articleCount: 18
  },
  {
    id: 7,
    name: "Market Trends",
    slug: "market-trends",
    description: "Current patterns, forecasts, and analysis of Japan's housing market and economic factors.",
    image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    articleCount: 22
  },
  {
    id: 8,
    name: "Minimalism",
    slug: "minimalism",
    description: "The principles and practice of minimalist living, design, and housing in the Japanese context.",
    image: "https://images.unsplash.com/photo-1551527829-ed219f3d3abe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    articleCount: 15
  },
  {
    id: 9,
    name: "Investment",
    slug: "investment",
    description: "Strategies, opportunities, and guidance for investing in Japanese real estate and property markets.",
    image: "https://images.unsplash.com/photo-1604594849809-dfed6fbe589c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    articleCount: 19
  },
  {
    id: 10,
    name: "Revitalization",
    slug: "revitalization",
    description: "Projects and initiatives breathing new life into abandoned properties and rural areas across Japan.",
    image: "https://images.unsplash.com/photo-1555254756-e32645998236?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    articleCount: 12
  }
];

export const getCategoryBySlug = (slug: string) => {
  return categories.find(category => category.slug === slug);
};

export const getFeaturedCategories = (count = 4) => {
  return categories.slice(0, count);
};
