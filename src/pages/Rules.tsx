import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RuleSection from "@/components/rules/RuleSection";
import SearchLegend from "@/components/rules/SearchLegend";

const Rules = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="neu-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Official Padel Rules</CardTitle>
            <p className="text-muted-foreground text-center">International Federation Of Padel (FIP)</p>
            <div className="relative max-w-md mx-auto mt-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search rules..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchLegend />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[70vh] pr-4">
              <div className="space-y-6">
                <RuleSection title="RULE 1. POSITION OF THE PLAYERS" searchQuery={searchQuery}>
                  The game is played in pairs. The players stand in the areas located on either side of the net. The server puts the ball into play and the receiver returns the ball.
                  The receiver may stand in any part of their area of the court as can the partner of the receiver and the partner of the server.
                  Players change sides when the number of games played is an odd number. If an error is made and the players do not change sides they should rectify the error as soon as it is discovered to follow the correct order of play.
                  Maximum rest time between games is 90 seconds.
                </RuleSection>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 2. CHOICE OF SIDE AND OF SERVICE</h2>
                  <p>The choice of sides and the right to serve in the first game is decided by a draw. The pair who win the draw have the right to choose between:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Serving or receiving the service, in which case the other pair choose the side of the court</li>
                    <li>The side of the court, in which case the other pair can choose to serve or receive</li>
                    <li>Requesting that their opponents choose first</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 3. THE SERVE</h2>
                  <p>The serve must be carried out in the following way.</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>The player who serves (the server) must have both feet behind the service line between the central service line and the side wall. The ball is served over the net diagonally into the opposite service area, the ball must bounce inside or on the line which limits the service box. The first serve being from the right hand side after which the ball is served from alternate sides.</li>
                    <li>The server must bounce the ball behind the service line and in the area between the central line and the side wall.</li>
                    <li>A disabled player with only one arm may bounce the ball using the racket.</li>
                    <li>The server may not touch the service line with their feet, nor enter the boxed area delimited by the continuation of the central line given that the serve is diagonal.</li>
                    <li>At the moment of serving the player must hit the ball at or below waist level and at the time of hitting the ball must have at least one foot on the ground.</li>
                    <li>When serving the player (server) may not walk run or jump, small movements which do not affect the initial stance not being considered a change of position.</li>
                    <li>Should the player miss the ball when trying to hit it, the service will be considered as taken.</li>
                    <li>If the ball is served inadvertently from the wrong side the error should be corrected as son as it is discovered. All points obtained in this situation are considered valid however, if only one service fault has been made this should also count.</li>
                  </ol>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 4. SERVICE FAULT</h2>
                  <p>The following are considered service faults:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>The server infringes rule 3. (see THE SERVE above).</li>
                    <li>The server completely misses the ball when attempting to serve.</li>
                    <li>Once served, if the ball bounces outside the lines of the service area of the player receiving service. The lines are counted as in.</li>
                    <li>Once served, if the ball hits the servers partner.</li>
                    <li>Once served, if the ball passes over the net, bounces and touches the fence which marks the boundary of the opponents’ court before the second bounce (service only).</li>
                    <li>Once served, if the ball touches one of the walls in the service area of the server even when later the ball goes over the net and into the opponents area.</li>
                    <li>If the ball bounces incorrectly and it is not possible to hit or recuperate it.</li>
                    <li>If the server takes more than 25 seconds to serve following the previous point.</li>
                  </ol>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 5. SERVICE ORDER</h2>
                  <p>The players who have the right to serve in the first game of each set decide which of the two partners will serve first. At the end of the first game the pair receiving starts serving, this alternation continuing for all the games of a set. Once the service order has been decided it can not be changed until the beginning of the following set.</p>
                  <p>At the beginning of each set the players who have the serve decide which of the two will serve first and from then on the service is taken in turns.</p>
                  <p>If a player serves out of turn, the player whose turn it should have been must serve as soon as the error is discovered. All points counted before the error are valid but if there has been only one service fault before the error is discovered this will not be counted. In the case that a game finishes before the error is discovered, the service order continues as it is (in error) until the end of the set.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 6. SERVICE RETURN</h2>
                  <p>a) The player who returns the serve must wait until the ball bounces in their service area and hit it before the second bounce.</p>
                  <p>b) If the ball bounces twice inside the area even after hitting one of the [back] walls the service is considered good and the point goes to the side who served.</p>
                  <p>c) In installations with “edges” (in the case of the balling hitting the corner or edge which forms the union between the wall and the lateral wall with the fence) the serve will only be considered good if after bouncing the ball hits the mentioned edge/ corner and carries on in the direction of the receiver.</p>
                  <p>d) If the receiving player hits the ball before it bounces or is a fault in the service they lose the point.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 7. RETURN ORDER</h2>
                  <p>The players who receive the service in the first game of each set decide who will be the first to receive the serve. That player will continue to receive the first serve of each game until the end of the set.</p>
                  <p>The players alternate in receiving the serve, once the order has been decided it cannot be changed during the set but can be changed at the start of the following set.</p>
                  <p>If during a game the order of receipt of serve is altered by the players receiving the serve play continues in this way until the end of the game in which the error occurred. In the following games the receiving players must adopt the initial order of play, if the error is discovered when the wrong player returns the service the receiving players lose the point.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 8. NUMBER OF SERVES</h2>
                  <p>The server is allowed a second serve if the first is not valid. The second serve is made from the same side as the first and immediately after it.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 9. PREPARATION OF THE RECEIVER</h2>
                  <p>The server must not serve until the player who is receiving the serve is ready and if the receiver is not ready, or makes no effort to return the ball, the server cannot claim the point even if the service was good.</p>
                  <p>Likewise, the receiver cannot claim the point if the service is out. The receiving player may stop play if not ready. However the 25 second rule, RULE 4 (h), must be respected.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 10. A SERVE TOUCHED BY A PLAYER</h2>
                  <p>If the player who is receiving the service or their partner is hit by, or touches the ball with the racket before it bounces, the point is won by the server.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 11. REPETITION OF A POINT OR “LET” BALL</h2>
                  <p>a) The ball touches the net or the net posts (if inside the area of play) and then falls in the area of the receiver of the serve, as long as it does not touch the metal fence before the second bounce.</p>
                  <p>b) If after the ball has touched the net or posts (if inside the area of play) it then hits either player or any part of their body.</p>
                  <p>c) A “let” is played if the person receiving the serve is not ready (RULE 9).</p>
                  <p>If the “let“ is produced in the first service this should be repeated. If the “Let” is produced in the second service the server only has the right to one more serve.</p>
                  <p>A point being played is a “let” under the following conditions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>If the ball splits or breaks during the game.</li>
                    <li>If play is interrupted by unforeseen circumstances beyond the control of the players.</li>
                  </ul>
                  <p>The player who during the game considers that a situation in which a “let” is required must immediately make it known to the umpire, not letting play continue, as the right to stop a point is lost once the point has finished.</p>
                  <p>The umpire can order the repetition of a point in which case the server has the right to two serves.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 12. INTERFERENCE</h2>
                  <p>When a player is disturbed by anything out of their control with the exception of the installations of the court or partner a “let” must be played and the point repeated.</p>
                  <p>If a player deliberately or involuntarily disturbs an opponent during play, in the first case the umpire will concede the point to the opponents and in the second will order a “let” when the point is won by the player who created the disturbance.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 13. SCORING</h2>
                  <p>When a couple have won the first point the score is 15, When they win the second point the score is 30. When the third point is won the score is 40 and the fourth point won is counted a game except in the event that both couples have won three points each when the score is then 40 all or deuce. The next point is called “advantage” in favour of the winners of the point and if the same couple wins the next point they win the game. If they lose the point the score returns to 40 all or deuce. And so on until one couple wins two consecutive points.</p>
                  <p>The first couple to win 6 games with a minimum of a two game advantage wins the set. In the case of a draw at 5 all the players must play two more games until one pair wins 7-5 but if a draw is reached at 6-6 the pair with a two game advantage will win unless a “tie-beak” has previously been agreed upon. (RULE 14).</p>
                  <p>Matches may be the best of 3 or 5 sets. In matches which are the best of 5 there can be an additional rest period of 10 minutes after the 3rd set if requested by one of the couples.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 14. “TIE-BREAK”</h2>
                  <p>When previously established in the event of a draw at 6 all a “tie-break” is played.</p>
                  <p>The “tie-break” is won by the first couple to win 7 points as long as there is 2 point advantage.</p>
                  <p>The first service in a “tie-break” is taken from the right hand side of the court by the player who would have served normally and who only serves once. The service then goes to the opponents who have 2 services but take the first serve from the left hand side of the court.</p>
                  <p>Players change sides every 6 points (set) and have 25 seconds to do so.</p>
                  <p>The winners of the set with a “tie-break” win the set 7-6</p>
                  <p>The service of the following set is started by the couple who did not start serving in the tie-break.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 15. BALL IN PLAY</h2>
                  <p>The ball is hit alternatively by either player of each pair.</p>
                  <p>The ball is in play from the moment it has been served (unless it was out or let) and remains in play until the point has been decided. This occurs when the ball touches the walls of the opponents’ side of the court directly or the metal fencing, bounces twice on the ground or when having been hit by a player it bounces correctly on the opponents’ side and having passed the limits of the court bounces a second time.</p>
                  <p>A player can play the ball into the opponents’ side making it bounce and then leave the court by the upper limits.</p>
                  <p>NOTE: The players can leave the court and hit the ball as long as it has not bounced for a second time. In order to do so the court must meet a series of conditions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Both sides of the court should have two central entrances.</li>
                    <li>Each entrance should measure a maximum of 0.82 x 2 metres and a minimum of 0.72 x 2 metres.</li>
                    <li>There should be no physical object outside the court in a minimum space of 2 metres width, 4 metres length on both sides and a minimum of two metres height above the net height.</li>
                  </ul>
                  <p>If the ball passes the net, bounces in the opponents court, leaves the limits of the court, and comes back into play having hit any object outside the court, the player who hit the ball out of the court is considered to have won the point even though their opponent could have returned it.</p>
                  <p>If the ball passes the net and having passed into the opponents court goes out of the court through a hole or flaw in the metal fencing, or remains caught in it, the point is won by the player who hit the ball.</p>
                  <p>A player can hit the ball against any of their walls and make it pass over the net into the opponents’ court except for the serve.</p>
                  <p>A ball which bounces in the angle (corner) formed by one of the walls of the “U” and the ground it is considered good. (The ball known colloquially as “egg” is good).</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 16. VOLLEY</h2>
                  <p>Any player can volley the ball, except for the serve.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 17. BALL WHICH BOUNCES ON AN INSTALLATION</h2>
                  <p>If the ball bounces in any of the installations having bounced in the court, the ball will remain in play and should be returned before it bounces in the court for a second time.</p>
                  <p>If the ball bounces off the lights or the roof, in the case of covered courts, the point finishes.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 18. CORRECT RETURN</h2>
                  <p>The return is correct :</p>
                  <p>a) If the ball touches the net or its posts (if they are inside the area of play) and then bounces into the opponents’ court.</p>
                  <p>b) If the ball after bouncing in the court and then hitting one of the walls returns to the court of the player who hit it and the player hits it, as long as they or any part of their clothes or the racquet have not touched the net, its posts or the court of the opponents.</p>
                  <p>c) If as a result of the direction and force of the shot, the ball bounces in the opponents’ court and goes out of the limits of the court or hits the roof or lights or any other object not part of the installations of the court.</p>
                  <p>d) If the ball in play hits any object situated in the opponents’ court (another ball, any part of their clothing or even the racquet). The point will be won by the person who played the shot.</p>
                  <p>e) If the ball bounces in the opponents court and afterwards touches the metal fence or any of the walls. The opponent should return it before it bounces for a second time in their court.</p>
                  <p>f) Any scooped or pushed balls will be considered good as long as they have not been hit twice and the impact occurs during one movement.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 19. LOST POINT</h2>
                  <p>A team loses a point :</p>
                  <p>a) If one of the players, their racquet or anything they are carrying touches any part of the net, including the posts and the vertical middle post, or the opponents part of the court, including the metal fence while the ball is in play. The middle vertical post situated in courts without doors is considered to be an integral part of the court up until 0.92 metres. From 0.92 the vertical middle post is considered neutral zone so the players can hold onto it.</p>
                  <p>b) If the ball bounces for a second time in the court before being returned.</p>
                  <p>c) If the ball is volleyed back before it has passed the net.</p>
                  <p>d) If a player hits the ball in such a way that it directly hits any of the walls of the opponents’ court, the metal fence or any object outside the court</p>
                  <p>e) If the player returns the ball, it hits the net or its posts and then the ball does bounce in the opponents’ court.</p>
                  <p>f) If a player hits the ball twice (double hit)</p>
                  <p>g) If the ball in play hits the player or anything on them except the racquet.</p>
                  <p>h) If a player hits the ball and this touches any of the metal fence of the court of their own court</p>
                  <p>i) If they touch the ball hitting it with the racquet.</p>
                  <p>j) If they jump over the net while the point is in play.</p>
                  <p>k) Only one player may hit the ball. If both players of a pair either simultaneously or consecutively hit the ball they will lose the point.</p>
                  <p>NOTE: It will not be considered a double hit when both of the players try to hit the ball simultaneously and only one hits it or when the other hits their partner’s racquet.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 20. (TEMPORARY)</h2>
                  <p>In some courts there is a space between the posts holding the net and the fencing. If the ball goes down said area it will only be considered good if the umpire considers the ball was higher than the net.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 21. CONTINUOUS PLAY</h2>
                  <p>Play should be continuous from the first serve until the end of the match except:</p>
                  <p>a) In the permitted rest periods (RULE 1).</p>
                  <p>b) In the changes of side of the court (RULE 1).</p>
                  <p>c) In 5 set matches where there can be a rest of 10 minutes (RULE 13).</p>
                  <p>d) The match should never be suspended, delayed, or interrupted with the aim of permitting players to recuperate energy or to receive advice or instructions (except during the permitted time).</p>
                  <p>The umpire will decide in said suspension, delay or interruption. There will be no tolerance for naturally losing their powers. The judge’s criteria will be valid in those cases that are the consequence of accidents.</p>
                  <p>If the match is suspended for reasons outside the players control (rain, lack of lighting etc.) when the match restarts the players have the right to warm up as follows:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Match suspended for up to five minutes, no warming up.</li>
                    <li>6 to 20 minutes, three minutes warming up.</li>
                    <li>More than 21 minutes, five minutes warming up.</li>
                  </ul>
                  <p>The match should restart exactly as it finished, i.e. at the same score, with the same player serving and the same location of the players in the court.</p>
                  <p>If the match is suspended due to lack of light, the match should be stopped when the number of games is even so that when it is restarted both pairs are on the same side as when the match was suspended.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">RULE 22. BALL CHANGES</h2>
                  <p>The balls will be changed during the match as follows:</p>
                  <p>In the last tables the balls will be changed in the event of a third set except for the semi finals and the finals.</p>
                  <p>In the semi-finals and finals the balls will be changed in the following manner: the first change will take place after the first 11 games. The following change after the next 13 games and so successively.</p>
                  <p>If there are three balls they cannot be changed unless indicated by the rules or with the permission of the tournament umpire.</p>
                  <p>When the balls should be changed after a certain number of games and are not changed in the correct manner then the mistake should be rectified when the pair who should have served with the new balls has to serve.</p>
                  <p>Afterwards, the balls should be changed so that the number of games between ball changes is that originally planned.</p>
                  <p>When a ball is lost the umpire will ensure that it will be replaced by one in the conditions as those in play, otherwise, the whole set of balls will be changed.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">PUNCTUALITY</h2>
                  <p>The matches will be played without delay at the times announced. The timetable of the matches should be announced sufficiently early, the players have to inform themselves of the time of their match. The order of play cannot be changed without the authorisation of the tournament umpire.</p>
                  <p>The umpire will consider the match finished if one the players is not in the court ready to play ten minutes after the set time for it to begin, the other pair will be considered the winners.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">CLOTHING</h2>
                  <p>The player should present themselves in clean, appropriate clothes, neither sleeveless tops nor swimming costumes being allowed. Should this not be the case, the clothing must be replaced by acceptable wear. Otherwise the player will be disqualified.</p>
                  <p>In team matches the players are recommended to wear the same clothes although it is not obligatory.</p>
                  <p>The players can use the footwear, clothes and racquets they wish as long as they respect the rules.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">IDENTITY</h2>
                  <p>The participants should prove, when required to do so by the umpire, their identity, nationality, age, and any other circumstance directly related to the competition, by means of the appropriate documents.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">BEHAVIOUR AND DISCIPLINE</h2>
                  <p>All players should behave in a courteous and polite way during the time they are in the tournament environment, even if they are not participating and should respect any other person in the same way.</p>
                  <p>– Area of play: The player or players cannot leave the area of play during a match, including the warming up period, without the authorisation of the umpire, except when changing sides.</p>
                  <p>– Advice and instructions: The players can receive advice and instructions from their captain or trainer during the match, both in individual pairs and team competitions.</p>
                  <p>– Prize giving: The players or teams who play in the final should participate in the prize giving which will take place after the final, unless they are unable to do so due to proven injury or indisposition, or due to a reasonable impossibility.</p>
                  <p>– Unjustified delays: 25 seconds will be allowed between points and 90 seconds to change sides. Should a player not be ready when “time” is called, the umpire can give them a warning.</p>
                  <p>The time given to warm up will be 5 minutes.</p>
                  <p>Should a player injure themselves and it is shown that play cannot continue, they will receive 3 minutes for attention or to recuperate. If the match is suspended during the change of sides the player can receive medical assistance during the said suspension and again during the two following changes of sides but during the established 90 seconds for each change of sides. The loss of physical conditions and injuries because of; pulled muscles, muscle ache etc will be motive for lack of continuity in the game.</p>
                  <p>– Visual and audible obscenity: Audible obscenity is defined as the use of words commonly considered and understood to be rude or offensive and pronounced sufficiently loudly and clearly to be heard by the umpire, spectators and organisers of the tournament. Visible obscenities are those signs or gestures made with hands, racquet or balls which commonly have an offensive meaning or which offend reasonable people.</p>
                  <p>– Ball abuse: Players may at no time violently hit the ball in any direction, out of the court or over the net when it is not in play.</p>
                  <p>– Racquet abuse: The players can at no time intentionally throw or hit the racquet against the ground in a violent way, nor against the net, the umpire’s chair, the walls, the metal fencing or any other element of the court.</p>
                  <p>– Verbal abuse and physical abuse or aggression: The behaviour, attitude, aggressive and unsportsmanlike gestures of the players of an especially grave nature when directed at the head umpire, umpire, opponents, partners, spectators or any other person related to the tournament. They will be considered to be an insult as well as any oral expression which while not considered to be an insult contains contempt towards others.</p>
                  <p>The breaking of any of these rules will be penalised by the head umpire of the competition. These rules of behaviour will be applied in all the tournaments, in different branches and categories, affecting all the players participating in the I.P.F. competitions.</p>
                  <p>The head umpire will reflect in the corresponding act the occurred incidences for subsequent consideration by the Disciplinary Committee of the International Padel Federation.</p>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rules;
