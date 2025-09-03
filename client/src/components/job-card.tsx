import { Job } from "@shared/schema";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, User, Building2 } from "lucide-react";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocation(`/jobs/${job.id}`);
  };

  const handleCardClick = () => {
    setLocation(`/jobs/${job.id}`);
  };

  const getDaysAgo = (date: Date | null) => {
    if (!date) return "";
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysAgo = getDaysAgo(job.postedDate);

  return (
    <div
      className="job-card bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
      data-testid={`job-card-${job.id}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground" data-testid={`job-title-${job.id}`}>
              {job.title}
            </h3>
            <p className="text-muted-foreground" data-testid={`job-company-${job.id}`}>
              {job.company}
            </p>
          </div>
        </div>
        <div className="text-right">
          {job.salary && (
            <div className="text-lg font-semibold text-primary" data-testid={`job-salary-${job.id}`}>
              {job.salary}
            </div>
          )}
          {daysAgo && (
            <div className="text-sm text-muted-foreground" data-testid={`job-posted-${job.id}`}>
              Posted {daysAgo} days ago
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3" data-testid={`job-description-${job.id}`}>
          {job.description}
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center" data-testid={`job-location-${job.id}`}>
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </span>
          <span className="flex items-center" data-testid={`job-type-${job.id}`}>
            <Clock className="h-4 w-4 mr-1" />
            {job.type}
          </span>
          <span className="flex items-center" data-testid={`job-experience-${job.id}`}>
            <User className="h-4 w-4 mr-1" />
            {job.experience}
          </span>
        </div>
        <Button 
          className="btn-primary text-sm"
          onClick={handleApplyClick}
          data-testid={`job-apply-${job.id}`}
        >
          {t("featuredJobs.applyNow")}
        </Button>
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2" data-testid={`job-skills-${job.id}`}>
            {job.skills.slice(0, 4).map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs"
                data-testid={`job-skill-${job.id}-${index}`}
              >
                {skill}
              </Badge>
            ))}
            {job.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{job.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
