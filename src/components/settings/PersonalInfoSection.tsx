import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const PersonalInfoSection = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" defaultValue="John Doe" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" defaultValue="john@example.com" disabled />
        <p className="text-sm text-muted-foreground">
          Email cannot be changed
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp Number</Label>
        <Input id="whatsapp" placeholder="+1234567890" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell others about yourself..."
          className="h-32"
        />
      </div>
    </div>
  );
};