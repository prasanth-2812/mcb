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
      className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden cursor-pointer h-full flex flex-col hover:border-blue-200"
      onClick={handleCardClick}
      data-testid={`job-card-${job.id}`}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-indigo-500/5 transition-all duration-500"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-blue-500/25">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300" data-testid={`job-title-${job.id}`}>
                {job.title}
              </h3>
              <p className="text-gray-600 font-semibold text-base" data-testid={`job-company-${job.id}`}>
                {job.company}
              </p>
            </div>
          </div>
          <div className="text-right">
            {job.salary && (
              <div className="text-lg font-bold text-blue-600 mb-2" data-testid={`job-salary-${job.id}`}>
                {job.salary}
              </div>
            )}
            {daysAgo && (
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full" data-testid={`job-posted-${job.id}`}>
                {daysAgo} days ago
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 flex-1">
          <p className="text-gray-600 leading-relaxed line-clamp-3 text-base" data-testid={`job-description-${job.id}`}>
            {job.description}
          </p>
        </div>

        {/* Job Details */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center bg-blue-50 px-3 py-2 rounded-xl" data-testid={`job-location-${job.id}`}>
              <MapPin className="h-4 w-4 mr-2 text-blue-600" />
              {job.location}
            </span>
            <span className="flex items-center bg-green-50 px-3 py-2 rounded-xl" data-testid={`job-type-${job.id}`}>
              <Clock className="h-4 w-4 mr-2 text-green-600" />
              {job.type}
            </span>
            <span className="flex items-center bg-purple-50 px-3 py-2 rounded-xl" data-testid={`job-experience-${job.id}`}>
              <User className="h-4 w-4 mr-2 text-purple-600" />
              {job.experience}
            </span>
          </div>
        </div>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2" data-testid={`job-skills-${job.id}`}>
              {job.skills.slice(0, 3).map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-300 px-3 py-2 rounded-xl"
                  data-testid={`job-skill-${job.id}-${index}`}
                >
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 3 && (
                <Badge variant="secondary" className="text-sm bg-gray-100 text-gray-600 px-3 py-2 rounded-xl">
                  +{job.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Apply Button */}
        <div className="mt-auto">
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
            onClick={handleApplyClick}
            data-testid={`job-apply-${job.id}`}
          >
            {t("featuredJobs.applyNow")}
          </Button>
        </div>
      </div>
    </div>
  );
}
