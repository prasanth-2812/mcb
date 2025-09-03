import { SEOHead } from "@/components/seo-head";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { JobCategories } from "@/components/job-categories";
import { FeaturedJobs } from "@/components/featured-jobs";
import { FeaturedPartners } from "@/components/featured-partners";
import { WhyWorkWithUs } from "@/components/why-work-with-us";
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
      "addressLocality": "Visakhapatnam",
      "addressRegion": "Andhra Pradesh"
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
      
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection />
        <FeaturedPartners />
        <WhyWorkWithUs />
        <JobCategories />
        <FeaturedJobs />
        <Footer />
      </div>
    </>
  );
}
