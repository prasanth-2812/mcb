import { 
  type User, 
  type InsertUser, 
  type Company, 
  type InsertCompany,
  type Job, 
  type InsertJob,
  type Application, 
  type InsertApplication,
  type Testimonial, 
  type InsertTestimonial,
  type ContactMessage, 
  type InsertContactMessage 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Companies
  getCompanies(): Promise<Company[]>;
  getCompany(id: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;

  // Jobs
  getJobs(filters?: {
    category?: string;
    location?: string;
    type?: string;
    experience?: string;
    featured?: boolean;
    search?: string;
  }): Promise<Job[]>;
  getJob(id: string): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  getFeaturedJobs(): Promise<Job[]>;
  getJobsByCategory(category: string): Promise<Job[]>;

  // Applications
  getApplications(): Promise<Application[]>;
  getApplication(id: string): Promise<Application | undefined>;
  getApplicationsByJob(jobId: string): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private companies: Map<string, Company>;
  private jobs: Map<string, Job>;
  private applications: Map<string, Application>;
  private testimonials: Map<string, Testimonial>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.companies = new Map();
    this.jobs = new Map();
    this.applications = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed companies
    const companies = [
      {
        id: "1",
        name: "TechCorp Solutions Pvt Ltd",
        description: "Leading software development company",
        logo: "techcorp",
        website: "https://techcorp.com",
        industry: "Information Technology",
        size: "500-1000",
        location: "Mumbai, Maharashtra",
        createdAt: new Date()
      },
      {
        id: "2",
        name: "GrowthLabs Marketing",
        description: "Digital marketing agency",
        logo: "growthlabs",
        website: "https://growthlabs.com",
        industry: "Marketing & Advertising",
        size: "50-100",
        location: "Bangalore, Karnataka",
        createdAt: new Date()
      },
      {
        id: "3",
        name: "FinanceFirst Bank",
        description: "Leading financial services provider",
        logo: "financefirst",
        website: "https://financefirst.com",
        industry: "Banking & Finance",
        size: "1000+",
        location: "Delhi, NCR",
        createdAt: new Date()
      }
    ];

    companies.forEach(company => this.companies.set(company.id, company));

    // Seed jobs
    const jobs = [
      {
        id: "1",
        title: "Senior Software Engineer",
        description: "Join our innovative development team to build scalable web applications using React, Node.js, and cloud technologies. Experience with microservices architecture preferred.",
        company: "TechCorp Solutions Pvt Ltd",
        companyId: "1",
        location: "Mumbai, Maharashtra",
        type: "Full-time",
        category: "Information Technology",
        experience: "5-8 years",
        salary: "₹12-18 LPA",
        skills: ["React", "Node.js", "MongoDB", "AWS"],
        requirements: ["Bachelor's degree in Computer Science", "5+ years of web development experience", "Strong knowledge of JavaScript and TypeScript"],
        benefits: ["Health Insurance", "Flexible Working Hours", "Learning & Development Budget"],
        featured: true,
        active: true,
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: "2",
        title: "Digital Marketing Manager",
        description: "Lead digital marketing campaigns across multiple channels. Manage PPC, SEO, social media, and content marketing initiatives to drive customer acquisition and engagement.",
        company: "GrowthLabs Marketing",
        companyId: "2",
        location: "Bangalore, Karnataka",
        type: "Full-time",
        category: "Marketing & Sales",
        experience: "3-6 years",
        salary: "₹8-12 LPA",
        skills: ["Google Ads", "SEO", "Analytics", "Social Media"],
        requirements: ["Bachelor's degree in Marketing or related field", "3+ years of digital marketing experience", "Google Ads certification preferred"],
        benefits: ["Performance Bonuses", "Work From Home", "Professional Development"],
        featured: true,
        active: true,
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        expiryDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
      },
      {
        id: "3",
        title: "Senior Business Analyst",
        description: "Analyze business requirements and translate them into technical specifications. Work with cross-functional teams to implement financial solutions and process improvements.",
        company: "FinanceFirst Bank",
        companyId: "3",
        location: "Delhi, NCR",
        type: "Full-time",
        category: "Finance & Banking",
        experience: "4-7 years",
        salary: "₹15-22 LPA",
        skills: ["SQL", "Excel", "Agile", "Tableau"],
        requirements: ["Bachelor's degree in Finance, Business, or IT", "4+ years of business analysis experience", "Strong analytical and communication skills"],
        benefits: ["Medical Insurance", "Provident Fund", "Annual Bonus"],
        featured: true,
        active: true,
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
      }
    ];

    jobs.forEach(job => this.jobs.set(job.id, job));

    // Seed testimonials
    const testimonials = [
      {
        id: "1",
        name: "Priya Sharma",
        role: "Senior Software Architect",
        company: "TechCorp Solutions",
        content: "MCB Consulting helped me transition from a mid-level developer to a senior architect role at a Fortune 500 company. Their personalized approach and industry connections made all the difference.",
        rating: 5,
        featured: true,
        createdAt: new Date()
      },
      {
        id: "2",
        name: "Rajesh Kumar",
        role: "Digital Marketing Manager",
        company: "GrowthLabs Marketing",
        content: "The multilingual support was incredible. Being able to discuss opportunities in Tamil made the process so much more comfortable. Found my ideal marketing role within 3 weeks!",
        rating: 5,
        featured: true,
        createdAt: new Date()
      },
      {
        id: "3",
        name: "Anita Reddy",
        role: "Healthcare Administrator",
        company: "MedCare Hospitals",
        content: "Professional, efficient, and results-driven. MCB Consulting's team understood my career goals and matched me with the perfect healthcare administration role. Highly recommended!",
        rating: 5,
        featured: true,
        createdAt: new Date()
      }
    ];

    testimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Company methods
  async getCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async getCompany(id: string): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = randomUUID();
    const company: Company = { 
      ...insertCompany, 
      id, 
      createdAt: new Date(),
      size: insertCompany.size || null,
      description: insertCompany.description || null,
      logo: insertCompany.logo || null,
      website: insertCompany.website || null,
      industry: insertCompany.industry || null,
      location: insertCompany.location || null
    };
    this.companies.set(id, company);
    return company;
  }

  // Job methods
  async getJobs(filters?: {
    category?: string;
    location?: string;
    type?: string;
    experience?: string;
    featured?: boolean;
    search?: string;
  }): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values()).filter(job => job.active);

    if (filters) {
      if (filters.category) {
        jobs = jobs.filter(job => job.category === filters.category);
      }
      if (filters.location) {
        jobs = jobs.filter(job => job.location.toLowerCase().includes(filters.location!.toLowerCase()));
      }
      if (filters.type) {
        jobs = jobs.filter(job => job.type === filters.type);
      }
      if (filters.experience) {
        jobs = jobs.filter(job => job.experience === filters.experience);
      }
      if (filters.featured !== undefined) {
        jobs = jobs.filter(job => job.featured === filters.featured);
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        jobs = jobs.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.skills?.some(skill => skill.toLowerCase().includes(searchTerm))
        );
      }
    }

    return jobs.sort((a, b) => new Date(b.postedDate!).getTime() - new Date(a.postedDate!).getTime());
  }

  async getJob(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = randomUUID();
    const job: Job = { 
      ...insertJob, 
      id, 
      postedDate: new Date(),
      featured: insertJob.featured || false,
      active: insertJob.active !== undefined ? insertJob.active : true,
      companyId: insertJob.companyId || null,
      salary: insertJob.salary || null,
      skills: insertJob.skills || null,
      requirements: insertJob.requirements || null,
      benefits: insertJob.benefits || null,
      expiryDate: insertJob.expiryDate || null
    };
    this.jobs.set(id, job);
    return job;
  }

  async getFeaturedJobs(): Promise<Job[]> {
    return this.getJobs({ featured: true });
  }

  async getJobsByCategory(category: string): Promise<Job[]> {
    return this.getJobs({ category });
  }

  // Application methods
  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }

  async getApplication(id: string): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getApplicationsByJob(jobId: string): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(app => app.jobId === jobId);
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const application: Application = { 
      ...insertApplication, 
      id, 
      appliedAt: new Date(),
      status: "pending",
      phone: insertApplication.phone || null,
      resume: insertApplication.resume || null,
      coverLetter: insertApplication.coverLetter || null,
      experience: insertApplication.experience || null,
      expectedSalary: insertApplication.expectedSalary || null
    };
    this.applications.set(id, application);
    return application;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.featured);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      createdAt: new Date(),
      featured: insertTestimonial.featured || false
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date(),
      status: "new",
      phone: insertMessage.phone || null,
      experienceLevel: insertMessage.experienceLevel || null,
      preferredLanguage: insertMessage.preferredLanguage || null,
      serviceInterests: insertMessage.serviceInterests || null
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
