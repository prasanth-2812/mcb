import { useTranslation } from "@/hooks/use-translation";
import { Building2, Truck, ShoppingCart, Coffee, Pizza, Package } from "lucide-react";

const partners = [
  { name: "Swiggy", icon: Building2 },
  { name: "Zomato", icon: Coffee },
  { name: "Zepto", icon: Package },
  { name: "Blinkit", icon: Truck },
  { name: "Dominos", icon: Pizza },
  { name: "Flipkart", icon: ShoppingCart },
  { name: "Swiggy Instamart", icon: Truck },
];

export function FeaturedPartners() {
  const { t } = useTranslation();

  const partnersSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": partners.map((partner, index) => ({
      "@type": "Organization",
      "position": index + 1,
      "name": partner.name,
      "url": `https://${partner.name.toLowerCase()}.com`,
      "description": `Featured partner company ${partner.name} offering gig and employment opportunities in India`
    }))
  };

  return (
    <section className="py-20 bg-background" id="partners">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnersSchema) }}
      />
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
                className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow group"
                data-testid={`partner-${index}`}
              >
                <IconComponent className="text-4xl text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {partner.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
