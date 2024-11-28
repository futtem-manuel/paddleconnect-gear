import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TeamSelection } from "@/components/match/TeamSelection";
import { ScoreInput } from "@/components/match/ScoreInput";
import { AdvancedMatchDetails } from "@/components/match/AdvancedMatchDetails";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { QRCodeSVG } from "qrcode.react";

const matchSchema = z.object({
  date: z.string(),
  venue: z.string(),
  matchType: z.enum(["doubles", "singles"]),
  tournament: z.string().optional(),
  time: z.string().optional(),
  notes: z.string().optional(),
});

type MatchFormData = z.infer<typeof matchSchema>;

const RecordMatch = () => {
  const navigate = useNavigate();
  const form = useForm<MatchFormData>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      venue: "",
      matchType: "doubles",
      tournament: "",
      time: "",
      notes: "",
    },
  });

  const onSubmit = (data: MatchFormData) => {
    console.log("Match recorded:", data);
    toast.success("Match recorded successfully!", {
      description: "The match has been saved to your history.",
    });
    navigate("/dashboard");
  };

  const matchUrl = window.location.href;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Record New Match</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter venue name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Teams</h3>
                  <TeamSelection 
                    onTeamsConfirmed={() => {}}
                    initialPlayers={[]}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Score</h3>
                  <ScoreInput onScoreSubmit={() => {}} />
                </div>

                <AdvancedMatchDetails 
                  onDetailsChange={(details) => {
                    if (details.tournament) form.setValue('tournament', details.tournament);
                    if (details.time) form.setValue('time', details.time);
                    if (details.notes) form.setValue('notes', details.notes);
                  }}
                />

                <div className="flex justify-between items-center gap-4">
                  <div className="flex-shrink-0">
                    <QRCodeSVG value={matchUrl} size={120} />
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