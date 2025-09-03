import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Send, Linkedin, Twitter, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-primary flex items-center">
              <Briefcase className="h-6 w-6 mr-2" />
              MCB Consulting
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="social-twitter"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="footer-link-home"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link 
                  href="/jobs" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="footer-link-jobs"
                >
                  {t("nav.jobs")}
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="footer-link-about"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="footer-link-contact"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">
              {t("footer.popularCategories")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/jobs?category=it" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="footer-category-it"
                >
                  Information Technology
                </Link>
              </li>
              <li>
                <Link 
                  href="/jobs?category=finance" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="footer-category-finance"
                >
                  Finance & Banking
                </Link>
              </li>
              <li>
                <Link 
                  href="/jobs?category=healthcare" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="footer-category-healthcare"
                >
                  Healthcare
                </Link>
              </li>
              <li>
                <Link 
                  href="/jobs?category=engineering" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  data-testid="footer-category-engineering"
                >
                  Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">
              {t("footer.stayConnected")}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-300 text-sm mb-2">
                  {t("footer.newsletter")}
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex">
                  <Input
                    type="email"
                    placeholder={t("footer.emailPlaceholder")}
                    className="flex-1 bg-gray-800 border-gray-700 text-background placeholder:text-gray-400"
                    data-testid="newsletter-email"
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    className="ml-2"
                    data-testid="newsletter-submit"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              <div className="text-gray-300 text-sm space-y-1">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 22 1234 5678
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@mcbconsulting.com
                </p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Mumbai, Maharashtra
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>{t("footer.copyright")}</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="footer-privacy"
              >
                {t("footer.privacyPolicy")}
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="footer-terms"
              >
                {t("footer.termsOfService")}
              </Link>
              <Link 
                href="/cookies" 
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="footer-cookies"
              >
                {t("footer.cookiePolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
