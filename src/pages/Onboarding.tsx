import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save profile data
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md neu-card">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="neu-button"
              onClick={() => navigate("/register")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImage || ""} />
                <AvatarFallback className="bg-muted">
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
                  Upload Photo
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                required
                min="13"
                max="120"
                className="neu-button"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, Country"
                className="neu-button"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferred-times">Preferred Playing Times</Label>
              <Input
                id="preferred-times"
                placeholder="e.g., Weekday evenings, Weekend mornings"
                className="neu-button"
              />
            </div>

            <Button
              type="submit"
              className="w-full neu-button bg-primary text-white hover:bg-primary/90"
            >
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;