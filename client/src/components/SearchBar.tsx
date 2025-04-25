import { useState } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="mt-6 pb-6">
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full px-4 py-3 border border-secondary focus:outline-none focus:border-accent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text hover:text-accent"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
