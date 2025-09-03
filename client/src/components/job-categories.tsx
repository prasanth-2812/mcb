import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { 
  Laptop, 
  TrendingUp, 
  Heart, 
  Settings, 
  Megaphone, 
  GraduationCap, 
  Users, 
  Palette,
  Briefcase 
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "laptop-code": Laptop,
  "chart-line": TrendingUp,
  "heartbeat": Heart,
  "cogs": Settings,
  "bullhorn": Megaphone,
  "graduation-cap": GraduationCap,
  "users": Users,
  "palette": Palette,
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
    <section className="py-20 bg-background" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl font-bold text-foreground mb-4" data-testid="categories-title">
            {t("categories.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="categories-subtitle">
            {t("categories.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((category: any) => {
            const IconComponent = iconMap[category.icon] || Briefcase;
            
            return (
              <div
                key={category.id}
                className="category-card bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-primary"
                onClick={() => handleCategoryClick(category.id)}
                data-testid={`category-${category.id}`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="category-icon h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {category.jobCount.toLocaleString()} {t("categories.jobsAvailable")}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {category.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="btn-primary"
            onClick={() => setLocation("/jobs")}
            data-testid="view-all-categories"
          >
            {t("categories.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
}
