import { useTranslation } from 'react-i18next';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export const LanguageSection = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem('preferredLanguage', value);
    toast({
      title: t('common.success'),
      description: t('settings.languageChanged'),
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('settings.language')}</h3>
      
      <div className="space-y-2">
        <Label htmlFor="language">{t('settings.selectLanguage')}</Label>
        <Select onValueChange={handleLanguageChange} defaultValue={i18n.language}>
          <SelectTrigger id="language" className="bg-white">
            <SelectValue placeholder={t('settings.selectLanguage')} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="pt">Português</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};