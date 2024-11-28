import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const PrivacySection = () => {
  const [isPublicProfile, setIsPublicProfile] = useState(true);
  const [showWhatsApp, setShowWhatsApp] = useState(true);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Privacy Settings</h3>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Public Profile</Label>
          <p className="text-sm text-muted-foreground">
            Allow others to see your profile
          </p>
        </div>
        <Switch
          checked={isPublicProfile}
          onCheckedChange={setIsPublicProfile}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Show WhatsApp</Label>
          <p className="text-sm text-muted-foreground">
            Display your WhatsApp number to connections
          </p>
        </div>
        <Switch
          checked={showWhatsApp}
          onCheckedChange={setShowWhatsApp}
        />
      </div>
    </div>
  );
};