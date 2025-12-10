import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/20 pb-20 md:pb-0">
      <div className="container-luxury section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/Lazzat logo 02.png" 
                alt="Lazzat Grill & Shakes" 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-6">
              Premium global grills crafted fresh daily. Experience luxury flavors in every bite.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Menu", "About", "Locations", "Order Now", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-").replace("-now", "")}`}
                    className="text-muted-foreground font-sans text-sm hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-6">Opening Hours</h4>
            <ul className="space-y-3 text-sm font-sans">
              <li className="flex justify-between text-muted-foreground">
                <span>Monday - Thursday</span>
                <span className="text-foreground">11am - 11pm</span>
              </li>
              <li className="flex justify-between text-muted-foreground">
                <span>Friday - Saturday</span>
                <span className="text-foreground">11am - 12am</span>
              </li>
              <li className="flex justify-between text-muted-foreground">
                <span>Sunday</span>
                <span className="text-foreground">12pm - 10pm</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm font-sans">143 Clarence St Unit #10Brampton, ON L6W 1T2, Canada</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a href="tel:+11234567890" className="text-sm font-sans hover:text-primary transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <a href="mailto:hello@lazzat.com" className="text-sm font-sans hover:text-primary transition-colors">
                  hello@lazzat.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="gold-divider mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-sans">
          <p>© 2025 Lazzat. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
