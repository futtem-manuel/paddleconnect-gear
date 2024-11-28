import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const ProfilePictureSection = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been successfully updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-32 w-32">
        <AvatarImage src={profileImage || ""} />
        <AvatarFallback className="bg-muted text-lg">
          {profileImage ? "IMG" : "ADD"}
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          id="profile-image"
          onChange={handleImageUpload}
        />
        <Label
          htmlFor="profile-image"
          className="neu-button flex items-center gap-2 px-4 py-2 cursor-pointer"
        >
          <Upload className="h-4 w-4" />
          Change Profile Picture
        </Label>
      </div>
    </div>
  );
};