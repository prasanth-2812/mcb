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
      "123 Business Tower, Level 15",
      "Bandra Kurla Complex",
      "Mumbai, Maharashtra 400051"
    ]
  },
  phone: {
    title: "Phone Numbers",
    content: [
      "+91 22 1234 5678",
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
      "Saturday: 10:00 AM - 2:00 PM",
      "Sunday: Closed"
    ]
  }
};

const officeLocations = [
  {
    city: "Mumbai",
    address: "Bandra Kurla Complex",
    phone: "+91 22 1234 5678",
    email: "mumbai@mcbconsulting.com",
    isPrimary: true
  },
  {
    city: "Delhi",
    address: "Connaught Place",
    phone: "+91 11 2345 6789",
    email: "delhi@mcbconsulting.com",
    isPrimary: false
  },
  {
    city: "Bangalore", 
    address: "Electronic City",
    phone: "+91 80 3456 7890",
    email: "bangalore@mcbconsulting.com",
    isPrimary: false
  }
];

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
      "streetAddress": "123 Business Tower, Level 15, Bandra Kurla Complex",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400051",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.0596",
      "longitude": "72.8295"
    },
    "url": "https://mcbconsulting.com",
    "telephone": "+91-22-1234-5678",
    "email": "info@mcbconsulting.com",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
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
        description="Contact MCB Consulting Services for expert career guidance and recruitment services. Call +91-22-1234-5678 or visit our Mumbai office. Available in English, Hindi, Tamil, Telugu."
        keywords="contact MCB consulting, career guidance, recruitment services Mumbai, job consultancy contact"
        structuredData={localBusinessSchema}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Page Header */}
        <section className="bg-muted py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="contact-page-title">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="contact-page-subtitle">
              {t("contact.subtitle")}
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
              
              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6" data-testid="contact-info-title">
                    {t("contact.contactInfo")}
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1" data-testid="address-title">
                          {contactInfo.address.title}
                        </h4>
                        <div className="text-muted-foreground" data-testid="address-content">
                          {contactInfo.address.content.map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1" data-testid="phone-title">
                          {contactInfo.phone.title}
                        </h4>
                        <div className="text-muted-foreground" data-testid="phone-content">
                          {contactInfo.phone.content.map((phone, index) => (
                            <p key={index}>
                              <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                                {phone}
                              </a>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1" data-testid="email-title">
                          {contactInfo.email.title}
                        </h4>
                        <div className="text-muted-foreground" data-testid="email-content">
                          {contactInfo.email.content.map((email, index) => (
                            <p key={index}>
                              <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                                {email}
                              </a>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1" data-testid="hours-title">
                          {contactInfo.hours.title}
                        </h4>
                        <div className="text-muted-foreground" data-testid="hours-content">
                          {contactInfo.hours.content.map((hours, index) => (
                            <p key={index}>{hours}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Interactive Map Placeholder */}
                <Card className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6" data-testid="map-title">
                    {t("contact.info.findUs")}
                  </h3>
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center" data-testid="map-placeholder">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-4" />
                      <p className="font-medium">Interactive Map</p>
                      <p className="text-sm">Location: Bandra Kurla Complex, Mumbai</p>
                      <Button variant="outline" className="mt-4" data-testid="open-maps">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in Maps
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="locations-title">
                Our Office Locations
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="locations-subtitle">
                Visit us at any of our convenient locations across India for personalized consultation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {officeLocations.map((location, index) => (
                <Card key={index} className={`p-6 ${location.isPrimary ? 'ring-2 ring-primary' : ''}`} data-testid={`location-${index}`}>
                  {location.isPrimary && (
                    <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full inline-block mb-4">
                      Primary Office
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {location.city}
                  </h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <a href={`tel:${location.phone}`} className="hover:text-primary transition-colors">
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <a href={`mailto:${location.email}`} className="hover:text-primary transition-colors">
                        {location.email}
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="quick-actions-title">
                Get Started Today
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="quick-actions-subtitle">
                Choose the best way to connect with us based on your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3" data-testid="instant-chat-title">
                  Instant Chat Support
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Get immediate answers to your questions through our live chat support available during business hours.
                </p>
                <Button className="w-full" data-testid="start-chat">
                  Start Chat
                </Button>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3" data-testid="schedule-consultation-title">
                  Schedule Consultation
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Book a one-on-one consultation with our career experts to discuss your specific requirements.
                </p>
                <Button variant="outline" className="w-full" data-testid="schedule-consultation">
                  Book Appointment
                </Button>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3" data-testid="phone-support-title">
                  Phone Support
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Speak directly with our consultants for personalized guidance and immediate assistance.
                </p>
                <Button variant="outline" className="w-full" data-testid="call-now">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
