import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/use-translation";
import { Star, User } from "lucide-react";
import { Testimonial } from "@shared/schema";

export function Testimonials() {
  const { t } = useTranslation();

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton h-12 w-96 mx-auto mb-4"></div>
            <div className="skeleton h-6 w-128 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl font-bold text-foreground mb-4" data-testid="testimonials-title">
            {t("testimonials.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="testimonials-subtitle">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial: Testimonial) => (
            <div 
              key={testimonial.id} 
              className="testimonial-card"
              data-testid={`testimonial-${testimonial.id}`}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote 
                className="text-muted-foreground mb-6 leading-relaxed"
                data-testid={`testimonial-content-${testimonial.id}`}
              >
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div 
                    className="font-semibold text-foreground"
                    data-testid={`testimonial-name-${testimonial.id}`}
                  >
                    {testimonial.name}
                  </div>
                  <div 
                    className="text-sm text-muted-foreground"
                    data-testid={`testimonial-role-${testimonial.id}`}
                  >
                    {testimonial.role}
                  </div>
                  <div 
                    className="text-sm text-muted-foreground"
                    data-testid={`testimonial-company-${testimonial.id}`}
                  >
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
