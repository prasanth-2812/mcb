import { Link, useLocation } from "wouter";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = () => {
    setLocation('/login');
    scrollToTop();
  };

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/jobs", label: t("nav.jobs") },
    { href: "/internships", label: t("nav.internships") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center" data-testid="logo-link">
            <img 
              src="/mcb.svg" 
              alt="MCB Consulting" 
              className="h-16 w-auto max-w-64"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-foreground hover:text-primary transition-colors font-medium ${
                  isActive(item.href) ? "text-primary" : ""
                }`}
                data-testid={`nav-${item.href.replace("/", "") || "home"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button 
              variant="secondary" 
              className="font-medium"
              data-testid="sign-in-button"
              onClick={handleLoginClick}
            >
              {t("nav.signIn")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                data-testid="mobile-menu-button"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium ${
                      isActive(item.href) ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${item.href.replace("/", "") || "home"}`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-border">
                  <div className="mb-4">
                    <LanguageSwitcher />
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="secondary" 
                      className="w-full font-medium"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLoginClick();
                      }}
                      data-testid="mobile-sign-in-button"
                    >
                      {t("nav.signIn")}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
