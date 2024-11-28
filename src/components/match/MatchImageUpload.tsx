import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { toast } from "sonner";

interface MatchImageUploadProps {
  onImageUpload: (files: File[]) => void;
}

export const MatchImageUpload = ({ onImageUpload }: MatchImageUploadProps) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onImageUpload(Array.from(event.target.files));
      toast.success("Images uploaded successfully");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium">Share Your Match Moments!</h4>
        <p className="text-sm text-muted-foreground">
          Help create lasting memories by uploading photos from the match. 
          These images will be shared with all participants and can be used 
          for social media sharing.
        </p>
        <div className="flex items-center gap-4">
          <Button
            variant="default"
            className="w-full"
            onClick={() => document.getElementById("match-images")?.click()}
          >
            <Camera className="h-4 w-4 mr-2" />
            Upload Match Photos
          </Button>
          <Input
            id="match-images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};