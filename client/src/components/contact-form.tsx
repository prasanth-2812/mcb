import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/use-translation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Send } from "lucide-react";
import { z } from "zod";

const contactFormSchema = insertContactMessageSchema.extend({
  serviceInterests: z.array(z.string()).optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [serviceInterests, setServiceInterests] = useState<string[]>([]);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      experienceLevel: "",
      preferredLanguage: "en",
      serviceInterests: [],
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting us! We'll get back to you within 24 hours.",
      });
      form.reset();
      setServiceInterests([]);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send Message",
        description: error.message || "Please try again later or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    const submitData = {
      ...data,
      serviceInterests,
    };
    contactMutation.mutate(submitData);
  };

  const handleServiceInterestChange = (service: string, checked: boolean) => {
    if (checked) {
      setServiceInterests(prev => [...prev, service]);
    } else {
      setServiceInterests(prev => prev.filter(s => s !== service));
    }
  };

  const serviceOptions = [
    { id: "jobSearch", label: t("contact.form.services.jobSearch") },
    { id: "careerCounseling", label: t("contact.form.services.careerCounseling") },
    { id: "resumeBuilding", label: t("contact.form.services.resumeBuilding") },
    { id: "interviewPrep", label: t("contact.form.services.interviewPrep") },
  ];

  return (
    <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6" data-testid="contact-form-title">
        {t("contact.sendMessage")}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    {t("contact.form.firstName")} *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-300 rounded-xl"
                      data-testid="contact-first-name"
                    />
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
                  <FormLabel className="text-sm font-medium text-gray-700">
                    {t("contact.form.lastName")} *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-12 border-2 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-300 rounded-xl"
                      data-testid="contact-last-name"
                    />
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
                <FormLabel className="text-sm font-medium text-gray-700">
                  {t("contact.form.email")} *
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    {...field} 
                    className="h-12 border-2 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-300 rounded-xl"
                    data-testid="contact-email"
                  />
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
                <FormLabel className="text-sm font-medium text-gray-700">
                  {t("contact.form.phone")}
                </FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    className="h-12 border-2 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-300 rounded-xl"
                    data-testid="contact-phone"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  {t("contact.form.experienceLevel")}
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-300 rounded-xl" data-testid="contact-experience">
                      <SelectValue placeholder="Select Experience Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Select Experience Level</SelectItem>
                      <SelectItem value="entry">{t("contact.form.experienceLevels.entry")}</SelectItem>
                      <SelectItem value="mid">{t("contact.form.experienceLevels.mid")}</SelectItem>
                      <SelectItem value="senior">{t("contact.form.experienceLevels.senior")}</SelectItem>
                      <SelectItem value="executive">{t("contact.form.experienceLevels.executive")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="preferredLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  {t("contact.form.preferredLanguage")}
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-300 rounded-xl" data-testid="contact-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                      <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
              {t("contact.form.serviceInterest")}
            </FormLabel>
            <div className="space-y-3" data-testid="contact-services">
              {serviceOptions.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={serviceInterests.includes(service.id)}
                    onCheckedChange={(checked) => 
                      handleServiceInterestChange(service.id, checked as boolean)
                    }
                    data-testid={`service-${service.id}`}
                  />
                  <label 
                    htmlFor={service.id} 
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {service.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  {t("contact.form.message")}
                </FormLabel>
                <FormControl>
                  <Textarea 
                    rows={4}
                    placeholder={t("contact.form.messagePlaceholder")}
                    {...field} 
                    className="border-2 border-gray-200 focus:border-[#0066CC] focus:ring-[#0066CC]/20 transition-all duration-300 rounded-xl"
                    data-testid="contact-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={contactMutation.isPending}
            className="w-full h-12 bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#003D7A] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
            data-testid="contact-submit"
          >
            <Send className="h-5 w-5" />
            <span>
              {contactMutation.isPending ? "Sending..." : t("contact.sendButton")}
            </span>
          </Button>
        </form>
      </Form>
    </Card>
  );
}
