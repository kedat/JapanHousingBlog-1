import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 px-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">JAPAN HOUSING</h3>
            <p className="text-white/70 mb-6">
              Exploring Japanese architecture, real estate, and design through insightful articles and analysis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition duration-300" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition duration-300" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition duration-300" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition duration-300" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/architecture">
                  <a className="text-white/70 hover:text-accent transition duration-300">Architecture</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/real-estate">
                  <a className="text-white/70 hover:text-accent transition duration-300">Real Estate</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/interior-design">
                  <a className="text-white/70 hover:text-accent transition duration-300">Interior Design</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/sustainability">
                  <a className="text-white/70 hover:text-accent transition duration-300">Sustainability</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/market-trends">
                  <a className="text-white/70 hover:text-accent transition duration-300">Market Trends</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-white/70 hover:text-accent transition duration-300">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-white/70 hover:text-accent transition duration-300">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/articles">
                  <a className="text-white/70 hover:text-accent transition duration-300">All Articles</a>
                </Link>
              </li>
              <li>
                <Link href="/search">
                  <a className="text-white/70 hover:text-accent transition duration-300">Search</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <address className="not-italic text-white/70">
              <p>Shibuya Crossing Building</p>
              <p>2-8-10 Dogenzaka, Shibuya</p>
              <p>Tokyo 150-0043, Japan</p>
              <p className="mt-4">
                <a href="mailto:info@japanhousing.com" className="hover:text-accent transition duration-300">
                  info@japanhousing.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Japan Housing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
