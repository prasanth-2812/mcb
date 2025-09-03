import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  TrendingUp, 
  Heart, 
  Settings, 
  Megaphone, 
  GraduationCap, 
  Users, 
  Palette,
  Briefcase,
  Building2,
  Car,
  Microscope,
  Calculator,
  Globe,
  Shield,
  Lightbulb
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "it": Code2,
  "finance": Calculator,
  "healthcare": Heart,
  "engineering": Settings,
  "marketing": Megaphone,
  "education": GraduationCap,
  "hr": Users,
  "design": Palette,
  "consulting": Building2,
  "logistics": Car,
  "research": Microscope,
  "sales": TrendingUp,
  "legal": Shield,
  "creative": Lightbulb,
  "operations": Briefcase,
  "international": Globe,
};

export function JobCategories() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["/api/job-categories"],
  });

  const handleCategoryClick = (categoryId: string) => {
    setLocation(`/jobs?category=${categoryId}`);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton h-12 w-96 mx-auto mb-4"></div>
            <div className="skeleton h-6 w-128 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton h-48 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#0066CC]/5 via-white to-[#0066CC]/5 relative overflow-hidden" id="categories">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-100/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-indigo-100/30 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-100/20 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-[#0066CC]/10 text-[#0066CC] rounded-full text-sm font-semibold mb-6 animate-fade-in-up border border-[#0066CC]/20">
            <span className="w-2 h-2 bg-[#0066CC] rounded-full mr-2 animate-pulse"></span>
            Explore Opportunities
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up" data-testid="categories-title" style={{ animationDelay: '0.2s' }}>
            {t("categories.title")}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" data-testid="categories-subtitle" style={{ animationDelay: '0.4s' }}>
            {t("categories.subtitle")}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((category: any, index: number) => {
            const IconComponent = iconMap[category.id] || Briefcase;
            
            return (
              <div
                key={category.id}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                onClick={() => handleCategoryClick(category.id)}
                data-testid={`category-${category.id}`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden h-full flex flex-col">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 transition-all duration-300"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon Container */}
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      
                      {/* Job Count Badge */}
                      <div className="inline-flex items-center px-2 py-1 bg-[#0066CC]/10 text-[#0066CC] rounded-full text-xs font-semibold mb-3 group-hover:bg-[#0066CC]/20 transition-colors duration-300 border border-[#0066CC]/20">
                        <span className="w-1.5 h-1.5 bg-[#0066CC] rounded-full mr-1.5"></span>
                        {category.jobCount.toLocaleString()} {t("categories.jobsAvailable")}
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed text-sm mb-4">
                        {category.description}
                      </p>
                    </div>

                    {/* Hover Arrow */}
                    <div className="flex items-center text-[#0066CC] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1 mt-auto">
                      <span className="text-xs font-semibold">Explore Jobs</span>
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

        {/* CTA Section */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Job?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Discover thousands of opportunities across all categories and take the next step in your career
            </p>
            <Button 
              size="lg"
              className="bg-white text-[#0066CC] hover:bg-gray-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => setLocation("/jobs")}
              data-testid="view-all-categories"
            >
              {t("categories.viewAll")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
