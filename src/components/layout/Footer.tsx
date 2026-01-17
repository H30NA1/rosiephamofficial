import { Link } from "react-router-dom";
import { TrendingUp, Phone, ExternalLink, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                <img src="/logo.jpg" alt="Rosie Phạm Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif text-xl font-semibold">
                Rosie Phạm
              </span>
            </Link>
            <p className="text-primary-foreground/70 max-w-sm leading-relaxed">
              Empowering your financial future with expert trading strategies.
              Join us on a journey to sustainable wealth building.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Trading Charts", path: "/charts" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+840377895316"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +84 037 789 5316
                </a>
              </li>
              <li>
                <a
                  href="https://linktr.ee/official_rosie_pham_96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Linktree
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://linktr.ee/official_rosie_pham_96"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linktr.ee/official_rosie_pham_96"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linktr.ee/official_rosie_pham_96"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/50 text-sm">
          <p>© {new Date().getFullYear()} Rosie Phạm Trading. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
