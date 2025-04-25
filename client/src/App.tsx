import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Articles from "@/pages/Articles";
import Category from "@/pages/Category";
import Search from "@/pages/Search";
import About from "@/pages/About";
import { useState } from "react";

function App() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <TooltipProvider>
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
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
