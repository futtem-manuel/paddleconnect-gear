import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { PlayerConnections } from "./PlayerConnections";

interface DashboardStatsProps {
  userProfile: {
    matches: number;
    winRate: string;
  };
  playerConnections: Array<{ id: string; name: string; avatar?: string; }>;
}

export const DashboardStats = ({ userProfile, playerConnections }: DashboardStatsProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 neu-card flex items-center gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{t('profile.matchesPlayed')}</p>
          <p className="text-xl font-semibold">{userProfile.matches}</p>
        </div>
      </div>
      <div className="p-4 neu-card flex items-center gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{t('profile.winRate')}</p>
          <p className="text-xl font-semibold">{userProfile.winRate}</p>
        </div>
      </div>
      <div className="p-4 neu-card bg-primary/5 border-2 border-primary sm:col-span-2">
        <h3 className="font-medium mb-2 text-primary">{t('profile.connectedPlayers')}</h3>
        <PlayerConnections connections={playerConnections} />
      </div>
    </div>
  );
};