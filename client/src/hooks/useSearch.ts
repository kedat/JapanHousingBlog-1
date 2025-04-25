import { useState, useEffect } from "react";
import { searchArticles, Article } from "@/data/articles";

interface UseSearchResult {
  results: Article[];
  isSearching: boolean;
  hasSearched: boolean;
}

export function useSearch(query: string): UseSearchResult {
  const [results, setResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      setHasSearched(false);
      return;
    }

    const performSearch = async () => {
      setIsSearching(true);
      
      // In a real application, this might be an API call
      // Here we're using our static data
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        const searchResults = searchArticles(query);
        setResults(searchResults);
        setHasSearched(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [query]);

  return { results, isSearching, hasSearched };
}
