import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trophy, MapPin, MessageCircle } from "lucide-react";

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
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={connection.avatar} />
            <AvatarFallback>{connection.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{connection.name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              <span>{connection.location}</span>
            </div>
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

        {connection.whatsapp && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleWhatsAppClick(connection.whatsapp!)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        )}
      </CardContent>
    </Card>
  );
};