import { gold } from '@ant-design/colors';
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
  min-width: 170px;
  margin: 8px;
  padding: 8px;
  background-color: ${gold[6]};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

  .label {
    font-size: 24px;
  }

  .number {
    font-size: 32px;
  }

  &:hover {
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
`;
