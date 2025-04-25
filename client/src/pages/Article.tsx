import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "wouter";
import { getArticleBySlug, getRelatedArticles, getLatestArticles } from "@/data/articles";
import { getCategoryBySlug } from "@/data/categories";
import NewsletterSection from "@/components/NewsletterSection";
import NotFound from "./not-found";
import { Share2, Facebook, Twitter, Linkedin, Link2, Calendar, Clock, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const [showSocialShare, setShowSocialShare] = useState(false);
  
  const article = getArticleBySlug(slug);
  const latestArticles = getLatestArticles(4);
  
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Japan Housing`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", article.excerpt);
      }
    }
  }, [article]);

  useEffect(() => {
    // Reset scroll position when article changes
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!article) {
    return <NotFound />;
  }
  
  const relatedArticles = getRelatedArticles(article);
  
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const toggleSocialShare = () => {
    setShowSocialShare(!showSocialShare);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article.title;

  // Social share links
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };
  
  return (
    <>
      <div className="bg-secondary/5 py-6 px-6 border-b">
        <div className="container">
          <div className="flex items-center text-sm text-foreground/70">
            <Link href="/" className="hover:text-accent transition duration-200">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/articles" className="hover:text-accent transition duration-200">Articles</Link>
            {article.categories[0] && (
              <>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link 
                  href={`/categories/${article.categories[0].slug}`} 
                  className="hover:text-accent transition duration-200"
                >
                  {article.categories[0].name}
                </Link>
              </>
            )}
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground/50 truncate">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="container py-mobile">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <article className="lg:w-2/3">
            <div className="mb-6 flex flex-wrap gap-2">
              {article.categories.map(category => (
                <Badge 
                  key={category.slug} 
                  onClick={() => setLocation(`/categories/${category.slug}`)}
                  className="cursor-pointer"
                  variant="secondary"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">{article.title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={article.author.avatar} alt={article.author.name} />
                  <AvatarFallback>{article.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{article.author.name}</p>
                  <div className="text-xs text-foreground/60 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formattedDate}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{article.readingTime} min read</span>
                  </div>
                </div>
              </div>
              
              {/* Social Share Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={toggleSocialShare}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                
                {showSocialShare && (
                  <div className="absolute right-0 top-10 bg-card shadow-lg rounded-md p-3 z-10 border border-border min-w-44">
                    <div className="flex flex-col space-y-2">
                      <a 
                        href={facebookShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-2 py-1.5 hover:bg-secondary/20 rounded-md transition-colors"
                      >
                        <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-sm">Facebook</span>
                      </a>
                      <a 
                        href={twitterShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-2 py-1.5 hover:bg-secondary/20 rounded-md transition-colors"
                      >
                        <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                        <span className="text-sm">Twitter</span>
                      </a>
                      <a 
                        href={linkedinShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-2 py-1.5 hover:bg-secondary/20 rounded-md transition-colors"
                      >
                        <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                      <button 
                        onClick={copyLinkToClipboard}
                        className="flex items-center px-2 py-1.5 hover:bg-secondary/20 rounded-md transition-colors text-left"
                      >
                        <Link2 className="h-4 w-4 mr-2" />
                        <span className="text-sm">Copy Link</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-10 overflow-hidden rounded-lg">
              <img 
                src={article.image} 
                alt={article.title} 
                loading="lazy"
                className="w-full h-auto object-cover rounded-lg transition-transform hover:scale-[1.01] duration-700"
              />
            </div>
            
            <div 
              className="prose prose-lg max-w-none dark:prose-invert mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags Section */}
            <div className="mt-12 border-t border-b border-border py-6">
              <h3 className="text-lg font-bold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.categories.map(category => (
                  <Badge 
                    key={category.slug} 
                    variant="outline"
                    onClick={() => setLocation(`/categories/${category.slug}`)}
                    className="cursor-pointer hover:bg-secondary/20"
                  >
                    {category.name}
                  </Badge>
                ))}
                <Badge 
                  variant="outline"
                  onClick={() => setLocation(`/search?query=japanese`)}
                  className="cursor-pointer hover:bg-secondary/20"
                >
                  Japanese
                </Badge>
                <Badge 
                  variant="outline"
                  onClick={() => setLocation(`/search?query=housing`)}
                  className="cursor-pointer hover:bg-secondary/20"
                >
                  Housing
                </Badge>
                <Badge 
                  variant="outline"
                  onClick={() => setLocation(`/search?query=design`)}
                  className="cursor-pointer hover:bg-secondary/20"
                >
                  Design
                </Badge>
              </div>
            </div>

            {/* Share Article */}
            <div className="mt-8 mb-12">
              <h3 className="text-lg font-bold mb-4">Share This Article</h3>
              <div className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href={facebookShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-secondary/10 hover:bg-secondary/20 p-3 rounded-full transition-colors"
                      >
                        <Facebook className="h-5 w-5 text-blue-600" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href={twitterShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-secondary/10 hover:bg-secondary/20 p-3 rounded-full transition-colors"
                      >
                        <Twitter className="h-5 w-5 text-blue-400" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href={linkedinShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-secondary/10 hover:bg-secondary/20 p-3 rounded-full transition-colors"
                      >
                        <Linkedin className="h-5 w-5 text-blue-700" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={copyLinkToClipboard}
                        className="bg-secondary/10 hover:bg-secondary/20 p-3 rounded-full transition-colors"
                      >
                        <Link2 className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy link to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            {/* Author Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{article.author.name}</h3>
                    <p className="text-sm text-foreground/70">{article.author.title}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/70">
                  Expert in Japanese architecture and housing trends. Passionate about sustainable design and traditional Japanese aesthetics.
                </p>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Categories</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-2">
                <ul className="space-y-1">
                  {article.categories.map(category => {
                    const fullCategory = getCategoryBySlug(category.slug);
                    return (
                      <li key={category.slug}>
                        <Link 
                          href={`/categories/${category.slug}`}
                          className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-secondary/10 transition-colors"
                        >
                          <span>{category.name}</span>
                          {fullCategory && (
                            <Badge variant="secondary" className="text-xs">
                              {fullCategory.articleCount}
                            </Badge>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>

            {/* Latest Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Latest Posts</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-3">
                <ul className="space-y-4 divide-y divide-border">
                  {latestArticles.slice(0, 4).map((latestArticle) => (
                    <li key={latestArticle.slug} className={cn(latestArticle.id === article.id ? "opacity-50" : "", "pt-4 first:pt-0")}>
                      <Link 
                        href={`/articles/${latestArticle.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-20 h-20 overflow-hidden rounded-md flex-shrink-0">
                          <img 
                            src={latestArticle.image}
                            alt={latestArticle.title}
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium line-clamp-2 group-hover:text-accent transition-colors">
                            {latestArticle.title}
                          </h4>
                          <p className="text-xs text-foreground/60 mt-1">
                            {new Date(latestArticle.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href="/articles" className="text-sm text-accent hover:underline inline-flex items-center">
                  View all articles 
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            {/* Newsletter Signup (Mobile and Desktop) */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-xl">Subscribe to Our Newsletter</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Get the latest housing insights delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-4 py-2 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:ring-1 focus:ring-accent"
                  />
                  <Button variant="secondary" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
      
      {/* Related Articles */}
      <div className="py-16 px-6 bg-secondary/5 border-t">
        <div className="container">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Related Articles</h2>
            <Link href="/articles" className="text-accent hover:underline hidden md:flex items-center">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {relatedArticles.map(relatedArticle => (
              <Link
                key={relatedArticle.slug}
                href={`/articles/${relatedArticle.slug}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={relatedArticle.image} 
                    alt={relatedArticle.title}
                    loading="lazy" 
                    className="w-full h-48 md:h-56 object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <Badge variant="secondary" className="mb-2">
                    {relatedArticle.categories[0]?.name}
                  </Badge>
                  <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-accent transition">
                    {relatedArticle.title}
                  </h3>
                  <p className="mt-2 text-foreground/70 text-sm line-clamp-2">{relatedArticle.excerpt}</p>
                  <div className="mt-3 flex items-center text-xs text-foreground/60">
                    <span>
                      {new Date(relatedArticle.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{relatedArticle.readingTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" onClick={() => setLocation('/articles')}>
              View All Articles
            </Button>
          </div>
        </div>
      </div>
      
      <NewsletterSection />
    </>
  );
};

export default Article;
