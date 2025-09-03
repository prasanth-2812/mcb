import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export function HeroSection() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  return (
    <section 
      className="hero-gradient text-white py-32 relative overflow-hidden" 
      id="home"
      style={{ backgroundColor: 'hsl(200.11deg 100% 35.1%)' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-300/20 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-300/15 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 animate-fade-in-up border border-white/20">
            <Star className="w-4 h-4 mr-2 text-yellow-300" />
            India's Leading Career Platform
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up" data-testid="hero-title" style={{ animationDelay: '0.2s' }}>
            Find Your Perfect Gig in India
            <br />
            <span className="text-yellow-300 bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              MCB Consulting
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" data-testid="hero-subtitle" style={{ animationDelay: '0.4s' }}>
            Flexible work opportunities connecting talented professionals with top companies across India. 
            Your career success is our mission.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg"
              className="bg-yellow-300 text-blue-900 hover:bg-yellow-400 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-yellow-300/25 transition-all duration-300 transform hover:scale-105"
              onClick={() => setLocation('/jobs')}
            >
              Explore Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-blue-600 hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/25"
              onClick={() => setLocation('/contact')}
            >
              Get Started
            </Button>
          </div>
        </div>




      </div>
    </section>
  );
}
