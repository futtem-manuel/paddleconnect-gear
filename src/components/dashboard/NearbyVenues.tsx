import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Venue {
  id: string | number;
  name: string;
  distance: string;
  rating: number;
  googleUrl: string;
}

interface NearbyVenuesProps {
  venues: Venue[];
}

export const NearbyVenues = ({ venues }: NearbyVenuesProps) => {
  const { t } = useTranslation();

  return (
    <Card className="neu-card">
      <CardHeader>
        <CardTitle>{t('profile.nearbyVenues')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 neu-card gap-2"
            >
              <div>
                <h3 className="font-semibold">{venue.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {venue.distance} {t('profile.away')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">⭐ {venue.rating}</span>
                <a
                  href={venue.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:text-primary/80"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t('profile.viewOnGoogle')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};