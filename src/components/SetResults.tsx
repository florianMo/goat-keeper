import { blue, lime, red } from '@ant-design/colors';
import React from 'react';
import { Game } from 'src/models/game';
import styled from 'styled-components';

interface SetResultProps {
  game: Game;
}

export const SetResults: React.FC<SetResultProps> = (props: SetResultProps): JSX.Element => {
  return (
    <StyledSetResults>
      {props.game.sets.map((set, index) => (
        <span
          key={index}
          className={set.team1Score > set.team2Score ? 'won' : set.team1Score < set.team2Score ? 'lost' : ''}
        >
          {set.team1Score}•{set.team2Score}
        </span>
      ))}
    </StyledSetResults>
  );
};

const StyledSetResults = styled.div`
  display: flex;

  span {
    padding: 2px 4px;
    margin-left: 4px;
    border-radius: 4px;
    text-align: center;
    color: white;
    font-weight: 700;
    background-color: ${blue[4]};

    &.won {
      background-color: ${lime[7]};
    }

    &.lost {
      background-color: ${red[6]};
    }
  }
`;
