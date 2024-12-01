import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md neu-card">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="neu-button"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl font-bold">{t('common.register')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('settings.fullName')}</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                className="neu-button"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('common.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="neu-button"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('common.password')}</Label>
              <Input
                id="password"
                type="password"
                required
                className="neu-button"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="initial-ranking">{t('common.rating')}</Label>
              <Select>
                <SelectTrigger className="neu-button">
                  <SelectValue placeholder={t('players.ratingRange')} />
                </SelectTrigger>
                <SelectContent>
                  {[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating.toFixed(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                {t('common.joinCommunity')}
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full neu-button bg-primary text-white hover:bg-primary/90"
            >
              {t('common.register')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Button
              variant="link"
              className="text-primary p-0"
              onClick={() => navigate("/login")}
            >
              {t('common.login')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;