import { Link } from "react-router-dom";
import { Phone, ExternalLink, Instagram, Facebook, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-20 h-20 flex items-center justify-center">
                <img src="/logo.jpg" alt="Rosie Phạm Logo" className="w-full h-full object-contain brightness-[10]" />
              </div>
            </Link>
            <p className="text-background/60 max-w-sm leading-relaxed text-sm">
              {t.home.hero.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6 text-background">{t.common.footer.quickLinks}</h4>
            <ul className="space-y-4">
              {[
                { name: t.common.nav.home, path: "/" },
                { name: t.common.nav.about, path: "/about" },
                { name: t.common.nav.charts, path: "/charts" },
                { name: t.common.nav.contact, path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/60 hover:text-accent transition-colors text-sm tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6 text-background">{t.common.footer.contact}</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+840377895316"
                  className="flex items-center gap-3 text-background/60 hover:text-accent transition-colors text-sm"
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
                  className="flex items-center gap-3 text-background/60 hover:text-accent transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Linktree
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-8">
              <p className="text-background/50 text-xs uppercase tracking-widest mb-4">{t.common.footer.followUs}</p>
              <div className="flex gap-3">
                <a
                  href="https://linktr.ee/official_rosie_pham_96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-background/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linktr.ee/official_rosie_pham_96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-background/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://linktr.ee/official_rosie_pham_96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-background/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-background/10 text-center text-background/40 text-xs tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Rosie Phạm. {t.common.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
