import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { SEOHead } from "@/components/seo-head";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JobCard } from "@/components/job-card";
import { JobCardCompact } from "@/components/job-card-compact";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, MapPin, Briefcase, Filter, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Job } from "@shared/schema";

export default function Internships() {
  const { t } = useTranslation();
  const [location] = useLocation();
  
  // Parse URL parameters
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  
  const [filters, setFilters] = useState({
    search: urlParams.get("search") || "",
    location: urlParams.get("location") || "",
    category: urlParams.get("category") || "",
    type: "Internship", // Fixed for internships
    experience: "0-2 years", // Entry level for internships
    salary: urlParams.get("salary") || "",
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const jobsPerPage = 10;

  // Build query parameters for API call
  const buildQueryParams = () => {
    const params: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() && value !== "all") {
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
        throw new Error('Failed to fetch internships');
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
      type: "Internship",
      experience: "0-2 years",
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

  return (
    <>
      <SEOHead
        title={`Internships - Find Your Perfect Internship | MCB Consulting Services`}
        description={`Browse ${totalJobs} internship opportunities across India. Find internships in IT, Finance, Healthcare, Engineering and more with MCB Consulting Services.`}
        keywords="internships, career, employment, recruitment, internship search, India, IT internships, finance internships"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/30">
        <Header />
        
        {/* Page Header */}
        <section className="relative bg-gradient-to-r from-[#0066CC] via-[#0052A3] to-[#003D7A] py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300/20 rounded-full animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse-slow"></div>
            <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-300/15 rounded-full animate-bounce-slow"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-8 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight" data-testid="internships-page-title">
                Find Your Perfect Internship
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed" data-testid="internships-page-subtitle">
                Discover hands-on learning opportunities that match your skills and career goals
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-12 -mt-8 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 mb-12 shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Main Search Bar */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-[#0066CC] transition-colors" />
                  <Input
                    placeholder="Internship title, keywords, or company"
                    value={filters.search}
                    onChange={(e) => updateFilters({ search: e.target.value })}
                    className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-300 rounded-xl"
                    data-testid="internship-search-input"
                  />
                </div>
                
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-[#0066CC] transition-colors" />
                  <Input
                    placeholder="Location"
                    value={filters.location}
                    onChange={(e) => updateFilters({ location: e.target.value })}
                    className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-300 rounded-xl"
                    data-testid="internship-location-input"
                  />
                </div>
                
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => updateFilters({ category: value })}
                >
                  <SelectTrigger className="h-14 text-lg border-2 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-300 rounded-xl" data-testid="internship-category-select">
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-3 text-muted-foreground" />
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
                  className="h-14 text-lg border-2 border-gray-200 hover:border-[#0066CC] hover:bg-[#0066CC]/5 transition-all duration-300 rounded-xl flex items-center space-x-3"
                  data-testid="advanced-filters-toggle"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  <span>Advanced Filters</span>
                </Button>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200 animate-fade-in-up">
                  <div className="flex space-x-3">
                    <Button 
                      onClick={clearFilters}
                      variant="outline"
                      className="flex-1 h-12 border-2 border-gray-200 hover:border-[#0066CC] hover:bg-[#0066CC]/5 hover:text-[#0066CC] transition-all duration-300 rounded-xl"
                      data-testid="clear-filters-button"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-lg font-semibold text-gray-700" data-testid="internships-count">
                {isLoading ? (
                  <Skeleton className="h-6 w-40" />
                ) : (
                  <span className="flex items-center">
                    <span className="text-[#0066CC] font-bold">{totalJobs}</span>
                    <span className="ml-2">internships found</span>
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-white shadow-sm text-[#0066CC]' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-white shadow-sm text-[#0066CC]' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>

                <Select defaultValue="newest">
                  <SelectTrigger className="w-56 h-12 border-2 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-300 rounded-xl" data-testid="sort-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Listings */}
            {isLoading ? (
              <div className="space-y-8" data-testid="internships-loading">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-pulse">
                    <div className="flex items-start space-x-4">
                      <Skeleton className="h-16 w-16 rounded-xl" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-64" />
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-16 w-full" />
                        <div className="flex space-x-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-28" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Card className="p-16 text-center shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up" data-testid="internships-error">
                <div className="text-red-500 mb-6">
                  <Filter className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Error Loading Internships</h3>
                </div>
                <p className="text-gray-600 mb-8 text-lg">
                  We couldn't load the internship listings. Please try again.
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 text-lg bg-[#0066CC] hover:bg-[#0052A3] transition-all duration-300 rounded-xl"
                >
                  Try Again
                </Button>
              </Card>
            ) : currentJobs.length === 0 ? (
              <Card className="p-16 text-center shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up" data-testid="no-internships-found">
                <div className="text-gray-500 mb-6">
                  <Search className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">No Internships Found</h3>
                </div>
                <p className="text-gray-600 mb-8 text-lg">
                  We couldn't find any internships matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button 
                  onClick={clearFilters}
                  className="px-8 py-3 text-lg bg-[#0066CC] hover:bg-[#0052A3] transition-all duration-300 rounded-xl"
                >
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div 
                className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                    : 'space-y-4'
                }`} 
                data-testid="internships-list"
              >
                {currentJobs.map((job: Job, index) => (
                  <div 
                    key={job.id} 
                    className="animate-fade-in-up" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <JobCardCompact job={job} viewMode={viewMode} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-16 animate-fade-in-up" data-testid="pagination">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 h-12 border-2 border-gray-200 hover:border-[#0066CC] hover:bg-[#0066CC]/5 transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className={`w-12 h-12 border-2 transition-all duration-300 rounded-xl ${
                        currentPage === page 
                          ? "bg-[#0066CC] hover:bg-[#0052A3] text-white border-[#0066CC]" 
                          : "border-gray-200 hover:border-[#0066CC] hover:bg-[#0066CC]/5"
                      }`}
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
                  className="px-6 py-3 h-12 border-2 border-gray-200 hover:border-[#0066CC] hover:bg-[#0066CC]/5 transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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