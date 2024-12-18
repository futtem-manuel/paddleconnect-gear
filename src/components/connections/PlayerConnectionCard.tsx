import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { MessageDialog } from "../messaging/MessageDialog";

export interface PlayerConnection {
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
  onClick: () => void;
}

export const PlayerConnectionCard = ({ connection, onClick }: PlayerConnectionCardProps) => {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const handleWhatsAppClick = (e: React.MouseEvent, whatsapp: string) => {
    e.stopPropagation();
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMessageDialogOpen(true);
  };

  return (
    <>
      <Card className="relative">
        <div className="absolute top-2 right-2 flex flex-col sm:flex-row gap-2 z-10">
          <Button 
            variant="default"
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm"
            onClick={handleMessageClick}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
          
          {connection.whatsapp && (
            <Button 
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-50 text-gray-900 font-semibold shadow-sm"
              onClick={(e) => handleWhatsAppClick(e, connection.whatsapp!)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          )}
        </div>
        
        <CardContent 
          className="p-4 flex flex-col h-full relative cursor-pointer group"
          onClick={onClick}
        >
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <p className="text-white font-medium">View Details</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 flex-1 mt-12 sm:mt-8">
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
        </CardContent>
      </Card>

      <MessageDialog
        isOpen={isMessageDialogOpen}
        onClose={() => setIsMessageDialogOpen(false)}
        recipientName={connection.name}
        recipientAvatar={connection.avatar}
      />
    </>
  );
};