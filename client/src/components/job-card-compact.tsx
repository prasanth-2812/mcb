import { Job } from "@shared/schema";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, User, Building2 } from "lucide-react";

interface JobCardCompactProps {
  job: Job;
  viewMode: 'list' | 'grid';
}

export function JobCardCompact({ job, viewMode }: JobCardCompactProps) {
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

  if (viewMode === 'grid') {
    return (
      <div
                 className="group bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden cursor-pointer h-full flex flex-col hover:border-[#0066CC]/30"
        onClick={handleCardClick}
        data-testid={`job-card-compact-${job.id}`}
      >
        {/* Gradient Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/0 via-[#0052A3]/0 to-[#003D7A]/0 group-hover:from-[#0066CC]/5 group-hover:via-[#0052A3]/5 group-hover:to-[#003D7A]/5 transition-all duration-300"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
                             <div className="w-10 h-10 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-[#0066CC] transition-colors duration-300 truncate" data-testid={`job-title-${job.id}`}>
                  {job.title}
                </h3>
                <p className="text-gray-600 font-medium text-xs truncate" data-testid={`job-company-${job.id}`}>
                  {job.company}
                </p>
              </div>
            </div>
            <div className="text-right">
              {job.salary && (
                                 <div className="text-sm font-bold text-[#0066CC] mb-1" data-testid={`job-salary-${job.id}`}>
                  {job.salary}
                </div>
              )}
              {daysAgo && (
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full" data-testid={`job-posted-${job.id}`}>
                  {daysAgo}d
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-3 flex-1">
            <p className="text-gray-600 leading-relaxed line-clamp-2 text-xs" data-testid={`job-description-${job.id}`}>
              {job.description}
            </p>
          </div>

          {/* Job Details */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                             <span className="flex items-center bg-[#0066CC]/10 px-2 py-1 rounded-lg" data-testid={`job-location-${job.id}`}>
                 <MapPin className="h-3 w-3 mr-1 text-[#0066CC]" />
                {job.location}
              </span>
              <span className="flex items-center bg-green-50 px-2 py-1 rounded-lg" data-testid={`job-type-${job.id}`}>
                <Clock className="h-3 w-3 mr-1 text-green-600" />
                {job.type}
              </span>
            </div>
          </div>

          {/* Skills */}
          {job.skills && job.skills.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1" data-testid={`job-skills-${job.id}`}>
                {job.skills.slice(0, 2).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                                         className="text-xs bg-[#0066CC]/10 text-[#0066CC] hover:bg-[#0066CC]/20 transition-colors duration-300 px-2 py-1"
                    data-testid={`job-skill-${job.id}-${index}`}
                  >
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 2 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 px-2 py-1">
                    +{job.skills.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Apply Button */}
          <div className="mt-auto">
            <Button 
                             className="w-full bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#003D7A] text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-xs"
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

  // List view
  return (
    <div
             className="group bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden cursor-pointer hover:border-[#0066CC]/30"
      onClick={handleCardClick}
      data-testid={`job-card-compact-${job.id}`}
    >
      {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/0 via-[#0052A3]/0 to-[#003D7A]/0 group-hover:from-[#0066CC]/5 group-hover:via-[#0052A3]/5 group-hover:to-[#003D7A]/5 transition-all duration-300"></div>
      
      <div className="relative z-10 flex items-center space-x-4">
        {/* Company Icon */}
                 <div className="w-12 h-12 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md flex-shrink-0">
          <Building2 className="h-6 w-6 text-white" />
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
                             <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#0066CC] transition-colors duration-300 truncate" data-testid={`job-title-${job.id}`}>
                {job.title}
              </h3>
              <p className="text-gray-600 font-semibold text-sm truncate" data-testid={`job-company-${job.id}`}>
                {job.company}
              </p>
            </div>
            <div className="text-right ml-4">
              {job.salary && (
                                 <div className="text-base font-bold text-[#0066CC] mb-1" data-testid={`job-salary-${job.id}`}>
                  {job.salary}
                </div>
              )}
              {daysAgo && (
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full" data-testid={`job-posted-${job.id}`}>
                  {daysAgo} days ago
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed line-clamp-1 text-sm mb-3" data-testid={`job-description-${job.id}`}>
            {job.description}
          </p>

          {/* Job Details and Skills */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                             <span className="flex items-center bg-[#0066CC]/10 px-3 py-1 rounded-lg" data-testid={`job-location-${job.id}`}>
                 <MapPin className="h-3 w-3 mr-1 text-[#0066CC]" />
                {job.location}
              </span>
              <span className="flex items-center bg-green-50 px-3 py-1 rounded-lg" data-testid={`job-type-${job.id}`}>
                <Clock className="h-3 w-3 mr-1 text-green-600" />
                {job.type}
              </span>
              <span className="flex items-center bg-purple-50 px-3 py-1 rounded-lg" data-testid={`job-experience-${job.id}`}>
                <User className="h-3 w-3 mr-1 text-purple-600" />
                {job.experience}
              </span>
            </div>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="flex flex-wrap gap-1" data-testid={`job-skills-${job.id}`}>
                {job.skills.slice(0, 2).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                                         className="text-xs bg-[#0066CC]/10 text-[#0066CC] hover:bg-[#0066CC]/20 transition-colors duration-300 px-2 py-1"
                    data-testid={`job-skill-${job.id}-${index}`}
                  >
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 2 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 px-2 py-1">
                    +{job.skills.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex-shrink-0">
          <Button 
                         className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#003D7A] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
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
