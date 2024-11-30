import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavigateFunction } from "react-router-dom";

interface DashboardActionsProps {
  navigate: NavigateFunction;
}

export const DashboardActions = ({ navigate }: DashboardActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Button 
        className="h-auto py-4"
        variant="default"
        onClick={() => navigate("/record-match")}
      >
        <Plus className="h-5 w-5 mr-2" />
        {t('profile.recordMatch')}
      </Button>
      <Button 
        className="neu-button h-auto py-4"
        variant="outline"
        onClick={() => navigate("/find-players")}
      >
        <Users className="h-5 w-5 mr-2" />
        {t('profile.findPlayers')}
      </Button>
    </div>
  );
};