import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Search, ArrowRight } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the search bar appears
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const executeSearch = () => {
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow immediate search on Enter key
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  return (
    <div className="mt-6 pb-6">
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search articles..."
          className="w-full px-4 py-3 border border-secondary rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
          {searchQuery && (
            <button
              type="button"
              className="mr-1 px-2 py-1 text-xs text-primary-foreground bg-accent rounded-md flex items-center hover:bg-accent/80 transition-colors"
              aria-label="Search now"
              onClick={executeSearch}
            >
              <span className="mr-1">Search</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
          <button
            type="submit"
            className="p-2 text-foreground hover:text-accent transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
