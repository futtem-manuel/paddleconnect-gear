import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPublicProfile, setIsPublicProfile] = useState(true);
  const [showWhatsApp, setShowWhatsApp] = useState(true);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your profile settings have been updated successfully.",
    });
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion logic
    toast({
      title: "Account deleted",
      description: "Your account has been permanently deleted.",
      variant: "destructive",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button
          variant="ghost"
          className="mb-6 hover:bg-accent"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Manage your profile information and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
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

            {/* Privacy Settings */}
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

            {/* Legal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal Information</h3>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View Privacy Policy</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Privacy Policy</DialogTitle>
                    <DialogDescription>
                      Last updated: March 2024
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>
                      Your privacy is important to us. This Privacy Policy explains how we collect,
                      use, disclose, and safeguard your information when you use our service.
                    </p>
                    {/* Add more privacy policy content here */}
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View Data Handling</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Data Handling</DialogTitle>
                    <DialogDescription>
                      How we process and protect your data
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>
                      We take the security and handling of your data seriously. This document outlines
                      our practices for processing, storing, and protecting your personal information.
                    </p>
                    {/* Add more data handling content here */}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>

            {/* Delete Account */}
            <div className="pt-6 border-t">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete your account? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;