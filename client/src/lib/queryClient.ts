import { QueryClient, QueryFunction } from "@tanstack/react-query";
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
export async function apiRequest<T>(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<T> {
  // Add a small delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Parse the URL to determine what data to return
  const path = url.split('?')[0]; // Remove any query parameters
  
  switch (path) {
    case '/api/articles':
      return clientDataAPI.getArticles() as unknown as T;
    case '/api/articles/featured':
      return clientDataAPI.getFeaturedArticles() as unknown as T;
    case '/api/articles/latest':
      return clientDataAPI.getLatestArticles() as unknown as T;
    case '/api/categories':
      return clientDataAPI.getCategories() as unknown as T;
    case '/api/categories/featured':
      return clientDataAPI.getFeaturedCategories() as unknown as T;
    default:
      // Handle article by slug
      if (path.startsWith('/api/articles/')) {
        const slug = path.replace('/api/articles/', '');
        return clientDataAPI.getArticleBySlug(slug) as unknown as T;
      }
      // Handle category by slug
      if (path.startsWith('/api/categories/')) {
        const slug = path.replace('/api/categories/', '');
        return clientDataAPI.getCategoryBySlug(slug) as unknown as T;
      }
      // Handle articles by category
      if (path.startsWith('/api/categories/') && path.includes('/articles')) {
        const slug = path.split('/')[3]; // Extract category slug
        return clientDataAPI.getArticlesByCategory(slug) as unknown as T;
      }
      // Handle search
      if (path === '/api/search' && data && typeof data === 'object' && 'query' in data) {
        const query = (data as { query: string }).query;
        return clientDataAPI.searchArticles(query) as unknown as T;
      }
      
      throw new Error(`Not found: ${url}`);
  }
}

// Custom query function that works with our static data
export const getQueryFn: <T>() => QueryFunction<T> =
  () =>
  async ({ queryKey }) => {
    // Add a small delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const path = queryKey[0] as string;
    
    // Handle special cases like articles by slug
    if (typeof path === 'string') {
      try {
        return await apiRequest<T>('GET', path);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
    
    throw new Error(`Invalid query key: ${queryKey}`);
  };

// Create and export the query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn(),
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
