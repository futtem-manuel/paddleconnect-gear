import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from 'react-i18next';
import { LanguageSection } from "./LanguageSection";

export const PersonalInfoSection = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('settings.personalInfo')}</h3>
        
        <div className="space-y-2">
          <Label htmlFor="name">{t('settings.fullName')}</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t('settings.email')}</Label>
          <Input id="email" defaultValue="john@example.com" disabled />
          <p className="text-sm text-muted-foreground">
            Email cannot be changed
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp">{t('settings.whatsapp')}</Label>
          <Input id="whatsapp" placeholder="+1234567890" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">{t('settings.bio')}</Label>
          <Textarea
            id="bio"
            placeholder="Tell others about yourself..."
            className="h-32"
          />
        </div>
      </div>

      <LanguageSection />
    </div>
  );
};