import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { 
  Bus, 
  FileText, 
  MessageSquare, 
  GraduationCap, 
  Handshake, 
  Network,
  Check
} from "lucide-react";

const services = [
  {
    id: "career-counseling",
    icon: Bus,
    titleKey: "services.careerCounseling.title",
    descriptionKey: "services.careerCounseling.description",
    featuresKey: "services.careerCounseling.features",
  },
  {
    id: "resume-building",
    icon: FileText,
    titleKey: "services.resumeBuilding.title",
    descriptionKey: "services.resumeBuilding.description",
    featuresKey: "services.resumeBuilding.features",
  },
  {
    id: "interview-prep",
    icon: MessageSquare,
    titleKey: "services.interviewPrep.title",
    descriptionKey: "services.interviewPrep.description",
    featuresKey: "services.interviewPrep.features",
  },
  {
    id: "skill-development",
    icon: GraduationCap,
    title: "Skill Development",
    description: "Access to curated learning resources and training programs to enhance your professional skills and market value.",
    features: ["Industry-Specific Training", "Certification Guidance", "Soft Skills Development"],
  },
  {
    id: "salary-negotiation",
    icon: Handshake,
    title: "Salary Negotiation",
    description: "Expert guidance on salary negotiations and compensation packages to ensure you get the best offer possible.",
    features: ["Market Rate Analysis", "Negotiation Strategies", "Benefits Package Review"],
  },
  {
    id: "professional-networking",
    icon: Network,
    title: "Professional Networking",
    description: "Connect with industry professionals and expand your network through our exclusive networking events and platforms.",
    features: ["Industry Networking Events", "Mentorship Programs", "Professional Community Access"],
  },
];

export function ConsultancyServices() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-background" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl font-bold text-foreground mb-4" data-testid="services-title">
            {t("services.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-subtitle">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            
            // Use translation keys if available, otherwise use hardcoded values
            const title = service.titleKey ? t(service.titleKey) : service.title!;
            const description = service.descriptionKey ? t(service.descriptionKey) : service.description!;
            const features = service.featuresKey ? t(service.featuresKey) : service.features!;

            return (
              <div
                key={service.id}
                className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300"
                data-testid={`service-${service.id}`}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4" data-testid={`service-title-${service.id}`}>
                  {title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`service-description-${service.id}`}>
                  {description}
                </p>
                
                <ul className="text-sm text-muted-foreground space-y-2 mb-6" data-testid={`service-features-${service.id}`}>
                  {Array.isArray(features) ? features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  )) : null}
                </ul>
                
                <Button 
                  className="btn-primary"
                  data-testid={`service-learn-more-${service.id}`}
                >
                  {t("services.learnMore")}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
