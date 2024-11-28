import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const matchSchema = z.object({
  opponent: z.string().min(1, "Opponent name is required"),
  yourScore: z.string().min(1, "Your score is required"),
  opponentScore: z.string().min(1, "Opponent score is required"),
  notes: z.string().optional(),
});

type MatchFormData = z.infer<typeof matchSchema>;

const RecordMatch = () => {
  const navigate = useNavigate();
  const form = useForm<MatchFormData>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      opponent: "",
      yourScore: "",
      opponentScore: "",
      notes: "",
    },
  });

  const matchId = crypto.randomUUID();
  const verificationUrl = `${window.location.origin}/verify-match/${matchId}`;

  const onSubmit = (data: MatchFormData) => {
    // This would normally send data to an API
    console.log("Match recorded:", { ...data, matchId });
    toast.success("Match recorded! Waiting for opponent verification.");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="neu-card">
          <CardHeader>
            <CardTitle>Record New Match</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="opponent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opponent</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter opponent's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="yourScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Score</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="opponentScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opponent Score</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Add any notes about the match" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-6 p-4 border rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-4">
                    Share this QR code with your opponent to verify the match:
                  </p>
                  <div className="flex justify-center bg-white p-4 rounded-lg">
                    <QRCodeSVG value={verificationUrl} size={200} />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Record Match</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecordMatch;