import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t.common.nav.home, path: "/" },
    { name: t.common.nav.about, path: "/about" },
    { name: t.common.nav.charts, path: "/charts" },
    { name: t.common.nav.news, path: "/news" },
    { name: t.common.nav.contact, path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 md:h-22">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 flex items-center justify-center group-hover:opacity-80 transition-opacity">
              <img src="/logo.jpg" alt="Rosie Phạm Logo" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-xs tracking-widest uppercase font-medium transition-colors hover:text-accent ${isActive(link.path)
                    ? "text-foreground"
                    : "text-muted-foreground"
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-6">
            <LanguageSwitcher />
            <Button asChild variant="luxury" size="default">
              <Link to="/contact">{t.common.cta.getStarted}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-xs tracking-widest uppercase font-medium transition-colors ${isActive(link.path)
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Button asChild className="w-full">
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    {t.common.cta.getStarted}
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
