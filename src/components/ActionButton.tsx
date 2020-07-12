import { lime, red } from '@ant-design/colors';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { t } from 'src/models/event';
import styled from 'styled-components';

import { GameEvent, GameEventType } from '../models/event';

interface ActionButtonProps {
  event: GameEvent;
  onClick: (event: GameEvent) => void;
}

export const ActionButton: React.FC<ActionButtonProps> = (props: ActionButtonProps): JSX.Element => {
  return (
    <StyledActionButton
      positive={props.event.positive}
      type={props.event.type}
      onClick={(): void => props.onClick(props.event)}
    >
      <div className="label">{t(props.event.type)}</div>
      <FontAwesomeIcon size="2x" icon={props.event.positive ? faThumbsUp : faThumbsDown} />
    </StyledActionButton>
  );
};

const StyledActionButton = styled.div<{ positive: boolean | undefined; type: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props): string => (props.type === GameEventType.ACE ? '100%' : '170px')};
  height: 100px;
  margin: 8px;
  background-color: ${(props): string => (props.positive ? lime[7] : red[6])};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: 0.1s ease-in-out;

  .label {
    font-size: 24px;
    margin-bottom: 8px;
  }

  &:hover {
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
`;
