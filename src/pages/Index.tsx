import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md p-8 neu-card space-y-6">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <img 
            src="/lovable-uploads/ce205f00-8e5a-4ed2-9756-417964ef47e6.png" 
            alt="PaddleRank Logo" 
            className="w-12 h-12"
          />
          <h1 className="text-3xl font-bold text-accent">PaddleRank</h1>
        </div>

        <div className="space-y-4">
          <div className="mb-6">
            <Select onValueChange={handleLanguageChange} defaultValue={i18n.language}>
              <SelectTrigger>
                <SelectValue placeholder={t('settings.selectLanguage')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full neu-button bg-primary text-white hover:bg-primary/90"
            onClick={() => navigate("/login")}
          >
            {t('common.login')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline"
            className="w-full neu-button"
            onClick={() => navigate("/register")}
          >
            {t('common.register')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-center text-muted-foreground mt-6">
          {t('common.joinCommunity')}
        </p>
      </Card>
    </div>
  );
};

export default Index;