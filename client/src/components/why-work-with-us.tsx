import { useTranslation } from "@/hooks/use-translation";
import { Clock, Users, TrendingUp, Shield, Award, Heart } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Flexible Work Schedule",
    description: "Work on your own terms with flexible hours and remote opportunities that fit your lifestyle.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Users,
    title: "All Backgrounds, All Experiences",
    description: "We welcome professionals from diverse backgrounds and experience levels to join our network.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: TrendingUp,
    title: "Multiple Work Opportunities",
    description: "Access a wide range of job opportunities across various industries and skill levels.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Shield,
    title: "Grow with Us",
    description: "Continuous learning and development opportunities to advance your career with our support.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Award,
    title: "Timely Payments",
    description: "Reliable and prompt payment processing with transparent fee structures and no hidden costs.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: Heart,
    title: "Supportive Community",
    description: "Join a community of like-minded professionals with dedicated support and mentorship.",
    color: "from-pink-500 to-pink-600"
  }
];

export function WhyWorkWithUs() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gradient-to-br from-[#0066CC]/5 via-white to-[#0066CC]/5 relative overflow-hidden" id="why-work-with-us">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-50/50 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-50/60 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-50/50 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-blue-50/40 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-[#0066CC]/10 text-[#0066CC] rounded-full text-sm font-semibold mb-6 animate-fade-in-up border border-[#0066CC]/20">
            <span className="w-2 h-2 bg-[#0066CC] rounded-full mr-2 animate-pulse"></span>
            Why Choose MCB Consulting?
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Why work with <span className="text-[#0066CC]">us?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            We're committed to providing you with the best career opportunities and support to help you succeed in your professional journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden h-64">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#0066CC] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs">
                      {feature.description}
                    </p>

                    {/* Hover Indicator */}
                    <div className="mt-3 flex items-center text-[#0066CC] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                      <span className="text-xs font-semibold">Learn More</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Career Journey?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto text-base leading-relaxed">
              Join thousands of professionals who have found their dream jobs through our platform. 
              Your success story starts here.
            </p>
            <a
              href="/contact"
              className="bg-white text-[#0066CC] px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base inline-block"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
