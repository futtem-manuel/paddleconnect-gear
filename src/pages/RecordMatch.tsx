import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TeamSelection } from "@/components/match/TeamSelection";
import { ScoreInput } from "@/components/match/ScoreInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const matchSchema = z.object({
  date: z.string(),
  courtNumber: z.string(),
  duration: z.string(),
  matchType: z.enum(["doubles", "singles"]),
  tournament: z.string().optional(),
  notes: z.string().optional(),
});

type MatchFormData = z.infer<typeof matchSchema>;

// Mock data - replace with actual API call
const mockConnectedPlayers = [
  { id: "1", name: "John Doe", avatar: "" },
  { id: "2", name: "Jane Smith", avatar: "" },
  { id: "3", name: "Mike Johnson", avatar: "" },
  { id: "4", name: "Sarah Wilson", avatar: "" },
];

const RecordMatch = () => {
  const navigate = useNavigate();
  const form = useForm<MatchFormData>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      courtNumber: "",
      duration: "",
      matchType: "doubles",
      tournament: "",
      notes: "",
    },
  });

  const onSubmit = (data: MatchFormData) => {
    // This would normally send data to an API
    console.log("Match recorded:", data);
    toast.success("Match recorded successfully!", {
      description: "The match has been saved to your history.",
    });
    navigate("/dashboard");
  };

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
                    name="courtNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Court Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter court number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input type="time" step="60" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tournament"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tournament/League (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tournament name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Teams</h3>
                  <TeamSelection 
                    connectedPlayers={mockConnectedPlayers}
                    onTeamsConfirmed={() => {}}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Score</h3>
                  <ScoreInput onScoreSubmit={() => {}} />
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
                    </FormItem>
                  )}
                />

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