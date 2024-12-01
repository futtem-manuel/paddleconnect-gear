import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ProfilePictureSection } from "@/components/settings/ProfilePictureSection";
import { PersonalInfoSection } from "@/components/settings/PersonalInfoSection";
import { PrivacySection } from "@/components/settings/PrivacySection";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSave = () => {
    toast({
      title: t('common.success'),
      description: t('settings.profileUpdated'),
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: t('settings.accountDeleted'),
      description: t('settings.accountDeletedDesc'),
      variant: "destructive",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            className="neu-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          <img
            src="/lovable-uploads/ce205f00-8e5a-4ed2-9756-417964ef47e6.png"
            alt="Logo"
            className="h-12"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('settings.profileSettings')}</CardTitle>
            <CardDescription>
              {t('settings.profileSettingsDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProfilePictureSection />
            <PersonalInfoSection />
            <PrivacySection />

            <Button onClick={handleSave} className="w-full">
              {t('common.save')}
            </Button>

            <div className="pt-6 border-t space-y-4">
              <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                <Link to="/legal?tab=terms" className="hover:underline">
                  {t('common.termsOfService')}
                </Link>
                <span>•</span>
                <Link to="/legal?tab=privacy" className="hover:underline">
                  {t('common.privacyPolicy')}
                </Link>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t('common.delete')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('settings.deleteAccount')}</DialogTitle>
                    <DialogDescription>
                      {t('settings.deleteAccountConfirm')}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => {}}>
                      {t('common.cancel')}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                    >
                      {t('common.delete')}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;