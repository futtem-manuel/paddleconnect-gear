import React from 'react';
import RuleSection from '../RuleSection';

interface PositionRulesProps {
  searchQuery: string;
}

const PositionRules = ({ searchQuery }: PositionRulesProps) => {
  return (
    <RuleSection
      title="RULE 1. POSITION OF THE PLAYERS"
      content="The game is played in pairs. The players stand in the areas located on either side of the net. The server puts the ball into play and the receiver returns the ball.
      The receiver may stand in any part of their area of the court as can the partner of the receiver and the partner of the server.
      Players change sides when the number of games played is an odd number. If an error is made and the players do not change sides they should rectify the error as soon as it is discovered to follow the correct order of play.
      Maximum rest time between games is 90 seconds."
      searchQuery={searchQuery}
    />
  );
};

export default PositionRules;