import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

const Footer = () => {
  const { t } = useLanguage();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer className="bg-primary text-white py-8 md:py-12 px-6">
      <div className="container">
        {/* Desktop Footer */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">JAPAN HOUSING</h3>
            <p className="text-white/70 mb-6">
              {t('footer.description')}
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
            <h4 className="font-bold mb-4">{t('footer.categories')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/architecture" className="text-white/70 hover:text-accent transition duration-300">
                  Architecture
                </Link>
              </li>
              <li>
                <Link href="/categories/real-estate" className="text-white/70 hover:text-accent transition duration-300">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link href="/categories/interior-design" className="text-white/70 hover:text-accent transition duration-300">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link href="/categories/sustainability" className="text-white/70 hover:text-accent transition duration-300">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/categories/market-trends" className="text-white/70 hover:text-accent transition duration-300">
                  Market Trends
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-accent transition duration-300">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-accent transition duration-300">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-white/70 hover:text-accent transition duration-300">
                  {t('footer.articles')}
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-white/70 hover:text-accent transition duration-300">
                  Search
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">{t('footer.contactUs')}</h4>
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
        
        {/* Mobile Footer */}
        <div className="md:hidden">
          <div className="mb-6">
            <h3 className="font-bold text-xl mb-4">JAPAN HOUSING</h3>
            <p className="text-white/70 mb-6">
              {t('footer.description')}
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
          
          <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen} className="border-t border-white/20 py-3">
            <CollapsibleTrigger className="flex justify-between items-center w-full">
              <h4 className="font-bold">{t('footer.categories')}</h4>
              <ChevronDown className={cn("h-5 w-5 transition-transform", categoriesOpen ? "transform rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <ul className="space-y-3">
                <li>
                  <Link href="/categories/architecture" className="text-white/70 hover:text-accent transition duration-300">
                    Architecture
                  </Link>
                </li>
                <li>
                  <Link href="/categories/real-estate" className="text-white/70 hover:text-accent transition duration-300">
                    Real Estate
                  </Link>
                </li>
                <li>
                  <Link href="/categories/interior-design" className="text-white/70 hover:text-accent transition duration-300">
                    Interior Design
                  </Link>
                </li>
                <li>
                  <Link href="/categories/sustainability" className="text-white/70 hover:text-accent transition duration-300">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/categories/market-trends" className="text-white/70 hover:text-accent transition duration-300">
                    Market Trends
                  </Link>
                </li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible open={linksOpen} onOpenChange={setLinksOpen} className="border-t border-white/20 py-3">
            <CollapsibleTrigger className="flex justify-between items-center w-full">
              <h4 className="font-bold">{t('footer.quickLinks')}</h4>
              <ChevronDown className={cn("h-5 w-5 transition-transform", linksOpen ? "transform rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-white/70 hover:text-accent transition duration-300">
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white/70 hover:text-accent transition duration-300">
                    {t('footer.about')}
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="text-white/70 hover:text-accent transition duration-300">
                    {t('footer.articles')}
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-white/70 hover:text-accent transition duration-300">
                    Search
                  </Link>
                </li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible open={contactOpen} onOpenChange={setContactOpen} className="border-t border-white/20 py-3">
            <CollapsibleTrigger className="flex justify-between items-center w-full">
              <h4 className="font-bold">{t('footer.contactUs')}</h4>
              <ChevronDown className={cn("h-5 w-5 transition-transform", contactOpen ? "transform rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
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
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20 text-center text-white/50 text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
