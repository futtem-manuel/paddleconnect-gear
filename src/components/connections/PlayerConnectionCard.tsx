import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, MapPin, MessageCircle } from "lucide-react";

interface PlayerConnection {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  matchesPlayed: number;
  winRate: string;
  whatsapp: string | null;
  location: string;
}

interface PlayerConnectionCardProps {
  connection: PlayerConnection;
}

export const PlayerConnectionCard = ({ connection }: PlayerConnectionCardProps) => {
  const handleWhatsAppClick = (whatsapp: string) => {
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex flex-col md:flex-row items-center gap-4 flex-1">
          <Avatar className="h-32 w-32 md:h-40 md:w-40">
            <AvatarImage src={connection.avatar} />
            <AvatarFallback className="text-2xl">{connection.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-lg">{connection.name}</h3>
              <div className="flex items-center justify-center md:justify-start gap-1 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                <span>{connection.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="font-semibold">{connection.rating}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Matches</p>
                <p className="font-semibold">{connection.matchesPlayed}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="font-semibold">{connection.winRate}</p>
              </div>
            </div>
          </div>
        </div>

        {connection.whatsapp && (
          <Button 
            variant="secondary"
            className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-sm"
            onClick={() => handleWhatsAppClick(connection.whatsapp!)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat on WhatsApp
          </Button>
        )}
      </CardContent>
    </Card>
  );
};