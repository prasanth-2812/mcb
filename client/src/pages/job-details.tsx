import { useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SEOHead } from "@/components/seo-head";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertApplicationSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { 
  MapPin, 
  Clock, 
  User, 
  Building2, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  ExternalLink,
  Share2,
  Bookmark,
  ArrowLeft
} from "lucide-react";
import { Job } from "@shared/schema";
import { Link } from "wouter";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);

  const { data: job, isLoading, error } = useQuery({
    queryKey: ["/api/jobs", id],
    enabled: !!id,
  });

  const form = useForm({
    resolver: zodResolver(insertApplicationSchema),
    defaultValues: {
      jobId: id || "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      resume: "",
      coverLetter: "",
      experience: "",
      expectedSalary: "",
    },
  });

  const applicationMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/applications", data);
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your job application has been submitted successfully. We'll be in touch soon!",
      });
      setShowApplicationDialog(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Application Failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    applicationMutation.mutate(data);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job?.title,
          text: `Check out this job opportunity: ${job?.title} at ${job?.company}`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Job link has been copied to clipboard.",
      });
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-32 mb-6" />
            <Card className="p-8 mb-6">
              <Skeleton className="h-8 w-96 mb-4" />
              <Skeleton className="h-6 w-64 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>
              <Skeleton className="h-32 mb-6" />
              <Skeleton className="h-12 w-32" />
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <SEOHead
          title="Job Not Found | MCB Consulting Services"
          description="The requested job posting could not be found."
        />
        <Header />
        <div className="min-h-screen bg-background py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="p-12">
              <h1 className="text-2xl font-bold text-foreground mb-4">Job Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The job posting you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/jobs">
                <Button>Browse All Jobs</Button>
              </Link>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "MCB Consulting",
      "value": job.id
    },
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location.split(",")[0],
        "addressRegion": job.location.split(",")[1]?.trim(),
        "addressCountry": "IN"
      }
    },
    "employmentType": job.type.toUpperCase().replace("-", "_"),
    "datePosted": job.postedDate,
    "validThrough": job.expiryDate,
    "baseSalary": job.salary ? {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary
      }
    } : undefined
  };

  const getDaysAgo = (date: Date | null) => {
    if (!date) return "";
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <SEOHead
        title={`${job.title} at ${job.company} | MCB Consulting Services`}
        description={`${job.description.substring(0, 160)}...`}
        keywords={`${job.title}, ${job.company}, ${job.location}, ${job.skills?.join(", ")}`}
        structuredData={jobSchema}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link href="/jobs">
              <Button variant="ghost" className="mb-6" data-testid="back-to-jobs">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>

            {/* Job Header */}
            <Card className="p-8 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="job-title">
                      {job.title}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-2" data-testid="job-company">
                      {job.company}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center" data-testid="job-location">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center" data-testid="job-type">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </span>
                      <span className="flex items-center" data-testid="job-posted">
                        <Calendar className="h-4 w-4 mr-1" />
                        Posted {getDaysAgo(job.postedDate)} days ago
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleShare}
                    data-testid="share-job"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    data-testid="bookmark-job"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Job Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <User className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Experience Required</div>
                  <div className="font-semibold" data-testid="job-experience">{job.experience}</div>
                </div>
                
                {job.salary && (
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">Salary Range</div>
                    <div className="font-semibold" data-testid="job-salary">{job.salary}</div>
                  </div>
                )}
                
                <div className="bg-muted rounded-lg p-4 text-center">
                  <CheckCircle className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="font-semibold" data-testid="job-category">{job.category}</div>
                </div>
              </div>

              {/* Apply Button */}
              <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full md:w-auto" data-testid="apply-button">
                    Apply for This Position
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Apply for {job.title}</DialogTitle>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name *</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="application-first-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name *</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="application-last-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} data-testid="application-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="application-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of Experience</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger data-testid="application-experience">
                                  <SelectValue placeholder="Select experience level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0-1">0-1 years</SelectItem>
                                  <SelectItem value="1-3">1-3 years</SelectItem>
                                  <SelectItem value="3-5">3-5 years</SelectItem>
                                  <SelectItem value="5-8">5-8 years</SelectItem>
                                  <SelectItem value="8+">8+ years</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="expectedSalary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expected Salary</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., ₹8-12 LPA" {...field} data-testid="application-salary" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="resume"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Resume/CV Link</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Link to your resume (Google Drive, Dropbox, etc.)" 
                                {...field} 
                                data-testid="application-resume"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="coverLetter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cover Letter</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us why you're interested in this position..."
                                rows={4}
                                {...field}
                                data-testid="application-cover-letter"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex space-x-4">
                        <Button 
                          type="submit" 
                          disabled={applicationMutation.isPending}
                          className="flex-1"
                          data-testid="submit-application"
                        >
                          {applicationMutation.isPending ? "Submitting..." : "Submit Application"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowApplicationDialog(false)}
                          data-testid="cancel-application"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </Card>

            {/* Job Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Job Description */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground" data-testid="job-description">
                    <p>{job.description}</p>
                  </div>
                </Card>

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                    <ul className="space-y-2" data-testid="job-requirements">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                    <ul className="space-y-2" data-testid="job-benefits">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Required Skills</h3>
                    <div className="flex flex-wrap gap-2" data-testid="job-skills">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Company Info */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">About the Company</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground">{job.company}</h4>
                      <p className="text-sm text-muted-foreground">
                        {job.category} • {job.location}
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Company Profile
                    </Button>
                  </div>
                </Card>

                {/* Application Deadline */}
                {job.expiryDate && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Application Deadline</h3>
                    <p className="text-muted-foreground" data-testid="job-deadline">
                      {new Date(job.expiryDate).toLocaleDateString()}
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
