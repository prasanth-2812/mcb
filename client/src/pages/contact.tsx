import { SEOHead } from "@/components/seo-head";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { useTranslation } from "@/hooks/use-translation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Calendar,
  ExternalLink
} from "lucide-react";

const contactInfo = {
  address: {
    title: "Office Address",
    content: [
      "MCB Consulting Services Pvt Ltd",
      "1st floor,Plot No-77,GCC Layout,Kommadi 100 ft Road",
      "Madhurawada",
      "Visakhapatnam, Andhra Pradesh 400051"
    ]
  },
  phone: {
    title: "Phone Numbers",
    content: [
      "+91 8919199030",
      "+91 98765 43210 (WhatsApp)"
    ]
  },
  email: {
    title: "Email Addresses",
    content: [
      "info@mcbconsulting.com",
      "careers@mcbconsulting.com"
    ]
  },
  hours: {
    title: "Business Hours",
    content: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      
    ]
  }
};


export default function Contact() {
  const { t } = useTranslation();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "MCB Consulting Services Pvt Ltd",
    "image": "https://mcbconsulting.com/logo.png",
    "description": "Professional recruitment and career consultancy services",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "MCB consultancy services Pvt Ltd,1st floor,Plot No-77,GCC Layout,Kommadi 100 ft Road,Madhurawada",
      "addressLocality": "Visakhapatnam",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "400051",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.810152",
      "longitude": "83.388204"
    },
    "url": "https://mcbconsulting.com",
    "telephone": "+91-8919199030",
    "email": "info@mcbconsulting.com",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
     
    ],
    "sameAs": [
      "https://linkedin.com/company/mcb-consulting",
      "https://twitter.com/mcbconsulting"
    ]
  };

  return (
    <>
      <SEOHead
        title="Contact MCB Consulting Services - Get Professional Career Guidance"
        description="Contact MCB Consulting Services for expert career guidance and recruitment services. Call +91-8919199030 or visit our Mumbai office. Available in English, Hindi, Tamil, Telugu."
        keywords="contact MCB consulting, career guidance, recruitment services Mumbai, job consultancy contact"
        structuredData={localBusinessSchema}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#0066CC]/5 via-white to-[#0066CC]/5">
        <Header />
        
        {/* Page Header */}
        <section className="relative bg-gradient-to-r from-[#0066CC] via-[#0052A3] to-[#003D7A] py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300/20 rounded-full animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse-slow"></div>
            <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-300/15 rounded-full animate-bounce-slow"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up" data-testid="contact-page-title">
              {t("contact.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }} data-testid="contact-page-subtitle">
              {t("contact.subtitle")}
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20 -mt-8 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <ContactForm />
              </div>
              
              {/* Contact Information */}
              <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6" data-testid="contact-info-title">
                    {t("contact.contactInfo")}
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2" data-testid="address-title">
                          {contactInfo.address.title}
                        </h4>
                        <div className="text-gray-600 space-y-1" data-testid="address-content">
                          {contactInfo.address.content.map((line, index) => (
                            <p key={index} className="text-sm">{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2" data-testid="phone-title">
                          {contactInfo.phone.title}
                        </h4>
                        <div className="text-gray-600 space-y-1" data-testid="phone-content">
                          {contactInfo.phone.content.map((phone, index) => (
                            <p key={index}>
                              <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-[#0066CC] transition-colors font-medium">
                                {phone}
                              </a>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2" data-testid="email-title">
                          {contactInfo.email.title}
                        </h4>
                        <div className="text-gray-600 space-y-1" data-testid="email-content">
                          {contactInfo.email.content.map((email, index) => (
                            <p key={index}>
                              <a href={`mailto:${email}`} className="hover:text-[#0066CC] transition-colors font-medium">
                                {email}
                              </a>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2" data-testid="hours-title">
                          {contactInfo.hours.title}
                        </h4>
                        <div className="text-gray-600 space-y-1" data-testid="hours-content">
                          {contactInfo.hours.content.map((hours, index) => (
                            <p key={index} className="text-sm">{hours}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Quick Actions Card */}
                <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6" data-testid="quick-actions-title">
                    Quick Actions
                  </h3>
                  <div className="space-y-4">
                    <Button 
                      className="w-full h-12 bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#003D7A] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      onClick={() => window.open('tel:+918919199030', '_self')}
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Call Now
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full h-12 border-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white font-semibold rounded-xl transition-all duration-300"
                      onClick={() => window.open('mailto:info@mcbconsulting.com', '_self')}
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Send Email
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full h-12 border-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white font-semibold rounded-xl transition-all duration-300"
                      onClick={() => window.open('https://wa.me/918919199030', '_blank')}
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
