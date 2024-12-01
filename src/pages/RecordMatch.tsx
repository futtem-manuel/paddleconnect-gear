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
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
    toast.success(t('match.recordSuccess'), {
      description: t('match.recordSuccessDesc'),
    });
    navigate("/dashboard");
  };

  const matchUrl = window.location.href;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{t('match.recordNew')}</CardTitle>
            <p className="text-muted-foreground">
              {t('match.enterDetails')}
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('match.date')}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="bg-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('match.venue')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('match.enterVenue')}
                            {...field} 
                            className="bg-white"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">{t('match.teams')}</h3>
                    <TeamSelection 
                      onTeamsConfirmed={() => {}}
                      initialPlayers={[]}
                    />
                  </div>

                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">{t('match.score')}</h3>
                    <ScoreInput onScoreSubmit={() => {}} />
                  </div>

                  <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <AdvancedMatchDetails 
                      onDetailsChange={(details) => {
                        if (details.tournament) form.setValue('tournament', details.tournament);
                        if (details.time) form.setValue('time', details.time);
                        if (details.notes) form.setValue('notes', details.notes);
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t">
                  <div className="flex-shrink-0">
                    <QRCodeSVG value={matchUrl} size={120} />
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      {t('match.scanToVerify')}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      {t('common.cancel')}
                    </Button>
                    <Button type="submit">{t('match.recordMatch')}</Button>
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
