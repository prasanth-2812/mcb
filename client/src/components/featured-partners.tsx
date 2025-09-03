import { useTranslation } from "@/hooks/use-translation";
import { 
  SiGoogle, 
  SiAmazon, 
  SiApple, 
  SiFacebook, 
  SiNetflix 
} from "react-icons/si";
import { Building2 } from "lucide-react";

const partners = [
  { name: "Microsoft", icon: Building2 },
  { name: "Google", icon: SiGoogle },
  { name: "Amazon", icon: SiAmazon },
  { name: "Apple", icon: SiApple },
  { name: "Meta", icon: SiFacebook },
  { name: "Netflix", icon: SiNetflix },
];

export function FeaturedPartners() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-background" id="partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl font-bold text-foreground mb-4" data-testid="partners-title">
            {t("partners.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="partners-subtitle">
            {t("partners.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div
                key={partner.name}
                className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow group"
                data-testid={`partner-${index}`}
              >
                <IconComponent className="text-4xl text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
