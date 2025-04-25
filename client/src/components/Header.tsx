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
            <Link href="/">
              <a className="font-bold text-2xl text-primary tracking-wider">JAPAN HOUSING</a>
            </Link>
          </div>
          <nav className="flex items-center space-x-8">
            <Link href="/">
              <a className="text-text hover:text-accent transition duration-300">Home</a>
            </Link>
            <Link href="/articles">
              <a className="text-text hover:text-accent transition duration-300">Articles</a>
            </Link>
            <Link href="/categories/architecture">
              <a className="text-text hover:text-accent transition duration-300">Categories</a>
            </Link>
            <Link href="/about">
              <a className="text-text hover:text-accent transition duration-300">About</a>
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
