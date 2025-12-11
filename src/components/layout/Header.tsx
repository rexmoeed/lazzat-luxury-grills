import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/flavours", label: "Flavors" },
  { href: "/about", label: "About" },
  { href: "/locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-primary/20"
          : "bg-transparent"
      )}
    >
      <div className="container-luxury">
        <nav className="flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center h-12 md:h-16"
          >
            <img 
              src="/Lazzat logo 02.png" 
              alt="Lazzat Grill & Shakes" 
              className="h-full w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-sans text-sm tracking-widest uppercase transition-colors duration-300 hover:text-primary",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Order Button - Desktop */}
          <Link
            to="/order"
            className="hidden md:block btn-gold text-sm tracking-widest uppercase py-3 px-6"
          >
            Order Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-primary/20 transition-all duration-500 overflow-hidden",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col items-center py-6 gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:text-primary py-2",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/order"
              className="btn-gold text-sm tracking-widest uppercase py-3 px-8 mt-2"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
