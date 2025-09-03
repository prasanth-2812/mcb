import { SEOHead } from "@/components/seo-head";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useTranslation } from "@/hooks/use-translation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Briefcase, 
  TrendingUp,
  CheckCircle,
  Star,
  Building2,
  Bus
} from "lucide-react";

const teamMembers = [
  {
    name: "Rajesh Patel",
    role: "Founder & CEO",
    experience: "15+ years",
    expertise: "Strategic Leadership, Business Development",
    description: "Visionary leader with extensive experience in recruitment and talent acquisition across multiple industries."
  },
  {
    name: "Priya Sharma",
    role: "Head of Operations",
    experience: "12+ years",
    expertise: "Operations Management, Process Optimization",
    description: "Expert in streamlining recruitment processes and ensuring exceptional client service delivery."
  },
  {
    name: "Ankit Kumar",
    role: "Technology Director",
    experience: "10+ years",
    expertise: "IT Recruitment, Technical Assessment",
    description: "Specialist in technology talent acquisition with deep understanding of technical roles and requirements."
  },
  {
    name: "Meera Reddy",
    role: "Client Relations Manager",
    experience: "8+ years",
    expertise: "Client Management, Relationship Building",
    description: "Dedicated to building long-term partnerships with clients and ensuring their recruitment needs are met."
  }
];

const companyValues = [
  {
    title: "Integrity",
    description: "We maintain the highest ethical standards in all our interactions and business practices.",
    icon: CheckCircle
  },
  {
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service delivery and client satisfaction.",
    icon: Star
  },
  {
    title: "Innovation",
    description: "We continuously innovate our processes and leverage technology to improve outcomes.",
    icon: TrendingUp
  },
  {
    title: "Diversity",
    description: "We celebrate diversity and promote inclusive hiring practices across all our placements.",
    icon: Globe
  }
];



export default function About() {
  const { t } = useTranslation();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MCB Consulting Services Pvt Ltd",
    "description": "Leading recruitment consultancy services in India specializing in connecting talented professionals with top companies",
    "url": "https://mcbconsulting.com",
    "logo": "https://mcbconsulting.com/logo.png",
    "foundingDate": "2009",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Business Tower, Level 15",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400051",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-22-1234-5678",
      "contactType": "customer service",
      "email": "info@mcbconsulting.com"
    },
    "sameAs": [
      "https://linkedin.com/company/mcb-consulting",
      "https://twitter.com/mcbconsulting",
      "https://facebook.com/mcbconsulting"
    ]
  };

  return (
    <>
      <SEOHead
        title="About MCB Consulting Services - Leading Recruitment Consultancy in India"
        description="Learn about MCB Consulting Services, India's premier recruitment consultancy with 15+ years of experience connecting talented professionals with top companies across multiple industries."
        keywords="about MCB consulting, recruitment consultancy India, talent acquisition, career services, professional placement"
        structuredData={organizationSchema}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#0066CC]/5 via-white to-[#0066CC]/5">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#0066CC] via-[#0052A3] to-[#003D7A] py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300/20 rounded-full animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse-slow"></div>
            <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-300/15 rounded-full animate-bounce-slow"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up" data-testid="about-hero-title">
              About MCB Consulting Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }} data-testid="about-hero-subtitle">
              Empowering careers and transforming businesses through strategic talent acquisition and professional consultancy services since 2009.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 -mt-8 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-testid="our-story-title">
                Our Story
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A journey of growth, excellence, and unwavering commitment to connecting talent with opportunity
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 md:p-12 shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg" data-testid="our-story-p1">
                    Founded in 2009, MCB Consulting Services began with a simple yet powerful vision: to bridge the gap between exceptional talent and outstanding opportunities. What started as a small recruitment firm in Mumbai has grown into one of India's most trusted consultancy services, serving clients across the nation.
                  </p>
                  <p className="text-lg" data-testid="our-story-p2">
                    Our success is built on deep industry expertise, personalized service, and an unwavering commitment to excellence. We understand that every career journey is unique, and every business has specific talent needs that require careful attention and strategic thinking.
                  </p>
                  <p className="text-lg" data-testid="our-story-p3">
                    Today, MCB Consulting Services stands as a beacon of trust in the recruitment industry, known for our ethical practices, innovative approach, and multilingual support that makes career opportunities accessible to professionals from all backgrounds.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-xl flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900" data-testid="mission-title">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg" data-testid="mission-content">
                  To empower individuals and organizations by connecting exceptional talent with meaningful opportunities, fostering professional growth, and driving business success through strategic human capital solutions. We are committed to building lasting relationships based on trust, integrity, and mutual success.
                </p>
              </Card>
              
              <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-xl flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900" data-testid="vision-title">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg" data-testid="vision-content">
                  To be India's most trusted and innovative talent acquisition partner, recognized for our excellence in connecting diverse talent with global opportunities. We envision a future where every professional finds their ideal career path and every organization builds world-class teams.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-testid="values-title">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-testid="values-subtitle">
                The principles that guide everything we do and define who we are as an organization
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyValues.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="p-6 text-center shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }} data-testid={`value-${index}`}>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-testid="team-title">
                Leadership Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-testid="team-subtitle">
                Meet the experienced professionals driving our mission and vision forward
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="p-6 shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }} data-testid={`team-member-${index}`}>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#0066CC] font-medium mb-2">
                        {member.role}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-[#0066CC]/10 text-[#0066CC] hover:bg-[#0066CC]/20 transition-colors">
                          {member.experience}
                        </Badge>
                        <Badge variant="outline" className="border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white transition-colors">
                          {member.expertise}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" data-testid="why-choose-title">
                Why Choose MCB Consulting?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-testid="why-choose-subtitle">
                Discover what sets us apart in the competitive world of talent acquisition and career services
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid="expertise-title">
                  Industry Expertise
                </h3>
                <p className="text-gray-600 leading-relaxed" data-testid="expertise-content">
                  Deep understanding of various industries including IT, Finance, Healthcare, Engineering, and more. Our sector-specific knowledge ensures precise matching of skills and requirements.
                </p>
              </Card>
              
              <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid="multilingual-title">
                  Multilingual Support
                </h3>
                <p className="text-gray-600 leading-relaxed" data-testid="multilingual-content">
                  Comprehensive support in English, Hindi, Tamil, and Telugu, making our services accessible to professionals from diverse linguistic backgrounds across India.
                </p>
              </Card>
              
              <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid="personalized-title">
                  Personalized Approach
                </h3>
                <p className="text-gray-600 leading-relaxed" data-testid="personalized-content">
                  Tailored solutions for both candidates and clients. We take time to understand unique requirements and provide customized recruitment strategies for optimal outcomes.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
