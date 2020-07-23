import { lime, red } from '@ant-design/colors';
import React from 'react';
import { GameEvent, readable } from 'src/models';
import styled from 'styled-components';

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
      <div className="label">{readable(props.event.type)}</div>
    </StyledActionButton>
  );
};

const StyledActionButton = styled.div<{ positive: boolean | undefined; type: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  padding: 16px;
  margin: 0px 8px 8px 0px;
  background-color: ${(props): string => (props.positive ? lime[7] : red[6])};
  color: white;
  border-radius: 4px;
  cursor: pointer;

  .label {
    font-size: 24px;
  }
`;
