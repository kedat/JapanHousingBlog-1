import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useSearch } from "@/hooks/useSearch";
import ArticleCard from "@/components/ArticleCard";
import { Loader2 } from "lucide-react";

const Search = () => {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Parse the search query from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    const query = params.get("q") || "";
    setSearchQuery(query);
    
    document.title = `Search: ${query} | Japan Housing`;
  }, [location]);
  
  const { results, isSearching, hasSearched } = useSearch(searchQuery);
  
  const handleNewSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    
    if (query.trim()) {
      const newLocation = `/search?q=${encodeURIComponent(query.trim())}`;
      window.history.pushState(null, "", newLocation);
      setSearchQuery(query.trim());
    }
  };
  
  return (
    <div className="py-16 px-6">
      <div className="container max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Search Results</h1>
        
        <form onSubmit={handleNewSearch} className="mb-12">
          <div className="flex">
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search articles..."
              className="flex-grow px-4 py-3 border border-secondary focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-medium hover:bg-primary/90 transition duration-300"
            >
              Search
            </button>
          </div>
        </form>
        
        {isSearching ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {hasSearched && (
              <div className="mb-8">
                <p className="text-text">
                  {results.length === 0
                    ? `No results found for "${searchQuery}"`
                    : `Found ${results.length} result${results.length === 1 ? "" : "s"} for "${searchQuery}"`}
                </p>
              </div>
            )}
            
            {results.length > 0 && (
              <div className="grid grid-cols-1 gap-8">
                {results.map(article => (
                  <ArticleCard key={article.slug} article={article} variant="latest" />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
