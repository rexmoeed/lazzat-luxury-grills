import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowRight, ChevronDown } from "lucide-react";

export const Footer = () => {
  const [openSections, setOpenSections] = useState({
    explore: true,
    contact: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <footer className="bg-gradient-to-b from-card via-card/95 to-black/40 border-t border-primary/10 pb-20 md:pb-0 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl translate-y-1/2" />
      </div>

      <div className="container-luxury px-4 md:px-0 pt-4 pb-6 md:pt-6 md:pb-8 relative z-10">
        {/* Brand Section - Static */}
        <div className="mb-5 flex items-center justify-center gap-6 flex-wrap text-center">
          <Link to="/" className="inline-block group">
            <img 
              src="/Lazzat logo 02.png" 
              alt="Lazzat Grill & Shakes" 
              className="h-9 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <p className="text-muted-foreground font-sans text-xs leading-relaxed max-w-xs">
            Premium global grills crafted fresh daily.
          </p>
          <div className="flex gap-2.5">
            <a
              href="https://www.instagram.com/lazzat.ca/"
              className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-background hover:bg-primary hover:border-primary transition-all duration-300 group/icon"
              aria-label="Instagram"
            >
              <Instagram size={15} className="group-hover/icon:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.facebook.com/lazzat.ca/"
              className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-background hover:bg-primary hover:border-primary transition-all duration-300 group/icon"
              aria-label="Facebook"
            >
              <Facebook size={15} className="group-hover/icon:scale-110 transition-transform" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-background hover:bg-primary hover:border-primary transition-all duration-300 group/icon"
              aria-label="Twitter"
            >
              <Twitter size={15} className="group-hover/icon:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-5" />

        {/* Explore Section - Collapsible */}
        <div className="mb-5">
          <button
            onClick={() => toggleSection("explore")}
            className="w-full flex items-center justify-center gap-2 text-foreground font-serif text-sm md:text-base"
            aria-expanded={openSections.explore}
          >
            <span>Explore</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${openSections.explore ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          <div
            className={`mt-4 flex items-center gap-4 flex-wrap justify-center transition-all duration-300 ${openSections.explore ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}
          >
            {[
              { label: "Menu", path: "/menu" },
              { label: "Flavours", path: "/flavours" },
              { label: "About", path: "/about" },
              { label: "Locations", path: "/locations" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-muted-foreground font-sans text-xs hover:text-primary transition-colors duration-300 flex items-center gap-1.5 group px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10"
              >
                <span className="inline-block w-0.5 h-0.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                {item.label}
                <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-300" />
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-5" />

        {/* Contact Section - Collapsible */}
        <div className="mb-5">
          <button
            onClick={() => toggleSection("contact")}
            className="w-full flex items-center justify-center gap-2 text-foreground font-serif text-sm md:text-base"
            aria-expanded={openSections.contact}
          >
            <span>Contact</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${openSections.contact ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          <div
            className={`mt-4 flex items-center gap-4 flex-wrap justify-center transition-all duration-300 ${openSections.contact ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}
          >
            <a href="tel:+12125550100" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 transition-all group">
              <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone size={10} className="text-primary" />
              </div>
              <span className="text-xs font-sans text-muted-foreground group-hover:text-primary transition-colors">+1 (212) 555-0100</span>
            </a>
            <a href="mailto:hello@lazzat.ca" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 transition-all group">
              <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail size={10} className="text-primary" />
              </div>
              <span className="text-xs font-sans text-muted-foreground group-hover:text-primary transition-colors">hello@lazzat.ca</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-5" />

        {/* Hours Section - Centered */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <h3 className="font-serif text-sm md:text-base text-foreground">Hours</h3>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[11px] text-muted-foreground">
              <span className="font-medium">Mon-Thu:</span>
              <span>11am - 11pm</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[11px] text-muted-foreground">
              <span className="font-medium">Fri-Sat:</span>
              <span>11am - 12am</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[11px] text-muted-foreground">
              <span className="font-medium">Sun:</span>
              <span>12pm - 10pm</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-4" />

        {/* Locations - Icon Based */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <h3 className="font-serif text-sm md:text-base text-foreground">Our Locations</h3>
          <div className="flex items-center gap-4">
            <Link 
              to="/locations" 
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 transition-all group"
              title="McVean Drive Location"
            >
              <MapPin size={14} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xs font-sans text-muted-foreground group-hover:text-primary transition-colors">McVean</span>
            </Link>
            <Link 
              to="/locations" 
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 transition-all group"
              title="Clarence Street Location"
            >
              <MapPin size={14} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xs font-sans text-muted-foreground group-hover:text-primary transition-colors">Clarence</span>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-5" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-center text-center gap-3 md:gap-6 text-[11px] md:text-xs text-muted-foreground font-sans">
          <p>© 2025 Lazzat. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors duration-300 relative group">
              Privacy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors duration-300 relative group">
              Terms
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
