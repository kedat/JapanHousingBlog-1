import { Link } from "wouter";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar";

interface HeaderProps {
  isSearchVisible: boolean;
  toggleSearch: () => void;
}

const Header = ({ isSearchVisible, toggleSearch }: HeaderProps) => {
  return (
    <header className="border-b border-secondary">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="font-bold text-2xl text-primary tracking-wider">
              JAPAN HOUSING
            </Link>
          </div>
          <nav className="flex items-center space-x-8">
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
          </nav>
        </div>
        {isSearchVisible && <SearchBar />}
      </div>
    </header>
  );
};

export default Header;
