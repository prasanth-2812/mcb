import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { SEOHead } from "@/components/seo-head";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JobCard } from "@/components/job-card";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, MapPin, Briefcase, Filter, SlidersHorizontal } from "lucide-react";
import { Job } from "@shared/schema";

export default function Jobs() {
  const { t } = useTranslation();
  const [location] = useLocation();
  
  // Parse URL parameters
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  
  const [filters, setFilters] = useState({
    search: urlParams.get("search") || "",
    location: urlParams.get("location") || "",
    category: urlParams.get("category") || "",
    type: urlParams.get("type") || "",
    experience: urlParams.get("experience") || "",
    salary: urlParams.get("salary") || "",
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // Build query parameters for API call
  const buildQueryParams = () => {
    const params: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim()) {
        params[key] = value;
      }
    });
    return params;
  };

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ["/api/jobs", buildQueryParams()],
    queryFn: async ({ queryKey }) => {
      const [endpoint, params] = queryKey;
      const url = new URL(endpoint as string, window.location.origin);
      
      Object.entries(params as Record<string, string>).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
      
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      return response.json();
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/job-categories"],
  });

  // Update filters and reset pagination
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      category: "",
      type: "",
      experience: "",
      salary: "",
    });
    setCurrentPage(1);
  };

  // Pagination logic
  const totalJobs = jobs?.length || 0;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = jobs?.slice(startIndex, endIndex) || [];

  const paginationNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": totalJobs,
    "itemListElement": currentJobs.map((job: Job, index) => ({
      "@type": "JobPosting",
      "position": startIndex + index + 1,
      "title": job.title,
      "description": job.description,
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.company
      },
      "jobLocation": {
        "@type": "Place",
        "address": job.location
      },
      "employmentType": job.type,
      "datePosted": job.postedDate,
      "validThrough": job.expiryDate
    }))
  };

  return (
    <>
      <SEOHead
        title={`Job Search - Find Your Dream Career | MCB Consulting Services`}
        description={`Browse ${totalJobs} job opportunities across India. Find jobs in IT, Finance, Healthcare, Engineering and more with MCB Consulting Services.`}
        keywords="jobs, career, employment, recruitment, job search, India, IT jobs, finance jobs"
        structuredData={jobPostingSchema}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Page Header */}
        <section className="bg-muted py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="jobs-page-title">
                Find Your Perfect Job
              </h1>
              <p className="text-xl text-muted-foreground" data-testid="jobs-page-subtitle">
                Discover opportunities that match your skills and career goals
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-6 mb-8">
              {/* Main Search Bar */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={filters.search}
                    onChange={(e) => updateFilters({ search: e.target.value })}
                    className="pl-10"
                    data-testid="job-search-input"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Location"
                    value={filters.location}
                    onChange={(e) => updateFilters({ location: e.target.value })}
                    className="pl-10"
                    data-testid="job-location-input"
                  />
                </div>
                
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => updateFilters({ category: value })}
                >
                  <SelectTrigger data-testid="job-category-select">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="All Categories" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories?.map((category: any) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  variant="outline"
                  className="flex items-center space-x-2"
                  data-testid="advanced-filters-toggle"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                  <Select 
                    value={filters.type} 
                    onValueChange={(value) => updateFilters({ type: value })}
                  >
                    <SelectTrigger data-testid="job-type-select">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={filters.experience} 
                    onValueChange={(value) => updateFilters({ experience: value })}
                  >
                    <SelectTrigger data-testid="job-experience-select">
                      <SelectValue placeholder="Experience Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="0-2 years">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="2-5 years">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="5+ years">Senior Level (5+ years)</SelectItem>
                      <SelectItem value="10+ years">Executive (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={clearFilters}
                      variant="outline"
                      className="flex-1"
                      data-testid="clear-filters-button"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-muted-foreground" data-testid="jobs-count">
                {isLoading ? (
                  <Skeleton className="h-5 w-32" />
                ) : (
                  `${totalJobs} jobs found`
                )}
              </div>
              
              <Select defaultValue="newest">
                <SelectTrigger className="w-48" data-testid="sort-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Listings */}
            {isLoading ? (
              <div className="space-y-6" data-testid="jobs-loading">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="p-6">
                    <Skeleton className="h-6 w-64 mb-2" />
                    <Skeleton className="h-4 w-48 mb-4" />
                    <Skeleton className="h-16 w-full mb-4" />
                    <div className="flex space-x-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Card className="p-12 text-center" data-testid="jobs-error">
                <div className="text-destructive mb-4">
                  <Filter className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">Error Loading Jobs</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  We couldn't load the job listings. Please try again.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </Card>
            ) : currentJobs.length === 0 ? (
              <Card className="p-12 text-center" data-testid="no-jobs-found">
                <div className="text-muted-foreground mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">No Jobs Found</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="space-y-6" data-testid="jobs-list">
                {currentJobs.map((job: Job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-12" data-testid="pagination">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  data-testid="pagination-previous"
                >
                  Previous
                </Button>
                
                <div className="flex space-x-2">
                  {paginationNumbers().map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className="w-10 h-10"
                      data-testid={`pagination-page-${page}`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  data-testid="pagination-next"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
