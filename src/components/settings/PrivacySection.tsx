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
      <h3 className="text-lg font-semibold">{t('settings.privacy')}</h3>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>{t('settings.publicProfile')}</Label>
          <p className="text-sm text-muted-foreground">
            {t('settings.publicProfileDesc')}
          </p>
        </div>
        <Switch
          checked={isPublicProfile}
          onCheckedChange={setIsPublicProfile}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>{t('settings.showWhatsApp')}</Label>
          <p className="text-sm text-muted-foreground">
            {t('settings.showWhatsAppDesc')}
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