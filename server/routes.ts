import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertJobSchema, 
  insertApplicationSchema, 
  insertContactMessageSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Jobs routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const { category, location, type, experience, featured, search } = req.query;
      
      const filters: any = {};
      if (category) filters.category = category as string;
      if (location) filters.location = location as string;
      if (type) filters.type = type as string;
      if (experience) filters.experience = experience as string;
      if (featured) filters.featured = featured === 'true';
      if (search) filters.search = search as string;

      const jobs = await storage.getJobs(Object.keys(filters).length > 0 ? filters : undefined);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/featured", async (req, res) => {
    try {
      const jobs = await storage.getFeaturedJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.getJob(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(jobData);
      res.status(201).json(job);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid job data" });
    }
  });

  // Companies routes
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await storage.getCompanies();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  });

  app.get("/api/companies/:id", async (req, res) => {
    try {
      const company = await storage.getCompany(req.params.id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch company" });
    }
  });

  // Applications routes
  app.post("/api/applications", async (req, res) => {
    try {
      const applicationData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(applicationData);
      res.status(201).json(application);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid application data" });
    }
  });

  app.get("/api/applications/job/:jobId", async (req, res) => {
    try {
      const applications = await storage.getApplicationsByJob(req.params.jobId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  // Testimonials routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials/featured", async (req, res) => {
    try {
      const testimonials = await storage.getFeaturedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured testimonials" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.status(201).json(message);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid contact data" });
    }
  });

  // Job categories endpoint
  app.get("/api/job-categories", async (req, res) => {
    try {
      const categories = [
        {
          id: "it",
          name: "Information Technology",
          icon: "laptop-code",
          jobCount: 2450,
          description: "Software Engineering, Data Science, DevOps"
        },
        {
          id: "finance",
          name: "Finance & Banking",
          icon: "chart-line",
          jobCount: 1850,
          description: "Investment Banking, Risk Management, Fintech"
        },
        {
          id: "healthcare",
          name: "Healthcare",
          icon: "heartbeat",
          jobCount: 1200,
          description: "Medical Professionals, Nursing, Pharmaceuticals"
        },
        {
          id: "engineering",
          name: "Engineering",
          icon: "cogs",
          jobCount: 980,
          description: "Mechanical, Civil, Electrical Engineering"
        },
        {
          id: "marketing",
          name: "Marketing & Sales",
          icon: "bullhorn",
          jobCount: 1650,
          description: "Digital Marketing, Sales Management, Brand Strategy"
        },
        {
          id: "education",
          name: "Education",
          icon: "graduation-cap",
          jobCount: 750,
          description: "Teaching, Administration, EdTech"
        },
        {
          id: "hr",
          name: "Human Resources",
          icon: "users",
          jobCount: 420,
          description: "Talent Acquisition, HR Management, Learning & Development"
        },
        {
          id: "design",
          name: "Creative & Design",
          icon: "palette",
          jobCount: 380,
          description: "UX/UI Design, Graphics, Content Creation"
        }
      ];
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job categories" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
