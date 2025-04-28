import { Link, useLocation } from "wouter";
import { Search, User, Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle, MobileLanguageToggle } from "./language-toggle";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/providers/language-provider";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isSearchVisible: boolean;
  toggleSearch: () => void;
}

const Header = ({ isSearchVisible, toggleSearch }: HeaderProps) => {
  const { user, logoutMutation } = useAuth();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate();
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const closeMenu = () => setMenuOpen(false);

  const goToSearch = () => {
    setLocation('/search');
  };

  return (
    <header className="border-b border-secondary sticky top-0 bg-background z-50">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl sm:text-2xl text-primary tracking-wider">
              JAPAN HOUSING
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link href="/search">
              <Button 
                variant="ghost"
                size="icon"
                className="mr-2 text-foreground hover:text-accent transition duration-300"
                aria-label="Go to search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white text-xs">
                        {user.name ? user.name.substring(0, 2).toUpperCase() : user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name || user.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="outline" size="sm" className="ml-2">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2" 
              onClick={toggleMenu}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-foreground hover:text-accent transition duration-300">
              {t('nav.home')}
            </Link>
            <Link href="/articles" className="text-foreground hover:text-accent transition duration-300">
              {t('nav.articles')}
            </Link>
            <Link href="/categories/architecture" className="text-foreground hover:text-accent transition duration-300">
              {t('nav.categories')}
            </Link>
            <Link href="/about" className="text-foreground hover:text-accent transition duration-300">
              {t('nav.about')}
            </Link>
            <Link href="/search">
              <Button
                variant="ghost"
                size="icon"
                className="flex items-center justify-center w-10 h-10 text-foreground hover:text-accent hover:bg-secondary/10 rounded-full transition duration-300"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            
            <LanguageToggle />
            
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary text-white">
                        {user.name ? user.name.substring(0, 2).toUpperCase() : user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name || user.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  {t('nav.login')}
                </Button>
              </Link>
            )}
          </nav>
        </div>
        
        {/* Mobile Menu */}
        <div className={cn(
          "fixed inset-x-0 bg-background border-b border-secondary px-4 pt-2 pb-6 transition-all duration-300 ease-in-out md:hidden",
          menuOpen ? "top-[61px] opacity-100" : "-top-full opacity-0 pointer-events-none"
        )}>
          <nav className="flex flex-col space-y-4">
            <Link href="/" onClick={closeMenu} className="text-lg text-foreground hover:text-accent transition duration-300">
              {t('nav.home')}
            </Link>
            <Link href="/articles" onClick={closeMenu} className="text-lg text-foreground hover:text-accent transition duration-300">
              {t('nav.articles')}
            </Link>
            <Link href="/categories/architecture" onClick={closeMenu} className="text-lg text-foreground hover:text-accent transition duration-300">
              {t('nav.categories')}
            </Link>
            <Link href="/about" onClick={closeMenu} className="text-lg text-foreground hover:text-accent transition duration-300">
              {t('nav.about')}
            </Link>
            <Link href="/search" onClick={closeMenu} className="text-lg text-foreground hover:text-accent transition duration-300">
              {t('search.placeholder')}
            </Link>
            
            <div className="pt-2 border-t border-secondary">
              <MobileLanguageToggle />
            </div>
          </nav>
        </div>
        
        {isSearchVisible && <SearchBar />}
      </div>
    </header>
  );
};

export default Header;
