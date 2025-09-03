import { useState } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Star } from "lucide-react";
import { SEOHead } from "@/components/seo-head";

export default function Login() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Implement actual login logic
      console.log("Login attempt:", formData);
      // For now, redirect to home page
      setLocation('/');
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead
        title="Login - MCB Consulting Services"
        description="Sign in to your MCB Consulting account to access job opportunities and career services."
        keywords="login, sign in, MCB consulting, career services"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#0066CC]/5 via-white to-[#0066CC]/5 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#0066CC]/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#0066CC]/15 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#0066CC]/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-300/20 rounded-full animate-bounce-slow"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo and Branding */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="flex justify-center mb-4">
              <img 
                src="/mcb.svg" 
                alt="MCB Consulting" 
                className="h-16 w-auto max-w-48"
              />
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-[#0066CC]/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border border-[#0066CC]/20">
              <Star className="w-4 h-4 mr-2 text-[#0066CC]" />
              India's Leading Career Platform
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue your career journey
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Sign In
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-[#0066CC] focus:ring-[#0066CC] border-gray-300 rounded"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-[#0066CC] hover:text-[#0052A3] font-medium transition-colors"
                    onClick={() => {
                      // TODO: Implement forgot password
                      console.log("Forgot password clicked");
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-[#0066CC]/25"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>



              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-[#0066CC] hover:text-[#0052A3] font-medium transition-colors"
                    onClick={() => {
                      setLocation('/signup');
                      scrollToTop();
                    }}
                  >
                    Sign up for free
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home Link */}
          <div className="text-center mt-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => {
                setLocation('/');
                scrollToTop();
              }}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center space-x-1 mx-auto"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              <span>Back to home</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
