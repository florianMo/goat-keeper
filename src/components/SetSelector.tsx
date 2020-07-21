import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Radio } from 'antd';
import React from 'react';
import { Game } from 'src/models/game';
import styled from 'styled-components';

interface SetSelectorProps {
  game: Game;
  selectedSet: number;
  onSetChanged: (setNumber: number) => void;
  onAddSet: () => void;
}

export const SetSelector: React.FC<SetSelectorProps> = (props: SetSelectorProps): JSX.Element => {
  return (
    <StyledSetSelector>
      <Radio.Group
        onChange={(e): void => props.onSetChanged(e.target.value)}
        value={props.selectedSet}
        buttonStyle="solid"
        size="large"
      >
        {props.game.sets.map((set, index) => (
          <Radio.Button key={index} value={index}>
            {set.team1Score}•{set.team2Score}
          </Radio.Button>
        ))}
      </Radio.Group>

      {props.game.sets.length < 5 && (
        <Button type="primary" onClick={props.onAddSet} size="large">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      )}
    </StyledSetSelector>
  );
};

const StyledSetSelector = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 12px 0px;

  .ant-radio-button-wrapper {
    width: 48px;
    padding: 0px 2px;
    text-align: center;
  }

  button {
    margin-left: 8px;
  }
`;
