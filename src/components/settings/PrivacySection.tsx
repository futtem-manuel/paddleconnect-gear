import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslation } from 'react-i18next';

export const PrivacySection = () => {
  const [isPublicProfile, setIsPublicProfile] = useState(true);
  const [showWhatsApp, setShowWhatsApp] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('profile.privacy')}</h3>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>{t('profile.publicProfile')}</Label>
          <p className="text-sm text-muted-foreground">
            {t('profile.publicProfileDesc')}
          </p>
        </div>
        <Switch
          checked={isPublicProfile}
          onCheckedChange={setIsPublicProfile}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>{t('profile.showWhatsApp')}</Label>
          <p className="text-sm text-muted-foreground">
            {t('profile.showWhatsAppDesc')}
          </p>
        </div>
        <Switch
          checked={showWhatsApp}
          onCheckedChange={setShowWhatsApp}
        />
      </div>
    </div>
  );
};