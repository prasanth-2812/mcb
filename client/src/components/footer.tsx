import { Link, useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Linkedin, Twitter, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path: string) => {
    setLocation(path);
    scrollToTop();
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = () => {
    window.open('tel:+912212345678', '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@mcbconsulting.com', '_self');
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/mcb.svg" 
                alt="MCB Consulting" 
                className="h-12 w-auto max-w-48"
              />
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
                onClick={() => handleSocialClick('/contact')}
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="social-twitter"
                onClick={() => handleSocialClick('/contact')}
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="social-facebook"
                onClick={() => handleSocialClick('/contact')}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="social-instagram"
                onClick={() => handleSocialClick('/contact')}
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
                <button 
                  onClick={() => handleNavigation('/')}
                  className="text-gray-300 hover:text-primary transition-colors text-left"
                  data-testid="footer-link-home"
                >
                  {t("nav.home")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/jobs')}
                  className="text-gray-300 hover:text-primary transition-colors text-left"
                  data-testid="footer-link-jobs"
                >
                  {t("nav.jobs")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/about')}
                  className="text-gray-300 hover:text-primary transition-colors text-left"
                  data-testid="footer-link-about"
                >
                  {t("nav.about")}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/contact')}
                  className="text-gray-300 hover:text-primary transition-colors text-left"
                  data-testid="footer-link-contact"
                >
                  {t("nav.contact")}
                </button>
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
                <button 
                  onClick={() => handleNavigation('/jobs?category=it')}
                  className="text-gray-300 hover:text-primary transition-colors text-left"
                  data-testid="footer-category-it"
                >
                  Information Technology
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/jobs?category=finance')}
                  className="text-gray-300 hover:text-primary transition-colors text-left"
                  data-testid="footer-category-finance"
                >
                  Finance & Banking
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/jobs?category=healthcare')}
                  className="text-gray-300 hover:text-primary transition-colors text-left"
                  data-testid="footer-category-healthcare"
                >
                  Healthcare
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/jobs?category=engineering')}
                  className="text-gray-300 hover:text-primary transition-colors text-left"
                  data-testid="footer-category-engineering"
                >
                  Engineering
                </button>
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
                <button 
                  onClick={handlePhoneClick}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  +91 22 1234 5678
                </button>
                <button 
                  onClick={handleEmailClick}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  info@mcbconsulting.com
                </button>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Visakhapatnam, Andhra Pradesh
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
              <button 
                onClick={() => handleNavigation('/privacy')}
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="footer-privacy"
              >
                {t("footer.privacyPolicy")}
              </button>
              <button 
                onClick={() => handleNavigation('/terms')}
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="footer-terms"
              >
                {t("footer.termsOfService")}
              </button>
              <button 
                onClick={() => handleNavigation('/cookies')}
                className="text-gray-400 hover:text-primary transition-colors"
                data-testid="footer-cookies"
              >
                {t("footer.cookiePolicy")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
