import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TeamSelection } from "@/components/match/TeamSelection";
import { ScoreInput } from "@/components/match/ScoreInput";
import { AdvancedMatchDetails } from "@/components/match/AdvancedMatchDetails";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { QRCodeSVG } from "qrcode.react";

interface Player {
  id: string;
  name: string;
  avatar_url?: string;
}

const matchSchema = z.object({
  date: z.string(),
  venue: z.string(),
  matchType: z.enum(["doubles", "singles"]),
  tournament: z.string().optional(),
  time: z.string().optional(),
  notes: z.string().optional(),
});

type MatchFormData = z.infer<typeof matchSchema>;

export const MatchForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedTeams, setSelectedTeams] = useState<{
    team1: Player[];
    team2: Player[];
  }>({ team1: [], team2: [] });

  const [scores, setScores] = useState<{
    team1: number[];
    team2: number[];
  }>({ team1: [], team2: [] });

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

  const handleTeamsConfirmed = (teams: { team1: Player[]; team2: Player[] }) => {
    setSelectedTeams(teams);
  };

  const handleScoreSubmit = (newScores: { team1: number[]; team2: number[] }) => {
    setScores(newScores);
  };

  const onSubmit = async (data: MatchFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error(t('auth.required'));
        return;
      }

      if (selectedTeams.team1.length === 0 || selectedTeams.team2.length === 0) {
        toast.error(t('match.teamsRequired'));
        return;
      }

      if (scores.team1.length === 0 || scores.team2.length === 0) {
        toast.error(t('match.scoresRequired'));
        return;
      }

      const matchData = {
        player1_id: selectedTeams.team1[0].id,
        player2_id: selectedTeams.team2[0].id,
        player1_score: scores.team1.join(','),
        player2_score: scores.team2.join(','),
        played_at: new Date(data.date).toISOString(),
        status: 'pending',
      };

      const { error } = await supabase
        .from('matches')
        .insert([matchData]);

      if (error) {
        console.error('Error recording match:', error);
        toast.error(t('match.recordError'));
        return;
      }

      toast.success(t('match.recordSuccess'), {
        description: t('match.recordSuccessDesc'),
      });
      navigate("/dashboard");
    } catch (error) {
      console.error('Error submitting match:', error);
      toast.error(t('match.recordError'));
    }
  };

  const matchUrl = window.location.href;

  return (
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
              onTeamsConfirmed={handleTeamsConfirmed}
              initialPlayers={[]}
            />
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">{t('match.score')}</h3>
            <ScoreInput onScoreSubmit={handleScoreSubmit} />
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
  );
};