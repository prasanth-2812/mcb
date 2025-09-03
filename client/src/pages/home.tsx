import { SEOHead } from "@/components/seo-head";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { JobCategories } from "@/components/job-categories";
import { FeaturedJobs } from "@/components/featured-jobs";
import { FeaturedPartners } from "@/components/featured-partners";
import { Testimonials } from "@/components/testimonials";
import { ConsultancyServices } from "@/components/consultancy-services";
import { useTranslation } from "@/hooks/use-translation";

export default function Home() {
  const { t } = useTranslation();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MCB Consulting Services Pvt Ltd",
    "url": "https://mcbconsulting.com",
    "description": "Professional job search and consultancy services in India",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-22-1234-5678",
      "contactType": "customer service"
    }
  };

  return (
    <>
      <SEOHead
        title="MCB Consulting Services - Professional Job Search & Consultancy in India"
        description="Leading job search platform and consultancy services in India. Find your dream job with MCB Consulting Services across multiple industries with multilingual support."
        keywords="job search, recruitment, consultancy, India, career, employment, MCB consulting"
        ogTitle="MCB Consulting Services - Your Career Success Partner"
        ogDescription="Connect with top companies across India through our professional recruitment and consultancy services"
        structuredData={organizationSchema}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Featured Stats Section */}
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center stats-counter">
                <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-jobs">
                  {t("stats.jobsPosted")}
                </div>
                <div className="text-muted-foreground">{t("stats.jobsPostedLabel")}</div>
              </div>
              <div className="text-center stats-counter">
                <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-companies">
                  {t("stats.companiesPartnered")}
                </div>
                <div className="text-muted-foreground">{t("stats.companiesPartneredLabel")}</div>
              </div>
              <div className="text-center stats-counter">
                <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-placements">
                  {t("stats.candidatesPlaced")}
                </div>
                <div className="text-muted-foreground">{t("stats.candidatesPlacedLabel")}</div>
              </div>
              <div className="text-center stats-counter">
                <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-experience">
                  {t("stats.experienceYears")}
                </div>
                <div className="text-muted-foreground">{t("stats.experienceYearsLabel")}</div>
              </div>
            </div>
          </div>
        </section>

        <HeroSection />
        <JobCategories />
        <FeaturedJobs />
        <FeaturedPartners />
        <Testimonials />
        <ConsultancyServices />
        <Footer />
      </div>
    </>
  );
}
