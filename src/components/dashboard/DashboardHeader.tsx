import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Plus, Users, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlayerConnections } from "./PlayerConnections";
import { ProfileHeader } from "./ProfileHeader";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const DashboardHeader = ({ 
  userProfile, 
  displayRating, 
  playerConnections 
}: { 
  userProfile: any;
  displayRating: number;
  playerConnections: any[];
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRecordMatch = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error(t('auth.required'));
      navigate('/login');
      return;
    }
    navigate("/record-match");
  };

  const handleFindPlayers = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error(t('auth.required'));
      navigate('/login');
      return;
    }
    navigate("/find-players");
  };

  return (
    <div className="space-y-6">
      <ProfileHeader userProfile={userProfile} displayRating={displayRating} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 neu-card flex items-center gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{t('dashboard.matchesPlayed')}</p>
            <p className="text-xl font-semibold">{userProfile.matches}</p>
          </div>
        </div>
        <div className="p-4 neu-card flex items-center gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{t('dashboard.winRate')}</p>
            <p className="text-xl font-semibold">{userProfile.winRate}</p>
          </div>
        </div>
        <div className="p-4 neu-card bg-primary/5 border-2 border-primary sm:col-span-2">
          <h3 className="font-medium mb-2 text-primary">{t('dashboard.connectedPlayers')}</h3>
          <PlayerConnections connections={playerConnections} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button 
          className="h-auto py-4"
          variant="default"
          onClick={handleRecordMatch}
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('dashboard.recordNewMatch')}
        </Button>
        <Button 
          className="neu-button h-auto py-4"
          variant="outline"
          onClick={handleFindPlayers}
        >
          <Users className="h-5 w-5 mr-2" />
          {t('dashboard.findPlayers')}
        </Button>
      </div>
    </div>
  );
};