import { useState } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";

export function HeroSection() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [searchForm, setSearchForm] = useState({
    keywords: "",
    location: "",
    category: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchForm.keywords) params.set("search", searchForm.keywords);
    if (searchForm.location) params.set("location", searchForm.location);
    if (searchForm.category) params.set("category", searchForm.category);
    
    setLocation(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="hero-gradient text-primary-foreground py-20" id="home">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="hero-title text-5xl font-bold mb-6 leading-tight" data-testid="hero-title">
            {t("hero.title").split("MCB Consulting")[0]}
            <span className="text-yellow-300">MCB Consulting</span>
            {t("hero.title").split("MCB Consulting")[1]}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto" data-testid="hero-subtitle">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Job Search Form */}
        <Card className="bg-card rounded-xl shadow-2xl p-8 max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-6" data-testid="job-search-form">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Job Title or Keywords
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder={t("hero.searchPlaceholder")}
                    value={searchForm.keywords}
                    onChange={(e) => setSearchForm({ ...searchForm, keywords: e.target.value })}
                    className="pl-10 form-input"
                    data-testid="search-keywords"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder={t("hero.locationPlaceholder")}
                    value={searchForm.location}
                    onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                    className="pl-10 form-input"
                    data-testid="search-location"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Category
                </label>
                <Select 
                  value={searchForm.category} 
                  onValueChange={(value) => setSearchForm({ ...searchForm, category: value })}
                >
                  <SelectTrigger className="form-input" data-testid="search-category">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="All Categories" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                    <SelectItem value="Finance & Banking">Finance & Banking</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing & Sales">Marketing & Sales</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Creative & Design">Creative & Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                type="submit" 
                className="btn-primary flex items-center justify-center space-x-2"
                data-testid="search-button"
              >
                <Search className="h-4 w-4" />
                <span>{t("hero.searchButton")}</span>
              </Button>
              <Button 
                type="button" 
                variant="secondary"
                className="font-medium"
                data-testid="advanced-search-button"
              >
                {t("hero.advancedSearch")}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
