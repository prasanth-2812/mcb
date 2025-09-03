import { useTranslation } from "@/hooks/use-translation";
import { useState } from "react";

const partners = [
  { 
    name: "Swiggy", 
    logo: "/partner-logos/swiggy.svg",
    website: "https://swiggy.com",
    color: "#FC8019"
  },
  { 
    name: "Zomato", 
    logo: "/partner-logos/zomato.svg",
    website: "https://zomato.com",
    color: "#E23744"
  },
  { 
    name: "Zepto", 
    logo: "/partner-logos/zepto.svg",
    website: "https://zepto.com",
    color: "#00A651"
  },
  { 
    name: "Blinkit", 
    logo: "/partner-logos/blinkit.svg",
    website: "https://blinkit.com",
    color: "#00A651"
  },
  { 
    name: "Dominos", 
    logo: "/partner-logos/dominos.svg",
    website: "https://dominos.com",
    color: "#E31837"
  },
  { 
    name: "Flipkart", 
    logo: "/partner-logos/flipkart.svg",
    website: "https://flipkart.com",
    color: "#2874F0"
  },
  { 
    name: "Swiggy Instamart", 
    logo: "/partner-logos/swiggy-instamart.svg",
    website: "https://instamart.swiggy.com",
    color: "#FC8019"
  },
  { 
    name: "Rapido", 
    logo: "/partner-logos/rapido.svg",
    website: "https://rapido.bike",
    color: "#FF6B35"
  }
];

interface PartnerLogoProps {
  partner: any;
  index: number;
}

function PartnerLogo({ partner, index }: PartnerLogoProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      className="flex-shrink-0 group cursor-pointer"
      data-testid={`partner-${index}`}
    >
      <div className="flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg">
        {isLoading && (
          <div className="animate-pulse">
            <div className="h-16 w-24 bg-gray-200 rounded"></div>
          </div>
        )}
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          className={`h-16 w-auto max-w-32 object-contain transition-all duration-500 group-hover:brightness-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleLoad}
          loading="lazy"
        />
      </div>
    </div>
  );
}

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
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" id="partners">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnersSchema) }}
      />
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-100/30 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-100/20 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Trusted Partners
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up" data-testid="partners-title" style={{ animationDelay: '0.2s' }}>
            {t("partners.title")}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" data-testid="partners-subtitle" style={{ animationDelay: '0.4s' }}>
            {t("partners.subtitle")}
          </p>
        </div>

        {/* Animated scrolling logos - 2 rows with opposite directions */}
        <div className="relative overflow-hidden space-y-8">
          {/* First row - Right to Left */}
          <div className="flex animate-scroll-left space-x-16 items-center">
            {[...partners.slice(0, 4), ...partners.slice(0, 4)].map((partner, index) => (
              <PartnerLogo 
                key={`${partner.name}-row1-${index}`}
                partner={partner}
                index={index}
              />
            ))}
          </div>
          
          {/* Second row - Left to Right */}
          <div className="flex animate-scroll-right space-x-16 items-center">
            {[...partners.slice(4, 8), ...partners.slice(4, 8)].map((partner, index) => (
              <PartnerLogo 
                key={`${partner.name}-row2-${index}`}
                partner={partner}
                index={index + 4}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}