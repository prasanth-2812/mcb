# MCB Consulting Services - Job Portal & Consultancy Platform

## Overview

MCB Consulting Services is a full-stack web application providing professional job search and consultancy services in India. The platform connects talented professionals with top companies across multiple industries, offering job listings, application management, consultancy services, and multilingual support (English, Hindi, Tamil, Telugu).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system and CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation schemas
- **Internationalization**: Custom translation system supporting multiple Indian languages

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful APIs with structured error handling and request logging
- **File Structure**: Clean separation between server routes and business logic
- **Development**: Hot module replacement and runtime error overlays for development experience

### Database & Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Schema Management**: Centralized schema definitions with Zod validation
- **Migrations**: Drizzle Kit for database migrations and schema synchronization

### Data Storage Strategy
- **In-Memory Storage**: Current implementation uses in-memory data structures for rapid prototyping
- **Interface-Based Design**: IStorage interface allows easy transition to database persistence
- **Data Models**: Comprehensive entities for users, companies, jobs, applications, testimonials, and contact messages

### Authentication & Security
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Data Validation**: Zod schemas for runtime type checking and validation
- **CORS**: Configured for cross-origin requests with credential support

### Component Architecture
- **Design System**: Consistent UI components based on Radix UI primitives
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Accessibility**: WCAG compliant components with proper ARIA attributes
- **Code Organization**: Feature-based component structure with shared utilities

### Development & Build Process
- **Build Tool**: Vite for fast development and optimized production builds
- **Type Checking**: TypeScript with strict mode enabled
- **Code Quality**: ESBuild for production bundling
- **Development Tools**: Runtime error overlays and hot module replacement

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing for React applications
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Integration with Zod for form validation

### Database & Backend Services
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-zod**: Integration between Drizzle schemas and Zod validation
- **connect-pg-simple**: PostgreSQL session store for Express

### UI & Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Conditional CSS class composition

### Development Tools
- **vite**: Build tool and development server
- **@vitejs/plugin-react**: React support for Vite
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **tsx**: TypeScript execution for development

### Additional Utilities
- **date-fns**: Date manipulation and formatting
- **embla-carousel-react**: Carousel component implementation
- **cmdk**: Command palette component
- **react-icons**: Icon library for various icon sets
- **nanoid**: Unique ID generation utility