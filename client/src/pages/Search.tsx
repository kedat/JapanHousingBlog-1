import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "wouter";
import { useSearch } from "@/hooks/useSearch";
import ArticleCard from "@/components/ArticleCard";
import { Loader2, Search as SearchIcon, ArrowRight, HomeIcon, Book, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";

const Search = () => {
  const [location] = useLocation();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Parse the search query from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    const query = params.get("q") || "";
    setSearchQuery(query);
    
    document.title = query ? `Search: ${query} | Japan Housing` : `Search | Japan Housing`;
    
    // Auto focus the search input when the page loads
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

  const clearSearch = () => {
    setSearchQuery("");
    window.history.pushState(null, "", "/search");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const popularSearchTerms = ["minimalism", "japanese", "architecture", "housing", "tokyo", "design"];
  
  return (
    <div className="py-10 md:py-16 px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Search form & filters */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-primary mb-5">Search</h2>
                
                <form onSubmit={handleNewSearch} className="mb-6">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50">
                      <SearchIcon className="h-5 w-5" />
                    </div>
                    {searchQuery && (
                      <button 
                        type="button" 
                        onClick={clearSearch}
                        className="absolute right-12 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <input
                      ref={inputRef}
                      type="text"
                      name="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search articles..."
                      className="w-full pl-10 pr-[4.5rem] py-3 border border-secondary rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                    <Button 
                      type="submit"
                      size="sm" 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    >
                      Search
                    </Button>
                  </div>
                </form>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-foreground/70 mb-3">Popular Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearchTerms.map((term) => (
                        <Badge 
                          key={term}
                          variant="outline" 
                          className="cursor-pointer hover:bg-secondary/20"
                          onClick={() => {
                            const newLocation = `/search?q=${encodeURIComponent(term)}`;
                            window.history.pushState(null, "", newLocation);
                            setSearchQuery(term);
                          }}
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-foreground/70 mb-3">Categories</h3>
                    <div className="space-y-1">
                      {categories.slice(0, 5).map((category) => (
                        <Link
                          key={category.slug}
                          href={`/categories/${category.slug}`}
                          className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-secondary/10 transition-colors"
                        >
                          <span className="text-sm">{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.articleCount}
                          </Badge>
                        </Link>
                      ))}
                      <Link 
                        href="/categories"
                        className="flex items-center text-sm text-accent hover:underline px-3 py-2"
                      >
                        See all categories <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-foreground/70 mb-3">Quick Links</h3>
                    <div className="space-y-1">
                      <Link
                        href="/"
                        className="flex items-center px-3 py-2 rounded-md hover:bg-secondary/10 transition-colors"
                      >
                        <HomeIcon className="h-4 w-4 mr-2 text-foreground/70" />
                        <span className="text-sm">Home</span>
                      </Link>
                      <Link
                        href="/articles"
                        className="flex items-center px-3 py-2 rounded-md hover:bg-secondary/10 transition-colors"
                      >
                        <Book className="h-4 w-4 mr-2 text-foreground/70" />
                        <span className="text-sm">All Articles</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Search results */}
          <div className="md:col-span-2">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
              {!searchQuery ? "Search Articles" : "Search Results"}
            </h1>
            
            {isSearching ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {searchQuery && hasSearched && (
                  <div className="mb-8">
                    <p className="text-foreground/70">
                      {results.length === 0
                        ? `No results found for "${searchQuery}"`
                        : `Found ${results.length} result${results.length === 1 ? "" : "s"} for "${searchQuery}"`}
                    </p>
                  </div>
                )}
                
                {!searchQuery && !hasSearched && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <SearchIcon className="h-16 w-16 text-foreground/20 mb-4" />
                    <h2 className="text-xl font-medium mb-2">What are you looking for?</h2>
                    <p className="text-foreground/60 max-w-md">
                      Search for articles about Japanese housing, architecture, design, and more.
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
      </div>
    </div>
  );
};

export default Search;
