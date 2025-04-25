import { useEffect, useState, useMemo } from "react";
import { getLatestArticles, Article } from "@/data/articles";
import { categories, Category } from "@/data/categories";
import ArticleCard from "@/components/ArticleCard";
import { ChevronLeft, ChevronRight, Filter, SlidersHorizontal, X } from "lucide-react";

const PAGE_SIZE = 6;

const Articles = () => {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    document.title = "All Articles | Japan Housing";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Browse all articles about Japanese architecture, real estate, and interior design on Japan Housing."
      );
    }
    
    setAllArticles(getLatestArticles());
  }, []);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let result = [...allArticles];
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(article => 
        article.categories.some(category => 
          selectedCategories.includes(category.slug)
        )
      );
    }
    
    // Apply sorting
    result = result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    return result;
  }, [allArticles, selectedCategories, sortOrder]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / PAGE_SIZE);
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredArticles.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredArticles, currentPage]);

  // Handle category filter toggle
  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev => 
      prev.includes(slug)
        ? prev.filter(cat => cat !== slug)
        : [...prev, slug]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle filter reset
  const resetFilters = () => {
    setSelectedCategories([]);
    setSortOrder("newest");
    setCurrentPage(1);
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return (
    <div className="py-16 px-6">
      <div className="container">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Articles</h1>
          <p className="text-lg text-text">
            Discover insights into Japanese architecture, real estate trends, and design innovations through our collection of in-depth articles.
          </p>
        </div>
        
        {/* Filter Bar */}
        <div className="mb-8 flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-primary hover:text-accent transition-colors"
          >
            <SlidersHorizontal size={18} />
            <span>Filter & Sort</span>
          </button>
          
          <div className="text-sm text-text">
            Showing {filteredArticles.length} articles
          </div>
        </div>
        
        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 p-6 border border-secondary/20 rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">Filter Articles</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-text hover:text-accent transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.slug}
                      onClick={() => toggleCategory(category.slug)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedCategories.includes(category.slug)
                          ? 'bg-primary text-white'
                          : 'bg-secondary/20 text-text hover:bg-secondary/30'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort Options */}
              <div>
                <h4 className="font-medium mb-3">Sort By</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortOrder("newest")}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      sortOrder === "newest"
                        ? 'bg-primary text-white'
                        : 'bg-secondary/20 text-text hover:bg-secondary/30'
                    }`}
                  >
                    Newest First
                  </button>
                  <button
                    onClick={() => setSortOrder("oldest")}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      sortOrder === "oldest"
                        ? 'bg-primary text-white'
                        : 'bg-secondary/20 text-text hover:bg-secondary/30'
                    }`}
                  >
                    Oldest First
                  </button>
                </div>
              </div>
            </div>
            
            {/* Reset Button */}
            <div className="mt-6 text-right">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-accent hover:bg-accent/5 transition-colors rounded-md"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Active Filters */}
        {selectedCategories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-text">Active filters:</span>
              {selectedCategories.map(slug => {
                const category = categories.find(c => c.slug === slug);
                return (
                  <span 
                    key={slug}
                    className="inline-flex items-center px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {category?.name}
                    <button
                      onClick={() => toggleCategory(slug)}
                      className="ml-2 text-primary hover:text-accent"
                    >
                      <X size={14} />
                    </button>
                  </span>
                );
              })}
              <button
                onClick={resetFilters}
                className="text-xs text-accent hover:underline"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
        
        {/* Article Grid */}
        {paginatedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedArticles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-secondary/30 rounded-lg">
            <h3 className="text-xl font-medium text-primary mb-2">No articles found</h3>
            <p className="text-text">Try adjusting your filters to find what you're looking for.</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredArticles.length > PAGE_SIZE && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? 'text-text/40 cursor-not-allowed'
                  : 'text-primary hover:bg-primary/10'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              // Show current page, first page, last page, and pages around current
              const shouldShow = 
                pageNumber === 1 || 
                pageNumber === totalPages || 
                Math.abs(pageNumber - currentPage) <= 1;
              
              // For ellipsis
              const showLeftEllipsis = pageNumber === currentPage - 2 && currentPage > 3;
              const showRightEllipsis = pageNumber === currentPage + 2 && currentPage < totalPages - 2;
              
              if (shouldShow) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-primary text-white'
                        : 'hover:bg-secondary/20 text-text'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (showLeftEllipsis || showRightEllipsis) {
                return <span key={pageNumber} className="text-text">...</span>;
              }
              
              return null;
            })}
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? 'text-text/40 cursor-not-allowed'
                  : 'text-primary hover:bg-primary/10'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
