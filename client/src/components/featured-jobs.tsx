import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/use-translation";
import { JobCard } from "./job-card";
import { Job } from "@shared/schema";

export function FeaturedJobs() {
  const { t } = useTranslation();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["/api/jobs/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton h-12 w-96 mx-auto mb-4"></div>
            <div className="skeleton h-6 w-128 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-80 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" id="featured-jobs">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-100/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-indigo-100/30 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-100/20 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Featured Opportunities
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up" data-testid="featured-jobs-title" style={{ animationDelay: '0.2s' }}>
            {t("featuredJobs.title")}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" data-testid="featured-jobs-subtitle" style={{ animationDelay: '0.4s' }}>
            {t("featuredJobs.subtitle")}
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="featured-jobs-grid">
          {jobs?.map((job: Job, index: number) => (
            <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Apply for Your Dream Job?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Explore thousands of opportunities and take the next step in your career journey
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              View All Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
