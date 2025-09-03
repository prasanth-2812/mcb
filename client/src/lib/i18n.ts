import { translations, Language } from "@/data/translations";

export interface I18nConfig {
  language: Language;
  fallbackLanguage: Language;
}

export class I18n {
  private config: I18nConfig;

  constructor(config: I18nConfig = { language: "en", fallbackLanguage: "en" }) {
    this.config = config;
  }

  setLanguage(language: Language) {
    this.config.language = language;
  }

  getLanguage(): Language {
    return this.config.language;
  }

  translate(key: string, params?: Record<string, string | number>): string {
    const keys = key.split(".");
    let value: any = translations[this.config.language];
    
    // Navigate through the translation object
    for (const k of keys) {
      value = value?.[k];
    }
    
    // If translation not found, try fallback language
    if (typeof value !== "string") {
      let fallback: any = translations[this.config.fallbackLanguage];
      for (const k of keys) {
        fallback = fallback?.[k];
      }
      value = typeof fallback === "string" ? fallback : key;
    }
    
    // Replace parameters in the translation
    if (params && typeof value === "string") {
      Object.entries(params).forEach(([param, val]) => {
        value = value.replace(new RegExp(`{{${param}}}`, "g"), String(val));
      });
    }
    
    return value;
  }

  // Alias for translate method
  t = this.translate.bind(this);

  // Get available languages
  getAvailableLanguages(): Language[] {
    return Object.keys(translations) as Language[];
  }

  // Format numbers based on language
  formatNumber(num: number): string {
    const locale = this.getLocale();
    return new Intl.NumberFormat(locale).format(num);
  }

  // Format currency based on language
  formatCurrency(amount: number, currency: string = "INR"): string {
    const locale = this.getLocale();
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount);
  }

  // Format dates based on language
  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    const locale = this.getLocale();
    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  // Get locale string for Intl APIs
  private getLocale(): string {
    const localeMap: Record<Language, string> = {
      en: "en-IN",
      hi: "hi-IN", 
      ta: "ta-IN",
      te: "te-IN",
    };
    return localeMap[this.config.language] || "en-IN";
  }

  // Check if language is RTL
  isRTL(): boolean {
    const rtlLanguages: Language[] = [];
    return rtlLanguages.includes(this.config.language);
  }

  // Get language direction
  getDirection(): "ltr" | "rtl" {
    return this.isRTL() ? "rtl" : "ltr";
  }
}

// Create default instance
export const i18n = new I18n();

// Helper functions for common use cases
export const t = i18n.t;
export const formatNumber = i18n.formatNumber.bind(i18n);
export const formatCurrency = i18n.formatCurrency.bind(i18n);
export const formatDate = i18n.formatDate.bind(i18n);
