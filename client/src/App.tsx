import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Articles from "@/pages/Articles";
import Category from "@/pages/Category";
import Search from "@/pages/Search";
import About from "@/pages/About";
import AuthPage from "@/pages/auth-page";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";

function Router() {
  // We're keeping isSearchVisible but now it just controls 
  // if the search bar is visible in the header on mobile
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isSearchVisible={isSearchVisible} toggleSearch={toggleSearch} />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/articles" component={Articles} />
          <Route path="/articles/:slug" component={Article} />
          <Route path="/categories/:slug" component={Category} />
          <Route path="/search" component={Search} />
          <Route path="/about" component={About} />
          <Route path="/auth" component={AuthPage} />
          {/* Protected routes would use this pattern: */}
          {/* <ProtectedRoute path="/profile" component={ProfilePage} /> */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="japan-housing-theme">
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
