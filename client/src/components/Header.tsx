import { Link } from "wouter";
import { Search, User } from "lucide-react";
import SearchBar from "./SearchBar";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/hooks/use-auth";
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

interface HeaderProps {
  isSearchVisible: boolean;
  toggleSearch: () => void;
}

const Header = ({ isSearchVisible, toggleSearch }: HeaderProps) => {
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="border-b border-secondary">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="font-bold text-2xl text-primary tracking-wider">
              JAPAN HOUSING
            </Link>
          </div>
          <nav className="flex items-center space-x-3 md:space-x-6">
            <Link href="/" className="text-text hover:text-accent transition duration-300">
              Home
            </Link>
            <Link href="/articles" className="text-text hover:text-accent transition duration-300">
              Articles
            </Link>
            <Link href="/categories/architecture" className="text-text hover:text-accent transition duration-300">
              Categories
            </Link>
            <Link href="/about" className="text-text hover:text-accent transition duration-300">
              About
            </Link>
            <button
              type="button"
              onClick={toggleSearch}
              className="text-text hover:text-accent transition duration-300"
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </button>
            
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
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
        {isSearchVisible && <SearchBar />}
      </div>
    </header>
  );
};

export default Header;
