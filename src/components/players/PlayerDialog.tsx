import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { eloToDisplayRating } from "@/utils/rankingUtils";
import { toast } from "sonner";

interface PlayerDialogProps {
  player: any;
  isOpen: boolean;
  onClose: () => void;
}

export const PlayerDialog = ({ player, isOpen, onClose }: PlayerDialogProps) => {
  const handleConnect = () => {
    toast.success("Connection request sent!", {
      description: `A request has been sent to ${player.name}.`,
    });
  };

  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Player Profile</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
              alt={player.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{player.name}</h3>
              <p className="text-sm text-muted-foreground">{player.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Rating</p>
              <p className="text-2xl font-bold">{eloToDisplayRating(player.eloRating).toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Matches Played</p>
              <p>{player.matchesPlayed}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Bio</p>
              <p className="text-sm text-muted-foreground">{player.bio}</p>
            </div>
            <Button onClick={handleConnect} className="w-full">
              Connect
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};