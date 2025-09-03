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
    <section className="py-20 bg-muted" id="featured-jobs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl font-bold text-foreground mb-4" data-testid="featured-jobs-title">
            {t("featuredJobs.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="featured-jobs-subtitle">
            {t("featuredJobs.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="featured-jobs-grid">
          {jobs?.map((job: Job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
