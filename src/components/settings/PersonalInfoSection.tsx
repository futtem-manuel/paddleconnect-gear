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
        <h3 className="text-lg font-semibold">{t('profile.info')}</h3>
        
        <div className="space-y-2">
          <Label htmlFor="name">{t('profile.name')}</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t('profile.email')}</Label>
          <Input id="email" defaultValue="john@example.com" disabled />
          <p className="text-sm text-muted-foreground">
            {t('profile.emailLocked')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp">{t('profile.whatsapp')}</Label>
          <Input id="whatsapp" placeholder="+1234567890" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">{t('profile.bio')}</Label>
          <Textarea
            id="bio"
            placeholder={t('profile.bioPlaceholder')}
            className="h-32"
          />
        </div>
      </div>

      <LanguageSection />
    </div>
  );
};