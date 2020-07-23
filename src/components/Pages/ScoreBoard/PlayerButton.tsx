import { blue } from '@ant-design/colors';
import React from 'react';
import { Player } from 'src/models/player';
import styled from 'styled-components';

interface PlayerButtonProps {
  player: Player;
  onClick: (player: Player) => void;
}

export const PlayerButton: React.FC<PlayerButtonProps> = (props: PlayerButtonProps): JSX.Element => {
  return (
    <StyledPlayerButton onClick={(): void => props.onClick(props.player)}>
      <div className="label">{props.player.name}</div>
      <div className="number">{props.player.number}</div>
    </StyledPlayerButton>
  );
};

const StyledPlayerButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  padding: 16px;
  margin: 0px 8px 8px 0px;
  background-color: ${blue[4]};
  color: white;
  border-radius: 4px;
  cursor: pointer;

  .label {
    font-size: 24px;
  }

  .number {
    font-size: 32px;
  }
`;
