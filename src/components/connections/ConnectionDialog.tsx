import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ConnectionHistory } from "./ConnectionHistory";
import { PlayerConnection } from "./PlayerConnectionCard";

interface ConnectionDialogProps {
  connection: PlayerConnection | null;
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppAccessChange: (value: boolean) => void;
}

export const ConnectionDialog = ({
  connection,
  isOpen,
  onClose,
  onWhatsAppAccessChange,
}: ConnectionDialogProps) => {
  if (!connection) return null;

  // Mock match history data - in a real app, this would come from your backend
  const matchHistory = [
    {
      id: "1",
      date: "2024-02-20T10:00:00Z",
      result: "won" as const,
      score: "6-4, 6-2",
    },
    {
      id: "2",
      date: "2024-02-15T14:30:00Z",
      result: "lost" as const,
      score: "4-6, 3-6",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Connection Details</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="history">Match History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6">
            <div className="flex items-center space-x-4 py-4">
              <div className="space-y-0.5 flex-1">
                <Label>WhatsApp Access</Label>
                <p className="text-sm text-muted-foreground">
                  Allow this connection to see your WhatsApp number
                </p>
              </div>
              <Switch
                checked={connection.whatsapp !== null}
                onCheckedChange={onWhatsAppAccessChange}
              />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Stats</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{connection.rating}</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{connection.matchesPlayed}</p>
                  <p className="text-sm text-muted-foreground">Matches</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{connection.winRate}</p>
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <ConnectionHistory matches={matchHistory} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};