import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Legal = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <img
            src="/lovable-uploads/ce205f00-8e5a-4ed2-9756-417964ef47e6.png"
            alt="Logo"
            className="h-12"
          />
        </div>

        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="terms">
            <ScrollArea className="h-[600px] w-full rounded-md border p-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Terms of Service</h2>
                <p className="text-sm text-muted-foreground">Last updated: {currentYear}</p>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">1. Agreement to Terms</h3>
                  <p>By accessing or using the PaddleRank platform ("Service") provided by Futtem LLC ("Company", "we", "us", or "our"), you agree to be bound by these Terms of Service.</p>

                  <h3 className="text-lg font-semibold">2. Use License</h3>
                  <p>Futtem LLC grants you a limited, non-exclusive, non-transferable, revocable license to use the Service for personal, non-commercial purposes.</p>

                  <h3 className="text-lg font-semibold">3. Intellectual Property</h3>
                  <p>The Service and its original content, features, and functionality are owned by Futtem LLC and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>

                  <h3 className="text-lg font-semibold">4. Termination</h3>
                  <p>We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever.</p>

                  <h3 className="text-lg font-semibold">5. Limitation of Liability</h3>
                  <p>In no event shall Futtem LLC be liable for any indirect, incidental, special, consequential or punitive damages arising out of or relating to your use of the Service.</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="privacy">
            <ScrollArea className="h-[600px] w-full rounded-md border p-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Privacy Policy</h2>
                <p className="text-sm text-muted-foreground">Last updated: {currentYear}</p>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">1. Information Collection</h3>
                  <p>Futtem LLC collects information that you provide directly to us when using PaddleRank, including personal information such as name, email address, and profile information.</p>

                  <h3 className="text-lg font-semibold">2. Use of Information</h3>
                  <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and protect our legal rights.</p>

                  <h3 className="text-lg font-semibold">3. Information Sharing</h3>
                  <p>Futtem LLC does not sell your personal information. We may share your information with third parties only as described in this policy.</p>

                  <h3 className="text-lg font-semibold">4. Data Security</h3>
                  <p>We implement appropriate technical and organizational measures to protect the security of your personal information.</p>

                  <h3 className="text-lg font-semibold">5. Your Rights</h3>
                  <p>You have the right to access, correct, or delete your personal information. Contact us at privacy@futtem.com to exercise these rights.</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Legal;