import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TranslationProvider } from "./hooks/use-translation";
import Home from "@/pages/home";
import Jobs from "@/pages/jobs";
import Internships from "@/pages/internships";
import JobDetails from "@/pages/job-details";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Cookies from "@/pages/cookies";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/internships" component={Internships} />
      <Route path="/jobs/:id" component={JobDetails} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </TranslationProvider>
    </QueryClientProvider>
  );
}

export default App;
