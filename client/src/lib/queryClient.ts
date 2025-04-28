import { QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query";
import { articles, Article, getFeaturedArticles, getLatestArticles, getArticleBySlug, getRelatedArticles, searchArticles, getArticlesByCategory } from "../data/articles";
import { categories, Category, getCategoryBySlug, getFeaturedCategories } from "../data/categories";
import { getUserById, getUserByUsername, User } from "../data/users";

// Mock API functions that work with our static data
export interface ClientDataAPI {
  getArticles: () => Article[];
  getFeaturedArticles: () => Article[];
  getLatestArticles: () => Article[];
  getArticleBySlug: (slug: string) => Article | undefined;
  getRelatedArticles: (article: Article, count?: number) => Article[];
  searchArticles: (query: string) => Article[];
  getArticlesByCategory: (categorySlug: string) => Article[];
  getCategories: () => Category[];
  getCategoryBySlug: (slug: string) => Category | undefined;
  getFeaturedCategories: (count?: number) => Category[];
  getUserById: (id: number) => User | undefined;
  getUserByUsername: (username: string) => User | undefined;
}

// Singleton instance of our client-side data API
export const clientDataAPI: ClientDataAPI = {
  getArticles: () => articles,
  getFeaturedArticles,
  getLatestArticles,
  getArticleBySlug,
  getRelatedArticles,
  searchArticles,
  getArticlesByCategory,
  getCategories: () => categories,
  getCategoryBySlug,
  getFeaturedCategories,
  getUserById,
  getUserByUsername
};

// Simulates a network request to match the behavior of real API calls
// but returns data from our static data files
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<unknown> {
  // Add a small delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Parse the URL to determine what data to return
  const path = url.split('?')[0]; // Remove any query parameters
  
  switch (path) {
    case '/api/articles':
      return articles;
    case '/api/articles/featured':
      return getFeaturedArticles();
    case '/api/articles/latest':
      return getLatestArticles();
    case '/api/categories':
      return categories;
    case '/api/categories/featured':
      return getFeaturedCategories();
    case '/api/user':
      return null; // Return null for user until logged in
    default:
      // Handle article by slug
      if (path.startsWith('/api/articles/')) {
        const slug = path.replace('/api/articles/', '');
        return getArticleBySlug(slug);
      }
      // Handle category by slug
      if (path.startsWith('/api/categories/')) {
        const slug = path.replace('/api/categories/', '');
        return getCategoryBySlug(slug);
      }
      // Handle articles by category
      if (path.startsWith('/api/categories/') && path.includes('/articles')) {
        const slug = path.split('/')[3]; // Extract category slug
        return getArticlesByCategory(slug);
      }
      // Handle search
      if (path === '/api/search' && data && typeof data === 'object' && 'query' in data) {
        const query = (data as { query: string }).query;
        return searchArticles(query);
      }
      
      throw new Error(`Not found: ${url}`);
  }
}

// Create and export the query client with default static data handler
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => {
        if (typeof queryKey[0] === 'string') {
          return apiRequest('GET', queryKey[0]);
        }
        throw new Error(`Invalid query key: ${String(queryKey)}`);
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
