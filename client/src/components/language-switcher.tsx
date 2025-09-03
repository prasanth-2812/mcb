import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/use-translation";
import { Language } from "@/data/translations";
import { Globe } from "lucide-react";

const languages = [
  { code: "en" as Language, name: "English", nativeName: "English" },
  { code: "hi" as Language, name: "Hindi", nativeName: "हिंदी" },
  { code: "ta" as Language, name: "Tamil", nativeName: "தமிழ்" },
  { code: "te" as Language, name: "Telugu", nativeName: "తెలుగు" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
      <SelectTrigger 
        className="w-32 border-border bg-background text-foreground focus:ring-ring"
        data-testid="language-switcher"
      >
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem 
            key={lang.code} 
            value={lang.code}
            data-testid={`language-option-${lang.code}`}
          >
            <span className="font-medium">{lang.nativeName}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
